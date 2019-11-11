import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimationDemoComponent } from './animation-demo.component';
import { PageResolver } from '../shared/guards/page.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/page-one'
  },
  {
    path: 'page-one',
    loadChildren: () => import('./page-one/page-one.module').then(m => m.PageOneModule),
    data: { state: 'page-one' },
    resolve: { page: PageResolver } // get data first
  },
  {
    path: 'page-two',
    loadChildren: () => import('./page-two/page-two.module').then(m => m.PageTwoModule),
    data: { state: 'page-two' },
    resolve: { page: PageResolver } // get data first
  },
  { path: '**', pathMatch: 'full', redirectTo: '/page-one' }
];

@NgModule({
  declarations: [AnimationDemoComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [AnimationDemoComponent]
})
export class AnimationDemoModule {}
