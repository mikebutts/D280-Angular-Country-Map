
import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

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

