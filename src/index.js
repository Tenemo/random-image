/* eslint-disable no-console */
import glob from 'glob';
import fs from 'fs';
import readline from 'readline';

import { extensions } from 'config/appConfig';
import { lesson } from './lesson';
import { cat, credits } from './stuff';

export function checkIfLessonExists(cb) {
    fs.readFile('config/lessonConfig.json', 'utf8', err => {
        if (err) {
            if (err.code === 'ENOENT') {
                return cb(false);
            }
            console.log(err);
            process.exit(1);
        }
        return cb(true);
    });
}

export function createLesson(cb) {
    extensions.forEach(extension => extensions.push(extension.toUpperCase()));
    glob(`pictures/**/*.+(${extensions.join('|')})`, {}, (err, files) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const output = { queue: files, done: [] };
        fs.writeFile(
            'config/lessonConfig.json',
            JSON.stringify(output, null, 4),
            'utf8',
            error => {
                if (error) {
                    console.log(error);
                    process.exit(1);
                }
                if (files.length > 100) {
                    console.log(
                        `OwO ${
                            files.length
                        } pictures added to the new lesson queue! Good luck!`,
                    );
                } else {
                    console.log(
                        `${
                            files.length
                        } pictures added to the new lesson queue. Good luck!`,
                    );
                }
                if (typeof cb === 'function') {
                    cb();
                }
            },
        );
    });
}

function initializeSession() {
    const rl = readline.createInterface(process.stdin, process.stdout);
    console.log('Type "exit" to finish, saving your progress.');
    console.log('Type "restart" to restart your progress.');
    console.log('Press Enter to open a picture (=^ω^=) \n');
    rl.prompt();
    rl.on('line', line => {
        switch (line.trim().toLowerCase()) {
            case '':
                lesson(rl.prompt.bind(rl));
                break;
            case 'quit':
            case 'exit':
                process.exit(0);
                break;
            case 'restart':
                createLesson(rl.prompt.bind(rl));
                break;
            case 'cat':
                cat();
                rl.prompt();
                break;
            case 'credits':
                credits();
                rl.prompt();
                break;
            default:
                rl.prompt();
                break;
        }
    }).on('close', () => {
        process.exit(0);
    });
}

console.clear();
checkIfLessonExists(lessonExists => {
    if (lessonExists) {
        console.log('Starting learning session!');
        initializeSession();
    } else {
        createLesson(() => {
            initializeSession();
        });
    }
});
