
import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { UsersPostsComponent } from '../posts/users-posts/users-posts.component';
import { MemberMessagesComponent } from '../members/member-messages/member-messages.component';


const routes: Routes = [
  { path: '', component: MemberListComponent , pathMatch: 'full'} , //localhost:4200/members
  { path: ':username', component: MemberDetailComponent}, // localhost:4200/members/1
]

@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberListComponent,
    MemberCardComponent,
    UsersPostsComponent,
    MemberMessagesComponent



  ],

  imports: [

    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ],

  exports : [

    RouterModule,
    MemberDetailComponent,
    MemberListComponent,
    MemberCardComponent,
    UsersPostsComponent,
    MemberMessagesComponent


  ],
})
export class MembersModule { }
