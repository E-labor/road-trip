// 1400 0 600 500
// 1300 50 600 600
// 1100 150 400 500
// 1000 200 400 900
// 900 200 300 900
// 900 250 400 400
// 700 150 400 500
// 550 200 400 700

// function loadSvg(selector, url) {
//   	var target = document.querySelector(selector);
// 	// Request the SVG file
//     var ajax = new XMLHttpRequest();
//     ajax.open("GET", url + ".svg", true);
//     ajax.send();

//     // Append the SVG to the target
//     ajax.onload = function(e) {
//       target.innerHTML = ajax.responseText;
//     }
// }

// function to simulate svg path hidden
function pathPrepare(el) {
	let lineLength = el.getTotalLength();
	el.style.strokeDasharray = lineLength;
	el.style.strokeDashoffset = lineLength;
}

// hide plain roads
var roads = document.querySelectorAll('#roads path');
roads.forEach((road) => {
  pathPrepare(road);
});

// hide cities name except first
var cities = document.querySelectorAll('#cities-name text');
cities.forEach((city, index) => {
	if (index > 0) { 
		// city.style.fillOpacity = 0; 
		TweenMax.to(city, .3, {autoAlpha: 0, display: 'none'});
	}
});

// function to draw roads path
function drawPath(step, duration) {
	return TweenMax.to('#roads #'+ step, duration, {strokeDashoffset: 0, ease:Linear.easeNone});
}

// function to animate path & the map viewbox(pan & zoom) 
function mapAnimate() {
	this.controller = new ScrollMagic.Controller();
	this.scenes = [];
	this.setAnimation = function(element, duration, timelines) {
        let el = document.querySelector('.'+ element),
        	map = document.getElementById("map-svg"),
        	city = cities[Number(element.slice(4))-1],
        	tweenPath = drawPath(element, duration),
        	showCity = (city) => { TweenMax.to(city, .3, {autoAlpha: 1, display: 'block', ease:Power4.easeInOut}); };

        // set animation timeline 
        let tl = new TimelineMax({onUpadte:tweenPath});
		timelines.forEach((item, i) => {
		    tl.to(map, parseFloat(item.duration), {attr:{ viewBox:item.viewBox}, ease:Power2.easeInOut}, item.position);
		});
		tl.add(tweenPath,.3)
		tl.add(TweenMax.to(city, .3, {autoAlpha: 1, display: 'block', ease:Power4.easeInOut}));

		// set animation scene
        let scene = new ScrollMagic.Scene({
        	duration: el.offsetHeight,
	        triggerElement: '.'+ element,
	        triggerHook: "onLeave"
        });
        scene.setTween(tl)
        scene.addTo(this.controller)
        scene.addIndicators();

        this.scenes.push(scene);

        return this;
    };
}



// init map animations
var mapAnimate = new mapAnimate();
var initMap = function() {
	// loadSvg('.map-container', 'img/map.svg');
	// loop over all steps sections
	var steps = document.querySelectorAll('.step-section');
	steps.forEach((step) => {
		let stepsData = step.dataset, timelines = [], duration;
	  	Object.keys(stepsData).map(function(key, index) {
	  		if (key.search('timeline') > -1) {
	  			timelines.push(JSON.parse(stepsData[key]));
	  		} else {
	  			duration = parseFloat(stepsData[key]);
	  		}
		});
		mapAnimate.setAnimation(step.classList[1], duration, timelines);
	});
};
//launch map animations
initMap();
