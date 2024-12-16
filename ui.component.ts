import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter-ui',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div>
      <button class="btn btn-primary">-</button>
      <span data-testid="current">0</span>
      <button class="btn btn-primary">+</button>
    </div>
  `,
  styles: ``,
})
export class UiComponent {}
