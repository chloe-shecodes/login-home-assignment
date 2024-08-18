const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testExistingUser() {
  try {
    await driver.get("https://app-moccona.letsweel.com/app/business-signup");

    let emailField = await driver.findElement(
      By.css('[data-testid="registration-email"]')
    );
    await emailField.sendKeys("existinguser@example.com");

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
      By.css('[data-testid="registration-email-subtext-container"]')
    );

    let errorMessageText = await emailError.getText();
    let expectedErrorText = "This account already exists";

    if (errorMessageText.includes(expectedErrorText)) {
      console.log("Test Passed: Correct error message text displayed.");
    } else {
      console.log("Test Failed: Incorrect error message text.");
      console.log(`Actual: '${errorMessageText}'`);
    }

    let loginLink = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-to-continue-link"]')),
      10000
    );
    let loginLinkText = await loginLink.getText();
    let expectedLinkText = "Login to continue";

    if (loginLinkText === expectedLinkText) {
      console.log("Test Passed: Correct link text displayed.");
    } else {
      console.log("Test Failed: Incorrect link text displayed.");
    }
  } catch (error) {
    console.log("Test Failed: ", error);
  } finally {
    await driver.quit();
  }
}
testExistingUser();
