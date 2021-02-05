import { expect } from "chai";
import { WordRankHelper } from "../src/utils/words-rank.helper";


describe('WordsRankHalper', () => {
    let content: string;
    let wordsRankHash: {[key: string]: string[]};

    before(()=> {
        content = "car bicycle car bicycle car bicycle car bicycle car bicycle car bicycle plane plane truck";
    })

    it('word-rank-calculator should return  word-rank hash', ()=> {
        const result = WordRankHelper.wordsRateCalculator(content.split(" "));
        const expectedResult = [{word: "Bicycle", rank: "*****"}, 
        {word: "Car", rank: "*****"},
        {word: "Plane", rank: "**"},
        {word: "Truck", rank: "*"}   ]
    
        expect(result).to.deep.equals(expectedResult);
    })
    it('extractCleanContent should return  content clean from html tag and punctuation marks', ()=> {
        const content = {query: {pages: {123: {extract: "'<p>car <b>bicycle car bicycle car bicycle car</b> (<b>bicycle</b>; <span></span>) car bicycle car bicycle plane plane truck."}}}}
        const result = WordRankHelper.extractCleanContent(content);        
        const expectedResult: string[] = [
            'car',   'bicycle',
            'car',   'bicycle',
            'car',   'bicycle',
            'car',   'bicycle',
            'car',   'bicycle',
            'car',   'bicycle',
            'plane', 'plane',
            'truck'
          ]
    
        expect(result).to.deep.equals(expectedResult);
    })
    it('extractCleanContent with no content should return empty result', ()=> {
        const content = {query: {pages: {'-1': {extract: ""}}}}
        const result = WordRankHelper.extractCleanContent(content);        
        const expectedResult: string[] = []
    
        expect(result).to.deep.equals(expectedResult);
    })
});

