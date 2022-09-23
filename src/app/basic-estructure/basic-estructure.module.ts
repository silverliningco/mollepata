import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicEstructureRoutingModule } from './basic-estructure-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ReleasesComponent } from './releases/releases.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ReleasesComponent
  ],
  imports: [
    CommonModule,
    BasicEstructureRoutingModule
  ]
})
export class BasicEstructureModule { }
