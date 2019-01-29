import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as moment from 'moment';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-picksection',
  templateUrl: './picksection.component.html',
  styleUrls: ['./picksection.component.css']
})
export class PicksectionComponent implements OnInit {

  docSection: String;
  sections: string[]; 
  username: String;

  constructor(
  	private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  	this.username = this.authService.loadUsername();
    this.sections = this.authService.localGetUniqueSections().map(x => x.section);
  }

  onSectionSubmit() {
  	const section = this.docSection; 
    this.router.navigate(['/enterdoc', section]);
  }

}
