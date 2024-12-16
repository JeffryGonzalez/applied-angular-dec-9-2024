import { CounterComponent } from './counter.component';
import { Routes } from '@angular/router';
import { UiComponent } from './pages/ui.component';

export const COUNTER_ROUTES: Routes = [
  {
    path: 'ui',
    component: CounterComponent,
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
    ],
  },
];
