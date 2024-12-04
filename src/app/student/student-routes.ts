import {Role} from "../shared/enums/role.enum";
import {AuthorizedRoute} from "../security/authorized-route";
import {DashboardComponent} from "../shared/dashboard/dashboard.component";

export const studentRoutes: AuthorizedRoute[] = [
  {
    path: '',
    authorizedRoles: [Role.STUDENT],
    component: DashboardComponent,
  }
]
