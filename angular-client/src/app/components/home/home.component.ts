import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(gameService: GameService) { }

  ngOnInit(): void {
  }

  startNewGame(){
    console.log("implement code to start new game");
  }

}
