import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {
  private sub: any;
  docs: [Object];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { } 

  ngOnInit() {
    this.route.params.subscribe(params => {
      //this.docs = params;
      console.log(params);
      console.log(params[0]);
      console.log(params[1]);

      }
    );

  }

}
