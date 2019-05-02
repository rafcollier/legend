import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.css']
})
export class EditorsComponent implements OnInit {
  currentUser: String;
  errorMessage: String = "";
  errorMessageEdit: String = "";
  validateMessage: String = "";
  validateMessageEdit: String = "";
  deleteMessage : String = "";
  deleteMessageEdit : String = "";
  successMessage : String = "";
  successMessageEdit : String = "";
  name: String;
  docEditor: Boolean;
  docCoordinator: Boolean;
  docProofReader: Boolean;
  docSE: Boolean;
  nameEdit: String;
  docEditorEdit: Boolean;
  docCoordinatorEdit: Boolean;
  docProofReaderEdit: Boolean;
  docSEEdit: Boolean;
  editorIDEdit: String;
  editorIndex: number;
  editors: object[];

   constructor(
    private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router
  ) { }

  ngOnInit() {

    this.clearFields();

    this.authService.getProfile().subscribe(profile => {
      this.currentUser = profile.user.username;
    },
    err => {
      console.log(err);
      return false;
    });
    this.onGetEditors();
  }

  onGetEditors() {
    this.authService.getEditors().subscribe(entries => {
      this.editors = entries; 
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onEditorSubmit(){
    const editor = {
      name: this.name,
      docEditor: this.docEditor,
      docCoordinator: this.docCoordinator,
      docProofReader: this.docProofReader,
      docSE: this.docSE
    }

    //Required fields
    if(!this.validateService.validateEditor(editor)) {
      this.validateMessage = "Please fill in editor name.";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addEditor(editor).subscribe(data => {
        console.log(data);
        if(data.success){
          this.successMessage = data.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
      console.log(err);
      return false;
      });
    }
  }

  onEditorEdit(editor, index){
    this.editorIDEdit = editor["_id"]; 
    this.nameEdit = editor['name']; 
    this.docEditorEdit = editor['docEditor']; 
    this.docCoordinatorEdit = editor['docCoordinator']; 
    this.docProofReaderEdit = editor['docProofReader']; 
    this.docSEEdit = editor['docSE']; 
    this.editorIndex = index;
  }

  onEditSubmit() {
    const editorEdit = {
      editorID: this.editorIDEdit, //to identify this doc in database
      name: this.nameEdit,
      docEditor: this.docEditorEdit,
      docCoordinator: this.docCoordinatorEdit,
      docProofReader: this.docProofReaderEdit,
      docSE:this.docSEEdit 
    }

    if(!this.validateService.validateEditor(editorEdit)) {
      this.validateMessageEdit = "Please fill in editor name.";
      setTimeout(() => {
        this.validateMessageEdit = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.updateEditor(editorEdit).subscribe(doc => {
        if(doc.success){
          this.successMessageEdit = doc.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
        else {          
          this.errorMessageEdit = doc.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  onEditorDelete(editor, index) {
    const editorID = editor["_id"]; 
    this.authService.deleteEditor(editorID).subscribe(editor => {
      if(editor.success){
        this.deleteMessageEdit = editor.msg;
        console.log(this.deleteMessageEdit);
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
      else {
        this.errorMessageEdit = editor.msg;
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
    },
    err => {
      console.log(err);
      return false;
    });

  }

  editCancel(){
    this.ngOnInit();
  }

  clearFields() {
    this.name = "";
    this.docEditor = null;
    this.docCoordinator = null;
    this.docProofReader = null;
    this.docSE = null;
    this.editorIndex = null;
    this.errorMessage = "";
    this.errorMessageEdit = "";
    this.validateMessage = "";
    this.validateMessageEdit = "";
    this.deleteMessage = "";
    this.deleteMessageEdit = "";
    this.successMessage = "";
    this.successMessageEdit = "";
  }

}
