/**
 * @Class Vector
 * @author jamie.gilmartin@ogilvy.com
 * @see https://github.com/airhorns/blog/blob/master/assets/coffeescripts/flocking/vector.coffee
 * @see http://natureofcode.com/book/chapter-1-vectors/
 */
function Vector(x, y, z){
	if (x == null) {
		x = 0;
	}
	if (y == null) {
		y = 0;
	}
	if (z == null) {
		z = 0;
	}
	this.x = x;
	this.y = y;
	this.z = z;
};

Vector.prototype.add = function(other){
	this.x += other.x;
	this.y += other.y;
	this.z += other.z;
	return this;
};

Vector.prototype.subtract = function(other){
	this.x -= other.x;
	this.y -= other.y;
	this.z -= other.z;
	return this;
};

Vector.prototype.multiply = function(n){
  this.x = this.x * n;
  this.y = this.y * n;
  this.z = this.z * n;
  return this;
};

Vector.prototype.divide = function(n){
  this.x = this.x / n;
  this.y = this.y / n;
  this.z = this.z / n;
  return this;
};



Vector.prototype.copy = function(){
	return new Vector(this.x, this.y, this.z);
};

Vector.prototype.magnitude = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
};

Vector.prototype.normalize = function(){
	var m;
	m = this.magnitude();
	if(m > 0) {
		this.divide(m);
	}
	return this;
};

Vector.prototype.limit = function(max){
	if(this.magnitude() > max) {
		this.normalize();
		return this.multiply(max);
	} else {
		return this;
	}
};

Vector.prototype.heading = function() {
	return -1 * Math.atan2(-1 * this.y, this.x);
};

Vector.prototype.euclidean_distance = function(other){
	var dx, dy, dz;

	dx = this.x - other.x;
	dy = this.y - other.y;
	dz = this.z - other.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

Vector.prototype.distance = function(other, dimensions) {
	var dx, dy, dz;
	if (dimensions == null) {
		dimensions = false;
	}
	dx = Math.abs(this.x - other.x);
	dy = Math.abs(this.y - other.y);
	dz = Math.abs(this.z - other.z);
	if (dimensions) {
		dx = dx < dimensions.width / 2 ? dx : dimensions.width - dx;
		dy = dy < dimensions.height / 2 ? dy : dimensions.height - dy;
	}
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

Vector.prototype.dot = function(){
	return this.x * other.x + this.y * other.y + this.z * other.z;
};

Vector.prototype.projectOnto = function(other){
	return other.copy().multiply(this.dot(other));
};

Vector.prototype.wrapRelativeTo = function(location, dimensions) {
	var a, d, key, map_d, v, _ref1;

	v = this.copy();
	_ref1 = {
		x: "width",
		y: "height"
	};
	for (a in _ref1) {
		key = _ref1[a];
		d = this[a] - location[a];
		map_d = dimensions[key];
		if (Math.abs(d) > map_d / 2) {
			if (d > 0) {
				v[a] = (map_d - this[a]) * -1;
			} else {
				v[a] = this[a] + map_d;
			}
		}
	}
	return v;
};

Vector.prototype.invalid = function() {
	return (this.x === Infinity) || isNaN(this.x) || this.y === Infinity || isNaN(this.y) || this.z === Infinity || isNaN(this.z);
};





/*
add() — add vectors

sub() — subtract vectors

mult() — scale the vector with multiplication

div() — scale the vector with division

mag() — calculate the magnitude of a vector

setMag() - set the magnitude of a vector

normalize() — normalize the vector to a unit length of 1

limit() — limit the magnitude of a vector

heading() — the 2D heading of a vector expressed as an angle

rotate() — rotate a 2D vector by an angle

lerp() — linear interpolate to another vector

dist() — the Euclidean distance between two vectors (considered as points)

angleBetween() — find the angle between two vectors

dot() — the dot product of two vectors

cross() — the cross product of two vectors (only relevant in three dimensions)

random2D() - make a random 2D vector

random3D() - make a random 3D vector
*/
