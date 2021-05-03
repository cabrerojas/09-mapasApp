import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcador {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [ number, number ];
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

    this.leerMarcadoresLocalStorage();

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

    this.guardarMarcadoresLocalStorage();

  }

    irMarcador(marcador: mapboxgl.Marker): void {

      this.mapa.flyTo({
        center: marcador.getLngLat()
      });
    }


    guardarMarcadoresLocalStorage(): void {

      const lngLatArr: Marcador[] = [];

      this.marcadores.forEach( m => {
        const color = m.color;
        // tslint:disable-next-line: no-non-null-assertion
        const {lng, lat} = m.marker!.getLngLat();

        lngLatArr.push({
          color,
          centro: [ lng, lat ]
        });
      });

      localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr));

    }

    leerMarcadoresLocalStorage(): void {
      if (!localStorage.getItem('marcadores')) {
        return;
      }

      const lngLatArr: Marcador[] = JSON.parse( localStorage.getItem('marcadores')! ) ;

      lngLatArr.forEach( m => {
        const newMarker = new mapboxgl.Marker({
          color: m.color,
          draggable: true
        })
        .setLngLat( m.centro! )
        .addTo( this.mapa );

        this.marcadores.push({
          marker: newMarker,
          color: m.color
        });

      });


    }

}
