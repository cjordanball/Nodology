console.log('Starting notes.js');
const fs = require('fs');

const fetchNotes = () => {
	try {
		let noteString = fs.readFileSync('./notes.json', 'utf-8');
		notes = JSON.parse(noteString);
		return notes;
	} catch(err) {
		return [];
	}
};

const saveNotes = (notes) => {
	fs.writeFileSync('./notes.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
	let notes = fetchNotes();
	let note = {
		title,
		body
	}

	let isUniq = !(notes.some(val => val.title === title));

	if (isUniq) {
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

let logNote = (note) => {
	debugger;
	//break on this line and use repl to output the note.
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}



module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
}
