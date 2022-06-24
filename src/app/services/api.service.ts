import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  bucketListItems: AngularFireList<any> | undefined

  constructor(private firebase: AngularFireDatabase) { }

  getBucketListItems(): any{
    this.bucketListItems = this.firebase.list('bucketListItems');
    return this.bucketListItems;
  }

  addBucketListItem(item: any){
    this.bucketListItems?.push(item);
  }

  changeTodoState($key: string, item: any){
    this.bucketListItems?.update($key, item);
  }

  deleteTodo($key: string){
    this.bucketListItems?.remove($key);
  }
}
