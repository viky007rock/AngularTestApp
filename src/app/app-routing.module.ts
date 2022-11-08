import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  {path: '',loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'user',loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
