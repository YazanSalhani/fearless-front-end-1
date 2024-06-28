import React, { useEffect, useState } from 'react';


function ConferenceForm() {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [location, setLocation] = useState('');

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/'

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            //console.log(data);

            setLocations(data.locations)
        }
    }

    function handleNameChange(event) {
        const value = event.target.value;
        setName(value);
    }

    function handleStartDateChange(event) {
        const value = event.target.value;
        setStartDate(value);
    }

    function handleEndDateChange(event) {
        const value = event.target.value;
        setEndDate(value);
    }

    function handleDescriptionChange(event) {
        const value = event.target.value;
        setDescription(value);
    }

    function handleMaxAttendeesChange(event) {
        const value = event.target.value;
        setMaxAttendees(value);
    }

    function handleMaxPresentationsChange(event) {
        const value = event.target.value;
        setMaxPresentations(value);
    }

    function handleLocationChange(event) {
        const value = event.target.value;
        setLocation(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {}

        data.name = name;
        data.starts = startDate;
        data.ends = endDate;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;
        //console.log(data)

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        console.log(fetchConfig);

        try {
            const response = await fetch(conferenceUrl, fetchConfig);
            if (response.ok) {
                const newConference = await response.json();
                console.log(newConference);

                setName('');
                setStartDate('');
                setEndDate('');
                setDescription('');
                setMaxAttendees('');
                setMaxPresentations('');
                setLocation('');
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Fetch error:', error)
        }
    }


    useEffect( () => {
        fetchData();
    }, []);

    return (
    <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new conference</h1>
              <form onSubmit={handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                  <input value={name} onChange={handleNameChange} placeholder="Name" required type="text" id="name" name="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={startDate} onChange={handleStartDateChange} placeholder="Start date" required type="date" id="starts" name="starts" className="form-control" />
                  <label htmlFor="starts">Start date</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={endDate} onChange={handleEndDateChange} placeholder="End date" required type="date" id="ends" name="ends" className="form-control" />
                  <label htmlFor="ends">End date</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea value={description} onChange={handleDescriptionChange} required className="form-control" type="text" id="description" name="description" rows="3"></textarea>
                </div>
                <div className="form-floating mb-3">
                  <input value={maxPresentations} onChange={handleMaxPresentationsChange} placeholder="Max presentations" required type="number" id="max_presentations" name="max_presentations" className="form-control" />
                  <label htmlFor="max_presentations">Maximum presentations</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={maxAttendees} onChange={handleMaxAttendeesChange} placeholder="Max attendees" required type="number" id="max_attendees" name="max_attendees" className="form-control" />
                  <label htmlFor="max_attendees">Maximum attendees</label>
                </div>
                <div className="mb-3">
                  <select value={location} onChange={handleLocationChange} required key="location" name="location" className="form-select">
                    <option value="">Choose a location</option>
                    {locations.map(location => {
                        return (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    </div>
    )
}


export default ConferenceForm
