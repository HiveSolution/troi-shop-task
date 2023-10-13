import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  private _productsService = inject(ProductsService);

  public categories = this._productsService.categories;

  public get search() {
    return this._productsService.search();
  }
  public set search(value: string) {
    this._productsService.updateSearch(value);
  }

  public get category() {
    return this._productsService.category();
  }
  public set category(value: string) {
    this._productsService.updateCategory(value);
  }

}
