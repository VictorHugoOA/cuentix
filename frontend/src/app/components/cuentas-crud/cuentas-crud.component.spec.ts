import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasCrudComponent } from './cuentas-crud.component';

describe('CuentasCrudComponent', () => {
  let component: CuentasCrudComponent;
  let fixture: ComponentFixture<CuentasCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
