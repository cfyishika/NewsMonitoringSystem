import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoriesListingComponent } from './stories-listing/stories-listing.component';
import { HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStoryComponent } from './add-story/add-story.component';
import { SourceListingComponent } from './source-listing/source-listing.component';
import { AddSourceComponent } from './add-source/add-source.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteSourceComponent } from './delete-source/delete-source.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    StoriesListingComponent,
    NavbarComponent,
    AddStoryComponent,
    SourceListingComponent,
    AddSourceComponent,
    DeleteSourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
