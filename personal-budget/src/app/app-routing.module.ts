import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import {ContactComponent} from './contact/contact.component';
import {SignupComponent} from './signup/signup.component';
import {EnterexpenseComponent} from './enterexpense/enterexpense.component';
import {ConfigurebudgetComponent} from './configurebudget/configurebudget.component'
import {LogoutComponent} from './logout/logout.component';
// import { sign } from 'crypto';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'enterexpense',
    component: EnterexpenseComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'configurebudget',
    component: ConfigurebudgetComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
