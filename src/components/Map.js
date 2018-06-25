// parts of functions used here are modified from Udacity class
// https://github.com/udacity/ud864.git

import React, { Component } from 'react'
import ListLocations from './ListLocations'
// import '../App.css'

class Map extends Component {

  state = {
    map: {},
    center: {},
    infowindow: {},
    markers: [],
    mapMarkers: [],
    defaultIcon: {},
    highlightedIcon: {}
  }

  initMap = (center) => {
    return new window.google.maps.Map(document.getElementById('map'), {
      center: center.location,
      zoom: 11
    })
  }

  hideMarkers = (mapMarkers) => {
    mapMarkers.forEach((mapMarker) => {
      mapMarker.setMap(null)
    })
  }

  addMarkers = (map, markers, infowindow) => {

    let outerMap = this

    // Style the markers a bit. This will be our listing marker icon.
    const defaultIcon = this.makeMarkerIcon('0091ff')

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    const highlightedIcon = this.makeMarkerIcon('FFFF24')


    let mapMarkers = []

    markers.forEach((marker) => {
      let m = new window.google.maps.Marker({
        position: marker.location,
        map: map,
        title: marker.title,
        icon: defaultIcon
      })

      mapMarkers.push(m)

      // // Two event listeners - one for mouseover, one for mouseout,
      // // to change the colors back and forth.
      // m.addListener('mouseover', function() {
      //   this.setIcon(highlightedIcon)
      // })
      // m.addListener('mouseout', function() {
      //   this.setIcon(defaultIcon)
      // })
      // // Create an onclick event to open the large infowindow at each marker.
      // m.addListener('click', function() {
      //   outerMap.populateInfoWindow(m, infowindow, map)
      // })
    })
    this.setState({mapMarkers: mapMarkers, defaultIcon: defaultIcon, highlightedIcon: highlightedIcon})

  }


  fetchFromWikipedia = (marker, infowindow, map) => {
    const search = marker.title.split(' ').join('_')
    const url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exintro&titles=' + search + '&format=json&utf8'
    let extract = ''
    const outerMap = this
    // Using fetch
    fetch( url, {
      method: 'POST',
      headers: new Headers( {
          'Api-User-Agent': 'Example/1.0'
      } )
      // Other init settings such as 'credentials'
    } ).then( function ( response ) {
      if ( response.ok ) {
          return response.json();
      }
      throw new Error( 'Network response was not ok: ' + response.statusText );
    } ).then( function ( data ) {
      // do something with data
      const pages = data.query.pages
      extract = pages[Object.keys(pages)[0]].extract
      console.log(extract)
      const firstParagraph = extract.slice(0, extract.indexOf('</p>') + '</p>'.length)
      // return extract
      // outerMap.addTwoNumber(1, 3)
      outerMap.fillInfoWindow(marker, infowindow, map, firstParagraph)
    });
  }


  fillInfoWindow = (marker, infowindow, map, wikiData) => {
    infowindow.marker = marker
    console.log('wikiData: ' + wikiData)
    infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + wikiData + '</div>')
    infowindow.open(map, marker)
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null
    })
  }


  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  populateInfoWindow = (marker, infowindow, map) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      this.fetchFromWikipedia(marker, infowindow, map)
      // infowindow.marker = marker
      // console.log('wikiData: ' + wikiData)
      // infowindow.setContent('<div>' + marker.title + '</div>' + '<div>' + wikiData + '</div>')
      // infowindow.open(map, marker)
      // // Make sure the marker property is cleared if the infowindow is closed.
      // infowindow.addListener('closeclick', function() {
      //   infowindow.marker = null
      // })
    }
  }


  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  makeMarkerIcon = (markerColor) => {
    let markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),
      new window.google.maps.Point(0, 0),
      new window.google.maps.Point(10, 34),
      new window.google.maps.Size(21,34))
    return markerImage
  }



  initSetup = () => {
    // hard coded center locations here, will be better if retrieved from a server.
    const center = {
      title: 'Seattle', location: {
        "lat" : 47.6062095,
        "lng" : -122.3320708
      }
    }
    const markers = [
      {title: 'Discovery Park (Seattle)', location: {
        'lat'  : 47.657302,
        'lng' : -122.405496
      }},
      {title: 'Volunteer Park (Seattle)', location: {
        'lat' : 47.630028,
        'lng' : -122.315049
      }},
      {title: 'Gas Works Park', location: {
        'lat' : 47.6456308,
        'lng' : -122.3343532
      }},
      {title: 'Golden Gardens Park', location: {
        'lat' : 47.6917517,
        'lng' : -122.4030912
      }},
      {title: 'Washington Park Arboretum', location: {
        'lat' : 47.6397953,
        'lng' : -122.2944705
      }},
      {title: 'Seattle Great Wheel', location: {
        'lat' : 47.6061734,
        'lng' : -122.3425236
      }},
      {title: 'Space Needle', location: {
        'lat' : 47.6205063,
        'lng' : -122.3492774
      }},
      {title: 'Pike Place Market', location: {
        'lat' : 47.6101359,
        'lng' : -122.3420567
      }},
      {title: 'Seattle Aquarium', location: {
        'lat' : 47.607445,
        'lng' : -122.3429996
      }}
    ]

    let map = this.initMap(center)
    let largeInfowindow = new window.google.maps.InfoWindow({maxWidth: 200})
    console.log(largeInfowindow)
    console.log(typeof(largeInfowindow))
    this.addMarkers(map, markers, largeInfowindow)
    console.log(largeInfowindow)
    this.setState({map: map, markers: markers, center: center, infowindow: largeInfowindow})
  }

  componentDidMount() {
    window.initSetup = this.initSetup
    loadMapAsync('https://maps.googleapis.com/maps/api/js?key=AIzaSyBvM-jU8M1YuK6iAwA-Eh94FskaD-VHFis&v=3&callback=initSetup')
  }

  render() {
    const mapStyle = {
      // left: 200,
      width: 800,
      height: 500,
      border: '1px solid black'
    }

    const { map, markers, mapMarkers, infowindow, defaultIcon, highlightedIcon } = this.state

    return (
      <div>
        <ListLocations
          map={map}
          infowindow={infowindow}
          markers={markers}
          mapMarkers={mapMarkers}
          defaultIcon={defaultIcon}
          highlightedIcon={highlightedIcon}
          addMarkers={this.addMarkers}
          hideMarkers={this.hideMarkers}
          populateInfoWindow={this.populateInfoWindow}
        />
        <div id='map' className='map' ></div>
      </div>

    )
  }
}

export default Map

// load Google map asynchronously
function loadMapAsync(src) {
  var s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = src
  var x = document.getElementsByTagName('script')[0]
  x.parentNode.insertBefore(s, x)
}
