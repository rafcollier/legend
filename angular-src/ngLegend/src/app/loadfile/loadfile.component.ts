import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-loadfile',
  templateUrl: './loadfile.component.html',
  styleUrls: ['./loadfile.component.css']
})
export class LoadfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
