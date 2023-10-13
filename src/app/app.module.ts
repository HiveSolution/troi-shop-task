import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FiltersComponent } from './components/filters/filters.component';
import { DividerComponent } from './components/divider/divider.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SortingComponent } from './components/sorting/sorting.component';
import { ProductsComponent } from './components/products/products.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FiltersComponent,
    DividerComponent,
    LoaderComponent,
    SortingComponent,
    ProductsComponent,
    PaginationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
