import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as TodoActions from '../actions/todo.actions';
import {TodoService} from '../../services/todo.service';
import {catchError, map, mergeMap, of} from 'rxjs';
import {MessagesService} from "../../../../shared/services/top-left-message.service";
import {MESSAGE_SEVERITY} from "../../../../shared/constants/message-severity.constants";
import {MESSAGES} from "../../../../shared/constants/messages.constants";
import {MESSAGE_SUMMARY} from "../../../../shared/constants/message-summary.constants";

@Injectable()
export class TodoEffects {
    private readonly actions$ = inject(Actions);
    private readonly todoService = inject(TodoService);
    private readonly messagesService = inject(MessagesService);


  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(({ userId }) =>
        this.todoService.getUserTodos(userId).pipe(
          map(todos => {
            return TodoActions.loadTodosSuccess({ todos });
          }),
          catchError(error => {
            return of(TodoActions.loadTodosFailure({ error: error.message }));
          })
        )
      )
    )
  );


  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap(({ userId,todo }) =>
        this.todoService.addTodo(userId,todo).pipe(
          map(savedTodo => {
              this.messagesService.showTopLeft(
                  MESSAGE_SEVERITY.SUCCESS,
                  MESSAGE_SUMMARY.SUCCESS,
                  MESSAGES.TODO_SUCCESS_ADDED,
              )
            return TodoActions.addTodoSuccess({ todo: savedTodo });
          }),
          catchError(error => of(TodoActions.addTodoFailure({ error: error.message })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ userId,todo }) =>
        this.todoService.updateTodo(userId,todo).pipe(
          map(() =>

          {     this.messagesService.showTopLeft(
              MESSAGE_SEVERITY.SUCCESS,
              MESSAGE_SUMMARY.SUCCESS,
              MESSAGES.TODO_SUCCESS_UPDATED,
          )
              return TodoActions.updateTodoSuccess({ todo })}),
          catchError(error => of(TodoActions.updateTodoFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ userId,id }) =>
        this.todoService.deleteTodo(userId,id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id })),
          catchError(error => of(TodoActions.deleteTodoFailure({ error: error.message })))
        )
      )
    )
  );
}
