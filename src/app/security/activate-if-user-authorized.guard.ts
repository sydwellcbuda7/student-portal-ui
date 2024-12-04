import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Role } from '../shared/enums/role.enum';
import {AccessControlService} from "../shared/service/access-control.service";

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  constructor(private router: Router, private accessControlService: AccessControlService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Allow public routes
    if (route.data?.['permitAll']) {
      return true;
    }

    // Get logged-in user info
    const loggedInUserInfo = this.accessControlService.getSessionContext();
    if (loggedInUserInfo && route.data?.['authorizedRoles']) {
      const routeAuthorizedRoles: Role[] = route.data['authorizedRoles'];

      // Check if user has required role
      const hasAccess = routeAuthorizedRoles.some(role => loggedInUserInfo.role === role);
      if (hasAccess) {
        return of(true);
      }

      // If no access, log out and redirect
      this.accessControlService.logout();
      return of(false);
    }

    // Handle unauthenticated user
    this.accessControlService.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return of(false);
  }
}
