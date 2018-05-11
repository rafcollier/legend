import { Injectable } from '@angular/core';
import{Http, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
 
  //inject http into constructor
  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}) //for local development
    //return this.http.post('users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  //return this.http.post('users/authenticate', user, {headers: headers}) //add this for local dev: http://localhost:3000/
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  }

  getProfile() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    //return this.http.get('users/profile', {headers: headers}) //add this for local dev: http://localhost:3000/
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

  submitDoc(doc) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log("auth....doc" + doc);
    return this.http.post('http://localhost:3000/docs/submitdoc', doc, {headers: headers}) //for local development
    //return this.http.post('docs/submitdoc', doc, {headers: headers}) //for local development
      .pipe(map(res => res.json()));
  }

  getRecentAdded(username, limit) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('docUsername', username);
    params.set('limit', limit);
    options.headers = headers;
    options.search = params;
    return this.http.get('http://localhost:3000/docs/getRecentAdded', options) //add this for local dev: http://localhost:3000/
    //return this.http.get('items/getAllItems', options) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

  getOneDoc(docID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('docID', docID);
    options.headers = headers;
    options.search = params;
    return this.http.get('http://localhost:3000/docs/getOneDoc', options)
    //return this.http.get('items/getOneItem', options)
      .pipe(map(res => res.json()));
  }

  putUpdateDoc(editedDoc) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/docs/updateDoc', editedDoc, {headers: headers}) //add this for local dev: http://localhost:3000/
    //return this.http.put('items/updateWornToday', body, options) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

  deleteOneDoc(docID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('docID', docID);
    options.headers = headers;
    options.search = params;
    return this.http.delete('http://localhost:3000/docs/deleteOneDoc', options)
   // return this.http.delete('items/deleteOneItem', options)
      .pipe(map(res => res.json()));
  }

  getSearchResults(onlineIssue, section, printIssue, author, DOI, title) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docOnlineIssue', onlineIssue);
    params.set('docPrintIssue', printIssue);
    params.set('docSection', section);
    params.set('docAuthor', author);
    params.set('docDOI', DOI);
    params.set('docTitle', title);
    //params.set('itemOffset', itemOffset);
    //params.set('limit', limit);
    //params.set('searchParameter', searchParameter);
    options.headers = headers;
    options.search = params;
    return this.http.get('http://localhost:3000/docs/getSearchResults', options) //add this for local dev: http://localhost:3000/
    //return this.http.get('docs/getSearchResults', options) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

  getNumDocs(section, firstDateNumDocs, secondDateNumDocs) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docSection', section);
    params.set('docFirstDateNumDocs', firstDateNumDocs);
    params.set('docSecondDateNumDocs', secondDateNumDocs);
    options.headers = headers;
    options.search = params;
    console.log(params);
    return this.http.get('http://localhost:3000/docs/getNumDocs', options) //add this for local dev: http://localhost:3000/
    //return this.http.get('docs/getSearchResults', options) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

  getTimeDiff(section, firstDateTimeDiff, secondDateTimeDiff) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docSection', section);
    params.set('docFirstDateTimeDifference', firstDateTimeDiff);
    params.set('docSecondDateTimeDifference', secondDateTimeDiff);
    options.headers = headers;
    options.search = params;
    console.log(params);
    return this.http.get('http://localhost:3000/docs/getTimeDiff', options) //add this for local dev: http://localhost:3000/
    //return this.http.get('docs/getSearchResults', options) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

   getLayoutSearchResults(printIssue) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docPrintIssue', printIssue);
    //params.set('itemOffset', itemOffset);
    //params.set('limit', limit);
    //params.set('searchParameter', searchParameter);
    options.headers = headers;
    options.search = params;
    return this.http.get('http://localhost:3000/docs/getLayoutSearchResults', options) //add this for local dev: http://localhost:3000/
    //return this.http.get('docs/getSearchResults', options) //add this for local dev: http://localhost:3000/
      .pipe(map(res => res.json()));
  } 

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings, not objects
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return token;
  }

  loadUser(){
    const user = localStorage.getItem('user');
    return user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loggedIn() {
    const token = localStorage.getItem('id_token');
    return token!=null;
  }

  adminLoggedIn() {
    const userJSON = JSON.parse(this.loadUser()); 
    return userJSON!=null && userJSON["username"]=="admin";
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

}
