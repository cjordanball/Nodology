let square = x => x * x;

console.log(square(9));

this.name = 'Jimbo';

let user = {
	name: 'Jordan',

	sayHi: () => {
		console.log(arguments)
		console.log('this', this);
		console.log(`Hi, ${this.name}!`);
	}
}

user.sayHi();