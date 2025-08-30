SELECT ST_AsText(geom) FROM public."Location";
SELECT ST_AsGeoJSON(geom)           AS geojson
FROM public."Location";