import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from "../../../shared/models/Note";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @Input() notes?: Array<Note>;
  @Output() imageObjectEmitter: EventEmitter<any>= new EventEmitter();
  chosenNote:any;
  constructor() {
  }
  ngOnChanges(){
    if(this.notes){
      this.chosenNote=this.notes[0];
      this.reload();
    }
  }
  ngOnInit():void {
  }
  reload() {
    this.imageObjectEmitter.emit(this.chosenNote);
  }
}
