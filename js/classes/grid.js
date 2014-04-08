/**
 * @Class Grid
 * @author jamie.gilmartin@ogilvy.com
 */
function Grid(){
	this.element = document.createElement('div');
	this.element.classList.add('grid')
	this.w = this.element.width = window.innerWidth;
	this.h = this.element.height = window.innerHeight;

	this.columns = 50;
	this.rows = 50;

	this.build();
};


Grid.prototype.build =  function(){
	//build grid
	this.square = {};
	//start surface 2d array
	this.surface = new Array(this.columns);
	//2d loop
	for(var j=0; j<this.columns;j++){
		//finish surface
		this.surface[j] = new Array(this.rows);
		
		for(var k=0;k<this.rows;k++){
			var dimensions = {
				w : Math.floor(this.w / this.columns), //Math.floor - helps with horizontalscroll
				h : Math.floor(this.w / this.columns), //grid.w cus they're squares
				x : j,
				y : k 
			};
			
			//set square
			this.square.w = dimensions.w;
			this.square.h =  dimensions.h;
			
			
			//console.log(this.square.w )
			
			
			var msg = dimensions.x+'|'+dimensions.y;//'';//
			//make item
			var item = new GridItem( this.grid, dimensions, msg );
			//add to surface
			this.surface[j][k] = item;
			
			
			//append to dom
			this.element.appendChild( item.element );
		}
	}
	
	//!!!!!!!!!!!!
	//!!!!!!!!!!!!
	//don't need to append to dom! just for testing

	this.floodFill(0,0);
};
/**
 * @deprecated || @justForFun 
 * preform floodFill, a base for checking
 */
Grid.prototype.floodFill =  function( x, y ){
	var self = this;
	
	console.log('fill')
	if(this.surface[x] === undefined || this.surface[x][y] === undefined) return;
	if(this.surface[x][y].isFull){
	
		//console.log(this.surface[x][y].msg);
		
		return {
			x:x,
			y:y
		};
	}else{
		this.surface[x][y].fill('#00ff00');

		var time = 30;
		function timed(){
			self.floodFill(x + 1, y ) // right
			self.floodFill(x - 1, y ) // left
			self.floodFill(x, y + 1 ) // down
			self.floodFill(x, y - 1 ) // up
		}
		setTimeout(timed, time -= 0.5 );//add sine wave or something, colors, blinks, fizzes ???
	}
	
};