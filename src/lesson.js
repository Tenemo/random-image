/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';

const { exec } = require('child_process');

export function openPicture(config) {
    const randomPictureIndex = Math.floor(Math.random() * config.queue.length);
    const randomPicture = config.queue[randomPictureIndex];
    const picturePath = path.resolve(`${__dirname}/../${randomPicture}`);
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
    fs.writeFile(
        'config/lessonConfig.json',
        JSON.stringify(newConfig, null, 4),
        'utf8',
        error => {
            if (error) {
                console.log(error);
                process.exit(1);
            }
        },
    );
}

export function lesson(cb) {
    fs.readFile('config/lessonConfig.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        const lessonData = JSON.parse(data);
        if (lessonData.queue.length < 1) {
            console.log('Lesson ended! Type "restart" to start over.');
            cb();
        } else {
            openPicture(lessonData);
            const done = lessonData.done.length;
            const left = lessonData.queue.length;
            const total = done + left;
            console.log(
                `You have covered ${done} out of ${total} pictures total. ${
                    left === 10 && total > 50
                        ? 'You can do it! 10 left!'
                        : `${left} left.`
                }`,
            );
            console.log('Press Enter to open a picture (=^ω^=) \n');
            if (typeof cb === 'function') {
                cb();
            }
        }
    });
}
