var app={
	inicio: function(){ 
		this.iniciaFastClick();

		},
	
	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},
	
	dispositivoListo:function(){
		navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa,app.errorAlSolicitarLocalizacion);
	},
	
	pintaCoordendasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude,position.coords.longitude]), 13);
        
     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmF1bHNhbnRhbWFyaWEiLCJhIjoiY2szcHQxaGR0MDZvbDNkcGVsdThxcmw0bCJ9.SssCMgKXbSck2-m0EP350g',{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC- BY-SA</a>, Imagery © <a href="https://www.mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(miMapa);
         
    /*L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmF1bHNhbnRhbWFyaWEiLCJhIjoiY2szcHQxaGR0MDZvbDNkcGVsdThxcmw0bCJ9.SssCMgKXbSck2-m0EP350g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    accessToken: 'your.mapbox.access.token'
}).addTo(miMapa);*/
     
    },
	
	errorAlSolicitarLocalizacion:function(error){
		console.log(error.code+': '+error.message);
	}
	
};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
	document.addEventListener('deviceready',function(){
		app.dispositivoListo();
	},false);
 }