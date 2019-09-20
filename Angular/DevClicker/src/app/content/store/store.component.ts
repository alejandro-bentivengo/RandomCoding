import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { PlayerUpgrade } from 'src/app/model/player.upgrade';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit() {}

  getUpgradesForRow(i: number): Array<PlayerUpgrade> {
    const upgrades = this.gameService.getPlayerUpgradesToPurchase();
    if (upgrades.length === 0) {
      return upgrades;
    }
    switch (i) {
      case 1:
        if (upgrades.length < 3) {
          return upgrades.slice(0, upgrades.length);
        } else {
          return upgrades.slice(0, 3);
        }
      case 2:
        if (upgrades.length >= 4 && upgrades.length >= 6) {
          return upgrades.slice(3, 6);
        } else if (upgrades.length >= 4 && upgrades.length < 6) {
          return upgrades.slice(3, upgrades.length);
        }
        break;
      default:
    }
  }

  upgradeBought(event: number) {
    console.log(event);
    this.gameService.playerUpgradeBought(event);
  }
}
