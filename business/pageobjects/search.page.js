const Page = require('../../core/BasePage');

class SearchPage extends Page {
    async open() {
        return super.open('/');
    }

    get searchBar() {
        return $('#search-query');
    }
    get searchButton() {
        return $('button[data-test="search-submit"]');
    }
    get noResultsMessage() {
        return $('div[data-test="no-results"]');
    }

    async searchFor(term) {
        await this.waitForShow(this.searchBar);
        await this.searchBar.setValue(term);
        await this.searchButton.click();
    }

    async getNoResultsMessage() {
        await this.waitForShow(this.noResultsMessage);
        return await this.noResultsMessage.getText();
    }
}

module.exports = new SearchPage();
