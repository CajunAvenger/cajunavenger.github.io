var languages = [
	"English",
	"Español",
	"Português",
	"Deutsch",
	"日本",
	"简中",
	"繁中",
	"Français",
	"Italiano",
	"한국어"
];
var regional_suffix = ["Español", "Português", "Français", "Italiano"];
var no_spaces = ["日本", "简中", "繁中"];
var translatable = {
	// Strings missing translations
	"Gimmick Form": {
		"English": "Gimmick Form",
		"Español": "",
		"Português": "",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"PseudoLegend": {
		"English": "Pseudo Legend",
		"Español": "",
		"Português": "Pseudo Lendário",
		"Deutsch": "",
		"日本": "600族",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Eeveelution": {
		"English": "Eeveelution",
		"Español": "",
		"Português": "",
		"Deutsch": "",
		"日本": "ブイズ",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"BoxLegendary": {
		"English": "Box Legendary",
		"Español": "",
		"Português": "",
		"Deutsch": "",
		"日本": "パケ伝",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Download": {
		"English": "Download Image",
		"Español": "",
		"Português": "Baixe a imagem",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"altLink": {
		"English": "Alternate download link",
		"Español": "",
		"Português": "Link alternativo para download",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Export": {
		"English": "Export Choices",
		"Español": "",
		"Português": "Exportar Escolhas",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Import": {
		"English": "Import Choices",
		"Español": "",
		"Português": "Importar Escolhas",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"gridReset": {
		"English": "Reset the grid!",
		"Español": "",
		"Português": "Reset o quadro",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"gridConfirm": {
		"English": "Are you sure you want to reset the grid?",
		"Español": "",
		"Português": "Tem certeza que deseja resetar o quadro?",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"importExportInstructions": {
		"English": "# Don't like my choices? You can overrule them here!\n# Write Code will put a text version of the grid here\n# Then you can edit the names and Import Code to replace the images.\n# Most Pokemon are just their named capitalized, like SWELLOW.\n# Alternate forms have specific tags, like MEOWTH_2 for Galarian Meowth.\n# You can also use this to keep backups",
		"Español": "",
		"Português": "# Não gosta das minhas escolhas? Você pode anulá-las!\n# Exportar Escolhas irá colocar uma versão em texto do quadro aqui\n# Então você poderá editar os nomes e Importar Escolhas para substituir as imagens.\n# A maioria dos Pokémon são apenas seus nomes em letra maiúscula, como SWELLOW.\n# Formas Alternativas possuem tags específicas, como MEOWTH_2 para Meowth de Galar.\n# Você também pode usar isso para guardar cópias de segurança.",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"spindaInstructions": {
		"English": "Spinda's spots can be randomized or manually placed.\nEach box pair in the corners moves its nearest spot.\nUp/Down on the first box moves it Right/Left.\nUp/Down on the second box moves it Up/Down.",
		"Español": "",
		"Português": "As manchas do Spinda podem ser aleatórias ou colocadas manualmente.\nCada par de caixas nos cantos da imagem movem as manchas próximas a eles.\nPara cima/Para baixo na primeira caixa move as manchas para a Direita/Esquerda.\nPara cima/Para baixo na segunda caixa move as manchas para Cima/Baixo.",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"teamInstructions": {
		"English": "Click a team box, then a Pokemon from the grid to copy it to the box.",
		"Español": "",
		"Português": "Clique em um dos espaços em branco e depois em um Pokémon do quadro para colocá-lo no time",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Picking": {
		"English": "Picking...",
		"Español": "",
		"Português": "Escolhendo...",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Credits": { // idk if this one's getting it
		"English": "",
		"Español": "",
		"Português": "",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""		
	},

	// Less simple strings translated w/ Google Translate
	// may very well be issues in here
	// especially in Japanese/Chinese/Korean where I am completely lost
	"ShinyCharm1": {
		"English": "Click the Shiny Charm, then click Pokemon to make them shiny.",
		"Español": "Haz clic en Amuleto Iris, luego haz clic en Pokémon para hacerlos variocolor.",
		"Português": "Clique no Shiny Charm e, em seguida, clique nos Pokémon para torná-los brilhantes.",
		"Deutsch": "Klicken Sie auf den Schillerpin und dann auf Pokemon, um sie glänzend zu Schillerndes.",
		"日本": "ひかるおまもりをクリックしてから、ポケモンをクリックして光るます。",
		"简中": "点击闪耀护符然后点击宝可梦让它们发光。",
		"繁中": "單擊闪耀护符然後單擊宝可梦使它們發光。",
		"Français": "Cliquez sur le Charme Chroma, puis cliquez sur Pokemon pour les rendre chromatique.",
		"Italiano": "Fai clic sul Cromamuleto , quindi fai clic su Pokemon per renderli cromatico.",
		"한국어": "빛나는부적 을 클릭한 다음 포켓몬 을 클릭하여 반짝이게 만들 빛나는"
	},
	"ShinyCharm2": {
		"English": "Or click here to make everything shiny.",
		"Español": "",
		"Português": "Ou clique aqui para fazer que todos sejam brilhantes.",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "",
		"Italiano": "",
		"한국어": ""
	},
	"Randomize!": {
		"English": "Randomize!",
		"Español": "Aleatorizar!",
		"Português": "Aleatório!",
		"Deutsch": "Randomisieren!",
		"日本": "ランダマイズ！",
		"简中": "随机化！",
		"繁中": "隨機化！",
		"Français": "Aléatoire!",
		"Italiano": "Casuale!",
		"한국어": "무작위의!"
	},
	"Cookie1": {	// disable cookies
		"English": "This site uses cookies to save your choices. You can disable them here.",
		"Español": "Este sitio utiliza cookies para guardar sus elecciones. Puede desactivarlos aquí.",
		"Português": "Este site usa cookies para salvar suas escolhas. Você pode desativá-los aqui.",
		"Deutsch": "Diese Seite verwendet Cookies, um Ihre Auswahl zu speichern. Sie können sie hier deaktivieren.",
		"日本": "このサイトでは、選択内容を保存するためにクッキーを使用しています。 ここでそれらを無効にすることができます。",
		"简中": "本网站使用曲奇饼来保存您的选择。 您可以在此处禁用它们。",
		"繁中": "本網站使用曲奇餅來保存您的選擇。 您可以在此處禁用它們。",
		"Français": "Ce site utilise des cookies pour enregistrer vos choix. Vous pouvez les désactiver ici.",
		"Italiano": "Questo sito utilizza i cookie per salvare le tue scelte. Puoi disabilitarli qui.",
		"한국어": "이 사이트는 쿠키를 사용하여 선택 사항을 저장합니다. 여기에서 비활성화할 수 있습니다."
	},
	"Cookie2": {	// re-enable cookies
		"English": "This site uses cookies to save your choices. You can enable them here.",
		"Español": "Este sitio utiliza cookies para guardar sus elecciones. Puede habilitarlos aquí.",
		"Português": "Este site usa cookies para salvar suas escolhas. Você pode ativá-los aqui.",
		"Deutsch": "Diese Seite verwendet Cookies, um Ihre Auswahl zu speichern. Sie können sie hier aktivieren.",
		"日本": "このサイトでは、選択内容を保存するためにクッキーを使用しています。 ここで有効にできます。",
		"简中": "本网站使用曲奇饼来保存您的选择。 您可以在此处启用它们。",
		"繁中": "本網站使用曲奇餅來保存您的選擇。 您可以在此處啟用它們。",
		"Français": "Ce site utilise des cookies pour enregistrer vos choix. Vous pouvez les activer ici.",
		"Italiano": "Questo sito utilizza i cookie per salvare le tue scelte. Puoi abilitarli qui.",
		"한국어": "이 사이트는 쿠키를 사용하여 선택 사항을 저장합니다. 여기에서 활성화할 수 있습니다."
	},
	"PikachuClone": {
		"English": "Pikachu Clone",
		"Español": "Clone de Pikachu",
		"Português": "Clone do Pikachu",
		"Deutsch": "Pikachuklon",
		"日本": "ピカチュウのクローン",
		"简中": "皮卡丘克隆",
		"繁中": "皮卡丘克隆",
		"Français": "Pikachu Cloner",
		"Italiano": "Clone di Pikachu",
		"한국어": "피카츄 클론"
	},

	// Strings with either official or simple translations
	// reasonably sure these are fine
	"Favorite": {
		// masc / femme
		"English": ["Favorite", "Favorite"],
		"Español": ["Favorito", "Favorita"],
		"Português": ["Favorito", "Favorita"],
		"Deutsch": ["Favorit", "Favoritin"],
		"日本": ["お気に入り", "お気に入り"],
		"简中": ["最喜欢的","最喜欢的"],
		"繁中": ["最喜歡的", "最喜歡的"],
		"Français": ["Préféré", "Préférée"],
		"Italiano": ["Preferito", "Preferita"],
		"한국어": ["가장 좋아하는", "가장 좋아하는"]
	},
	"Team": {
		"English": "Team",
		"Español": "Equipo",
		"Português": "Equipe",
		"Deutsch": "Team",
		"日本": "手持ちポケモン",
		"简中": "同行",
		"繁中": "同行",
		"Français": "Équipe",
		"Italiano": "Squadra",
		"한국어": "지닌 포켓몬"
	},
	"Regional": {
		"English": "Regional",
		"Español": "Regional",
		"Português": "Regional",
		"Deutsch": "Regional",
		"日本": "地域",
		"简中": "地区",
		"繁中": "地區",
		"Français": "régionale",
		"Italiano": "regionale",
		"한국어": "지역"
	},
	"Bird": {
		"English": "Bird",
		"Español": "Pájaro",
		"Português": "Pássaro",
		"Deutsch": "Vogel",
		"日本": "鳥",
		"简中": "鸟",
		"繁中": "鳥",
		"Français": "Oiseau",
		"Italiano": "Uccello",
		"한국어": "새"
	},
	"Mammal": {
		"English": "Mammal",
		"Español": "Mamífero",
		"Português": "Mamífero",
		"Deutsch": "Säugetier",
		"日本": "哺乳類",
		"简中": "哺乳动物",
		"繁中": "哺乳動物",
		"Français": "Mammifère",
		"Italiano": "Mammifero",
		"한국어": "포유류"
	},
	"Fossil": {
		"English": "Fossil",
		"Español": "Fósil",
		"Português": "Fóssil",
		"Deutsch": "Fossil",
		"日本": "化石",
		"简中": "化石",
		"繁中": "化石",
		"Français": "Fossile",
		"Italiano": "Fossile",
		"한국어": "화석"
	},
	"RegionalForm": {
		"English": "Regional Form",
		"Español": "Forma regional",
		"Português": "Forma Regional",
		"Deutsch": "Regionalform",
		"日本": "リージョンフォーム",
		"简中": "地區型態",
		"繁中": "地區型態",
		"Français": "Forme régionale",
		"Italiano": "Forma regionale",
		"한국어": "리전폼"
	},
	"Gigantamax": {
		"English": "Gigantamax",
		"Español": "Gigamax",
		"Português": "Gigantamax",
		"Deutsch": "Gigadynamax",
		"日本": "キョダイマックス",
		"简中": "超极巨化",
		"繁中": "超極巨化",
		"Français": "Gigamax",
		"Italiano": "Gigamax",
		"한국어": "거다이맥스"
	},
	"Mythical": {
		"English": "Mythical",
		"Español": "Pokémon mítico",
		"Português": "Mítico",
		"Deutsch": "Mysteriöse Pokémon",
		"日本": "幻のポケモン",
		"简中": "幻之宝可梦",
		"繁中": "幻之寶可夢",
		"Français": "Pokémon fabuleux",
		"Italiano": "Pokémon misterioso",
		"한국어": "환상의 포켓몬"
	},
	"UltraBeast": {
		"English": "Ultra Beast",
		"Español": "Ultraente",
		"Português": "Ultracriatura",
		"Deutsch": "Ultrabestie",
		"日本": "ウルトラビースト",
		"简中": "究极异兽",
		"繁中": "究極異獸",
		"Français": "Ultra-Chimère",
		"Italiano": "Ultracreatura",
		"한국어": "울트라비스트"
	},
	"Paradox": {
		"English": "Paradox",
		"Español": "Paradoja",
		"Português": "Paradoxo",
		"Deutsch": "Paradox",
		"日本": "パラドックス",
		"简中": "悖謬",
		"繁中": "悖謬",
		"Français": "Paradoxe",
		"Italiano": "Paradosso",
		"한국어": "패러독스"
	},
	"Type": {
		"English": "Type",
		"Español": "Tipo",
		"Português": "Tipo",
		"Deutsch": "Typ",
		"日本": "タイプ",
		"简中": "属性",
		"繁中": "屬性",
		"Français": "Type",
		"Italiano": "Tipo",
		"한국어": "타입"
	},
	"Pokeball": {
		"English": "Poké Ball",
		"Español": "Poké Ball",
		"Português": "Poké Bola",
		"Deutsch": "Pokéball",
		"日本": "モンスターボール",
		"简中": "精灵球",
		"繁中": "精靈球",
		"Français": "Poké Ball",
		"Italiano": "Poké Ball",
		"한국어": "몬스터볼"
	},
	"Spinda": {
		"English": "Spinda",
		"Español": "Spinda",
		"Português": "Spinda",
		"Deutsch": "Pandir",
		"日本": "パッチール",
		"简中": "晃晃斑",
		"繁中": "晃晃斑",
		"Français": "Spinda",
		"Italiano": "Spinda",
		"한국어": " 	얼루기"
	},
	"Vivillon": {
		"English": "Vivillon",
		"Español": "Vivillon",
		"Português": "Vivillon",
		"Deutsch": "Vivillon",
		"日本": "ビビヨン",
		"简中": "彩粉蝶",
		"繁中": "彩粉蝶",
		"Français": "Prismillon",
		"Italiano": "Vivillon",
		"한국어": "비비용"
	},
	"Alcremie": {
		"English": "Alcremie",
		"Español": "Alcremie",
		"Português": "Alcremie",
		"Deutsch": "Pokusan",
		"日本": "マホイップ",
		"简中": "霜奶仙",
		"繁中": "霜奶仙",
		"Français": "Charmilly",
		"Italiano": "Alcremie",
		"한국어": "마휘핑"
	},
	
	"Normal": {
		"English": "Normal",
		"Español": "Normal",
		"Português": "Normal",
		"Deutsch": "Normal",
		"日本": "ノーマル",
		"简中": "一般",
		"繁中": "一般",
		"Français": "Normal",
		"Italiano": "Normale",
		"한국어": "노말"
	},
	"Fire": {
		"English": "Fire",
		"Español": "Fuego",
		"Português": "Fogo",
		"Deutsch": "Feuer ",
		"日本": "ほのお ",
		"简中": "炎",
		"繁中": "炎",
		"Français": "Feu",
		"Italiano": " 	Fuoco",
		"한국어": "불꽃"
	},
	"Water": {
		"English": "Water",
		"Español": "Agua",
		"Português": "Água",
		"Deutsch": "Wasser",
		"日本": "みず",
		"简中": "水",
		"繁中": "水",
		"Français": "Eau",
		"Italiano": "Acqua",
		"한국어": "물"
	},
	"Grass": {
		"English": "Grass",
		"Español": "Planta",
		"Português": "Planta",
		"Deutsch": "Pflanze",
		"日本": "くさ",
		"简中": "草",
		"繁中": "草",
		"Français": "Plante",
		"Italiano": "Erba",
		"한국어": "풀"
	},
	"Electric": {
		"English": "Electric",
		"Español": "Eléctrico",
		"Português": "Elétrico",
		"Deutsch": "Elektro",
		"日本": "でんき",
		"简中": "电",
		"繁中": "電",
		"Français": "Électrik",
		"Italiano": "Elettro",
		"한국어": " 	전기"
	},
	"Ice": {
		"English": "Ice",
		"Español": "Hielo",
		"Português": "Gelo",
		"Deutsch": "Eis",
		"日本": "こおり",
		"简中": "冰",
		"繁中": "冰",
		"Français": "Glace",
		"Italiano": "Ghiaccio",
		"한국어": " 	얼음"
	},
	"Fighting": {
		"English": "Fighting",
		"Español": "Lucha",
		"Português": "Luta",
		"Deutsch": "Kampf",
		"日本": "かくとう",
		"简中": "格斗",
		"繁中": "格鬥",
		"Français": "Combat",
		"Italiano": "Lotta",
		"한국어": "격투"
	},
	"Poison": {
		"English": "Poison",
		"Español": "Veneno",
		"Português": "Venenoso",
		"Deutsch": "Gift",
		"日本": "どく",
		"简中": "毒",
		"繁中": "毒",
		"Français": "Poison",
		"Italiano": "Veleno",
		"한국어": "독"
	},
	"Ground": {
		"English": "Ground",
		"Español": "Tierra",
		"Português": "Terrestre",
		"Deutsch": "Boden",
		"日本": "じめん",
		"简中": "地面 ",
		"繁中": "地面 ",
		"Français": "Sol",
		"Italiano": "Terra",
		"한국어": "땅"
	},
	"Flying": {
		"English": "Flying",
		"Español": "Volador",
		"Português": "Voador",
		"Deutsch": "Flug",
		"日本": "ひこう",
		"简中": "飞行",
		"繁中": "飛行",
		"Français": "Vol",
		"Italiano": "Volante",
		"한국어": "비행"
	},
	"Psychic": {
		"English": "Psychic",
		"Español": "Psíquico",
		"Português": "Psíquico",
		"Deutsch": "Psycho",
		"日本": "エスパー",
		"简中": "超能力",
		"繁中": "超能力",
		"Français": "Psy",
		"Italiano": "Psico",
		"한국어": "에스퍼"
	},
	"Bug": {
		"English": "Bug",
		"Español": "Bicho",
		"Português": "Inseto",
		"Deutsch": "Käfer",
		"日本": "むし",
		"简中": "虫",
		"繁中": "蟲",
		"Français": "Insecte",
		"Italiano": "Coleottero",
		"한국어": "벌레"
	},
	"Rock": {
		"English": "Rock",
		"Español": "Roca",
		"Português": "Pedra",
		"Deutsch": "Gestein",
		"日本": "いわ",
		"简中": "岩石",
		"繁中": "岩石",
		"Français": "Roche",
		"Italiano": "Roccia",
		"한국어": "바위"
	},
	"Ghost": {
		"English": "Ghost",
		"Español": "Fantasma",
		"Português": "Fantasma",
		"Deutsch": "Geist",
		"日本": "ゴースト",
		"简中": "幽灵",
		"繁中": "幽靈",
		"Français": "Spectre",
		"Italiano": "Spettro",
		"한국어": "고스트"
	},
	"Dragon": {
		"English": "Dragon",
		"Español": "Dragón",
		"Português": "Dragão",
		"Deutsch": "Drache",
		"日本": "ドラゴン",
		"简中": "龙",
		"繁中": "龍",
		"Français": "Dragon",
		"Italiano": "Drago",
		"한국어": " 	드래곤"
	},
	"Dark": {
		"English": "Dark",
		"Español": "Siniestro",
		"Português": "Sombrio",
		"Deutsch": "Unlicht",
		"日本": "あく",
		"简中": "恶",
		"繁中": "惡",
		"Français": "Ténèbres",
		"Italiano": "Buio",
		"한국어": "악"
	},
	"Steel": {
		"English": "Steel",
		"Español": "Acero",
		"Português": "Aço",
		"Deutsch": "Stahl",
		"日本": "はがね",
		"简中": "钢",
		"繁中": "鋼",
		"Français": "Acier",
		"Italiano": "Acciaio",
		"한국어": "강철"
	},
	"Fairy": {
		"English": "Fairy",
		"Español": "Hada",
		"Português": "Fada",
		"Deutsch": "Fee",
		"日本": "フェアリー",
		"简中": "妖精",
		"繁中": "妖精",
		"Français": "Fée",
		"Italiano": "Folletto",
		"한국어": "페어리"
	},
	"Starter": {
		"English": "Starter",
		"Español": "Inicial",
		"Português": "Inicial",
		"Deutsch": "Starter",
		"日本": "はじめて",
		"简中": "起动机",
		"繁中": "起動機",
		"Français": "de départ",
		"Italiano": "Iniziale",
		"한국어": "파트너"
	},
	"Legend": {
		"English": "Legend",
		"Español": "Legend", //legendario
		"Português": "Lendário", //Legendäre 
		"Deutsch": "Legend",
		"日本": "伝説",
		"简中": "传说的",
		"繁中": "傳說的",
		"Français": "Legend", //légendaire
		"Italiano": "Legend", //leggendari
		"한국어": " 전설의"
	}
}

function writeEmpties() {
	var fs = require('fs');
	var holder = {}
	for(var l in languages) {
		holder[languages[l]] = {};
	}
	for(var t in translatable) {
		for(var l in languages) {
			var eng = translatable[t].English;
			var tra = translatable[t][languages[l]];
			if(eng != "") {
				if(typeof eng == "string" && eng.match(/\n/)) {
					var engs = eng.split("\n");
					var tras = tra.split("\n");
					for(var e in engs) {
						holder[languages[l]][engs[e].replace(/# /, "")] = (tras[e] || "")
					}
				}else{
					holder[languages[l]][eng] = tra;
				}
			}
		}
	}
	for(var l in holder) {
		if(Object.keys(holder[l]).length == 0)
			continue;
		fs.writeFile('./translating_strings/'+l+'.txt', JSON.stringify(holder[l], null, 1), function(){})
	}
}
writeEmpties();