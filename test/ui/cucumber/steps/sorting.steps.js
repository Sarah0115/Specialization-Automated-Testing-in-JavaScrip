const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const SortPage = require('../../../../business/pageobjects/sorting.page');

When('the user selects {string}', async (menuName) => {
    await SortPage.openSortMenu(menuName);
});

When('clicks {string}', async (optionName) => {
    await SortPage.chooseSortOption(optionName);
});

Then('the items should be displayed in ascending order of price', async () => {
    const prices = await SortPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
});
