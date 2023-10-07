import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommentsService } from 'src/app/service/comments.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  isUpdate: boolean = false;
  imgUrl: string = '';
  title: string = '';
  body: string = '';
  commentsData: Array<any> = [];
  postElement: any;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private dialogRef: DialogRef<DialogComponent>,
    private commentService: CommentsService,
    private blogService: BlogService
  ) {
    if (data.isUpdate) {
      this.isUpdate = true;
      this.form.patchValue({
        title: data.post.title,
        body: data.post.body,
      });
      this.postElement = data.post;
    } else {
      this.imgUrl = data.post.imageId.toString();
      this.title = data.post.title;
      this.body = data.post.body;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const request = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      imageId: this.data.post.imageId,
      userId: this.data.post.userId,
    };

    this.blogService.updatePost(this.data.post.id, request).subscribe((res) => {
      this.postElement.title = request.title;
      this.postElement.body = request.body;
      this.closeDialog();
    });
  }

  ngOnInit() {
    this.commentService.getComments().subscribe((res) => {
      this.commentsData = res.filter(
        (comment: any) => comment.postId === this.data.post.id
      );
    });
  }
}
