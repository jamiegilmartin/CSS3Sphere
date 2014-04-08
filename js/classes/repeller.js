/**
 * @Class Repeller
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Repeller(x,y,z){
	//set ele
	this.element = document.createElement('div');
	this.element.className = 'repeller';

	this.location = new Vector(x,y,z);

};
//inherits GameObject
Repeller.prototype = new GameObject();
Repeller.prototype.constructor = Repeller;


/**
 * repel
 */
Repeller.prototype.repel = function( p ){
	var dir = this.location.subtract( p.location );
	//var d
};

/**
 * update
 */
Repeller.prototype.update = function(){

};

/**
 * draw
 */
Repeller.prototype.draw = function(){
	var t = 'translateX( ' + this.location.elements[0] + 'px ) \
        translateY( ' +  this.location.elements[1] + 'px ) \
        translateZ( ' +  this.location.elements[2] + 'px )';
    this.element.style[Sphere.myTransform] = t;
};

