import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Image} from "../models/Image";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class GalleryService { //ez a gallery.service.ts fogja betolteni nekunk a jsont 8.video
  //HTTP
  collectionName='Images';
  constructor( private http:HttpClient, private afs: AngularFirestore, private storage: AngularFireStorage) { }
  loadImageMeta(): Observable<Array<Image>>{
    // return this.http.get('http://localhost:4200/assets/'+ metaUrl) as Observable<Array<Image>>;
    return this.afs.collection<Image>(this.collectionName).valueChanges();
  }
  loadImage(imageUrl:any){
    // return this.http.get('http://localhost:4200/assets/'+ imageUrl, {responseType: 'blob'});
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
