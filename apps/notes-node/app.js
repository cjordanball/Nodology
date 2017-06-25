console.log('Starting app.js');

const fs = module.require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = process.argv[2];

switch(command) {
	case 'add':
		notes.addNote(argv.title, argv.body);
		break;
	case 'list':
		console.log(notes.getAll());
		break;
	case 'read':
		console.log(notes.getNote(argv.title));
		break;
	case 'remove':
		notes.removeNote(argv.title);
		break;
	default:
		console.log('command not recognized');

};
