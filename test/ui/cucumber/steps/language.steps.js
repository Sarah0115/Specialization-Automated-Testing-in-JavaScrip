import { When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import LanguagePage from '../../../../business/pageobjects/language.page';

When('the user clicks on the language button on the main menu', async () => {
    await LanguagePage.openLanguageMenu();
});

When('selects the {string} language option', async (langCode) => {
    await LanguagePage.changeLanguageToSpanish(langCode);
});

Then(
    'the search and login buttons should display labels in Spanish',
    async () => {
        const searchButtonText = await LanguagePage.getSearchButtonText();
        const loginButtonText = await LanguagePage.getLoginButtonText();

        expect(searchButtonText).to.include('Buscar');
        expect(loginButtonText).to.include('Iniciar sesión');
    }
);
