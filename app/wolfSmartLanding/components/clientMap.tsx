"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useRef } from "react";
import type { Language } from "../languages";

type ClientMarker = {
    key: string;
    flag: string;
    name: string;
    latlng: [number, number];
    direction: L.Direction;
    offset: [number, number];
};

const clientMarkers: ClientMarker[] = [
    {
        key: "pt",
        flag: "fi fi-pt",
        name: "Portugal",
        latlng: [39.55, -8.1],
        direction: "right",
        offset: [16, 0],
    },
    {
        key: "ch",
        flag: "fi fi-ch",
        name: "Suíça",
        latlng: [46.8, 8.25],
        direction: "bottom",
        offset: [0, 20],
    },
    {
        key: "de",
        flag: "fi fi-de",
        name: "Alemanha",
        latlng: [51.15, 10.45],
        direction: "right",
        offset: [16, 0],
    },
    {
        key: "nl",
        flag: "fi fi-nl",
        name: "Países Baixos",
        latlng: [52.25, 5.3],
        direction: "right",
        offset: [16, 0],
    },
    {
        key: "en",
        flag: "fi fi-gb-eng",
        name: "Inglaterra",
        latlng: [52.35, -1.7],
        direction: "left",
        offset: [-16, 0],
    },
];

const markerNames: Record<Language, Record<string, string>> = {
    pt: {
        pt: "Portugal",
        ch: "Suíça",
        de: "Alemanha",
        nl: "Países Baixos",
        en: "Inglaterra",
    },
    en: {
        pt: "Portugal",
        ch: "Switzerland",
        de: "Germany",
        nl: "Netherlands",
        en: "England",
    },
    de: {
        pt: "Portugal",
        ch: "Schweiz",
        de: "Deutschland",
        nl: "Niederlande",
        en: "England",
    },
};

const markerIcon = L.divIcon({
    className: "wolf-marker-icon",
    html: `
        <div class="wolf-pulse-wrap">
            <div class="wolf-pulse-ring"></div>
            <div class="wolf-pulse-ring wolf-pulse-ring2"></div>
            <div class="wolf-pulse-dot"></div>
        </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
});

type ClientMapProps = {
    language: Language;
};

function getTooltipContent(client: ClientMarker, language: Language) {
    return `
        <div class="flex items-center gap-2">
            <span class="${client.flag} wolf-tooltip-flag" aria-hidden="true"></span>
            <span>${markerNames[language][client.key] ?? client.name}</span>
        </div>
    `;
}

export default function ClientMap({ language }: ClientMapProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<Array<{ client: ClientMarker; marker: L.Marker }>>([]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        const container = document.createElement("div");
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.zIndex = "0";

        wrapper.innerHTML = "";
        wrapper.appendChild(container);

        const map = L.map(container, {
            center: [48.7, 3.2],
            zoom: 4.35,
            minZoom: 4,
            maxZoom: 7,
            zoomControl: false,
            scrollWheelZoom: true,
            dragging: true,
            doubleClickZoom: true,
            attributionControl: false,
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            subdomains: ["a", "b", "c", "d"],
            maxZoom: 19,
        }).addTo(map);

        markersRef.current = clientMarkers.map((client) => {
            const marker = L.marker(client.latlng, { icon: markerIcon })
                .bindTooltip(getTooltipContent(client, language), {
                    permanent: true,
                    direction: client.direction,
                    offset: L.point(client.offset),
                    className: "wolf-tooltip",
                })
                .addTo(map);

            return { client, marker };
        });

        mapRef.current = map;

        function invalidateMapSize() {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        }

        const invalidateAfterRestore = () => {
            window.requestAnimationFrame(invalidateMapSize);
            window.setTimeout(invalidateMapSize, 250);
        };

        invalidateAfterRestore();

        const resizeObserver = new ResizeObserver(() => {
            invalidateMapSize();
        });
        resizeObserver.observe(container);

        window.addEventListener("pageshow", invalidateAfterRestore);
        window.addEventListener("resize", invalidateMapSize);
        document.addEventListener("visibilitychange", invalidateAfterRestore);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("pageshow", invalidateAfterRestore);
            window.removeEventListener("resize", invalidateMapSize);
            document.removeEventListener("visibilitychange", invalidateAfterRestore);

            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }

            wrapper.innerHTML = "";
            markersRef.current = [];
        };
    }, [language]);

    useEffect(() => {
        markersRef.current.forEach(({ client, marker }) => {
            marker.setTooltipContent(getTooltipContent(client, language));
        });
    }, [language]);

    return (
        <div className="wolfmap-container relative z-0 w-full overflow-hidden" style={{ minHeight: "500px", height: "100%" }}>
            <div ref={wrapperRef} className="absolute inset-0 z-0 h-full w-full" />
        </div>
    );
}
