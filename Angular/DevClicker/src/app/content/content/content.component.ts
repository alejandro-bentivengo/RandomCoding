import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GameService } from 'src/app/services/game.service';
import { GameLoaderService } from 'src/app/services/game-loader.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private gameService: GameService) {
    setInterval(() => {
      gameService.update();
    }, 200);
  }

  ngOnInit() {
    this.items = [
      { label: 'Your "room"', icon: 'fa fa-fw fa-home', routerLink: ['/home'] },
      { label: 'Store', icon: 'pi pi-money-bill', routerLink: ['/store'] },
      {
        label: 'HR and Properties',
        icon: 'fa fa-fw fa-code',
        routerLink: ['/structures']
      }
    ];
  }

  closeItem(event, index) {
    this.items = this.items.filter((item, i) => i !== index);
    event.preventDefault();
  }
}
