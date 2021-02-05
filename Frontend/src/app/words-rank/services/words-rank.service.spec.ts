import { TestBed } from '@angular/core/testing';

import { WordsRankService } from './words-rank.service';

describe('WordsRankService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordsRankService = TestBed.get(WordsRankService);
    expect(service).toBeTruthy();
  });
});
