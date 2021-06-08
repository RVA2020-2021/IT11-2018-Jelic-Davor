import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/services/racun.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag: number;
  naciniPlacanja: String[] = ["kartica","gotovina"]

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService
              ) { }

  ngOnInit(): void {
  }

  compareTo(a,b){
    return a.id == b.id;
  }

  public add(): void {
    console.log(this.data);
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat račun', 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog računa', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan račun: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije računa', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.racunService.deleteRacun(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan račun: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja računa', 'Zatvori', {
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
