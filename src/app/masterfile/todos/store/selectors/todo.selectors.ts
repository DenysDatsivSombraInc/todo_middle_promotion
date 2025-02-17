import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';
import {STORE_KEYS} from "../../../../shared/constants/store.constasts";

export const selectTodoState = createFeatureSelector<TodoState>(STORE_KEYS.TODOS);

export const selectAllTodos = createSelector(selectTodoState, (state) => state?.todos ?? []);
