'use strict'; 

var utils = window.utils || {};

utils.randIntRange = function (min, max, roundTo ) {
	var val = Math.round( Math.random()*(max-min) + min );
	if( roundTo != undefined ) val = Math.round(val/roundTo) * roundTo;
	return val;
};
//http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
utils.supportsTransitions = function() {
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
utils.shuffleArray = function( inArray ) {
    var i = inArray.length,
        j,
        temp;
    if ( i === 0 ) return false;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = inArray[i];
        inArray[i] = inArray[j];
        inArray[j] = temp;
    }
    return inArray;
};
/**
 * @see http://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
utils.clamp = function(number,min,max){
    /* do non prototype way
    Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
    };
    */
    return  Math.min(Math.max(number, min), max);
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