import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: ':id', component: PostDetailComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
