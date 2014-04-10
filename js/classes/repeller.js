/**
 * @Class Repeller
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Repeller(c,x,y,z){
	this.c = c;
	

	this.location = new Vector(x,y,z);

	this.strength = 100;
};
//inherits GameObject
Repeller.prototype = new GameObject();
Repeller.prototype.constructor = Repeller;


/**
 * repel
 */
Repeller.prototype.repel = function( p ){
	var loc =  this.location.copy();
	var dir = loc.subtract( p.location );

	var distance = dir.magnitude();
	dir.normalize();

	distance = utils.clamp(distance,5,100);
	
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
	this.c.beginPath();
	this.c.strokeStyle = 'rgba(255,255,255,0.09)';
	this.c.fillStyle = 'rgba(255,0,0,0.9)';
	this.c.fillRect(this.location.x,this.location.y,30,30);
	this.c.stroke();
};

