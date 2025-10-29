const { When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const categoryPage = require('../../../../business/pageobjects/category.page');

When('the categories menu is displayed', async () => {
    await categoryPage.waitForCategories();
    const isVisible = await categoryPage.categoriesElement.isExisting();
    expect(isVisible).to.be.true;
});

When('the user selects the {string} category', async (categoryName) => {
    await categoryPage.selectCategory(categoryName);
});

Then(
    'only products from the {string} category should be shown',
    async (categoryName) => {
        const names = await categoryPage.getFilteredProductNames();
        expect(names.length).to.be.greaterThan(0);
        const normalizedCategory = categoryName.toLowerCase().trim();
        const allMatchCategory = names.every((name) =>
            name.includes(normalizedCategory)
        );
        expect(
            allMatchCategory,
            `Some products do not match category "${categoryName}"`
        ).to.be.true;
    }
);

When('the user clicks on the first product in the filtered list', async () => {
    await categoryPage.openFirstFilteredProduct();
});

Then(
    'the product detail should display the {string} category',
    async (categoryName) => {
        const isDisplayed = await categoryPage.isCategoryBadgeDisplayed();
        const categoryText = await categoryPage.getCategoryBadgeText();

        expect(isDisplayed).to.be.true;
        expect(categoryText).to.equal(categoryName.toLowerCase());
    }
);
