import sinon from 'sinon';
import { TopicFetcherService } from "../src/services/topic-fetcher.service";
import {TopicController} from "../src/conrollers/topic.controller";
import { expect } from 'chai';

describe('TopicRouter', () => {

    let apiResult: {};

    before(()=> {
        apiResult = {
            batchcomplete: '',
            warnings: {
            extracts: {
                '*': 'HTML may be malformed and/or unbalanced and may omit inline images. Use at your own risk.'
            }
            },
            query: { pages: { '18426568': {} } }
      }
    })
    
    it('TopicController getTopic should return the content of the first result of given topic', async ()=> {
        const topicFetcherServiceStub = sinon.createStubInstance(TopicFetcherService);
        topicFetcherServiceStub.fetchTopicList.withArgs('data').returns(Promise.resolve('test'));
        topicFetcherServiceStub.fetchTopicContent.withArgs('test').returns(Promise.resolve(apiResult))
        const result = await new TopicController(topicFetcherServiceStub).getTopicContent('data')
        expect(result).to.be.equals(apiResult);
    })
});