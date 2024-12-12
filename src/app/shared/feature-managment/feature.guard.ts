import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { FeaturesService } from './feature.service';

export const canMatchFeature =
  (feature: string): CanMatchFn =>
  () => {
    const featuresService = inject(FeaturesService);
    return featuresService
      .getEnabledFeatures()
      .pipe(map((r) => r.includes(feature)));
  };
