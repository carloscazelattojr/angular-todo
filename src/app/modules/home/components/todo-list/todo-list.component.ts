import { Component, DoCheck, OnInit } from '@angular/core';

import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  public NAME_APP_STORAGE: string = "@MyTo-Do";
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem(this.NAME_APP_STORAGE) || '[]');

  constructor() { }

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  ngOnInit(): void {

  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false });
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllItemTaskList() {
    if (window.confirm("Deseja deletar todos ?")) {
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Deseja excluir Task vazia ?");

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage() {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem(this.NAME_APP_STORAGE, JSON.stringify(this.taskList));
    }
  }

}
