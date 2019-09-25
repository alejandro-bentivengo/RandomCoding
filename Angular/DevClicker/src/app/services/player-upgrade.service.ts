import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Upgrade } from '../model/upgrade';
import { ConditionType } from '../model/condition.type';
import { PlayerUpgrade } from '../model/player.upgrade';
import { GameLoaderService } from './game-loader.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerUpgradeService {
  private playerUpgradesToPurchase = new Array<PlayerUpgrade>();
  private playerUpgrades: Array<PlayerUpgrade>;
  constructor(
    private playerService: PlayerService,
    private gameLoaderService: GameLoaderService
  ) {
    this.loadGame().then(() => {
      this.calculateUpgrades();
    });
  }

  async loadGame() {
    this.playerUpgrades = await this.gameLoaderService.loadPlayerUpgrades();
  }

  getPlayerUpgrades(): PlayerUpgrade[] {
    return this.playerUpgrades;
  }

  getPlayerUpgradesToPurchase(): PlayerUpgrade[] {
    return this.playerUpgradesToPurchase;
  }

  calculateUpgrades() {
    for (const upgrade of this.playerUpgrades) {
      let found = false;
      for (const playerUpgrade of this.playerService.getPlayer().upgrades) {
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

  playerUpgradeBought(event: number) {
    let i = 0;
    for (const upgrade of this.playerUpgradesToPurchase) {
      if (upgrade.id === event) {
        if (
          BigInt(this.playerService.getPlayer().lines) >= BigInt(upgrade.cost)
        ) {
          this.playerService.getPlayer().upgrades.push(upgrade);
          this.playerUpgradesToPurchase.splice(i, 1);
          this.playerService.getPlayer().lines = (
            BigInt(this.playerService.getPlayer().lines) - BigInt(upgrade.cost)
          ).toString();
          break;
        }
      }
      i++;
    }
  }

  playerMeetsCondition(upgrade: Upgrade<any>) {
    let conditions = true;
    for (const condition of upgrade.conditions) {
      if (conditions) {
        switch (condition.conditionType) {
          case ConditionType.PREV:
            if (!this.isPrevPurchased(upgrade)) {
              conditions = false;
            }
            break;
          case ConditionType.SPEC:
            if (!this.isUpgradePurchased(condition.value)) {
              conditions = false;
            }
            break;
          case ConditionType.LINES:
            if (!this.isLineCountAchieved(condition.value)) {
              conditions = false;
            }
            break;
          default:
            throw new Error('Not implemented');
        }
      } else {
        break;
      }
    }
    return conditions;
  }

  isLineCountAchieved(value: any) {
    return BigInt(this.playerService.getPlayer().totalLines) >= BigInt(value);
  }

  isUpgradePurchased(id: number): boolean {
    let val = false;
    for (const temp of this.playerService.getPlayer().upgrades) {
      if (temp.id === id) {
        val = true;
      }
      if (val) {
        break;
      }
    }
    return val;
  }

  isPrevPurchased(upgrade: Upgrade<any>): boolean {
    let val = false;
    for (const temp of this.playerService.getPlayer().upgrades) {
      if (temp.id === upgrade.id - 1) {
        val = true;
      }
      if (val) {
        break;
      }
    }
    return val;
  }
}
