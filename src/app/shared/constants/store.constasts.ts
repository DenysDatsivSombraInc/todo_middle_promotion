import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {AuthEffects} from "../../masterfile/authentication/store/effects/auth.effects";
import {TodoEffects} from "../../masterfile/todos/store/effects/todo.effect";
import {todoReducer} from "../../masterfile/todos/store/reducers/todo.reducer";
import {authReducer} from "../../masterfile/authentication/store/reducers/auth.reducer";

export const STORE_KEYS ={
  AUTH:'auth',
  TODOS:'todos'
} ;


export const appStoreProviders = [
  provideStore(), // Provide root store
  provideState(STORE_KEYS.AUTH, authReducer),
  provideState(STORE_KEYS.TODOS, todoReducer),
  provideEffects(AuthEffects, TodoEffects),
];
