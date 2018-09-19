import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;
  miForm: FormGroup;
  editando: boolean;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.miForm = new FormGroup({
      chkField: new FormControl(this.todo.completado),
      txtInput: new FormControl(this.todo.texto, Validators.required)
    });
    this.miForm.controls['chkField'].valueChanges.subscribe( (valor) => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 10);
  }
  terminarEdicion() {
    this.editando = false;
    if (this.miForm.controls['txtInput'].invalid) {
      return;
    }
    if (this.miForm.controls['txtInput'].value === this.todo.texto) {
      return;
    }
    const accion = new EditarTodoAction(this.todo.id, this.miForm.controls['txtInput'].value);
    this.store.dispatch(accion);
  }

  borrarTodo() {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }
}
