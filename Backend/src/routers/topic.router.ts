import { Router, Request, Response, NextFunction } from "express";
import { wordsRateCalculator } from "../handlers/words-rank-calculator.handler";
import { ITopicController } from "../conrollers/Itopic.controller";
import { HttpException } from "../utils/http.error.type";

export class TopicRouter {
    public _router = Router();
    constructor(private readonly topicController: ITopicController){
        this._configure();
    };


    private  _configure() {
        this._router.get('/search/:topic', this.getContentByTopic ,wordsRateCalculator, async (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json(res.locals.wordsRankResult);
        });
    }


    private getContentByTopic = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const res1 = await this.topicController.getTopicContent(req.params.topic);
            res.locals.topicContent = res1//await this.topicController.getTopicContent(req.params.topic);
            next();
        }catch(err){
            next(new HttpException(204, err));
        }
        
    }

}