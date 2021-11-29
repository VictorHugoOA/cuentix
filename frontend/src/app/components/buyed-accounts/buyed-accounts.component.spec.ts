import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyedAccountsComponent } from './buyed-accounts.component';

describe('BuyedAccountsComponent', () => {
  let component: BuyedAccountsComponent;
  let fixture: ComponentFixture<BuyedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyedAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
