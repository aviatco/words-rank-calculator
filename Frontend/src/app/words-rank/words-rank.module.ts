import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRankService } from './services/words-rank.service';
import { WordsRankFacade } from './facade/words-rank.facade';
import { WordsRankComponent } from './components/words-rank.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';



@NgModule({
  declarations: [WordsRankComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
  ],
  exports: [WordsRankComponent],
  providers: [WordsRankService, WordsRankFacade, HttpClient]
})
export class WordsRankModule { }
