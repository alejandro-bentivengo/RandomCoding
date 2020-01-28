import { Injectable } from '@angular/core';
import { Appliance } from '../model/appliance';
import { GameLoaderService } from './game-loader.service';
import { Structure } from '../model/structure';
import { StructureUpgrade } from '../model/structure.upgrade';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private structures: Array<Structure>;
  private structuresUpgrades: Array<StructureUpgrade>;

  constructor(
    private gameLoaderService: GameLoaderService,
    private playerService: PlayerService
  ) {
    this.loadGame().then(() => {
      this.loadProperties();
    });
  }
  private async loadGame() {
    this.structures = await this.gameLoaderService.loadStructures();
    this.structuresUpgrades = await this.gameLoaderService.loadStructuresUpgrades();
  }

  private loadProperties() {}

  update() {
    // console.info('Update');
  }

  code() {
    let lines = this.playerService.getPlayer().baseLines;
    let multiplier = 1;
    for (const upgrade of this.playerService.getPlayer().upgrades) {
      console.log(upgrade);
      switch (upgrade.appliance) {
        case Appliance.ALL:
          multiplier = multiplier * (upgrade.porcentualImprovement + 1);
          break;
        case Appliance.BASE:
          lines = (
            BigInt(lines) +
            (BigInt(this.playerService.getPlayer().baseLines) *
              BigInt(upgrade.porcentualImprovement * 100)) /
              100n
          ).toString();
          break;
        default:
          console.error('Something went wront!');
      }
    }
    lines = ((BigInt(lines) * BigInt(multiplier * 100)) / 100n).toString();
    this.playerService.getPlayer().lines = (
      BigInt(this.playerService.getPlayer().lines) + BigInt(lines)
    ).toString();
    this.playerService.getPlayer().totalLines = (
      BigInt(this.playerService.getPlayer().totalLines) + BigInt(lines)
    ).toString();
  }

  getStructures(): Array<Structure> {
    return this.structures;
  }
}
