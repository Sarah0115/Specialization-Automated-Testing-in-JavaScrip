const BasketPage = require('../../business/pageobjects/basket.page');
const { expect } = require('chai');

describe('Basket Functionality', () => {
    it('should add a product to the basket successfully', async () => {
        await BasketPage.open();
        await BasketPage.openFirstProduct();
        await BasketPage.addToBasket(3);

        const successMessage = await BasketPage.getSuccessMessage();
        const basketCountText = await BasketPage.getBasketCount();

        expect(await BasketPage.isSuccessBannerDisplayed()).to.be.true;
        expect(successMessage).to.equal('Product added to shopping cart.');
        expect(basketCountText).to.equal('3');
    });
});
