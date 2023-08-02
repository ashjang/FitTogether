// src/types/kakao.d.ts
declare namespace kakao {
    namespace maps {
        export class LatLng {
            constructor(lat: number, lng: number);
        }
    
        export class Marker {
            constructor(options: { position: LatLng });
            setMap(map: Map | null): void;
        }
    
        export class Map {
            constructor(container: HTMLElement, options?: { center: LatLng; level: number });
        }
    }
}