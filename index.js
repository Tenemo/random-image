import glob from "glob";
import path from "path";
var exec = require("child_process").exec;

function randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

glob("pictures/**/*.*", {}, (err, files) => {
    const picturePath = path.resolve(
        __dirname + "/" + randomArrayElement(files)
    );
    exec('%SystemRoot%\\explorer.exe "' + picturePath + '"');
});
