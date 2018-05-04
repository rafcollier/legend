import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import { ValidateService } from './services/validate.service';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EnterdocComponent } from './enterdoc/enterdoc.component';
import { RecentComponent } from './recent/recent.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';  

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'enterdoc', component: EnterdocComponent, canActivate:[AuthGuard]},
  {path: 'recent', component: RecentComponent, canActivate:[AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate:[AuthGuard]},
  {path: 'layout', component: LayoutComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'details/:doc', component: DetailsComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    EnterdocComponent,
    RecentComponent,
    DetailsComponent,
    SearchComponent,
    SearchresultsComponent,
    LayoutComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)   
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
