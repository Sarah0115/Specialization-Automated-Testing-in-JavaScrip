const CategoryPage = require('../../../business/pageobjects/Category.page');
const { expect } = require('chai');

describe('Category Navigation', () => {
    it('should filter products by hammer category and show correct product details', async () => {
        await CategoryPage.open();
        await CategoryPage.selectHammerCategory();
        await CategoryPage.openFirstFilteredProduct();

        const isDisplayed = await CategoryPage.isCategoryBadgeDisplayed();
        const categoryText = await CategoryPage.getCategoryBadgeText();

        expect(isDisplayed).to.be.true;
        expect(categoryText).to.equal('hammer');
    });
});
