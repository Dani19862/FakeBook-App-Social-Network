import { FeedComponent } from './posts/feed/feed.component';

import { MemberEditComponent } from './member-edit/member-edit.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },

  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'members',
      loadChildren:() => import('./modules/members.module').then(m => m.MembersModule)
    },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
      { path: 'lists', component: ListsComponent},
      { path: 'messages', component: MessagesComponent},

    ]
  },

  { path : 'feed', component: FeedComponent, canActivate: [AuthGuard] },

  {
    path: 'errors', component: TestErrorsComponent
  },

  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: 'server-error', component: ServerErrorComponent
  },
  {
    path : 'notifications',component:NotificationsComponent
  },
  {
    path : 'about', component : AboutComponent
  },


  { path: '**',
   component: NotFoundComponent,
   pathMatch:'full'} // redirect to home if no route is matched

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
