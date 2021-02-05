import axios, { AxiosResponse } from 'axios';
import { ITopicFetcherService } from './Itopic-fetcher.service';

export class TopicFetcherService implements ITopicFetcherService{
    private readonly baseUrl = "https://en.wikipedia.org/w/api.php";

    public async fetchTopicList(topic: string): Promise<string> {
        const topicUrl = `${this.baseUrl}?action=opensearch&search=${topic}`;
        try{
             const listOfTopics: AxiosResponse = await axios.get(topicUrl);;
             const firstTopic:string = listOfTopics.data[0];
             return firstTopic;
         }catch(err){
             console.error(`Failed to fetch data from ${topicUrl}, error:`, err);
             throw new Error(err);
         }
    }

    public async fetchTopicContent(topic: string): Promise<any> {
        try{
            const contentUrl = `${this.baseUrl}?action=query&prop=extracts&format=json&exintro=&titles=${topic}`;
            const contentData: AxiosResponse =  await axios.get(contentUrl);
            return contentData.data;
        }catch(err){
            console.error(`Failed to fetch data from ${this.baseUrl}, error:`, err);
            throw new Error(err);
        }
    }
}