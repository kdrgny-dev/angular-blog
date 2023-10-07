import { Component, Inject, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Array<any> = [];
  displayedPosts: Array<any> = [];
  postPerPage = 6;

  constructor(private blogService: BlogService, public dialog: Dialog) {}

  ngOnInit() {
    this.blogService.getPosts().subscribe((res) => {
      this.posts = res;
      this.displayedPosts = this.posts.slice(0, this.postPerPage);
    });
  }

  loadMore() {
    const currentLength = this.displayedPosts.length;
    const morePosts = this.posts.slice(
      currentLength,
      currentLength + this.postPerPage
    );
    this.displayedPosts = this.displayedPosts.concat(morePosts);
  }

  openDialog(element: any, viewOrUpdate: any): void {
    this.dialog.open<string>(DialogComponent, {
      width: '90%',
      data: { post: element, isUpdate: viewOrUpdate },
    });
  }
}
