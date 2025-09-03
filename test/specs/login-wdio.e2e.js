// const { expect } = require('@wdio/globals')
// const LoginPage = require('../pageobjects/login.page')

// describe('Login Page', () => {
    
//     before(async () => {
//         await browser.url('https://practicesoftwaretesting.com/auth/register'); 

//         await $('#first_name').setValue('Amy');
//         await $('#last_name').setValue('Lee');
//         await $('#dob').setValue('1953-01-13');
//         await $('#street').setValue('123 Main St');
//         await $('#postal_code').setValue('12345');
//         await $('#city').setValue('Anytown');
//         await $('#state').setValue('Anystate');
//         await $('#country').selectByAttribute('value', 'US'); 
//         await $('#phone').setValue('1234567890');
//         await $('#email').setValue('amylee12345@example.com');
//         await $('#password').setValue('StrongP@ssw0rd!');
        
//         await $('[data-test="register-submit"]').click();
//         await browser.pause(3000); 


//     });

//     it('should allow a user to log in with valid credentials', async () => {
//        await browser.url('https://practicesoftwaretesting.com/auth/login');
//         await LoginPage.login('amylee12345@example.com', 'StrongP@ssw0rd!');

//         const pageTitle = await $('h1[data-test="page-title"]');
//         await expect(pageTitle).toHaveText('My account');

//         const currentUrl = await browser.getUrl();
//         await expect(currentUrl).toContain('/account');
//     });

//     it('should show error with invalid credentials', async () => {
//         await browser.url('https://practicesoftwaretesting.com/auth/login');

//         await LoginPage.login('wrongUser@asdf.com', 'wrongPass*');

//         const flashMessage = await $('div[data-test="login-error"]');
//         await expect(flashMessage).toBeDisplayed();
//         await expect(flashMessage).toHaveText('Invalid email or password');
//     });
// });
