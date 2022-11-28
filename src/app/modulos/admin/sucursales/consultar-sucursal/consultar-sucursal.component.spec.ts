import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSucursalComponent } from './consultar-sucursal.component';

describe('ConsultarSucursalComponent', () => {
  let component: ConsultarSucursalComponent;
  let fixture: ComponentFixture<ConsultarSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarSucursalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
