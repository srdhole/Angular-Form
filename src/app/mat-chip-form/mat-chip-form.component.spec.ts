import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatChipFormComponent } from './mat-chip-form.component';

describe('MatChipFormComponent', () => {
  let component: MatChipFormComponent;
  let fixture: ComponentFixture<MatChipFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatChipFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatChipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
