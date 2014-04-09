/**
 * @Class Scroller
 * @author jamie.gilmartin@ogilvy.com
 * @param callback function
 */
function Scroller( callback ){
	this.callback = callback;
	this.wrap = document.getElementById('scroller');
	this.output = document.getElementById('scroller-output');
	this.mainPercentOut = this.output.getElementsByClassName('mainPercent')[0];
	this.scenePercent = this.output.getElementsByClassName('scenePercent')[0];//set from scene
	this.kids = this.wrap.getElementsByClassName('scene');
	this.scenes = [];
	this.currentScene = 0;
	this.direction = 'down';
	this.lastScrollPercentage = 0;

	//just cuz
	this.mainPercentOut.innerHTML = 'Scroll Percentage: ' + 0 + ' %';
	this.scenePercent.innerHTML = 'Scene '+ 0 + ' - Animated: ' + 0 + ' %';
	
	//make scenes
	for(var i = 0; i<this.kids.length; i++){
		this.scenes.push( new Scene(this, this.kids[i],i)  );
	}

	this.accumulativePercentagesScrolled = 0;//this.scenes[this.currentScene].heightPercentage;
};
Scroller.prototype.resize = function(){
	for(var i = 0; i<this.scenes.length; i++){
		this.scenes[i].setHeightPercentage();
	}
};
Scroller.prototype.scroll = function(){
	this.scrollPercentage =  window.pageYOffset  / ( document.body.offsetHeight  - window.innerHeight);
	this.scrollPercentage = Math.round(this.scrollPercentage*100);
	this.mainPercentOut.innerHTML = 'Scroll Percentage: ' +this.scrollPercentage + ' %';
	
	
	//direction
	if(this.lastScrollPercentage > this.scrollPercentage ){
		this.direction = 'up';
	}
	if(this.lastScrollPercentage < this.scrollPercentage ){
		this.direction = 'down';
	}
	//set last scroll percentage
	this.lastScrollPercentage  = this.scrollPercentage;
	
	if(this.scrollPercentage <= 100 && this.scrollPercentage >= 0 ){
		this.updateScene();
		this.callback( this.scrollPercentage );
	}
};
Scroller.prototype.updateScene = function(){
	var aniTo = this.accumulativePercentagesScrolled < 100 ? this.scrollPercentage - this.accumulativePercentagesScrolled : 100;
	
	
	this.scenes[this.currentScene].animate( aniTo );
	//TODO if accumulativePercentagesScrolled == 100 animate 100 no 0
	
	
	if(this.direction == 'down'){
		//going down
	
		if( this.scrollPercentage >= this.scenes[this.currentScene].heightPercentage + this.accumulativePercentagesScrolled){
			//add current scene percentage to accumulativePercentagesScrolled
			this.accumulativePercentagesScrolled += this.scenes[this.currentScene].heightPercentage;
			
			//increment current Scene
			if(this.currentScene < this.scenes.length-1) this.currentScene ++;
		}
		
	}else{
		//going up
		if( this.scrollPercentage < this.accumulativePercentagesScrolled ){
			//last scene checked by accumulativePercentagesScrolled == 100
			if(this.accumulativePercentagesScrolled !== 100 && this.currentScene > 0 ) this.currentScene --;
			
			//remove current scene percentage to accumulativePercentagesScrolled
			this.accumulativePercentagesScrolled -= this.scenes[this.currentScene].heightPercentage;
			
		}
	}
};
