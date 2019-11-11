import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Page } from '@core/models/page';
import { Subject } from 'rxjs';

@Component({
  selector: 'page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageOneComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  page: Page;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // this is passed from our page resolver
    this.route.data.subscribe((data: Data) => {
      this.page = data.page;
    });
  }

  // to prevent memory leaks
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
