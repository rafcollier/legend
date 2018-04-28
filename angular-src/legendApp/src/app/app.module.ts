import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './services/auth.service';
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

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'enterdoc', component: EnterdocComponent},
  {path: 'recent', component: RecentComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:results', component: SearchComponent},
  {path: 'searchresults', component: SearchresultsComponent},
  {path: 'details/:doc', component: DetailsComponent}
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
    SearchresultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)   
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
