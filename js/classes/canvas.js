/**
 * @Class Canvas
 * @author jamie.gilmartin@ogilvy.com
 */
function Canvas(name ){
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
		//this.drawGrid();
	}
};
//inherits GameObject
Canvas.prototype = new GameObject();
Canvas.prototype.constructor = Canvas;

Canvas.prototype.appendToDom = function(parentElement){
	//set width
	this.w = this.element.width = parentElement.offsetWidth;
	this.h = this.element.height = parentElement.offsetHeight;

	parentElement.appendChild(this.element);
};
Canvas.prototype.loadImage = function( image , done ){
	var self = this;
	var img = new Image();
	img.crossOrigin = true;
	img.onload = function(){

		self.c.drawImage(img, 0, 0, self.w, self.h );
		self.originalPixels = self.c.getImageData(0, 0, self.w, self.h );


		done( self.originalPixels  );



	}
	img.src = image;
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
Canvas.prototype.update = function(){
	this.c.save();
	this.n++;
	this.r+=5;
	
};
Canvas.prototype.draw = function(){
	//center canvas
	this.center();
	//colors
	//this.c.strokeStyle = "#000";
	//this.c.lineWidth = 1.5;
	this.c.beginPath();

	//mathographics page 126
	if(this.n<1000){

		var r = this.r;
		for(var a = 0; a<360; a+=360/180){
			var x = r*Math.cos(a);
			var y = r*Math.sin(a);
			if(a===0) this.c.moveTo(x,y);
			//this.c.lineTo(x,y);
			this.c.fillRect(x,y,1,1);
		}
	}

	this.c.stroke();
	this.c.restore();
};

Canvas.prototype.clear = function(){
	this.c.clearRect( 0, 0, this.w, this.h );
};
Canvas.prototype.fade = function(){
	this.c.fillRect( 0, 0, this.w, this.h );
};
Canvas.prototype.center = function(){
	//center canvas
	this.c.translate(this.w*0.5,this.h*0.5);
};










