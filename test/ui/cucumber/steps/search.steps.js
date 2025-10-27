import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import SearchPage from '../../../../business/pageobjects/search.page';

Given('the user is on the homepage', async () => {
    await SearchPage.open('/');
});

When('the user enters {string} in the search bar', async (keyword) => {
    await browser.waitUntil(
        async () => await SearchPage.enterSearchTerm(keyword),
        {
            timeout: 15000,
            timeoutMsg:
                'Expected to find the message There are no products found',
        }
    );
});

When('the user submits the search', async () => {
    await SearchPage.submitSearch();
});

Then('a message {string} should be displayed', async (expectedMessage) => {
    const message = await SearchPage.getNoResultsMessage();
    expect(message).to.equal(expectedMessage);
});
