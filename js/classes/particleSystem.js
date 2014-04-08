/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 */
function ParticleSystem( world ){
	this.particles = [];
	this.world = world;
	this.origin = new Vector(this.world.c.x,this.world.c.y,0);


	for(var i=0;i<20;i++){
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
	var radius = this.world.offsetHeight/2;
	var l = utils.randIntRange(0,360);
	var x = radius-(utils.randIntRange(0,radius))*(Math.cos(l)),
		y =	(radius-(radius*Math.cos(l)) ),
		z = (utils.randIntRange(0,radius))*(Math.sin(l))

	//var p = new Particle(x,y,z) 
	var p = new Particle(this.origin.x,this.origin.y,this.origin.z);
	this.particles.push( p ) ;
	//append
	this.world.world.appendChild( p.element );
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
		var force = new Vector( repeller.repel(this.particles[i]) );
		this.particles[i].applyForce(force);
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
			this.world.removeChild(this.particles[i].element );
			this.particles.splice(i, 1);
		}
	}
};


  //  this.world.appendChild( p.element );