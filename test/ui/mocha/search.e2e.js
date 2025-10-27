const SearchPage = require('../../../business/pageobjects/search.page');
const { expect } = require('chai');

describe('Search bar', () => {
    it('should return no results for non-existent keyword', async () => {
        await SearchPage.open();
        await SearchPage.searchFor('tijeras');

        const message = await SearchPage.getNoResultsMessage();
        expect(message).to.equal('There are no products found.');
    });
});
