import { TestBed, inject } from '@angular/core/testing';

import { EntrantsService } from './entrants.service';

describe('EntrantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntrantsService]
    });
  });

  it('should be created', inject([EntrantsService], (service: EntrantsService) => {
    expect(service).toBeTruthy();
  }));
});
