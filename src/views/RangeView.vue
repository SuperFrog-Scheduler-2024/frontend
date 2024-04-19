<template>
    <div>
        <h1>Range</h1>
        <p>A SuperFrog appearance can be requested in the following 100 mile radius:</p>
        <br />
        <div ref="mapRoot" style="width: 100%; height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import View from 'ol/View';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Circle from 'ol/geom/Circle';
import { fromCircle } from 'ol/geom/Polygon';
import { Fill, Stroke, Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import 'ol/ol.css';

import markerImage from '@/assets/marker.png';

const mapRoot = ref<HTMLDivElement | null>(null);

onMounted(() => {
    // this is where we create the OpenLayers map
    if (mapRoot.value) {
        const map = new Map({
            // the map will be created using the 'map-root' ref
            target: mapRoot.value,
            layers: [
                // adding a background tiled layer
                new TileLayer({
                    source: new OSM() // tiles are served by OpenStreetMap
                }),
            ],

            // the map view will initially show the whole world
            view: new View({
                zoom: 7,
                center: [-10838971.444651078, 3856827.4756331868],
                constrainResolution: true
            }),
        });

        // Creating a fifty-mile circle around the center
        const center = [-10838971.444651078, 3856827.4756331868];
        const radius = 160934; // 50 miles in meters
        const circle = new Circle(center, radius);
        const polygon = fromCircle(circle, 64);
        const circleStyle = new Style({
            fill: new Fill({
                color: 'rgba(0, 0, 255, 0.2)', // blue color with opacity
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2,
            }),
        });
        const feature = new Feature({
            geometry: polygon,
        });
        feature.setStyle(circleStyle);
        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [feature],
            }),
        });
        map.addLayer(vectorLayer);

        // Dropping a pin at the center
        const pinStyle = new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: markerImage,
                scale: 0.1,
            }),
        });
        const pinFeature = new Feature({
            geometry: new Point(center),
        });
        pinFeature.setStyle(pinStyle);
        const pinVectorSource = new VectorSource({
            features: [pinFeature],
        });
        const pinVectorLayer = new VectorLayer({
            source: pinVectorSource,
        });
        map.addLayer(pinVectorLayer);
    }
});
</script>
