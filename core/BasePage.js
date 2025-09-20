// const { browser } = require('@wdio/globals')

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

module.exports = class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */

    /**
     * Set browser window size
     * @param {number} width
     * @param {number} height
     */
    async open(path, width = 1366, height = 768) {
        await browser.url(path);
        await browser.setWindowSize(width, height);
    }

    /**
     *  Wait until element exists in DOM
     */
    async waitForShow(element, timeout = 5000) {
        await element.waitForDisplayed({ timeout });
        await element.waitForExist({ timeout });
    }
};
