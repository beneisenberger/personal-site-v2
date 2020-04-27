import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post, Comment } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  comments: Comment[];
  commentsSubscription: Subscription;
  editing: boolean = false;
  postId: string;
  content: string = "";

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private postService: PostService, 
    public auth: AuthService,
    private message: NzMessageService
  ) {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPost();
    this.getComments();
  }

  getPost() {
    this.postService.getPost(this.postId).subscribe({
        next: value => {
          this.post = value;
        },
        error: error => {
          console.log(error);
          this.message.create('warning', 'Failed to load post');
        }
      });
  }

  getComments() {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
    this.commentsSubscription = this.postService.getComments(this.postId).subscribe({
      next: (values) => {
        this.comments = values;
      },
      error: (error) => {
        console.log(error);
        this.message.create('warning', 'Failed to load comments')
        this.comments = [];
      }
    });
  }

  createComment(content: string) {
    const data = {
      author: this.auth.user.uid ? this.auth.user.uid : null ,
      authorId: this.auth.user.uid,
      authorImage: this.auth.user.photoURL,
      content: content,
      published: new Date(),
      postId: this.postId,
      id: new Date().getTime().toString()
    }
    this.postService.saveComment(data).catch(error => {
      this.message.error(error);
    })
    this.message.create("success", "Comment posted successfully");
  }


  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    this.postService.updatePost(this.postId, formData);
    this.editing = false;
  }
  

  deletePost() {
    this.postService.deletePost(this.postId);
    this.router.navigate(["/posts"]);
  }

  navigateBack() {
    this.router.navigate(["/posts"]);
  }

  deleteComment(id: string) {
    this.postService.deleteComment(id);
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
