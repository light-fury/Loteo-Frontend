const fs = require('fs');
const path = require('path');
const os = require('os');

const getName = moduleName => {
    return moduleName
        .split(/[-_]/)
        .map((word, index) => index ? word.substring(0, 1).toUpperCase() + word.substring(1) : word)
        .join("");
};

module.exports = {

    description() {
        return 'Generates a module with all necessary files inside of src folder. Usage redux generate module moduleName';
    },

    beforeInstall(options) {
        if (options.entity.options._.length !== 2) {
            console.log('Missing module name parameter - Usage: redux generate module moduleName*');
            process.exit();
        }
    },

    afterInstall() {
        const sourceFolderPath = path.resolve(__dirname, '..', '..', 'src');

        // Load module folders to recreate reducers defition, exclude other folders
        let moduleFolders = fs.readdirSync(sourceFolderPath).filter(file => {
            return fs.statSync(path.join(sourceFolderPath, file)).isDirectory() && ['common', 'config', 'styles'].indexOf(file) === -1
        });
    }

};
