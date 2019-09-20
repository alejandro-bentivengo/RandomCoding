import { Appliance } from './appliance';

export abstract class Upgrade<T> {
  id: number;
  name: string;
  description: string;
  conditions: Array<any>;
  cost: string;
  target: T;
  porcentualImprovement: number;
  appliance: Appliance;
}
