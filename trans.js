var Jimp = require('jimp');
var toolbox = require('./toolbox.js');
function hexIntToRgba(hex) {
	let conv = toolbox.convertBases(hex, 10, 16);
	while(conv.length < 8) {
		conv = "0" + conv;
	}
	let r = parseInt(toolbox.convertBases(conv[0]+conv[1], 16, 10));
	let g = parseInt(toolbox.convertBases(conv[2]+conv[3], 16, 10));
	let b = parseInt(toolbox.convertBases(conv[4]+conv[5], 16, 10));
	let a = parseInt(toolbox.convertBases(conv[6]+conv[7], 16, 10));
	return [r, g, b, a];
}
function convert(base, shiny) {
	Jimp.read(base, (err, img) => {
		if(err) {
			console.log(err);
		}
		else{
			Jimp.read(shiny, (err, shiny_image) => {
				if(err) {
					console.log(err);
				}
				else{
					process(img, shiny_image, "output.png");
				}
			})
		}
	})
}
function process(img, shiny, fn) {
	let max_x = img.bitmap.width;
	let max_y = img.bitmap.height;
	for(let x=1; x<=max_x; x++) {
		let str = "";
		for(let y=1; y<=max_y; y++) {
			let base_color = img.getPixelColor(y, x);
			let shiny_color = shiny.getPixelColor(y, x);
			let rgba = hexIntToRgba(base_color);
			let rgba2 = hexIntToRgba(shiny_color);
			if(rgba[3] == 0) {
				// transparent on base
				str += " ";
			}
			else{
				console.log(rgba, rgba2);
				img.setPixelColor(shiny_color, y, x);
				str += "X";
			}
		}
	}
	img.write(fn);
}

convert("./Front/g2Silver/1.png", "./Shiny/g2Silver/1.png");