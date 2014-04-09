/**
 * @Class Cloud
 * @author jamie.gilmartin@ogilvy.com
 */
function Cloud(x,y,z){
	this.element = document.createElement('div');
	this.element.classList.add('cloudBase');

	this.location = new Vector( x,y,z );

	//place cloud
	var t = 'translateX( ' + this.location.x + 'px ) \
        translateY( ' +  this.location.y + 'px ) \
        translateZ( ' +  this.location.z + 'px )';
    this.element.style[Sphere.myTransform] = t;


	this.numberOfLayers = 5 + Math.round( Math.random() * 10 );
	this.layers = [];
	this.makeLayers();

	this.rotateZ = 0;

};
//inherits GameObject
Cloud.prototype = new GameObject();
Cloud.prototype.constructor = Cloud;

Cloud.prototype.makeLayers = function(){
	for( var j = 0; j < this.numberOfLayers; j++ ) {
        var cloud = document.createElement( 'div' );
        cloud.className = 'cloudLayer';
        
        cloud.data = { 
            x: utils.randIntRange(100,-100),
            y: utils.randIntRange(100,-100),
            z: utils.randIntRange(100,-100),
            a: utils.randIntRange(0,360),
            s: utils.randIntRange(0.5,2),
            speed:.1*Math.random()
        };
        var t = 'translateX( ' + cloud.data.x + 'px ) \
            translateY( ' + cloud.data.y + 'px ) \
            translateZ( ' + cloud.data.z + 'px ) \
            rotateZ( ' + cloud.data.a + 'deg ) \
            scale( ' + cloud.data.s + ' )';
        cloud.style[Sphere.myTransform] = t;
        
        this.element.appendChild( cloud );
        this.layers.push( cloud );
    }
};
/**
 * update
 */
Cloud.prototype.update = function(){
	this.rotateZ += 0.1;
};

/**
 * draw
 */
Cloud.prototype.draw = function(){
	

	for( var j = 0; j < this.layers.length; j++ ) {
        var layer = this.layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) \
            translateY( ' + layer.data.y + 'px ) \
            translateZ( ' + layer.data.z + 'px ) \
            rotateY( ' + ( -  this.worldAngle.j ) + 'deg ) \
            rotateX( ' + ( -  this.worldAngle.i ) + 'deg ) \
            rotateZ( '+layer.data.a+'deg ) \
            scale( ' + layer.data.s + ')';
        layer.style[Sphere.myTransform] = t;
    }


};