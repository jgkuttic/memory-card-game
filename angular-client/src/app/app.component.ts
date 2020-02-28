import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memory-game';

  constructor(private game: GameService, private router: Router){

  }

  newGame(){
    this.router.navigate(['']);
    this.game.startNewGame();
  }

  about(){
    this.router.navigate(['/about']);
  }
}
