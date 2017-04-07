module.exports = {
    'Are all elements visible' : function (browser) {
        browser
            .url('http://localhost:53002')
            .waitForElementVisible('#publish', 1000)
            .waitForElementVisible('.lead', 1000)

    },

    'Enter and send a message' : function(browser) {
        browser
            .setValue('input[type=text]', 'nightwatch')
            .waitForElementVisible('input[type=submit]', 1000)
            .click('input[type=submit]')
        },
    'Is input clear': function(browser){
      browser. pause(1000)
          .assert.containsText('input[type=text]', '')
    },

    'Is message displayed': function(browser){
        browser. pause(1000)
            .assert.containsText('.container', 'nightwatch')
    },
    after : function(browser) {
        browser.end(function() {

        });
    }
};