import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAccountsComponent } from './seller-accounts.component';

describe('SellerAccountsComponent', () => {
  let component: SellerAccountsComponent;
  let fixture: ComponentFixture<SellerAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
