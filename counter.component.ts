import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  template: `
    <!-- https://github.com/dmcghee99307/applied-angular-lab-dec-12-2024.git-->
    <div>
      <button class="btn btn-primary">-</button>
      <span data-testid="current">0</span>
      <button class="btn btn-primary">+</button>
    </div>
    <a class="link" routerLink="ui">UI</a>
    <router-outlet />
  `,
  styles: ``,
})
export class CounterComponent {}
