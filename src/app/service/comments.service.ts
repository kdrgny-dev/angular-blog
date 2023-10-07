import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService extends BaseService {
  constructor(private baseService: BaseService) {
    super(baseService.http);
  }

  public getComments() {
    return this.baseService.getReq(`/comments`);
  }
}
