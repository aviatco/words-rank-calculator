export interface ITopicFetcherService {
    fetchTopicList(topic: string): Promise<string>;
    fetchTopicContent(topic: string): Promise<any>;
}