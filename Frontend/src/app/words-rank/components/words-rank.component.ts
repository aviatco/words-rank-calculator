import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { WordsRankResultDto } from '../dtos/words-rank-result-dto';
import { WordsRankFacade } from '../facade/words-rank.facade';
import { WordsRankService } from '../services/words-rank.service';

@Component({
  selector: 'app-words-rank',
  templateUrl: './words-rank.component.html',
  styleUrls: ['./words-rank.component.scss']
})
export class WordsRankComponent implements OnInit {

  wordsRankSub: Subscription;
  wordsRank: WordsRankResultDto[] = [];
  searchInProgress: boolean = false;
  topic: string = "";
  displayedColumns: string[] = ['word', 'rank'];

  constructor(private wordsRankFacade: WordsRankFacade) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public searchTopic(){
    this.searchInProgress = true;
    this.wordsRank = [];
    this.wordsRankFacade.searchForTopics(this.topic)
    .pipe(take(1),
    catchError(err => {
      this.searchInProgress = false;
      console.error(err);
      return of([]);
    }))
    .subscribe(result => {
      this.searchInProgress = false;
      this.topic = "";
      this.wordsRank = result;
    });
    
   
  }

}
