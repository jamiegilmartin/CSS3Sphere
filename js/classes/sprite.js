/**
 * @Class Sprite
 * @author jamie.gilmartin@ogilvy.com
 * @param view - element
 * @param view - path to image and json
 * @param view - name of json file
 */
Sprite = function( view, pathPrefix, json ){
	this.view = view;
	this.json = json;
	this.duration = 1;
	this.delay = 3000;
	this.pathPrefix = pathPrefix;
	this.img = document.createElement('img');
	this.currentFrame = 0;
	this.percentPlayed = 0;
	this.frames = [];
	
	this.playing = true;
	
	this.requestJSON( this.pathPrefix + this.json  );
};
Sprite.prototype.requestJSON = function( path  ){
	//request
	var self = this,
		xhr = new XMLHttpRequest();
	xhr.open('GET', path, true);
	xhr.onload = function(){
		var parsedJSON = JSON.parse(this.responseText);
		self.init(parsedJSON);
	};
	xhr.send();
};
Sprite.prototype.init = function( atlas ){
	
	//set img src for drawing
	this.img.src = this.pathPrefix + atlas.meta.image;
	//this.img.style.position = 'absolute';
	//this.img.style.left = 0;
	//this.img.style.top = 0;
	
	var width, height;
	for(var frame in atlas.frames){
		//populate frames array
		this.frames.push( atlas.frames[frame] );
		
		//since all the same h & w
		width = atlas.frames[frame].frame.w;
		height =  atlas.frames[frame].frame.h;
	}

	//set view helper styles
	this.view.style.position = 'relative';
	this.view.style.overflow = 'hidden';
	this.view.style.width = width + 'px';
	this.view.style.height = height + 'px';
	
	//append img //TODO load it!
	//this.view.appendChild(this.img);
	this.view.style.backgroundImage = 'url("'+this.img.src+'")';
	
	
	//this.animate();
};
/**
 * tester function
 */
Sprite.prototype.animate = function(){
	var self = this;
	function animate(){
		if(self.percentPlayed <= 100 ){
			self.update();
			self.percentPlayed++;
			setTimeout(animate,10);
		}
	}
	
	//on mouse over
	this.view.addEventListener('mouseover', function(){
		setTimeout(animate,10);
	},false)
	
};


Sprite.prototype.update = function(){
	//set currentFrame based on percentage
	this.currentFrame = Math.round( ( (this.frames.length-1) * this.percentPlayed )/100 );
	this.draw();
};

Sprite.prototype.draw = function(){
	
	var frame = this.frames[this.currentFrame];
	
	//console.log('current frame', this.currentFrame )
	//this.img.style.left = -frame.frame.x+'px';
	//this.img.style.top =  -frame.frame.y+'px';
	
	this.view.style.backgroundPosition = -frame.frame.x+'px'+ ' '+ -frame.frame.y+'px';
	
};
