/**
 * @Class Canvas
 * @author jamie.gilmartin@ogilvy.com
 */
function Canvas( parent, name ){
	console.log('can obj');
	this.element = document.createElement('canvas');
	this.element.classList.add(name)
	this.w = this.element.width = window.innerWidth;
	this.h = this.element.height = window.innerHeight;
	

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
	parent.appendChild( this.element );
	
	if (this.element.getContext){  
		this.c = this.element.getContext('2d');
		// drawing code here
		
		//this.loadImage();

		//center canvas
		//this.c.translate(this.w*0.5,this.h*0.5);

		//this.n = 0;
		
	}
};
//inherits GameObject
Canvas.prototype = new GameObject();
Canvas.prototype.constructor = Canvas;


Canvas.prototype.loadImage = function( image ){
	var self = this;
	var img = new Image();
	img.crossOrigin = true;
	img.onload = function(){

		self.c.drawImage(img, 0, 0, self.w, self.h );
		self.originalPixels = self.c.getImageData(0, 0, self.w, self.h );

	
		//self.fillGridWidthImageData();
	}
	img.src = image;
};	