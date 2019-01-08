export class Subscriber {

  entityId: string;
  entityType: string;
  subscriber: number;
  callStart: number;
  callEnd: number;
  cdrIndex: {charge: number, duration: number, entityId: number, eventType: number};
  charge: number;
  fromNumber: number;
  toNumber: number;
  timekey: number;
  chargeTime: string;
}
