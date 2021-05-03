import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcador {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLavel = 15;
  center: [number, number] = [ -70.55305490705454, -33.4180442340962 ];
  // Arreglo de marcadores
  marcadores: Marcador[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLavel
      });

    // const marketHTML: HTMLElement = document.createElement('div');
    // marketHTML.innerHTML = 'Hola mundo';

    // new mapboxgl.Marker({element: marketHTML})
    //       .setLngLat(this.center)
    //       .addTo(this.mapa);

  }
  
  agregarMarcador(): void {
    // tslint:disable-next-line: no-bitwise
    const color = '#xxxxxx'.replace(/x/g, y => ( Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat( this.center )
    .addTo( this.mapa );
    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });
  }
  
  
    irMarcador(): void {
      // this.mapa.flyTo()
    }
}
