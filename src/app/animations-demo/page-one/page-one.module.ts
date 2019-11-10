import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOneComponent } from './page-one.component';

// routes
export const ROUTES: Routes = [{ path: '', component: PageOneComponent }];

@NgModule({
  declarations: [PageOneComponent],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  exports: [PageOneComponent]
})
export class PageOneModule {}
