
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';

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
      { path: 'lists', component: ListsComponent},
      { path: 'messages', component: MessagesComponent},
    ]
  },

  { path: '**',
  component: HomeComponent,
   pathMatch:'full'} // redirect to home if no route is matched

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
