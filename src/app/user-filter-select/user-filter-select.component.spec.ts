import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFilterSelectComponent } from './user-filter-select.component';

describe('UserFilterSelectComponent', () => {
  let component: UserFilterSelectComponent;
  let fixture: ComponentFixture<UserFilterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFilterSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFilterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
