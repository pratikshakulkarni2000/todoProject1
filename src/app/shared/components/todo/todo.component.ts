import { Component, OnInit } from '@angular/core';
import { TodoData } from '../../consts/todo';
import { Itodo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoArr : Array<Itodo> = TodoData

  isInEditMode : boolean = false

  trackById (index : number,todo : Itodo){
    return todo.todoId
  }


  constructor() { }

  ngOnInit(): void {
  }

}
