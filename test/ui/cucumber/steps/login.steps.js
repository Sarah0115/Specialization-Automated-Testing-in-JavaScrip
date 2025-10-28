const { Before, Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const LoginPage = require('../../../../business/pageobjects/login.page');

let validUser;

Before(async function () {
    validUser = {
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
    };
});
Given('the user has registered successfully', async () => {
    await LoginPage.open('register');
    await LoginPage.registerUser(validUser);
});

Given('the user is on the login page', async () => {
    await LoginPage.open('login');
});

When('the user enters a valid username and password', async () => {
    await LoginPage.login(validUser.email, validUser.password);
});

Then('the user should be redirected to my account page', async () => {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/account'),
        {
            timeout: 15000,
            timeoutMsg:
                'Expected to be redirected to /account but URL did not change',
        }
    );

    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include('/account');
});

Then('the user should see the title {string}', async (expectedTitle) => {
    const pageTitle = await $('h1[data-test="page-title"]').getText();
    expect(pageTitle).to.have.string(expectedTitle);
});

// Scenario: Invalid credentials
When('the user logs in with invalid credentials', async () => {
    await LoginPage.login('wrongUser@asdf.com', 'wrongPass*');
});

Then(
    'the user should see an error message {string}',
    async (expectedMessage) => {
        const flashMessage = await $('div[data-test="login-error"]');
        await flashMessage.waitForDisplayed({ timeout: 15000 });
        const messageText = await flashMessage.getText();

        expect(messageText).to.equal(expectedMessage);
    }
);
