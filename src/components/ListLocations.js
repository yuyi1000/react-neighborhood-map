import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import '../App.css'

class ListLocations extends Component {

  static propTypes = {
    map: PropTypes.object.isRequired,
    defaultIcon: PropTypes.object.isRequired,
    highlightedIcon: PropTypes.object.isRequired,
    infowindow: PropTypes.object.isRequired,
    markers: PropTypes.array.isRequired,
    mapMarkers: PropTypes.array.isRequired,
    addMarkers: PropTypes.func.isRequired,
    hideMarkers: PropTypes.func.isRequired,
    populateInfoWindow: PropTypes.func.isRequired
  }

  state = {
    query: '',
  }

  updateQuery = (event) => {
    this.setState({query: event.target.value})
  }

  render() {
    const listStyle = {
      width: 180,
      height: 300,
      border: '1px solid black'
    }

    const { map, markers, mapMarkers, infowindow, defaultIcon, highlightedIcon, addMarkers, hideMarkers, populateInfoWindow } = this.props
    const { query } = this.state

    const filteredMapMarkers = mapMarkers.filter(mapMarker => mapMarker.title.toUpperCase().includes(query.toUpperCase()))
    const filteredMarkers = markers.filter(marker => marker.title.toUpperCase().includes(query.toUpperCase()))

    return (
      <div className='list-locations'>
        {/* <button onClick={() => hideMarkers(mapMarkers)}>hide markers</button> */}
        <form className='search-form' onSubmit={(e) => {hideMarkers(mapMarkers); addMarkers(map, filteredMarkers, infowindow); e.preventDefault()}} >
          <input className='search-input' type='text' value={query} placeholder='Attraction location' onChange={this.updateQuery} />
          <input className='search-filter' type='submit' value='Filter' />
        </form>

        <ul>
          {filteredMapMarkers.map(mapMarker => (
            <li key={mapMarker.title} onClick={() => populateInfoWindow(mapMarker, infowindow, map)}
              onMouseOver={() => mapMarker.setIcon(highlightedIcon)} onMouseOut={() => {mapMarker.setIcon(defaultIcon)}} >
              {mapMarker.title}
            </li>
          ))}
        </ul>
      </div>
    )

  }

}

export default ListLocations
