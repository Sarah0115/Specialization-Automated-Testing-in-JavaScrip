const { $ } = require('@wdio/globals');
const Page = require('../../core/BasePage');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail() {
        return $('input[type="email"]');
    }

    get inputPassword() {
        return $('#password');
    }

    get btnSubmit() {
        return $('input[type="submit"].btnSubmit');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await this.inputEmail.waitForDisplayed();
        await this.inputEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async open(path) {
        return super.open(`/auth/${path}`);
    }

    get firstNameInput() {
        return $('#first_name');
    }
    get lastNameInput() {
        return $('#last_name');
    }
    get dobInput() {
        return $('#dob');
    }
    get streetInput() {
        return $('#street');
    }
    get postalCodeInput() {
        return $('#postal_code');
    }
    get cityInput() {
        return $('#city');
    }
    get stateInput() {
        return $('#state');
    }
    get countrySelect() {
        return $('#country');
    }
    get phoneInput() {
        return $('#phone');
    }
    get emailInput() {
        return $('#email');
    }
    get passwordInput() {
        return $('#password');
    }
    get registerButton() {
        return $('[data-test="register-submit"]');
    }

    get duplicateEmailError() {
        return $('div.help-block');
    }

    async registerUser(userData) {
        await this.firstNameInput.setValue(userData.firstName);
        await this.lastNameInput.setValue(userData.lastName);
        await this.dobInput.setValue(userData.dob);
        await this.streetInput.setValue(userData.street);
        await this.postalCodeInput.setValue(userData.postalCode);
        await this.cityInput.setValue(userData.city);
        await this.stateInput.setValue(userData.state);
        await this.countrySelect.selectByAttribute('value', userData.country);
        await this.phoneInput.setValue(userData.phone);
        await this.emailInput.setValue(userData.email);
        await this.passwordInput.setValue(userData.password);

        await this.registerButton.click();

        try {
            await browser.waitUntil(
                async () => (await browser.getUrl()).includes('login'),
                { timeout: 15000 }
            );
            return { success: true, error: null };
        } catch (e) {
            if (await this.duplicateEmailError.isDisplayed()) {
                const message = await this.duplicateEmailError.getText();
                return { success: false, error: message };
            }
        }
    }
}

module.exports = new LoginPage();
