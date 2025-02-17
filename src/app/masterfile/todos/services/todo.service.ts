import {inject, Injectable} from '@angular/core';
import {addDoc, collection, deleteDoc, doc, Firestore, updateDoc,} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {Todo} from '../models/todo.models';
import {catchError} from 'rxjs/operators';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({providedIn: 'root'})
export class TodoService {
    private firestore = inject(Firestore);
    private angularFirestore = inject(AngularFirestore);

    addTodo(userId: string, todo: Todo): Observable<Todo> {
        const userTodosCollection = collection(this.firestore, `todos/${userId}/tasks`);
        return from(
            addDoc(userTodosCollection, todo).then(docRef => ({...todo, id: docRef.id}))
        );
    }

    updateTodo(userId: string, todo: Todo): Observable<void> {
        const todoDoc = doc(this.firestore, `todos/${userId}/tasks/${todo.id}`);
        return from(updateDoc(todoDoc, {...todo}).then(() => {
        }));
    }

    deleteTodo(userId: string, id: string): Observable<void> {
        const todoDoc = doc(this.firestore, `todos/${userId}/tasks/${id}`);
        return from(deleteDoc(todoDoc).then(() => {
        }));
    }

    getUserTodos(userId: string): Observable<Todo[]> {
        return this.angularFirestore
            .collection<Todo>(`todos/${userId}/tasks`)
            .valueChanges({idField: 'id'})
            .pipe(
                catchError((error) => {
                    console.error('Error fetching todos:', error);
                    return of([]);
                })
            );
    }
}
