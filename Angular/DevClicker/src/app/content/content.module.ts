import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { GameService } from '../services/game.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GameLoaderService } from '../services/game-loader.service';
import { StructuresComponent } from './structures/structures.component';
import { PlayerUpgradeComponent } from './store/player-upgrade/player-upgrade.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'store', component: StoreComponent },
      { path: 'structures', component: StructuresComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ContentComponent,
    HomeComponent,
    StoreComponent,
    StructuresComponent,
    PlayerUpgradeComponent
  ],
  imports: [
    CommonModule,
    TabMenuModule,
    RouterModule.forChild(appRoutes),
    ButtonModule,
    CardModule
  ],
  exports: [ContentComponent],
  providers: [GameService, GameLoaderService]
})
export class ContentModule {}
