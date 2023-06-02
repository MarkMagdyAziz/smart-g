import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sg-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];
  // isLastPage:boolean=false
  ngOnInit(): void {
    const pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1, pagesCount);
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }
  onNextOrPrev(key:string){
    switch (key) {
      case 'prev':
        --this.currentPage
        this.changePage.emit(this.currentPage)
        // this.isLastPage = false
        break;
        case 'next':
          ++this.currentPage
          this.changePage.emit(this.currentPage)
          // this.isLastPage =  this.total / this.limit == this.currentPage
          break;
      default:
        break;
    }
  }
}
