let somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		//resolve('It works.');
		reject('Unable to complete!');
	}, 2500);
});

somePromise
	.then((message) => {
	console.log('Success: ', message);
	})
	.catch((err) => {
	console.log('Error: ', err);
	});