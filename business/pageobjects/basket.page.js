const Page = require('../../core/BasePage');

class BasketPage extends Page {
    async open() {
        return super.open('/');
    }

    get productCard() {
        return $('a.card');
    }
    get quantityInput() {
        return $('#quantity-input');
    }
    get addToCartButton() {
        return $('button[data-test="add-to-cart"]');
    }
    get successBanner() {
        return $('#toast-container div.toast-success div[role="alert"]');
    }
    get basketQuantity() {
        return $('#lblCartCount');
    }

    // Basket/Product Actions
    async openFirstProduct() {
        await this.productCard.click();
    }

    async addToBasket(quantity) {
        await this.quantityInput.setValue(quantity);
        await this.addToCartButton.waitForClickable({ timeout: 5000 });
        await this.addToCartButton.click();
        await this.waitForShow(this.successBanner);
    }

    async getBasketCount() {
        return await this.basketQuantity.getText();
    }

    async getSuccessMessage() {
        return await this.successBanner.getText();
    }

    async isSuccessBannerDisplayed() {
        return await this.successBanner.isDisplayed();
    }
}

module.exports = new BasketPage();
