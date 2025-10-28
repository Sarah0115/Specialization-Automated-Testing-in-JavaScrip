import { When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import categoryPage from '../../../../business/pageobjects/category.page';


When('the categories menu is displayed', async () => {
   await categoryPage.waitForCategories();
    const isVisible = await categoryPage.categoriesElement.isExisting();
    expect(isVisible).to.be.true;
});

When('the user selects the {string} category', async (categoryName) => {
    await categoryPage.selectCategory(categoryName);
});

Then('only products from the {string} category should be shown', async (categoryName) => {
    await browser.pause(5000)
    const badgeText = await categoryPage.getCategoryBadgeText();
    expect(badgeText).to.equal(categoryName.toLowerCase());
});


When('the user clicks on the first product in the filtered list', async () => {
    await categoryPage.openFirstFilteredProduct();
});

Then('the product detail should display the {string} category', async (categoryName) => {
    const isDisplayed = await categoryPage.isCategoryBadgeDisplayed();
    const categoryText = await categoryPage.getCategoryBadgeText();

    expect(isDisplayed).to.be.true;
    expect(categoryText).to.equal(categoryName.toLowerCase());
});
