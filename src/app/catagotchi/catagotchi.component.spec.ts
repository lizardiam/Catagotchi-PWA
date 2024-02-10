import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagotchiComponent } from './catagotchi.component';

describe('CatagotchiComponent', () => {
  let component: CatagotchiComponent;
  let fixture: ComponentFixture<CatagotchiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatagotchiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatagotchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
