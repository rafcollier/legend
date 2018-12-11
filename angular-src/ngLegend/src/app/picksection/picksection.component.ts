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
  sectionsObj: Object[] = []; 
  sections: string[]; 
  username: String;

  myControl = new FormControl();
  filteredSections: Observable<string[]>;

  constructor(
  	private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  	this.username = this.authService.loadUsername();
    this.sections = this.authService.localGetUniqueSections().map(x => x.section);

    this.filteredSections = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sections.filter(section => section.toLowerCase().includes(filterValue));
  }

  onSectionSubmit() {
  	const section = this.docSection; 
    this.router.navigate(['/enterdoc', section]);
  }

}
