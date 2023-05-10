var languages = [
	"English",
	"Español",
	"Español_Latino",
	"Português",
	"Deutsch",
	"日本",
	"简中",
	"繁中",
	"Français",
	"Italiano",
	"한국어"
];
var lang_code = {
	"English": "en",
	"Español": "es",
	"Español_Latino": "el",
	"Português": "pt",
	"Deutsch": "de",
	"日本": "ja",
	"简中": "zhs",
	"繁中": "zht",
	"Français": "fr",
	"Italiano": "it",
	"한국어": "ko"
}
var code_lang = {}
for(var n in lang_code)
	code_lang[lang_code[n]] = n;
var regional_suffix = ["Español", "Português", "Français", "Italiano"];
var trailing_fav = ["Français"]
var no_spaces = []//"日本", "简中", "繁中"];
var fallbacks = {
	"Español_Latino": "Español"
}
var currentLang = "English";
var fav_cats = 	[
	"Bird", "Mammal", "RegionBug", "PseudoLegend", "PikachuClone",
	"Eeveelution", "Fossil", "RegionalForm", "Gigantamax",
	"BoxLegendary", "Mythical", "UltraBeast", "Paradox",
	"Type", "Pokeball", "SpindaTitle", "Vivillon", "Alcremie",
	"Baby", "NewEvolution"
]
var femme = {
	"Português": ["-a", "Forma Regional"],
	"Español": ["Eeveelución", "Poké Ball", "Forma Regional", "Ave Regional"],
	"Español_Latino": ["Eeveelución", "Poké Ball", "Forma Regional", "Ave Regional"],
	"Français": ["Ultra-Chimère", "Poké Ball", "Forme Régionale"]
}
var font_sizes = {
	"ShinyCharm1": {
		"English": 24,
		"Português": 22,
		"Français": 22,
		"Deutsch": 22,
		"日本": 20
	},
	"ShinyCharm2": {
		"English": 24,
		"Português": 22,
		"Français": 22,
		"Deutsch": 22,
		"Italiano": 22,
		"한국어": 22,
		"日本": 20
	},
	"Favorite": {
		"English": 27,
		"Français": 23,
		"Español": 25,
		"Español_Latino": 25,
		"日本": 25,
		"한국어": 22,
		"Deutsch": 25,
	},
	"FavAlone": {
		"English": 25,
		"한국어": 22,
		"日本": 18
	},
	"Bug": {
		"English": 25,
		"Italiano": 20
	},
	"Ghost": {
		"English": 25,
		"Português": 23,
		"日本": 22,
		"Español": 23,
		"Español_Latino": 23
	},
	"Poison": {
		"English": 25,
		"Português": 23
	},
	"GimmickForm": {
		"English": 23,
		"Português": 20,
		"Français": 25,
		"Español": 25,
		"Español_Latino": 25,
		"Deutsch": 22,
		"Italiano": 20,
		"日本": 18		
	},
	"Fairy": {
		"English": 25,
		"日本": 18
	},
	"Psychic": {
		"English": 25,
		"日本": 20
	},
	"Dragon": {
		"English": 25,
		"日本": 22
	},
	"Fighting": {
		"English": 25,
		"日本": 22
	},
	"Normal": {
		"English": 25,
		"日本": 22
	},
	"Starter": {
		"English": 25,
		"日本": 22
	}
}
function getTranslString (check) {
	if(!translatable[check])
		return "";
	var tr = translatable[check][currentLang];
	if(tr)
		return tr;
	tr = translatable[check][fallbacks[currentLang]];
	if(tr)
		return tr;
	return translatable[check]["English"];
}
var translatable = {
	// Strings missing translations
	"GimmickForm": {
		"English": "Gimmick<br/>Form",
		"Español": "Forma<br/>Especial",
		"Português": "Forma com<br/>Mecânica",
		"Deutsch": "Gimmick-<br/>Formular",
		"日本": "ギミック・<br/>フォム",
		"简中": "",
		"繁中": "",
		"Français": "Forme<br/>Gadget",
		"Italiano": "Modulo<br/>espediente",
		"한국어": "기믹 형태"
	},
	"PseudoLegend": {
		"English": "Pseudo Legend",
		"Español": "Pseudo-Legendario",
		"Português": "Pseudo<br/>Lendário",
		"Deutsch": "Pseudolegendär",
		"日本": "600族",
		"简中": "",
		"繁中": "",
		"Français": "Pseudo-Légendaire",
		"Italiano": "Pseudo Leggendario",
		"한국어": "의사 전설"
	},
	"BoxLegendary": {
		"English": "Box Legendary",
		"Español": "Legendario de Portada",
		"Português": "Lendário de Capa",
		"Deutsch": "Kiste Legendär",
		"日本": "パケ伝",
		"简中": "",
		"繁中": "",
		"Français": "Légendaire de Boîte",
		"Italiano": "Scatola leggendaria",
		"한국어": "상자 전설"
	},
	"btnPrint": {
		"English": "Download Image",
		"Español": "Descargar imagen",
		"Português": "Baixe a imagem",
		"Deutsch": "Bild herunterladen",
		"日本": "画像をダウンロード",
		"简中": "",
		"繁中": "",
		"Français": "Télécharger l'image",
		"Italiano": "Scarica Immagine",
		"한국어": "이미지 다운로드"
	},
	"altLink": {
		"English": "Alternate download link",
		"Español": "Link alternativo de descarga",
		"Português": "Link alternativo para download",
		"Deutsch": "Alternativer Download-Link",
		"日本": "別のダウンロード リンク",
		"简中": "",
		"繁中": "",
		"Français": "Lien alternatif de téléchargement",
		"Italiano": "Link di download alternativo",
		"한국어": "대체 다운로드 링크"
	},
	"btnExport": {
		"English": "Export Choices",
		"Español": "Exportar selecciones",
		"Português": "Exportar Escolhas",
		"Deutsch": "Exportieren",
		"日本": "エクスポートの選択肢",
		"简中": "",
		"繁中": "",
		"Français": "Exporter les choix",
		"Italiano": "Scelte di esportazione",
		"한국어": "내보내기 선택"
	},
	"btnLoad": {
		"English": "Import Choices",
		"Español": "Importar selecciones",
		"Português": "Importar Escolhas",
		"Deutsch": "Importieren",
		"日本": "インポートの選択肢",
		"简中": "",
		"繁中": "",
		"Français": "Importer les choix",
		"Italiano": "Scelte di importazione",
		"한국어": "가져오기 선택"
	},
	"btnReset": {
		"English": "Reset the grid!",
		"Español": "Reestablecer la cuadrícula",
		"Português": "Reset o quadro",
		"Deutsch": "Gitter zurücksetzen",
		"日本": "グリッドをリセットする",
		"简中": "",
		"繁中": "",
		"Français": "Réinitialiser la grille",
		"Italiano": "Ripristina la griglia",
		"한국어": "그리드 재설정"
	},
	"gridConfirm": {
		"English": "Are you sure you want to reset the grid?",
		"Español": "¿Estás seguro de querer reestablecer la cuadricula?",
		"Português": "Tem certeza que deseja resetar o quadro?",
		"Deutsch": "Möchten Sie das Raster wirklich zurücksetzen?",
		"日本": "グリッドをリセットしますか?",
		"简中": "",
		"繁中": "",
		"Français": "Étes-vous sûrs que vous voulez réinitialiser la grille ?",
		"Italiano": "Sei sicuro di voler reimpostare la griglia?",
		"한국어": "그리드를 재설정하시겠습니까?"
	},
	"import": {
		"English": "# Don't like my choices? You can overrule them here!\n# Write Code will put a text version of the grid here\n# Then you can edit the names and Import Code to replace the images.\n# Most Pokemon are just their named capitalized, like SWELLOW.\n# Alternate forms have specific tags, like MEOWTH_2 for Galarian Meowth.\n# You can also use this to keep backups",
		"Español": "# ¿No te gustan mis selecciones? ¡Puedes cambiarlas aquí!\n# Exportar selecciones generará una versión de texto de la cuadrícula\n# Después podrás editar los nombres y darle click a Importar selecciones para reemplazar las imágenes.\n# La mayoría de Pokémon simplemente son su nombre en mayúsculas, como SWELLOW\n# Las formas alternativas tienen etiquetas específicas, como MEOWTH_2 para Meowth de Galar.\n# También puedes usar esto para realizar respaldos",
		"Português": "# Não gosta das minhas escolhas? Você pode anulá-las!\n# Exportar Escolhas irá colocar uma versão em texto do quadro aqui\n# Então você poderá editar os nomes e Importar Escolhas para substituir as imagens.\n# A maioria dos Pokémon são apenas seus nomes em letra maiúscula, como SWELLOW.\n# Formas Alternativas possuem tags específicas, como MEOWTH_2 para Meowth de Galar.\n# Você também pode usar isso para guardar cópias de segurança.",
		"Deutsch": "",
		"日本": "",
		"简中": "",
		"繁中": "",
		"Français": "# Vous n'aimez pas mes choix ? Vous pouvez les écraser ici !\n# Exporter les choix va mettre une version textuelle de la grille ici\n# Vous pouvez alors éditer les noms et Importer les choix pour remplacer les images.\n# La plupart des noms de Pokémon sont en majuscules, comme SWELLOW\n# Les formes alternatives ont des indices spéciaux, comme MEOWTH_2 pour Miaouss de Galar\n# Vous pouvez aussi l'utiliser pour sauvegarder vos choix",
		"Italiano": "",
		"한국어": ""
	},
	"spinda-help": {
		"English": "Spinda's spots can be randomized or manually placed.<br/>Each box pair in the corners moves its nearest spot.<br/>Up/Down on the first box moves it Right/Left.<br/>Up/Down on the second box moves it Up/Down.",
		"Español": "Las manchas de Spinda pueden ser aleatorias o cambiadas manualmente.<br/>Cada par de cajas en las esquinas cambian la mancha más cercana a ellas<br/>Arriba/Abajo en la primera caja la mueve hacía la Derecha/Izquierda<br/>Arriba/Abajo en la segunda caja la mueve hacía la Derecha/Izquierda",
		"Português": "As manchas do Spinda podem ser aleatórias ou colocadas manualmente.<br/>Cada par de caixas nos cantos da imagem movem as manchas próximas a eles.<br/>Para cima/Para baixo na primeira caixa move as manchas para a Direita/Esquerda.<br/>Para cima/Para baixo na segunda caixa move as manchas para Cima/Baixo.",
		"Deutsch": "Die Punkte von Pandir können zufällig oder manuell platziert werden.<br/>Jedes Kästchenpaar in den Ecken bewegt sich zu seinem nächstgelegenen Punkt.<br/>Nach oben/unten auf dem ersten Kästchen bewegt es sich nach rechts/links.<br/>Nach oben/unten auf dem Das zweite Kästchen bewegt es nach oben/unten.",
		"日本": "パッチールのスポットは、ランダムまたは手動で配置できます。<br/>隅にある各ボックス ペアは、最も近いスポットに移動します。<br/>最初のボックスを上/下にすると、右/左に移動します。<br/>2 番目のボックスを上/下にすると、上/下に移動します。",
		"简中": "",
		"繁中": "",
		"Français": "Les tâches de Spinda peuvent être placées aléatoirement ou à la main<br/>Chaque paire de chiffre dans les coins déplace la tâche la plus proche<br/>Haut/Bas dans la première la déplace vers la Gauche/Droite<br/>Haut/Bas dans la seconde la déplace vers le Haut/Bas",
		"Italiano": "Gli spot di Spinda possono essere randomizzati o posizionati manualmente.<br/>Ogni coppia di riquadri negli angoli sposta il punto più vicino.<br/>Su/Giù sulla prima casella la sposta a destra/sinistra.<br/>Su/Giù sulla seconda casella lo sposta Su/Giù.",
		"한국어": "올루기의 스팟은 무작위로 지정하거나 수동으로 배치할 수 있습니다.<br/>모퉁이에 있는 각 상자 쌍은 가장 가까운 지점을 이동합니다.<br/>첫 번째 상자에서 위/아래로 오른쪽/왼쪽으로 이동합니다.<br/>위/아래로 두 번째 상자는 위/아래로 이동합니다."
	},
	"teamInstructions": {
		"English": "Click a team box, then a Pokémon from the grid to copy it to the box.",
		"Español": "Haz click en la caja de equipo y después en un Pokémon de la cuadrícula para copiarlo a la caja de equipo",
		"Português": "Clique em um dos espaços em branco e depois em um Pokémon do quadro para colocá-lo no time",
		"Deutsch": "Klicken Sie auf eine Teambox und dann auf ein Pokémon aus dem Raster, um es in die Box zu kopieren.",
		"日本": "チーム・ボクスをクリックしてグリッドでポケモンをクリックしてからボクスにそれをコッピします",
		"简中": "",
		"繁中": "",
		"Français": "Cliquez sur une place dans votre équipe, puis un Pokémon de la grille pour l'y copier",
		"Italiano": "Fai clic su una casella della squadra, quindi su un Pokémon dalla griglia per copiarlo nella casella.",
		"한국어": "팀 상자를 클릭한 다음 그리드에서 포켓몬을 클릭하여 상자에 복사합니다."
	},
	"Picking": {
		"English": "Picking...",
		"Español": "Escogiendo...",
		"Português": "Escolhendo...",
		"Deutsch": "Pflücken...",
		"日本": "えらんでいます・・・",
		"简中": "",
		"繁中": "",
		"Français": "Choix en cours...",
		"Italiano": "Aggiunta...",
		"한국어": "선발..."
	},
	/*
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
	*/
	// Less simple strings translated w/ Google Translate
	// may very well be issues in here
	// especially in Japanese/Chinese/Korean where I am completely lost
	"ShinyCharm1": {
		"English": "Click the Shiny Charm, then click Pokemon to make them shiny.",
		"Español": "Haz click en el Amuleto Iris, después haz click en un Pokémon para hacerlo shiny.",
		"Português": "Clique no Shiny Charm e, em seguida, clique nos Pokémon para torná-los brilhantes.",
		"Deutsch": "Klicken Sie auf den Schillerpin und dann auf Pokemon, um sie shiny zu Schillerndes.",
		"日本": "ひかるおまもりをクリックしてから、ポケモンをクリックして光るます。",
		"简中": "点击闪耀护符然后点击宝可梦让它们发光。",
		"繁中": "單擊闪耀护符然後單擊宝可梦使它們發光。",
		"Français": "Cliquez sur le Charme Chroma, puis cliquez sur un Pokemon pour le rendre shiny.",
		"Italiano": "Fai clic sul Cromamuleto , quindi fai clic su Pokemon per renderli shiny.",
		"한국어": "빛나는부적 을 클릭한 다음 포켓몬 을 클릭하여 반짝이게 만들 빛나는"
	},
	"ShinyCharm2": {
		"English": "Or click here to make everything shiny.",
		"Español": "O haz click aquí para hacer a todos shiny.",
		"Português": "Ou clique aqui para fazer que todos sejam brilhantes.",
		"Deutsch": "Oder klicken Sie hier, um alles shiny zu machen.",
		//"日本": "または、ここをクリックしてすべてを光るにします。",
		"日本": "がここにクリックしてから、みんなのポケモンが光るになります",
		"简中": "",
		"繁中": "",
		"Français": "Ou cliquez ici pour les rendres tous shiny",
		"Italiano": "Oppure clicca qui per rendere tutto shiny.",
		"한국어": "또는 여기를 클릭하여 모든 것을 빛나는"
	},
	"btnRandom": {
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
		"Español": "Este sitio usa cookies para guardar tus selecciones. Puedes desactivarlas aquí.",
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
		"Español": "Este sitio usa cookies para guardar tus selecciones. Puedes habilitarlos aquí.",
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
		"Español": "Clon de Pikachu",
		"Português": "Clone do Pikachu",
		"Deutsch": "Pikachuklon",
		"日本": "ピカチュウのクローン",
		"简中": "皮卡丘克隆",
		"繁中": "皮卡丘克隆",
		"Français": "Clone de Pikachu",
		"Italiano": "Clone di Pikachu",
		"한국어": "피카츄 클론"
	},
	"Eeveelution": {
		"English": "Eeveelution",
		"Español": "Eeveelución",
		"Português": "Eevolução",
		"Deutsch": "Evolilution",
		"日本": "イーブイズ",
		"简中": "伊布家族",
		"繁中": "伊布家族",
		"Français": "Évolition",
		"Italiano": "Eeveeluzione",
		"한국어": "이브이즈"
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
	"FavAlone": {
		// masc / femme
		"English": "Favorite",
		"Español": "Favorito",
		"Português": "Favorito",
		"Deutsch": "Favorit",
		"日本": "お気に入り",
		"简中": "最喜欢的",
		"繁中": "最喜歡的",
		"Français": "Préféré",
		"Italiano": "Preferito",
		"한국어": "가장<br/>좋아하는"
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
		"English": "Regional ",
		"Español": " Regional",
		"Português": " Regional",
		"Deutsch": "Regional ",
		"日本": "地域",
		"简中": "地区",
		"繁中": "地區",
		"Français": " Régional",
		"Italiano": " Regionale",
		"한국어": "지역 "
	},
	"Bird": {
		"English": "Regional Bird",
		"Español": "Ave Regional",
		"Português": "Pássaro Regional",
		"Deutsch": "Regional Vogel",
		"日本": "地域鳥",
		"简中": "地区鸟",
		"繁中": "地區鳥",
		"Français": "Oiseau Régional",
		"Italiano": "Uccello Regionale",
		"한국어": "지역 새"
	},
	"Mammal": {
		"English": "Regional Mammal",
		"Español": "Mamífero Regional",
		"Português": "Mamífero Regional",
		"Deutsch": "Regional Säugetier",
		"日本": "地域哺乳類",
		"简中": "地区哺乳动物",
		"繁中": "地區哺乳動物",
		"Français": "Mammifère Régional",
		"Italiano": "Mammifero Regionale",
		"한국어": "지역 포유류"
	},
	"RegionBug": {
		"English": "Regional Bug",
		"Español": "Bicho Regional",
		"Português": "Inseto Regional",
		"Deutsch": "Regional Käfer",
		"日本": "地域むし",
		"简中": "地区虫",
		"繁中": "地區蟲",
		"Français": "Insecte Régional",
		"Italiano": "Coleottero Regionale",
		"한국어": "지역 벌레"
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
		"Español": "Forma Regional",
		"Português": "Forma Regional",
		"Deutsch": "Regionalform",
		"日本": "リージョンフォーム",
		"简中": "地區型態",
		"繁中": "地區型態",
		"Français": "Forme Régionale",
		"Italiano": "Forma Regionale",
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
		"Español": "Pokémon Singular",
		"Español_Latino": "Mítico",
		"Português": "Mítico",
		"Deutsch": "Mysteriöse Pokémon",
		"日本": "幻のポケモン",
		"简中": "幻之宝可梦",
		"繁中": "幻之寶可夢",
		"Français": "Pokémon Fabuleux",
		"Italiano": "Pokémon Misterioso",
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
		"Español": "Pokémon Paradoja",
		"Português": "Paradoxo",
		"Deutsch": "Paradox",
		"日本": "パラドックス",
		"简中": "悖謬",
		"繁中": "悖謬",
		"Français": "Pokémon Paradoxe",
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
	"Baby": {
		"English": "Baby",
		"Español": "Bebé",
		"Português": "Bebê",
		"Deutsch": "Baby",
		"日本": "얼루기",
		"简中": "婴儿",
		"繁中": "嬰兒",
		"Français": "Bébé ",
		"Italiano": "Baby",
		"한국어": " 베이비 "
	},
	"NewEvolution": {
		"English": "New Evo",
		"Español": "Nueva<br/>Evolución",
		"Português": "Nova<br/>Evolução",
		"Deutsch": "Neue<br/>Entwicklung",
		"日本": "新しい進化",
		"简中": "新进化",
		"繁中": "新進化",
		"Français": "Nouvelle<br/>évolution",
		"Italiano": "Nuova<br/>Evoluzione",
		"한국어": "새로운 진화"
	},
	"SpindaTitle": {
		"English": "Spinda",
		"Español": "Spinda",
		"Português": "Spinda",
		"Deutsch": "Pandir",
		"日本": "パッチール",
		"简中": "晃晃斑",
		"繁中": "晃晃斑",
		"Français": "Spinda",
		"Italiano": "Spinda",
		"한국어": "얼루기"
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
		"Français": "Starter",
		"Italiano": "Iniziale",
		"한국어": "파트너"
	},
	"Legend": {
		"English": "Legend",
		"Español": "Legend",
		"Português": "Lendário",
		"Deutsch": "Legend",
		"日本": "伝説",
		"简中": "传说的",
		"繁中": "傳說的",
		"Français": "Légend",
		"Italiano": "Leggend",
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
function resolveFem(string, lang, arr) {
	if(femme[lang].includes(string))
		return arr[1];
	if(femme[lang].includes("-a") && string.match(/a$/))
		return arr[1];
	return arr[0];
}
function changeLang(lang) {
	if(code_lang[lang])
		lang = code_lang[lang];
	if(!languages.includes(lang) || lang == currentLang)
		return;
	currentLang = lang;
	var fallback = (fallbacks[lang] || "English");
	var favs = translatable["Favorite"][lang];
	if(!favs)
		favs = translatable["Favorite"][fallback];
	var use_femme = femme.hasOwnProperty(lang);
	for(let tr_id in translatable) {
		var tr_info = translatable[tr_id];
		var tr_ele = document.getElementById(tr_id);
		if(!tr_ele)
			continue;
		var tr_st = tr_info[lang];
		if(!tr_st)
			tr_st = tr_info[fallback];
		if(fav_cats.includes(tr_id)) {
			// Favorite Thing
			var fn = favs[0];
			if(use_femme)
				fn = resolveFem(tr_st, lang, favs)
			if(no_spaces.includes(lang)) {
				tr_st = fn + tr_st;
			}else if(trailing_fav.includes(lang)) {
				tr_st = tr_st + "<br/>" + fn;
			}else{
				tr_st = fn + "<br/>" + tr_st;
			}
			// deal with font size
			if(font_sizes["Favorite"][lang]) {
				tr_ele.style.fontSize = font_sizes["Favorite"][lang];
			}else{
				tr_ele.style.fontSize = font_sizes["Favorite"]["English"]
			}
		}
		if(tr_ele.type == "button") {
			tr_ele.value = tr_st;
		}else{
			tr_ele.innerHTML = tr_st;
		}
		// deal with font size
		if(font_sizes[tr_id]) {
			if(font_sizes[tr_id][lang]) {
				tr_ele.style.fontSize = font_sizes[tr_id][lang];
			}else{
				tr_ele.style.fontSize = font_sizes[tr_id]["English"]
			}
		}
	}
	var nextURL = "https://cajunavenger.github.io/"
	if(lang != "English")
		nextURL += "?lang=" + lang_code[lang];
	var nextTitle = "Ultimate Favorite Pokemon Picker";
	var nextState = { additionalInformation: 'Updated the language parameter' };
	document.getElementById("new_url").innerHTML = nextURL;
	document.getElementById("new_url").href = nextURL;
	try{
		window.history.replaceState(nextState, nextTitle, nextURL);
	}catch(e){
		// unclear when this does and doesn't work
	}
}

