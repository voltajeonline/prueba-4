var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);

    /*aqui se crea la función pinta marcador que usa tres parámetros */
    app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

    /*usando miMapa.on escuchamos eventos el tab 'click'; entonces, cuando sucede el evento click se ejecuta esta función */
    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(3) + ') y L(' + evento.latlng.lng.toFixed(3) + ')';
      app.pintaMarcador(evento.latlng, texto, miMapa);
    });
  },
     /*L.marker crea un nuevo marcador en la posición que le hemos pasado como primer parámetro. el Popup es una ventanita que le añadimos el texto y luego el openPopup lo abre*/
  pintaMarcador: function(latlng, texto, mapa){
    var marcador = L.marker(latlng).addTo(mapa);
    marcador.bindPopup(texto).openPopup();
  },

  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
  }

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);
}
