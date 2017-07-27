let getUser = (id, callback) => {
	const user = {
		id: id,
		name: 'Jordan'
	};
	setTimeout(() => {
		callback(user);
	}, 3000);
}



getUser(30, (user) => {
	console.log(user);
})