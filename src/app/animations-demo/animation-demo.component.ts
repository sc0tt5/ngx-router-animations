import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { routerTransition } from '@core/animations/router-animations';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'animation-demo',
  templateUrl: './animation-demo.component.html',
  styleUrls: ['./animation-demo.component.scss'],
  animations: [trigger('routerTransition', [transition('* => *', useAnimation(routerTransition))])] // router animation
})
export class AnimationDemoComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  loading: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscribeToRouterEvents();
    this.loading = true; // show loading indicator on page load
  }

  // loading indicator
  private subscribeToRouterEvents() {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof NavigationStart || event instanceof NavigationEnd)
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.loading = true; // show loading indicator
        } else {
          setTimeout(() => {
            this.loading = false; // hide loading indicator
          }, 500);
        }
      });
  }

  // pass router state to routerTransition
  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }
}
