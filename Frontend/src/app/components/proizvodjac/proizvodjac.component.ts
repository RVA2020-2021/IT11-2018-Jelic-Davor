import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';
import { ProizvodjacDialogComponent } from '../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvdojac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit, OnDestroy {

  displayedColumns = ['id','naziv', 'adresa', 'kontakt', 'actions'];
  dataSource: MatTableDataSource<Proizvodjac>;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private proizvodjacService: ProizvodjacService,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.proizvodjacService.getAllProizvodjaci().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public openDialog(flag: number, id?: number, naziv?: string, adresa?: string, kontakt?: string): void {
    const dialogRef = this.dialog.open(ProizvodjacDialogComponent, {data: {id,naziv,adresa,kontakt}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res === 1) {
        this.loadData();
      }
    })
  }

  selectRow(row) {
    console.log(row);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
