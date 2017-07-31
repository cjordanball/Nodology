let asyncAdd = (a, b) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			if (typeof a === 'number' && typeof b === 'number'){
				res(a + b);
			} else {
				rej('Must enter numbers');
			}
		}, 1500);
	});
};

asyncAdd(5, 'string').then((data) => {
	console.log('Answer: ', data);
}, (err) => {
	console.log('err: ', err);
})

//let somePromise = new Promise((resolve, reject) => {
//	setTimeout(() => {
//		resolve('It works.');
//		//reject('Unable to complete!');
//	}, 2500);
//});
//
//somePromise
//	.then((message) => {
//	console.log('Success: ', message);
//	})
//	.catch((err) => {
//	console.log('Error: ', err);
//	});

