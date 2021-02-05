import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordsRankComponent } from './words-rank/components/words-rank.component';


const routes: Routes = [
  {path: "wordsRank", component: WordsRankComponent},
  { path: "", redirectTo: "/wordsRank", pathMatch: "full" },
  { path: "**", component: WordsRankComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
