import { browser, by, element, ElementFinder } from 'protractor';

export class ListHouses {

  navigateToListHouses() {
    return browser.get('/list-houses');
  }

}
