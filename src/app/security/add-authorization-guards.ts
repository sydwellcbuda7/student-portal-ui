import {Routes} from '@angular/router';
import {AuthorizedUserGuard} from './activate-if-user-authorized.guard';

export function addAuthorizationGuards(routes: Routes): Routes {
  addAuthorizationGuardsToRoutesHavingPathsAndComponents(routes);
  return routes;

  function addAuthorizationGuardsToRoutesHavingPathsAndComponents(routesToGuard: Routes) {
    for (const route of routesToGuard) {
      if (route.path && route.component) {
        route.canActivate = route.canActivate || [];
        route.canActivate.push(AuthorizedUserGuard);
      }
      if (route.children) {
        addAuthorizationGuardsToRoutesHavingPathsAndComponents(route.children);
      }
    }
  }
}
