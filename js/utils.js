'use strict'; 

var utils = window.utils || {};

utils.randIntRange = function (min, max, roundTo ) {
	var val = Math.round( Math.random()*(max-min) + min );
	if( roundTo != undefined ) val = Math.round(val/roundTo) * roundTo;
	return val;
};
utils.randFloatRange = function (min, max) {
    return Math.random()*(max-min) + min;
};
utils.degrees = function(radians){
    return radians * (180/Math.PI);
};
utils.radians = function(degrees){
    return degrees *(Math.PI/180);
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

//color
//color tools
utils.getRandomRGBA = function(){
    var rgba = 'rgba('
        +utils.randIntRange(10,255)+','
        +utils.randIntRange(10,255)+','
        +utils.randIntRange(200,255)+','
        +utils.randFloatRange(0.2,0.7)+')';
    
    return rgba;
};
//color tools
utils.getRandomRGB_provideA = function(a){
    var rgba = 'rgba('
        +utils.randIntRange(10,255)+','
        +utils.randIntRange(10,255)+','
        +utils.randIntRange(200,255)+','
        +a+')';
    
    return rgba;
};
//color tools
utils.getRandomRGB = function(){
    var rgb = 'rgb('
        +utils.randIntRange(10,255)+','
        +utils.randIntRange(10,255)+','
        +utils.randIntRange(200,255)+')';
    
    return rgb;
};
utils.getRandomNote = function(){
    this.notesm = [
        "c.mp3",
        "d.mp3",
        "e.mp3",
        "f.mp3",
        "g.mp3",
        "a.mp3",
        "b.mp3",
        "c1.mp3"
    ];
    this.notes = [
    "1.mp3",
    "2.mp3",
    "3.mp3",
    "4.mp3",
    "5.mp3"
    ];
    this.notes = utils.shuffleArray(this.notes);//TODO clone, pop, refresh
    return "./sounds/jb/" + this.notes[ utils.randIntRange(0,this.notes.length-1) ];
    //return "./sounds/" + this.notes[ utils.randIntRange(0,this.notes.length-1) ];
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