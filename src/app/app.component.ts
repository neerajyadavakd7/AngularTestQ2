import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  brandPageSize: any;
  
  constructor(private service : AppService) {}

  ngOnInit(): void {
    this.GetEmployeeList();
    
  }
  employeeData : EmployeeData[] = [];
  displayedColumns: string[] = ['ID', 'Email', 'First-Name', 'Last-Name', 'Avatar'];
  dataSource = new MatTableDataSource<EmployeeData>();

  length = 100;
  pageSize = 10;

  pageIndex : number = 0;

  pageIndex1 : number = 0;

  pageEvent: PageEvent;


  changePage(event : PageEvent)
  {
    this.pageIndex = event.pageIndex;
    this.GetEmployeeList();
  }
  nextPage()
  {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  GetEmployeeList()
  {
    
    this.service.getEmployeeList(this.pageIndex + 1).subscribe((res : any) =>
      {
        this.employeeData = res.data;
        this.dataSource = new MatTableDataSource<EmployeeData>(this.employeeData);
        this.dataSource.data = this.employeeData;
        this.length = res.total;
        this.pageSize = res.per_page;
        
      });
      
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface EmployeeData {
  id: number;
  email : string;
  first_name: string;
  last_name: number;
  avatar: string;
}
