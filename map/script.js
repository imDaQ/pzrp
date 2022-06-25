// If you like my work, please consider supporting it at https://www.patreon.com/iangilman or https://github.com/sponsors/iangilman

// Don't forget to include the JavaScript files from the Settings for this CodePen (jQuery and OpenSeadragon)

// NOTE: this Codepen is for cross-site DZI access (where your code is on one server and your DZI data is on another server) where 
// you can't set up CORS on the DZI server for whatever reason. That used to be fairly common, but now it's much more rare. 

// Change this to the path to your "_files" directory on the remote server. 
var dziFilesUrl = '//openseadragon.github.io/example-images/duomo/duomo_files/';

// Change this to the contents of the .dzi file from your server. 
var dziData = '<?xml version="1.0" encoding="utf-8"?><Image TileSize="254" Overlap="1" Format="jpg" xmlns="http://schemas.microsoft.com/deepzoom/2008"><Size Width="13920" Height="10200"/></Image>';

// This converts the XML into a DZI tile source specification object that OpenSeadragon understands. 
var tileSourceFromData = function(data, filesUrl) {
  var $xml = $($.parseXML(data));
  var $image = $xml.find('Image');
  var $size = $xml.find('Size');

  var dzi = {
    Image: {
      xmlns: $image.attr('xmlns'),
      Url: filesUrl,
      Format: $image.attr('Format'),
      Overlap: $image.attr('Overlap'),
      TileSize: $image.attr('TileSize'),
      Size: {
        Height: $size.attr('Height'),
        Width: $size.attr('Width')
      }
    }
  };  
  
  console.log(dzi);
  return dzi;
};

// This creates the actual viewer. 
var viewer = OpenSeadragon({
  id: 'openseadragon1',
  prefixUrl: '//openseadragon.github.io/openseadragon/images/',
  tileSources: tileSourceFromData(dziData, dziFilesUrl)
});
