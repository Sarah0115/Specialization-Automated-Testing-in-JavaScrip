const Page = require('../../core/BasePage');

class CategoryPage extends Page {
    async open() {
        return super.open('/');
    }

    // Selectors
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

    // Actions
    async selectHammerCategory() {
        await this.waitForShow(this.categoriesElement);
        await this.hammerCheckbox.click();

        await browser.waitUntil(
            async () => await this.hammerCheckbox.isSelected(),
            {
                timeout: 5000,
                timeoutMsg: 'Checkbox was not selected within 5s',
            }
        );
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
