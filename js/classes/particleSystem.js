/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 */
function ParticleSystem(c,x,y,z){
	this.c = c;
	this.particles = [];

	this.origin = new Vector(x,y,z);


	for(var i=0;i<100;i++){
		this.make();
	}
};

//inherits GameObject
ParticleSystem.prototype = new GameObject();
ParticleSystem.prototype.constructor = ParticleSystem;

/**
 * make
 */
ParticleSystem.prototype.make = function(){
	var radius = 500;

	var l = utils.randIntRange(0,360);
	var x = radius-(utils.randIntRange(0,radius))*(Math.cos(l)),
		y =	(radius-(radius*Math.cos(l)) ),
		z = (utils.randIntRange(0,radius))*(Math.sin(l))

	//var p = new Particle(x,y,z) 
	var p = new Particle(this.c, this.origin.x,this.origin.y,this.origin.z);
	this.particles.push( p ) ;
	//append
};

/**
 * force
 */
ParticleSystem.prototype.applyForce = function( force ){
	for(var i = 0; i < this.particles.length; i++) {
		this.particles[i].applyForce(force);
	}
};
/**
 * repeller
 */
ParticleSystem.prototype.applyRepeller = function( repeller ){
	for(var i = 0; i < this.particles.length; i++) {
		var p =  this.particles[i];
		var force = repeller.repel(p);
		p.applyForce(force);
	}
};
/**
 * draw
 */
ParticleSystem.prototype.draw = function(){
	for(var i = 0; i < this.particles.length; i++) {
		
		this.particles[i].run();

		if(this.particles[i].isDead()){
			//console.log(i, 'is dead')
			this.particles[i] = null;
			this.particles.splice(i, 1);
		}
	}
};