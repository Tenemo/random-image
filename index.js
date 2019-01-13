/* eslint-disable no-console */
import glob from 'glob';
import path from 'path';
import fs from 'fs';
import readline from 'readline';

const { exec } = require('child_process');

function openPicture(config) {
    if (config.queue.length < 1) {
        console.log('Lesson ended!');
        process.exit(1);
    }
    const randomPictureIndex = Math.floor(Math.random() * config.queue.length);
    const randomPicture = config.queue[randomPictureIndex];
    const picturePath = path.resolve(`${__dirname}/${randomPicture}`);
    console.log(`Opening ${randomPicture}`);
    exec(`%SystemRoot%\\explorer.exe "${picturePath}"`);
    const newConfig = {
        queue: config.queue.slice(),
        done: config.done.slice(),
    };
    if (randomPictureIndex > -1) {
        newConfig.queue.splice(randomPictureIndex, 1);
        newConfig.done.push(randomPicture);
    }
    return newConfig;
}

function lesson(rl) {
    rl.question('Press Enter to open a picture (=^ω^=)', userInput => {
        if (userInput === 'exit') process.exit(1);
        fs.readFile('lessonConfig.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            const config = JSON.parse(data);
            const newConfig = openPicture(config);
            fs.writeFile(
                'lessonConfig.json',
                JSON.stringify(newConfig, null, 4),
                'utf8',
                () => {
                    lesson(rl);
                },
            );
        });
    });
}

function createConfig() {
    glob('pictures/**/*.*', {}, (err, files) => {
        if (err) {
            console.log(err);
        }
        const output = { queue: files, done: [] };
        fs.writeFile(
            'lessonConfig.json',
            JSON.stringify(output, null, 4),
            'utf8',
            () => {
                console.log();
                console.log('Created new learning session!');
                console.log();
                loadConfig();
            },
        );
    });
}

function loadConfig() {
    fs.readFile('lessonConfig.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                createConfig();
            } else {
                console.log(err);
            }
        } else {
            console.log();
            console.log('Learning session started!');
            console.log();
            const rl = readline.createInterface(process.stdin, process.stdout);
            lesson(rl);
        }
    });
}

console.clear();
loadConfig();
