import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { NumberFormatTool } from 'src/app/utils/NumberFormatTool';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private gameService: GameService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {}

  getLines() {
    return NumberFormatTool.getNumberAsString(
      this.playerService.getPlayer()
        ? this.playerService.getPlayer().lines
        : '0'
    );
  }

  code() {
    this.gameService.code();
  }
}
