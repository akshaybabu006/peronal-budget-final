import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurebudgetComponent } from './configurebudget.component';

describe('ConfigurebudgetComponent', () => {
  let component: ConfigurebudgetComponent;
  let fixture: ComponentFixture<ConfigurebudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurebudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurebudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
