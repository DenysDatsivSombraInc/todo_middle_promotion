import {Component, OnInit, inject, Input, effect, signal, computed} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from '../services/upsert-dialog.service';
import { Store } from '@ngrx/store';
import { addTodo, updateTodo } from '../store/actions/todo.actions';
import { Todo } from '../models/todo.models';
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { Button } from "primeng/button";
import { FloatLabelModule } from "primeng/floatlabel";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ReactiveFormsModule } from "@angular/forms";
import { takeUntil } from 'rxjs';
import { ClearObservable } from "../../../shared/utils/clear-observable";
import { User } from "@angular/fire/auth";
import {UPSERT_FORM_CONTROLS} from "../constants/upsert-form.constants";
import {UPSERT_VALIDATION} from "../constants/upsert-validation.constants";
import {getToday} from "../../../shared/utils/getToday";

@Component({
  selector: 'app-upsert-form',
  standalone: true,
  imports: [
    DialogModule,
    Button,
    FloatLabelModule,
    CalendarModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule
  ],
  templateUrl: './upsert-form.component.html',
  styleUrl: './upsert-form.component.scss'
})
export class UpsertFormComponent extends ClearObservable implements OnInit {
  public readonly dialogService = inject(DialogService);
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  readonly minDate = computed(() => getToday());

  todoForm!: FormGroup;
  isEditMode = false;
  currentTodo: Todo | null = null;
  @Input() userData: User;

  isModified = signal(false);
  initialFormValues: Todo;

  constructor() {
    super();
    effect(() => {
      const todoToEdit = this.dialogService.selectedTodo();
      if (todoToEdit) {
        this.isEditMode = true;
        this.currentTodo = todoToEdit;
        this.todoForm.patchValue({
          title: todoToEdit.title,
          description: todoToEdit.description,
          dueDate: todoToEdit.dueDate ? new Date(todoToEdit.dueDate) : null,
        });

        this.initialFormValues = this.todoForm.getRawValue();
        this.isModified.set(false);
      } else {
        this.isEditMode = false;
        this.currentTodo = null;
        this.todoForm.reset();
        this.isModified.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.isFormPristine();
  }

  private initForm(): void {
    this.todoForm = this.fb.group({
      [UPSERT_FORM_CONTROLS.TITLE]: [UPSERT_VALIDATION.TITLE],
      [UPSERT_FORM_CONTROLS.DESCRIPTION]: [UPSERT_VALIDATION.DESCRIPTION],
      [UPSERT_FORM_CONTROLS.DUE_DATE]: [UPSERT_VALIDATION.DUE_DATE]
    });
  }

  isFormPristine (){
    this.todoForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.isModified.set(this.hasFormChanged());
        });
  }

  private hasFormChanged(): boolean {
    const currentValues = this.todoForm.getRawValue();
    return Object.keys(this.initialFormValues).some(
      key => currentValues[key] !== this.initialFormValues[key]
    );
  }

  submitNewTodo(): void {
    if (this.todoForm.invalid) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      dueDate: this.todoForm.value.dueDate?.toISOString() || '',
      creationDate: new Date().toISOString() || '',
    };

    this.store.dispatch(addTodo({ userId: this.userData.uid, todo: newTodo }));
    this.dialogService.closeDialog();
  }

  updateExistingTodo(): void {
    if (this.todoForm.invalid || !this.currentTodo) return;

    const updatedTodo: Todo = {
      ...this.currentTodo,
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      dueDate: this.todoForm.value.dueDate?.toISOString() || ''
    };

    this.store.dispatch(updateTodo({ userId: this.userData.uid, todo: updatedTodo }));
    this.dialogService.closeDialog();
  }

  protected readonly UPSERT_FORM_CONTROLS = UPSERT_FORM_CONTROLS;
}
