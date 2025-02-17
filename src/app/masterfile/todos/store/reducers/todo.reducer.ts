import {createReducer, on} from '@ngrx/store';
import * as TodoActions from '../actions/todo.actions';
import {Todo} from '../../models/todo.models';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, state => ({...state, loading: true})),
  on(TodoActions.loadTodosSuccess, (state, {todos}) => {
    return {
      ...state,
      loading: false,
      todos: [...todos]
    };
  }), on(TodoActions.loadTodosFailure, (state, {error}) => ({...state, loading: false, error})),
  on(TodoActions.addTodoSuccess, (state, {todo}) => ({...state, todos: [...state.todos, todo]})),
  on(TodoActions.updateTodoSuccess, (state, {todo}) => ({
    ...state,
    todos: state.todos.map(t => (t.id === todo.id ? todo : t)),
  })),
  on(TodoActions.deleteTodoSuccess, (state, {id}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  })),
);
