import { provideRouter, RouterConfig } from '@angular/router';
import { HeroesComponent } from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import { HeroDetailComponent } from './hero-detail.component';
import {InnerDashboardComponent} from './inner-dashboard.component';

const routes: RouterConfig = [
	{
		path: 'heroes',
		component: HeroesComponent
	},
	{
		path : 'dashboard',
		component : DashboardComponent
	},
	{
		path: 'my-heroes',
		component: HeroesComponent
	},
	{
		path : 'inner-dashboard',
		component : InnerDashboardComponent 
	},
	{
		path : 'detail/:id',
		component : HeroDetailComponent
	},
	{
		path : '',
		redirectTo : '/dashboard'
	}
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];