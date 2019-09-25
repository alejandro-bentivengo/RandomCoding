import { Entity } from './entity';
import { Structure } from './structure';

export class Player extends Entity {
  lines: string;
  clicks: number;
  totalLines: string;
  ownedStructures: Array<Structure>;
}
