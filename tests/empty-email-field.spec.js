const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testEmptyEmailFieldErrorMessages() {
  try {
    await driver.get("https://app-moccona.letsweel.com/app/business-signup");

    // Try to submit the form with empty fields
    let signUpButton = await driver.findElement(
      By.css('[data-testid="submit-button"]')
    );
    await signUpButton.click();

    // Check for the presence of error messages
    let emailError = await driver.findElement(
      By.css('[data-testid="form-input-wrapper-error-text"]') // Update with correct selector
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

testEmptyEmailFieldErrorMessages();
