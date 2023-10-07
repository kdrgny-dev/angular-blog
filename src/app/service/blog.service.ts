import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends BaseService {
  constructor(private baseService: BaseService) {
    super(baseService.http);
  }

  public getPosts() {
    return this.baseService.getReq('/posts');
  }

  public updatePost(id: any, data: any) {
    return this.baseService.putReq('/posts/' + id, data);
  }
}
