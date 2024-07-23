import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, Renderer2, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  apiService = inject(ApiService)
  
  data: any;
  post:any[] = []
  title:string = ''

  constructor(private renderer: Renderer2) {
    this.apiService.getPosts().subscribe({
      next: (data) => {
        console.log(data);
        this.post = data;
        this.title = data.title;
      },
      error: (err) => {
        console.log(err)
      }
  
      })

  }
  
  ngAfterViewInit() {
    const svgObject = this.renderer.selectRootElement('#svgMap');
    svgObject.addEventListener('load', () => {
      const svgDoc = svgObject.contentDocument;
      const countries = svgDoc.querySelectorAll('.country');

      countries.forEach((country: Element) => {
        this.renderer.listen(country, 'mouseover', () => {
          (country as SVGElement).style.fill = 'yellow';
        });

        this.renderer.listen(country, 'mouseout', () => {
          (country as SVGElement).style.fill = '';
        });

        this.renderer.listen(country, 'click', () => {
          const countryId = country.getAttribute('id');
          alert(`You clicked on ${countryId}`);
          // Add navigation logic here
        });
      });
    });
  }
}

