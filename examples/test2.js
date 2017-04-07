var assert = require('assert');

module.exports = {
    desiredCapabilities : {
        name : 'test-Name'
    },
    demoTest : function (client) {
        assert.equal(client.options.desiredCapabilities.name, 'test-Name');

        client.url('http://localhost:53002')
            .assert.elementPresent('#publish');

    },

    after : function(client) {
        client.end(function() {

        });
    }
};