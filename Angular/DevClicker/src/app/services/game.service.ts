import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { PlayerUpgrade } from '../model/player.upgrade';
import { Appliance } from '../model/appliance';
import { GameLoaderService } from './game-loader.service';
import { Structure } from '../model/structure';
import { StructureUpgrade } from '../model/structure.upgrade';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private clockSpeed: number;
  private player: Player;
  private structures: Array<Structure>;
  private structuresUpgrades: Array<StructureUpgrade>;
  private playerUpgrades: Array<PlayerUpgrade>;
  private gameLoaded = false;
  private playerUpgradesToPurchase = new Array<PlayerUpgrade>();

  constructor(private gameLoaderService: GameLoaderService) {
    this.loadGame().then(() => {
      this.loadProperties();
      this.calculateUpgrades();
      this.finishedLoading();
    });
  }
  private async loadGame() {
    this.structures = await this.gameLoaderService.loadStructures();
    this.structuresUpgrades = await this.gameLoaderService.loadStructuresUpgrades();
    this.playerUpgrades = await this.gameLoaderService.loadPlayerUpgrades();

    this.clockSpeed = 1000;
    this.player = new Player();
    this.player.clicks = 0;
    this.player.lines = '0';
    this.player.baseLines = '10';
    this.player.upgrades = new Array();
  }

  calculateUpgrades() {
    for (const upgrade of this.getPlayerUpgrades()) {
      let found = false;
      for (const playerUpgrade of this.getPlayer().upgrades) {
        if (playerUpgrade.id === upgrade.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        this.playerUpgradesToPurchase.push(upgrade);
      }
    }
    this.playerUpgradesToPurchase.sort((a, b) => a.id - b.id);
  }

  finishedLoading() {
    this.gameLoaded = true;
  }

  isGameLoaded(): boolean {
    return this.gameLoaded;
  }

  private loadProperties() {}

  update() {
    // console.info('Update');
  }

  code() {
    let lines = this.player.baseLines;
    let multiplier = 1;
    for (const upgrade of this.player.upgrades) {
      console.log(upgrade);
      switch (upgrade.appliance) {
        case Appliance.ALL:
          multiplier = multiplier * (upgrade.porcentualImprovement + 1);
          break;
        case Appliance.BASE:
          lines = (
            BigInt(lines) +
            (BigInt(this.player.baseLines) *
              BigInt(upgrade.porcentualImprovement * 100)) /
              100n
          ).toString();
          break;
        default:
          console.error('Something went wront!');
      }
    }
    lines = ((BigInt(lines) * BigInt(multiplier * 100)) / 100n).toString();
    console.log(lines);
    this.player.lines = (BigInt(this.player.lines) + BigInt(lines)).toString();
  }

  playerUpgradeBought(event: number) {
    let i = 0;
    for (const upgrade of this.playerUpgradesToPurchase) {
      if (upgrade.id === event) {
        if (BigInt(this.player.lines) >= BigInt(upgrade.cost)) {
          this.player.upgrades.push(upgrade);
          this.playerUpgradesToPurchase.splice(i, 1);
          this.player.lines = (
            BigInt(this.player.lines) - BigInt(upgrade.cost)
          ).toString();
          break;
        }
      }
      i++;
    }
  }

  getClockSpeed(): number {
    return this.clockSpeed;
  }

  getPlayer(): Player {
    return this.player;
  }
  getStructures(): Array<Structure> {
    return this.structures;
  }
  getPlayerUpgrades(): Array<PlayerUpgrade> {
    return this.playerUpgrades;
  }

  getPlayerUpgradesToPurchase(): Array<PlayerUpgrade> {
    return this.playerUpgradesToPurchase;
  }
}
