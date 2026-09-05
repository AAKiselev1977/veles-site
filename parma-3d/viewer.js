// Просмотр кубической бутылки ПАРМА: геометрия строится по чертежу,
// крутится сама бутылка, срез напитка задан в мировых координатах.
import * as THREE from "three";

const DATA = [
  { id:"pera", name:"Пера", sub:"Рождённый тайгой", comp:"Брусника · клюква", abv:"5,8 % об.",
    css:"var(--pera)", liquid:0xB01424, cap:0x1F4D2B,
  },
  { id:"voypel", name:"Войпель", sub:"Властелин северного ветра", comp:"Черника · ежевика · лесная малина",
    abv:"5,8 % об.", css:"var(--voypel)", liquid:0x4A1E86, cap:0x1B2E5C,
  },
  { id:"zarni", name:"Зарни Ань", sub:"Хранительница очага", comp:"Мята · морошка · брусника",
    abv:"5,5 % об.", css:"var(--zarni)", liquid:0xD08A18, cap:0x8E1B24,
  },
];

// Пропорции сняты с утверждённого кадра: корпус к высоте 1:4,26, плечо
// резкое — 3 % высоты, налив уходит в горло, дно толстое.
const W = 0.060, HALF = W / 2, FILLET = 0.004, WALL = 0.003;
const BASE = 0.014;                                    // толщина дна
const H_BODY = 0.1825, H_SHLD = 0.0075, H_NECK = 0.058, R_NECK = 0.0135;
const H_GLASS = H_BODY + H_SHLD + H_NECK;              // 248 мм до венчика
const CAP_R = 0.0150, CAP_BOT = H_GLASS - 0.032, CAP_TOP = H_GLASS + 0.008;
const LIQ_FULL = 0.2015;                               // полный налив, в горле
let level = LIQ_FULL;                                  // текущий уровень, падает при проливе
// Кольца лофта строятся в абсолютных высотах от донышка. Каждую геометрию
// сдвигаем на полвысоты вниз, чтобы бутылка кренилась вокруг своего центра,
// а не вокруг дна — иначе при наклоне она уезжает из кадра.
const Y0 = -CAP_TOP / 2;

const view = document.getElementById("view");
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.localClippingEnabled = true;
view.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);

// Собственное студийное окружение вместо RoomEnvironment: там потолочная панель
// отражалась в плече бутылки жёстким белым клином. Здесь только мягкие софтбоксы.
scene.environment = pmrem.fromEquirectangular((() => {
  const cv = document.createElement("canvas"); cv.width = 1024; cv.height = 512;
  const c = cv.getContext("2d");
  const g = c.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#3A3A38"); g.addColorStop(0.42, "#232322");
  g.addColorStop(0.50, "#171716"); g.addColorStop(0.53, "#0E0E0D");
  g.addColorStop(1, "#050505");
  c.fillStyle = g; c.fillRect(0, 0, 1024, 512);
  for (const [x, y, rx, ry, a] of [[300, 150, 150, 190, 0.95], [800, 160, 110, 175, 0.75],
                                   [545, 95, 90, 60, 0.30]]){
    c.save(); c.translate(x, y); c.scale(1, ry / rx); c.translate(-x, -y);
    const rg = c.createRadialGradient(x, y, 0, x, y, rx);
    rg.addColorStop(0, `rgba(255,255,255,${a})`); rg.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = rg; c.beginPath(); c.arc(x, y, rx, 0, Math.PI * 2); c.fill(); c.restore();
  }
  const t = new THREE.CanvasTexture(cv);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
})()).texture;

// градиентный задник: без него прозрачное стекло преломляет пустоту и читается чёрным
function gradientTexture(stops, w = 8, h = 512){
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const g = cv.getContext("2d").createLinearGradient(0, 0, 0, h);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  const ctx = cv.getContext("2d"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
// задник со световой колонной: её преломление в стенках и читается стеклом
scene.background = (() => {
  const cv = document.createElement("canvas"); cv.width = 512; cv.height = 512;
  const c = cv.getContext("2d");
  // Чёрная студия. Совсем плоский чёрный не годится: напиток прозрачный,
  // ему нужно что-то пропускать, иначе он снова читается чёрным. Поэтому
  // за бутылкой оставлено мягкое свечение, а по краям кадра — чистый чёрный.
  c.fillStyle = "#050505"; c.fillRect(0, 0, 512, 512);
  const glow = c.createRadialGradient(256, 215, 10, 256, 215, 285);
  glow.addColorStop(0, "rgba(214,196,150,0.30)");
  glow.addColorStop(0.45, "rgba(150,140,120,0.11)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle = glow; c.fillRect(0, 0, 512, 512);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
})();

// световое пятно под донышком — на чёрном оно даёт контакт с плоскостью
const padCv = document.createElement("canvas"); padCv.width = padCv.height = 256;
{
  const c = padCv.getContext("2d");
  const g = c.createRadialGradient(128, 128, 8, 128, 128, 128);
  g.addColorStop(0, "rgba(206,180,120,0.22)"); g.addColorStop(1, "rgba(206,180,120,0)");
  c.fillStyle = g; c.fillRect(0, 0, 256, 256);
}
const padTex = new THREE.CanvasTexture(padCv); padTex.colorSpace = THREE.SRGBColorSpace;
const pad = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.26).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ map:padTex, transparent:true, depthWrite:false }));

pad.position.y = Y0 - 0.001;
scene.add(pad);


const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 20);
let camDist = 0.66;

const key = new THREE.DirectionalLight(0xfff2dc, 1.15); key.position.set(0.5, 0.8, 0.7); scene.add(key);
const fillL = new THREE.DirectionalLight(0x9fb6d8, 0.45); fillL.position.set(-0.6, 0.3, 0.4); scene.add(fillL);
const rim = new THREE.DirectionalLight(0xffd79a, 1.30); rim.position.set(-0.2, 0.5, -0.8); scene.add(rim);

function ringSquare(y, half, fil, n = 10){
  const p = [], c = half - fil;
  const corners = [[c, c, 0], [-c, c, Math.PI / 2], [-c, -c, Math.PI], [c, -c, -Math.PI / 2]];
  for (const [cx, cz, a0] of corners)
    for (let i = 0; i <= n; i++){
      const a = a0 + (Math.PI / 2) * i / n;
      p.push(new THREE.Vector3(cx + fil * Math.cos(a), y, cz + fil * Math.sin(a)));
    }
  return p;
}
// круг — частный случай скруглённого квадрата (фаска = половине стороны),
// поэтому у всех колец силуэта одинаковые число точек и фаза: лофт не перекручивает
const ringCircle = (y, r) => ringSquare(y, r, r);
function loft(rings, capBottom, capTop){
  const pos = [], idx = [], off = [];
  rings.forEach(r => { off.push(pos.length / 3); r.forEach(v => pos.push(v.x, v.y, v.z)); });
  for (let s = 0; s < rings.length - 1; s++){
    const a = rings[s], b = rings[s + 1], n = Math.min(a.length, b.length);
    for (let i = 0; i < n; i++){
      const j = (i + 1) % n;
      idx.push(off[s] + i, off[s + 1] + i, off[s + 1] + j,
               off[s] + i, off[s + 1] + j, off[s] + j);
    }
  }
  const fan = (ri, flip) => { const r = rings[ri], o = off[ri];
    for (let i = 1; i < r.length - 1; i++)
      flip ? idx.push(o, o + i + 1, o + i) : idx.push(o, o + i, o + i + 1); };
  if (capBottom) fan(0, true);
  if (capTop) fan(rings.length - 1, false);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
function bottleProfile(half, fil, rneck){
  const r = [ringSquare(0, half * 0.97, fil), ringSquare(0.005, half, fil),
             ringSquare(H_BODY, half, fil)];
  const steps = 20;
  for (let i = 1; i <= steps; i++){
    const t = i / steps, e = t * t * (3 - 2 * t), y = H_BODY + H_SHLD * t;
    const hh = half * (1 - e) + rneck * e;
    r.push(ringSquare(y, hh, Math.min(fil * (1 - e) + hh * e, hh * 0.999)));
  }
  const top = H_BODY + H_SHLD;
  // венчик под винтовую крышку: бортик 28 мм
  r.push(ringCircle(top + 0.004, rneck));
  r.push(ringCircle(top + H_NECK - 0.011, rneck));
  r.push(ringCircle(top + H_NECK - 0.009, rneck + 0.0017));
  r.push(ringCircle(top + H_NECK - 0.004, rneck + 0.0017));
  r.push(ringCircle(top + H_NECK - 0.002, rneck));
  r.push(ringCircle(top + H_NECK, rneck));
  r.push(ringCircle(top + H_NECK, rneck - 0.0026));   // толщина стенки венчика
  r.push(ringCircle(top + H_NECK - 0.012, rneck - 0.0026));   // губа венчика
  return r;
}

const bottle = new THREE.Group();
scene.add(bottle);
const put = (geo, mat) => { geo.translate(0, Y0, 0); const m = new THREE.Mesh(geo, mat);
  bottle.add(m); return m; };

const glassMat = new THREE.MeshPhysicalMaterial({
  color:0xF2FAF4, metalness:0, roughness:0.035, transmission:0,
  transparent:true, opacity:0.16, depthWrite:false,
  ior:1.52, side:THREE.FrontSide, envMapIntensity:1.6,
  clearcoat:1.0, clearcoatRoughness:0.03 });
put(loft(bottleProfile(HALF, FILLET, R_NECK), true, false), glassMat).renderOrder = 2;

const inner = HALF - WALL;
const liqPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const liqMat = new THREE.MeshPhysicalMaterial({
  color:0xffffff, metalness:0, roughness:0.06, transmission:1.0, thickness:0.045,
  ior:1.35, transparent:true, side:THREE.DoubleSide, envMapIntensity:1.0,
  // цвет напитка задаём поглощением, а не краской: свет проходит насквозь
  // и окрашивается, поэтому сквозь бутылку видно боковую этикетку
  attenuationColor:new THREE.Color(0xB01424), attenuationDistance:0.048,
  clippingPlanes:[liqPlane] });
// Внутренний объём повторяет саму бутылку, но начинается от толстого дна:
// тогда срез гравитации всюду находит материал — и в корпусе, и в горле.
function innerProfile(){
  const half = inner, fil = Math.max(0.0015, FILLET - WALL), rn = R_NECK - 0.0028;
  const r = [ringSquare(BASE, half * 0.96, fil), ringSquare(BASE + 0.004, half, fil),
             ringSquare(H_BODY, half, fil)];
  const steps = 20;
  for (let i = 1; i <= steps; i++){
    const t = i / steps, e = t * t * (3 - 2 * t), y = H_BODY + H_SHLD * t;
    const hh = half * (1 - e) + rn * e;
    r.push(ringSquare(y, hh, Math.min(fil * (1 - e) + hh * e, hh * 0.999)));
  }
  r.push(ringCircle(H_BODY + H_SHLD + 0.004, rn));
  r.push(ringCircle(H_GLASS - 0.014, rn));
  return r;
}
put(loft(innerProfile(), true, true), liqMat);

const capMat = new THREE.MeshStandardMaterial({ color:0x1F4D2B, metalness:0.35, roughness:0.42 });
// термоколпак: сидит на горле, с вертикальной накаткой и завалом сверху
const capRings = [ringCircle(CAP_BOT, CAP_R * 0.97)];
for (const y of [CAP_BOT + 0.002, CAP_TOP - 0.006]){
  capRings.push(ringCircle(y, CAP_R).map(v => {
    const k = (Math.round(Math.atan2(v.z, v.x) / (Math.PI / 14)) % 2 ? 1 : 1.018);
    return new THREE.Vector3(v.x * k, y, v.z * k);
  }));
}
capRings.push(ringCircle(CAP_TOP - 0.002, CAP_R * 0.98));
capRings.push(ringCircle(CAP_TOP, CAP_R * 0.88));
put(loft(capRings, false, true), capMat);

// Единая этикетка разрезана надвое: орнаментальная колонна с фигурой ушла
// на обе боковые грани, основная панель осталась на фасе. Оборот отдельный.
// Ширину каждой наклейки берём из пропорции её же картинки — высота общая.
const LAB_H = 0.093, LAB_CY = 0.0955;         // общая высота и центр по эталону
const mkLab = () => new THREE.MeshStandardMaterial({
  color:0xffffff, roughness:0.60, metalness:0, envMapIntensity:1.1 });
const labMat = { front: mkLab(), side: mkLab(), back: mkLab() };
const FACES = [
  { kind:"front", n:[0, 0,  1], rot: 0 },
  { kind:"back",  n:[0, 0, -1], rot: Math.PI },
  { kind:"side",  n:[ 1, 0, 0], rot: Math.PI / 2 },
  { kind:"side",  n:[-1, 0, 0], rot: -Math.PI / 2 },
];
const labMeshes = FACES.map(f => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), labMat[f.kind]);
  m.rotation.y = f.rot;
  m.position.set(f.n[0] * (HALF + 0.00025), Y0 + LAB_CY, f.n[2] * (HALF + 0.00025));
  bottle.add(m);
  return m;
});

const loader = new THREE.TextureLoader();
function setLabels(id){
  for (const kind of ["front", "side", "back"])
    loader.load(`parma-3d/labels/${id}-${kind}.png`, t => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      labMat[kind].map = t; labMat[kind].needsUpdate = true;
      const lw = LAB_H * (t.image.width / t.image.height);
      labMeshes.forEach((m, i) => {
        if (FACES[i].kind !== kind) return;
        m.scale.set(lw, LAB_H, 1);
        // боковую колонну прижимаем к переднему ребру: на утверждённом кадре
        // она стоит вплотную к лицевой панели, а не посреди грани
        if (kind === "side") m.position.z = HALF - 0.003 - lw / 2;
      });
    });
}

// ---------- пролив: лужа держится у нижней кромки кадра ----------
const poolUni = {
  uColor:  { value: new THREE.Color(0xB01424) },
  uLevel:  { value: 0 },        // высота лужи, доля кадра
  uTime:   { value: 0 },
  uTilt:   { value: 0 },
  uWave:   { value: 0 },
  uStream: { value: new THREE.Vector2(0.5, 0) },   // x струи и её сила
  uTop:    { value: 1 },        // откуда льётся, доля кадра
};
const poolScene = new THREE.Scene();
const poolCam = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1);

// Пролив идёт поверх всей страницы, а не внутри окна просмотра: свой холст
// во весь экран, прикреплённый к окну, поэтому лужа держится нижней кромки
// экрана при любой прокрутке, а струя падает через всю страницу.
const spill = document.createElement("canvas");
spill.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;" +
                      "pointer-events:none;z-index:70";
document.body.appendChild(spill);
const spillRenderer = new THREE.WebGLRenderer({ canvas:spill, alpha:true, antialias:true });
spillRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
spillRenderer.setClearAlpha(0);
const fitSpill = () => spillRenderer.setSize(innerWidth, innerHeight, false);
addEventListener("resize", fitSpill); fitSpill();
poolScene.add(new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1).translate(0.5, 0.5, 0),
  new THREE.ShaderMaterial({
    uniforms: poolUni, transparent: true, depthTest: false, depthWrite: false,
    vertexShader: `varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uLevel, uTime, uTilt, uWave, uTop;
      uniform vec2 uStream; varying vec2 vUv;
      void main(){
        float x = vUv.x, y = vUv.y;
        float surf = uLevel + uTilt * (x - 0.5)
                   + uWave * (0.016 * sin(x * 7.0 + uTime * 1.7)
                            + 0.008 * sin(x * 17.0 - uTime * 2.9))
                   + 0.004 * sin(x * 5.0 + uTime * 0.7);
        vec3 col = uColor; float a = 0.0;
        if (uLevel > 0.0015){
          float d = surf - y;                              // > 0 — внутри лужи
          float body = smoothstep(0.0, 0.0035, d);
          float depth = clamp(d / max(uLevel, 0.002), 0.0, 1.0);
          col = mix(uColor * 2.3, uColor * 0.8, depth);    // у поверхности светлее
          float line = exp(-pow((y - surf) / 0.0035, 2.0));
          float sheen = exp(-pow((y - surf + 0.020) / 0.014, 2.0)) * 0.22;
          // полупрозрачно: сквозь налитое должна просвечивать сама страница
          a = body * (0.52 + 0.20 * depth) + line * 0.75;
          col += vec3(line * 0.60 + sheen);
        }
        // Струя из горлышка до поверхности лужи: книзу разгоняется и утончается,
        // как настоящая — с лёгким дрожанием, а не змейкой.
        float fall = clamp((uTop - y) / max(uTop - uLevel, 0.02), 0.0, 1.0);
        float w = mix(0.0075, 0.0032, fall);
        float sx = abs(x - uStream.x - 0.0022 * sin(y * 30.0 + uTime * 7.0));
        float inS = uStream.y * step(y, uTop) * step(surf, y)
                  * smoothstep(w, w * 0.30, sx);
        col = mix(col, uColor * 1.9 + vec3(0.10), inS);
        a = max(a, inS * 0.95);
        gl_FragColor = vec4(col, a);
      }`,
  })));

let poured = 0;            // доля вылитого
let pourRate = 0;          // насколько сильно льётся прямо сейчас

let yaw = 0.38, roll = 0, targetYaw = 0.38, targetRoll = 0;
let vYaw = 0, dragging = false, lastX = 0, lastY = 0, idle = true;
let slosh = 0, sloshV = 0;
const idleBtn = document.getElementById("idle");

function down(e){ dragging = true; view.classList.add("dragging"); idle = false;
  idleBtn.setAttribute("aria-pressed", "false");
  const p = e.touches ? e.touches[0] : e; lastX = p.clientX; lastY = p.clientY; }
function move(e){
  if (!dragging) return;
  const p = e.touches ? e.touches[0] : e;
  const dx = p.clientX - lastX, dy = p.clientY - lastY;
  lastX = p.clientX; lastY = p.clientY;
  targetYaw += dx * 0.008; vYaw = dx * 0.008;
  // вверх-вниз — крен вбок: именно так видно, что напиток держит горизонт
  targetRoll = Math.max(-1.75, Math.min(1.75, targetRoll + dy * 0.008));
  if (e.cancelable) e.preventDefault();
}
function up(){ dragging = false; view.classList.remove("dragging"); }
view.addEventListener("mousedown", down);
addEventListener("mousemove", move); addEventListener("mouseup", up);
view.addEventListener("touchstart", down, { passive:true });
view.addEventListener("touchmove", move, { passive:false });
addEventListener("touchend", up);
view.addEventListener("wheel", e => {
  camDist = Math.max(0.34, Math.min(1.1, camDist + e.deltaY * 0.0007));
  if (e.cancelable) e.preventDefault();
}, { passive:false });

document.querySelectorAll("[data-set]").forEach(b => b.addEventListener("click", () => {
  idle = false; idleBtn.setAttribute("aria-pressed", "false");
  const s = b.dataset.set;
  if (s === "front"){ targetYaw = 0; targetRoll = 0; }
  if (s === "tq"){ targetYaw = 0.38; targetRoll = 0; }
  if (s === "side"){ targetYaw = Math.PI / 2; targetRoll = 0; }
  if (s === "pour"){ targetYaw = 0.45; targetRoll = 1.45; }
}));
idleBtn.addEventListener("click", () => {
  idle = !idle; idleBtn.setAttribute("aria-pressed", idle ? "true" : "false"); });
document.getElementById("reset").addEventListener("click", () => {
  targetYaw = 0.38; targetRoll = 0; camDist = 0.66;
  level = LIQ_FULL; poured = 0;
  idle = true; idleBtn.setAttribute("aria-pressed", "true"); });
const refill = document.getElementById("refill");
if (refill) refill.addEventListener("click", () => { level = LIQ_FULL; poured = 0; });

const picker = document.getElementById("picker");
DATA.forEach((d, i) => {
  const b = document.createElement("button");
  b.className = "lg-btn";
  b.textContent = d.name;
  b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
  b.addEventListener("click", () => pick(i));
  picker.appendChild(b);
});
function pick(i){
  const d = DATA[i];
  document.documentElement.style.setProperty("--accent", d.css);
  liqMat.attenuationColor.setHex(d.liquid);
  poolUni.uColor.value.setHex(d.liquid);
  capMat.color.setHex(d.cap);
  level = LIQ_FULL; poured = 0;
  setLabels(d.id);
  document.getElementById("ttl").textContent = d.name;
  document.getElementById("sub").textContent = d.sub;
  document.getElementById("comp").textContent = d.comp;
  document.getElementById("abv").textContent = d.abv;
  for (const kind of ["front", "side", "back"]){
    const img = document.getElementById("lab-" + kind);      // раскладка на странице
    if (img) img.src = `parma-3d/labels/${d.id}-${kind}.png`;
    const a = document.getElementById("dl-" + kind);
    if (!a) continue;
    a.href = `parma-3d/files/parma-etiketka-${d.id}-${kind}.svg`;
    a.setAttribute("download", a.href.split("/").pop());
  }
  [...picker.children].forEach((b, k) => b.setAttribute("aria-pressed", k === i ? "true" : "false"));
}

function resize(){
  const r = view.getBoundingClientRect();
  const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
// ResizeObserver, а не window.resize: контейнер меняет размер и без перерисовки окна
new ResizeObserver(resize).observe(view);
resize();

const clock = new THREE.Clock();
const worldLevel = new THREE.Vector3();
const normal = new THREE.Vector3();
const lipWorld = new THREE.Vector3(), lipLow = new THREE.Vector3();
const axis = new THREE.Vector3(), radial = new THREE.Vector3(), tmp = new THREE.Vector3();

const AXIS_Y = new THREE.Vector3(0, 1, 0), AXIS_Z = new THREE.Vector3(0, 0, 1);
const qYaw = new THREE.Quaternion(), qRoll = new THREE.Quaternion();

function step(dt){
  if (idle){ targetYaw += dt * 0.28; targetRoll = Math.sin(performance.now() * 0.0006) * 0.08; }
  yaw += (targetYaw - yaw) * Math.min(1, dt * 7);
  const prevRoll = roll;
  roll += (targetRoll - roll) * Math.min(1, dt * 7);
  // сначала вращение вокруг своей оси, затем крен в экранной плоскости —
  // кватернионы, чтобы не зависеть от порядка углов Эйлера
  bottle.quaternion.copy(qRoll.setFromAxisAngle(AXIS_Z, roll))
                   .multiply(qYaw.setFromAxisAngle(AXIS_Y, yaw));

  // пружина с затуханием: качание возбуждается скоростью поворота бутылки
  const drive = (roll - prevRoll) * 46 + vYaw * 7;
  sloshV += (-slosh * 26 - sloshV * 3.4 + drive) * dt;
  slosh = Math.max(-0.22, Math.min(0.22, slosh + sloshV * dt));
  vYaw *= 0.90;

  // срез напитка задан в мировых координатах — отсюда и гравитация
  bottle.updateMatrixWorld();
  worldLevel.set(0, Y0 + level, 0).applyMatrix4(bottle.matrixWorld);
  normal.set(Math.sin(slosh), -Math.cos(slosh), Math.sin(slosh * 0.7)).normalize();
  liqPlane.setFromNormalAndCoplanarPoint(normal, worldLevel);

  camera.position.set(0, 0.02, camDist);
  camera.lookAt(0, 0, 0);

  // Пролив. Льётся не тогда, когда ось горлышка ушла под уровень, а когда
  // под него ушла нижняя точка венчика: именно через неё переливается через край.
  lipWorld.set(0, Y0 + H_GLASS, 0).applyMatrix4(bottle.matrixWorld);
  axis.set(0, 1, 0).applyQuaternion(bottle.quaternion);
  radial.set(0, -1, 0).addScaledVector(axis, axis.y).normalize();
  lipLow.copy(lipWorld).addScaledVector(radial, R_NECK - 0.0026);
  const under = normal.dot(tmp.copy(lipLow).sub(worldLevel));
  pourRate = level > BASE + 0.002 ? Math.max(0, Math.min(under, 0.06)) : 0;
  if (pourRate > 0){
    level = Math.max(BASE, level - pourRate * 4.5 * dt);
    poured = Math.min(1, (LIQ_FULL - level) / (LIQ_FULL - BASE));
  }

  renderer.render(scene, camera);

  // Лужа живёт в экранных координатах: её не сносит вместе с камерой,
  // она просто копится у нижней кромки кадра.
  poolUni.uTime.value += dt;
  poolUni.uLevel.value += (poured * 0.17 - poolUni.uLevel.value) * Math.min(1, dt * 2.6);
  poolUni.uTilt.value += (slosh * 0.10 - poolUni.uTilt.value) * Math.min(1, dt * 3.0);
  poolUni.uWave.value = Math.min(1, poolUni.uWave.value * (1 - dt * 0.8)
                                  + (pourRate > 0 ? dt * 2.2 : 0));

  // горлышко проецируем в координаты окна, а не холста просмотра: струя
  // должна начинаться там, где бутылка стоит на странице
  const r = view.getBoundingClientRect();
  const sp = tmp.copy(lipLow).project(camera);
  poolUni.uStream.value.set((r.left + (sp.x + 1) / 2 * r.width) / innerWidth,
                            pourRate > 0 ? 1 : 0);
  poolUni.uTop.value = 1 - (r.top + (1 - (sp.y + 1) / 2) * r.height) / innerHeight;

  spillRenderer.clear();
  if (poolUni.uLevel.value > 0.002 || pourRate > 0)
    spillRenderer.render(poolScene, poolCam);
}

function tick(){
  step(Math.min(clock.getDelta(), 0.05));
  requestAnimationFrame(tick);
}

// отладочный доступ к сцене: ?debug в адресе
if (location.search.includes("debug"))
  window.__parma = { THREE, scene, renderer, camera, bottle, glassMat, liqMat, labMat,
                     liqPlane, step, poolUni,
                     get level(){ return level; }, get poured(){ return poured; },
                     get pourRate(){ return pourRate; },
                     set:(r, y) => { targetRoll = r; targetYaw = y; idle = false; } };

pick(0);
tick();
