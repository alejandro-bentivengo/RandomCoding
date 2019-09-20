import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerUpgrade } from 'src/app/model/player.upgrade';

@Component({
  selector: 'app-player-upgrade',
  templateUrl: './player-upgrade.component.html',
  styleUrls: ['./player-upgrade.component.css']
})
export class PlayerUpgradeComponent implements OnInit {
  @Input() playerUpgrade: PlayerUpgrade;
  @Output() upgradeBought = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  protected buyUpgrade() {
    this.upgradeBought.emit(this.playerUpgrade.id);
  }

  protected getPercentage() {
    return this.playerUpgrade.porcentualImprovement * 100;
  }
}
