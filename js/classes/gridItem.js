/**
 * @Class Grid
 * @author jamie.gilmartin@ogilvy.com
 */
function GridItem(grid, dimensions, msg){
	this.w = dimensions.w;
	this.h = dimensions.h;
	this.x = dimensions.x;//TODO vectors
	this.y = dimensions.y;
	this.msg = msg;
	
	this.isFull = false;
	
	this.make();
};
GridItem.prototype.make = function(){
	this.element = document.createElement('div');
	this.element.classList.add('item');

	this.element.style.width = this.w + 'px';
	this.element.style.height =  this.h + 'px';
	
	this.element.style.left = this.w * this.x + 'px';
	this.element.style.top = this.h * this.y + 'px';
	
	//this.element.innerHTML = this.msg;
};
GridItem.prototype.fill = function(color){
	if(!this.isFull){
		//this.ele.classList.add('full');
		
		if(color){
			this.element.style.backgroundColor = color;
		}else{
			this.element.style.backgroundColor = '#ccc';
		}
		this.isFull = true;
	}
};
GridItem.prototype.turn = function( colors ){
	var self = this;
	var turnDelay = utils.randIntRange(1,36) * 100;
	
	function getColor(){
		var index = utils.randIntRange(0,colors.length-1);
		return colors[index];
	}
	
	function turn(){
		self.element.style.backgroundColor = getColor();
		setTimeout(turn,turnDelay);
	}
	setTimeout(turn,turnDelay);
	
};