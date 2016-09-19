//Global Variables
var map,
    infoWindow,
    markers = ko.observableArray(),
    vmodel;

var Model = {

    currentPlace : null,

    locations : [
    {
        name : "Navy Pier",
        location : {lat: 41.891726, lng: -87.609645},
        wiki : null
    },
    {
        name : "Shedd Aquarium",
        location : {lat: 41.867812, lng: -87.614027},
        wiki : null
    },
    {
        name : "Adler Planetarium",
        location : {lat: 41.866509, lng: -87.606778},
        wiki : null
    },
    {
        name : "The Field Museum",
        location : {lat: 41.866432, lng: -87.616949},
        wiki : null
    },
    {
        name : "Museum of Science and Industry",
        location : {lat: 41.790692, lng: -87.583002},
        wiki : null
    },
    {
        name : "The Art Institue of Chicago",
        location : {lat: 41.879792, lng: -87.623735},
        wiki : null
    },
    ]
};
//Initializes Map and Apply KO binding to the viewModel
function initMap() {
    map = new google.maps.Map(document.getElementsByClassName('map')[0], {
        zoomControl: true,
    });

    window.mapBounds = new google.maps.LatLngBounds();

    infoWindow = new google.maps.InfoWindow({maxWidth: 250});

    createMarkers(Model.locations);

    vmodel = new viewModel();

    ko.applyBindings(vmodel);

}
//Creating the markers on the map
function createMarkers(locations) {
    var
    place,
    i,
    bounds,
    locationsLength = locations.length;
//iterates over the location array and generates a map marker for each location
    for(i = 0; i < locationsLength; i++) {
        place = locations[i];

        getWikiInfo(place, i);

        bounds = window.mapBounds;

        marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: place.location,
            map: map,
            title: place.name
        });
//Add a listener so that when users clicks on marker it will perform the action
        marker.addListener('click', (function(place) {
            return function() {

                (function(place) { Model.currentPlace = place; })(place);

                showInfoWindow();
                toggleBounce();

            };
        })(place));
//Add a listener to stop the bounce animation when the users clicks elsewhere
        google.maps.event.addListener(infoWindow,'closeclick',function(){
            toggleBounce();
            vmodel.activeListItemIndex(null);
        });
//Extends map boundary to fit markers
        bounds.extend(new google.maps.LatLng(place.location.lat, place.location.lng));
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
        markers.push(marker);
    }
}
//Wiki Time!
//If the request fails after 5 seconds, it will notify the user it can't pull the info.
//Elseit will display the message if successfull.
var getWikiInfo = function(place, i) {
    var wikiEndpoint = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+place.name+"&format=json";

    var wikiTimeout = setTimeout(function(){
        if(i === 0) alert('Unable to Load Information from wikipedia');
    }, 500);

    $.ajax({
        url: wikiEndpoint,
        dataType: "jsonp",
        success: function(data) {
            Model.locations[i].wiki = data[2][0];

            clearTimeout(wikiTimeout);
        }
    });
};

//Pulls up infoWindow when the Marker is clicked
showInfoWindow = function() {

    var currentPlace = Model.currentPlace,

    index = Model.locations.indexOf(currentPlace),

    content = '<div class="info-window">';
    content += '<h4>'+ currentPlace.name +'</h4>';
    if(currentPlace.wiki === null) {
        content += '<p>Sorry! Unable to load wikipedia information</p>';
    }
    else {
        content += '<p>' + currentPlace.wiki +'</p>';
    }

    vmodel.activeListItemIndex(index);
    infoWindow.setContent(content);
    map.panTo(currentPlace.location);
    infoWindow.open(map, markers()[index]);
};
//Adds the bounce animation on the google map markers.
var toggleBounce = function () {

    var index = Model.locations.indexOf(Model.currentPlace);

    var marker = markers()[index];

    markers().forEach(function(mark, i) {

        if(index !== i) mark.setAnimation(null);
    });

  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
    infoWindow.close();
    vmodel.activeListItemIndex(null);
  }

  else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
};

window.addEventListener('resize', function(e) {

    map.fitBounds(mapBounds);
});

//Knockout viewModel
var viewModel = function() {
  var self = this;
//Track Menu visibility state
  self.menuStatus = ko.observable(false);

  self.activeListItemIndex = ko.observable(null);

  self.places = ko.observableArray(Model.locations);

  self.filterText = ko.observable('');
//Toggle Menu to hide/close
  self.toggleMenu =  ko.pureComputed(function() {
        return self.menuStatus() == false ? "menu-hidden" : "";
    });

  self.showInfoWindowWhenClicked = function(place) {

    Model.currentPlace = place;
    var index = Model.locations.indexOf(place);

    if(self.activeListItemIndex() === null || self.activeListItemIndex() !== index) {
        self.activeListItemIndex(index);
        showInfoWindow();
    }
    else if(self.activeListItemIndex() === index){
        self.activeListItemIndex(null);
        infoWindow.close();
    }

    toggleBounce();

  };

  self.filter = ko.computed(function(){
    infoWindow.close();
    self.activeListItemIndex(null);
//Iterate over the KO observable array to set the marker visible and bound to the map.
    markers().forEach(function(obj) {
        if(!obj.visible) obj.setVisible(true);    });

    var filterLeftPlaces = ko.utils.arrayFilter(self.places(), function(places){
        return places.name.toLowerCase().indexOf(self.filterText().toLowerCase()) == -1;
    });

    var
    index,
    marker;
//Iterates to make its marker visible property to false and set the marker bound to null
    filterLeftPlaces.forEach(function(obj) {
        index = Model.locations.indexOf(obj);
        marker = markers()[index];
        marker.setVisible(false);
    });

    return ko.utils.arrayFilter(self.places(), function(places){
        return places.name.toLowerCase().indexOf(self.filterText().toLowerCase()) >= 0;
    });

  });

};
