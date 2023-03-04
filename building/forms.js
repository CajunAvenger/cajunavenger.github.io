var fs = require('fs');
var forms = require('./forms.json');

var form_holder = [];
var form_doc = "";

function toTitleCase(str) { 									//changes string To Title Case
	if(!str)
		return str;
	return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
	);
}


form_doc += "Some Pokemon forms are not normally accessible in the grid, but can be loaded with the Write/Import box.\nThe key names for those forms are listed below:\n";

form_doc += "\n\nStandard forms:\n";

for(let f in forms.forms) {
	form_holder.push(f);
	let form_list = forms.forms[f];
	for(let n=0; n<form_list.length; n++) {
		if(form_list[n] == "")
			continue;
		form_holder.push(f+"_"+n);
		form_doc += `${form_list[n]} ${toTitleCase(f)}: ${f+"_"+n}\n`
	}
}
form_doc += "\n\n\nFemale forms:\n";
for(let f in forms.female) {
	form_holder.push(forms.female[f]);
	form_holder.push(forms.female[f]+"_female");
	form_doc += `${toTitleCase(forms.female[f])}: ${forms.female[f]}_female\n`
}
form_doc += "\n\n\nAdditional forms:\n";
for(let f in forms.secret) {
	let form_list = forms.secret[f];
	for(let n=0; n<form_list.length; n++) {
		if(form_list[n] == "")
			continue;
		form_doc += `${form_list[n]} ${toTitleCase(f)}: ${f+"_"+n}\n`
	}
}

fs.writeFile('form_array.json', JSON.stringify(form_holder), function() {
	console.log("array done");
})
fs.writeFile('form_doc.txt', form_doc, function() {
	console.log("doc done");
})