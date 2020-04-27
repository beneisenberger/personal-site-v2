import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Post, Comment } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  db = firebase.firestore();

  private postsSubject: BehaviorSubject<Post[]> = null;
  private postSubject: BehaviorSubject<Post> = null;
  private commentsSubject: BehaviorSubject<Comment[]> = null;
  private loadedPostId: string;

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService
  ) {}

  async savePost(post: Post) {
    this.db
      .collection('posts')
      .doc(post.id)
      .set({ ...post });
  }

  async updatePost(postId: string, content) {
    this.db
      .collection('posts')
      .doc(postId)
      .update({ title: content.title, content: content.content });
  }

  async deletePost(postId: string) {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete Post',
      nzContent:
        'This cannot be undone.',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        try {
          this.db
            .collection('posts')
            .doc(postId)
            .delete();
          this.message.create('success', 'Post Deleted!');
        } catch (e) {
          console.error(e);
          this.message.create('error', 'Failed to delete post.');
        }
      }
    });
  }

  getPost(postId: string): Observable<Post> {
    if (this.loadedPostId !== postId || !this.postSubject) {
      this.postSubject = new BehaviorSubject(null);
      this.db
      .collection('posts')
      .doc(postId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          let post = snapshot.data();
          post.published = post.published.toDate();
          this.postSubject.next(post as Post);
        } else {
          this.postSubject.error('Post does not exist');
        }
      });
    }
    return this.postSubject.asObservable();
  }

  getPosts(): Observable<Post[]> {
    if (!this.postsSubject) {
      this.postsSubject = new BehaviorSubject(null);
      let query = this.db.collection('posts').orderBy('published', 'desc');
      query.onSnapshot(
        snapshot => {
          let posts: Post[] = [];
          snapshot.docs.forEach(doc => {
            let post = doc.data();
            post.published = post.published.toDate();
            posts.push(post as Post);
          });
          this.postsSubject.next(posts);
        },
        error => {
          this.message.create('error', 'Failed to load posts.');
          console.error(error);
          this.postsSubject.error(error);
        }
      );
    }
    return this.postsSubject.asObservable();
  }

  getComments(postId: string): Observable<Comment[]> {
    if (!this.commentsSubject) {
      this.commentsSubject = new BehaviorSubject(null);
      let query = this.db.collection('comments').where('postId', '==', postId);
      query.onSnapshot(
        snapshot => {
          let comments: Comment[] = [];
          snapshot.docs.forEach(doc => {
            let comment = doc.data();
            comment.published = comment.published.toDate();
            comments.push(comment as Comment);
          });
          this.commentsSubject.next(comments);
        },
        error => {
          this.message.create('error', 'Failed to load comments.');
          console.error(error);
          this.commentsSubject.error(error);
        }
      );
    }
    return this.commentsSubject.asObservable();
  }

  async saveComment(comment: Comment) {
    this.db
      .collection('comments')
      .doc(comment.id)
      .set({ ...comment });
  }

  async deleteComment(commentId: string) {
    this.modalService.confirm({
      nzTitle: 'Confirm Delete Comment',
      nzContent:
        'This cannot be undone.',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        try {
          this.db
            .collection('comments')
            .doc(commentId)
            .delete();
          this.message.create('success', 'Comment Deleted!');
        } catch (e) {
          console.error(e);
          this.message.create('error', 'Failed to delete comment.');
        }
      }
    });
  }
}