import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../models/card';
import { GameService } from 'src/app/services/game.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  card_list = ['ansible', 'terraform', 'kubernetes', 'spinnaker', 'splunk', 'jenkins', 'azure', 'aws'];
  default_front_card = "../../assets/citrix.png";
  cards = [];
  faceup: boolean;
  matched: boolean;
  front_image: string;
  back_image: string;
  symbol: string; 

  flipped_cards = [];
  matched_cards = [];

  card_pic_dir = "../../../assets/cards/";

  ext = ".png";

  MAX_CARDS = 16;

  moves = 0;

  @Input('card') selectedCard: Card;

  firstCard: Card;
  secondCard: Card;

  hasFlipped: boolean;

  constructor(gameService: GameService) { }

  ngOnInit(): void {

    for(let i = 0; i < this.card_list.length; i++){
      let card1 = new Card(false, false, false, this.default_front_card, this.card_pic_dir + this.card_list[i] + this.ext, this.card_list[i]);
      let card2 = new Card(false, false, false, this.default_front_card, this.card_pic_dir + this.card_list[i] + this.ext, this.card_list[i]);
      this.cards.push(card1);
      this.cards.push(card2);
    }
    this.dotheShuffle();
    this.startNewGame();
  }

  startNewGame() {
    this.hasFlipped = false;
    this.matched_cards = [];
    this.flipped_cards = [];
    this.firstCard = null;
    this.secondCard = null;
    for(let i = 0; i < this.cards.length; i++){
      this.cards[i].matched = false;
      this.cards[i].disabled = false;
      this.cards[i].faceup = false;
    }
  }

  flipCard(card: Card){
    /* console.log(card);
    if(this.flipped_cards.length > 2) return;
    if(card === this.firstCard) return;

    if(!this.hasFlipped){
      //first card clicked
      this.hasFlipped = true;
      this.firstCard = card;
      this.firstCard.faceup = !this.firstCard.faceup;
      //this.firstCard.disabled = !this.firstCard.disabled;
      this.flipped_cards.push(this.firstCard);
    } else {
        //second card clicked
      this.secondCard = card;
      this.secondCard.faceup = !this.secondCard.faceup;
      //this.secondCard.disabled = !this.secondCard.disabled;
      console.log(this.secondCard.faceup);
      this.flipped_cards.push(this.secondCard);
      this.disable();
    } 

    console.log(this.flipped_cards);

    if(this.flipped_cards.length == 2){
      this.moveCounter();
      let isMatched = this.isSymbolMatch(this.flipped_cards[0], this.flipped_cards[1]); 
      if(isMatched){
        this.cardsMatched();
      } else {
        this.cardsUnmatched();
      }
    } else {
      return;
    } */
    this.selectedCard = card;
    if(this.selectedCard === this.firstCard || this.flipped_cards.length > 2) {
      this.reset();
      return;
    }
    
    //card.faceup = !card.faceup;
    if(this.firstCard === null){
      this.firstCard = this.selectedCard;
      card.faceup = !card.faceup;
      this.selectedCard.disabled = !this.selectedCard.disabled;
      this.firstCard.faceup = !this.firstCard.faceup;
      this.firstCard.disabled = !this.firstCard.disabled;
      this.flipped_cards.push(this.firstCard);
    } else if(this.secondCard === null) {
      this.secondCard = card;
      this.selectedCard.faceup = !this.selectedCard.faceup;
      this.selectedCard.disabled = !this.selectedCard.disabled;
      this.secondCard.faceup = !this.secondCard.faceup;
      this.secondCard.disabled = !this.secondCard.disabled;
      this.flipped_cards.push(this.secondCard);
    }
    
    console.log(this.flipped_cards);

    if(this.flipped_cards.length == 2 && this.firstCard !== null && this.secondCard !== null){
      let isMatch = this.isSymbolMatch(this.firstCard, this.secondCard);
      console.log("isMatch: " + isMatch);
      this.reset();
    }
    
  }

  isSymbolMatch(card1: Card, card2: Card){
    if(card1.symbol === card2.symbol) {
      return true;
    }
    return false;
  }

  cardsMatched(){
    this.flipped_cards[0].matched = true;
    this.flipped_cards[0].faceup = true;
    this.flipped_cards[0].disabled = true;
    this.flipped_cards[1].matched = true;
    this.flipped_cards[1].faceup = true;
    this.flipped_cards[1].disabled = true;
    this.matched_cards.push(this.flipped_cards[0]);
    this.matched_cards.push(this.flipped_cards[1]);
    this.firstCard = null;
    this.secondCard = null;
    this.flipped_cards = [];
    this.enable();
  }

  cardsUnmatched(){
    this.flipped_cards[0].matched = false;
    this.flipped_cards[1].matched = false;
    this.firstCard = null;
    this.secondCard = null;
    this.disable();
    setTimeout(()=> {
      this.flipped_cards[0].faceup = false;
      this.flipped_cards[1].faceup = false;
      this.enable();
      this.flipped_cards = [];
      this.hasFlipped = false;
    }, 1200);
  }

  disable(){
    for(let i = 0; i < this.cards.length; i++){
        this.cards[i].disabled = true;
    }
  }

  enable(){
    for(let i = 0; i < this.cards.length; i++){
      for(let j = 0; j < this.matched_cards.length; j++){
        if(this.cards[i].symbol === this.matched_cards[j].symbol){
          this.cards[i].matched = true;
          this.cards[i].faceup = true;
          this.cards[i].disabled = true;
        }
      }
      this.cards[i].matched = false;
      this.cards[i].faceup = false;
      this.cards[i].disabled = false;
    }
    
    this.flipped_cards = [];
  }

  dotheShuffle(){
    let cardDeck = this.cards;
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
  }

  reset(){
    this.hasFlipped = false;
    this.flipped_cards = [];
    this.firstCard = null;
    this.secondCard = null;
  }

  moveCounter(){
    this.moves++;
    console.log(this.moves);
  }

}
