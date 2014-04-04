'use strict'; 
Sphere = window.Sphere || {};

Sphere.utils = {};

Sphere.utils.randIntRange = function (min, max, roundTo ) {
	var val = Math.round( Math.random()*(max-min) + min );
	if( roundTo != undefined ) val = Math.round(val/roundTo) * roundTo;
	return val;
};
//http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
Sphere.utils.supportsTransitions = function() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'transition';
    var transforms = {
        'webkitTransform':'Webkit',
        'OTransform':'O',
        'msTransform':'ms',//msTransform
        'MozTransform':'Moz',
        'transform':'transform'
    };
    //if(typeof s[p] == 'string') {return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
    p = p.charAt(0).toUpperCase() + p.substr(1);
	var prefix = null;
    for(var i=0; i<v.length; i++) {
      if(typeof s[v[i] + p] == 'string') { prefix = v[i]; }
    }
	
    for (var t in transforms) {
		if(prefix == transforms[t]){
			return t;
		}
    }
	
    return false;
};


///!!!!!!
//requestAnimFrame
window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();