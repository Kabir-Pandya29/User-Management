import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'user', component: UserComponent }, 
  { path: '', redirectTo: '/user', pathMatch: 'full' }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // Ensure RouterModule is exported
})
export class AppRoutingModule {}