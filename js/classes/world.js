/**
 * @Class World
 * @author jamie.gilmartin@ogilvy.com
 */
function World(){
	var self =  this;
	this.myTransform = utils.supportsTransitions();

	//dom ele
	this.viewport = document.getElementById( 'viewport' );
	this.world = document.getElementById( 'world' );
	this.worldAngle = $V([0,0]);
	this.d = 0;// -1000; //depth
	this.perspective = 1000;

	this.viewport.style.perspective = this.perspective;
	this.viewport.style.WebkitPerspective = this.perspective;


	this.c = {
		x : this.world.offsetWidth / 2,
		y : this.world.offsetHeight / 2
	}

	//centering div
	this.centerDiv = document.createElement( 'div'  );	
    this.centerDiv.className = 'cloudBase';
    var t = 'translateX( ' + this.c.x + 'px ) \
        translateY( ' +  this.c.y  + 'px ) \
        translateZ( ' +  0  + 'px )';
    this.centerDiv.style[this.myTransform] = t;
    this.world.appendChild( this.centerDiv );

    //particle system
    this.particleSystem = new ParticleSystem( this.world );



    //make axis
    this.axisHelper();
    //this.sphericalHelper();
    this.events();
};
//inherits GameObject
World.prototype = new GameObject();
World.prototype.constructor = World;

/**
 * draw x,y,z, axes
 */
World.prototype.axisHelper = function(){
	var axes = { 
				x : document.createElement( 'div' ),
				y : document.createElement( 'div' ),
				z : document.createElement( 'div' )
			   };

	//for(var i=0;i<axes.length;i++){
	for(var key in axes){
  		axes[key].classList.add('axis');
  		var t;
   		if(key === 'x'){
   			t = 'translateX( ' + 0 + 'px ) \
       		translateY( ' +  this.c.y  + 'px ) \
        	translateZ( ' +  0  + 'px )';
        	axes[key].classList.add('x-axis');
   		}
    	if(key === 'y'){
   			t = 'translateX( ' + this.c.x + 'px ) \
       		translateY( ' +  0  + 'px ) \
        	translateZ( ' +  0  + 'px )';
        	axes[key].classList.add('y-axis');
   		}
   		if(key === 'z'){
   			t = 'translateX( ' + 0 + 'px ) \
       		translateY( ' +  this.c.y + 'px ) \
        	translateZ( ' +  0  + 'px ) \
        	rotateY( ' + 90  + 'deg )';
        	axes[key].classList.add('z-axis');
   		}
   		axes[key].style[this.myTransform] = t;
   		this.world.appendChild( axes[key] );
	}
};
/**
 * draw lat long
 */
World.prototype.sphericalHelper = function(){
	var radius = this.world.offsetHeight/2;
	//x circle, z depth
	for(var i=0;i<360;i++){
		var point = document.createElement( 'div' );
		point.classList.add('point');
		var x = radius-(radius*Math.cos(i)),
			y = this.c.y,
			z = (radius*Math.sin(i));

		var t = 'translateX( ' + x + 'px ) \
   		translateY( ' +  y + 'px ) \
    	translateZ( ' +  z + 'px )';
    	point.style[this.myTransform] = t;
   		this.world.appendChild( point );
	}
	//y circle, z depth
	for(var j=0;j<360;j++){
		var point = document.createElement( 'div' );
		point.classList.add('point');
		var x = this.c.x,
			y = radius-(radius*Math.cos(j)),
			z = (radius*Math.sin(j));

		var t = 'translateX( ' + x + 'px ) \
   		translateY( ' +  y + 'px ) \
    	translateZ( ' +  z + 'px )';
    	point.style[this.myTransform] = t;
   		this.world.appendChild( point );
	}
	//z circle, y depth
	for(var k=0;k<360;k++){
		var point = document.createElement( 'div' );
		point.classList.add('point');
		var x = radius-(radius*Math.cos(k)),
			y = radius-(radius*Math.sin(k)),
			z = this.d;

		var t = 'translateX( ' + x + 'px ) \
   		translateY( ' +  y + 'px ) \
    	translateZ( ' +  z + 'px )';
    	point.style[this.myTransform] = t;
   		this.world.appendChild( point );
	}

	//fill random
	console.log(utils.randIntRange(-radius,radius))
	for(var l=0;l<1000;l++){
		var point = document.createElement( 'div' );
		point.classList.add('point');
		var x = radius-(utils.randIntRange(0,radius))*(Math.cos(l)) ,
			y =	this.c.y,//(radius-(radius*Math.cos(l)) ),
			z = (utils.randIntRange(0,radius))*(Math.sin(l))

		var t = 'translateX( ' + x + 'px ) \
   		translateY( ' +  y + 'px ) \
    	translateZ( ' +  z + 'px )';
    	point.style[this.myTransform] = t;
   		this.world.appendChild( point );
	}
};
/**
 * world events
 */
World.prototype.events = function(){
	var self = this;
	window.addEventListener( 'mousemove', function( e ) {
	    var y = -( .5 - ( e.clientX / window.innerWidth ) ) * 180,
	 	   	x = ( .5 - ( e.clientY / window.innerHeight ) ) * 180;
	 	self.worldAngle.i = x;
	 	self.worldAngle.j = y;

	   	self.updateMove();


	    //self.perspective = (  ( e.clientX / window.innerWidth ) ) * 1000;
	    //console.log(self.perspective)
		//self.viewport.style.WebkitPerspective = self.perspective + 'px';
	});
};
/**
 * update Move
 */
World.prototype.updateMove = function(){
	//super class plomorph

	//rotate world
	this.world.style[this.myTransform] = 'translateZ(' + this.d + 'px ) \
		rotateX( ' + this.worldAngle.i + 'deg) \
		rotateY( ' + this.worldAngle.j  + 'deg)';
      	//console.log(this.worldAngle)

    var t = 'translateX( ' + this.c.x + 'px ) \
        translateY( ' +  this.c.y  + 'px ) \
        translateZ( ' +  0  + 'px ) \
        rotateY( ' + ( -  this.worldAngle.j ) + 'deg ) \
	    rotateX( ' + ( -  this.worldAngle.i ) + 'deg )';
    this.centerDiv.style[this.myTransform] = t;
};

World.prototype.run = function(){
	this.particleSystem.run();
};

