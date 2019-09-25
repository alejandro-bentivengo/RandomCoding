import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerUpgrade } from 'src/app/model/player.upgrade';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerUpgradeService } from 'src/app/services/player-upgrade.service';

@Component({
  selector: 'app-player-upgrade',
  templateUrl: './player-upgrade.component.html',
  styleUrls: ['./player-upgrade.component.css']
})
export class PlayerUpgradeComponent implements OnInit {
  @Input() playerUpgrade: PlayerUpgrade;
  @Output() upgradeBought = new EventEmitter<number>();

  constructor(
    protected gameService: GameService,
    private playerService: PlayerService,
    private playerUpgradeService: PlayerUpgradeService
  ) {}

  ngOnInit() {}

  protected buyUpgrade() {
    this.upgradeBought.emit(this.playerUpgrade.id);
  }

  protected getPercentage() {
    return this.playerUpgrade.porcentualImprovement * 100;
  }

  protected canBuy() {
    console.log(
      BigInt(this.playerService.getPlayer().lines) >=
        BigInt(this.playerUpgrade.cost) &&
        (this.playerUpgrade.conditions.length > 0
          ? this.playerCondition()
          : true)
    );
    return (
      BigInt(this.playerService.getPlayer().lines) >=
        BigInt(this.playerUpgrade.cost) &&
      (this.playerUpgrade.conditions.length > 0 ? this.playerCondition() : true)
    );
  }

  protected playerCondition() {
    return this.playerUpgradeService.playerMeetsCondition(this.playerUpgrade);
  }
}
