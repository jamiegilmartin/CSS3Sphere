/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 * @see http://natureofcode.com/book/chapter-4-particle-systems/
 */
function Particle(x,y,z){
	//set ele
	this.element = document.createElement('div');
	this.element.className = 'particle';

	this.location = Vector.create([x,y,z]);

	var v1 = Math.random(-1,1),
		v2 = Math.random(-2,0);
	this.velocity = Vector.create([v1,v2,0]);
	this.acceleration = Vector.create([0,0.5,0.5]);

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
	this.location = this.location.add(this.velocity);

	this.lifeSpan -= 2;

};

/**
 * draw
 */
Particle.prototype.draw = function(){
	var t = 'translateX( ' + this.location.elements[0] + 'px ) \
        translateY( ' +  this.location.elements[1] + 'px ) \
        translateZ( ' +  this.location.elements[2] + 'px )';
    this.element.style[Sphere.myTransform] = t;

    console.log('im dead?', this.isDead(),this.lifeSpan)
};

Particle.prototype.isDead = function(){
	if(this.lifeSpan < 0) {
		return true;
	} else {
		return false;
	}
};