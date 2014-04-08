/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Particle(x,y,z){
	//set ele
	this.element = document.createElement('div');
	this.element.className = 'particle';

	this.location = new Vector(x,y,z);

	var v1 = Math.random(-.1,.1),
		v2 = Math.random(-.2,0);
	this.velocity = new Vector(v1,v2,0);
	this.acceleration = new Vector(0,0,0);

	this.lifeSpan =  255;
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
    this.acceleration = this.acceleration.add(f);
};

/**
 * update
 */
Particle.prototype.update = function(){
	this.velocity = this.velocity.add(this.acceleration);
	this.location = this.location.add(this.velocity);

	this.lifeSpan -= 2;
};

/**
 * draw
 */
Particle.prototype.draw = function(){
	var t = 'translateX( ' + this.location.x + 'px ) \
        translateY( ' +  this.location.y + 'px ) \
        translateZ( ' +  this.location.z + 'px )';
    this.element.style[Sphere.myTransform] = t;
};

Particle.prototype.isDead = function(){
	if(this.lifeSpan < 0) {
		return true;
	} else {
		return false;
	}
};