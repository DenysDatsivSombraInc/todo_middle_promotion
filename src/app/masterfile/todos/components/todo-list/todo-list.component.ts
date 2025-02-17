import { Component, computed, inject, Input, Signal, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { DatePipe, NgClass } from '@angular/common';
import { Todo } from '../../models/todo.models';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/reducers/todo.reducer';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { CardModule } from 'primeng/card';
import { deleteTodo, updateTodo } from '../../store/actions/todo.actions';
import { DialogService } from "../../services/upsert-dialog.service";
import { TODO_MENU_OPTIONS } from '../../constants/todo.constants';
import {DIALOG_ACTIONS} from "../../constants/dialog.constants";
import {User} from "@angular/fire/auth";
import {selectAllTodos} from "../../store/selectors/todo.selectors";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [Button, DatePipe, TieredMenuModule, CardModule, NgClass],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  private readonly store = inject(Store<TodoState>);
  private readonly dialogService = inject(DialogService);

  @Input() userData: User;
  @Input() selectedDate!: Signal<Date | null>;

  selectedTodo = signal<Todo | null>(null);
  readonly todos = computed(() => this.store.selectSignal(selectAllTodos)());
  readonly filteredTodos = computed(() => this.getTodosForSelectedDate());

  menuItems: any[] = [];

  private getTodosForSelectedDate(): Todo[] {
    const selectedDateValue = this.selectedDate();
    if (!selectedDateValue) return [];
    return this.todos()?.filter(todo => {
      const todoDate = new Date(todo.dueDate);
      return todoDate.toDateString() === selectedDateValue.toDateString();
    }) || [];
  }

  openMenu(todo: Todo, event: Event, menu: any) {
    this.selectedTodo.set(todo);
    this.updateMenuItems(todo);
    menu.toggle(event);
  }

  private updateMenuItems(todo: Todo) : void {
    this.menuItems = [
      {
        label: todo.checkMark ? TODO_MENU_OPTIONS.MARK_AS_UNDONE.label : TODO_MENU_OPTIONS.MARK_AS_DONE.label,
        icon: todo.checkMark ? TODO_MENU_OPTIONS.MARK_AS_UNDONE.icon : TODO_MENU_OPTIONS.MARK_AS_DONE.icon,
        command: () => this.toggleTodoCompletion(todo)
      },
      {
        label: TODO_MENU_OPTIONS.EDIT.label,
        icon: TODO_MENU_OPTIONS.EDIT.icon,
        command: () => this.editTodo()
      },
      {
        label: TODO_MENU_OPTIONS.DELETE.label,
        icon: TODO_MENU_OPTIONS.DELETE.icon,
        command: () => this.deleteTodo()
      }
    ];
  }

  private editTodo(): void {
    const todo = this.selectedTodo();
    if (!todo) return;
    this.dialogService.openDialog(DIALOG_ACTIONS.UPDATE, todo);
  }


  private deleteTodo(): void {
    const todo = this.selectedTodo();
    if (!todo) return;
    if (confirm(`Are you sure you want to delete "${todo.title}"?`)) {
      this.store.dispatch(deleteTodo({ userId: this.userData.uid, id: todo.id }));
    }
  }

  private toggleTodoCompletion(todo: Todo): void {
    const updatedTodo: Todo = {
      ...todo,
      checkMark: !todo.checkMark,
      completionDate: !todo.checkMark ? new Date().toISOString() : null
    };

    this.store.dispatch(updateTodo({ userId: this.userData.uid, todo: updatedTodo }));
  }
}
