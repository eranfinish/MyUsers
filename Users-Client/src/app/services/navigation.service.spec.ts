/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NanigationService } from './navigation.service';

describe('Service: Nanigation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NanigationService]
    });
  });

  it('should ...', inject([NanigationService], (service: NanigationService) => {
    expect(service).toBeTruthy();
  }));
});
