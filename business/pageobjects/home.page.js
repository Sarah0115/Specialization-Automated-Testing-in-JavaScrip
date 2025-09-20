const BasePage = require('../../core/BasePage');

class HomePage extends BasePage {
    /**
     * Open homepage
     */
    async open() {
        return super.open('/');
    }

    async waitForShow(Element) {
        return super.waitForShow(Element);
    }
}

module.exports = new HomePage();
