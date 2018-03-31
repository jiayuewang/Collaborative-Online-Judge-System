import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

const routes: Routes = [
	{
		path: '', //first path(index.html)
		redirectTo: 'problems',
		pathMatch: 'full'
	},
	{
		path: 'problems', //problem list
		component: ProblemListComponent
	},
	{
		path: 'problems/:id', //problem detail
		component: ProblemDetailComponent,
		canActivate: ['authGuard']
	},
	{
		path: '**',
		redirectTo: 'problems' 
	}
];

export const routing = RouterModule.forRoot(routes);