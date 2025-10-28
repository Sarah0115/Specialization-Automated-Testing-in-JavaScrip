const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const ProductPage = require('../../../../business/pageobjects/product.page');

let productNameFromCard;

When('the user opens the second product', async () => {
    productNameFromCard = await ProductPage.openSecondProduct();
});

Then('the product name should match the name on the product card', async () => {
    const productNameDisplayed = await ProductPage.getProductNameDisplayed();
    expect(productNameDisplayed).to.equal(productNameFromCard);
});

Then('the product name should be visible', async () => {
    const isVisible = await ProductPage.isProductNameVisible();
    expect(isVisible).to.be.true;
});

Then('all product images should be visible', async () => {
    const imagesVisible = await ProductPage.areImagesDisplayed();
    expect(imagesVisible).to.be.true;
});

Then('the out-of-stock alert should not be displayed', async () => {
    const outOfStockVisible = await ProductPage.isOutOfStockVisible();
    expect(outOfStockVisible).to.be.false;
});
