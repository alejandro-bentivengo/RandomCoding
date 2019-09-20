import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { NumberFormatTool } from 'src/app/utils/NumberFormatTool';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private gameService: GameService) {}

  ngOnInit() {}

  getLines() {
    return NumberFormatTool.getNumberAsString(
      this.gameService.getPlayer().lines
    );
  }

  code() {
    this.gameService.code();
  }
}
