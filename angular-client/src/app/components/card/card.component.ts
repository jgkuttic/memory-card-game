import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../models/card';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  
  @Input('card') card: Card;
  
  game: GameService;

  constructor(game: GameService) { 
    this.game = game;
  }

  ngOnInit(): void {
  }
}
