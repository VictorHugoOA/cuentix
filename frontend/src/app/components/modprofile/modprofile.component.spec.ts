import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModprofileComponent } from './modprofile.component';

describe('ModprofileComponent', () => {
  let component: ModprofileComponent;
  let fixture: ComponentFixture<ModprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
