import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Group} from "../models/Group";
import {Note} from "../models/Note";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  collectionName = 'Groups';

  constructor(private afs: AngularFirestore) { }

  create(group: Group) {
    group.id = this.afs.createId();
    return this.afs.collection<Group>(this.collectionName).doc(group.id).set(group);
    // return this.afs.collection<Comment>(this.collectionName).add(comment);
  }

  getAll(userId: any) {
    // return this.afs.collection<Group>(this.collectionName).valueChanges();
    return this.afs.collection<Group>(this.collectionName, ref => ref
      .where('userId', 'in', [userId, 'all']))
      .valueChanges();
  }

  update(group: Group) {
    return this.afs.collection<Group>(this.collectionName).doc(group.id).set(group);
  }

  delete(id: string) {
    return this.afs.collection<Group>(this.collectionName).doc(id).delete();
  }
}
