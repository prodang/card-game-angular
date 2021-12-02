import { TestBed } from '@angular/core/testing';

import { AuthMngService } from './auth-mng.service';

describe('AuthMngService', () => {
  let service: AuthMngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthMngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
