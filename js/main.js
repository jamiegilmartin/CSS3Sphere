'use strict'; 

var Sphere = window.Sphere || {}; 
/**
 * @author <a href="mailto:jamie.gilmartin@ogilvy.com">Jamie Gilmartin</a>
 * @see http://www.clicktorelease.com/blog/how-to-make-clouds-with-css-3d
 */
Sphere = {
	init : function(){
		var self = this;
		this.myTransform = utils.supportsTransitions();

		//init world
		this.world = new World();

		//run
		this.playing = true;
		this.runBtn = document.getElementById('runBtn');


		this.events();

		//this.scrollPercentage =  window.pageYOffset  / ( document.body.offsetHeight  - window.innerHeight);
		this.scroller = new Scroller(function(percentage){
			//console.log( percentage )
			//self.viewport.style.top = percentage + '%';//window.pageYOffset + 'px'
		});

		this.loop();
	},
	events : function(){
		var self = this;
		this.runBtn.addEventListener('click',function(){
			self.playing = self.playing ? false : true;
			self.runBtn.innerHTML = self.runBtn.innerHTML === 'stop' ? 'run' : 'stop';
		},false);
		window.addEventListener('resize',function(){
			self.scroller.resize();
		},false);
		window.addEventListener('scroll',function(){
			self.scroller.scroll();
		},false);
	},
	loop : function(){
		var self=this;
		this.world.run();


	    requestAnimationFrame(function(){
	    	if(self.playing) self.loop();
	    });
	}
};

window.addEventListener('load',function(e){
	
	Sphere.init();

},false);