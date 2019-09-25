import { Appliance } from './appliance';
import { Condition } from './condition';

export abstract class Upgrade<T> {
  id: number;
  name: string;
  description: string;
  conditions: Array<Condition>;
  cost: string;
  target: T;
  porcentualImprovement: number;
  appliance: Appliance;
}
