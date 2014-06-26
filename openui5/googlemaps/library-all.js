sap.ui.define(["jquery.sap.global"],function(){"use strict";var e={BOUNCE:1,DROP:2,k:3,j:4};return e},!0);
sap.ui.define(["jquery.sap.global","sap/ui/core/Core","sap/ui/core/library"],function(e){"use strict";return function(){var o=e.sap.getResourcePath("openui5/googlemaps/loadScripts");e.sap.registerResourcePath("google.maps",o),e.sap.require("openui5.googlemaps.ScriptsUtil"),sap.ui.getCore().initLibrary({name:"openui5.googlemaps",dependencies:["sap.ui.core"],types:["openui5.googlemaps.MapTypeId","openui5.googlemaps.Animation"],interfaces:[],controls:["openui5.googlemaps.Map","openui5.googlemaps.Marker","openui5.googlemaps.Polyline","openui5.googlemaps.Polygon"],elements:[],version:"0.0.0"})}(),!0},!0);
sap.ui.define(["jquery.sap.global","openui5/googlemaps/ScriptsUtil"],function(e,l){"use strict";var t=function(){var l={};return l.defaultUrl="http://maps.google.com/maps/api/js?sensor=true&callback=google.maps.callBack",l.notifyEvent="google.maps.loaded",l.callBack=function(){this.loaded=!0,sap.ui.getCore().getEventBus().publish(this.notifyEvent)},l.load=function(l){var t=l.getUrl()?l.getUrl():this.defaultUrl;l.getApiKey()&&(t=t+"&key="+l.getApiKey()),e.sap.includeScript(t,"google.maps",null,null)},l}();return t.load(l),t},!0);
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","google.maps","./MapUtils","./MapTypeId"],function(t,e,o,i,a){"use strict";var n=e.extend("openui5.googlemaps.Map",{metadata:{properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"10rem"},zoom:{type:"int",defaultValue:8},center:{type:"object",bindable:"bindable",defaultValue:{lat:48,lng:-121}},disableDefaultUI:{type:"boolean",defaultValue:!0},mapTypeId:{type:"string",defaultValue:a.ROADMAP},panControl:{type:"boolean",defaultValue:!1},zoomControl:{type:"boolean",defaultValue:!1},mapTypeControl:{type:"boolean",defaultValue:!1},streetViewControl:{type:"boolean",defaultValue:!1}},defaultAggregation:"markers",aggregations:{markers:{type:"openui5.googlemaps.Marker",multiple:!0,bindable:"bindable"},polylines:{type:"openui5.googlemaps.Polyline",multiple:!0,bindable:"bindable"},polygons:{type:"openui5.googlemaps.Polygon",multiple:!0,bindable:"bindable"}},events:{change:{},ready:{}}},renderer:function(t,e){t.write("<div "),t.writeControlData(e),t.addStyle("width","auto"),t.addStyle("height","auto"),t.writeClasses(),t.writeStyles(),t.write(">"),t.write("<div"),t.writeAttribute("id",e.getId()+"-map"),t.addStyle("width",e.getWidth()),t.addStyle("height",e.getHeight()),t.writeStyles(),t.write(">"),t.write("</div>")}});return n.prototype.init=function(){this._dragging=!1,this.aListeners=[],this.mapId=this.getId()+"-map"},n.prototype.setZoom=function(t){this.setProperty("zoom",t,!0),this._map&&t!==this._map.getZoom()&&this._map.setZoom(t)},n.prototype.setCenter=function(t){return null===t||i.latLngEqual(this.getCenter(),t)?!0:(this.setProperty("center",t,!0),void(this._map&&!i.latLngEqual(i.latLngToObj(this._map.getCenter()),t)&&this._map.panTo(i.objToLatLng(t))))},n.prototype.setMapTypeId=function(t){this.setProperty("mapTypeId",t,!0),this._map&&t!==this._map.getMapTypeId()&&this._map.setMapTypeId(t)},n.prototype.setZoomControl=function(t){this.setProperty("zoomControl",t,!0),this._map&&t!==this._map.getZoomControl()&&this._map.setZoomControl(t)},n.prototype._getMapOptions=function(){var t={};return t.zoom=this.getZoom(),t.center=i.objToLatLng(this.getCenter()),t.disableDefaultUi=this.getDisableDefaultUI(),t.mapTypeId=this.getMapTypeId(),t.panControl=this.getPanControl(),t.zoomControl=this.getZoomControl(),t.mapTypeControl=this.getMapTypeControl(),t.streetViewControl=this.getStreetViewControl(),t},n.prototype.onAfterRendering=function(){this._map&&this.resetMap(),this.createMap()},n.prototype.createMap=function(){return void 0===o.loaded?(void 0===this.subscribed&&(sap.ui.getCore().getEventBus().subscribe(o.notifyEvent,this.createMap,this),this.subscribed=!0),!1):(this._map=new o.Map(t.sap.byId(this.mapId)[0],this._getMapOptions()),this.addListener("drag",t.proxy(this.updateValues,this)),this.addListener("zoom_changed",t.proxy(this.updateValues,this)),this.addListener("center_changed",t.proxy(this.updateValues,this)),this.addListener("bounds_changed",t.proxy(this.updateValues,this)),this.addListener("maptypeid_changed",t.proxy(this.updateValues,this)),this.addListener("resize",t.proxy(this.updateValues,this)),this._notifyMarkers("MapRendered",this._map),this._notifyPolylines("MapRendered",this._map),this._notifyPolygons("MapRendered",this._map),void this.fireReady({map:this.map,context:this.getBindingContext(),center:this.getCenter()}))},n.prototype.addListener=function(t,e){this.aListeners.push(o.event.addListener(this._map,t,e))},n.prototype.removeListeners=function(){this.aListeners.forEach(function(t){t.remove()}),this.aListeners=[]},n.prototype.trigger=function(t){o.event.trigger(this._map,t)},n.prototype.isDragging=function(){this._dragging=!0},n.prototype.isNotDragging=function(){this._dragging=!1},n.prototype.updateValues=function(){i.latLngToObj(this._map.getCenter())!==this.getCenter()&&this.setCenter(i.latLngToObj(this._map.getCenter())),this._map.getZoom()!==this.getZoom()&&this.setZoom(this._map.getZoom()),this._map.getMapTypeId()!==this.getMapTypeId()&&this.setMapTypeId(this._map.getMapTypeId())},n.prototype.getMarkers=function(){return this.getAggregation("markers",[])},n.prototype._notifyMarkers=function(t,e){this.getMarkers().forEach(function(o){o["on"+t](e)})},n.prototype.getPolylines=function(){return this.getAggregation("polylines",[])},n.prototype._notifyPolylines=function(t,e){this.getPolylines().forEach(function(o){o["on"+t](e)})},n.prototype._notifyPolygons=function(t,e){this.getPolygons().forEach(function(o){o["on"+t](e)})},n.prototype.resetMap=function(){this.removeListeners(),this._map.set(null)},n.prototype.exit=function(){this.resetMap(),this.init()},n},!0);
sap.ui.define(["jquery.sap.global"],function(){"use strict";var r={ROADMAP:"roadmap",SATELLITE:"satellite",HYBRID:"hybrid",TERRAIN:"terrain"};return r},!0);
sap.ui.define(["jquery.sap.global","google.maps"],function(n,t){"use strict";var o={};return o.objToLatLng=function(n){return new t.LatLng(n.lat,n.lng)},o.latLngToObj=function(n){return{lat:n.lat(),lng:n.lng()}},o.floatEqual=function(n,t){return Math.abs(n-t)<1e-6},o.latLngEqual=function(n,t){return this.floatEqual(n.lat,t.lat)&&this.floatEqual(n.lng,t.lng)},o.search=function(n,o){return(new t.Geocoder).geocode(n,o)},o.currentPosition=function(n){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(t){var o={};o.lat=t.coords.latitude,o.lng=t.coords.longitude,n(o)})},o},!0);
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","google.maps","./Animation"],function(t,i,e,n){"use strict";var o=i.extend("openui5.googlemaps.Marker",{metadata:{properties:{lat:{type:"float",bindable:"bindable"},lng:{type:"float",bindable:"bindable"},draggable:{type:"boolean",bindable:"bindable",defaultValue:!1},info:{type:"string",bindable:"bindable"},icon:{type:"sap.ui.core.URI",bindable:"bindable"},animation:{type:"int",bindable:"bindable",defaultValue:n.DROP}},events:{click:{},dragEnd:{},infoWindowClose:{}},renderer:{}}});return o.prototype.init=function(){this._dragging=!1,this.aListeners=[],this.iwMaxWidth=360},o.prototype.updatePosition=function(){this.marker&&null!=this.getLat()&&null!=this.getLng()&&this.marker.setPosition(new e.LatLng(this.getLat(),this.getLng()))},o.prototype.setLat=function(t){this.setProperty("lat",parseFloat(t),!0),this.updatePosition()},o.prototype.setLng=function(t){this.setProperty("lng",parseFloat(t),!0),this.updatePosition()},o.prototype.setICon=function(){this.marker&&this.marker.setIcon(this.getIcon())},o.prototype.mapReady=function(){this.marker=new e.Marker(this.getOptions()),this.marker.setMap(this.map),this.addListener("click",t.proxy(this.onClick,this)),this.addListener("dragend",t.proxy(this.onDragEnd,this)),this.infoWindow=void 0,this.getInfo()&&(this.infoWindow=new e.InfoWindow({content:this.getInfo(),maxWidth:this.iwMaxWidth}),e.event.addListener(this.infoWindow,"closeclick",t.proxy(this.onInfoWindowClose,this)))},o.prototype.getOptions=function(){var t={};return t.position=new e.LatLng(this.getLat(),this.getLng()),t.draggable=this.getDraggable(),t.animation=this.getAnimation(),t.icon=this.getIcon(),t},o.prototype.onMapRendered=function(t){this.map=t,this.mapReady()},o.prototype.addListener=function(t,i){this.aListeners.push(e.event.addListener(this.marker,t,i))},o.prototype.removeListeners=function(){this.aListeners.forEach(function(t){t.remove()}),this.aListeners=[]},o.prototype.infoWindowOpen=function(i){this.infoWindow.open(this.map,this.marker),i&&t.sap.delayedCall(2e3,this,function(){this.infoWindowclose()})},o.prototype.infoWindowClose=function(){this.infoWindow.close()},o.prototype.onClick=function(){this.infoWindow&&this.infoWindowOpen(),this.fireClick({map:this.map,marker:this.marker,context:this.getBindingContext(),location:{lat:this.getLat(),lng:this.getLng()}})},o.prototype.onDragEnd=function(){var t=this.marker.getPosition();this.setLat(t.lat()),this.setLng(t.lng()),this.fireDragEnd({position:t})},o.prototype.onInfoWindowClose=function(){this.fireInfoWindowClose({})},o.prototype.exit=function(){this.removeListeners(),this.marker.setMap(null)},o},!0);
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","google.maps","./MapUtils"],function(t,e,o,a){"use strict";var i=e.extend("openui5.googlemaps.Polygon",{metadata:{properties:{strokeColor:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},strokeOpacity:{type:"float",bindable:"bindable"},strokeWeight:{type:"float",bindable:"bindable"},fillColor:{type:"string",bindable:"bindable"},fillOpacity:{type:"float",bindable:"bindable"},paths:{type:"object"},draggable:{type:"boolean"}},events:{click:{},dragEnd:{}},renderer:{}}});return i.prototype.parsePaths=function(){var t=[];return this.getPaths().forEach(function(e){t.push(a.objToLatLng(e))}),t},i.prototype.createPolygon=function(){this.Polygon=new o.Polygon(this.getOptions()),this.Polygon.setMap(this.map)},i.prototype.getOptions=function(){var t={};return t.paths=this.parsePaths(),t.strokeColor=this.getStrokeColor(),t.strokeOpacity=this.getStrokeOpacity(),t.strokeWeight=this.getStrokeWeight(),t.fillOpacity=this.getFillOpacity(),t.fillColor=this.getFillColor(),t.draggable=this.getDraggable(),t},i.prototype.onMapRendered=function(t){this.map=t,this.createPolygon()},i.prototype.exit=function(){this.Polygon.setMap(null)},i},!0);
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","google.maps","./MapUtils"],function(t,e,o,r){"use strict";var i=e.extend("openui5.googlemaps.Polyline",{metadata:{properties:{strokeColor:{type:"sap.ui.core.CSSColor",group:"Appearance",defaultValue:null},strokeOpacity:{type:"float"},strokeWeight:{type:"float"},icons:{type:"object"},path:{type:"object"},draggable:{type:"boolean"}},events:{click:{},dragEnd:{}},renderer:{}}});return i.prototype.parsePath=function(){var t=[];return this.getPath().forEach(function(e){t.push(r.objToLatLng(e))}),t},i.prototype.createPolyline=function(){this.polyline=new o.Polyline(this.getOptions()),this.polyline.setMap(this.map)},i.prototype.getOptions=function(){var t={};return t.path=this.parsePath(),t.strokeColor=this.getStrokeColor(),t.strokeOpacity=this.getStrokeOpacity(),t.strokeWeight=this.getStrokeWeight(),t.draggable=this.getDraggable(),t.icons=this.getIcons(),t},i.prototype.onMapRendered=function(t){this.map=t,this.createPolyline()},i.prototype.exit=function(){this.polyline.setMap(null)},i},!0);
sap.ui.define(["jquery.sap.global"],function(){"use strict";var t={};return t.setApiKey=function(t){this.apiKey=t},t.getApiKey=function(){return this.apiKey},t.setUrl=function(t){this.baseUrl=t},t.getUrl=function(){return this.baseUrl},t},!0);