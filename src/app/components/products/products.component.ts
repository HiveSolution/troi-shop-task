import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyJsonProduct } from 'src/app/interfaces/dummy-json.interface';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Input() public products!: DummyJsonProduct[];
}
