import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el Mundo');
const todo3 = new Todo('Salvar el Mundo');
todo2.completado = true;
const estadoIniciail: Todo[] = [todo1, todo2, todo3];


export function todoReducer( state = estadoIniciail, action: fromTodo.Acciones): Todo[] {
  switch (action.type) {
    case fromTodo.AGREGAR_TODO:
    // Siempre Devolvemos el estado completado en este caso es un arreglo [...state, PropiedadModificada]
      const todo = new Todo(action.texto);
      console.log(state); // [Todo, Todo, Todo]
      console.log(todo); // Todo {texto: "Mi texto", completado: false, id: 0.5925513092139774}
      console.log([...state]); // [Todo, Todo, Todo]
      console.log([...state, todo]); // [Todo, Todo, Todo, Todo]
      return [...state, todo];
    case fromTodo.TOGGLE_TODO:
    // recorremos todo el state y modificmos el valor buscado luego lo devolvemos el state entero
      const mystate = state.map( (todoEdit) => {
        if ( todoEdit.id === action.id ) {
          return {
            ...todoEdit,
            completado: !todoEdit.completado
          };
        } else {
          return todoEdit;
        }
      });
      console.log(mystate);
      return mystate;
    case fromTodo.EDITAR_TODO:
    return state.map( (todoEdit) => {
      if ( todoEdit.id === action.id ) {
        return {
          ...todoEdit,
          texto: action.texto
        };
      } else {
        return todoEdit;
      }
    });
    case fromTodo.BORRAR_TODO:
      return state.filter( todoEdit => todoEdit.id !== action.id);
    case fromTodo.DELETE_ALL_TODO:
      return state.filter( todoEdit => !todoEdit.completado);
    case fromTodo.TOGGLE_ALL_TODO:
      return state.map( (todoEdit) => {
        return {
          ...todoEdit,
          completado: action.completado
        };
      });
    default:
      return state;
  }
}
