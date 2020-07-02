const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = {

    description() {
        return 'Generates context for given module. Usage: redux generate context [moduleName] [contextName]';
    },

    beforeInstall(options) {
        if (options.entity.options._.length < 3) {
            console.log('Missing one of mandatory paramenters - Usage: redux generate context [moduleName] [contextName]');
            process.exit();
        }
    },

    locals: function (options) {
        // Load prop definition from command line parameters
        let propsDef = options.entity.options._.filter((param) => {
            return param.indexOf(':') !== -1
        });

        let props = [];
        propsDef.forEach((propDef) => {
            let prop = propDef.split(":");
            props.push({
                name: prop[0],
                type: prop[1]
            });
        });

        let propsString = '';
        props.forEach((prop) => {
            propsString += os.EOL + '\t' + prop.name + ': ' + prop.type + ','
        });

        if (props.length > 0) {
            propsString = propsString.slice(0, -1);
        }

        const name = options.entity.options._[2]
            .split(/[-_]/)
            .map((word, index) => index ? word.substring(0, 1).toUpperCase() + word.substring(1) : word)
            .join("");
        return {
            name: name.substring(0, 1).toLowerCase() + name.substring(1),
            moduleName: options.entity.options._[1],
            contextName: name.substring(0, 1).toUpperCase() + name.substring(1),
            propsString: propsString
        };
    },

    fileMapTokens() {
        return {
            __module__: function(options) {
                return options.locals.moduleName;
            },
            __name__: function(options) {
                return options.locals.name;
            },
            __context__: function (options) {
                return options.locals.contextName;
            },
            __test__: function(options) {
                return "test";
            }
        }
    },

    appendComponent(options) {
        const locals = this.locals(options);
        const srcIndexPath = path.resolve(__dirname, '..', '..', 'src', options.entity.name, 'contexts', 'index.ts');
        const exportString = `export {default as ${locals.contextName}, ${locals.contextName}Provider} from "./${locals.contextName}";` + os.EOL;

        fs.appendFile(srcIndexPath, exportString, function (err) {
            if (err) {
                console.log('ERROR: wasnt able to append export for context', err);
            }
        });
    },

    afterInstall(options) {
        this.appendComponent(options);
    }
};
