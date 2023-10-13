import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  private _productsService = inject(ProductsService);
  public total = this._productsService.total;
  public skip = this._productsService.skip;
  public limits = [10, 25, 50, 100];

  public get limit() {
    return this._productsService.limit();
  }
  public set limit(value: number) {
    this._productsService.updateLimit(Number(value));
  }

  public get currentPage() {
    return Math.ceil(this.skip() / this.limit) + 1;
  }

  public get pages(): number[] {
    let pages = Array.from(Array(Math.ceil(this.total() / this.limit)), (_, i) => i + 1);

    const currentPage = this.currentPage;
    const lastPage = pages.length;

    if (pages.length > 5 && currentPage > 3) {
      if (currentPage + 2 > lastPage) {
        pages = pages.slice(-5);
      } else {
        pages = pages.slice(currentPage - 3, currentPage + 2);
      }
    } else if (pages.length > 5) {
      pages = pages.slice(0, 5);
    }

    return pages;
  }

  public previousPage() {
    const page = this.currentPage;
    this._productsService.updateSkip(page > 1 ? this.skip() - this.limit : 0);
  }

  public nextPage() {
    const page = this.currentPage;
    this._productsService.updateSkip(page < Math.ceil(this.total() / this.limit) ? this.skip() + this.limit : this.skip());
  }

  public selectPage(page: number) {
    this._productsService.updateSkip((page - 1) * this.limit);
  }
}
