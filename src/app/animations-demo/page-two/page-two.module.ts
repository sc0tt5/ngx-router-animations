import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTwoComponent } from './page-two.component';

// routes
export const ROUTES: Routes = [{ path: '', component: PageTwoComponent }];

@NgModule({
  declarations: [PageTwoComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [PageTwoComponent]
})
export class PageTwoModule {}
