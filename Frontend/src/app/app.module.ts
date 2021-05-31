import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { ProizvodjacComponent } from './components/proizvodjac/proizvodjac.component';
import { RacunComponent } from './components/racun/racun.component';
import { StavkaRacunaComponent } from './components/stavka_racuna/stavka_racuna.component';
import { HttpClientModule } from '@angular/common/http';
import { ProizvodjacDialogComponent } from './components/dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { RacunDialogComponent } from './components/dialogs/racun-dialog/racun-dialog.component';
import { ProizvodDialogComponent } from './components/dialogs/proizvod-dialog/proizvod-dialog.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select'
import { MatNativeDateModule } from '@angular/material/core';
import { StavkaRacunaDialogComponent } from './components/dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    ProizvodComponent,
    ProizvodjacComponent,
    RacunComponent,
    StavkaRacunaComponent,
    AboutComponent,
    AuthorComponent,
    HomeComponent,
    ProizvodjacDialogComponent,
    RacunDialogComponent,
    ProizvodDialogComponent,
    StavkaRacunaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
