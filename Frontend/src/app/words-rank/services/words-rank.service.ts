import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, take } from "rxjs/operators";
import { WordsRankResultDto } from '../dtos/words-rank-result-dto';

@Injectable()
export class WordsRankService {

  private readonly baseUrl = 'http://localhost:8003/api'
  constructor(private http: HttpClient) { }

  public searchForTopics(topic: string): Observable<WordsRankResultDto[]>{
    if(!topic) return of([]);
    const topicUrl = `${this.baseUrl}/search/${topic}`
    return this.http
    .get(topicUrl)
    .pipe(
        map(result => result ? result as WordsRankResultDto[] : []),
        catchError(err => {
          console.error('Error in searchForTopics', err); 
            return of([])
        })
    )
  }
}
