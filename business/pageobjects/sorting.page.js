const Page = require('../../core/BasePage');

class SortPage extends Page {
    async open() {
        return super.open('/');
    }

    get sortDropdown() {
        return $('select[data-test="sort"]');
    }
    get sortAscendingOption() {
        return $('option[value="price,asc"]');
    }
    get container() {
        return $('div.col-md-9 > div.container');
    }
    get productPrices() {
        return $$('[data-test="product-price"]');
    }

    async sortByPriceAscending() {
        await this.sortDropdown.click();
        await this.sortAscendingOption.click();

        await browser.waitUntil(
            async () => {
                const attrValue =
                    await this.container.getAttribute('data-test');
                return attrValue === 'sorting_completed';
            },
            {
                timeout: 10000,
                timeoutMsg: 'Sorting did not complete within timeout',
            }
        );
    }

    async getProductPrices() {
        const priceEls = await this.productPrices;
        const prices = [];

        for (const el of priceEls) {
            const text = await el.getText();
            const number = parseFloat(text.replace(/[^0-9.]/g, ''));
            prices.push(number);
        }

        return prices;
    }
}

module.exports = new SortPage();
