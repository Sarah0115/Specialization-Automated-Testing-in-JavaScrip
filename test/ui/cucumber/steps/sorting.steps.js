import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import SortPage from '../../../../business/pageobjects/sorting.page';

Given('the user is on the homepage', async () => {
    await SortPage.open('/');
});

When('the user selects {string}', async (menuName) => {
    await SortPage.openSortMenu(menuName);
});

When('clicks {string}', async (optionName) => {
    await SortPage.selectSortOption(optionName);
});

Then('the items should be displayed in ascending order of price', async () => {
    const prices = await SortPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).to.deep.equal(sortedPrices);
});
