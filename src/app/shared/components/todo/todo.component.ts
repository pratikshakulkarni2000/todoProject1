import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoData } from '../../consts/todo';
import { Itodo } from '../../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {

  todoArr: Array<Itodo> = TodoData;


  @ViewChild('todoItem') todoItem !: ElementRef
  isInEditMode : boolean = false
  editId!:string

  trackById(index: number, todo: Itodo) {
    return todo.todoId;
  }

 

  constructor(
    private _snackBar : MatSnackBar,
     private _matDialog: MatDialog
  ) { }
   
 

  ngOnInit(): void {}

  onAddTodo() {
    if (this.todoItem.nativeElement.value.length > 0) {
      let todoObj: Itodo = {
        todoItem: this.todoItem.nativeElement.value,
        todoId: Date.now().toString(),
      };
      console.log(todoObj);
      this.todoArr.unshift(todoObj);
      this.todoItem.nativeElement.value = '';

      this._snackBar.open(`TodoItem Added Successfully!!!`, 'Close', {
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        duration: 3000,
      });
    }
  }

 editTodo(todo:Itodo){
    this.editId = todo.todoId,
    this.todoItem.nativeElement.value = todo.todoItem

    this.isInEditMode = true
  }

  onUpdate(){
    let updatedObj:Itodo = {
      todoItem : this.todoItem.nativeElement.value,
      todoId: this.editId
    }
    let getIndex = this.todoArr.findIndex(t=>t.todoId === updatedObj.todoId)
    this.todoArr[getIndex] = updatedObj
    this.isInEditMode = false;
    this.todoItem.nativeElement.value = ''

    this._snackBar.open(`The TodoItem Updated Successfully !!`,'Close',{
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration :3000
    }
    )
  }


  onRemove(id:string) {
    let matConfig = new MatDialogConfig();
    matConfig.disableClose = true;

    let matDialogRef = this._matDialog.open(GetConfirmComponent, matConfig);
    matDialogRef.afterClosed().subscribe((res) => {
      if (res) {
        let getIndex = this.todoArr.findIndex((t) => t.todoId === id);
        this.todoArr.splice(getIndex, 1);

        this._snackBar.open(`The TodoItem Removed Successflly`,'Close', {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 3000
        })
      }
    });
  }
  }

  



