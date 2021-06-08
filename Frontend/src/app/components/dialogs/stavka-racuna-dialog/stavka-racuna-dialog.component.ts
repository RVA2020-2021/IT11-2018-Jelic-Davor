import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Proizvod } from 'src/app/models/proizvod';
import { StavkaRacuna } from 'src/app/models/stavka_racuna';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { StavkaRacunaService } from 'src/app/services/stavka-racuna.service';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit, OnDestroy {

  public flag: number;
  proizvodi: Proizvod[];
  proizvodSubscription: Subscription;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: StavkaRacuna,
    public proizvodService: ProizvodService,
    public stavkaRacunaService: StavkaRacunaService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    ) { }

  ngOnDestroy(): void {
    this.proizvodSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.proizvodSubscription = this.proizvodService.getAllProizvodi().subscribe(
      data => {
        this.proizvodi = data;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  compareTo(a,b){
    return a.id == b.id;
  }


  public add(): void {
    this.stavkaRacunaService.addStavkaRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodata stavka računa: ' + this.data.proizvod.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja nove stavke računa', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovana stavka računa: ' + this.data.proizvod.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije stavke računa', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana stavka računa: ' + this.data.proizvod.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja stavke računa', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Zatvori', {
      duration: 1000
    })
  }

}
