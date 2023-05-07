import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Comment} from "../../../shared/models/Comment";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Image} from "../../../shared/models/Image";
import {GalleryService} from "../../../shared/services/gallery.service";
import {CommentService} from "../../../shared/services/comment.service";
import {UserService} from "../../../shared/services/user.service";
import {User} from "../../../shared/models/User";
import {Note} from "../../../shared/models/Note";
import {Group} from "../../../shared/models/Group";
import {NoteService} from "../../../shared/services/note.service";
import {FirstletterToUpperCasePipe} from "../../../shared/pipes/firstletter-to-upper-case.pipe";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [FirstletterToUpperCasePipe]
})
export class ViewerComponent implements OnInit, OnChanges{
  @Input() imageInput?:Image;
  loaderImage?:string;
  commentObject: any={};
  notes:Array<Note>=[];
  user?: User;
  @Input() noteInput?: Note;
  @Input() group?: Group;
  showEdit: boolean = false;

  noteEditForm: any;

  noteForm= this.createForm({
    id:'',
    title: '',
    text:'',
    date: '',
    groupId: this.group?.id as string,
    userId: ''
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private galleryService: GalleryService,
              private commentService: CommentService,
              private noteService: NoteService,
              private firstlettertoUpperCase: FirstletterToUpperCasePipe,
              private userService: UserService) {
  }
  ngOnChanges():void{
    if(this.imageInput?.id){
      // this.noteForm.get('imageId')?.setValue(this.imageInput.id);
      this.galleryService.loadImage(this.imageInput.image_url).subscribe(data=>{
        this.loaderImage=data;
      });
      // this.commentService.getCommentsByImageId(this.imageInput.id).subscribe(comments=>{
      //   this.notes=comments;
      // })
    } else {
      this.galleryService.loadImage('images/image-6.jpg').subscribe(data=>{
        this.loaderImage=data;
      });
    }
  }
  ngOnInit():void {
    const user= JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data=>{
      this.user=data;
      // this.noteForm.get('username')?.setValue(this.user?.username as string);
    }, error=>{
      console.log(error);
    });
  }
  createForm(model:Note){
    let formGroup= this.fb.group(model);
    formGroup.get('title')?.addValidators([Validators.required]);
    formGroup.get('text')?.addValidators([Validators.required, Validators.minLength(10)]);
    return formGroup;
}

  addNote(){
    if(this.noteForm.valid) {
      if (this.noteForm.get('title') && this.noteForm.get('text')) {
        this.noteForm.get('date')?.setValue(new Date().toDateString());
        console.log(this.noteForm.get('title'));
        let note: Note = {
          id: '',
          title: this.noteForm.get('title')?.value as string,
          text: this.noteForm.get('text')?.value as string,
          date: this.noteForm.get('date')?.value as string,
          groupId: this.group?.id as string,
          userId: this.user?.id as string
        };
        this.noteService.create(note);

        // this.notes.push({...this.noteForm.value} as Note);
        // this.commentService.create(this.noteForm.value).then(_ =>{
        // }).catch(error=>{
        //   console.error(error);
        // })
        // this.router.navigateByUrl('/gallery/successful/' + this.noteForm.get('title')?.value)
      }
    }

  }

  modosit(comment: Comment) { //Modosit gomb, amivel meg lehetne oldani, hogy a megmaradt szöveget lehessen modositani, atirni, torolni stb
    comment.comment = "balazs"
    this.commentService.update(comment).then(r => {
      console.log("Sikeres törlés!")
    });
  }

  deleteNote(noteInput: Note) {
    this.noteService.delete(noteInput.id);
  }

  openEdit() {
    this.showEdit = true;
    this.noteEditForm= this.createForm({
      id:'',
      title: this.noteInput?.title as string,
      text:this.noteInput?.text as string,
      date: '',
      groupId: this.group?.id as string,
      userId: ''
    });
  }

  editNote() {
    if (this.noteInput) {
      if (this.noteEditForm.get('title')?.value != '') {
        this.noteInput.title = this.noteEditForm.get('title')?.value as string;
      }
      if (this.noteEditForm.get('text')?.value != '') {
        this.noteInput.text = this.noteEditForm.get('text')?.value as string;
      }
      this.noteService.update(this.noteInput);
      this.showEdit = false;
    }
  }
}
