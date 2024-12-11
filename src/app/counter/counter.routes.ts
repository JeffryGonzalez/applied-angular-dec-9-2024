import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { PrefsComponent } from './pages/prefs.component';
import { UiComponent } from './pages/ui.component';
import { CounterStore } from './services/counter.store';

export const COUNTER_ROUTES: Routes = [
  {
    path: '',
    component: CounterComponent,
    providers: [CounterStore],
    children: [
      {
        path: 'ui',
        component: UiComponent,
      },
      {
        path: 'prefs',
        component: PrefsComponent,
      },
    ],
  },
];
