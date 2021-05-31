import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/models/proizvod';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvod.service';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {

  public flag: number;
  proizvodjaci: Proizvodjac[];

  constructor(public proizvodjacService: ProizvodjacService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProizvodDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Proizvod,
              public proizvodService: ProizvodService
              ) { }

  ngOnInit(): void {
    this.proizvodjacService.getAllProizvodjaci().subscribe( data => {
      this.proizvodjaci = data;
    });
  }

  compareTo(a,b){
    return a.id == b.id;
  }

  public add(): void {
    this.proizvodService.addProizvod(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat proizvod: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog proizvoda', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public update(): void {
    this.proizvodService.updateProizvod(this.data).subscribe(() => {
      this.snackBar.open('Uspešno modifikovan proizvod: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom modifikacije proizvoda', 'Zatvori', {
        duration: 2500
      })
    }
  }

  public delete(): void {
    this.proizvodService.deleteProizvod(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan proizvod: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja proizvoda', 'Zatvori', {
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
