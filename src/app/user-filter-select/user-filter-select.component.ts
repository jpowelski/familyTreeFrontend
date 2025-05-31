import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../user';
import {JsonPipe, LowerCasePipe, NgForOf, NgIf} from '@angular/common';

export interface UserSelectOption {
  key: string;
  value: User;
  label: string;
}

@Component({
  selector: 'user-filter-select',
  imports: [
    JsonPipe,
    LowerCasePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  template: `
    options = {{ options | json }}
    <div>
      <label *ngIf="label" [for]="label | lowercase">{{ label }}:</label>
      <select
        [id]="label | lowercase"
        [ngModel]="selectedUserId"
        (change)="onSelectionChange($event)"
        [disabled]="isDisabled"
        class="form-control"
      >
        <option *ngIf="placeholder" [ngValue]="null">{{ placeholder }}</option>
        <option *ngFor="let option of options" [value]="option.id">
          {{ option.firstName + ' ' + option.lastName }}
        </option>
      </select>
    </div>
  `,
  styleUrl: './user-filter-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFilterSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFilterSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Użytkownik';
  @Input() placeholder: string = '--- Wybierz użytkownika ---';

  options: User[] = [];
  selectedUserId: number | null = null;
  isDisabled: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private userService: UserService) {
  }

  onChange: (value: number | null) => void = () => {
  };

  onTouched: () => void = () => {
  };

  ngOnInit() {
    this.userService.findAllFiltered().subscribe(data => {
      this.options = data;
    });
  }

  writeValue(value: User | null | undefined): void {
    this.selectedUserId = value?.id || null;
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdRef.markForCheck();
  }

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = +selectElement.value;

    if (value) {
      this.selectedUserId = value;
      this.onChange(value);
    } else {
      this.selectedUserId = null;
      this.onChange(null);
    }
    this.onTouched();
  }

}
