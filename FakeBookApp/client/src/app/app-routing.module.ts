
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'members', component: MemberListComponent},  //localhost:4200/members
  { path: 'members/:id', component: MemberDetailComponent}, // localhost:4200/members/1
  { path: 'lists', component: ListsComponent},
  { path: 'messages', component: MessagesComponent},
  { path: '**', component: HomeComponent, pathMatch:'full'} // redirect to home if no route is matched
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
