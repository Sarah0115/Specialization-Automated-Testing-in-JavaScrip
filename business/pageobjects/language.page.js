const Page = require('../../core/BasePage');

class LanguagePage extends Page {
    async open() {
        return super.open('/');
    }

    get languageButton() {
        return $('#language');
    }
    get spanishOption() {
        return $('a[data-test="lang-es"]');
    }
    get searchButton() {
        return $('button[data-test="search-submit"]');
    }
    get loginButton() {
        return $('a[data-test="nav-sign-in"]');
    }

    async openLanguageMenu() {
        await this.languageButton.click();
        await this.waitForShow(this.spanishOption);
    }

    async changeLanguageToSpanish() {
        await this.spanishOption.click();

        const initialText = await this.searchButton.getText();

        await browser.waitUntil(
            async () => {
                const currentText = await this.searchButton.getText();
                return currentText !== initialText;
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected button text to change within 5 seconds',
            }
        );
    }

    async getSearchButtonText() {
        return await this.searchButton.getText();
    }

    async getLoginButtonText() {
        return await this.loginButton.getText();
    }
}

module.exports = new LanguagePage();
