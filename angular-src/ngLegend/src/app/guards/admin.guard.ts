import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  //Guard routes so only administrator can acccess when logged in. This will
  //probably be used only to access the admin panel to add new users and data
  //that appears in drop-down menus, etc., that may change over time.  
  canActivate() {
	if(this.authService.adminLoggedIn()){
	  return true;
    } else {
 	  this.router.navigate(['/login']);
	  return false;
	  }
  }

}