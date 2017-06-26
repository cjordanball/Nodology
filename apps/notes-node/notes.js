console.log('Starting notes.js');

const fs = require('fs');

const fetchNotes = () => {
	try {
		let noteString = fs.readFileSync('./notes.txt', 'utf-8');
		notes = JSON.parse(noteString);
		return notes;
	} catch(err) {
		return [];
	}
};

const saveNotes = (notes) => {
	fs.writeFileSync('./notes.txt', JSON.stringify(notes));
};

const addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
		title,
		body
	}

	let uniq = !(notes.some(val => val.title === title));

	if (uniq) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

let getAll = () => {
	return fetchNotes();
};

let getNote = (title) => {
	let notes = fetchNotes();
	let hotIndex = notes.findIndex(val => val.title === title);
	if (hotIndex > -1) {
		return notes[hotIndex];
	}
	return false;
}

let removeNote = (title) => {
	let notes = fetchNotes();
	let hotIndex = notes.findIndex(val => val.title === title);
	if (hotIndex > -1) {
		notes.splice(hotIndex, 1);
		saveNotes(notes);
		return true;
	}
	return false;
}


module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
}
