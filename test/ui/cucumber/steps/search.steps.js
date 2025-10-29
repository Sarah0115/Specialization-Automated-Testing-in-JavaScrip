const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');
const SearchPage = require('../../../../business/pageobjects/search.page');

Given('the user is on the homepage', async () => {
    await SearchPage.open('/');
});

When('the user searches for {string}', async (keyword) => {
    await SearchPage.searchFor(keyword);
});

Then('a message {string} should be displayed', async (expectedMessage) => {
    const message = await SearchPage.getNoResultsMessage();
    expect(message).to.equal(expectedMessage);
});
