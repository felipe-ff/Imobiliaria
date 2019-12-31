import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('imobiliaria App', () => {
  let rootPage: AppPage;

  beforeEach(() => {
    rootPage = new AppPage();
    rootPage.navigateToRoot();
  });

  it('Should locate the nav bar', () => {
    expect(rootPage.getNavBar()).toBeDefined();
  });

  it('Should redirect to the estates list page when search is clicked', () => {
    const estateList = rootPage.getSearchEstatesButton();
    estateList.click();
    expect(browser.driver.getCurrentUrl()).toContain('/list-houses');
  });

});
