const chai = require('chai');
const expect = chai.expect;

const LoginPage = require('../../business/pageobjects/login.page');

describe('Login Page', () => {
    before(async () => {
        await LoginPage.open('register');
        await LoginPage.registerUser({
            firstName: 'Amy',
            lastName: 'Lee',
            dob: '1953-01-13',
            street: '123 Main St',
            postalCode: '12345',
            city: 'Anytown',
            state: 'Anystate',
            country: 'US',
            phone: '1234567890',
            email: 'amylee12345@example.com',
            password: 'StrongP@ssw0rd!',
        });
    });

    it('should allow a user to log in with valid credentials', async () => {
        await LoginPage.open('login');
        await LoginPage.login('amylee12345@example.com', 'StrongP@ssw0rd!');

        const pageTitle = await $('h1[data-test="page-title"]').getText();
        const currentUrl = await browser.getUrl();

        expect(currentUrl).to.include('/account');
        expect(pageTitle).to.have.string('My account');
    });

    it('Should show error with invalid credentials', async () => {
        await LoginPage.open('login');
        await LoginPage.login('wrongUser@asdf.com', 'wrongPass*');

        const flashMessage = await $('div[data-test="login-error"]');
        await flashMessage.waitForDisplayed({ timeout: 5000 });
        const isDisplayed = await flashMessage.isDisplayed();
        const messageText = await flashMessage.getText();

        expect(isDisplayed).to.be.true;
        expect(messageText).to.equal('Invalid email or password');
    });
});
