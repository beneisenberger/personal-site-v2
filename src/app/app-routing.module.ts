import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { victimsOfCircumstanceKey } from '../environments/environment'
import { NewAlbumComponent } from './media/new-album/new-album.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { MediaComponent } from './media/media.component';
import { CodeComponent } from './code/code.component';
import { ContactComponent } from './contact/contact.component';
import { ShowsComponent } from './shows/shows.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'posts', component: BlogComponent},
  {path: 'media', component: MediaComponent},
  {path: 'code', component: CodeComponent},
  {path: 'shows', component: ShowsComponent},
  {path: 'contact', component: ContactComponent},
  {path: `${victimsOfCircumstanceKey}`, component: NewAlbumComponent},
  {path: 'posts/:id', component: PostDetailComponent},
  {path: '**', redirectTo: 'about'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
