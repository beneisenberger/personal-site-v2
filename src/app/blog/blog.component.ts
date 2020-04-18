import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Subscription } from 'rxjs';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;
  postsSubscription: Subscription;

  addPostModalVisible: boolean = false;
  newPostId: string;
  editPostModalVisible: boolean = false;
  loading: boolean = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private message: NzMessageService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.getPosts();
  }

  getPosts() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    this.postsSubscription = this.postService.getPosts().subscribe({
      next: (values) => {
        this.posts = values;
        this.loading = false;
      },
      error: (error) => {
        this.message.create('error', error)
        this.posts = [];
        this.loading = false;
      }
    });
  }

  showAddPostModal() {
    this.newPostId = new Date().getTime().toString();
    this.addPostModalVisible = true;
  }

  closeAddPostModal(saved: boolean) {
    this.newPostId = '';
    this.addPostModalVisible = false;
  }

  savePost = async (
    entity: 'posts',
    primaryKey: string,
    formValues: any
  ) => {
    const post: Post = null;
    post.id = primaryKey;
    Object.assign(post, formValues);
    await this.postService.savePost(post);
  };

  showEditPostModal() {
    this.editPostModalVisible = true;
  }

  closeEditPostModal(saved: boolean) {
    this.editPostModalVisible = false;
  }

  navigateToPost(postId: string) {
    console.log(postId);
    this.router.navigate([`/${postId}`]);
  }

  login() {
    this.auth.googleLogin();
  }

  logout() {
    this.auth.logout();
  }
}
