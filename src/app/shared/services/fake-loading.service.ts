import { Injectable } from '@angular/core';
import {interval, Observable, Subscriber} from "rxjs";

@Injectable({
  //injektaljuk a modulokba ahol szeretnenk hasznalni
  providedIn: 'root' //nem spec modul, mert a rootbol van kikerve
})
export class FakeLoadingService {

  constructor() {
  }

  //amikor tenylegesen az adat rendelkezesre all

  loadingWithPromise(email:string, password:string): Promise<boolean> {
    return new Promise((resolve, reject) =>{
    // setTimeout(()=>{
    //
    // }, 3000);
    let i = 0;
    const interval=setInterval(() => {
      i++;
      if (i === 3) {
        //return
        clearInterval(interval);
        if(email==='b.laura0269@gmail.com' && password=== 'test'){
          resolve(true);
        }
        else{
          reject(false)
        }
        // resolve(i);
      }
    }, 1000);
  });
}

  //GRUD (create, read, update, delete)

  //callback, promise, observable
  // @ts-ignore
  loadingWithObservable(email:string, password:string):Observable<boolean>{
  //adatfolyam- data stream
    return new Observable((subscriber : Subscriber<boolean>) =>{
      let i=0;
      const interval= setInterval(()=>{
        i++;
        //subscriber.next(i);
        if(i===3){
          // clearInterval(interval);
          // subscriber.complete();
          if(email==='b.laura0269@gmail.com' && password=== 'test'){
            subscriber.next(true);
            subscriber.complete();
          }
          else{
            subscriber.error(false);
          }
        }
      }, 1000); //1 mpenként fut le 1 2 3
    });
  }
}
