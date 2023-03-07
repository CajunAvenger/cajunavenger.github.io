var timelineObj = {
	start:[],
	start_date: null,
	end: [],
	end_date: null,
	majorAxis: [1, 0],
	plot: {
		left:40, top:25, width:730, height:550, min_width:500,
		"marker_width":20, "marker_height":3,
		"milestone_width":60, "milestone_height":3,
		"label_offset_y": -6, "label_offset_x": 25, "label_width": 150,
		"bar_width": 40, "thread_offset": 10,
		"axis_offset": 70, "axis_label_offset": -6, "bar_offset": 5,
		"border_padding": 25, "font_scale": 100
	},
	calendar: ["year"],
	label_pattern: "{Y}",
	reverse: false,
	threads: []
}
var defaults = {
	"height-definer": 550,
	"bar-width": 40,
	"mile-width": 60,
	"label-width": 150,
	"label-offset": 25,
	"thread-offset": 10,
	"axis-offset": 70,
	"axis-label-offset": -5,
	"bar-offset": 5,
	"font-scaler": 100
}
var editing_backup = {};
var thread_id = 0;
var event_id = 0;
var loaded = false;
var active_tab = "tab1";
var active_font = "";
var default_axis = true;
var cssCache = {};
var element_keeper = {
	"year-marker": [],
	"bar-1": [],
	"milestone": [], 
	"label-1": []
}
var calendar_arrays = [
	[],
	["January", 31],
	["February", 28, true],
	["March", 31],
	["April", 30],
	["May", 31],
	["June", 30],
	["July", 31],
	["August", 31],
	["September", 30],
	["October", 31],
	["November", 30],
	["December", 31]
]
var days_per_year = 365.2425;

//utility scripts
function arraymove(arr, fromIndex, toIndex) {				// move an element in an array to a new index
    var elem = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, elem);
}

// add new timeline objects
function newThread(name, color) {							// add a new thread object
	if(!name)
		name = "Thread " + (timelineObj.threads.length+1);
	if(!color)
		color = "#000000"
	var thread = {
		id: thread_id++,
		name: name,
		index: timelineObj.threads.length,
		color: color,
		offset: 0,
		events: [],
		thread_offset: 0,	// moves bar right (or left w/negative)
		bar_offset: 0,		// makes the bar wider (or thinner w/negative)
		label_offset: 0,	// makes labels further away (or closer w/negative)
		label_width_offset: 0//makes labels wider (or thinner w/negative)
	};
	timelineObj.threads.push(thread);
	if(thread.id != 0) {
		// add the new CSS code for this thread
		var pl = timelineObj.plot;
		var start_left = pl.axis_offset + pl.bar_offset;
		for(var i=0; i<thread.index; i++) {
			var this_thread = timelineObj.threads[i];
			start_left += pl.bar_width + this_thread.bar_offset;
			start_left += pl.label_offset_x + this_thread.label_offset;
			start_left += pl.label_width + this_thread.label_width_offset;
			start_left += pl.thread_offset + this_thread.thread_offset;
		}
		var str = `.timeline .bar-${thread.id} {left: ${start_left}px;}`
		start_left += pl.bar_width + thread.bar_offset;
		start_left += pl.label_offset_x + thread.label_offset;
		str += `.timeline .bar-${thread.id}-label {left: ${start_left}px; display:block;}`
		str += `.timeline .timeline-milestone {width:${pl.milestone_width}px}`;
		addCSSRule(str);
	}
	return thread;
}
function newEvent(start, end, label, thread, color) {		// add a new event object
	if(typeof start == "number")
		start = numsToDate(start);
	if(!end)
		end = start;
	if(typeof end == "number")
		end = numsToDate(end);
	if(!label)
		label = "New Event";
	if(start.getTime() > end.getTime())
		[start, end] = [end, start];
	var new_event = {
		start: start,
		end: end,
		label: label,
		label_offset_x: 0,		// move label to the right (or left w/negative)
		label_offset_y: 0,		// move label up (or down w/negative)
		id: event_id++
	};
	if(typeof thread == "number" || typeof thread == "string")
		thread = getThread(thread);
	if(color != thread.color)
		new_event.color = color;
	thread.events.push(new_event);
	new_event.thread = thread;
	var event_ele = getElement("bar-"+thread.id);
	if(start.getTime() == end.getTime())
		$("#"+event_ele.id).addClass("timeline-milestone");
	new_event.ele_id = event_ele.id;
	event_ele.onclick = function() {
		console.log(new_event.label);
		editEvent(this, new_event.id, thread);
	}
	renderEvent(new_event, event_ele);
	return new_event;
}
function addCSSRule(cssCode, styleid) {						// add a new CSS rule
	$(`<style id="${styleid}">${cssCode}</style>`).appendTo("body");
}

// safely fetch timeline info
function getThread(ident) {									// get a thread from its id or name
	if(typeof ident == "number")
		return timelineObj.threads[ident];
	for(var thread in timelineObj.threads) {
		if(timelineObj.threads[thread].name == ident)
			return timelineObj.threads[thread];
	}
	return timelineObj.threads[0];
}
function getEvent(ident, thread) {							// get an event from its id or label
	if(!thread) {
		// may have moved
		for(let t in timelineObj.threads) {
			for(let e in timelineObj.threads[t].events) {
				if(timelineObj.threads[t].events[e].id == ident)
					return timelineObj.threads[t].events[e];
			}
		}
		return null;
	}
	for(let e in thread.events) {
		if(thread.events[e].id == ident)
			return thread.events[e];
	}
	return null;
}
function getElement(type, number) {							// get element id="type-number", or create it
	if(!element_keeper[type])
		element_keeper[type] = [];
	if(number === undefined)
		number = element_keeper[type].length + 1;
	var ele_name = type + "-" + String(number);
	var ele = document.getElementById(ele_name);
	if(ele == null) {
		//create the element
		ele = document.createElement("div");
		ele.className = "timeline-element " + type;
		if(type.match(/^bar-\d+$/))
			ele.className += " timeline-bar";
		ele.id = type + "-" + number;
		document.getElementById("timeline").appendChild(ele);
		element_keeper[type].push(ele.id);
	}
	return ele;
}
function yr_diff(d1, d2) {									// fractional year difference between two dates
	var ms_diff = Math.abs(d1.getTime() - d2.getTime());
	return ms_diff / (86400000*days_per_year);
}
function yr_height() {										// pixel height of yr_diff
	return timelineObj.plot.height / yr_diff(timelineObj.start_date, timelineObj.end_date);
}
function findNormalOffset(type, thread) {					// find the typical offset value for a type in a thread
	if(typeof thread == "number")
		thread = timelineObj.threads[thread];
	var pl = timelineObj.plot
	var norm = pl.bar_width + pl.label_offset_x + pl.label_width + pl.thread_offset;
	var offs = {left:pl.axis_offset + pl.bar_offset}
	for(let t in timelineObj.threads) {
		if(timelineObj.threads[t] != thread) {
			offs.left += norm;
			offs.left += timelineObj.threads[t].bar_offset;
			offs.left += timelineObj.threads[t].label_offset;
			offs.left += timelineObj.threads[t].label_width_offset;
			offs.left += timelineObj.threads[t].thread_offset;
		}else{
			//offs.left += thread.thread_offset;
			if(type == "bar")
				break;
			offs.left += pl.bar_width + thread.bar_offset;
			offs.left += pl.label_offset_x + thread.label_offset;
			if(type == "label")
				break;
			offs.left += pl.label_width + thread.label_width_offset;
			offs.left += thread.thread_offset;
			break;
		}
	}
	return offs;
}
function findCSSRule(selector, skip_cache) {				// find the most relevant CSSRule for a selector
	if(!skip_cache && cssCache[selector]) {
		var sheet = document.styleSheets[cssCache[selector][0]];
		var rules = sheet.cssRules || sheet.rules;
		var rule = rules[cssCache[selector][1]];
		if(rule && rule.selectorText == selector)
			return rule;
	}
	for(var i=document.styleSheets.length-1; i>=0; i--) {
		var sheet = document.styleSheets[i];
		var rules = sheet.cssRules || sheet.rules;
		for(var j=0; j<rules.length; j++) {
			var rule = rules[j];
			if(rule.selectorText == selector) {
				cssCache[selector] = [i, j];
				return rule;
			}
		}
	}
	return null;
}

// website scripts
function switchTab(ele) {									// switch the tab when the user clicks it
	if(!loaded || ele.id == active_tab)
		return;
	var map = {
		"tab1": "#global-settings",
		"tab2": "#thread-settings",
		"tab3": (editing_backup.event ? "#edit-settings" : "#event-settings"),
		"tab4": "#export-settings"
	}
	var tab = document.getElementById("live-tab");
	switch(ele.id) {
		case "tab1":
			tab.style.left = 8;
			break;
		case "tab2":
			tab.style.left = 84;
			//show thread
			break;
		case "tab3":
			tab.style.left = 160;
			updateThreadNameDisplay();
			//show event
			break;
		case "tab4":
			tab.style.left = 238;
			readyExports();
			break;
	}
	//hide the old tab, show the new one
	$(map[active_tab]).hide();
	$(map[ele.id]).show();
	active_tab = ele.id;
}
function documentLoaded() {									// initialze jQuery and run startup sequence
	// jQuery is safe
	loaded = true;
	// initialize our first thread
	createThread();
	return;
	createThread(newThread("Karina", "#c444e6"));
	updateThread({id:"thread-name", value:"Karina"})

	// testing setup, import Karina, Lettie, and Zero
	var y1 = 65, y2 = 69
	timelineObj.start = [y1, 1, 1];
	timelineObj.end = [y2, 1, 1];
	timelineObj.start_date = numsToDate(y1, 1, 1);
	timelineObj.end_date = numsToDate(y2, 1, 1)
	var st = document.getElementById("startYear");
	st.value = y1;
	updateGlobals(st);
	var et = document.getElementById("endYear");
	et.value = y2;
	updateGlobals(et);
	var maj = document.getElementById("axis-value");
	maj.value = 1;
	updateGlobals(maj);

	//newEvent(57.2, 57.2, "Karina is born", 0);
	//newEvent(57.2, 65.5, "Living with her parents", 0);
	newEvent(65.5, null, "Karina's parents die", 0, "#e26666");
	newEvent(65.5, 67.3, "KXP (Festenya)", 0, "#e26666");
	newEvent(67.3, null, "Okus takes over Karina", 0, "#e26666");
	newEvent(67.4, 68.5, "Battle Boards", 0, "#e26666");
	newEvent(68.2, null, "Karina gets Kirino's spark", 0, "c44444");
	newEvent(68.2, 68.5, " ", 0, "c44444");
	newEvent(69.4, null, "HVU", 0);
	newEvent(69.7, null, "KXP (Tirvana and Flynn)", 0);
	newEvent(71.5, 71.9, "MON", 0);
	newEvent(72.3, 72.5, "CCR", 0);
	newEvent(73.6, null, "The Extraction Project", 0);
	newEvent(73.6, 75.1, "Karina's Explorations", 0);
	newEvent(75.1, null, "Barhopping", 0);
	newEvent(75.5, null, "Pentaga", 0);
	newEvent(75.5, 75.9, " ", 0);
	newEvent(75.8, null, "Tunnel of Love", 0);
	newEvent(76.5, 76.8, "Skalor", 0);
	
	createThread(newThread("Lettie", "#007700"));
	newEvent(67.6, 67.8, "Feanav, early half", 1);
	newEvent(68.3, 69, "Battle Boards", 1);
	newEvent(68.5, null, "Occasion 1", 1);
	//newEvent(68.6, null, "The Tragedy of Kaira Veis", 1);
	newEvent(69, null, "Lettie vs Zero", 1);
	newEvent(69.4, 69.7, "Feanav, latter half", 1);
	newEvent(71.2, 72.9, "The Empty Throne of Feanav", 1);

	createThread(newThread("Zero", "#5e547c"));
	newEvent(68.2, 68.4, "Nulien", 2);
	newEvent(68.6, null, "The Tragedy of Kaira Veis", 2);
	newEvent(68.85, 69.2, "Return to Battle Boards", 2)
	newEvent(69, null, "Lettie vs Zero", 2);
	newEvent(69.2, null, "Elsewhere Invasion", 2);
	newEvent(69.5, 70, "REZA", 2);
	newEvent(70.2, 70.3, "NAMI", 2);
	newEvent(70.4, 70.9, "Magic Champions somewhere", 2);
	newEvent(72.5, 73.3, "LHIN", 2);
	newEvent(73.8, null, "XAN", 2);
	newEvent(74.5, null, "CARA", 2);

	rebuildTimeline();
}
function updateThreadNameDisplay(thread) {					// update the thread name on the evet tab
	if(!thread)
		thread = focusedThread();
	document.getElementById("creating-thread-name").innerHTML = `${thread.index}: ${thread.name}`;
	document.getElementById("editing-thread-name").innerHTML = `${thread.index}: ${thread.name}`;
}
// forms from the editor page
// general
function correctify(year, month, day) {						// validate month and day inputs based on year
	var mn = parseInt(month.value);
	if(mn >= calendar_arrays.length) {
		month.value = calendar_arrays.length-1;
		mn = calendar_arrays.length-1;
	}
	if(!mn)
		mn = 0;
	if(mn < 0)
		mn = 0;
	if(parseInt(day.value) > calendar_arrays[mn][1]) {
		// check leap year
		if(calendar_arrays[mn][2]) {
			var year = Math.trunc(year);
			if(year%4==0 && !(year%100==0 && year%400==0)) {
				day.value = calendar_arrays[mn][1] + 1;
				return;
			}
		}
		day.value = calendar_arrays[mn][1];
	}
}
// main timeline
function resetDefault(id) {									// reset global setting to its default
	var ele = document.getElementById(id)
	ele.value = defaults[id];
	updateGlobals(ele);
}
function updateGlobals(inp, skip_build) {					// process forms for global timeline options
	var pl = timelineObj.plot;
	switch(inp.id) {
		case "btnApplyBoundary":
			var sy = document.getElementById("startYear");
			var sm = document.getElementById("startMonth");
			var sd = document.getElementById("startDay");
			var ey = document.getElementById("endYear");
			var em = document.getElementById("endMonth");
			var ed = document.getElementById("endDay");
			correctify(sy.value, sm, sd);
			correctify(ey.value, em, ed);
			var start_ar = [parseInt(sy.value), parseInt(sm.value), parseInt(sd.value)];
			var end_ar = [parseInt(ey.value), parseInt(em.value), parseInt(ed.value)];
			var start_date = numsToDate(parseInt(sy.value), parseInt(sm.value), parseInt(sd.value));
			var end_date = numsToDate(parseInt(ey.value), parseInt(em.value), parseInt(ed.value));
			if(start_date.getTime() > end_date.getTime()) {
				[start_ar, end_ar] = [end_ar, start_ar];
				[start_date, end_date] = [end_date, start_date];
				[sy.value, ey.value] = [ey.value, sy.value];
				[sm.value, em.value] = [em.value, sm.value];
				[sd.value, ed.value] = [ed.value, sd.value];
			}
			timelineObj.start = start_ar;
			timelineObj.end = end_ar;
			timelineObj.start_date = start_date;
			timelineObj.end_date = end_date;
			if(default_axis)
				initialAxis();
			break;
		case "btnResetBoundary":
			document.getElementById("startYear").value = timelineObj.start[0] || 0;
			document.getElementById("startMonth").value = timelineObj.start[1] || 0;
			document.getElementById("startDay").value = timelineObj.start[2] || 0;
			document.getElementById("endYear").value = timelineObj.end[0] || 1;
			document.getElementById("endMonth").value = timelineObj.end[1] || 0;
			document.getElementById("endDay").value = timelineObj.end[2] || 0;
			break;
		case "axis-button":
			let val = parseInt(document.getElementById("axis-value").value);
			if(val < 1) {
				val = 1;
				inp.value = 1;
			}
			timelineObj.majorAxis = [val, document.getElementById("axis-unit").value]
			break;
		case "label-definer":
			timelineObj.label_pattern = inp.value;
			break;
		case "height-definer":
			var h = parseInt(inp.value);
			if(h < 300) {
				h = 300;
				inp.value = 300;
			}
			timelineObj.plot.height = h;
			document.getElementById("timeline").style.height = h + 2*timelineObj.plot.border_padding;
			document.getElementById("axis").style.height = h;
			break;
		case "axis-style":
			updateYearMarkers(inp.value);
			break;
		case "bar-width":
			var w = parseInt(inp.value);
			if(w < 1) {
				w = 1;
				inp.value = w;
			}
			var bar_rule = findCSSRule(".timeline .timeline-bar");
			if(!bar_rule)
				return;
			bar_rule.style.width = w + "px";
			pl.bar_width = w;
			reformatThreadCSS();
			break;
		case "mile-width":
			var w = parseInt(inp.value);
			if(w < 1) {
				w = 1;
				inp.value = w;
			}
			var bar_rule = findCSSRule(".timeline .timeline-milestone", true);
			if(!bar_rule)
				return;
			bar_rule.style.width = w + "px";
			pl.milestone_width = w;
			break;
		case "label-width":
			var w = parseInt(inp.value);
			if(w < 0) {
				w = 0;
				inp.value = w;
			}
			var bar_rule = findCSSRule(".timeline .timeline-label");
			if(!bar_rule)
				return;
			bar_rule.style.width = w + "px";
			pl.label_width = w;
			reformatThreadCSS();
			break;
		case "label-offset":
			pl.label_offset_x = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "thread-offset":
			pl.thread_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "axis-offset":
			// move the axis over
			pl.axis_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "axis-label-offset":
			// move axis label down
			pl.axis_label_offset = parseInt(inp.value);
			break;
		case "bar-offset":
			pl.bar_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "font-style":
			if(active_font != "")
				$("#"+inp.id).removeClass(active_font);
			$("#"+inp.id).addClass(inp.value);
			active_font = inp.value;
			try{
				findCSSRule(".timeline .timeline-label").style.fontFamily = findCSSRule("."+active_font).style.fontFamily;
			}catch(e){}
			break;
		case "font-scaler":
			var v = parseInt(inp.value)
			if(v < 1) {
				v = 1;
				inp.value = 1;
			}
			findCSSRule(".timeline .timeline-label").style.fontSize = `${v/100}em`;
			findCSSRule(".timeline .year-label").style.fontSize = `${v/100}em`;
			pl.font_scale = v;
			break;
	}
	if(!skip_build)
		rebuildTimeline();
}
function initialAxis() {									// generate a sensible starting major axis
	var ms_diff = timelineObj.end_date.getTime() - timelineObj.start_date.getTime();
	if(ms_diff == 0)
		return; // evil
	default_axis = false;
	let days_diff = ms_diff / 86400000;
	// less than 90 days, by day
	// less than 5 years, by month
	// aim at 10, max at 20
	var divi = [2, days_diff];
	if(days_diff >= 5*days_per_year) {
		divi = [0, Math.floor(days_diff / days_per_year)];
	}else if (days_diff >= 90) {
		divi = [1, days_diff / 30]
	}
	var unit_diff = divi[1];
	var holder = [unit_diff, 10];
	for(var i=2; i<=20; i++) {
		// optimize for least remainder, then closest to 10
		var test = unit_diff % i;
		if(test < holder[0]) {
			holder = [test, i];
		}else if(test == holder[0] && Math.abs(10-i) < Math.abs(10-holder[1])) {
			holder = [test, i];
		}
	}
	var optimal_divs = Math.floor(unit_diff / holder[1])
	document.getElementById("axis-value").value = optimal_divs;
	document.getElementById("axis-unit").value = divi[0];
	timelineObj.majorAxis = [optimal_divs, divi[0]];
}
// threads
function updateThread(inp) {								// process forms for thread options
	var thread = focusedThread();
	if(!thread && inp.id != "thread-index")
		return;
	switch(inp.id) {
		case "thread-name":
			thread.name = inp.value;
			document.getElementById("pick-thread-"+thread.index).innerHTML = inp.value;
			break;
		case "thread-index":
			var current_index = parseInt(document.getElementById("thread-selector").value);
			thread = timelineObj.threads[current_index];
			var new_index = parseInt(inp.value);
			if(new_index < 0)
				new_index = 0;
			if(new_index >= timelineObj.threads.length)
				new_index = timelineObj.threads.length-1;
			if(new_index == current_index)
				return;
			arraymove(timelineObj.threads, current_index, new_index);
			var ist = (new_index > current_index ? current_index : new_index);
			var ien = (new_index < current_index ? current_index : new_index);
			for(var i=ist; i<=ien; i++) {
				var this_thread = timelineObj.threads[i];
				this_thread.index = i;
				var ele = document.getElementById('pick-thread-'+i);
				ele.innerHTML = this_thread.name;
				if(i == new_index)
					ele.selected = true;
			}
			inp.value = new_index;
			reformatThreadCSS();
			rebuildTimeline();
			break;
		case "thread-color":
			thread.color = inp.value;
			renderThread(thread);
			break;
		case "thread-bar-width":
			thread.bar_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "thread-label-width":
			thread.label_width_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "thread-label-offset":
			thread.label_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
		case "thread-thread-offset":
			thread.thread_offset = parseInt(inp.value);
			reformatThreadCSS();
			break;
	}
}
function focusedThreadIndex() {								// index of the currently viewed thread
	return parseInt(document.getElementById("thread-index").value);
}
function focusedThread() {									// object of the currently viewed thread
	return getThread(focusedThreadIndex())
}
function createThread(thread) {								// create new thread from button						
	if(!thread)
		thread = newThread();
	var sels = document.getElementsByClassName("thread-selector");
	for(var e=0; e<sels.length; e++) {
		var opt = document.createElement("option");
		opt.value = thread.index;
		opt.innerHTML = thread.name;
		opt.id = "pick-thread-" + thread.index;
		opt.selected = true;
		sels.item(e).appendChild(opt);
	}
	openThreadOptions(thread);
	return thread;
}
function focusThread(inp) {									// display thread options from dropdown choice
	if(typeof inp == "number") {
		openThreadOptions(timelineObj.threads[inp], true);
	}else{
		openThreadOptions(timelineObj.threads[inp.value])
	}
}
function openThreadOptions(thread, selec) {					// update thread display to a particular thread
	// change a thread's color, offset, index
	// or add an event
	document.getElementById("thread-name").value = thread.name;
	document.getElementById("thread-color").value = thread.color;
	document.getElementById("thread-index").value = thread.index;
	document.getElementById("event-color").value = thread.color;
	document.getElementById("thread-bar-width").value = thread.bar_offset;
	document.getElementById("thread-label-width").value = thread.label_width_offset;
	document.getElementById("thread-label-offset").value = thread.label_offset;
	document.getElementById("thread-thread-offset").value = thread.thread_offset;
	if(selec) {
		document.getElementById("pick-thread-"+thread.id).selected = true;
	}
}
function deleteThread(thread, force) {						// delete the current thread
	if(!thread)
		thread = focusedThread();
	if(force || confirm(`Are you sure you want to delete thread ${thread.index}: ${thread.name} and all of its events? This can't be undone.`)) {
		// iterate delete event
		// null out thread
		// fix indexes
		// rebuildTimeline
		for(let even in thread.events) {
			document.getElementById(thread.events[even].label_id).remove();
			document.getElementById(thread.events[even].ele_id).remove();
			delete thread.events[even].thread
		}
		timelineObj.threads.splice(timelineObj.threads.indexOf(thread), 1);
		for(let t=0; t<timelineObj.threads-1; t++) {
			timelineObj[threads][t].index = t;
		}
		delete thread.events;
		reformatThreadCSS();
		rebuildTimeline();
	}
	focusThread(0)
}
function mergeForm() {										// merge from thread option form
	var new_thread = timelineObj.threads[document.getElementById("merge-selector").value];
	if(new_thread == focusedThread()) {
		document.getElementById("merge-error").style.visibility = "";
		return;
	}
	mergeThread(new_thread,  document.getElementById("merge-color").value == "inherit");
	focusThread(new_thread.index);
}
function mergeThread(host_thread, inherit_color) {			// merge all the events from one thread into another
	var thread = focusedThread();
	for(var even in thread.events) {
		migrateEvent(thread.events[even], host_thread, inherit_color);
	}
	deleteThread(thread, true);
}
// events
function createTimelineEvent() {							// process submitted new event
	var startY = parseFloat(document.getElementById("eventStartYear").value);
	var endY = parseFloat(document.getElementById("eventEndYear").value);
	
	var startM = document.getElementById("eventStartMonth");
	var startD = document.getElementById("eventStartDay");
	var endM = document.getElementById("eventEndMonth");
	var endD = document.getElementById("eventEndDay");
	
	var color = document.getElementById("event-color");
	var label = document.getElementById("event-name");
	correctify(startY, startM, startD);
	correctify(endY, endM, endD);
	var startDate = numsToDate(startY, parseInt(startM.value), parseInt(startD.value));
	var endDate = numsToDate(endY, parseInt(endM.value), parseInt(endD.value));
	var thread = focusedThread();
	newEvent(startDate, endDate, label.value, thread, color.value);
	// clear the info
	document.getElementById("eventStartYear").value = "";
	document.getElementById("eventEndYear").value = "";
	startM.value = "";
	startD.value = "";
	endM.value = "";
	endD.value = "";
	color.value = thread.color || "#000000";
	label.value = "";
}
function editEvent(event_ele, event_id, thread) {			// begin event editing
	var event_obj = getEvent(event_id, thread);
	if(!event_obj)
		return;
	// if we're editing, clear unsaved changes
	// preload the edit info and save a backup
	// if we're not on this event's thread, switch to it
	// if we're not on the event page, switch to it
	// hide the create menu
	// show the edit menu
	// show Cancel button to return to create
	resetEventEdit();
	editing_backup = {};
	editing_backup.start = new Date(event_obj.start.getTime());
	editing_backup.end = new Date(event_obj.end.getTime());
	editing_backup.color = "" + (event_obj.color || event_obj.thread.color);
	editing_backup.label = "" + event_obj.label;
	editing_backup.label_offset_x = 0 + event_obj.label_offset_x;
	editing_backup.label_offset_y = 0 + event_obj.label_offset_y;
	editing_backup.event = event_obj;
	document.getElementById("edit-label").value = event_obj.label;
	document.getElementById("edit-color").value = event_obj.color || event_obj.thread.color;
	document.getElementById("edit-y").value = event_obj.label_offset_y;
	document.getElementById("edit-x").value = event_obj.label_offset_x;
	document.getElementById("edit-start-year").value = event_obj.start.getFullYear();
	document.getElementById("edit-start-month").value = event_obj.start.getMonth()+1;
	document.getElementById("edit-start-day").value = event_obj.start.getDate();
	document.getElementById("edit-end-year").value = event_obj.end.getFullYear();
	document.getElementById("edit-end-month").value = event_obj.end.getMonth()+1;
	document.getElementById("edit-end-day").value = event_obj.end.getDate();
	focusThread(thread.index);
	updateThreadNameDisplay(thread);
	switchTab({id:"tab3"})
	$("#event-settings").hide();
	$("#edit-settings").show();
}
function resetEventEdit(write) {							// clear unsaved changes in an edit
	var event_obj = editing_backup.event;
	if(!event_obj)
		return;
	if(editing_backup.saved)
		return;
	event_obj.start = new Date(editing_backup.start.getTime());
	event_obj.end = new Date(editing_backup.end.getTime());
	event_obj.color = "" + editing_backup.color;
	event_obj.label = "" + editing_backup.label;
	event_obj.label_offset_x = 0 + editing_backup.label_offset_x;
	event_obj.label_offset_y = 0 + editing_backup.label_offset_y;
	if(write) {
		document.getElementById("edit-label").value = event_obj.label;
		document.getElementById("edit-color").value = event_obj.color || event_obj.thread.color;
		document.getElementById("edit-y").value = event_obj.label_offset_y;
		document.getElementById("edit-x").value = event_obj.label_offset_x;
		document.getElementById("edit-start-year").value = event_obj.start.getFullYear();
		document.getElementById("edit-start-month").value = event_obj.start.getMonth()+1;
		document.getElementById("edit-start-day").value = event_obj.start.getDate();
		document.getElementById("edit-end-year").value = event_obj.end.getFullYear();
		document.getElementById("edit-end-month").value = event_obj.end.getMonth()+1;
		document.getElementById("edit-end-day").value = event_obj.end.getDate();
	}
	renderEvent(event_obj);
}
function saveEventEdit() {									// save changes in an edit
	var event_obj = editing_backup.event;
	if(!event_obj)
		return;
	editing_backup.start = new Date(event_obj.start.getTime());
	editing_backup.end = new Date(event_obj.end.getTime());
	editing_backup.color = "" + (event_obj.color || event_obj.thread.color);
	editing_backup.label = "" + event_obj.label;
	editing_backup.label_offset_x = 0 + event_obj.label_offset_x;
	editing_backup.label_offset_y = 0 + event_obj.label_offset_y;
	editing_backup.saved = true;
}
function deleteEventEdit() {								// delete the event being edited
	var event_obj = editing_backup.event;
	if(!event_obj)
		return;
	if(confirm(`Delete event "${event_obj.label}"?`)) {
		event_obj.thread.events.splice(event_obj.thread.events.indexOf(event_obj), 1);
		document.getElementById(event_obj.label_id).remove();
		document.getElementById(event_obj.ele_id).remove();
		//todo return to main screen
	}
}
function displayEdit(ele) {									// process an edit preview
	editing_backup.save = false;
	switch(ele.id) {
		case "btnPreview":
			// change dates
			var timey = document.getElementById("edit-start-year").value;
			var timem = document.getElementById("edit-start-month");
			var timed = document.getElementById("edit-start-day");
			correctify(timey, timem, timed);
			editing_backup.event.start = numsToDate(timey, timem.value, timed.value);
			// change dates
			timey = document.getElementById("edit-end-year").value;
			timem = document.getElementById("edit-end-month");
			timed = document.getElementById("edit-end-day");
			correctify(timey, timem, timed);
			editing_backup.event.end = numsToDate(timey, timem.value, timed.value);
			var ele_id = editing_backup.event.ele_id;
			if(editing_backup.event.start.getTime() == editing_backup.event.end.getTime()) {
				$("#"+ele_id).addClass("timeline-milestone");
			}else{
				$("#"+ele_id).removeClass("timeline-milestone");
			}
			break;
		case "edit-label":
			// change label name
			editing_backup.event.label = ele.value;
			break;
		case "edit-color":
			// change color
			if(ele.value == editing_backup.event.thread.color) {
				delete editing_backup.event.color;
			}else{
				editing_backup.event.color = ele.value;
			}
			break;
		case "edit-y":
			// move label up/down
			editing_backup.event.label_offset_y = parseInt(ele.value);
			break;
		case "edit-x":
			// move label left/right
			editing_backup.event.label_offset_x = parseInt(ele.value);
			break;
	}
	renderEvent(editing_backup.event);
}
function cancelEditing() {									// end event editing and return to the create menu
	resetEventEdit();
	editing_backup = {};
	$("#edit-settings").hide();
	$("#event-settings").show();
}
function migrateMetas(inp) {								// update menus based on migrate options
	switch(inp.id) {
		case "migrate-selector":
			var thread = timelineObj.threads[inp.value];
			if(thread == focusedThread()) {
				document.getElementById("migrate-error").style.visibility = "";
				document.getElementById("btnMigrate").value = `Migrate Event`;
			}else{
				document.getElementById("btnMigrate").value = `Migrate Event to Thread ${thread.index}: ${thread.name}`;
				document.getElementById("migrate-error").style.visibility = "hidden";
			}
			break;
		case "merge-selector":
			var thread = timelineObj.threads[inp.value];
			if(thread == focusedThread()) {
				document.getElementById("merge-error").style.visibility = "";
				document.getElementById("btnMerge").value = `Merge Thread`;
			}else{
				document.getElementById("btnMerge").value = `Merge Thread into Thread ${thread.index}: ${thread.name}`;
				document.getElementById("merge-error").style.visibility = "hidden";
			}
			break;
	}
}
function migrateEvent(event_obj, new_thread, inherit_color){// migrate event to another thread
	var from_form = false;
	if(!event_obj) {
		// migrating from form
		event_obj = editing_backup.event;
		new_thread = timelineObj.threads[document.getElementById("migrate-selector").value];
		inherit_color = document.getElementById("migrate-color").value == "inherit";
		from_form = true;
	}
	var old_thread = event_obj.thread;
	if(old_thread == new_thread) {
		document.getElementById("migrate-error").style.visibility = "";
		return;
	}
	var color;
	if(inherit_color && event_obj.color) {
		color = new_thread.color || "";
	}else if(!inherit_color && !event_obj.color) {
		color = old_thread.color || "";
	}
	
	var migrated = newEvent(event_obj.start, event_obj.end, event_obj.label, new_thread, color);
	old_thread.events.splice(old_thread.events.indexOf(event_obj), 1);
	document.getElementById(event_obj.label_id).remove();
	document.getElementById(event_obj.ele_id).remove();
	if(from_form) {
		editing_backup = {}
		editEvent(migrated.ele_id, migrated.id, new_thread);
	}
}
// date handling
function numsToDate(trialY, trialM, trialD) {				// convert three test numbers to a Date
	var dy = deciYearToDates(trialY);
	if(dy[0] > 0)
		dy[0]--; // zero index the month
	if(trialM) {
		dy[0] = parseInt(trialM);
		if(dy[0] != 0)
			dy[0]--; // treat 0 as January in this case
	}
	if(trialD)
		dy[1] = trialD;
	if(!dy[0] || isNaN(dy[0]))
		dy[0] = 0;
	if(!dy[1] || isNaN(dy[1]))
		dy[1] = 1;
	var date = new Date(Math.trunc(trialY), dy[0], dy[1]);
	date.setFullYear(Math.trunc(trialY));
	return date;
}
function deciYearToDates(deciYear) {						// convert deciyear (ie 1990.3) to [month, date] numbers
	var deci = deciYear - Math.trunc(deciYear);
	if(deci == 0)
		return [0, 1];
	var days = Math.floor(deci * days_per_year);
	for(var m=1; m<calendar_arrays.length; m++) {
		var c_a = calendar_arrays[m];
		if(c_a[1] > days)
			return [m, days];
		days -= c_a[1];
	}
	return [m, days];
}
function arrayToDateString(source) {						// convert array of [YYYY, M, D] to YYYY-MM-DD string if possible
	var year = String(Math.trunc(source[0])).padStart(4, '0');
	if(year.length > 4)
		return "";
	var month = source[1]
	var day = source[2]
	if(month == undefined || day == undefined || (month == 0 && day == 0)) {
		var dy = deciYearToDates(source[0]);
		month = dy[0];
		day = dy[1];
	}
	month = String(month).padStart(2, '0');
	day = String(day).padStart(2, '0');
	if(month == "00") {
		month = "01";
	}
	if(day == "00") {
		day = "02";
	}
	return `${year}-${month}-${day}`;
}
function nextMajorTime(date) {								// returns the Date of the next majorAxis time after this one
	var dy = date.getFullYear();
	var dm = date.getMonth();
	var dd = date.getDate();
	var ar = [dy, dm, dd];
	if(timelineObj.reverse) {
		ar[timelineObj.majorAxis[1]] -= timelineObj.majorAxis[0];
	}else{
		ar[timelineObj.majorAxis[1]] += timelineObj.majorAxis[0];
	}
	while(ar[1] >= calendar_arrays.length-1) {
		ar[1] -= calendar_arrays.length-1;
		ar[0] += 1;
	}
	d = new Date(ar[0], ar[1], ar[2]);
	if(dy < 100)
		d.setFullYear(ar[0]);
	return d;
}
// rendering engine
function rebuildTimeline(flags) {							// build the entire timeline
	if(timelineObj.start.length == 0 || timelineObj.end.length == 0)
		return;
	//check minimum axis height
	var min_height = timelineObj.plot.height;
	var min_tick_size = 20;
	var div = 0
	if(timelineObj.majorAxis[1] == 0) {
		// years are easy
		var year_diff = Math.abs(timelineObj.start_date.getFullYear() - timelineObj.end_date.getFullYear());
		div = parseFloat(year_diff / timelineObj.majorAxis[0]);
		min_height = div * min_tick_size;
	}else if(timelineObj.majorAxis[1] == 2) {
		// days are a little trickier
		var ms_diff = Math.abs(timelineObj.start_date.getTime() - timelineObj.end_date.getTime());
		var days_diff = ms_diff / (86400*1000);
		div = parseFloat(days_diff / timelineObj.majorAxis[0]);
		min_height = div * min_tick_size;
	}else{
		// months are tricker still
		let year_diff = Math.abs(timelineObj.start_date.getFullYear() - timelineObj.end_date.getFullYear());
		var month_diff = year_diff * (calendar_arrays.length-1) + Math.abs(timelineObj.start_date.getMonth() - timelineObj.end_date.getMonth());
		div = parseFloat(month_diff / timelineObj.majorAxis[0]);
		min_height = div * min_tick_size;
	}
	if(min_height > timelineObj.plot.height) {
		timelineObj.plot.height = min_height;
		document.getElementById("height-definer").value = min_height;
		document.getElementById("axis").style.height = min_height;
		document.getElementById("timeline").style.height = min_height + 2*(timelineObj.plot.border_padding)
	}
	// set the start and end marks in the right place
	var year_start = document.getElementById("year-start");
	var year_end = document.getElementById("year-end");
		
	year_start.style.top = timelineObj.plot.top;
	var end_px = timelineObj.plot.top + parseInt(timelineObj.plot.height) - timelineObj.plot.marker_height;
	year_end.style.top = end_px;
	// calculate the year-marks
	// pixel height of one year
	var year_height = yr_height();
	// add the starting year label
	var start_label = getElement("year-label", 1);
	start_label.innerHTML = timelineObj.label_pattern.replace(/{Y}/g, timelineObj.start_date.getFullYear()).replace(/{M}/g, calendar_arrays[timelineObj.start_date.getMonth()+1][0]).replace(/{D}/g, timelineObj.start_date.getDate());
	start_label.style = `top:${timelineObj.plot.top+timelineObj.plot.axis_label_offset}px;`
	// add up jumps to determine number of marks
	var end_ms = timelineObj.end_date.getTime();
	var dates = [new Date(timelineObj.start_date.getTime())];
	dates.push(nextMajorTime(dates[0]));
	var lbcount = 1;
	while(true) {
		lbcount++;
		if(dates[0].getTime() == dates[1].getTime() || isNaN(dates[1].getTime()))
			break;
		if((dates[0].getTime() > end_ms && end_ms > dates[1].getTime()) || (dates[0].getTime() < end_ms && end_ms < dates[1].getTime()))
			dates[1] = timelineObj.end_date;
		dates.push(nextMajorTime(dates[1]));
		if((dates[1].getTime() > end_ms && end_ms > dates[2].getTime()) || (dates[1].getTime() < end_ms && end_ms < dates[2].getTime()))
			dates[1] = timelineObj.end_date;
		var yr_px = timelineObj.plot.top+Math.round(year_height*(yr_diff(timelineObj.start_date, dates[1])))
		if(dates[1] == timelineObj.end_date)
			yr_px -= timelineObj.plot.marker_height;
		if(lbcount > div)
			yr_px = end_px;
		var year_label = getElement("year-label", lbcount);
		year_label.innerHTML = timelineObj.label_pattern.replace(/{Y}/g, dates[1].getFullYear()).replace(/{M}/g, calendar_arrays[dates[1].getMonth()+1][0]).replace(/{D}/g, dates[1].getDate());
		year_label.style = `top:${yr_px+timelineObj.plot.axis_label_offset}px;`
		if(dates[1].getTime() == end_ms)
			break;
		getElement("year-marker", lbcount).style.top = yr_px;
		dates.splice(0, 1)
		if(lbcount > div)
			break;
	}
	for(var i=element_keeper["year-marker"].length-1; i>=lbcount-2; i--) {
		document.getElementById(element_keeper["year-marker"][i]).remove();
		element_keeper["year-marker"].splice(i, 1);
	}
	for(var i=element_keeper["year-label"].length-1; i>=lbcount; i--) {
		document.getElementById(element_keeper["year-label"][i]).remove();
		element_keeper["year-label"].splice(i, 1);
	}
	for(var t in timelineObj.threads)
		renderThread(timelineObj.threads[t]);
}
function renderThread(thread) {								// render all the events in a thread
	for(let e in thread.events)
		renderEvent(thread.events[e]);
}
function renderEvent(event_obj, event_ele) {				// render an event
	if(!event_ele)
		event_ele = document.getElementById(event_obj.ele_id);
	if(!event_ele)
		return;
	var year_height = yr_height();
	var top_date = event_obj.start;
	if(timelineObj.reverse)
		top_date = event_obj.end;
	var start_point = event_obj.start;
	if(timelineObj.start_date.getTime() > start_point.getTime())
		start_point = timelineObj.start_date
	var end_point = event_obj.end;
	if(timelineObj.end_date.getTime() < end_point.getTime())
		end_point = timelineObj.end_date
	var y_d = yr_diff(start_point, timelineObj.start_date);
	var y_d2 = yr_diff(start_point, end_point);
	var top_px = timelineObj.plot.top+Math.round(year_height*y_d);
	var hgt_px;
	var style = `top:${top_px}px;`
	var oor = false;
	if(timelineObj.start_date.getTime() > event_obj.end.getTime() || timelineObj.end_date.getTime() < event_obj.start.getTime()) {
		// out of range
		style += `visibility: hidden;`
		oor = true;
	}else if(event_obj.start.getTime() != event_obj.end.getTime()) {
		hgt_px = Math.max(1,Math.round(year_height*y_d2))
		event_ele.style.visibility = "";
	}else{
		hgt_px = timelineObj.plot.marker_height
		event_ele.style.visibility = "";
	}
	if(hgt_px)
		style += `height:${hgt_px};`
	if(event_obj.color) {
		style += `background-color:${event_obj.color};`
	}else if(event_obj.thread.color) {
		style += `background-color:${event_obj.thread.color};`
	}
	event_ele.style = style;
	// make the label
	var label_ele;
	if(!event_obj.label_id) {
		label_ele = createNewLabel(event_obj, event_ele)
	}else{
		label_ele = document.getElementById(event_obj.label_id);
		if(!label_ele)
			label_ele = createNewLabel(event_obj, event_ele)
	}
	label_ele.innerHTML = event_obj.label;
	/*
	var label_h = label_ele.offsetHeight;
	// calculate bar_mid, bar_height halved + bar_top
	var bar_mid = Math.max(timelineObj.plot.marker_height, year_height*y_d2)/2
	bar_mid += year_height*(y_d)+timelineObj.plot.top;
	label_ele.style = `top:${Math.round(bar_mid-(label_h/2)-event_obj.label_offset_y)}px;`;
	*/
	label_ele.style.top = top_px - Math.round(timelineObj.plot.font_scale/10) - event_obj.label_offset_y;
	if(hgt_px)
		label_ele.style.height = hgt_px;
	var label_width = timelineObj.plot.label_width + event_obj.thread.label_width_offset
	if(label_width < 1 || oor) {
		label_ele.style.visibility = "hidden";
	}else{
		label_ele.style.visibility = "";
	}
	if(event_obj.label_offset_x)
		label_ele.style.left = findNormalOffset("label", event_obj.thread).left + event_obj.label_offset_x;
	return event_ele;
}
function createNewLabel(event_obj, event_ele) {				// create a label for an event
	var label_ele = document.createElement("div");
	label_ele.id = event_ele.id + "-label";
	label_ele.className = "timeline-label bar-" + event_obj.thread.id + "-label";
	document.getElementById("timeline").appendChild(label_ele);
	event_obj.label_id = event_ele.id + "-label";
	return label_ele;
}
function reformatThreadCSS() {								// rewrite CSS for offset changes
	var pl = timelineObj.plot;
	// update axis
	var axis_rule = findCSSRule(".timeline .axis");
	if(axis_rule)
		axis_rule.style.left = pl.axis_offset;
	var start_left = pl.axis_offset + pl.bar_offset;
	for(var i=0; i<timelineObj.threads.length; i++) {
		var thread = timelineObj.threads[i];
		var bar_rule = findCSSRule(`.timeline .bar-${thread.id}`);
		var label_rule = findCSSRule(`.timeline .bar-${thread.id}-label`);
		// set bar left
		if(bar_rule) {
			bar_rule.style.left = start_left;
			bar_rule.style.width = pl.bar_width + thread.bar_offset;
		}
		// apply bar width and label offset
		start_left += pl.bar_width + thread.bar_offset;
		start_left += pl.label_offset_x + thread.label_offset;
		// set label left
		if(label_rule) {
			label_rule.style.left = start_left;
			label_rule.style.width = pl.label_width + thread.label_width_offset;
		}
		// apply label width and thread offset
		start_left += pl.label_width + thread.label_width_offset;
		start_left += pl.thread_offset + thread.thread_offset;
	}
	// update bounding border
	var border_rule = findCSSRule(".timeline");
	if(border_rule) {
		pl.width = Math.max(pl.min_width, start_left);
		border_rule.style.width = pl.width;
	}
	// then the year markers now that width is known
	updateYearMarkers(document.getElementById("axis-style").value);
}
function updateYearMarkers(val) {
	var year_rule = findCSSRule(".timeline .year-marker");
	if(!year_rule)
		return;
	var pl = timelineObj.plot;
	switch(val) {
		case "outer":
			// small outer marks
			year_rule.style.left = (pl.axis_offset-20)+"px";
			year_rule.style.zIndex = "3";
			break;
			year_rule.style.height = "3px";
			year_rule.style.width = "20px";
			year_rule.style.backgroundColor = "#000";
		case "inner":
			// small inner marks
			year_rule.style.left = pl.axis_offset+"px";
			year_rule.style.zIndex = "3";
			year_rule.style.height = "3px";
			year_rule.style.width = "20px";
			year_rule.style.backgroundColor = "#000";
			break;
		case "grid1":
			// grid z-index: 0
			year_rule.style.left = (pl.axis_offset-20)+"px";
			year_rule.style.zIndex = "0";
			year_rule.style.width = (pl.width-50)+"px";
			year_rule.style.height = "1px";
			year_rule.style.backgroundColor = "#000";
			break;
		case "grid2":
			// grid z-index: 3
			year_rule.style.left = (pl.axis_offset-20)+"px";
			year_rule.style.zIndex = "3";
			year_rule.style.width = (pl.width-50)+"px";
			year_rule.style.height = "1px";
			year_rule.style.backgroundColor = "#000";
			break;
		case "grid3":
			// grid z-index: 3 & white
			year_rule.style.left = (pl.axis_offset+1)+"px";
			year_rule.style.zIndex = "3";
			year_rule.style.backgroundColor = "#fff";
			year_rule.style.width = (pl.width-50)+"px";
			year_rule.style.height = "2px";
			break;
	}
}
// HTML/CSS output engine
var plorder = [
	"height", "bar_width", "milestone_width", "label_width", "label_offset_x", "thread_offset",
	"axis_offset", "axis_label_offset", "bar_offset", "font_scale"
]
function writeTMLFile() {
	var to = timelineObj;
	var pl = to.plot;
	
	// Timeline data
	let output = "\n===\n";
	output += `${to.start.join("-")};${to.end.join("-")};${to.majorAxis.join("-")};`;
	output += `${document.getElementById("axis-style").value};${to.label_pattern};${active_font}\n`;
	for(let p in plorder) {
		output += `${pl[plorder[p]]};`;
	}
	output += `\n`;
	// Thread data
	output += "===\n";
	var events = "";
	for(var t in to.threads) {
		var thread = to.threads[t];
		output += `${thread.name}\n`;
		output += `${thread.color || "#000000"};`
		output += `${thread.bar_offset};${thread.label_offset};`;
		output += `${thread.label_width_offset};${thread.thread_offset}\n`;
		
		for(var e in thread.events) {
			var ev = thread.events[e];
			events += `${ev.label}\n`
			events += `${ev.thread.index};${ev.color || 0};${ev.start.getTime()};${ev.end.getTime()};`
			events += `${ev.label_offset_x};${ev.label_offset_y}\n`
		}
	}
	// Event data
	output += `===\n${events}`;
	return output;
}
function readTMLFile(input, err) {
	try{
		var currentThreads = timelineObj.threads.length;
		// if we have one thread with no events, just overwrite
		if(timelineObj.threads.length == 1 && timelineObj.threads[0].events.length == 0) {
			currentThreads = 0;
			thread_id = 0;
			timelineObj.threads = [];
		}
		var pieces = input.split("\n===\n");
		if(pieces.length == 0) {
			err.innerHTML = "File has no timeline data."
			return;
		}
		var global_data = pieces[1];
		var thread_data = pieces[2];
		var event_data = pieces[3];
		if(global_data) {
			var gdata = global_data.split("\n");
			if(gdata[0]) {
				// time and axis data
				var ginfo = gdata[0].split(";");
				var start_date = ginfo[0].split("-");
				document.getElementById("startYear").value = (start_date[0] || 0)
				document.getElementById("startMonth").value = (start_date[1] || 0)
				document.getElementById("startDay").value = (start_date[2] || 0)
				var end_date = ginfo[1].split("-");
				document.getElementById("endYear").value = (end_date[0] || 0)
				document.getElementById("endMonth").value = (end_date[1] || 0)
				document.getElementById("endDay").value = (end_date[2] || 0)
				var major_axis = ginfo[2].split("-");
				document.getElementById("axis-style").value = (ginfo[3] || 0);
				document.getElementById("label-definer").value = (ginfo[4] || "{Y}");
				updateGlobals({id:"btnApplyBoundary"})
				updateGlobals(document.getElementById("axis-style"))
				updateGlobals(document.getElementById("label-definer"))
				if(major_axis) {
					document.getElementById("axis-value").value = (major_axis[0] || 1)
					document.getElementById("axis-unit").value = (major_axis[1] || 0)
					updateGlobals({id:"axis-button"})
				}
			}
			if(gdata[1]) {
				// plot data
				var pinfo = gdata[1].split(";");
				if(pinfo[10])
					document.getElementById("font-style") = pinfo[10];
				var eles = [
					document.getElementById("height-definer"),
					document.getElementById("bar-width"),
					document.getElementById("mile-width"),
					document.getElementById("label-width"),
					document.getElementById("label-offset"),
					document.getElementById("thread-offset"),
					document.getElementById("axis-offset"),
					document.getElementById("axis-label-offset"),
					document.getElementById("bar-offset"),
					document.getElementById("font-scaler"),
					document.getElementById("font-style")
				];
				for(let e in eles) {
					eles[e].value = (pinfo[e] || 0);
					updateGlobals(eles[e]);
				}
				
			}
		}
		if(thread_data) {
			var tdata = thread_data.split("\n");
			for(var i=0; i<tdata.length; i+=2) {
				var tinfo = tdata[i+1];
				if(!tinfo)
					continue;
				tinfo = tinfo.split(";");
				var tname = tdata[i];
				var thread = createThread(newThread(tname, tinfo[0]));
				thread.bar_offset = parseInt(tinfo[1] || 0);
				thread.label_offset = parseInt(tinfo[2] || 0);
				thread.label_width_offset = parseInt(tinfo[3] || 0);
				thread.thread_offset = parseInt(tinfo[4] || 0);
			}
		}
		if(event_data) {
			var edata = event_data.split("\n");
			for(var i=0; i<edata.length; i+=2) {
				var einfo = edata[i+1]
				if(!einfo)
					continue;
				einfo = einfo.split(";");
				var ename = edata[i];
				var tindex = parseInt(einfo[0])+currentThreads;
				var es = new Date(parseInt(einfo[2]))
				var ee = new Date(parseInt(einfo[3]))
				var color = einfo[1];
				if(!color || color === "0")
					color = timelineObj.threads[tindex].color;
				var even = newEvent(es, ee, ename, timelineObj.threads[tindex], color);
				even.label_offset_x = parseInt(einfo[4] || 0);
				even.label_offset_y = parseInt(einfo[5] || 0);
			}
		}
		reformatThreadCSS();
		rebuildTimeline();
	}catch(e) {
		err.innerHTML = "There was a problem downloading the file: \n" + e;
		console.log(e)
	}
}
function readyExports() {
	var output = "data:text/plain;charset=utf-8," + encodeURIComponent(writeTMLFile());
	document.getElementById("download-link").setAttribute("href", output);
}
function submitImport() {
	var importer = document.getElementById("importer");
	var err = document.getElementById("import-error");
	if(!importer.value) {
		err.innerHTML = "No file given."
		return;
	}else{
		err.innerHTML = "";
	}
	importer.files[0].text()
		.then(t => readTMLFile(t, err))
		.catch(console.error)
}






















//comment