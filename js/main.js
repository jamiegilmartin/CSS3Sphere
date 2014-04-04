'use strict'; 

var Sphere = window.Sphere || {}; 
/**
 * @author <a href="mailto:jamie.gilmartin@ogilvy.com">Jamie Gilmartin</a>
 * @see http://www.clicktorelease.com/blog/how-to-make-clouds-with-css-3d
 */
Sphere = {
	init : function(){
		var self = this;
		//init world
		this.w = new World();
		return;

		this.myTransform = this.utils.supportsTransitions();

		//dom ele
		//this.viewport = document.getElementById( 'viewport' );
		//this.world = document.getElementById( 'world' );
		//this.worldAngle = $V([0,0]);
		//this.d =  -1000; //∆
		//this.perspective = 400;
//
		//this.viewport.style.perspective = this.perspective;
		//this.viewport.style.WebkitPerspective = this.perspective;
//
		//this.numberOfClouds = 5;
//
		////array of cloud bases
		//this.objects = [];
		////array of cloud layers
		//this.layers = [];

		//this.events();
		//this.generate();
		//this.update();

		//this.scrollPercentage =  window.pageYOffset  / ( document.body.offsetHeight  - window.innerHeight);
		this.scroller = new Scroller(function(percentage){
			//console.log( percentage )
			//self.viewport.style.top = percentage + '%';//window.pageYOffset + 'px'
		});


	},
	events : function(){
		var self = this;

		window.addEventListener( 'mousemove', function( e ) {
		    var y = -( .5 - ( e.clientX / window.innerWidth ) ) * 180,
		 	   	x = ( .5 - ( e.clientY / window.innerHeight ) ) * 180;
		 	self.worldAngle.i = x;
		 	self.worldAngle.j = y;

		 	//console.log(x,y)
		 	//self.perspective = ( .5 - ( e.clientY / window.innerHeight ) ) * 400;
			//self.viewport.style.perspective = self.perspective;
			//self.viewport.style.WebkitPerspective = self.perspective;
		 	//console.log(x,y);
		    self.updateView();
		});

		window.addEventListener('resize',function(){
			self.scroller.resize();
		},false);
		window.addEventListener('scroll',function(){
			self.scroller.scroll();
		},false);
	},
	updateView : function(){
		this.world.style[this.myTransform] = 'translateZ(' + this.d + 'px ) \
			rotateX( ' + this.worldAngle.i + 'deg) \
      		rotateY( ' + this.worldAngle.j  + 'deg)';
      	//console.log(this.worldAngle)
	},
	/*
    Clears the DOM of previous clouds bases 
    and generates a new set of cloud bases
	*/
	generate : function(){
	    this.objects = [];
	    this.layers = [];
	    if ( this.world.hasChildNodes() ) {
	        while ( this.world.childNodes.length >= 1 ) {
	            this.world.removeChild( world.firstChild );       
	        } 
	    }
	    for( var j = 0; j < this.numberOfClouds; j++ ) {
	        this.objects.push( this.createCloud() );
	    }
	},
	/*
    Creates a single cloud base: a div in world
    that is translated randomly into world space.
    Each axis goes from -256 to 256 pixels.
	*/
	createCloud : function(){
	    var div = document.createElement( 'div'  );
	    div.className = 'cloudBase';
	    var t = 'translateX( ' + Sphere.utils.randIntRange(100,-100) + 'px ) \
	        translateY( ' +  Sphere.utils.randIntRange(100,-100)  + 'px ) \
	        translateZ( ' +  Sphere.utils.randIntRange(1500,-1500)  + 'px )';
	    div.style[this.myTransform] = t;
	    self.world.appendChild( div );

	    for( var j = 0; j < 5 + Math.round( Math.random() * 10 ); j++ ) {
	        var cloud = document.createElement( 'div' );
	        cloud.className = 'cloudLayer';
	        
	        cloud.data = { 
	            x: Sphere.utils.randIntRange(100,-100),
	            y: Sphere.utils.randIntRange(100,-100),
	            z: Sphere.utils.randIntRange(-300,-1000),
	            a: Sphere.utils.randIntRange(0,360),
	            s: Sphere.utils.randIntRange(0.5,2),
	            speed:.1*Math.random()
	        };
	        var t = 'translateX( ' + cloud.data.x + 'px ) \
	            translateY( ' + cloud.data.y + 'px ) \
	            translateZ( ' + cloud.data.z + 'px ) \
	            rotateZ( ' + cloud.data.a + 'deg ) \
	            scale( ' + cloud.data.s + ' )';
	        cloud.style[this.myTransform] = t;

	        div.appendChild( cloud );
	        this.layers.push( cloud );
	    }
	    
	    return div;
	},
	update : function(){
		var self=this;
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
	        layer.style[this.myTransform] = t;
	    }
	    requestAnimationFrame(function(){
	    	self.update();
	    });
	}
};

window.addEventListener('load',function(e){
	
	Sphere.init();

},false);