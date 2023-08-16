export class LatLng {
    constructor(lat: number, lng: number);
}

export class Map {
    constructor(container: HTMLElement, options?: { center: LatLng; level: number });
}

export class Marker {
    constructor(options: { position: LatLng });
    setMap(map: Map | null): void;
}

export interface MouseEvent {
    latLng: LatLng;
}

export function load(callback: () => void): void;

declare const kakao: {
    maps: {
        LatLng: LatLng;
        Map: Map;
        Marker: Marker;
        load: load;
    };
};

export interface Window {
    kakao: typeof kakao;
}

export default kakao;
