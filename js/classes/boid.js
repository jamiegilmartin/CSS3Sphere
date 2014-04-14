/**
 * @Class Boid
 * @author jamie.gilmartin@ogilvy.com
 * @see http://processing.org/examples/flocking.html
 * @see https://github.com/airhorns/blog/blob/master/assets/coffeescripts/flocking/boid.coffee
 */
function Boid(constructor,x,y,z){
	this.c = constructor.c;//canvas ele
	this.w = constructor.w;
	this.h = constructor.h;

	//colors
	this.stroke = 'rgba(255,200,255,1)';
	this.fill = 'rgba(255,0,255,1)';

	//sound
	this.soundDuration  = 500;


	this.audio = document.createElement('audio');
	document.body.appendChild(this.audio);


	this.location = new Vector(x,y,z);

	var angle = Math.random() * (2*Math.PI);
	this.velocity = new Vector(Math.cos(angle),Math.sin(angle),0);
	/*
	var v1 = utils.randFloatRange(-1,1),
		v2 = utils.randFloatRange(-2,0);
	this.velocity = new Vector(v1,v2,0);
	*/

	this.acceleration = new Vector(0,0,0);
	this.r = 8.0;
	this.maxSpeed = 12;
	this.maxForce = 0.03;

	this.wrapFactor =1;
	this.desiredSeparation = 5;
	this.neighbourRadius = 50;

	var twor;
	twor = this.r * 2 * this.wrapFactor;
	this.wrapDimensions = {
		north: -twor,
		south: this.h + twor,
		west: -twor,
		east: this.w + twor,
		width: this.w + 2 * twor,
		height: this.h + 2 * twor
	};
	this.desiredSeparation = this.desiredSeparation * this.r;
};
//inherits GameObject
Boid.prototype = new GameObject();
Boid.prototype.constructor = Boid;

//run - overrides super
Boid.prototype.run = function( boids ){
	this.flock(boids);
	this.update();
	this.borders();
	this.draw();
};
Boid.prototype.applyForce = function(force){
	//could add mass here si tu veux  A = F / M
	this.acceleration.add(force);
};

//one loop to handle all forces
Boid.prototype.flock = function( boids ){
	var separation_mean = new Vector(0,0,0),
		alignment_mean = new Vector(0,0,0),
		cohesion_mean = new Vector(0,0,0),
		separation_count = 0;
		alignment_count = 0;
		cohesion_count = 0;
	for(var i=0;i<boids.length;i++){
		var other = boids[i];
		if(other === this){
			continue;
		}
		d = this.location.euclidean_distance(other.location);
		if(d>0){
			if(d <  this.desiredSeparation){
				var lc = this.location.copy();
				var diff = lc.subtract(other.location);
				diff.divide(d); //weight by distance 
				separation_mean.add(diff);
				separation_count++;
			}
			if(d < this.neighbourRadius){
				alignment_mean.add(other.velocity);
				alignment_count ++;

				cohesion_mean.add(other.location.wrapRelativeTo(this.location,this.wrapDimensions));
				cohesion_count ++
			}
		}
	}

	if (separation_count > 0) {
		separation_mean.divide(separation_count);
	}
	if (alignment_count > 0) {
		alignment_mean.divide(alignment_count);
	}
	if (cohesion_count > 0) {
		cohesion_mean.divide(cohesion_count);
	} else {
		cohesion_mean = this.location.copy();
	}

	var separation = separation_mean; //separation
	var align = alignment_mean; //alignment
	var cohesion = this.seek(cohesion_mean); //cohesion

	//add arbitray weight to these forces
	separation.multiply(1.5);
	align.multiply(1.0);
	cohesion.multiply(1.0);

	//add the force vectors to acceleration
	this.applyForce( separation );
	this.applyForce( align );
	this.applyForce( cohesion );

};

//calculates steering force towards a target
//STEER = desired - velocity
Boid.prototype.seek = function(target){
	var tc = target.copy();
	var desired = tc.subtract(this.location);// a vector pointing from location to the target
	//scale to max speed
	desired.normalize();
	desired.multiply(this.maxSpeed);

	var steer = desired.subtract(this.velocity);
	steer.limit(this.maxForce);
	return steer;
};

Boid.prototype.borders = function(){
	if (this.location.x < this.wrapDimensions.west) {
		this.location.x = this.wrapDimensions.east;
	}
	if (this.location.y < this.wrapDimensions.north) {
		this.location.y = this.wrapDimensions.south;
	}
	if (this.location.x > this.wrapDimensions.east) {
		this.location.x = this.wrapDimensions.west;
	}
	if (this.location.y > this.wrapDimensions.south) {
		return this.location.y = this.wrapDimensions.north;
	}
};
Boid.prototype.update = function(){
	//update velocity
	this.velocity.add(this.acceleration);
	//limit speed 
	this.velocity.limit(this.maxSpeed);
	this.location.add(this.velocity);

	//reset acceleration
	this.acceleration.multiply(0);
};
Boid.prototype.draw = function(target){
	//draw triangle rotated in direction of velocity //TODO
	var theta = this.velocity.heading() + (90*(Math.PI/180)); //????

	this.c.save();
	this.c.translate(this.location.x, this.location.y);
	this.c.rotate(theta);

	this.c.beginPath();
	this.c.strokeStyle = this.stroke;
	this.c.fillStyle =  this.fill;

	this.c.moveTo(0,0);
	this.c.lineTo(-this.r, this.r*2);
	this.c.lineTo(this.r, this.r*2);
	this.c.lineTo(0, 0);
    this.c.fill();
	
	//this.c.fillRect(this.location.x,this.location.y,15,15);
	//this.c.fillRect(0, -this.r*2,5,5);	

	this.c.stroke();
	this.c.closePath();

	this.c.restore();

	/*
	ctx.font="30px Verdana";
// Create gradient
var gradient=ctx.createLinearGradient(0,0,c.width,0);
gradient.addColorStop("0","magenta");
gradient.addColorStop("0.5","blue");
gradient.addColorStop("1.0","red");
// Fill with gradient
ctx.fillStyle=gradient;
ctx.fillText("Big smile!",10,90);
	*/
};
Boid.prototype.changeColor = function(){
	this.stroke =  this.stoke === 'rgba(0,0,0,0.7)' ? 'rgba(255,200,255,1)' :  'rgba(0,0,0,0.7)' ;//utils.getRandomRGB();
	this.fill = this.fill=== '#56acdd' ?  'rgba(255,0,255,1)' : '#56acdd';//utils.getRandomRGBA();
};


//kills browser
//@see http://patorjk.com/blog/2012/07/22/tone-playing-experiment-with-html5s-web-audio-api/
Boid.prototype.sound = function(){
	var self = this;
	//set up ocillator
	this.tone = new webkitAudioContext();
	this.oscillator = this.tone.createOscillator();
	this.oscillator.type = 0; // sine wave
	this.oscillator.frequency.value = utils.randIntRange(2000,10000);
	this.oscillator.connect(this.tone.destination);

	//ocillator
	this.oscillator.noteOn && this.oscillator.noteOn(0);
	this.oscillator.disconnect();

};


Boid.prototype.playAudio = function(){
	this.audio.src = utils.getRandomNote();
	this.audio.play();
};















/*
Boid.prototype.flockX = function( boids ){
	var separation = this.separate(boids); //separation
	var align = this.align(boids); //separation
	var cohesion = this.cohesion(boids); //separation

	//add arbitray weight to these forces
	separation.multiply(1.5);
	align.multiply(1.0);
	cohesion.multiply(1.0);

	//add the force vectors to acceleration
	this.applyForce( separation );
	this.applyForce( align );
	this.applyForce( cohesion );
};
// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function( boids ){
	var steer = new Vector(0,0,0);
	var count = 0;
	// For every boid in the system, check if it's too close
	for(var i=0;i<boids.length; i++){
		var lc = this.location.copy();
		var d = lc.subtract(boids[i].location);
		//if dist > 0 && < desiredSeparation (0 === yourself)
		if( (d>0) && (d < this.desiredSeparation) ){
			//calculate vector pointing away from neighbor
			var lcc = this.location.copy();
			var diff = lcc.subtract(boids[i].location);
			diff.normalize();
			diff.divide(d); //Weight by distance
			steer.add(diff);
			count++; //keep track of how many

		}
	}
	//average -- divide by how many
	if( count > 0 ){
		steer.divide(count);
	}
	//as long as vector > 0
	if( steer.magnitude() > 0 ){
		steer.normalize();
		steer.multiply(this.maxSpeed);
		steer.subtract(this.velocity);
		steer.limit(maxForce);
	}
	return steer;
};
// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function( boids ){
	var sum = new Vector(0,0,0);
	var count = 0;
	for(var i=0;i<boids.length;i++){
		var lc = this.location.copy();
		var d = lc.distance(boids[i].location);
		if( (d > 0) && (d < this.neighbourRadius) ){
			sum.add(boids[i].velocity); //add velocity
			count++;
		}
	}
	if( count > 0 ){
		sum.divide(count);

		//implement Reynolds: steering = desired - velocity
		sum.normalize();
		sum.multiply(this.maxSpeed);
		var sc = sum.copy();
		var steer = sc.subtract(this.velocity);
		steer.limit(this.maxForce);
		return steer;
	}else{
		return new Vector(0,0,0);
	}
};
// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function( boids ){
	var neighborDist = 50;
	var sum = new Vector(0,0,0);
	var count = 0;
	for(var i=0;i<boids.length;i++){
		var lc = this.location.copy();
		var d = lc.distance(boids[i].location);
		if( (d > 0) && (d < this.neighbourRadius) ){
			sum.add(boids[i].location); //add location
			count++;
		}
	}
	if( count > 0 ){
		sum.divide(count);
		return this.seek(sum);
	}else{
		return new Vector(0,0,0);
	}	
};
*/


