import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';
import { PasssengerViewerComponent } from './containers/passenger-viewer/passenger-viewer.component';
import { PassengerFormComponent } from './components/passenger-forms/passenger-form.component';

// components
import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';

// service
import { PassengerDashboardService } from './models/passenger-dashboard.service';

const routes: Routes = [
 {
  path: 'passengers',
  children: [
    { path: '', component: PassengerDashboardComponent },
    { path: ':id', component: PasssengerViewerComponent }
  ]
 }
];

@NgModule({
  declarations: [
    PassengerDashboardComponent,
    PasssengerViewerComponent,
    PassengerCountComponent,
    PassengerDetailComponent,
    PassengerFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PassengerDashboardService
  ]
})
export class PassengerDashboardModule {}