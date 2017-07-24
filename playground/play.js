let arr = ['jordan', 'jay', 'thompson'];

let names = {
	name1: 'jordan',
	name2: 'jay',
	name3: 'thompson',
	[Symbol.iterator]: function* () {
		yield this.name2,
		yield this.name1,
		yield this.name3
	}
}

for (let x of names) {
	console.log(x);
}