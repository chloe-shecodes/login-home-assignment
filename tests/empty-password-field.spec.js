const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testEmptyPasswordField() {
  try {
    await driver.get("https://app-moccona.letsweel.com/app/business-signup");
    const timestamp = new Date().getTime();
    const uniqueEmail = `validemail${timestamp}@example.com`;

    let emailField = await driver.findElement(
      By.css('[data-testid="registration-email"]')
    );
    await emailField.sendKeys(uniqueEmail);

    let signUpButton = await driver.findElement(
      By.css('[data-testid="submit-button"]')
    );
    await signUpButton.click();

    let passwordField = await driver.wait(
      until.elementLocated(By.css('[data-testid="registration-password"]')),
      10000
    );
    await passwordField.click();

    let minimumLengthError = await driver.findElement(
      By.css('[data-testid="ds-minimum-length-feedback"]')
    );
    let minimumLengthErrorDisplayed = await minimumLengthError.isDisplayed();

    let numericError = await driver.findElement(
      By.css('[data-testid="ds-numeric-feedback"]')
    );
    let numericErrorDisplayed = await numericError.isDisplayed();

    let symbolError = await driver.findElement(
      By.css('[data-testid="ds-symbol-feedback"]')
    );
    let symbolErrorDisplayed = await symbolError.isDisplayed();

    let letterCasingError = await driver.findElement(
      By.css('[data-testid="ds-letter-casing-feedback"]')
    );
    let letterCasingErrorDisplayed = await letterCasingError.isDisplayed();

    let alertIcon = await driver.findElement(
      By.css('[data-testid="ds-symbol-feedback"]')
    );
    let alertIconDisplayed = await alertIcon.isDisplayed();

    if (
      minimumLengthErrorDisplayed &&
      numericErrorDisplayed &&
      symbolErrorDisplayed &&
      letterCasingErrorDisplayed &&
      alertIconDisplayed
    ) {
      console.log("Test Passed: Error messages displayed as expected.");
    } else {
      console.log("Test Failed: Error messages not displayed as expected.");
    }

    let createAccountButton = await driver.findElement(
      By.css('[data-testid="email-sign-up"]')
    );
    let isCreateAccountButtonEnabled = await createAccountButton.isEnabled();
    if (!isCreateAccountButtonEnabled) {
      console.log(
        "Test Passed: Create Account button is disabled as expected."
      );
    } else {
      console.log("Test Failed: Create Account button is not disabled.");
    }
  } catch (error) {
    console.log("Test Failed: ", error);
  } finally {
    await driver.quit();
  }
}

testEmptyPasswordField();
