import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

  });

  it('should display title personal budget', () => {
    page.navigateTo();
    var welcomeMessage = element.all(by.tagName('h1'));
    expect(welcomeMessage.getText()).toContain("Personal Budget");
  });

  it('should display login button', () => {
    page.navigateTo();
    var welcomeMessage = element.all(by.tagName('button'));
    expect(welcomeMessage.get(0).getText()).toContain("Login");
  });

  it('should display go to sign up button', () => {
    page.navigateTo();
    var welcomeMessage = element.all(by.tagName('button'));
    expect(welcomeMessage.get(1).getText()).toContain("Go to Sign Up");
  });

  it('should display username label', () => {
    page.navigateTo();
    var welcomeMessage = element.all(by.tagName('label'));
    expect(welcomeMessage.get(0).getText()).toContain("username");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
