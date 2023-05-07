import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { Image } from '../../shared/models/Image';
import { GalleryService } from '../../shared/services/gallery.service';
import {Group} from "../../shared/models/Group";
import {NoteService} from "../../shared/services/note.service";
import {group} from "@angular/animations";
import {Note} from "../../shared/models/Note";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnChanges {

  user?: any;
  loading: boolean = false;
  galleryObject?: Array<Image>;
  chosenImage?: Image;
  notes: Note[]=[];
  @Input() type?: Group;
  chosenNote?: Note;
  foundImage: boolean = false;

  constructor(private galleryService: GalleryService,
              private userService: UserService,
              private noteService: NoteService) { }

  ngOnInit(): void {
    const user= JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(value => {
      this.user = value;
      this.init();
    });
    this.galleryService.loadImageMeta().subscribe((data: Array<Image>) => {
      console.log(data);
      this.galleryObject = data;
      this.load();
    });
  }

  init() {
    this.noteService.getAllByGroupId(this.type?.id, this.user.id).subscribe((data) => {
      console.log(data);
      this.notes = data;
    });
  }

  loadNote(noteObject: Note) {
    this.chosenNote = noteObject;
  }

  loadImage(imageObject: Image) {
    this.chosenImage = imageObject;
    this.loading = false;
    this.foundImage = false;
  }

  load() {
    this.loading = true;
    if (this.galleryObject) {
      this.chosenImage = undefined;
      for (const image of this.galleryObject as Array<Image>) {
        if (image.id === this.type?.name.toLowerCase()) {
          this.foundImage = true;
          this.loadImage(image);
        }
      }
      if (!this.foundImage) {
        this.loading = false;
      }
    }
  }

  ngOnChanges(): void {
    this.load();
    if (this.user) {
      this.init();
    }
  }

}
