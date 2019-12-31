import { browser, by, element } from 'protractor';
import { AddHouse } from '../add-house/add-house.po';

describe('imobiliaria add-house', () => {
  let addHouse: AddHouse;

  beforeEach(() => {
    addHouse = new AddHouse();
    addHouse.navigateToAddHouse();
  });

  it('Should save a new house', async () => {
    element(by.cssContainingText('option', 'Comercial')).click();

    await addHouse.getSaveButton().click();

    browser.driver.wait(async () => {
      const url = await browser.driver.getCurrentUrl();
      return /list-houses/.test(url);
    }, 2200);
  });

});
