/**
 * @Class Grid
 * @author jamie.gilmartin@ogilvy.com
 */
function Grid(){
	this.element = document.createElement('div');
	this.element.classList.add('grid')
	this.w = this.element.width = window.innerWidth;
	this.h = this.element.height = window.innerHeight;

	this.columns = 100;
	this.rows = 100;

	this.build();
};
//inherits GameObject
Grid.prototype = new GameObject();
Grid.prototype.constructor = Grid;

Grid.prototype.build =  function(){
	//build grid
	this.square = {};
	//start surface 2d array
	this.surface = new Array(this.columns);



	/*
	//https://medium.com/cool-code-pal/1f5fd88a219e
		var il = 20;
		var jl = 9;
		for (var i=0, j=0; i<il && j<jl; j++, i=(j==jl)?i+1:i,j=(j==jl)?j=0:j) {
			console.log(i, j);
		}

	*/

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

	//this.floodFill(0,0);
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

Grid.prototype.fillGridWidthImageData =  function( pixels ){

	var data = pixels.data;
	
	var imageWidth = Math.round(pixels.width / this.columns);
	var imageHeight = Math.round(pixels.height / this.rows);
	var scale = imageWidth;

	for(var x = 0; x < this.columns; x++){
		for(var y = 0; y < this.rows; y++){
			
			var xIndex = x * this.square.w;
			var yIndex = y * this.square.h;
			
			var index = ( xIndex+yIndex*pixels.width ) * 4;
			
			var red = data[ index ];
			var green = data[index + 1];
			var blue = data[index + 2];
			var alpha = data[index + 3];
			
			var color = 'rgba('+ red+','+ green+','+ blue+','+ (alpha / 255)+')';

			if(alpha>0) this.surface[x][y].fill( color );
			
			if(!this.surface[x][y].isFull){
				//console.log(this.surface[x][y])
			}
			/*
			if(alpha>0){
				var nAlpha = (alpha / 255);

				console.log(red,green,blue,alpha,' ',nAlpha)
				var colors =[
					'rgba('+ red+','+ green+','+ blue+','+ alpha +')',
					'rgba('+ red+','+ green+','+ blue+','+ alpha +')',
					'rgba('+ red+','+ green+','+ blue+','+ alpha +')',
					'rgba('+ red+','+ green+','+ blue+','+ alpha +')',
					'rgba('+ red+','+ green+','+ blue+','+ alpha +')'
				];
				//this.surface[x][y].turn( colors );
			}
			
			//twinkle red squares
			if(red > 170 && red < 210){
				var colors =[
					'rgba('+ 175+','+ green+','+ blue+','+ alpha+')',
					'rgba('+ 185+','+ green+','+ blue+','+ alpha+')',
					'rgba('+ 195+','+ green+','+ blue+','+ alpha+')',
					'rgba('+ 205+','+ green+','+ blue+','+ alpha+')',
					'rgba('+ 209+','+ green+','+ blue+','+ alpha+')'
				];
				this.surface[x][y].turn( colors );
			}else{
				var rand =  0;//utils.randIntRange(-10,10);
				
				var colors =[
					'rgba('+ red+','+ green+','+ blue+','+ (alpha+rand)+')',
					'rgba('+ red+','+ green+','+ blue+','+ (alpha+rand)+')',
					'rgba('+ red+','+ green+','+ blue+','+ (alpha+rand)+')',
					'rgba('+ red+','+ green+','+ blue+','+ (alpha+rand)+')',
					'rgba('+ red+','+ green+','+ blue+','+ (alpha+rand)+')'
				];
				this.surface[x][y].turn( colors );
			}
			*/
		}
	}
};

/**
 * @see http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
 */
Grid.prototype.ripple = function(){

};