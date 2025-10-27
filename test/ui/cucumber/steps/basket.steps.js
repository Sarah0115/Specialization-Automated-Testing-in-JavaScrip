// import { Given, When, Then } from '@wdio/cucumber-framework';
// import BasketPage from '../../../../business/pageobjects/basket.page';
// import { expect } from 'chai';

// Given('I am on the home page', async () => {
//     await BasketPage.open();
// });

// When('I open the first product', async () => {
//     await BasketPage.openFirstProduct();
// });

// When('I add {int} items to the basket', async (quantity) => {
//     await BasketPage.addToBasket(quantity);
// });

// Then('I should see a success message {string}', async (expectedMessage) => {
//     const actualMessage = await BasketPage.getSuccessMessage();
//     expect(actualMessage).to.equal(expectedMessage);
//     expect(await BasketPage.isSuccessBannerDisplayed()).to.be.true;
// });

// Then('the basket count should be {string}', async (expectedCount) => {
//     const actualCount = await BasketPage.getBasketCount();
//     expect(actualCount).to.equal(expectedCount);
// });
