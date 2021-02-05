import { WordsRankResultDto } from "../dtos/words-rank-result.model";

export class WordRankHelper {

    private static rankRangeHash: {[key:number]: [number,number]};
    private static startsHash: {[key:number]: string} = {5:"*****", 4:"****", 3: "***", 2: "**",1: "*"};

    public static extractCleanContent(content: any): string[] {
        if(!this.validateContent(content)) return [];
        const pageId: number = Number(Object.keys(content.query.pages)[0]);
        if(pageId === -1) return [];
        const htmlTagRegex = /(<([^>]+)>)/gi;
        const punctuationMarksRegex = /['()\n;,.]/g;
        
        const cleanFromHtmlAndMarkscontent:string =  content.query.pages[pageId].extract.replace(htmlTagRegex, "").replace(punctuationMarksRegex,"").toLowerCase();
        const splitedcontent = cleanFromHtmlAndMarkscontent.split(' ').filter(val=> !!val);
        return splitedcontent;
    }

    public static wordsRateCalculator(content: string[]): WordsRankResultDto[] {
        const {wordOccurenceCount, maxOccurence}= WordRankHelper.calculateWordOccurenceCount(content);
        WordRankHelper.buildRankRange(maxOccurence);
        let wordsRankResult: {[key: string]: string[]} = {"*****": [], "****": [], "***": [], "**": [], "*":[]};
        for(const word in wordOccurenceCount){
            const rank :number = WordRankHelper.findRank(wordOccurenceCount[word]);
            if(rank > -1){
                wordsRankResult[WordRankHelper.startsHash[rank]].push(word);
            }

        }
        wordsRankResult = WordRankHelper.sortResult(wordsRankResult);
        return WordRankHelper.wordsRankMapper(wordsRankResult);
    }

    public static wordsRankMapper(wordRankHash: {[key: string]: string[]}){
        const res: WordsRankResultDto[] = [];
        Object.keys(wordRankHash).forEach(key => {
            res.push(...wordRankHash[key].map(word => {
                return {
                    word: WordRankHelper.titleCaseWord(word),
                    rank: key
                } as WordsRankResultDto
            }))
        });
        return res;
    }

    private static validateContent(content: any) {
        return (!content || !content.query || !content.query.pages || !content.query.pages.length);
    }

    private static sortResult(wordsRankResult:{[key: string]: string[]}) {
        for(const rank in wordsRankResult){
            wordsRankResult[rank].sort()
        }

        return wordsRankResult
    }
    private static calculateWordOccurenceCount(splitedcontent: string[]) {
        let maxOccurence: number = 0;
        const wordOccurenceCount: {[key: string]: number} = {};
        splitedcontent.forEach(word => {
            wordOccurenceCount[word] = wordOccurenceCount[word] ? wordOccurenceCount[word] + 1 : 1
            maxOccurence = maxOccurence < wordOccurenceCount[word] ? wordOccurenceCount[word] : maxOccurence;
        });

        return {wordOccurenceCount, maxOccurence};
    }

    private static titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
      }

    private static findRank(occurence: number): number{
        for(const key in WordRankHelper.rankRangeHash){
            if(occurence <=  WordRankHelper.rankRangeHash[key][1] && occurence >  WordRankHelper.rankRangeHash[key][0]){
                return +key;
            }
            else if(occurence ===  WordRankHelper.rankRangeHash[key][1] && WordRankHelper.rankRangeHash[key][1] === WordRankHelper.rankRangeHash[key][0] ){
                return +key;
            }
        }
        return -1;
    }

    private static buildRankRange(maxRange: number) {
        const rangeDevition: number = Math.floor(maxRange/4);
        WordRankHelper.rankRangeHash = {5: [rangeDevition*4,maxRange]};
        for(let i=4; i>0; i--){
            const prevLowerRange = WordRankHelper.rankRangeHash[i+1][0];
            WordRankHelper.rankRangeHash[i]= [prevLowerRange-rangeDevition, prevLowerRange]
        }
    }
}