var fs = require('fs');
var translatable = require('./translate.js').translatable;

if(process.argv[2] != undefined) {
	let file = process.argv[2];
	let map = {};
	try{
		fs.readFile("./translating_strings/"+file+".txt", "utf8", function(err, data) {
			if(err)
				throw err;
			let blocks = data.match(/English: [^\n]+\nTranslation: [^\n]*\n/g);
			for(let b in blocks) {
				let eng = blocks[b].match(/English: ([^\n]+)\n/);
				let tra = blocks[b].match(/Translation: ([^\n]+)\n/);
				if(eng && tra)
					map[eng[1]] = tra[1];
			}
			console.log(map);
			for(let t in translatable) {
				let eng = translatable[t].English;
				let tra = map[eng];
				if(!tra && !translatable[t][file]) {
					console.log("Missing translation at " + t);
					continue;
				}
				if(t == "Favorite") {
					tra = tra.split(",");
					while(tra.length < 2) {
						tra.push(tra[0]);
					}
				}
				
				translatable[t][file] = tra;
			}
			
			fs.writeFile('./translout.json', JSON.stringify(translatable, null, 1), function(err) {
				console.log("done");
			})
		});
	}catch(e){
		console.log(e);
	}
}else{
	console.log("No translate file given");
}