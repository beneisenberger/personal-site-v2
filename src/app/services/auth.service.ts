import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = firebase.auth();
  user: firebase.User
  isNewUser: boolean;
  postSubject: BehaviorSubject<string>;

  constructor(private route: ActivatedRoute) {
    this.subscribeUser();
    this.getPost();
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

 getPost() {
  return new Observable(observer => {
      this.route.paramMap.subscribe(async res => {
        const postId = res;
        console.log(res);
        observer.next(postId);
      });
    })
  }

  subscribeUser() {
    const self = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        self.user = user;
      } else {
        self.logout();
      }
    });
  }

  getLocalUser() {
    this.user = JSON.parse(localStorage.getItem('User'));
  }

  saveUser(user: firebase.User) {
    localStorage.setItem('User', JSON.stringify(user));
  }

  clearLocalUser() {
    this.user = undefined;
    localStorage.clear();
  }

  async setUser(user: firebase.User) {
    this.user = user;
    this.saveUser(user);
  }

  get isAuthenticated() {
    return this.user !== undefined && this.user !== null;
  }

  get uid() {
    if (this.user) {
      return this.user.uid;
    }
    return null;
  }

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    this.isNewUser = result.additionalUserInfo.isNewUser;
    await this.setUser(result.user);
  }

  logout() {
    this.auth.signOut();
    this.clearLocalUser();
  }

}
