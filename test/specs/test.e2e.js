const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')

describe('Login Page', () => {
    it('should allow a user to log in with valid credentials', async () => {
       await browser.url('https://practicesoftwaretesting.com/auth/login');
        await LoginPage.login('sarandonga1993@hotmail.com', 'Contra0115*');

        const pageTitle = await $('h1[data-test="page-title"]');
        await expect(pageTitle).toHaveText('My account');

        const currentUrl = await browser.getUrl();
        await expect(currentUrl).toContain('/account');
    });

    it('should show error with invalid credentials', async () => {
        await browser.url('https://practicesoftwaretesting.com/auth/login');

        await LoginPage.login('wrongUser@asdf.com', 'wrongPass*');

        const flashMessage = await $('div[data-test="login-error"]');
        await expect(flashMessage).toBeDisplayed();
        await expect(flashMessage).toHaveText('Invalid email or password');
    });
});

describe('Search bar ', () => {
    it('Should returns no results for non-existent keyword', async () => {
       await browser.url('https://practicesoftwaretesting.com');

        const searchBar = await $('input#search-query');
        
        await searchBar.setValue('tijeras');
        await  $('button[data-test="search-submit"]').click();

        const emptyMessage = await $('div[data-test="no-results"]');
        await expect(emptyMessage).toBeDisplayed();
    });
});

describe.only('Product Sorting', () => {
    it('should sort items by price in ascending order', async () => {
       await browser.url('https://practicesoftwaretesting.com');

        const sortDropdown = await $('select[data-test="sort"]');  
        await sortDropdown.click(); 
       
        const sortAscending = await $('option[value="price,asc"]')
        await sortAscending.click(); 
        
        const priceValues = await $$('[data-test="product-price"]');
        const priceElements = await $$('[data-test="product-price"]');

       
        for (const priceEl of priceValues) {
            const text = await priceEl.getText(); 
            console.log('PPPRRRRRIIICCCEEESSS', text)
         
        
        // const sortedPrices = [...priceValues].sort((a, b) => a - b);
        // expect(priceValues).toEqual(sortedPrices);
    });
});

describe('Category Navigation', () => {
    it('should filter products by hammer category and show correct product details', async () => {

        await browser.url('https://practicesoftwaretesting.com');

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

        const navbarToggle = await $('button[data-bs-toggle="collapse"][aria-label="Toggle navigation"]');
        const languageButton = await $('button#language');

        const isLanguageButtonDisplayed = await languageButton.isDisplayed();
        if (!isLanguageButtonDisplayed) {
            // If language button not visible, click the navbar toggle button to show menu
            await navbarToggle.waitForClickable({ timeout: 5000 });
            await navbarToggle.click();

            // Wait for the language button to be visible and clickable after menu opens
            await languageButton.waitForDisplayed({ timeout: 5000 });
            await languageButton.waitForClickable({ timeout: 5000 });
        }

        await languageButton.click();
    
        const spanishOption = await $('a[data-test="lang-es"]');
        await spanishOption.click();

        const searchButton = await $('button[data-test="search-submit"]'); 
        const loginButton = await $('a[data-test="nav-sign-in"]');
        await expect(searchButton).toHaveText('Buscar');
        await expect(loginButton).toHaveText('Iniciar sesión');
        
    });
});


describe('Basket Functionality', () => {
    it('should add a product to the basket successfully', async () => {

        await browser.url('https://practicesoftwaretesting.com/');
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
        // await expect(successBanner).toHaveText('Product added to shopping cart.');
       
        const navbarToggle = await $('button[data-bs-toggle="collapse"][aria-label="Toggle navigation"]');
        const cartButton = await $('a[data-test="nav-cart"]');
        const basketQuantity = await $('#lblCartCount');

        const isCartDisplayed = await cartButton.isDisplayed();
        if (!isCartDisplayed) {
            
            await navbarToggle.waitForClickable();
            await navbarToggle.click();

            await basketQuantity.waitForDisplayed();
            await basketQuantity.waitForClickable();
        }

               
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
