import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, Renderer2, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  apiService = inject(ApiService)
  
  data: any;
  post:any[] = [];
  title:string = '';
  countryInfo ='';
  name = '';
  capital = '';
  region = "";
 income = "";
 pop = '';
 coords = '';

  constructor(private renderer: Renderer2,private cdr: ChangeDetectorRef) {


  }
  
  ngAfterViewInit() {
    const svgObject = this.renderer.selectRootElement('#svgMap');
    svgObject.addEventListener('load', () => {
      const svgDoc = svgObject.contentDocument;
      const countries = svgDoc.querySelectorAll('.country');

      countries.forEach((country: Element) => {
        this.renderer.listen(country, 'mouseover', () => {
          (country as SVGElement).style.fill = '#63b5cf';
        });

        this.renderer.listen(country, 'mouseout', () => {
          (country as SVGElement).style.fill = '';
        });

        this.renderer.listen(country, 'click', () => {
          const countryId = country.getAttribute('id');
          // alert(`You clicked on ${countryId}`);
       

          this.apiService.getCountryData(countryId || '' ).subscribe({
            next: (data) => {
              // console.log(data);
              this.countryInfo = data;
              this.name = data[1][0]['name'];
              this.capital = data[1][0]['capitalCity'];
              this.region =  data[1][0]['region']['value'];
              this.income =  data[1][0]['incomeLevel']['value'];
              this.coords = `${ data[1][0]['latitude']} ,  ${ data[1][0]['longitude']}`
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.log(err)
            }
        
            })
            this.apiService.getPopData(countryId || '' ).subscribe({
              next: (data) => {
                this.pop = data[1][0]['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              
                this.cdr.detectChanges();
              },
              error: (err) => {
                console.log(err)
              }
          
              })


        });
      });
    });
  }
}

