import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {BookDetailComponent} from "../book-detail/book-detail.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnChanges {
  displayedColumns: any[] = ['STT', 'title', 'author', '#'];
  dataSource!: MatTableDataSource<any>;
  bookList!: Book[];

  constructor(private bookService: BookService,
              private dialog: MatDialog,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllBook();
  }

  getAllBook() {
    this.bookService.getAllBooks().subscribe(data => {
        this.bookList = data
        this.dataSource = new MatTableDataSource(data);
      }
    )
  }

  onEdit(row: any) {
    this.dialog.open(DialogComponent, {
      width: '35%',
      data: row,
      autoFocus: true
    }).afterClosed().subscribe(val => {
      if (typeof val != "string")
        this.toastrService.success("Cập nhật sách thành công","Success")
        this.getAllBook()
    })
  }

  onDelete(row: any) {
    this.dialog.open(BookDetailComponent, {
      width: '35%',
      data: row,
    }).afterClosed().subscribe(val => {
      if (typeof val != "string")
        this.toastrService.success("Xoá sách thành công","Success")
        this.getAllBook()
    })
  }

  onView(row: any) {
    this.dialog.open(BookDetailComponent, {
      width: '35%',
      data: {...row, type: "view"},
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllBook()
  }

  onCreate() {
    this.dialog.open(DialogComponent, {
      width: '35%',
      autoFocus: true
    }).afterClosed().subscribe(val => {
      if (typeof val != "string")
        this.toastrService.success("Tạo sách mới thành công","Success")
      this.getAllBook()
    })
  }
}
