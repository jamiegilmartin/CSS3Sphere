'use strict';
/**
 * @Class GameObject
 * @author jamie.gilmartin@ogilvy.com
 */
function GameObject(){
	//console.log('new Game Obj');
	
};
/**
 * run
 */
GameObject.prototype.run = function(){
	this.update();
	this.draw();
};
/**
 * update
 */
GameObject.prototype.update = function(){
	//in sub class
};

/**
 * draw
 */
GameObject.prototype.draw = function(){
	//in sub class
};