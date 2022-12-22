import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoriesListingComponent } from './stories-listing/stories-listing.component';
import { SourceListingComponent } from './source-listing/source-listing.component';


const routes: Routes = [
  {path: 'home', component: StoriesListingComponent},
  {path: 'source_listing',component: SourceListingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
