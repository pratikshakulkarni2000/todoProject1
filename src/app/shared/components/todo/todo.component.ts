import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoData } from '../../consts/todo';
import { Itodo } from '../../models/todo';
import { __values } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoArr : Array<Itodo> = TodoData

  @ViewChild('todoItem') todoItem !: ElementRef
  isInEditMode : boolean = false
  editId!:string

  trackById (index : number,todo : Itodo){
    return todo.todoId
  }


  constructor(
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
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
  }

