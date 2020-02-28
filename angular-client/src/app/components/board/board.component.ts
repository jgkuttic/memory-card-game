import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cards: Card[];

  constructor(game: GameService) { 
    this.cards = game.cards;
  }

  ngOnInit(): void {
  }

}
