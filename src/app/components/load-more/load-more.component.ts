import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.css'],
})
export class LoadMoreComponent implements OnInit {
  @Output() loadMore: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onLoadMoreClick(): void {
    this.loadMore.emit();
  }
}
