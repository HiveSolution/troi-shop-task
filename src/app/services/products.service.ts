import { Injectable, signal } from '@angular/core';
import { DummyJsonProduct, DummyJsonResponse } from '../interfaces/dummy-json.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _unfilteredProducts = signal<DummyJsonProduct[]>([]);
  private _debounceSearchTimeout: unknown | undefined;
  public products = signal<DummyJsonProduct[]>([]);
  public search = signal<string>('');
  public skip = signal<number>(0);
  public limit = signal<number>(10);
  public total = signal<number>(0);
  public categories = signal<string[]>([]);
  public category = signal<string>('');
  public loading = signal<boolean>(false);
  public sortKey = signal<string | 'none'>('none');
  public sortMode = signal<'disabled' | 'asc' | 'desc'>('disabled');

  constructor() {
    this.updateProducts();
  }

  private async updateProducts() {
    this.loading.set(true);
    const uri = 'https://dummyjson.com/products';
    const search = this.search();
    const response = await fetch(search ? `${uri}/search?q=${search}&limit=100` : `${uri}?limit=100`);
    const data: DummyJsonResponse = await response.json();
    data.products.map(product => {
      if (product.discountPercentage) product.discountPrice = product.price - (product.price * product.discountPercentage / 100);
      return product;
    })
    this._unfilteredProducts.set([...data.products]);

    const categoriesResponse = await fetch('https://dummyjson.com/products/categories');
    const categoriesData: string[] = await categoriesResponse.json();
    this.categories.set(['', ...categoriesData.sort()]);

    this.setProducts();
  }

  private filterProducts(products: DummyJsonProduct[]) {
    const category = this.category();
    if (category) {
      return products.filter(product => product.category === category);
    }
    return products;
  }

  private setProducts() {
    let products = [...this.filterProducts(this._unfilteredProducts())]
    this.total.set(products.length);

    let sortKey = this.sortKey();
    const sortMode = this.sortMode();

    if (sortMode !== 'disabled') {
      if (sortKey === 'price') sortKey = 'discountPrice';
      products.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortMode === 'asc' ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortMode === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    const skip = this.skip();
    const limit = this.limit();

    products = products.slice(skip, skip + limit);

    this.products.set(products);
    if (this.loading()) this.loading.set(false);
  }

  public updateSearch(search: string) {
    this.skip.set(0);
    this.search.set(search);
    this.debounceSearch();
  }

  private debounceSearch() {
    if (this._debounceSearchTimeout) {
      clearTimeout(this._debounceSearchTimeout as number);
    }
    this._debounceSearchTimeout = setTimeout(() => {
      this.updateProducts();
      this._debounceSearchTimeout = undefined;
    }, 250);
  }

  public updateSkip(skip: number) {
    this.skip.set(skip);
    this.setProducts();
  }

  public updateLimit(limit: number) {
    this.skip.set(0);
    this.limit.set(limit);
    this.setProducts();
  }

  public updateCategory(category: string) {
    this.skip.set(0);
    this.category.set(category);
    this.setProducts();
  }

  public updateSortKey(sortKey: string) {
    this.skip.set(0);

    const currentSortKey = this.sortKey();

    if (sortKey !== currentSortKey) {
      this.sortMode.set('asc');
      this.sortKey.set(sortKey);
    } else {
      const currentSortMode = this.sortMode();
      switch (currentSortMode) {
        case 'disabled':
          this.sortMode.set('asc');
          break;
        case 'asc':
          this.sortMode.set('desc');
          break;
        case 'desc':
          this.sortMode.set('disabled');
          break;
      }
    }

    this.setProducts();
  }
}
