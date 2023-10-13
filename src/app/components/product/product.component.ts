import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyJsonProduct } from 'src/app/interfaces/dummy-json.interface';
import { RatingComponent } from './rating/rating.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() public product!: DummyJsonProduct;
}
