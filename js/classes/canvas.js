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
	

	//append
	//parent.appendChild( this.element );
	
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
	}
};
//inherits GameObject
Canvas.prototype = new GameObject();
Canvas.prototype.constructor = Canvas;

//helpers
Canvas.prototype.clear = function(){
	this.c.clearRect( 0, 0, this.w, this.h );
};
Canvas.prototype.fade = function(){
	this.c.save();
	this.topLeft();
	this.c.fillStyle = 'rgba(9,104,224,0.01)';
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
		console.log(img.width,img.height)
		//self.c.drawImage(img, 0, 0, self.w, self.h );//resize to canvas
		self.c.save();
		self.center();
		self.c.drawImage(img, -img.width*.5, -img.height*.5, img.width, img.height );//centered at original image size

		self.originalPixels = self.c.getImageData(0, 0, self.w, self.h );
		self.c.restore();

		done( self.originalPixels  );



	}
	img.src = image;
};
Canvas.prototype.getColorFromImage = function(){
	if(!this.originalPixels) return;

	var data = this.originalPixels.data;
	
	var imageWidth = columns = Math.round(this.originalPixels.width);
	var imageHeight = rows = Math.round(this.originalPixels.height);
	var scale = imageWidth;

	for (var i=0, j=0; i<columns && j<rows; j++, i=(j==rows)?i+1:i,j=(j==rows)?j=0:j) {
			var x = i, y = j;

			var xIndex = x;
			var yIndex = y;
			
			var index = ( xIndex+yIndex*imageWidth ) * 4;
			
			var red = data[ index ];
			var green = data[index + 1];
			var blue = data[index + 2];
			var alpha = data[index + 3];
			
			var color = 'rgba('+ red+','+ green+','+ blue+','+ (alpha / 255)+')';

			if(alpha>0) return(color);
		
	}

	//return 'rgba(255,255,255,0.6)';
};
/**
 * drawing a grid
 * slow as ass TODO: try linetos
 */
Canvas.prototype.drawGrid = function(  ){
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

/**
 * animation functions
 */
Canvas.prototype.update = function(){
	this.c.save();
	this.n++;
	this.r+=5;
	this.rotateZ ++;
	
};
Canvas.prototype.draw = function(){
	//center canvas
	this.center();
	
	//this.c.lineWidth = 1.5;
	this.c.beginPath();

	//mathographics page 126
	var n = this.n%360; //this.n;
	var r = this.r%this.w*.5;

	//console.log(n)

	if(n<10){
		
		for(var a = 0; a<360; a+=360/180){
			var x = r*Math.cos(a+(n));
			var y = r*Math.sin(a+(n));
			if(a===0) this.c.moveTo(x,y);

			//colors
			this.c.strokeStyle = this.getColorFromImage();//'rgba(255,255,255,0.6)';
			this.c.fillStyle = this.getColorFromImage();//'rgba(255,255,255,0.6)';

			this.c.lineTo(x,y);
			this.c.fillRect(x,y,1,1);
		}
		this.n -= this.n*0.1;
		this.r += this.r*0.01;
	}
	this.c.stroke();

	this.fade();

	this.c.restore();

	var t = 'translateX( ' + this.location.x + 'px ) \
        translateY( ' +  this.location.y + 'px ) \
        translateZ( ' +  this.location.z + 'px ) \
        rotateZ( ' + this.rotateZ  + 'deg )';
   // this.element.style[Sphere.myTransform] = t;
};












