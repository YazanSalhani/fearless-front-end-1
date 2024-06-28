import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

async function loadAttendees() {
  const response = await fetch('http://localhost:8001/api/attendees/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App attendees={data.attendees} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}
loadAttendees();
