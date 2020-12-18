import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';
import { Eyes, ClassicRunner, Target, RectangleSize, Configuration, BatchInfo} from '@applitools/eyes-protractor';

describe('workspace-project App', () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false)
  })
  let page: AppPage;

  let runner, eyes;

  beforeEach(async () => {
    page = new AppPage();

    runner = new ClassicRunner();
    eyes = new Eyes(runner);
    const conf = new Configuration();
    conf.setApiKey('Y4FS7BNfkwEyLpf97sHrQu4IhGprSVtcmSF4z7JI3VLk110');
    conf.setBatch(new BatchInfo("personal_budget_test"));
    eyes.setConfiguration(conf)
  });

  it('should display title personal budget', async () => {
    await eyes.open(browser, 'personal budget', 'Login test', new RectangleSize(800, 600));
    page.navigateTo();

    var welcomeMessage = element.all(by.tagName('h1'));

    await eyes.check("Login Window", Target.window().fully());
    await eyes.close();

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
    await eyes.abortIfNotClosed();
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
