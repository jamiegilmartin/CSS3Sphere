/**
 * @Class Canvas
 * @author jamie.gilmartin@ogilvy.com
 */
function Canvas(name){
	console.log('can obj');
	this.element = document.createElement('canvas');
	this.element.classList.add(name);

	//this.w = this.element.width = window.innerWidth;
	//this.h = this.element.height = window.innerHeight;
	this.output = document.getElementById('canvas-output')	

	//time
	this.startTime = Date.now();
	this.then = Date.now();
	this.secondsRunning = 0;
	this.duration = 10;
	this.fps = 24;
	this.fpsInterval = 1000 / this.fps;
	this.delta;
	this.frame = 0;

	this.playing = true;
	
	this.imageColors = [];
		
	if (this.element.getContext){  
		this.c = this.element.getContext('2d');
		// drawing code here
		
		//this.loadImage();

		//center canvas
		//this.c.translate(this.w*0.5,this.h*0.5);

		this.n = 0;
		this.r = 50;


		this.rotateZ = 0;
		//this.drawGrid();

		this.createParticles();
	}
};
//inherits GameObject
Canvas.prototype = new GameObject();
Canvas.prototype.constructor = Canvas;

//helpers
Canvas.prototype.clear = function(){
	this.c.save();
	this.topLeft();
	this.c.clearRect( 0, 0, this.w, this.h );
	this.c.restore();
};
Canvas.prototype.fade = function(){
	this.c.save();
	this.topLeft();
	this.c.fillStyle = 'rgba(9,104,224,0.1)';
	this.c.fillRect( 0, 0, this.w, this.h );
	this.c.restore();
};
Canvas.prototype.topLeft = function(){
	//center canvas
	this.c.translate(-this.w*0.5,-this.h*0.5);
};
Canvas.prototype.center = function(){
	//center canvas
	this.c.translate(this.w*0.5,this.h*0.5);
};
//append
Canvas.prototype.appendToDom = function(parentElement){
	//set width
	this.w = this.element.width = parentElement.offsetWidth;
	this.h = this.element.height = parentElement.offsetHeight;
	this.location = new Vector((parentElement.offsetWidth*.5 - (this.w*.5)),(parentElement.offsetHeight*.5  - (this.h*.5)), 0 );
	parentElement.appendChild(this.element);
};
//load image
Canvas.prototype.loadImage = function( image , done ){
	var self = this;
	var img = new Image();
	img.crossOrigin = true;

	img.onload = function(){
		//console.log(img.width,img.height)
		//self.c.drawImage(img, 0, 0, self.w, self.h );//resize to canvas
		self.c.save();
		self.center();
		self.c.drawImage(img, -img.width*.5, -img.height*.5, img.width, img.height );//centered at original image size

		self.originalPixels = self.c.getImageData(0, 0, self.w, self.h );
		self.c.restore();

		self.getColorFromImage();

		done( self.originalPixels  );



	}
	img.src = image;
};
Canvas.prototype.getColorFromImage = function(){

	var data = this.originalPixels.data;
	
	var imageWidth = columns = Math.round(this.originalPixels.width);
	var imageHeight = rows = Math.round(this.originalPixels.height);
	var scale = imageWidth;

	

	//for(var x = 0; x < columns; x++){ 
		var x = this.w *.5; //just loop down center of image since it's semetrical and save time
		for(var y = 0; y < rows; y++){
			
			var xIndex = Math.round(x);
			var yIndex = Math.round(y);
			
			var index = ( xIndex+yIndex*imageWidth ) * 4;
			
			var red = data[ index ];
			var green = data[index + 1];
			var blue = data[index + 2];
			var alpha = data[index + 3];

			if(alpha>0.01){

				var color = {
					r : red,
					g : green,
					b : blue,
					a : alpha
				};
				this.imageColors.push(color);
			}
		}	
	//}
	//console.log(this.imageColors.length)

};
Canvas.prototype.getColorByPos = function(x,y,r){
	var ratioToRadius = this.imageColors.length * r ;
	//console.log(ratioToRadius)
	var c = this.imageColors[y];
	var color =  c ? 'rgba('+c.r+','+c.g+','+c.b+','+c.a+')' : 'rgba(255,255,255,0.1)';
	this.output.innerHTML = color;
	return color;
	//return 'rgba(255,255,255,0.1)';
};
/**
 * drawing a grid
 * slow as ass TODO: try linetos
 */
Canvas.prototype.drawGrid = function(){
	console.log('grrdd')
	this.square = {};
	var scale = 20;
	var rows = 10;//this.w / scale;
	var columns = 20;//this.h / scale;
	
	this.c.beginPath();
	this.c.moveTo(0,0);
	
	/****/
	/*
	//https://medium.com/cool-code-pal/1f5fd88a219e
	for (var i=0, j=0; i<columns && j<rows; j++, i=(j==rows)?i+1:i,j=(j==rows)?j=0:j) {
	

	
		// Scaling up to draw a rectangle at (x,y)
		var x = i*scale;
		var y = j*scale;
		//this.c.fillStyle = 'rgba(255,255,255,0.5)';
		this.c.strokeStyle = 'rgba(255,0,255,0.7)';
		this.c.stroke();
		this.c.rect( x, y, scale, scale );
	}*/
	
	for(var i=0;i<columns;i++){
		for(var j=0;j<rows;j++){
			// Scaling up to draw a rectangle at (x,y)
			var x = i*scale;
			var y = j*scale;
			//this.c.fillStyle = 'rgba(255,255,255,0.5)';
			this.c.strokeStyle = 'rgba(255,0,255,0.7)';
			this.c.stroke();
			this.c.rect( x, y, scale, scale );
			
		}
	}
};


Canvas.prototype.createParticles = function(){
	//center canvas
	this.center();
	//particle system
    this.particleSystem = new ParticleSystem(this.c, 0,0,0);
	this.repeller = new Repeller(this.c, 0, 40, 0);
	this.gravity = new Vector(0,0.1,0);

}
/**
 * animation functions
 */
Canvas.prototype.update = function(){
	this.c.save();
};

Canvas.prototype.draw = function(){
	//center canvas
	this.center();

	this.particleSystem.draw();
	this.repeller.draw();

  	this.particleSystem.applyForce(this.gravity);
	this.particleSystem.applyRepeller( this.repeller );


	this.fade();
	this.c.restore();
};



/**
 * animation functions
 */
Canvas.prototype.updateX = function(){
	this.c.save();
	this.n++;
	this.r+=50;
	this.rotateZ ++;
	
};
//old
Canvas.prototype.drawX = function(){
	//center canvas
	this.center();
	
	//this.c.lineWidth = 1.5;
	this.c.beginPath();

	//mathographics page 126
	var n = this.n%360; //this.n;
	//var n = 0;
	var r = this.r%500;

	this.c.strokeStyle = 'rgba(255,255,255,0.09)';
	this.c.fillStyle = 'rgba(255,255,255,0.9)';
	//console.log(n)

	if(this.n<100){
		/*
		for(var a = 0; a<360; a+=360/180){//
			var x = r*Math.cos(a+(n));
			var y = r*Math.sin(a+(n));
			if(a===0) this.c.moveTo(x,y);

			//colors
			//var color = this.getColorByPos(x,y,r);
			this.c.strokeStyle = 'rgba(255,255,255,0.05)';
			this.c.fillStyle = 'rgba(255,255,255,0.5)';


			this.c.lineTo(x,y);
			this.c.fillRect(x,y,1,1);
			//this.c.quadraticCurveTo(0,0,x,y);
			//this.c.bezierCurveTo(n,n,x+n,y+n,x,y);
			//this.c.arcTo(x,y,x*n,y*n,r)
		}*/
		
		for(var a = 0; a<360; a+= n ){
			var r = 500;
			var x = r*Math.cos(a);
			var y = r*Math.sin(a);
			if(a===0) this.c.moveTo(x,y);
			if(a===360) this.c.moveTo(x,y);
			//this.c.fillRect(x,y,1,1);
			this.c.lineTo(x,y);
		}
		



		//this.n -= this.n*0.1;
		this.r -= this.r*0.01;
	}else{
		this.n = 0;
	}
	this.c.stroke();

	//this.c.globalAlpha = Math.random();
	this.fade();

	this.c.restore();

	var t = 'translateX( ' + this.location.x + 'px ) \
        translateY( ' +  this.location.y + 'px ) \
        translateZ( ' +  this.location.z + 'px ) \
        rotateZ( ' + this.rotateZ  + 'deg )';
    //this.element.style[Sphere.myTransform] = t;
};












