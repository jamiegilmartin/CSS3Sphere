/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Particle(){
	this.element = document.createElement('div');


	this.location = $V([0,0,0]);
	this.velocity = $V([0,0,0]);
	this.acceleration = $V([0,0,0]);

	this.lifeSpan =  255;
};
//inherits GameObject
Particle.prototype = new GameObject();
Particle.prototype.constructor = Particle;

/**
 * update
 */
Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
	this.location.add(this.velocity);

	this.lifeSpan -= 2;
};

/**
 * draw
 */
Particle.prototype.draw = function(){
	var t = 'translateX( ' + this.location.i + 'px ) \
        translateY( ' +  this.location.j  + 'px ) \
        translateZ( ' +  this.location.k  + 'px )';
    this.element.style[Sphere.myTransform] = t;
};