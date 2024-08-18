const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testEmptyEmailField() {
  try {
    await driver.get("https://app-moccona.letsweel.com/app/business-signup");

    let signUpButton = await driver.findElement(
      By.css('[data-testid="submit-button"]')
    );
    await signUpButton.click();

    let emailError = await driver.findElement(
      By.css('[data-testid="form-input-wrapper-error-text"]')
    );

    let emailErrorText = await emailError.getText();
    let expectedErrorText = "Please enter an email address.";

    if (emailErrorText === expectedErrorText) {
      console.log("Test Passed: Correct error message displayed.");
    } else {
      console.log("Test Failed: Incorrect error message displayed.");
    }

    let createAccountButton = await driver.findElements(
      By.css('[data-testid="email-sign-up"]')
    );

    if (createAccountButton.length === 0) {
      console.log(
        "Tested Passed: user cannot proceed to next step (password input)"
      );
    } else {
      console.log(
        "Test Failed: user can proceed to next step (password input)."
      );
    }
  } catch (error) {
    console.log("Test Failed: ", error);
  } finally {
    await driver.quit();
  }
}

testEmptyEmailField();
