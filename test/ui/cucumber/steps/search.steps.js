import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import SearchPage from '../../../../business/pageobjects/search.page';

console.log('✅ Search steps loaded');
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
console.log('✅ Search steps loaded');