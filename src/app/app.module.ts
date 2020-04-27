import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { MediaComponent } from './media/media.component';
import { CodeComponent } from './code/code.component';
import { ContactComponent } from './contact/contact.component';
import { ShowsComponent } from './shows/shows.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { NewPostComponent } from './blog/new-post/new-post.component';
// import { QuillModule } from 'ngx-quill';
import { NewAlbumComponent } from './media/new-album/new-album.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BlogComponent,
    MediaComponent,
    CodeComponent,
    ContactComponent,
    ShowsComponent,
    PostDetailComponent,
    NewPostComponent,
    NewAlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // QuillModule.forRoot() 
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
