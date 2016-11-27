import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { VoteControllerComponent } from './vote-controller.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },    
    {
        path: 'vote-controller',
        component: VoteControllerComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [HomeComponent, VoteControllerComponent];
