import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  @Input() public label!: string;
  @Input() @HostBinding('class.chip') public selfClass = true;
  @Input() @HostBinding('class') public mode!: 'chip--disabled' | 'chip--asc' | 'chip--desc';
}
