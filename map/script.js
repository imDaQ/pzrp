var baseTileSource = {
  Image: {
    xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
    Url: '',
    Format: 'jpg',
    Overlap: '2',
    TileSize: '256',
    Size: {
      Height: '10500',
      Width: '20850'
    }
  }
};
var topTileSource = {
  type: 'image',
  url: 'map2.png',

};
var viewer = OpenSeadragon({
  id: "osd",
  prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/2.4.1/images/",
  tileSources: [baseTileSource,topTileSource],
     showNavigator:  true
});






//showNavigator:  true
// viewer.maxZoomPixelRatio = 50;

var params = geo.util.pixelCoordinateParams('#geojs', 7026, 9221, 256, 256);
params.map.max = 16;
params.map.clampZoom = false;
params.map.clampBoundsX = false;
params.map.clampBoundsY = false;
var map = geo.map(params.map);
var layer=map.createLayer('annotation');

// turn off geojs map navigation
map.interactor().options({
  actions: []
});

// get the current bounds from the viewer viewer
function getBounds() {
  //console.log(viewer.TiledImage);
  //console.log(OpenSeadragon.TiledImage);
  return viewer.viewport.viewportToImageRectangle(viewer.viewport.getBounds(true));
  //return viewer.world.getItemAt(0).viewportToImageRectangle(viewer.world.getItemAt(0).getBounds(true));
}




// set the geojs bounds from the viewer bounds

function setBounds() {
  var bounds = getBounds();
  console.log(bounds);
  map.bounds({
    left: bounds.x,
    right: bounds.x + bounds.width,
    top: bounds.y,
    bottom: bounds.y + bounds.height
  });
}

// add handlers to tie navigation events together

viewer.addHandler('open', setBounds);
viewer.addHandler('animation', setBounds);




// add a handler for when an annotation is created
function created(evt) {
  $('#geojs .geojs-layer').css('pointer-events', 'none'); // write out the annotation definition

  //console.log(evt.annotation.features()[0]);
}

map.geoOn(geo.event.annotation.state, created); // add handlers for drawing annotations

function draw(evt) {
  $('#geojs .geojs-layer').css('pointer-events', 'auto');
  var type = $(evt.target).data('type');
  layer.mode(type);
}

$('.controls-container button').click(draw);


$(".niki-wrapper #layer-01").on("input",function (){
  var val = $(this).val()
   viewer.world.getItemAt(1).setOpacity(val);
  test();
});




viewer.addHandler('tile-loaded', function(event) {
  console.log(event)
  var canvas = document.createElement( 'canvas' )
  } ) 
                   
