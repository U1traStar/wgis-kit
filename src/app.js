import {
  mapbox,
  osm,
  mapquest,
  mapquest1,
  gaodesat,
  tuba,
  geoqBlue,
  geoqCommunity,
  geoqGray,
  geoColor,
  geoqWarm,
  geoqBound,
  geoqBoundonly,
  geoqWater,
  StamenToner,
  StamenWaterColor,
  esrisat,
  google,
} from './background-layer'
import L from 'leaflet'

var map = new L.Map("map", {
  center: new L.LatLng(10.1, 125.6),
  zoom: 7,
});

L.control
  .layers(
    {
      geoqBlue: geoqBlue.addTo(map),
      高德影像: gaodesat,
      esrisat: esrisat,
      MapQuest: mapquest1,
      谷歌影像: google,
      Mapbox: mapbox,
      osm: osm,
      MapQuest: mapquest,
      图吧: tuba,
      geoqCommunity: geoqCommunity,
      geoqGray: geoqGray,
      geoColor: geoColor,
      geoqWarm: geoqWarm,
      geoqBound: geoqBound,
      geoqBoundonly: geoqBoundonly,
      geoqWater: geoqWater,
      StamenToner: StamenToner,
      StamenWaterColor: StamenWaterColor,
    },
    {},
    {position: 'topleft'}
  )
  .addTo(map);



var marker;

map.on("click", function (e) {
  if (marker && map.hasLayer(marker)) {
    map.removeLayer(marker);
  }
  var latlng = e.latlng;
  var gcj = coordtransform.wgs84togcj02(latlng.lng, latlng.lat);
  var baidu = coordtransform.gcj02tobd09(gcj[0], gcj[1]);
  var html = "";
  html +=
    "<p>谷歌地球: <strong>" + latlng.lat + "," + latlng.lng + "</strong></p>";
  html += "<p>高德腾讯: <strong>" + gcj[1] + "," + gcj[0] + "</strong></p>";
  html += "<p>百度地图: <strong>" + baidu[1] + "," + baidu[0] + "</strong></p>";
  marker = L.marker(latlng).addTo(map).bindPopup(html).openPopup();
});


L.DomUtil.get('press-me').addEventListener('click', async () => {
  const handle = await showOpenFilePicker()
  if(handle[0] && handle[0].kind === 'file') {
    const file = await handle[0].getFile()
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target.result
      console.log(e.target.result);
      L.geoJSON(JSON.parse(data), {}).addTo(map);
    }
    reader.readAsText(file, 'utf-8')
  }

  console.log('hello', handle);
})