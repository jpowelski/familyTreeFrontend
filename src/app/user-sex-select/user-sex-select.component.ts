import { Component, Input, forwardRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {UserSex} from '../user';

export interface EnumOption {
  key: string; // The enum key, e.g., 'ACTIVE'
  value: UserSex; // The enum value, e.g., UserSex.ACTIVE ('Active')
  label: string; // The text to display in the dropdown
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
  @Input() label: string = 'User Status';
  @Input() placeholder: string = '--- Select Status ---';
  // @Input() displayKeyAsLabel: boolean = false; // You can keep or remove this if always displaying value

  options: EnumOption[] = [];
  selectedValue: UserSex | null = null;
  isDisabled: boolean = false;

  onChange: (value: UserSex | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Generate options directly from the imported UserSex enum
    this.options = Object.keys(UserSex).map(key => {
      const enumValue = UserSex[key as keyof typeof UserSex];
      return {
        key: key,
        value: enumValue,
        // label: this.displayKeyAsLabel ? key : enumValue // Uncomment if you keep displayKeyAsLabel
        label: enumValue // Directly use the enum value as the label
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
    const value = selectElement.value as UserSex; // Cast to UserSex

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
