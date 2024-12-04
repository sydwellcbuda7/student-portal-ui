import {AuthorizedRoutes} from "../security/authorized-route";
import {Role} from "../shared/enums/role.enum";
import {HomeComponent} from "./home/home.component";
import {ContentWrapperComponent} from "../shared/content-wrapper/content-wrapper.component";

export const routes: AuthorizedRoutes = [

  {
    path: '',
    component: HomeComponent, // Default route
    pathMatch: 'full', // Ensures this matches exactly the empty path
    data: { permitAll: true }
  },

  {
    path: 'admin',
    component: ContentWrapperComponent,
    loadChildren: () => import('./../admin/admin.module').then(m => m.AdminModule),
    data: { authorizedRoles: [Role.ADMIN]}
  },

  {
    path: 'student',
    authorizedRoles: [Role.STUDENT],
    component: ContentWrapperComponent,
    data: { authorizedRoles: [Role.STUDENT]},
    loadChildren: () => import('./../student/student.module').then(m => m.StudentModule)
  }

  ];


// {
//   path: '',
//   redirectTo: 'home',
//   pathMatch: 'full'
// },
// {
//   path: 'home',
//   component: HomeComponent,
//   permitAll: true
// },
