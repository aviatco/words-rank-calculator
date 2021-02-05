import { WordsRankResultDto } from "../dtos/words-rank-result.model";
import { ITopicFetcherService } from "../services/Itopic-fetcher.service";
import { ITopicController } from "./Itopic.controller";
import { NextFunction, Request, Response } from "express";
import { WordRankHelper } from "../utils/words-rank.helper";

export class TopicController implements ITopicController {

    constructor(private topicFetcherService: ITopicFetcherService){};

    public async getTopicContent(topic: string): Promise<any>{
        try{
            const firstTopic = await this.topicFetcherService.fetchTopicList(topic);
            return await this.topicFetcherService.fetchTopicContent(firstTopic);
        }catch(err) {
            console.error(`Failed to fetch topic, error:`, err);
            throw new Error(err);
        }
    }

    public wordsRateCalculator(textContent: string): WordsRankResultDto[]{
        try{
            const extractContent: string[] = WordRankHelper.extractCleanContent(textContent);
            return  extractContent.length ? WordRankHelper.wordsRateCalculator(extractContent): [];
        }catch(err) {
            console.error('error', err)
            throw new Error(err);
        }
    }

}