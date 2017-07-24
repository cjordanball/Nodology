const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

console.log(yargs.argv);


const argv = yargs.argv;
const command = process.argv[2];

switch(command) {
	case 'add':
		let note = notes.addNote(argv.title, argv.body);
		if (note) {
			console.log(`Success! Title: ${note.title}, Body: ${note.body}`);
		} else {
			console.log('Please give the note a unique title.');
		}
		break;
	case 'list':
		console.log(notes.getAll());
		break;
	case 'read':
		let res = notes.getNote(argv.title);
		if (res) {
			console.log(`Title: ${res.title}, Body: ${res.body}`);
		} else {
			console.log(`Unable to locate note with title of ${argv.title}.`)
		}
		break;
	case 'remove':
		let removeRes = notes.removeNote(argv.title);
		if (res) {
			console.log('Note deleted');
		} else {
			console.log('There was a problem - no such note.');
		}
		break;
	default:
		console.log('command not recognized');

};
