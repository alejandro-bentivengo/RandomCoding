import { Injectable } from '@angular/core';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private player: Player;
  constructor() {
    this.player = new Player();
    this.player.clicks = 0;
    this.player.lines = '0';
    this.player.totalLines = '0';
    this.player.baseLines = '10';
    this.player.upgrades = new Array();
  }

  getPlayer() {
    return this.player;
  }
}
