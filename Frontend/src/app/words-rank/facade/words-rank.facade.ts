import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { WordsRankResultDto } from "../dtos/words-rank-result-dto";
import { WordsRankService } from "../services/words-rank.service";


@Injectable()

export class WordsRankFacade {

    constructor(private readonly wordsRankService: WordsRankService){}

    searchForTopics(topic: string):Observable<WordsRankResultDto[]>{
        return this.wordsRankService.searchForTopics(topic);
    }
}