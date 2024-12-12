import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FEATURE_FLAG_URL } from '.';

@Injectable({ providedIn: 'root' })
export class FeaturesService {
  #client = inject(HttpClient);

  public getEnabledFeatures() {
    return this.#client.get<string[]>(FEATURE_FLAG_URL);
  }
}
