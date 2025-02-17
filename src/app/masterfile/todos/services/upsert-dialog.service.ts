import { Injectable, WritableSignal, signal } from '@angular/core';
import { Todo } from '../models/todo.models';

export type DialogType = 'add' | 'update' | null;

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public isOpen: WritableSignal<boolean> = signal(false);
  public dialogType: WritableSignal<DialogType> = signal(null);

  public selectedTodo: WritableSignal<Todo | null> = signal(null);

  openDialog(type: DialogType, todo: Todo | null = null): void {
    this.dialogType.set(type);
    this.selectedTodo.set(todo);
    this.isOpen.set(true);
  }

  closeDialog(): void {
    this.isOpen.set(false);
    this.dialogType.set(null);
    this.selectedTodo.set(null);
  }
}
