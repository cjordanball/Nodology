y = console.time('myLoop');

let counter = 0;

while (counter < 100000) {
	let i = counter;

	counter += 1;
}

const x = console.timeEnd('myLoop');

console.log('y: ', y);
