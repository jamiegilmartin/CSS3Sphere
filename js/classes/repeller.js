/**
 * @Class Repeller
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Repeller(x,y,z){
	this.strength = 100;
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
	var distance = dir.magnitude();
	distance = utils.clamp(distance,5,100);
	dir.normalize();
	var force = -1 * this.strength / (distance * distance);
    dir = dir.multiply(force);
    return dir;
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
	var t = 'translateX( ' + this.location.x + 'px ) \
        translateY( ' +  this.location.y + 'px ) \
        translateZ( ' +  this.location.z + 'px )';
    this.element.style[Sphere.myTransform] = t;
};

