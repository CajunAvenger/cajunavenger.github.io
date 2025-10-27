/* Toolbox
 Various utility scripts.
*/
//javascript management
function isReal (test, type) { 									//returns false if test is undefined or not of the optional type
	if(typeof test === 'undefined')
		return false;
	if(type == 'array' && !Array.isArray(test))
		return false;
	if(typeof type === 'string' && typeof test != type)
		return false;
	return true;
}
function hasValue (test, type) { 								//returns false if test is undefined, null, 0, false, an empty array, object, or string, or not of the optional type (including array)
	if(!isReal(test, type) || !test)
		return false;
	if(typeof test == 'object' && Array.isArray(test) && test.length === 0)
		return false;
	if(typeof test == 'object' && Object.keys(test) && Object.keys(test).length === 0)
		return false;
	return true;
}
function arrayDuplicates(array1, array2) {						//returns array of duplicate elements between two arrays
	let shortArray = [];
	let longArray = [];
	let dupeArray = [];
	if(array1.length > array2.length) {
		shortArray = array2;
		longArray = array1;		
	}else{
		shortArray = array1;
		longArray = array2;	
	}
	for(let value in shortArray) {
		if(longArray.includes(shortArray[value]))
			dupeArray.push(shortArray[value]);
	}
	return dupeArray;
}
function arrayDiagram(array1, array2) {							//returns [array1exclusives, array2exlusives, shared]
	let array1_exclusive = [];
	let array2_exclusive = [];
	let shared = [];
	
	if(!array1)
		array1 = [];
	if(!array2)
		array2 = [];

	for(let e in array1) {
		if(array2.includes(array1[e])) {
			shared.push(array1[e])
		}else{
			array1_exclusive.push(array1[e]);
		}
	}
	for(let e in array2) {
		if(!shared.includes(array2[e]))
			array2_exclusive.push(array2[e]);
	}
	
	return [array1_exclusive, array2_exclusive, shared];
}
function arrayMerge(array1, array2) {							//returns array containing each element in the two arrays listed once
	let ar = [];
	for(let e in array1) {
		if(!ar.includes(array1[e]))
			ar.push(array1[e])
	}
	for(let e in array2) {
		if(!ar.includes(array2[e]))
			ar.push(array2[e])
	}
	return ar;
}
function arraysInclude(a1, a2) {								//return if a2 includes any elements of a1
	for(e in a1) {
		if(a2.includes(a1[e]))
			return true;
	}
	return false;
}
function removeDuplicates(array) {								//removes duplicate elements from an array
	let out = [];
	for(let a in array) {
		if(!out.includes(array[a]))
			out.push(array[a]);
	}
	return out;
}
function reassignIndex(array, oldIndex, newIndex) { 			//moves element of array
	array.splice(newIndex, 0, array.splice(oldIndex,1)[0]);
	return array;
}
function swapIndex(array, i1, i2) {
	array[i1] = array.splice(i2, 1, array[i1])[0];
}
function escapify(string) { 									//escapes strings for RegExp
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function windex(string) {										//remove illegal characters for windows files
	return string.replace(/[\\\/|*<>?":]/g, "")
}
function globalCapture(regString, matchString, caseSense) { 	//returns array of capture group regexes of a global regex check, functionally allowing capture groups on a global regex
	let flags = "";
	if(!caseSense)
		flags += "i";
	let globalRegex = new RegExp(regString, 'g'+flags);
	let captureRegex = new RegExp(regString, flags);
	let finalArrays = [];
	
	let globalMatches = matchString.match(globalRegex);
	if(globalMatches) {
		for(let m in globalMatches) {
			let localMatches = globalMatches[m].match(captureRegex);
			if(localMatches) {
				finalArrays.push(localMatches);
			}
		}
	}
	return finalArrays;
}
function cloneObj(obj){ 										//clone an object to prevent javascript reference shenanigans
	let cloned = {};
	for(let key in obj)
		cloned[key] = obj[key];
	return cloned;
}
function objSort(obj) {											//sorts an object alphabetically
	let list = Object.keys(obj);
	for(let thisKey in list) {
		list[thisKey] += "_numcorr"
	}
	list.sort();
	let newObj = {};
	for(let thisKey in list) {
		list[thisKey] = list[thisKey].replace(/_numcorr$/, "");
		newObj[list[thisKey]] = obj[list[thisKey]]
	}
	return newObj;
}
function spliceArray(info){ 									//i always forget how to use Array.splice() so i made my own {array:[], index:#, replace:bool#, insert:elementToInsert}
	let array = info.array;
	let index = info.index;
	let replace = 0;
	if(info.hasOwnProperty('replace'))
		replace = info.replace;
	if(info.hasOwnProperty('insert')) {
		array.splice(index, replace, info.insert)
	}else{
		array.splice(index, replace)
	}
	return array;

}
function clearElements(array, elArray) {						//removes all instances of given elements from array
	if(typeof elArray == "string" || typeof elArray == "number")
		elArray = [elArray];
	if(!Array.isArray(elArray))
		return array;
	let newArray = [];
	for(let e in array) {
		if(!elArray.includes(array[e]))
			newArray.push(array[e]);
	}
	return newArray;
}
function addIfNew(obj, field, init){ 							//adds field to object but only if its doesn't have it yet
	if(!obj.hasOwnProperty(field))
		return obj[field] = init;
	return obj;
}
function avgArray(array) { 										//returns the average value of an array of numbers
	if(array.length == 0)
		return 0;
	let sum = array.reduce(function(a,b) {
		return parseFloat(a)+parseFloat(b);
	});
	return sum / array.length;
}
function medianArray(array) {									//returns the median value of an array of numbers
	array.sort();
	if(array.length%2) { //odd
		return array[(array.length-1)/2];
	}else{
		let high = array[array.length/2];
		let low = array[(array.length/2)-1];
		return ((high+low)/2);
	}
}
function modeArray(array) {										//returns modes of an array of numbers
	let counting = {};
	for(let n in array) {
		if(!counting.hasOwnProperty(array[n]))
			counting[array[n]] = 0;
		counting[array[n]]++;
	}
	let max = 0;
	let out = [];
	for(let n in counting) {
		if(counting[n] > max) {
			max = counting[n];
			out = [n];
		}else if(counting[n] == max){
			out.push(n);
		}
	}
	return out;
}
function maxArray (thisArray, iterations) {						//get the N highest values of a given array
	var maxedArray = [];
	thisArray.sort(function(a, b) {
		return b - a;
	});
	for(var i = 0; i < iterations; i++)
		maxedArray.push(thisArray[i]);
	return maxedArray;
}
function minArray (thisArray, iterations) {						//get the N lowest values of a given array
	var minedArray = [];
	thisArray.sort(function(a, b) {
		return a - b;
	});
	for(var i = 0; i < iterations; i++)
		minedArray.push(thisArray[i]);
	return minedArray;
}
function lastIndex(array) {										//returns last index of an array
	if(!Array.isArray(array) || !array.length)
		return undefined;
	return array.length-1;
}
function lastElement(array) {									//returns last element of an array
	if(!Array.isArray(array) || !array.length)
		return undefined;
	return array[array.length-1];
}
function mapToObject(map) {
	let out = {};
	for(let c of map) {
		out[c[0]] = c[1];
	}
	return out;
}
//helpful functions
function xor(a, b) { 											//exclusive or, returns true or false
	if(a && b)
		return false;
	if(!a && !b)
		return false;
	return true;
}
function findExclusive(boolArray) {								//checks array for exclusive boolean true, returns [boolean, [indexes of trues]]
	let index1 = boolArray.indexOf(true);
	let index2 = boolArray.lastIndexOf(true);
	if(index1 == -1)
		return [false, [null]];
	if(index1 == index2)
		return [true, [index1]];
	let boolOutput = [];
	for(let bool in boolArray) {
		if(boolArray[bool])
			boolOutput.push(bool);
	}
	return [false, boolOutput];
}
function rand(low, high) { 										//rand(x) or rand(x,y) gets a random number from 0-x or random number from x-y
	if(high == undefined)
		high = 0;
	let dif = Math.abs(low-high)+1;
	let rand = Math.floor(Math.random()*dif);
	rand += Math.min(low, high);
	return rand;
}
function randString(len) {
	let str = "";
	for(let i=0; i<len; i++) {
		str += digiAlpha(rand(64));
	}
	return str;
}
function shuffleArray(array) { 									//shuffles arrays
    let counter = array.length;
    while (counter > 0) { 								// While there are elements in the array
        let index = Math.floor(Math.random() * counter);// Pick a random index
		counter--;										// Decrease counter by 1
        let temp = array[counter]; 						// And swap the last element with it
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
function shuffleArray2(array) {									//less code but like 3x slower apparently
	for(let i = array.length-1; i > -1; i--) {
		let j = rand(0, i);
		swapIndex(array, i, j);
	}
}
function timeSince(startTime) { 								//get milliseconds from now to given time, negative values are future
	let checkTime = new Date().getTime();
	return checkTime - startTime;
}
function timeConversion(milliseconds,precision,units) {			//converts milliseconds to X years, X days, etc.
	if(!units)
		units = ["year","day","hour","minute","second","millisecond"];
	let timeArray = [];
	let timeNameArray = [];
	times = {
		year: 31556952000,
		day: 86400000,
		hour: 3600000,
		minute: 60000,
		second: 1000,
		millisecond: 1
	}
	for(let t in times) {
		if(units.includes(t)) {
			let spent = Math.trunc(milliseconds / times[t]);
			milliseconds -= times[t] * spent;
			timeArray.push(spent);
			timeNameArray.push(t)
		}
	}
	let wordTime = "";
	for(let i=0;i<timeArray.length;i++) {
		if(timeArray[i] != 0) {
			wordTime += timeArray[i] + " " + timeNameArray[i];
			if(timeArray[i] != 1)
				wordTime += "s";
			wordTime += ", "
		}
	}
	wordTime = wordTime.replace(/, $/,"");
	if(wordTime == "")
		wordTime = timeArray[0] + " " + timeNameArray[0];
	//if(timeArray[0] != 1)
	//	wordTime += "s";
	if(!precision)
		return wordTime;
	let wordSplit = wordTime.split(",");
	wordTime = "";
	for(let i=0; i<precision; i++) {
		wordTime += wordSplit[i];
		if(i != precision-1)
			wordTime += ", ";
	}
	return wordTime;
}
function setTimeDistance(number, distance, direction, currentTime) {		//creates a date object for (number) (distance) from now
	let wholeNumber = Math.trunc(number);
	if(!currentTime)
		currentTime = new Date();
	let pingYear = 0;
	let pingMonth = 0;
	let pingDay = 0;
	let pingHour = 0;
	let pingMinute = 0;

	if(distance.match(/^(second|s)s?$/i))
		pingMinute += Math.trunc(wholeNumber/60);
	if(distance.match(/^(minute|min|m)s?/i))
		pingMinute += wholeNumber;
	
	if(distance.match(/^(hour|hr|h)s?$/i)) {
		pingHour += wholeNumber;
		pingMinute += Math.trunc((number - wholeNumber) * 60);
	}
	if(distance.match(/^(day|dy|d)s?$/i)) {
		pingDay += wholeNumber;
		pingHour += Math.trunc((number - wholeNumber) * 24);
	}
	if(distance.match(/^(week|wk|w)s?/i)) {
		pingDay += 7*wholeNumber;
		pingHour += Math.trunc((number - wholeNumber) * 7);
	}
	if(distance.match(/^(month)s?$/i)) {
		pingMonth += wholeNumber;
		pingDay += Math.trunc((number - wholeNumber) * 30);
	}
	if(distance.match(/^(year|yr|y)s?$/i)) {
		pingYear += wholeNumber;
		pingDay += Math.trunc((number - wholeNumber) * 365);
	}
	if(distance.match(/^(decade)s?$/i)) {
		pingYear += 10*wholeNumber;
		pingYear += Math.trunc((number - wholeNumber) * 10);
	}
	if(direction == "past") {
		pingYear *= -1;
		pingMonth *= -1;
		pingDay *= -1;
		pingHour *= -1;
		pingMinute *= -1;
	}
	pingYear += currentTime.getFullYear();
	pingMonth += currentTime.getMonth();
	pingDay += currentTime.getDate();
	pingHour += currentTime.getHours();
	pingMinute += currentTime.getMinutes();

	return new Date(pingYear, pingMonth, pingDay, pingHour, pingMinute, 0, 0);
}
function setRelativeTime(timeString, direction, currentTime) {	//creates a date object for "X days, Y hours, Z minutes" from now
	var timeMatch = globalCapture(/([0-9\.]+) ?(second|s|minute|min|hour|hr?|day|week|wk?|month|m|year|yr|y|decade|d)s?/, timeString);
	if(!currentTime)
		currentTime = new Date();
	let refArray = ["s", "min", "m", "hr", "h", "d", "wk", "w", "yr", "y"];
	let nameArray = ["second", "minute", "minute", "hour", "hour", "day", "week", "week", "year", "year"];
	for(t in timeMatch) {
		let number = timeMatch[t][1];
		let distance = timeMatch[t][2].toLowerCase();
		if(refArray.includes(distance))
			distance = nameArray[refArray.indexOf(distance)];
		currentTime = setTimeDistance(number, distance, direction, currentTime);
	}
	return currentTime;
}
function setTheDate (splitter) {								//creates a YY.MM.DD format with a given divider
	let the_time = new Date();
	return the_time.getYear()-100 + splitter + (the_time.getMonth() < 10 ? "0" + the_time.getMonth() : the_time.getMonth()) + splitter + (the_time.getDate() < 10 ? "0" + the_time.getDate() : the_time.getDate());
}
function nextSquare(num) {										//increase number to the next power of 2
	return Math.pow(2, Math.ceil(Math.log2(num)));
}
function sortIndexes(array) {									//returns array of indexes from greatest to smallest value
	let indexArray = [];
	for(let i = 0; i<array.length; i++)
		indexArray.push(i);
	indexArray.sort(function(a, b) {
		return array[b] - array[a];
	})
	return indexArray;
}
function stringIneq(t1, eq, t2) {								//string inequality, ie check if "1" ">" "0" is true
	let ver = false;
	switch(eq) {
		case "<=":
			ver = (t1 <= t2);
			break;
		case "=<":
			ver = (t1 <= t2);
			break;
		case ">=":
			ver = (t1 >= t2);
			break;
		case "=>":
			ver = (t1 >= t2);
			break;
		case ">":
			ver = (t1 > t2);
			break;
		case "=":
			ver = (t1 == t2);
			break;
		case "<":
			ver = (t1 < t2);
			break;
	}
	return ver;
}
//formatting text
function arrayTheDate (the_time) { 								//creates a [YY,MM,DD,HH,MM] array
	if(!hasValue(the_time))
		the_time = new Date();
	return [the_time.getFullYear()-2000,(the_time.getMonth()+1 < 10 ? "0" + (the_time.getMonth()+1) : the_time.getMonth()+1),(the_time.getDate() < 10 ? "0" + the_time.getDate() : the_time.getDate()),(the_time.getHours() < 10 ? "0" + the_time.getHours() : the_time.getHours()),(the_time.getMinutes() < 10 ? "0" + the_time.getMinutes() : the_time.getMinutes())];
}
function dateToNumber (date) {									//convert 2020-06-12 style dates to integer, 20200612
	date = date.replace(/-/g, "")
	if(date.length < 6)
		date = fillLength(date, 6, "", "0")
	date = parseInt(date);
	return date;
}
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
function fillLength(string, length, leading, trailing) { 		//fills string to given length with given leading and/or trailing data
	string = String(string);
	if(!hasValue(leading))
		leading = "";
	if(!hasValue(trailing))
		trailing = "";
	if(leading.length + trailing.length == 0)
		return string;
	while(string.length < length) {
		string = leading + string + trailing;
	}
	return string;
}
function stripEmoji(string) { 									//strips emoji from strings
  return string.replace(/\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFE])|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69])(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83E\uDDD1(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC3B\u200D\u2744|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDF])\u200D[\u2640\u2642])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g, "");
}
function ordinalize(num) { 										//converts number (1, 2, 3, etc) into ordinal (1st, 2nd, 3rd, etc)
	let ordArray = ["th","st","nd","rd","th","th","th","th","th","th","th","th","th","th"];
	let string = num.toString();
	if(parseInt(num) < ordArray.length)
		return string + ordArray[num]; //return 0 to 13 directly
	//get last two characters
	let test1 = string.charAt(string.length-1);
	let test2 = string.charAt(string.length-2);
	let test3 = "";
	if(test2 != "0")
		test3 += test2;
	test3 += test1;
	if(parseInt(test3) < ordArray.length)
		return string + ordArray[parseInt(test3)]; //return 0 to 13 directly
	return string + ordArray[test1]; //else return ord of last digit
}
function writeIndexes (array) {									//write the indexes for an array
	let i = 0, output = "";
	for(let thing in array) {
		output += i + ": " + array[thing] + "\n";
		i++;
	}
	return output;
}
function JSONfriendly(obj) {
	let out = "";
	for(let k in obj) {
		out += `"${k}": ${JSON.stringify(obj[k])},\n`;
	}
	return `{\n${out.replace(/,\n$/, "\n}")}`;
}
//playing with numbers
function convertNumbers (number) { 								//converts numbers +-999,999,999,999 to number words
	let digiArray = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	let magArray = ['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
	let decArray = ['hundred','thousand','million','billion']//,'trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion'];
	//really struggles with trillion and beyond
	if(typeof number == 'number') {
		let output = "";
		if(number < 0)
			output += "negative "
		if(number < 100)
			return output + convert99(number)
		let dec = Math.trunc((String(number).length-1)/3); // <1000 -> 0, <million -> 1, <billion -> 2...
		let result = decArray[dec];
		if(result == 'hundred') 
			return output + convert100(number);
		while(number > 0) {
			let numString = String(number);
			let numLead = "";
			let leadVal = numString.length%3;
			if(leadVal == 0)
				leadVal = 3;
			for(i=0;i<leadVal;i++)
				numLead += numString.charAt(i);
			let leadNumbers = parseInt(numLead);
			if(result == "hundred" && leadNumbers < 100) {
				output = output.replace(/, $/, "") + " and " + convert99(leadNumbers)
			}else if(result == "hundred") {
				output += convert100(leadNumbers);
			}else{
				output += convert100(leadNumbers) + " " + result + ", ";
			}
			let thousands = numString.length - leadVal;
			let multi = parseInt(fillLength("1", thousands+1, null, "0"))
			number -= leadNumbers*multi;
			dec = Math.trunc((String(number).length-1)/3);
			result = decArray[dec];
		}
		//output = output.replace(/, $/,"");
		return output;
	}
	else if(typeof number == 'string') {
		let numArray = [ 'zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','billion'];
		let valArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100,1000,1000000,1000000000];//,1000000000000,1000000000000000,1000000000000000000,1000000000000000000000,1000000000000000000000000,1000000000000000000000000000,1000000000000000000000000000000,1000000000000000000000000000000000];
		let finalResult = 0;
		let onesString = "(one|two|three|four|five|six|seven|eight|nine)";
		let tensString = "(ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)";
		let decString = "(thousand|million|billion)";
		let tensReg = '('+tensString+')-?('+onesString+')?';
		let hundReg = onesString+' hundred ?a?n?d? ?('+tensString+'?(-?'+onesString+')?)?';
		let decReg = '('+tensString+'?-?'+onesString+'? ?(hundred)?( and )?('+tensString+'?(-?'+onesString+')?)?)? '+decString;
		let numRegString = '('+decReg+'|'+hundReg+'|'+tensReg+'|'+onesString+')';
		let bigRegEx = new RegExp(numRegString, 'g');
		let lilRegEx = new RegExp(numRegString, 'i');
		let numPuller = number.match(bigRegEx);
		if(hasValue(numPuller)) {
			for(let i=0; i<numPuller.length; i++) {
				if(numPuller[i] != undefined) {
					let numMatch = numPuller[i].match(lilRegEx);
					if(numMatch[1] != undefined) {
						let decRegEx = new RegExp(decReg,'i'); //1:100X, 10: X
						let hundRegEx = new RegExp(hundReg, 'i'); //1: 100, 3: 10, 5: 1
						let tensRegEx = new RegExp(tensReg, 'i'); //1: 10, 2: 1
						let onesRegEx = new RegExp(onesString, 'i'); //1: 1
						
						let decMatch = numMatch[1].match(decRegEx);
						let hundMatch = numMatch[1].match(hundRegEx);
						let tensMatch = numMatch[1].match(tensRegEx);
						let onesMatch = numMatch[1].match(onesRegEx);
						if(hasValue(decMatch)) {
							let tempValue = valArray[numArray.indexOf(decMatch[10])];
							if(decMatch[1] != undefined) {
								let decHundMatch = decMatch[1].match(hundRegEx);
								if(decHundMatch != undefined) {
									tempValue *= score100(decHundMatch);
								}else{
									tempValue *= valArray[numArray.indexOf(decMatch[1])];
								}
							}
							finalResult += tempValue;
						}else if(hasValue(hundMatch)) {
							finalResult += score100(hundMatch);
						}else if(hasValue(tensMatch)) {
							finalResult += valArray[numArray.indexOf(tensMatch[1])];
							if(tensMatch[3] != undefined)
								finalResult += valArray[numArray.indexOf(tensMatch[3])];
						}else if(hasValue(onesMatch)) {
							finalResult += valArray[numArray.indexOf(onesMatch[1])];
						}
					}
				}
			}
		}else{
			return NaN;
		}
		if(number.match(/^negative/))
			finalResult *= -1;
		return finalResult;
	}
}
function score100(numberline) {									//turn a "X hundred and Yty-Z" line into a number
	//numberline[1] is hundreds
	//numberline[3] is tens
	//numberline[5] is ones
	let numArray = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety','hundred','thousand','million','billion'];
	let valArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100,1000,1000000,1000000000];//,1000000000000,1000000000000000,1000000000000000000,1000000000000000000000,1000000000000000000000000,1000000000000000000000000000,1000000000000000000000000000000,1000000000000000000000000000000000];
	let result = 0;
	if(hasValue(numberline[1]))
		result += 100*valArray[numArray.indexOf(numberline[1])];
	if(hasValue(numberline[3]))
		result += valArray[numArray.indexOf(numberline[3])];
	if(hasValue(numberline[5]))
		result += valArray[numArray.indexOf(numberline[5])];
	return result;
}
function convert100 (number) {									//turn 100 to 999 into words
	if(number < 100)
		return convert99(number);
	let digiArray = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	let magn = Math.trunc(number/100);
	let remain = number-100*magn;
	let result = digiArray[magn] + " hundred and " + convert99(remain);
	result = result.replace(" and zero","");
	return result
}
function convert99 (number) { 									//turn 0 to 99 into words
	let digiArray = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	let magArray = ['one','ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
	if(number < 20)
		return digiArray[number];
	let mag = Math.trunc(number / 10)
	let digi = number%10
	let result = magArray[mag];
	if(digi > 0)
		result += "-" + digiArray[digi]
	return result;
}
var _0zArray = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","!","@","#","$","%","^","&","*","(",")"]
function digiDecimal(digitString){ 								//convert string 0-) to number 0-72
	return _0zArray.indexOf(digitString);
}
function digiAlpha(digitString) { 								//convert number 0-36 to string 0-) [0-9, a-z, A-Z, !-)]
	return _0zArray[digitString];
}
function convertDecimal(digit, currentBase) { 					//convert from any base to base 10
	if(currentBase == 10)
		return digit;
	let equiv = 0;
	let digitString = String(digit);
	for(let i = digitString.length-1; i>=0; i--) {
		let pow = digitString.length - i - 1;
		equiv += digiDecimal(digitString[i]) * Math.pow(currentBase, pow)
	}
	return equiv;
}
function convertBases(digit, currentBase, newBase){ 			//converts from any base (1-36) to any other base
	currentBase = Math.trunc(Math.min(72, Math.max(1,currentBase)));
	newBase = Math.trunc(Math.min(72, Math.max(1,newBase)));
	let negFlag = false;
	if(typeof digit == 'number' && digit < 0) {
		digit *= -1;
		negFlag = true;
	}
	let equiv = convertDecimal(digit, currentBase);
	if(newBase == 1) {
		equiv = parseInt(Array(equiv).fill(1).join(""));
	}
	else if(newBase != 10) {
		let remainders = [];
		while(equiv > 0) {
			/*let rem = equiv % newBase;
			let res = Math.round((equiv / newBase) - (rem/newBase));
			let res = Math.round((equiv / newBase) - (rem/newBase));
			equivString = digiAlpha(rem) + equivString;
			equiv = res;*/
			let remainder = equiv % newBase;
			equiv = (equiv-remainder)/newBase;
			remainders.push(digiAlpha(remainder))
		}
		remainders.reverse();
		equiv = remainders.join("");
		if(newBase <= 10)
			equiv = parseInt(equiv);
	}
	if(negFlag)
		equiv *= -1;
	return equiv;
}

exports.isReal = isReal;
exports.hasValue = hasValue;
exports.arrayDuplicates = arrayDuplicates;
exports.arraysInclude = arraysInclude;
exports.arrayDiagram = arrayDiagram;
exports.arrayMerge = arrayMerge;
exports.removeDuplicates = removeDuplicates;
exports.reassignIndex = reassignIndex;
exports.escapify = escapify;
exports.globalCapture = globalCapture;
exports.cloneObj = cloneObj;
exports.objSort = objSort;
exports.spliceArray = spliceArray;
exports.clearElements = clearElements;
exports.addIfNew = addIfNew;
exports.avgArray = avgArray;
exports.medianArray = medianArray;
exports.modeArray = modeArray;
exports.maxArray = maxArray;
exports.minArray = minArray;
exports.lastIndex = lastIndex;
exports.lastElement = lastElement;
exports.mapToObject = mapToObject;

exports.xor = xor;
exports.findExclusive = findExclusive;
exports.rand = rand;
exports.randString = randString;
exports.shuffle = shuffleArray;
exports.shuffleArray = shuffleArray;
exports.timeSince = timeSince;
exports.timeConversion = timeConversion;
exports.setTimeDistance = setTimeDistance;
exports.setRelativeTime = setRelativeTime;
exports.setTheDate = setTheDate;
exports.nextSquare = nextSquare;
exports.sortIndexes = sortIndexes;
exports.stringIneq = stringIneq;

exports.arrayTheDate = arrayTheDate;
exports.dateToNumber = dateToNumber;
exports.toTitleCase = toTitleCase;
exports.fillLength = fillLength;
exports.stripEmoji = stripEmoji;
exports.windex = windex;
exports.ordinalize = ordinalize;
exports.writeIndexes = writeIndexes;
exports.JSONfriendly = JSONfriendly;

exports.convertNumbers = convertNumbers;
exports.digiDecimal = digiDecimal;
exports.digiAlpha = digiAlpha;
exports.convertDecimal = convertDecimal;
exports.convertBases = convertBases;

function test() {
}
test();