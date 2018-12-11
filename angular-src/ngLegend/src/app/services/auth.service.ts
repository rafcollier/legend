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

  /////////////////////////////////////////
  //USER COLLECTION
  /////////////////////////////////////////

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}) 
    //return this.http.post('users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //return this.http.post('users/authenticate', user, {headers: headers}) 
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}) 
      .pipe(map(res => res.json()));
  }

  getUsers() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/getUsers', {headers: headers}) 
    //return this.http.get('users/getUsers', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  deleteUser(docID) {
    console.log("delete user");
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('docID', docID);
    options.headers = headers;
    options.search = params;
    return this.http.delete('http://localhost:3000/users/deleteUser', options)
    //return this.http.delete('users/deleteUser', options)
      .pipe(map(res => res.json()));
  }

  getProfile() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    //return this.http.get('users/profile', {headers: headers}) 
    return this.http.get('http://localhost:3000/users/profile', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  /////////////////////////////////////////
  //SECTION COLLECTION
  /////////////////////////////////////////

  addSection(section) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/sections/addSection', section, {headers: headers}) 
    //return this.http.post('sections/addSection', section, {headers: headers}) 
      .pipe(map(res => res.json()));
  }

  updateSection(editedSection) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/sections/updateSection', editedSection, {headers: headers}) 
   // return this.http.put('sections/updateSection', editedSection, {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  getSections() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/sections/getSections', {headers: headers}) 
    //return this.http.get('sections/getSections', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  deleteSection(docID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('docID', docID);
    options.headers = headers;
    options.search = params;
    return this.http.delete('http://localhost:3000/sections/deleteSection', options)
    //return this.http.delete('sections/deleteSection', options)
      .pipe(map(res => res.json()));
  }

  /////////////////////////////////////////
  //ONLINE ISSUE CONFIG COLLECTION
  /////////////////////////////////////////

  addOnline(online) {
    console.log("auth services add online issue");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/online/addOnline', online, {headers: headers}) 
    //return this.http.post('online/addOnline', online, {headers: headers}) 
      .pipe(map(res => res.json()));
  }


  updateOnline(editedOnline) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/online/updateOnline', editedOnline, {headers: headers}) 
   // return this.http.put('online/updateOnline', editedOnline, {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  getOnline() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/online/getOnline', {headers: headers}) 
    //return this.http.get('online/getOnline', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  deleteOnline(onlineID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('onlineID', onlineID);
    options.headers = headers;
    options.search = params;
    return this.http.delete('http://localhost:3000/online/deleteOnline', options)
    //return this.http.delete('online/deleteOnline', options)
      .pipe(map(res => res.json()));
  }

  /////////////////////////////////////////
  //EDITOR CONFIG COLLECTION
  /////////////////////////////////////////

  addEditor(editor) {
    console.log("auth services add editor");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/editors/addEditor', editor, {headers: headers}) 
    //return this.http.post('editors/addEditor', editor, {headers: headers}) 
      .pipe(map(res => res.json()));
  }


  updateEditor(editedEditor) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/editors/updateEditor', editedEditor, {headers: headers}) 
    //return this.http.put('editors/updateEditor', editedEditor, {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  getEditors() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/editors/getEditors', {headers: headers}) 
    //return this.http.get('editors/getEditors', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  deleteEditor(editorID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('editorID', editorID);
    options.headers = headers;
    options.search = params;
    return this.http.delete('http://localhost:3000/editors/deleteEditor', options)
    //return this.http.delete('editors/deleteEditor', options)
      .pipe(map(res => res.json()));
  }

  /////////////////////////////////////////
  //HIGHWIRE CODES CONFIG COLLECTION
  /////////////////////////////////////////

  addCode(code) {
    console.log("auth services add code");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/codes/addCode', code, {headers: headers}) 
    //return this.http.post('codes/addCode', code, {headers: headers}) 
      .pipe(map(res => res.json()));
  }


  updateCode(editedCode) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/codes/updateCode', editedCode, {headers: headers}) 
    //return this.http.put('codes/updateCodes', editedCode, {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  getCodes() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/codes/getCodes', {headers: headers}) 
    //return this.http.get('editors/getEditors', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  deleteCode(codeID) {
    this.loadToken();
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    params.set('codeID', codeID);
    options.headers = headers;
    options.search = params;
    return this.http.delete('http://localhost:3000/codes/deleteCode', options)
    //return this.http.delete('codes/deleteCode', options)
      .pipe(map(res => res.json()));
  }


  /////////////////////////////////////////
  //CONFIG COLLECTION
  /////////////////////////////////////////

  addConfig(config) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/config/addConfig', config, {headers: headers}) 
    //return this.http.post('config/addConfig', config, {headers: headers}) 
      .pipe(map(res => res.json()));
  }

  getConfig() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/config/getConfig', {headers: headers}) 
    //return this.http.get('config/getConfig', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  putUpdateConfig(editedConfig) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/config/updateConfig', editedConfig, {headers: headers}) 
   // return this.http.put('config/updateConfig', editedConfig, {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  //deleteSection(docID) {
  //  this.loadToken();
  //  let headers = new Headers();
  //  let params = new URLSearchParams();
  //  let options = new RequestOptions();
  //  headers.append('Content-Type', 'application/json');
  //  headers.append('Authorization', this.authToken);
  //  params.set('docID', docID);
  //  options.headers = headers;
  //  options.search = params;
  //  return this.http.delete('http://localhost:3000/sections/deleteSection', options)
  //  //return this.http.delete('sections/deleteSection', options)
  //    .pipe(map(res => res.json()));
  //}

  


  /////////////////////////////////////////
  //MANUSCRIPT COLLECTION
  /////////////////////////////////////////
  

  submitDoc(doc) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log("auth....doc" + doc);
    return this.http.post('http://localhost:3000/docs/submitdoc', doc, {headers: headers}) 
    //return this.http.post('docs/submitdoc', doc, {headers: headers}) 
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
    return this.http.get('http://localhost:3000/docs/getRecentAdded', options) 
    //return this.http.get('docs/getRecentAdded', options) 
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
    //return this.http.get('docs/getOneDoc', options)
      .pipe(map(res => res.json()));
  }

  putUpdateDoc(editedDoc) {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/docs/updateDoc', editedDoc, {headers: headers}) 
    //return this.http.put('docs/updateDoc', editedDoc, {headers: headers}) 
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
    //return this.http.delete('docs/deleteOneDoc', options)
      .pipe(map(res => res.json()));
  }

  getSearchResults(section, author, DOI, title, notusedonline, notusedprint, afterAcceptDate, beforeAcceptDate, editor, status) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docSection', section);
    params.set('docAuthor', author);
    params.set('docDOI', DOI);
    params.set('docTitle', title);
    params.set('docNotUsedOnline', notusedonline);
    params.set('docNotUsedPrint', notusedprint);
    params.set('afterAcceptDate', afterAcceptDate);
    params.set('beforeAcceptDate', beforeAcceptDate);
    params.set('editor', editor);
    params.set('status', status);
    options.headers = headers;
    options.search = params;
    console.log(options);
    return this.http.get('http://localhost:3000/docs/getSearchResults', options) 
    //return this.http.get('docs/getSearchResults', options) 
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
    return this.http.get('http://localhost:3000/docs/getNumDocs', options) 
   // return this.http.get('docs/getNumDocs', options) 
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
    return this.http.get('http://localhost:3000/docs/getTimeDiff', options) 
    //return this.http.get('docs/getTimeDiff', options) 
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
    return this.http.get('http://localhost:3000/docs/getLayoutSearchResults', options) 
    //return this.http.get('docs/getLayoutSearchResults', options) 
      .pipe(map(res => res.json()));
  } 

  getOnlineSearchResults(onlineIssue) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docOnlineIssue', onlineIssue);
    options.headers = headers;
    options.search = params;
    return this.http.get('http://localhost:3000/docs/getOnlineSearchResults', options) 
    //return this.http.get('docs/getOnlineSearchResults', options) 
      .pipe(map(res => res.json()));
  } 

  getCheckPreviousOnlineIssue(onlineIssue) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docOnlineIssue', onlineIssue);
    options.headers = headers;
    options.search = params;
    return this.http.get('http://localhost:3000/docs/getCheckPreviousOnlineIssue', options) 
    //return this.http.get('docs/getOnlineSearchResults', options) 
      .pipe(map(res => res.json()));
  } 

  getOnlineLastPage(onlineIssue) {
    let headers = new Headers();
    let params = new URLSearchParams();
    let options = new RequestOptions();
    headers.append('Content-Type', 'application/json');
    params.set('docOnlineIssue', onlineIssue);
    options.headers = headers;
    options.search = params;
    console.log(options);
    return this.http.get('http://localhost:3000/docs/getOnlineLastPage', options) 
    //return this.http.get('docs/getOnlineLastPage', options) 
      .pipe(map(res => res.json()));
  } 

  getNewsDOI() {
    this.loadToken();
    let headers = new Headers();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log(headers);
    return this.http.get('http://localhost:3000/docs/getNewsDOI', {headers: headers}) 
    //return this.http.get('docs/getNewsDOI', {headers: headers}) 
      .pipe(map(res => res.json()));
  } 

  /////////////////////////////////////////
  // LOCAL STORAGE
  /////////////////////////////////////////

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user)); //local storage can only store strings, not objects
    this.authToken = token;
    this.user = user;
  }

  localStoreSections(sectionArr) {
    localStorage.setItem('sections', JSON.stringify(sectionArr));
  }

  localGetSections() {
    let sectionsArr = JSON.parse(localStorage.getItem('sections'));
    return sectionsArr;
  }

  localStoreUniqueSections(sectionArr) {
    localStorage.setItem('uniqueSections', JSON.stringify(sectionArr));
  }

  localGetUniqueSections() {
    let uniqueSectionsArr = JSON.parse(localStorage.getItem('uniqueSections'));
    return uniqueSectionsArr;
  }

  localStoreDepartments(departmentArr) {
    localStorage.setItem('departments', JSON.stringify(departmentArr));
  }

  localGetDepartments() {
    let departmentsArr = JSON.parse(localStorage.getItem('departments'));
    return departmentsArr;
  }

  localStoreConfigFile(configFile) {
    localStorage.setItem('configFile', JSON.stringify(configFile));
  }

  localGetConfigFile() {
    let configFile = JSON.parse(localStorage.getItem('configFile'));
    return configFile;
  }

  localStoreOnline(onlineArr) {
    console.log("in local store online");
    localStorage.setItem('online', JSON.stringify(onlineArr));
  }

  localGetOnline() {
    console.log("in local get online");
    let onlineArr = JSON.parse(localStorage.getItem('online'));
    return onlineArr;
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
    return token != null;
  }

  loadUsername() {
    const userJSON = JSON.parse(this.loadUser()); 
    return userJSON["username"];
  }

  adminLoggedIn() {
    const userJSON = JSON.parse(this.loadUser()); 
    return userJSON!=null && userJSON["username"]=="admin";
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

}




  /////////////////////////////////////////
  //PRINT ISSUE COLLECTION
  /////////////////////////////////////////
  
  //addPrintIssue(printIssue) {
  //  console.log("in auth services " + printIssue)
  //  let headers = new Headers();
  //  headers.append('Content-Type', 'application/json');
  //  return this.http.post('http://localhost:3000/print/addPrintIssue', printIssue, {headers: headers}) 
  //  //return this.http.post('print/addPrintIssue', printIssue, {headers: headers}) 
  //    .pipe(map(res => res.json()));
  //}

  //getPrintIssues() {
  //  this.loadToken();
  //  let headers = new Headers();
  //  headers.append('Authorization', this.authToken);
  //  headers.append('Content-Type', 'application/json');
  //  return this.http.get('http://localhost:3000/print/getPrintIssues', {headers: headers}) 
  //  //return this.http.get('print/getPrintIssues', {headers: headers}) 
  //    .pipe(map(res => res.json()));
  //} 
//
//  deletePrintIssue(docID) {
//    this.loadToken();
//    let headers = new Headers();
//    let params = new URLSearchParams();
//    let options = new RequestOptions();
//    headers.append('Content-Type', 'application/json');
//    headers.append('Authorization', this.authToken);
//    params.set('docID', docID);
//    options.headers = headers;
//    options.search = params;
//    return this.http.delete('http://localhost:3000/print/deletePrintIssue', options)
//    //return this.http.delete('print/deletePrintIssue', options)
//      .pipe(map(res => res.json()));
//  }


