import { Component } from '@angular/core';

@Component({
  selector: 'sg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isOpen:boolean=false;
}
