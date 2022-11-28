import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarMascotaComponent } from './filtrar-mascota.component';

describe('FiltrarMascotaComponent', () => {
  let component: FiltrarMascotaComponent;
  let fixture: ComponentFixture<FiltrarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarMascotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
