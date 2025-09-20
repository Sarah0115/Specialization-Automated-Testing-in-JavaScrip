const LanguagePage = require('../../business/pageobjects/language.page');
const { expect } = require('chai');

describe('Language Change', () => {
    it('should change website labels to Spanish when user selects "ES"', async () => {
        await LanguagePage.open();
        await LanguagePage.changeLanguageToSpanish();

        const searchButtonText = await LanguagePage.getSearchButtonText();
        const loginButtonText = await LanguagePage.getLoginButtonText();

        expect(searchButtonText).to.include('Buscar');
        expect(loginButtonText).to.include('Iniciar sesión');
    });
});
