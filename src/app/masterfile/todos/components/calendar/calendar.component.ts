import { Component, computed, signal, Output, EventEmitter } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {getToday} from "../../../../shared/utils/getToday";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  readonly minDate = computed(() => getToday());
  readonly selectedDate = signal<Date | null>(getToday());

  @Output() dateChange = new EventEmitter<Date>();

  onDateSelect(date: Date): void {
    this.selectedDate.set(date);
    this.dateChange.emit(date);
  }

}
