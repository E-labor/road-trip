(function($) {
	$(document).ready(function() {
		var panOpts = {
		    events: {
		        mouseWheel: false,
		        doubleClick: false,
		        drag: false
		    },
		    animationTime: 300,
		    zoomFactor: 0.25,
		    maxZoom: 10,
		    panFactor: 100
		};

		var svgPanZoom= $('#map-svg').svgPanZoom(panOpts);
		console.log(svgPanZoom);
		// init svgPanZoom viewBox
		svgPanZoom.setViewBox(350, 0, 1500, 800, 500);

		const PanZoomSteps = [
			[350, 0, 1500, 800, 500],
			[650, 0, 1000, 600, 500],
			[1000, 0, 1450, 600, 500],
			[1050, 0, 900, 400, 500],
			[650, 0, 1300, 400, 500],
			[500, 0, 1200, 1000, 500],
			[600, 200, 900, 750, 500],
			[600, 200, 900, 350, 500]
		];
	});
})(jQuery);