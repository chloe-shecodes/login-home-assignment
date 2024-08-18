const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testEmptyEmailFieldErrorMessages() {
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

    if (
      minimumLengthErrorDisplayed &&
      numericErrorDisplayed &&
      symbolErrorDisplayed &&
      letterCasingErrorDisplayed
    ) {
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

testEmptyEmailFieldErrorMessages();
