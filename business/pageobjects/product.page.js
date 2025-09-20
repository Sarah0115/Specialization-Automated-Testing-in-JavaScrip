const Page = require('../../core/BasePage');

class ProductPage extends Page {
    async open() {
        return super.open('/');
    }

    get secondProductCard() {
        return $('div.container > a:nth-child(2)');
    }
    get productCardName() {
        return this.secondProductCard.$('div.card-body h5');
    }
    get productName() {
        return $('h1[data-test="product-name"]');
    }
    get productImages() {
        return $$('.figure-img.img-fluid');
    }
    get outOfStockAlert() {
        return $('.p[data-test="out-of-stock"]');
    }

    async openSecondProduct() {
        const productNameText = await this.productCardName.getText();
        await this.secondProductCard.click();
        return productNameText;
    }

    async getProductNameDisplayed() {
        await this.waitForShow(this.productName);
        return await this.productName.getText();
    }

    async isProductNameVisible() {
        return await this.productName.isDisplayed();
    }

    async areImagesDisplayed() {
        for (const image of await this.productImages) {
            if (!(await image.isDisplayed())) {
                return false;
            }
        }
        return true;
    }

    async isOutOfStockVisible() {
        return await this.outOfStockAlert.isDisplayed();
    }
}
module.exports = new ProductPage();
