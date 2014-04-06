/**
 * @Class ParticleSystem
 * @author jamie.gilmartin@ogilvy.com
 */
function ParticleSystem( world ){
	this.particles = [];
	this.world = world;

	for(var i=0;i<10;i++){
		this.make();
	}
};

//inherits GameObject
ParticleSystem.prototype = new GameObject();
ParticleSystem.prototype.constructor = ParticleSystem;

/**
 * update
 */
ParticleSystem.prototype.make = function(){
	var radius = this.world.offsetHeight/2;
	var l = utils.randIntRange(0,360);
	var x = radius-(utils.randIntRange(0,radius))*(Math.cos(l)) ,
		y =	(radius-(radius*Math.cos(l)) ),
		z = (utils.randIntRange(0,radius))*(Math.sin(l))

	var p = new Particle(x,y,z) 
	this.particles.push( p ) ;
	this.world.appendChild( p.element );
	console.log('runing ParticleSystem');
};

/**
 * draw
 */
ParticleSystem.prototype.draw = function(){


	for(var i = 0; i < this.particles.length; i++) {
		this.particles[i].run();
		if(this.particles[i].isDead()){
			console.log(i, 'is dead')
			this.world.removeChild(this.particles[i].element );
			this.particles.splice(i, 1);
		}
	}
};


  //  this.world.appendChild( p.element );