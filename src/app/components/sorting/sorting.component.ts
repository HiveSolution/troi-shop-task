import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../chip/chip.component';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [CommonModule, ChipComponent],
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent {
  private _productsService = inject(ProductsService);
  public sortKey = this._productsService.sortKey;
  public sortMode = this._productsService.sortMode;

  public sortKeys = [
    'price',
    'stock',
    'rating'
  ];

  public updateSortKey(sortKey: string) {
    this._productsService.updateSortKey(sortKey);
  }
}
