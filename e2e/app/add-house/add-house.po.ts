import { browser, by, element, ElementFinder } from 'protractor';

export class AddHouse {

  navigateToAddHouse() {
    return browser.get('/add-house');
  }

  getAddButton() {
    return element(by.css('.add-btn'));
  }

  getTypeSelectBox() {
    return element(by.css('#type'));
  }

  getSaveButton() {
    return element(by.css('.btn-success'));
  }

}
