const ProductPage = require('../../business/pageobjects/product.page');
const { expect } = require('chai');

describe('Product Detail Page', () => {
    it('should display correct product information', async () => {
        await ProductPage.open();

        const productNameFromCard = await ProductPage.openSecondProduct();
        const productNameDisplayed =
            await ProductPage.getProductNameDisplayed();

        const nameIsVisible = await ProductPage.isProductNameVisible();
        const imagesVisible = await ProductPage.areImagesDisplayed();
        const outOfStockVisible = await ProductPage.isOutOfStockVisible();

        expect(nameIsVisible).to.be.true;
        expect(productNameDisplayed).to.equal(productNameFromCard);
        expect(imagesVisible).to.be.true;
        expect(outOfStockVisible).to.be.false;
    });
});
