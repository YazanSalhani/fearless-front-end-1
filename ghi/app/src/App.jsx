import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }

  return (
    <>
      <Nav />
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  )
}

export default App;
