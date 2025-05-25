import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSexComboComponent } from './user-sex-combo.component';

describe('UserSexComboComponent', () => {
  let component: UserSexComboComponent;
  let fixture: ComponentFixture<UserSexComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSexComboComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSexComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
