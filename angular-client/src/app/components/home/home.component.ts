import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  game: GameService;
  constructor(game: GameService) { 
    this.game = game;
  }

  ngOnInit(): void {
  }

  startNewGame(){
    this.game.startNewGame();
  }

}
