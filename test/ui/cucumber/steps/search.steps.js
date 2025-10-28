import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import SearchPage from '../../../../business/pageobjects/search.page';

Given('the user is on the homepage', async () => {
    console.log('🟡 Inside Given — running step!');
    await SearchPage.open('/');
});

When('the user searches for {string}', async (keyword) => {
    await SearchPage.searchFor(keyword);
});

Then('a message {string} should be displayed', async (expectedMessage) => {
    const message = await SearchPage.getNoResultsMessage();
    expect(message).to.equal(expectedMessage);
});
