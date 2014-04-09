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
	this.worldAngle = new Vector(0,0,0);
	this.d = 0;// -1000; //depth
	this.perspective = 1000;

	this.viewport.style.perspective = this.perspective;
	this.viewport.style.WebkitPerspective = this.perspective;

	//center 'c'
	this.w = this.world.offsetWidth;
	this.h = this.world.offsetHeight;
	this.c = {
		x : this.w / 2,
		y : this.h / 2
	}

	self.worldAngle.i = 0;//arbitrary keys left over from slyvester.js days
	self.worldAngle.j = 0;


	//centering div
	//this.center();

    //particle system
    //this.particleSystem = new ParticleSystem( this );
	////this.repeller = new Repeller( this.c.x+10, this.c.y+30, 0);
	//this.gravity = new Vector(0,0.01,0);
  	//this.particleSystem.applyForce(this.gravity);
	//this.particleSystem.applyRepeller( this.repeller );

	//this.world.appendChild( this.repeller.element );


  	//sun canvas
  	this.sun = new Sun(this);
  	this.world.appendChild( this.sun.element );

  	//set up canvas to get colors
	this.canvas = new Canvas('sun-canvas');
	this.canvas.appendToDom(this.viewport);//don't need in dom

	//set up grid to display colors
	this.grid = new Grid();
	//document.body.appendChild(this.grid.element);


	this.canvas.loadImage('./images/sun.png', function(data){
		console.log('sun image loaded');
		//self.grid.fillGridWidthImageData(data);
		//self.canvas.drawGrid();
		//self.canvas.mathographics();
	});

	//array of cloud bases
	this.numberOfClouds = 2;
	this.clouds = [];

	var cloud1 = new Cloud( this, -this.c.x , this.c.y  , 0)
	this.clouds.push( cloud1 );
	this.world.appendChild( cloud1.element );

	var cloud2 = new Cloud(  this, this.w +this.c.x , this.c.y  , 0)
	this.clouds.push( cloud2 );
	this.world.appendChild( cloud2.element );

	/*
	for(var i=0;i<this.numberOfClouds;i++){
		var cloud = new Cloud( this.c.x + (Math.random()*-this.w) , this.c.y + (Math.random()*+this.h)  , 0)
		this.clouds.push( cloud );
		this.world.appendChild( cloud.element );
	}*/
		

    //make axis
   	this.axisHelper();
    this.sphericalHelper();
   	this.events();

};
//inherits GameObject
World.prototype = new GameObject();
World.prototype.constructor = World;


/**
 * world events
 */
World.prototype.events = function(){
	var self = this;
	window.addEventListener( 'mousemove', function( e ) {
	    var y = -( .5 - ( e.clientX / window.innerWidth ) ) * 15,//180 = full tilt
	 	   	x = ( .5 - ( e.clientY / window.innerHeight ) ) * 15;
	 	self.worldAngle.i = x;//arbitrary keys left over from slyvester.js days
	 	self.worldAngle.j = y;

	   	self.updateMove();
	    if(e.clientX<window.innerWidth/2){
	    	self.perspective = ( ( e.clientX / window.innerWidth*2 ) ) * 1000;
	    }else{
	    	self.perspective =  self.c.x+(.5 - ( (e.clientX-window.innerWidth*.5 ) / window.innerWidth*2 )  ) * 1000;
	    }
	    
	    self.perspective = 1000 - self.perspective;
	    self.perspective = utils.clamp(  self.perspective, 0, 1000);
	    //console.log('self.perspective',self.perspective)
		//self.viewport.style.WebkitPerspective = self.perspective + 'px';
	});
};

/**
 * center div
 */
World.prototype.center = function(){
	this.centerDiv = document.createElement( 'div'  );	
    this.centerDiv.className = 'center';
    var t = 'translateX( ' + this.c.x + 'px ) \
        translateY( ' +  this.c.y  + 'px ) \
        translateZ( ' +  0  + 'px )';
    this.centerDiv.style[this.myTransform] = t;
    this.world.appendChild( this.centerDiv );
};
/**
 * draw x,y,z, axes
 */
World.prototype.axisHelper = function(){
	var axes = { 
				x : document.createElement( 'div' ),
				y : document.createElement( 'div' ),
				z : document.createElement( 'div' )
			   };

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
	var degrees = 90;
	//x circle, z depth
	for(var i=0;i<degrees;i++){
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
	for(var j=0;j<degrees;j++){
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
	for(var k=0;k<degrees;k++){
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
	//console.log(utils.randIntRange(-radius,radius))
	/*
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
	*/
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
    if(this.centerDiv) this.centerDiv.style[this.myTransform] = t;
};

World.prototype.run = function(){
	if(this.sun) this.sun.run();
	if(this.particleSystem) this.particleSystem.run();
	if(this.canvas) this.canvas.run();

	for(var i=0;i<this.clouds.length;i++){
		this.clouds[i].run();
	}
};

World.prototype.updateOnScroll = function(percentage){
	this.sun.location.y = percentage * this.sun.originalLocation.x;

	for(var i=0;i<this.clouds.length;i++){
	this.clouds[i].location.x += percentage;
	}
};

