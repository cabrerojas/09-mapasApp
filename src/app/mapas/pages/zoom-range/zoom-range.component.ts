import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {


  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  zoomLavel = 15;

  center: [number, number] = [ -70.55305490705454, -33.4180442340962 ];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLavel
      });

    this.mapa.on('zoom', (ev) => this.zoomLavel = this.mapa.getZoom());


    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo( 18 );
      }
    });

    // Momiviento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();

      this.center = [lng, lat];
    });

  }

  zoomIn(): void {
    this.mapa.zoomIn();

  }
  zoomOut(): void {
    this.mapa.zoomOut();
  }

  zoomCambio(valor: string): void {
    this.mapa.zoomTo( Number(valor) );

  }

}
