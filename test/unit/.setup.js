require('@babel/polyfill');

const JSDOM = require('jsdom').JSDOM;
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');

const exposedProperties = ["window", "navigator", "document"];

chai.use(chaiEnzyme());

const dom = new JSDOM('', {
    url: "https://test.me/"
});

global.window = dom.window;
global.document = dom.window.document;
global.document.createRange = function() {
    return {
        setEnd: function() {
        },
        setStart: function() {
        },
        getBoundingClientRect: function() {
            return {right: 0};
        },
        getClientRects: function() {
            return {};
        }
    }
};
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === "undefined") {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

function noop() {
    return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;

documentRef = document;
