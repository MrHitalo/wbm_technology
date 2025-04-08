import { TestBed } from '@angular/core/testing';

import { ModbusService } from './modbus.service';

describe('ModbusService', () => {
  let service: ModbusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModbusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
