/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Particle(c,x,y,z){
	this.c = c;
	
	this.location = new Vector(x,y,z);

	var v1 = utils.randFloatRange(-1,1),
		v2 = utils.randFloatRange(-2,0);
	this.velocity = new Vector(v1,v2,0);
	this.acceleration = new Vector(0,0,0);

	this.lifeSpan =  1;
	this.mass = 1;

};
//inherits GameObject
Particle.prototype = new GameObject();
Particle.prototype.constructor = Particle;



/**
 * force
 */
Particle.prototype.applyForce = function( force ){
  	var f = force.multiply(this.mass);
    this.acceleration.add(f);
};

/**
 * update
 */
Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.location.add(this.velocity);
	this.acceleration.multiply(0);
	this.lifeSpan -= .005;
};

/**
 * draw
 */
Particle.prototype.draw = function(){
	this.c.beginPath();
	this.c.strokeStyle = 'rgba(255,0,0,'+this.lifeSpan+')';
	this.c.fillStyle = 'rgba(255,0,255,'+this.lifeSpan+')';
	this.c.fillRect(this.location.x,this.location.y,5,5);
	this.c.stroke();
	this.c.closePath();
};

Particle.prototype.isDead = function(){
	if(this.lifeSpan < 0) {
		return true;
	} else {
		return false;
	}
};