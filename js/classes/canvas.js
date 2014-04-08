/**
 * @Class Canvas
 * @author jamie.gilmartin@ogilvy.com
 */
function Canvas( parent,name,image){
	console.log('can obj');
	this.canvas = document.createElement('canvas');
	this.canvas.classList.add(name)
	this.w = this.canvas.width = window.innerWidth;
	this.h = this.canvas.height = window.innerHeight;
	
	this.image = image;


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
	
	parent.appendChild( this.canvas );
	
	if (this.canvas.getContext){  
		this.c = this.canvas.getContext('2d');
		// drawing code here
		
		this.loadImage();

		//center canvas
		//this.c.translate(this.w*0.5,this.h*0.5);

		//this.n = 0;
		
	}
};
//inherits GameObject
Canvas.prototype = new GameObject();
Canvas.prototype.constructor = Canvas;


Canvas.prototype.loadImage = function(){
	var self = this;
	var img = new Image();
	img.crossOrigin = true;
	img.onload = function(){

		self.c.drawImage(img, 0, 0, self.w, self.h );
		self.originalPixels = self.c.getImageData(0, 0, self.canvas.w, self.canvas.h );

	
		self.fillGridWidthImageData();
	}
	img.src = this.image;
};	