import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  
  private url = "https://inventory-7e4bc.firebaseio.com/.json";
  constructor(private http:Http) { }

  storeData(servers: any[]){
    return this.http.post(this.url, servers);
  }

  getPosts(){
    return this.http.get(this.url);
  }
  createPost(post){
    return this.http.post(this.url, JSON.stringify(post));
  }
  updatePost(post){
    return this.http.patch(this.url + '/' + post.id,JSON.stringify(post));
  }
  deletePost(id){
    return this.http.delete(this.url + '/' + id);    
  }
}
