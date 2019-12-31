import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateToRoot() {
    return browser.get('/');
  }

  getNavBar(): ElementFinder {
    return element(by.tagName('nav'));
  }

  getSearchEstatesButton(): ElementFinder {
    return element(by.css('.btn'));
}

}
