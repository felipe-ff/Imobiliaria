import { browser } from 'protractor';
import { ListHouses } from '../list-houses/list-houses.po';

describe('imobiliaria App', () => {
  let listHouses: ListHouses;
  // let listHouses: ListHouses;

  beforeEach(() => {
    listHouses = new ListHouses;
    listHouses.navigateToListHouses();
  });

});
