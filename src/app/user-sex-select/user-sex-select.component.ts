import { Component, Input, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UserSex} from '../user';

export interface EnumOption {
  key: string;
  value: UserSex;
  label: string;
}

@Component({
  selector: 'user-sex-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <label *ngIf="label" [for]="label | lowercase">{{ label }}:</label>
      <select
        [id]="label | lowercase"
        [ngModel]="selectedValue"
        (change)="onSelectionChange($event)"
        [disabled]="isDisabled"
        class="form-control"
      >
        <option *ngIf="placeholder" [ngValue]="null">{{ placeholder }}</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  `,
  styleUrls: ['./user-sex-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSexSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSexSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Płeć';
  @Input() placeholder: string = '--- Wybierz płeć ---';

  options: EnumOption[] = [];
  selectedValue: UserSex | null = null;
  isDisabled: boolean = false;

  onChange: (value: UserSex | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.options = Object.keys(UserSex).map(key => {
      const enumValue = UserSex[key as keyof typeof UserSex];
      return {
        key: key,
        value: enumValue,
        label: enumValue
      };
    });
  }

  writeValue(value: UserSex | null): void {
    this.selectedValue = value;
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: (value: UserSex | null) => void): void {
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
    const value = selectElement.value as UserSex;

    if (value && Object.values(UserSex).includes(value)) {
      this.selectedValue = value;
      this.onChange(this.selectedValue);
    } else {
      this.selectedValue = null;
      this.onChange(null);
    }
    this.onTouched();
  }
}
