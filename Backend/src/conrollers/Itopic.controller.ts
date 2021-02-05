import { WordsRankResultDto } from "../dtos/words-rank-result.model";
import { NextFunction, Request, Response } from "express";

export interface ITopicController {
    getTopicContent(topic: string):  Promise<string>;
    wordsRateCalculator(textContent: string): WordsRankResultDto[]
}