function typeOf(obj) {
	return Object.prototype.toString.call(obj);
}

console.log(typeOf([]));