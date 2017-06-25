console.log('Starting notes.js');

const fs = require('fs');

let addNote = (title, body) => {
	let note = {
		title,
		body
	}
	let notes = [];
	try {
		noteString = fs.readFileSync('./notes.txt', 'utf-8');
		notes = JSON.parse(noteString);
	} catch(err) {
		// no need to do anything, as notes is already defined as an empty array
	}
	let uniq = !(notes.some(val => val.title === title));

	if (uniq) {
		notes.push(note);
		fs.writeFileSync('./notes.txt', JSON.stringify(notes));
		console.log('Added note: ', title, body);
		return true;
	}
	console.log('Unable to add note - need a unique title!');


};

let getAll = () => {
	let notes = fs.readFileSync('./notes.txt');
	if (notes.length) {
		let noteArr = JSON.parse(notes);
		return noteArr;
	} else {
		console.log('No notes');
		return null;
	}
};

let getNote = (title) => {
	let noteArr = getAll();
	let hotNotes = noteArr.filter(val => {
		return val.title === title;
	});
	return hotNotes;
}

let removeNote = (title) => {
	let noteArr = getAll();
	let hotIndex = noteArr.findIndex(val => val.title === title);
	noteArr.splice(hotIndex, 1);
	let noteString = JSON.stringify(noteArr);
	fs.writeFileSync('./notes.txt', noteString);
	console.log('Deleted: ', title);
}


module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
}
