import { NextFunction, Response, Request } from "express";
import { HttpException } from "../utils/http.error.type";
import { WordsRankResultDto } from "../dtos/words-rank-result.model";
import { WordRankHelper } from "../utils/words-rank.helper";


export const wordsRateCalculator = (request: Request, response: Response, next: NextFunction): void  => {
    try{
        const content: string[] = WordRankHelper.extractCleanContent(response.locals.topicContent);
        if(content.length === 0) next(new HttpException(204, 'No content'));
        response.locals.wordsRankResult = WordRankHelper.wordsRankCalculator(content);
        next();
    }catch(err) {
        console.error('error', err)
        throw new Error(err);
    }
}