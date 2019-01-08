export class Preset {

  id: number;
  name: string;
  subscriber: string;
  toNumber: string;
  fromNumber: string;
  minDuration: number;
  maxDuration: number;
  typeDuration: string;
  minValue: number;
  maxValue: number;
  typeValue: string;
  startDatetime: number;
  startHour: number;
  endHour: number;
  endDatetime: number;
  eotA: string;
  trunkInput: string;
  trunkOutput: string;
  tton: string;
  eotInputRoute: string;
  numberInputRoute: string;
  numberOutputRoute: string;
  eotANotEqualEotInputRoute: boolean;
  loadStartDatetime: number;
  loadEndDatetime: number;
  /* Não tem definição ainda:
  * firstOrderField: string;
  * OrderTypeEnum firtsOrderOption;
  * secondOrderField: string;
  * OrderTypeEnum secondOrderOption;
  * thirdOrderField: string;
  OrderTypeEnum thirdOrderOption; */
  groupingType: string; //TODO: FAZER
  flagGroup: string;
  callQueryType: string;
}
