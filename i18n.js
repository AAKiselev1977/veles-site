/* ВЕЛЕС — переключатель языков (10) */
(function(){
var D={
ru:{"nav.brands":"Бренды","nav.parma":"ПАРМА","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"Легенды России","nav.prod":"Продукция","nav.plant":"Завод","nav.book":"Брендбук","nav.cont":"Контакты","nav.cta":"Образцы",
"hero.t1":"Легенды России —","hero.t2":"в каждой бутылке","hero.claim":"ЧЕСТНЫЙ СОСТАВ. ФЕДЕРАЛЬНАЯ ЛОГИСТИКА.","hero.sub":"«Велес» варит напитки на легендах регионов России — от тайги Коми до Кавказских гор. Медовуха, сидр, морсы, лимонады и тоники — полный цикл производства в Химках.","hero.cta1":"Образцы за 48 часов","hero.cta2":"Каталог продукции",
"sl.parma":"Медовуха на дикоросах северной тайги: брусника, морошка, черника и северный мёд. Пера · Войпель · Зарни Ань.","sl.less":"Полусухие игристые сидры и цитрусовая медовуха. Истина внутри…","sl.alive":"Мохито пяти вкусов и тоники Premium Bar. Освежись легко!","sl.leg":"Восемь брендов на подлинной мифологии регионов — от Урала до Байкала.","sl.more":"Подробнее",
"v1.t":"Натуральное сырьё","v1.s":"соки прямого отжима и натуральный мёд","v2.t":"Полный цикл","v2.s":"стекло 0,45 л · банка · кеги · контракт","v3.t":"OTIF 98,5%","v3.s":"от 1 паллеты на РЦ, микс-паллеты","v4.t":"45 млн л в год","v4.s":"до 3 млн бутылок и 3 млн банок в месяц",
"ix.brandslbl":"Наши бренды","ix.brands":"Сегодня на полке","ix.leglbl":"Развитие портфеля","ix.leg":"Коллекция «Легенды России»","ix.plantlbl":"Завод","ix.plant":"Полный цикл в Химках","ix.all":"Вся коллекция — 8 брендов","ix.b2b":"Производство и СТМ","ix.contact":"Связаться",
"ft.rights":"© 2026 «Велес» · Химки","ft.warn":"Чрезмерное употребление алкоголя вредит вашему здоровью. Информация об алкогольной продукции — только для лиц старше 18 лет. Энергетические напитки не продаются несовершеннолетним.",
"age.t":"Вам уже есть 18 лет?","age.p":"Сайт содержит информацию о слабоалкогольных напитках естественного брожения и предназначен только для совершеннолетних.","age.yes":"Да, мне есть 18","age.no":"Нет"},
en:{"nav.brands":"Brands","nav.parma":"PARMA","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"Legends of Russia","nav.prod":"Products","nav.plant":"Factory","nav.book":"Brand book","nav.cont":"Contacts","nav.cta":"Samples",
"hero.t1":"Legends of Russia —","hero.t2":"in every bottle","hero.claim":"HONEST INGREDIENTS. FEDERAL LOGISTICS.","hero.sub":"Veles brews drinks inspired by the legends of Russia's regions — from the Komi taiga to the Caucasus mountains. Mead, cider, fruit drinks, lemonades and tonics — full-cycle production in Khimki.","hero.cta1":"Samples in 48 hours","hero.cta2":"Product catalogue",
"sl.parma":"Craft mead with wild northern berries: lingonberry, cloudberry, bilberry and northern honey.","sl.less":"Semi-dry sparkling ciders and citrus mead. The truth is inside…","sl.alive":"Five mojito flavours and Premium Bar tonics. Refresh easily!","sl.leg":"Eight brands built on the authentic mythology of Russia's regions.","sl.more":"Learn more",
"v1.t":"Natural ingredients","v1.s":"direct-pressed juices and natural honey","v2.t":"Full cycle","v2.s":"glass 0.45 l · cans · kegs · contract","v3.t":"OTIF 98.5%","v3.s":"from 1 pallet per DC, mixed pallets","v4.t":"45M litres a year","v4.s":"up to 3M bottles and 3M cans monthly",
"ix.brandslbl":"Our brands","ix.brands":"On the shelf today","ix.leglbl":"Portfolio development","ix.leg":"“Legends of Russia” collection","ix.plantlbl":"Factory","ix.plant":"Full cycle in Khimki","ix.all":"Full collection — 8 brands","ix.b2b":"Production & private label","ix.contact":"Contact us",
"ft.rights":"© 2026 Veles · Khimki","ft.warn":"Excessive alcohol consumption is harmful to your health. Alcohol information is for adults 18+ only. Energy drinks are not sold to minors.",
"age.t":"Are you over 18?","age.p":"This site contains information about naturally fermented low-alcohol drinks and is intended for adults only.","age.yes":"Yes, I am 18+","age.no":"No"},
zh:{"nav.brands":"品牌","nav.parma":"帕尔玛","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"俄罗斯传奇","nav.prod":"产品","nav.plant":"工厂","nav.book":"品牌手册","nav.cont":"联系方式","nav.cta":"样品",
"hero.t1":"俄罗斯的传奇 —","hero.t2":"在每一瓶中","hero.claim":"真实配料。全国物流。","hero.sub":"Veles 以俄罗斯各地区的传说酿造饮品——从科米泰加森林到高加索山脉。蜂蜜酒、苹果酒、果汁饮料、柠檬水和汤力水——希姆基全周期生产。","hero.cta1":"48小时内提供样品","hero.cta2":"产品目录",
"sl.parma":"采用北方野生浆果酿制的蜂蜜酒：越橘、云莓、蓝莓和北方蜂蜜。","sl.less":"半干起泡苹果酒和柑橘蜂蜜酒。真相在其中……","sl.alive":"五种口味的莫吉托和Premium Bar汤力水。轻松畅饮！","sl.leg":"八个品牌，源自俄罗斯各地区的真实神话。","sl.more":"了解更多",
"v1.t":"天然原料","v1.s":"直榨果汁和天然蜂蜜","v2.t":"全周期","v2.s":"玻璃瓶0.45升·罐装·桶装·代工","v3.t":"OTIF 98.5%","v3.s":"配送中心起订1个托盘","v4.t":"年产4500万升","v4.s":"每月最多300万瓶和300万罐",
"ix.brandslbl":"我们的品牌","ix.brands":"今日在售","ix.leglbl":"产品组合发展","ix.leg":"《俄罗斯传奇》系列","ix.plantlbl":"工厂","ix.plant":"希姆基全周期生产","ix.all":"完整系列 — 8个品牌","ix.b2b":"生产与自有品牌","ix.contact":"联系我们",
"ft.rights":"© 2026 Veles · 希姆基","ft.warn":"过量饮酒有害健康。酒精信息仅供18岁以上成年人参考。能量饮料不向未成年人出售。",
"age.t":"您已满18岁吗？","age.p":"本网站包含天然发酵低度酒饮品信息，仅面向成年人。","age.yes":"是的，我已满18岁","age.no":"否"},
hi:{"nav.brands":"ब्रांड","nav.parma":"पार्मा","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"रूस की किंवदंतियाँ","nav.prod":"उत्पाद","nav.plant":"फ़ैक्टरी","nav.book":"ब्रांड बुक","nav.cont":"संपर्क","nav.cta":"नमूने",
"hero.t1":"रूस की किंवदंतियाँ —","hero.t2":"हर बोतल में","hero.claim":"ईमानदार सामग्री। संघीय लॉजिस्टिक्स।","hero.sub":"Veles रूस के क्षेत्रों की किंवदंतियों से प्रेरित पेय बनाता है — कोमी टैगा से काकेशस पर्वत तक। मीड, साइडर, फल पेय, नींबू पानी और टॉनिक — खिमकी में पूर्ण-चक्र उत्पादन।","hero.cta1":"48 घंटे में नमूने","hero.cta2":"उत्पाद सूची",
"sl.parma":"उत्तरी जंगली बेरीज़ के साथ मीड: लिंगोनबेरी, क्लाउडबेरी, बिलबेरी और उत्तरी शहद।","sl.less":"अर्ध-शुष्क स्पार्कलिंग साइडर और साइट्रस मीड।","sl.alive":"पाँच स्वादों के मोहितो और Premium Bar टॉनिक।","sl.leg":"रूस के क्षेत्रों की प्रामाणिक पौराणिक कथाओं पर आधारित आठ ब्रांड।","sl.more":"और जानें",
"v1.t":"प्राकृतिक सामग्री","v1.s":"सीधे दबाए गए रस और प्राकृतिक शहद","v2.t":"पूर्ण चक्र","v2.s":"काँच 0.45 ली · कैन · केग · अनुबंध","v3.t":"OTIF 98.5%","v3.s":"डीसी पर 1 पैलेट से","v4.t":"4.5 करोड़ ली/वर्ष","v4.s":"प्रति माह 30 लाख बोतलें और 30 लाख कैन तक",
"ix.brandslbl":"हमारे ब्रांड","ix.brands":"आज शेल्फ़ पर","ix.leglbl":"पोर्टफोलियो विकास","ix.leg":"«रूस की किंवदंतियाँ» संग्रह","ix.plantlbl":"फ़ैक्टरी","ix.plant":"खिमकी में पूर्ण चक्र","ix.all":"पूरा संग्रह — 8 ब्रांड","ix.b2b":"उत्पादन और निजी लेबल","ix.contact":"संपर्क करें",
"ft.rights":"© 2026 Veles · खिमकी","ft.warn":"अत्यधिक शराब का सेवन स्वास्थ्य के लिए हानिकारक है। शराब की जानकारी केवल 18+ वयस्कों के लिए।","age.t":"क्या आप 18 वर्ष से अधिक हैं?","age.p":"इस साइट में प्राकृतिक किण्वित कम-अल्कोहल पेय की जानकारी है और यह केवल वयस्कों के लिए है।","age.yes":"हाँ, मैं 18+ हूँ","age.no":"नहीं"},
es:{"nav.brands":"Marcas","nav.parma":"PARMA","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"Leyendas de Rusia","nav.prod":"Productos","nav.plant":"Fábrica","nav.book":"Brand book","nav.cont":"Contactos","nav.cta":"Muestras",
"hero.t1":"Leyendas de Rusia —","hero.t2":"en cada botella","hero.claim":"INGREDIENTES HONESTOS. LOGÍSTICA FEDERAL.","hero.sub":"Veles elabora bebidas inspiradas en las leyendas de las regiones de Rusia: de la taiga de Komi al Cáucaso. Hidromiel, sidra, bebidas de frutas, limonadas y tónicas: ciclo completo en Jimki.","hero.cta1":"Muestras en 48 horas","hero.cta2":"Catálogo",
"sl.parma":"Hidromiel con bayas silvestres del norte: arándano rojo, mora de los pantanos y miel norteña.","sl.less":"Sidras espumosas semisecas e hidromiel cítrica. La verdad está dentro…","sl.alive":"Mojitos de cinco sabores y tónicas Premium Bar.","sl.leg":"Ocho marcas basadas en la mitología auténtica de las regiones rusas.","sl.more":"Más información",
"v1.t":"Ingredientes naturales","v1.s":"zumos de prensado directo y miel natural","v2.t":"Ciclo completo","v2.s":"vidrio 0,45 l · latas · barriles","v3.t":"OTIF 98,5%","v3.s":"desde 1 palé por CD","v4.t":"45M litros al año","v4.s":"hasta 3M botellas y 3M latas al mes",
"ix.brandslbl":"Nuestras marcas","ix.brands":"Hoy en el lineal","ix.leglbl":"Desarrollo del portafolio","ix.leg":"Colección «Leyendas de Rusia»","ix.plantlbl":"Fábrica","ix.plant":"Ciclo completo en Jimki","ix.all":"Colección completa — 8 marcas","ix.b2b":"Producción y marca propia","ix.contact":"Contactar",
"ft.rights":"© 2026 Veles · Jimki","ft.warn":"El consumo excesivo de alcohol es perjudicial para la salud. Información sobre alcohol solo para mayores de 18 años.","age.t":"¿Eres mayor de 18?","age.p":"Este sitio contiene información sobre bebidas de baja graduación de fermentación natural, solo para adultos.","age.yes":"Sí, soy 18+","age.no":"No"},
fr:{"nav.brands":"Marques","nav.parma":"PARMA","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"Légendes de Russie","nav.prod":"Produits","nav.plant":"Usine","nav.book":"Brand book","nav.cont":"Contacts","nav.cta":"Échantillons",
"hero.t1":"Légendes de Russie —","hero.t2":"dans chaque bouteille","hero.claim":"INGRÉDIENTS HONNÊTES. LOGISTIQUE FÉDÉRALE.","hero.sub":"Veles brasse des boissons inspirées des légendes des régions russes — de la taïga de Komi au Caucase. Hydromel, cidre, boissons aux fruits, limonades et tonics — cycle complet à Khimki.","hero.cta1":"Échantillons sous 48 h","hero.cta2":"Catalogue",
"sl.parma":"Hydromel aux baies sauvages du Nord : airelle, mûre arctique et miel nordique.","sl.less":"Cidres pétillants demi-secs et hydromel aux agrumes. La vérité est à l'intérieur…","sl.alive":"Mojitos aux cinq saveurs et tonics Premium Bar.","sl.leg":"Huit marques fondées sur la mythologie authentique des régions russes.","sl.more":"En savoir plus",
"v1.t":"Ingrédients naturels","v1.s":"jus de pressage direct et miel naturel","v2.t":"Cycle complet","v2.s":"verre 0,45 l · canettes · fûts","v3.t":"OTIF 98,5 %","v3.s":"dès 1 palette par CD","v4.t":"45 M litres par an","v4.s":"jusqu'à 3 M bouteilles et 3 M canettes/mois",
"ix.brandslbl":"Nos marques","ix.brands":"Aujourd'hui en rayon","ix.leglbl":"Développement du portefeuille","ix.leg":"Collection « Légendes de Russie »","ix.plantlbl":"Usine","ix.plant":"Cycle complet à Khimki","ix.all":"Collection complète — 8 marques","ix.b2b":"Production et MDD","ix.contact":"Nous contacter",
"ft.rights":"© 2026 Veles · Khimki","ft.warn":"L'abus d'alcool est dangereux pour la santé. Informations réservées aux adultes 18+.","age.t":"Avez-vous plus de 18 ans ?","age.p":"Ce site contient des informations sur des boissons faiblement alcoolisées de fermentation naturelle, réservées aux adultes.","age.yes":"Oui, j'ai 18+","age.no":"Non"},
ar:{"nav.brands":"العلامات","nav.parma":"بارما","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"أساطير روسيا","nav.prod":"المنتجات","nav.plant":"المصنع","nav.book":"دليل العلامة","nav.cont":"اتصل بنا","nav.cta":"عينات",
"hero.t1":"أساطير روسيا —","hero.t2":"في كل زجاجة","hero.claim":"مكونات صادقة. لوجستيات فيدرالية.","hero.sub":"تصنع Veles مشروبات مستوحاة من أساطير مناطق روسيا — من تايغا كومي إلى جبال القوقاز. ميد وعصير التفاح والمشروبات — دورة إنتاج كاملة في خيمكي.","hero.cta1":"عينات خلال 48 ساعة","hero.cta2":"الكتالوج",
"sl.parma":"ميد بتوت الشمال البري: التوت البري وتوت السحاب والعسل الشمالي.","sl.less":"عصير تفاح فوّار نصف جاف وميد بالحمضيات.","sl.alive":"موهيتو بخمس نكهات وتونيك Premium Bar.","sl.leg":"ثماني علامات مبنية على أساطير مناطق روسيا الأصيلة.","sl.more":"المزيد",
"v1.t":"مكونات طبيعية","v1.s":"عصائر معصورة مباشرة وعسل طبيعي","v2.t":"دورة كاملة","v2.s":"زجاج 0.45 ل · عبوات · براميل","v3.t":"OTIF 98.5%","v3.s":"من منصة واحدة لكل مركز توزيع","v4.t":"45 مليون لتر سنوياً","v4.s":"حتى 3 ملايين زجاجة و3 ملايين عبوة شهرياً",
"ix.brandslbl":"علاماتنا","ix.brands":"على الرف اليوم","ix.leglbl":"تطوير المحفظة","ix.leg":"مجموعة «أساطير روسيا»","ix.plantlbl":"المصنع","ix.plant":"دورة كاملة في خيمكي","ix.all":"المجموعة الكاملة — 8 علامات","ix.b2b":"الإنتاج والعلامة الخاصة","ix.contact":"اتصل بنا",
"ft.rights":"© 2026 Veles · خيمكي","ft.warn":"الإفراط في تناول الكحول يضر بصحتك. معلومات الكحول للبالغين 18+ فقط.","age.t":"هل عمرك فوق 18؟","age.p":"يحتوي هذا الموقع على معلومات عن مشروبات منخفضة الكحول بالتخمير الطبيعي، للبالغين فقط.","age.yes":"نعم، عمري 18+","age.no":"لا"},
pt:{"nav.brands":"Marcas","nav.parma":"PARMA","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"Lendas da Rússia","nav.prod":"Produtos","nav.plant":"Fábrica","nav.book":"Brand book","nav.cont":"Contactos","nav.cta":"Amostras",
"hero.t1":"Lendas da Rússia —","hero.t2":"em cada garrafa","hero.claim":"INGREDIENTES HONESTOS. LOGÍSTICA FEDERAL.","hero.sub":"A Veles produz bebidas inspiradas nas lendas das regiões russas — da taiga de Komi ao Cáucaso. Hidromel, sidra, sumos, limonadas e tónicas — ciclo completo em Khimki.","hero.cta1":"Amostras em 48 h","hero.cta2":"Catálogo",
"sl.parma":"Hidromel com bagas silvestres do norte: arando, amora-ártica e mel nórdico.","sl.less":"Sidras espumantes meio-secas e hidromel cítrico.","sl.alive":"Mojitos de cinco sabores e tónicas Premium Bar.","sl.leg":"Oito marcas baseadas na mitologia autêntica das regiões russas.","sl.more":"Saber mais",
"v1.t":"Ingredientes naturais","v1.s":"sumos de prensagem direta e mel natural","v2.t":"Ciclo completo","v2.s":"vidro 0,45 l · latas · barris","v3.t":"OTIF 98,5%","v3.s":"desde 1 palete por CD","v4.t":"45 M litros/ano","v4.s":"até 3 M garrafas e 3 M latas/mês",
"ix.brandslbl":"As nossas marcas","ix.brands":"Hoje na prateleira","ix.leglbl":"Desenvolvimento do portefólio","ix.leg":"Coleção «Lendas da Rússia»","ix.plantlbl":"Fábrica","ix.plant":"Ciclo completo em Khimki","ix.all":"Coleção completa — 8 marcas","ix.b2b":"Produção e marca própria","ix.contact":"Contactar",
"ft.rights":"© 2026 Veles · Khimki","ft.warn":"O consumo excessivo de álcool é prejudicial à saúde. Informação sobre álcool apenas para maiores de 18 anos.","age.t":"Tem mais de 18 anos?","age.p":"Este site contém informação sobre bebidas de baixo teor alcoólico de fermentação natural, apenas para adultos.","age.yes":"Sim, tenho 18+","age.no":"Não"},
de:{"nav.brands":"Marken","nav.parma":"PARMA","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"Legenden Russlands","nav.prod":"Produkte","nav.plant":"Werk","nav.book":"Brand Book","nav.cont":"Kontakt","nav.cta":"Muster",
"hero.t1":"Legenden Russlands —","hero.t2":"in jeder Flasche","hero.claim":"EHRLICHE ZUTATEN. FÖDERALE LOGISTIK.","hero.sub":"Veles braut Getränke nach den Legenden russischer Regionen — von der Komi-Taiga bis zum Kaukasus. Met, Cidre, Fruchtgetränke, Limonaden und Tonics — Vollzyklus in Chimki.","hero.cta1":"Muster in 48 Std.","hero.cta2":"Katalog",
"sl.parma":"Met mit wilden Nordbeeren: Preiselbeere, Moltebeere und nordischer Honig.","sl.less":"Halbtrockene Schaumcidre und Zitrus-Met. Die Wahrheit ist drin…","sl.alive":"Mojitos in fünf Sorten und Premium-Bar-Tonics.","sl.leg":"Acht Marken auf Basis authentischer Mythologie russischer Regionen.","sl.more":"Mehr erfahren",
"v1.t":"Natürliche Zutaten","v1.s":"Direktsäfte und Naturhonig","v2.t":"Vollzyklus","v2.s":"Glas 0,45 l · Dosen · Fässer","v3.t":"OTIF 98,5 %","v3.s":"ab 1 Palette pro VZ","v4.t":"45 Mio. l/Jahr","v4.s":"bis 3 Mio. Flaschen und 3 Mio. Dosen/Monat",
"ix.brandslbl":"Unsere Marken","ix.brands":"Heute im Regal","ix.leglbl":"Portfolioentwicklung","ix.leg":"Kollektion «Legenden Russlands»","ix.plantlbl":"Werk","ix.plant":"Vollzyklus in Chimki","ix.all":"Ganze Kollektion — 8 Marken","ix.b2b":"Produktion & Eigenmarke","ix.contact":"Kontakt",
"ft.rights":"© 2026 Veles · Chimki","ft.warn":"Übermäßiger Alkoholkonsum schadet Ihrer Gesundheit. Alkoholinformationen nur für Erwachsene 18+.","age.t":"Sind Sie über 18?","age.p":"Diese Website enthält Informationen über natürlich fermentierte alkoholarme Getränke und ist nur für Erwachsene bestimmt.","age.yes":"Ja, ich bin 18+","age.no":"Nein"},
ja:{"nav.brands":"ブランド","nav.parma":"パルマ","nav.alive":"A-LIVE","nav.less":"L'ESSENCE","nav.leg":"ロシアの伝説","nav.prod":"製品","nav.plant":"工場","nav.book":"ブランドブック","nav.cont":"お問い合わせ","nav.cta":"サンプル",
"hero.t1":"ロシアの伝説 —","hero.t2":"すべてのボトルに","hero.claim":"正直な原材料。全国物流。","hero.sub":"Velesはロシア各地の伝説にインスパイアされた飲料を醸造します。コミのタイガからカフカス山脈まで。ミード、シードル、フルーツドリンク、レモネード、トニック — ヒムキでのフルサイクル生産。","hero.cta1":"48時間でサンプル","hero.cta2":"製品カタログ",
"sl.parma":"北方の野生ベリーのミード：コケモモ、ホロムイイチゴ、北方の蜂蜜。","sl.less":"やや辛口のスパークリングシードルと柑橘ミード。","sl.alive":"5つのフレーバーのモヒートとPremium Barトニック。","sl.leg":"ロシア各地域の本物の神話に基づく8つのブランド。","sl.more":"詳しく見る",
"v1.t":"天然原料","v1.s":"直搾りジュースと天然蜂蜜","v2.t":"フルサイクル","v2.s":"瓶0.45L・缶・樽・受託製造","v3.t":"OTIF 98.5%","v3.s":"DCごとに1パレットから","v4.t":"年間4,500万L","v4.s":"月産最大300万本・300万缶",
"ix.brandslbl":"私たちのブランド","ix.brands":"現在販売中","ix.leglbl":"ポートフォリオ開発","ix.leg":"「ロシアの伝説」コレクション","ix.plantlbl":"工場","ix.plant":"ヒムキのフルサイクル","ix.all":"全コレクション — 8ブランド","ix.b2b":"生産・PB","ix.contact":"お問い合わせ",
"ft.rights":"© 2026 Veles · ヒムキ","ft.warn":"過度の飲酒は健康を害します。アルコール情報は18歳以上の方のみ対象です。","age.t":"18歳以上ですか？","age.p":"当サイトは自然発酵の低アルコール飲料に関する情報を含み、成人のみを対象としています。","age.yes":"はい、18歳以上です","age.no":"いいえ"}
};
var NAMES={ru:"RU",en:"EN",zh:"中文",hi:"हिन्दी",es:"ES",fr:"FR",ar:"عربي",pt:"PT",de:"DE",ja:"日本語"};
function apply(lang){
  var d=D[lang]||D.ru;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n');
    if(d[k]!==undefined) el.textContent=d[k];
  });
  document.documentElement.lang=lang;
  document.documentElement.dir=(lang==='ar')?'rtl':'ltr';
  localStorage.setItem('veles-lang',lang);
  var sel=document.getElementById('langsel'); if(sel) sel.value=lang;
}
window.velesApplyLang=apply;
document.addEventListener('DOMContentLoaded',function(){
  var sel=document.getElementById('langsel');
  if(sel){
    Object.keys(NAMES).forEach(function(l){
      var o=document.createElement('option'); o.value=l; o.textContent=NAMES[l]; sel.appendChild(o);
    });
    sel.addEventListener('change',function(){apply(sel.value);});
  }
  apply(localStorage.getItem('veles-lang')||'ru');
});
})();

/* мобильное меню */
document.addEventListener('DOMContentLoaded',function(){
  var nav=document.querySelector('nav .wrap'); if(!nav) return;
  var burger=document.createElement('button'); burger.className='burger'; burger.innerHTML='&#9776;'; burger.setAttribute('aria-label','Меню');
  var cta=nav.querySelector('.cta');
  nav.insertBefore(burger, cta);
  var mm=document.createElement('div'); mm.className='mmenu';
  var panel=document.createElement('div'); panel.className='panel'; mm.appendChild(panel);
  var x=document.createElement('button'); x.className='x'; x.innerHTML='&#10005;'; panel.appendChild(x);
  var links=[['index.html',null,'Главная'],['parma.html','nav.parma','ПАРМА'],['a-live.html','nav.alive','A-LIVE'],
    ['l-essence.html','nav.less',"L'ESSENCE"],['legendy.html','nav.leg','Легенды России'],
    ['produkciya.html','nav.prod','Продукция'],['zavod.html','nav.plant','Завод'],['kontakty.html','nav.cont','Контакты']];
  links.forEach(function(L){
    var a=document.createElement('a'); a.href=L[0]; a.textContent=L[2];
    if(L[1]) a.setAttribute('data-i18n',L[1]);
    panel.appendChild(a);
  });
  document.body.appendChild(mm);
  burger.addEventListener('click',function(){mm.classList.add('open')});
  x.addEventListener('click',function(){mm.classList.remove('open')});
  mm.addEventListener('click',function(e){if(e.target===mm)mm.classList.remove('open')});
  var lang=localStorage.getItem('veles-lang')||'ru';
  if(window.velesApplyLang) window.velesApplyLang(lang);
});
