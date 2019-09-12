import { TestBed } from '@angular/core/testing';

import { ServicioOfflineService } from './servicio-offline.service';

describe('ServicioOfflineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicioOfflineService = TestBed.get(ServicioOfflineService);
    expect(service).toBeTruthy();
  });
});
