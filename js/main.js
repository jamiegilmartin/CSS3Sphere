'use strict'; 

var Sphere = window.Sphere || {}; 
/**
 * @author <a href="mailto:jamie.gilmartin@ogilvy.com">Jamie Gilmartin</a>
 * @see http://www.clicktorelease.com/blog/how-to-make-clouds-with-css-3d
 */
Sphere = {
	init : function(){
		var self = this,
			now = Date.now(); //new Date().getTime();
			
		this.startTime = now;
		this.then = now;
		
		this.secondsRunning = 0;
		this.duration = 10;
		this.fps = 24;
		this.fpsInterval = 1000 / this.fps;
		this.delta;
		this.frame = 0;


		this.myTransform = utils.supportsTransitions();

		//init world
		this.world = new World();

		//run
		this.playing = true;
		this.interval = 0;
		this.runBtn = document.getElementById('runBtn');

		this.output = document.getElementById('timer-output');

		this.events();

		//this.scrollPercentage =  window.pageYOffset  / ( document.body.offsetHeight  - window.innerHeight);
		this.scroller = new Scroller(function(percentage){
			//console.log('scroller', percentage )
			//self.viewport.style.top = percentage + '%';//window.pageYOffset + 'px'
		});

		this.loop();
	},
	events : function(){
		var self = this;
		this.runBtn.addEventListener('click',function(){
			self.playing = self.playing ? false : true;
			self.runBtn.innerHTML = self.runBtn.innerHTML === 'stop' ? 'run' : 'stop';
			if(self.playing) self.loop();
		},false);
		window.addEventListener('resize',function(){
			self.scroller.resize();
		},false);
		window.addEventListener('scroll',function(){
			self.scroller.scroll();
		},false);
	},
	loop : function( lastTime ){
		var self = this,
			now = Date.now(), //new Date().getTime();
			deltaTime = now - ( lastTime || now);

		this.delta = now - this.then;
		
		//http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
		//http://creativejs.com/resources/requestanimationframe/
		if( this.delta > this.fpsInterval){
			this.then = now - (this.delta % this.fpsInterval);
			
			this.run();
			this.frame ++;
			
			this.output.innerHTML = this.frame + ' /' + Math.floor((this.then - this.startTime)/1000)+'s === ' + parseInt(this.frame/((this.then - this.startTime)/1000))+'fps';
		}
		
		//time in seconds
		this.secondsRunning = (now - this.startTime) / 1000;
		
		this.interval++;

	    requestAnimationFrame(function(){
	    	if(self.playing) self.loop();
	    });
	},
	run : function(){
		this.world.run();
	}
};

window.addEventListener('load',function(e){
	
	Sphere.init();

},false);