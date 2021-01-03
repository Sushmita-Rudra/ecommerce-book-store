import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../models/book';
import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-book-list',
 // templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
 books:Book[] = [];
 currentCategoryId: number = 1; 
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  // New properties for server side pagination
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  

  constructor(private _bookService:BookService,
    private _activateRoute: ActivatedRoute,
    private _config: NgbPaginationConfig) { 
    _config.maxSize = 2;
    _config.boundaryLinks = true;
    }

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe( () => {
      this.listBooks();
    })
   
  }



  listBooks() {
    this.searchMode = this._activateRoute.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      //Go to search books
      this.handleSearchListOfBooks();
    } else {
      //Go to just list of books
      this.handleListOfBooks();
    }
  
  }

  handleListOfBooks() {
  const hasCategoryId:boolean =  this._activateRoute.snapshot.paramMap.has("id");
  
   if(hasCategoryId){
        this.currentCategoryId = +this._activateRoute.snapshot.paramMap.get("id");
   }else{
     this.currentCategoryId = 1;
   }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    return this._bookService.getBooks(this.currentCategoryId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPaginate() )
  }

  handleSearchListOfBooks() {

    const keyword:string = this._activateRoute.snapshot.paramMap.get("keyword");
    return this._bookService.searchBooksByKeyword(keyword,this.currentPage - 1,this.pageSize).subscribe(this.processPaginate());
    
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
     this.listBooks();
  }

  processPaginate() {
    return data => {
      this.books = data._embedded.books;
      this.currentPage = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalRecords = data.page.totalElements;
    }
  }

}
