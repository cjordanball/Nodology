const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const title = {
			describe: 'Title of note',
			demandOption: true,
			alias: 't'
		};

const body = {
			describe: 'This is the text of the note.',
			demandOption: false,
			alias: 'b',
			default: "Four score and seven years ago . . ."
		}

const argv = yargs

	.command('add', 'Add a new note.', {
		title,
		body
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title
	})
	.command('remove', 'Delete a note', {
		title
	})
	.help()
	.argv;



const command = argv._[0];

switch(command) {
	case 'add':
		let note = notes.addNote(argv.title, argv.body);
		if (note) {
			notes.logNote(note);
		} else {
			console.log('Please give the note a unique title.');
		}
		break;
	case 'list':
		let allNotes = notes.getAll();
		console.log(`Printing ${allNotes.length} notes:`)
		allNotes.forEach(val => notes.logNote(val));
		break;
	case 'read':
		let res = notes.getNote(argv.title);
		if (res) {
			notes.logNote(res);
		} else {
			console.log(`Unable to locate note with title of ${argv.title}.`)
		}
		break;
	case 'remove':
		let removeRes = notes.removeNote(argv.title);
		if (removeRes) {
			console.log('Note deleted');
		} else {
			console.log('There was a problem - no such note.');
		}
		break;
	default:
		console.log('command not recognized');

};
