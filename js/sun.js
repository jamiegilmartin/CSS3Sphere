/**
 * @Class Sun
 * @author jamie.gilmartin@ogilvy.com
 */
function Sun(world){
	this.world = world;
	this.element = document.createElement('div');
	this.element.classList.add('sun');
	this.image = new Image();
	this.image.src = './images/sun.png';
	this.element.appendChild(this.image);

	this.w = 741;
	this.h = 625;
	this.element.style.width = this.w +'px';
	this.element.style.height = this.h + 'px';

	this.originalLocation = this.location = new Vector((this.world.c.x - (this.w*.5)),(this.world.c.y - (this.h*.5)), 0 );
	this.rotateZ = 0;


};
//inherits GameObject
Sun.prototype = new GameObject();
Sun.prototype.constructor = Sun;

/**
 * update
 */
Sun.prototype.update = function(){
	this.rotateZ += 0.1;
};

/**
 * draw
 */
Sun.prototype.draw = function(){
	var t = 'translateX( ' + this.location.x + 'px ) \
        translateY( ' +  this.location.y + 'px ) \
        translateZ( ' +  this.location.z + 'px ) \
        rotateZ( ' + this.rotateZ  + 'deg )';
    this.element.style[Sphere.myTransform] = t;
};