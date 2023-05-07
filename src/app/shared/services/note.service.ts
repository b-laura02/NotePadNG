import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Group} from "../models/Group";
import {Note} from "../models/Note";
import {Comment} from "../models/Comment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  collectionName = 'Notes';

  constructor(private afs: AngularFirestore) { }

  create(note: Note) {
    note.id = this.afs.createId();
    return this.afs.collection<Note>(this.collectionName).doc(note.id).set(note);
  }

  getAllByGroupId(id: any, userId: any) {
    return this.afs.collection<Note>(this.collectionName, ref => ref
      .where('groupId', '==', id)
      .where('userId', '==', userId))
      .valueChanges();
  }

  update(note: Note) {
    return this.afs.collection<Note>(this.collectionName).doc(note.id).set(note);
  }

  delete(id: string) {
    return this.afs.collection<Note>(this.collectionName).doc(id).delete();
  }
}
