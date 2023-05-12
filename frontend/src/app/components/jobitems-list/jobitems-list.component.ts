import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-jobitems-list',
  templateUrl: './jobitems-list.component.html',
  styleUrls: ['./jobitems-list.component.css'],
})
export class JobItemsListComponent implements OnInit {
  JobItems: any = [];

  searchTerm = '';
  searchBy = 'jobTitle';
  currPage = 1;
  totalCount = 0;
  pageSize = 5;  // items per page
  pageSizes = [5, 10, 25, 50];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.fetchJobItems();
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteJobItem(id).subscribe(() => {
        this.JobItems.splice(i, 1);
      });
    }
  }

  getRequestParams(searchTerm: string, searchBy: string, currPage: number, pageSize: number): any {
    let params: any = {};

    if (searchTerm) {
      params[`searchTerm`] = searchTerm;
    }

    if (searchBy) {
      params[`searchBy`] = searchBy;
    }

    if (currPage) {
      params[`currPage`] = currPage - 1;
    }

    if (pageSize) {
      params[`pageSize`] = pageSize;
    }

    return params;
  }

  fetchJobItems(): void {
    const params = this.getRequestParams(this.searchTerm, this.searchBy, this.currPage, this.pageSize);

    console.log("currPage = " + params['currPage']);

    this.crudService.GetJobItems(params)
      .subscribe({
        next: (data) => {
          const { JobItems, currentPage, totalItems, totalPages } = data;
          this.JobItems = JobItems;
          this.totalCount = totalItems;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  handlePageChange(event: number): void {
    this.currPage = event;
    this.fetchJobItems();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.currPage = 1;
    this.fetchJobItems();
  }

  refreshList(): void {
    this.fetchJobItems();
  }

  filterByTerm(): void {
    this.currPage = 1;
    this.fetchJobItems();
  }
}
