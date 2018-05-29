import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
  	private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  	this.router.navigate(['/search']); 
  }

}
