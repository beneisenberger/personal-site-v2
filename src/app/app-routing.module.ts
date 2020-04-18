import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { BlogComponent } from './blog/blog.component';


const routes: Routes = [
  {path: ':id', component: PostDetailComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
