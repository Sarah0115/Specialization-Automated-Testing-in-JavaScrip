const { expect, browser } = require('@wdio/globals')

describe('Search bar ', () => {
    it('Should returns no results for non-existent keyword', async () => {
       await browser.url('https://practicesoftwaretesting.com');
       
        await browser.setWindowSize(1366, 768); 

        const searchBar = await $('input#search-query');
        
        await searchBar.waitForDisplayed({ timeout: 10000 });
        await searchBar.waitForEnabled({ timeout: 10000 });

        await searchBar.clearValue();
        
        await searchBar.setValue('tijeras');
        await  $('button[data-test="search-submit"]').click();

        const emptyMessage = await $('div[data-test="no-results"]');
        await expect(emptyMessage).toBeDisplayed();
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
            const number = parseFloat(text.replace(/[^0-9.]/g, '')); // convert price string to number
            elementsPrices.push(number);
        }
        const sortedPrices = [...elementsPrices].sort((a, b) => a - b);
        expect(elementsPrices).toEqual(sortedPrices);




    });
});

describe('Category Navigation', () => {
    it('should filter products by hammer category and show correct product details', async () => {

        await browser.url('https://practicesoftwaretesting.com');
        
        await browser.setWindowSize(1366, 768); 

        const categoriesElement = await $('input[name="category_id"]');
        await expect(categoriesElement).toBeDisplayed();

        const hammerLabel = await $('label*=Hammer');
        const hammerCheckbox = await hammerLabel.$('input[type="checkbox"]');
        await hammerCheckbox.click();
        await expect(hammerCheckbox).toBeSelected();

        const firstElementCategory = await $('div[data-test="filter_completed"] a.card');
        await firstElementCategory.click();


        const categoryBadge = await $('span[aria-label="category"]');

        await expect(categoryBadge).toBeExisting();
        await expect(categoryBadge).toBeDisplayed();
        await expect(categoryBadge).toHaveText('hammer', { ignoreCase: true });

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
        const currentText = await languageButton.getText();
        return currentText !== initialText; 
        }, {
        timeout: 5000,
        timeoutMsg: 'Expected button text to change within 5 seconds'
        })
    
        const loginButton = await $('a[data-test="nav-sign-in"]');
        await expect(searchButton).toHaveText('Buscar');
        await expect(loginButton).toHaveText('Iniciar sesión');
        
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
        await expect(successBanner).toBeDisplayed();
       
        const navbarToggle = await $('button[data-bs-toggle="collapse"][aria-label="Toggle navigation"]');
        const cartButton = await $('a[data-test="nav-cart"]');
        const basketQuantity = await $('#lblCartCount');

    

               
        await expect(basketQuantity).toHaveText('3'); 
    });
});
describe('Product Detail Page', () => {
    it('should display correct product information', async () => {
        await browser.url('https://practicesoftwaretesting.com/');
        const productCard = await $('a.card');
        const productNameElement = await productCard.$('div.card-body h5');
        const productNameText = await productNameElement.getText();
        await productCard.click();

        const productName = await $('h1[data-test="product-name"]');
        await productName.waitForDisplayed({ timeout: 5000 });
        await expect(productName).toBeDisplayed();
        await expect(productName).toHaveText(productNameText); 
       

        const productImages = await $$('.figure-img.img-fluid');
        await expect(productImages.length).toBeGreaterThan(0);
        for (const image of productImages) {
            await expect(image).toBeDisplayed();
        }
        const outOfStockAlert = await $('.p[data-test="out-of-stock"]');
        await expect(outOfStockAlert).not.toBeDisplayed();
    });
});
