const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should(); // Activate should interface

const LoginPage = require('../pageobjects/login.page');

describe('Search bar ', () => {
    it('Should returns no results for non-existent keyword', async () => {
      await browser.url('https://practicesoftwaretesting.com');
       
        await browser.setWindowSize(1366, 768); 

        const searchBar = await $('input#search-query');
        
        await searchBar.waitForDisplayed({ timeout: 10000 });
        await searchBar.waitForEnabled({ timeout: 10000 });

        await searchBar.clearValue();
        
        await searchBar.setValue('tijeras');
        await $('button[data-test="search-submit"]').click();

        const emptyMessage = await $('div[data-test="no-results"]');
        await emptyMessage.waitForDisplayed({ timeout: 5000 });
        const messageText = await emptyMessage.getText();
        const isDisplayed = await emptyMessage.isDisplayed();
        

        //ASSERT
        assert.isTrue(isDisplayed, 'Error message is not shown');
        assert.equal(messageText, 'There are no products found.');

        //SHOULD
        isDisplayed.should.be.true;
        messageText.should.equal('There are no products found.');

        //EXPECT
        expect(isDisplayed).to.be.true;
        expect(messageText).to.equal('There are no products found.');
    });
});

  describe('Product Sorting', () => {
    it('should sort items by price in ascending order', async () => {
        await browser.url('https://practicesoftwaretesting.com');
       
        await browser.setWindowSize(1366, 768); 

        const sortDropdown = await $('select[data-test="sort"]');  
        await sortDropdown.click(); 
       
        const sortAscending = await $('option[value="price,asc"]')
        await sortAscending.click(); 
        
        const container = await $('div.col-md-9 > div.container'); 
        await browser.waitUntil(async () => {
          const attrValue = await container.getAttribute('data-test');
            return attrValue === 'sorting_completed'
        }, {
            timeout: 10000,
            timeoutMsg: 'Sorting did not complete within timeout'
        });

        const priceValues = await $$('[data-test="product-price"]');
        const elementsPrices = [];

        for (const priceEl of priceValues) {
            const text = await priceEl.getText(); 
            const number = parseFloat(text.replace(/[^0-9.]/g, '')); 
            elementsPrices.push(number);
        }
        const sortedPrices = [...elementsPrices].sort((a, b) => a - b);

        
        //ASSERT
        assert.deepEqual(elementsPrices, sortedPrices, 'Sorted elements dont match');

        //SHOULD
        elementsPrices.should.deep.equal(sortedPrices);

        //EXPECT
        expect(elementsPrices).to.deep.equal(sortedPrices);
    });
});

describe('Category Navigation', () => {
    it('should filter products by hammer category and show correct product details', async () => {

        await browser.url('https://practicesoftwaretesting.com');
        
        await browser.setWindowSize(1366, 768); 

        const categoriesElement = await $('input[name="category_id"]');
        await categoriesElement.waitForDisplayed({ timeout: 5000 });

        const hammerLabel = await $('label*=Hammer');
        const hammerCheckbox = await hammerLabel.$('input[type="checkbox"]');
        await hammerCheckbox.click();
        
        await browser.waitUntil(
        async () => await hammerCheckbox.isSelected(),
        {
            timeout: 5000,
            timeoutMsg: 'Checkbox was not selected within 5s'
        }
        );

        const firstElementCategory = await $('div[data-test="filter_completed"] a.card');
        await firstElementCategory.click();


        const categoryBadge = await $('span[aria-label="category"]');
        await categoryBadge.waitForDisplayed({ timeout: 5000 });
        const categoryisDisplayed = await categoryBadge.isExisting();
        const category = (await categoryBadge.getText()).toLowerCase(); 

        //ASSERT 
        assert.isTrue(categoryisDisplayed, 'Category badge does not exist');
        assert.equal(category, 'hammer', 'Category does not match');

        //SHOULD
        (categoryisDisplayed).should.be.true;
        category.should.equal('hammer');

        //EXPECT 
        expect(categoryisDisplayed).to.be.true;
        expect(category).to.equal('hammer');
         
    });
});

describe('Language Change', () => {
    it('should change website labels to Spanish when user selects "ES"', async () => {
        await browser.url('https://practicesoftwaretesting.com');
        await browser.setWindowSize(1366, 768);

        const languageButton = await $('#language');
        await languageButton.click();

        const spanishOption = await $('a[data-test="lang-es"]');
        await spanishOption.waitForDisplayed({ timeout: 5000 });
        await spanishOption.click();

        const searchButton = await $('button[data-test="search-submit"]');
        const initialText = await searchButton.getText();

        await browser.waitUntil(async () => {
        const currentText = await searchButton.getText();
        return currentText !== initialText;
        }, {
        timeout: 5000,
        timeoutMsg: 'Expected button text to change within 5 seconds'
        });


        const searchButtonText = await searchButton.getText();
        const loginButton = await $('a[data-test="nav-sign-in"]').getText();

        //ASSERT
        assert.equal(searchButtonText, 'Buscar');
        assert.equal(loginButton, 'Iniciar sesión');

        //SHOULD
        searchButtonText.should.equal('Buscar');
        loginButton.should.equal('Iniciar sesión');

        //EXPECT
        expect(searchButtonText).to.include('Buscar');
        expect(loginButton).to.include('Iniciar sesión');
    });
});


describe('Basket Functionality', () => {
    it('should add a product to the basket successfully', async () => {

        await browser.url('https://practicesoftwaretesting.com/');

        await browser.setWindowSize(1366, 768); 

        const productCard = await $('a.card');
        await productCard.click();

        const quantity = await $('input#quantity-input');
        await quantity.setValue('3');
        const addToCartButton = await $('button[data-test="add-to-cart"]');
        await addToCartButton.waitForClickable({ timeout: 5000 });
        await addToCartButton.click();

        const successBanner = await $('#toast-container div.toast-success div[role="alert"]');
        await successBanner.waitForDisplayed({ timeout: 5000 });

        const basketQuantity = await $('#lblCartCount');
        const basketCountText = await basketQuantity.getText();

        const successMessage = await successBanner.getText();

        // ASSERT
        assert.isTrue(await successBanner.isDisplayed(), 'Success banner should be displayed');
        assert.equal(successMessage, 'Product added to shopping cart.', 'Success message text');
        assert.equal(basketCountText, '3', 'Basket quantity should be 3');

        // SHOULD
        (await successBanner.isDisplayed()).should.be.true;
        successMessage.should.equal('Product added to shopping cart.');
        basketCountText.should.equal('3');

        // EXPECT
        expect(await successBanner.isDisplayed()).to.be.true;
        expect(successMessage).to.equal('Product added to shopping cart.');
        expect(basketCountText).to.equal('3');
  
    });
});

describe('Product Detail Page', () => {
    it('should display correct product information', async () => {
        await browser.url('https://practicesoftwaretesting.com/');
        
        const productCard = await $('div.container > a:nth-child(2)');
        const productNameElement = await productCard.$('div.card-body h5');
        const productNameText = await productNameElement.getText();

        await productCard.click();

        const productName = await $('h1[data-test="product-name"]');
        await productName.waitForDisplayed({ timeout: 5000 });
        const nameIsDisplayed = await productName.isDisplayed();
        
        browser.saveScreenshot('screenshot.png');
        await productName.waitForDisplayed({ timeout: 5000 });
        const productNameDisplayedText = await productName.getText();

        const productImages = await $$('.figure-img.img-fluid');
        const outOfStockAlert = await $('.p[data-test="out-of-stock"]');
        const outOfStockAlertIsDisplayed = await outOfStockAlert.isDisplayed();

        //ASSERT
        assert.isTrue(nameIsDisplayed, 'Product name is not displayed');
        assert.equal(productNameDisplayedText, productNameText, 'Product name text should match');
        assert.isAbove(productImages.length, 0, 'There should be at least one product image');
        for (const image of productImages) {
            assert.isTrue(await image.isDisplayed(), 'Each product image should be displayed');
        }
        assert.isFalse(outOfStockAlertIsDisplayed, 'Out of stock alert should not be displayed');

        // SHOULD
        (nameIsDisplayed).should.be.true;
        productNameDisplayedText.should.equal(productNameText);
        productImages.length.should.be.above(0);
        for (const image of productImages) {
            (await image.isDisplayed()).should.be.true;
        }
        (outOfStockAlertIsDisplayed).should.be.false;

        // EXPECT
        expect(nameIsDisplayed).to.be.true;
        expect(productNameDisplayedText).to.equal(productNameText);
        expect(productImages.length).to.be.above(0);
        for (const image of productImages) {
            expect(await image.isDisplayed()).to.be.true;
        }
        expect(outOfStockAlertIsDisplayed).to.be.false;
    });

});

