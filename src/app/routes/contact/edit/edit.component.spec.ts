import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditContactComponent;
  let fixture: ComponentFixture<EditContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
