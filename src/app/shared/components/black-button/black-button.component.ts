import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-black-button',
  templateUrl: './black-button.component.html',
  styleUrls: ['./black-button.component.scss']
})
export class BlackButtonComponent {
  @Input() text: string = 'Button';
  @Input() disabled: boolean = false;
}

