import { TestBed } from '@angular/core/testing';

import { PreferencesMngService } from './preferences-mng.service';

describe('PreferencesMngService', () => {
  let service: PreferencesMngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferencesMngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
