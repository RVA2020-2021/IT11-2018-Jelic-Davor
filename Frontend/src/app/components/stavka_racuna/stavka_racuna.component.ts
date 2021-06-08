import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { Racun } from 'src/app/models/racun';
import { StavkaRacuna } from 'src/app/models/stavka_racuna';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';
import { StavkaRacunaDialogComponent } from '../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';

@Component({
  selector: 'app-stavka_racuna',
  templateUrl: './stavka_racuna.component.html',
  styleUrls: ['./stavka_racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id','redniBroj','kolicina', 'jedinicaMere','cena','racun','proizvod','actions'];
  dataSource: MatTableDataSource<StavkaRacuna>;
  @Input() selektovanRacun: Racun;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private stavkaRacunaService: StavkaRacunaService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.loadData();
  }

  loadData()  {
    console.log(this.selektovanRacun.id);
    this.subscription = this.stavkaRacunaService.getStavkeZaRacun(this.selektovanRacun.id).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);

        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'proizvod' ? currentTerm + data.proizvod.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'proizvod': return data.proizvod.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  openDialog(flag: number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: string, cena?: number, racun?: Racun, prozivod?: Proizvod) {
    const dialogRef = this.dialog.open(StavkaRacunaDialogComponent,
      {data : {id, redniBroj, kolicina, jedinicaMere, cena, racun, prozivod}
    });
    dialogRef.componentInstance.flag = flag;

    if(flag === 1) {
      dialogRef.componentInstance.data.racun = this.selektovanRacun;
    }

    dialogRef.afterClosed().subscribe( res => {
      if(res === 1){
        this.loadData();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    if(this.selektovanRacun.id) {
      this.loadData();
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
