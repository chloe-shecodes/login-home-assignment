const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testInvalidEmailErrorMessage() {
  try {
    await driver.get("https://app-moccona.letsweel.com/app/business-signup");

    let emailField = await driver.findElement(
      By.css('[data-testid="registration-email"]')
    );
    await emailField.sendKeys("user@notexample.com");

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

    let emailError = await driver.findElement(
      By.css('[data-testid="form-input-wrapper-error-text"]')
    );

    let emailErrorDisplayed = await emailError.isDisplayed();

    if (emailErrorDisplayed) {
      console.log("Test Passed: Error messages displayed as expected.");
    } else {
      console.log("Test Failed: Error messages not displayed as expected.");
    }
  } catch (error) {
    console.log("Test Failed: ", error);
  } finally {
    await driver.quit();
  }
}

testInvalidEmailErrorMessage();
