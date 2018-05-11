import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  username: string;
  numDocs: number = 10;
  displayDocs: [Object];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.getRecentDocs();
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

  getRecentDocs() {
    this.authService.getRecentAdded(this.username, this.numDocs).subscribe(docs => {
      console.log(docs);
      this.displayDocs = docs;
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

  onDocClick(doc, index) {
    const docID = doc["_id"]; 
    this.router.navigate(['/details', docID]);
  }

}
