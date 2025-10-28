import { When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import BasketPage from '../../../../business/pageobjects/basket.page';

When('the user opens the first product', async () => {
    await BasketPage.openFirstProduct();
});

When('the user sets the quantity to {int}', async (quantity) => {
    await BasketPage.quantityInput.setValue(quantity);
});

When('the user clicks the "Add to Cart" button', async () => {
    await BasketPage.addToCartButton.waitForClickable({ timeout: 5000 });
    await BasketPage.addToCartButton.click();
    await BasketPage.waitForShow(BasketPage.successBanner);
});

Then('the success banner should be displayed', async () => {
    expect(await BasketPage.isSuccessBannerDisplayed()).to.be.true;
});

Then('the success message should be {string}', async (expectedMessage) => {
    const actualMessage = await BasketPage.getSuccessMessage();
    expect(actualMessage).to.equal(expectedMessage);
});

Then('the basket should show a quantity of {int}', async (expectedQuantity) => {
    const basketCount = await BasketPage.getBasketCount();
    expect(basketCount).to.equal(expectedQuantity.toString());
});
