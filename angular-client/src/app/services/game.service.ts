import { Injectable } from '@angular/core';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  card_list = ['ansible', 'terraform', 'kubernetes', 'spinnaker', 'splunk', 'jenkins', 'azure', 'aws'];
  default_front_card = "../../assets/citrix.png";
  card_pic_dir = "../../assets/cards/";

  ext = ".png";

  MAX_CARDS = 16;
  
  cards: Card[] = [];

  matchedCards = [];

  moves: number = 0;

  isGameOver: boolean = false;

  flippedCards = [];
  
  numberOfFlippedCards: number;
  
  second: number;

  minute: number;

  hour: number; 

  time: any;

  constructor() {
    this.startNewGame();
   }

  startNewGame(){
    this.isGameOver = false;
    this.matchedCards = [];
    this.flippedCards = [];
    this.numberOfFlippedCards = 0;
    this.moves = 0;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
    

    if (this.cards.length) {
      this.cards.map((card)=> {
        card.faceup = false;
      });
      setTimeout(()=>{
        this.cards = this.dotheShuffle(this.cards);
      },300);
      return;
    }

    this.cards = [];
    this.cards = this.getCards(this.cards);

  }

  getCards(cards: Card[]){
    for(let i = 0; i < this.card_list.length; i++){
      let card1 = new Card(false, false, false, this.default_front_card, this.card_pic_dir + this.card_list[i] + this.ext, this.card_list[i]);
      let card2 = new Card(false, false, false, this.default_front_card, this.card_pic_dir + this.card_list[i] + this.ext, this.card_list[i]);
      cards.push(card1);
      cards.push(card2);
    }
    cards = this.dotheShuffle(cards);
    return cards;
  }

  flipCard(card: Card){
    if(!card.faceup && this.flippedCards.length < 2){
      if(this.flippedCards.length == 0){
        card.faceup = true;
        this.flippedCards.push(card);
        this.flippedCards[0].faceup = true;
      } else if(this.flippedCards.length == 1){
        this.moveCounter();
        
        if(this.moves == 1){
          this.startTimer();
        }

        card.faceup = true;

        this.flippedCards.push(card);
        this.flippedCards[1].faceup = true;


        if(this.flippedCards[0].symbol === this.flippedCards[1].symbol){
          this.numberOfFlippedCards += 2;
          this.flippedCards = [];

          if(this.numberOfFlippedCards == this.cards.length){
            this.isGameOver = true;
            this.stopTimer();
            console.log("Game is over!");
          }
        } else {
          setTimeout(()=> {
            this.flippedCards[0].faceup = false;
            this.flippedCards[1].faceup = false;
            this.flippedCards = [];
          }, 750);
        }
      }
    }
  }

  moveCounter(){
    this.moves++;
  }

  startTimer(){
    this.time = setInterval(function(){
        this.second++;
        if(this.second == 60){
            this.minute++;
            this.second=0;
        }
        if(this.minute == 60){
            this.hour++;
            this.minute = 0;
        }
    }, 1000);
  }

  stopTimer(){
    clearInterval(this.time);
  }

  dotheShuffle(cards: Card[]){
    let cardDeck = cards;
    let currentIndex = cardDeck.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardDeck[currentIndex];
        cardDeck[currentIndex] = cardDeck[randomIndex];
        cardDeck[randomIndex] = temporaryValue;
    }
    return cardDeck;
  }

}
