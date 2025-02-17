import { Component, effect, inject, signal, Signal } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectUserLoading } from '../../authentication/store/selectors/auth.selectors';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { User } from '@angular/fire/auth';
import { loadTodos } from '../store/actions/todo.actions';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { CalendarComponent } from '../components/calendar/calendar.component';
import {DialogService} from "../services/upsert-dialog.service";
import {UpsertFormComponent} from "../upsert-form/upsert-form.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    Button,
    CardModule,
    DialogModule,
    ProgressSpinnerModule,
    CalendarModule,
    DatePipe,
    TodoListComponent,
    CalendarComponent,
    UpsertFormComponent,
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private readonly store = inject(Store);
  public readonly dialogService = inject(DialogService);

  readonly user: Signal<User | null> = this.store.selectSignal(selectCurrentUser);
  readonly isLoading = this.store.selectSignal(selectUserLoading);


  readonly selectedDate = signal<Date | null>(new Date());

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (currentUser) {
        this.store.dispatch(loadTodos({ userId: currentUser.uid }));
      }
    }, { allowSignalWrites: true });
  }

  showDialog(): void {
    this.dialogService.openDialog("add",null);
  }

  handleDateChange(date: Date): void {
    this.selectedDate.set(date);
  }

}
