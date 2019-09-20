import { Upgrade } from './upgrade';

export abstract class Entity {
  id: number;
  name: string;
  baseLines: string;
  upgrades: Array<Upgrade<any>>;
}
