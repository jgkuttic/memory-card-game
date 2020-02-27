import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  hasFlipped: boolean;
  lockBoard: boolean;
  firstCard: Card;
  secondCard: Card;

  matchedCards = [];

  moves = 0;

  constructor() { }

  startNewGame(){
    this.resetBoard();
  }

  disableCards() {
    this.firstCard.matched = true;
    this.secondCard.matched = true;
    
    this.resetBoard();
  }

  resetBoard(){
    this.hasFlipped = false;
    this.lockBoard = false;
    this.firstCard = null;
    this.secondCard = null;
  }

  moveCounter(){
    this.moves++;
  }

  dotheShuffle(){
  }

}
