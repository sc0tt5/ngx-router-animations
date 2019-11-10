import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTwoComponent {}
