import { Routes } from '@angular/router';
import { FriendCreateComponent } from './components/friend-create.component';
import { FriendDetailsComponent } from './components/friend-details.component';
import { FriendListComponent } from './components/friend-list.component';
import { MealsComponent } from './meals.component';
import { FriendsStore } from './services/friends.store';
import { FriendsDataService } from './services/friends-data.service';

export const MEAL_ROUTES: Routes = [
  {
    path: '', // app routes, 'meals' points to this.
    component: MealsComponent,
    providers: [FriendsStore, FriendsDataService],
    children: [
      {
        path: 'list', // meals/list
        component: FriendListComponent,
        children: [
          {
            path: ':id', // meals/list/398398
            component: FriendDetailsComponent,
          },
        ],
      },
      {
        path: 'create', // meals/create
        component: FriendCreateComponent,
      },
    ],
  },
];
