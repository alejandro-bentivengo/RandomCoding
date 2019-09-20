import { Injectable } from '@angular/core';
import { Structure } from '../model/structure.js';
import { HttpClient } from '@angular/common/http';
import { PlayerUpgrade } from '../model/player.upgrade.js';
import { StructureUpgrade } from '../model/structure.upgrade.js';

@Injectable({
  providedIn: 'root'
})
export class GameLoaderService {
  constructor(private http: HttpClient) {}

  async loadStructures(): Promise<Array<Structure>> {
    const value = await this.getResource('../../assets/structures.json');
    return value['objects'] as Array<Structure>;
  }

  async loadStructuresUpgrades(): Promise<Array<StructureUpgrade>> {
    const value = await this.getResource(
      '../../assets/structure-upgrades.json'
    );
    return value['objects'] as Array<StructureUpgrade>;
  }

  async loadPlayerUpgrades(): Promise<Array<PlayerUpgrade>> {
    const value = await this.getResource('../../assets/player-upgrades.json');
    return value['objects'] as Array<PlayerUpgrade>;
  }

  private getResource(path: string): Promise<any> {
    return this.http.get(path).toPromise();
  }
}
