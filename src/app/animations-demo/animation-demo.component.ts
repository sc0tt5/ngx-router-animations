import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { routerTransition } from '@core/animations/router-animations';
import { Page } from '@core/models/page';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.scss'],
  animations: [trigger('routerTransition', [transition('* => *', useAnimation(routerTransition))])] // router animation
})
export class AnimationDemoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  loading: boolean;
  page: Page;

  constructor(private loaderService: LoaderService, private router: Router) {}

  ngOnInit() {
    // subscribe to loader/interceptor
    this.loaderService.isLoading.subscribe(loading => {
      this.loading = loading;
    });
  }

  // to prevent memory leaks
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // pass router state to routerTransition
  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
