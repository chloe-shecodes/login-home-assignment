const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testInvalidEmail() {
  try {
    await driver.get("https://app-moccona.letsweel.com/app/business-signup");

    let emailField = await driver.findElement(
      By.css('[data-testid="registration-email"]')
    );
    await emailField.sendKeys("user@gmail.com");

    let signUpButton = await driver.findElement(
      By.css('[data-testid="submit-button"]')
    );
    await signUpButton.click();

    let passwordField = await driver.wait(
      until.elementLocated(By.css('[data-testid="registration-password"]')),
      10000
    );
    await passwordField.sendKeys("ValidPass1!");

    let termsCheckbox = await driver.findElement(
      By.css('[data-testid="registration-terms"]')
    );
    await termsCheckbox.click();

    let createAccountButton = await driver.findElement(
      By.css('[data-testid="email-sign-up"]')
    );
    await createAccountButton.click();

    let emailError = await driver.wait(
      until.elementLocated(
        By.css('[data-testid="form-input-wrapper-error-text"]')
      ),
      5000
    );

    let emailErrorText = await emailError.getText();
    let expectedErrorText = "Please try again with your work email address";

    if (emailErrorText === expectedErrorText) {
      console.log("Test Passed: Correct error message displayed.");
    } else {
      console.log("Test Failed: Incorrect error message displayed.");
    }
  } catch (error) {
    console.log("Test Failed: ", error);
  } finally {
    await driver.quit();
  }
}

testInvalidEmail();
