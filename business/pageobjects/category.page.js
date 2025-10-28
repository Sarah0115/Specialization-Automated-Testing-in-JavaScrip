const Page = require('../../core/BasePage');

class CategoryPage extends Page {
    async open() {
        return super.open('/');
    }

    get categoriesElement() {
        return $('input[name="category_id"]');
    }
    get hammerLabel() {
        return $('label*=Hammer');
    }
    get hammerCheckbox() {
        return this.hammerLabel.$('input[type="checkbox"]');
    }
    get firstElementCategory() {
        return $('div[data-test="filter_completed"] a.card');
    }
    get categoryBadge() {
        return $('span[aria-label="category"]');
    }

    async waitForCategories() {
        await this.waitForShow(this.categoriesElement);
    }
    async selectCategory(categoryName) {
        const label = await $(`label*=${categoryName}`);
        const checkbox = await label.$('input[type="checkbox"]');
        await checkbox.click();

        await browser.waitUntil(async () => await checkbox.isSelected(), {
            timeout: 5000,
            timeoutMsg: `Checkbox ${categoryName} was not selected`,
        });
    }

    async getFilteredProductNames() {
        await browser.waitUntil(
            async () => {
                const elems = await $$(
                    'div[data-test="filter_completed"] a.card h5[data-test="product-name"]'
                );
                return elems.length > 0;
            },
            {
                timeout: 5000,
                timeoutMsg: 'Filtered products did not load in time',
            }
        );

        const productElements = await $$(
            'div[data-test="filter_completed"] a.card h5[data-test="product-name"]'
        );
        const names = [];
        for (const el of productElements) {
            const text = await el.getText();
            names.push(text.trim().toLowerCase());
        }
        return names;
    }

    async openFirstFilteredProduct() {
        await this.firstElementCategory.click();
    }

    async getCategoryBadgeText() {
        await this.waitForShow(this.categoryBadge);
        return (await this.categoryBadge.getText()).toLowerCase();
    }

    async isCategoryBadgeDisplayed() {
        await this.waitForShow(this.categoryBadge);
        return await this.categoryBadge.isExisting();
    }
}

module.exports = new CategoryPage();
