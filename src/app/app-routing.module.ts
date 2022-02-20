import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerComponent } from './components/container/container.component';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  {
    component: ContainerComponent,
    path: ''
  },
  {
    component: UserListComponent,
    path: 'users'
    
  }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }