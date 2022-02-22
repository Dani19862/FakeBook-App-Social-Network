import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MemberListComponent , pathMatch: 'full'} , //localhost:4200/members
  { path: ':id', component: MemberDetailComponent}, // localhost:4200/members/1
]

@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberListComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],

  exports : [
    RouterModule,
    MemberDetailComponent,
    MemberListComponent
  ],
})
export class MembersModule { }
