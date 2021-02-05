import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsRankComponent } from './words-rank.component';

describe('WordsRankComponent', () => {
  let component: WordsRankComponent;
  let fixture: ComponentFixture<WordsRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
