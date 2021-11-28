import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAccountDetailsComponent } from './buy-account-details.component';

describe('BuyAccountDetailsComponent', () => {
  let component: BuyAccountDetailsComponent;
  let fixture: ComponentFixture<BuyAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyAccountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
