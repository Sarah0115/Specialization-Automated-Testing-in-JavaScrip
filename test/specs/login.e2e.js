const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should(); // Activate should interface

const LoginPage = require('../pageobjects/login.page');

describe('Login Page', () => {

  before(async () => {
    await browser.url('https://practicesoftwaretesting.com/auth/register');
    await $('#first_name').setValue('Amy');
    await $('#last_name').setValue('Lee');
    await $('#dob').setValue('1953-01-13');
    await $('#street').setValue('123 Main St');
    await $('#postal_code').setValue('12345');
    await $('#city').setValue('Anytown');
    await $('#state').setValue('Anystate');
    await $('#country').selectByAttribute('value', 'US');
    await $('#phone').setValue('1234567890');
    await $('#email').setValue('amylee12345@example.com');
    await $('#password').setValue('StrongP@ssw0rd!');
    await $('[data-test="register-submit"]').click();
    await browser.pause(3000);
  });
   it('should allow a user to log in with valid credentials', async () => {
    await browser.url('https://practicesoftwaretesting.com/auth/login');
    await LoginPage.login('amylee12345@example.com', 'StrongP@ssw0rd!');

    const pageTitle = await $('h1[data-test="page-title"]').getText();
    const currentUrl = await browser.getUrl();

    //ASSERT
    assert.equal(pageTitle, 'My account', 'Page title matches');
    assert.include(currentUrl, '/account');
    
    //SHOULD
    currentUrl.should.include('/account');
    pageTitle.should.equal('My account');

    //Expect
    expect(currentUrl).to.include('/account');
    expect(pageTitle).to.have.string('My account');

  });

 

  it ('Should show error with invalid credentials', async () => {
    await browser.url('https://practicesoftwaretesting.com/auth/login');
    await LoginPage.login('wrongUser@asdf.com', 'wrongPass*');

    const flashMessage = await $('div[data-test="login-error"]');
    await flashMessage.waitForDisplayed({ timeout: 5000 });
    const isDisplayed = await flashMessage.isDisplayed();
    const messageText = await flashMessage.getText();

    //ASSERT
    assert.isTrue(isDisplayed, 'Error message is not shown');
    assert.equal(messageText, 'Invalid email or password');

    //SHOULD
    isDisplayed.should.be.true;
    messageText.should.equal('Invalid email or password');

    //EXPECT
    expect(isDisplayed).to.be.true;
    expect(messageText).to.equal('Invalid email or password');
  });

});
