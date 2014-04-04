
/**
 * @Class Scene
 */
function Scene( constructor, ele , index ){
	this.constructor = constructor;
	this.ele = ele;
	this.output = this.ele.getElementsByClassName('output')[0];
	this.nameOut = this.output.getElementsByClassName('name')[0];
	this.heightOut = this.output.getElementsByClassName('height')[0];
	this.aniOut = this.output.getElementsByClassName('animation')[0];
	
	this.sceneNumber = index;
	
	this.nameOut.innerHTML = 'scene '+ this.sceneNumber  + '';
	
	this.setHeightPercentage();
};
Scene.prototype.setHeightPercentage = function(){
	this.heightPercentage = ( (this.ele.offsetHeight*100) / document.body.offsetHeight );
	this.heightPercentage = Math.round(this.heightPercentage);
	this.heightOut.innerHTML = 'height '+ this.ele.offsetHeight +'px / '+ this.heightPercentage+ '%';
};
Scene.prototype.animate = function( percentage ){
	this.aniPercentage = Math.round( (percentage * 100 ) / this.heightPercentage );
	//clamp
	this.aniPercentage = Math.min(Math.max(this.aniPercentage, 0), 100);
	
	this.aniOut.innerHTML = 'Animation: ' +this.aniPercentage + ' %';
	
	this.constructor.scenePercent.innerHTML =  'Scene '+ this.sceneNumber  + ' - Animated: ' +this.aniPercentage + ' %';
};

