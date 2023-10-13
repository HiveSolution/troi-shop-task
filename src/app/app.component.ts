import { Component, inject } from '@angular/core';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _productsService = inject(ProductsService);
  public products = this._productsService.products;
  public loading = this._productsService.loading;
  public total = this._productsService.total;
}
