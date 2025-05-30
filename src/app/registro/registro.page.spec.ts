import { TestBed } from '@angular/core/testing';
import { TestingService } from '../testing.service';

describe('RegistroPage', () => {
  let service: TestingService;

  beforeEach((() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestingService);
    
  }));

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('Validar registro', () => {
    const nombre1 = 'Coffy Jiménez';
    const correo1 = 'coffy@coffy.cl';
    const edad1 = 25;
    const rol1 = 'pasajero';
    const contrasena1 = '1234567';
    let esValido1 = service.validarRegistro(nombre1, correo1, edad1, rol1, contrasena1);
    expect(esValido1).toBeTrue;
  });

  it('Validar registro', () => {
    const nombre2 = '';
    const correo2 = 'coffy@coffy.cl';
    const edad2 = 25;
    const rol2 = 'pasajero';
    const contrasena2 = '1234567';
    let esValido2 = service.validarRegistro(nombre2, correo2, edad2, rol2, contrasena2);
    expect(esValido2).toBeFalse;
  });

  it('Validar registro', () => {
    const nombre3 = 'Coffy Jiménez';
    const correo3 = 'coffy@coffy';
    const edad3 = 25;
    const rol3 = 'pasajero';
    const contrasena3 = '1234567';
    let esValido3 = service.validarRegistro(nombre3, correo3, edad3, rol3, contrasena3);
    expect(esValido3).toBeFalse;
  });

  it('Validar registro', () => {
    const nombre4 = 'Coffy Jiménez';
    const correo4 = 'coffy@coffy.cl';
    const edad4 = 17;
    const rol4 = 'pasajero';
    const contrasena4 = '1234567';
    let esValido4 = service.validarRegistro(nombre4, correo4, edad4, rol4, contrasena4);
    expect(esValido4).toBeFalse;
  });

  it('Validar registro', () => {
    const nombre5 = 'Coffy Jiménez';
    const correo5 = 'coffy@coffy.cl';
    const edad5 = 25;
    const rol5 = 'Perro';
    const contrasena5 = '1234567';
    let esValido5 = service.validarRegistro(nombre5, correo5, edad5, rol5, contrasena5);
    expect(esValido5).toBeFalse;
  });

  it('Validar registro', () => {
    const nombre6 = 'Coffy Jiménez';
    const correo6 = 'coffy@coffy.cl';
    const edad6 = 25;
    const rol6 = 'pasajero';
    const contrasena6 = '12345';
    let esValido6 = service.validarRegistro(nombre6, correo6, edad6, rol6, contrasena6);
    expect(esValido6).toBeFalse;
  });

});
