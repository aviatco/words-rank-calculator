import express from 'express';
import cors from 'cors';
import { TopicController } from './conrollers/topic.controller';
import { TopicRouter } from './routers/topic.router';
import { TopicFetcherService } from './services/topic-fetcher.service';
import { errorHandler } from './handlers/error.handler';

export class App {
    public app;
    constructor(){
        this.app = express();
        this.initApp();
    }
    
    private initApp(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use('/api', new TopicRouter(new TopicController(new TopicFetcherService()))._router);
        this.app.use(new errorHandler().handleHttpError);   
    }
}