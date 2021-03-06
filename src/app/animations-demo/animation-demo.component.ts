import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  routerTransitionPageLoad,
  routerTransitionLoadingStart,
  routerTransitionLoadingEnd
} from '@core/animations/router-animations';
import { Page } from '@core/models/page';
import { Subject } from 'rxjs';
import { LoaderService } from '../shared/services/loader.service';

@Component({
  selector: 'animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.scss'],
  animations: [
    trigger('pageLoad', [transition('* => *', useAnimation(routerTransitionPageLoad))]),
    trigger('loadingIndicator', [
      transition(':enter', [useAnimation(routerTransitionLoadingStart)]),
      transition(':leave', [useAnimation(routerTransitionLoadingEnd)])
    ])
  ] // router animation
})
export class AnimationDemoComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  loading: boolean;
  page: Page;

  constructor(private loaderService: LoaderService, private router: Router) {}

  ngOnInit() {
    // subscribe to loader/interceptor
    this.loaderService.isLoading.subscribe(loading => {
      if (loading) {
        this.loading = loading;
      } else {
        setTimeout(() => {
          this.loading = loading;
        }, 500); // dealy to kind of simulate api call (just for demo)
      }
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
