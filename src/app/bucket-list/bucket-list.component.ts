import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss'],
})
export class BucketListComponent implements OnInit {
  currentState: string = 'All';
  states: any[] = [
    {
      state: 'All',
    },
    {
      state: 'Pending',
    },
    {
      state: 'Achieved',
    },
  ];
  bucketListItems: any[] = [];
  constructor(private api: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBucketListItems();
  }

  changeState(state: string) {
    this.currentState = state;
    console.log(state);
  }

  getBucketListItems(): any {
    console.log('fetching data');
    let num = 0;
    this.api
      .getBucketListItems()
      .snapshotChanges()
      .subscribe((bucketListItems: any[]) => {
        this.bucketListItems = [];
        bucketListItems.forEach((bucketListItem: any) => {
          let item: any = bucketListItem.payload.toJSON();
          item['$key'] = bucketListItem.key;
          this.bucketListItems.push(item);
          console.log(this.bucketListItems, num++);
        });
        this.bucketListItems.sort((first, last) => {
          return first.isAchieved - last.isAchieved;
        });
      });
  }

  addNewItem(item: any) {
    console.log(item);
    this.api.addBucketListItem(item);
  }

  openDialog(data: any) {
    this.dialog
      .open(GenericDialogComponent, {
        width: '95vw',
        height: 'auto',
        data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res && data.isEdit) {
          this.deleteWithoutDialog(data.$key);
          this.addNewItem(res);
        } else if (res){
          this.addNewItem(res);
        }
      });
  }

  viewItem(item: any) {
    item.heading = item.item;
    item.isView = true;
    this.openDialog(item);
  }
  editItem(item: any) {
    item.isEdit = true;
    this.openDialog(item);
  }

  deleteItem(key: string) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.api.deleteTodo(key);
        }
      });
  }

  deleteWithoutDialog(key: string){
    this.api.deleteTodo(key);
  }
}
