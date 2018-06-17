import React, { Component } from 'react';

class Map extends Component {

  state = {
    map: null,
    center: null,
    marks: []
  }

  initMap = (center) => {
    return new window.google.maps.Map(document.getElementById('map'), {
      center: center.location,
      zoom: 11
    })
  }

  // initMarks = (map, marks) => {
  //   marks.forEach((mark) => {
  //     let m = new window.google.maps.Marker({
  //       position: mark.location,
  //       map: map
  //     })
  //   })
  // }

  initSetup = () => {
    const center = {
      title: 'Seattle', location: {
        "lat" : 47.6062095,
        "lng" : -122.3320708
      }
    }

    const marks = [
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

    // this.initMarks(map, marks)
    //
    // this.setState({map: map, marks: marks})
  }


  componentDidMount() {
    // console.log(window.google)

    // window.initSetup = this.initSetup

    // console.log(map)
    // let map = new window.google.maps.Map(document.getElementById('map'), {
    //   center: {lat: 40.7413549, lng: -73.9980244},
    //   zoom: 13
    // });

    // hard coded center locations here, will be better if retrieved from a server.

  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };
    return (
      <div id='map' style={mapStyle}></div>
    )
  }
}

export default Map
