const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(new chrome.Options())
  .build();

async function testSignup() {
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
    await passwordField.sendKeys("ValidPass1!");

    let termsCheckbox = await driver.findElement(
      By.css('[data-testid="registration-terms"]')
    );
    await termsCheckbox.click();

    let createAccountButton = await driver.findElement(
      By.css('[data-testid="email-sign-up"]')
    );
    await createAccountButton.click();

    await driver.wait(
      until.urlIs("https://app-moccona.letsweel.com/app/personal-info")
    );

    console.log(
      "Test Passed: User navigated to the personal-info page successfully."
    );
  } catch (error) {
    console.log("Test Failed: ", error);
  } finally {
    await driver.quit();
  }
}

testSignup();
