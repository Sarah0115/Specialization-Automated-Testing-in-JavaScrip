const SortPage = require('../../../business/pageobjects/sorting.page');
const { expect } = require('chai');

describe('Product Sorting', () => {
    it('should sort items by price in ascending order', async () => {
        await SortPage.open();
        await SortPage.openSortMenu();
        await SortPage.chooseSortOption();

        const prices = await SortPage.getProductPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).to.deep.equal(sortedPrices);
    });
});
