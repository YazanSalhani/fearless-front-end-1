

window.addEventListener("DOMContentLoaded", async () => {
    const url = 'http://localhost:8000/api/states/'

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            //console.log(data);

            const selectTag = document.getElementById('state');
            for (let state of data.states) {
                const option = document.createElement('option');
                option.value = state.abbreviation;
                option.innerHTML = state.state;
                selectTag.appendChild(option);
            }

        } else {
            throw new Error(`An error has occurred: ${response.status} (${response.statusText})`);
        };

        const formTag = document.getElementById('create-location-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();

            const formData = new FormData(formTag);
            const json =JSON.stringify(Object.fromEntries(formData));
            //console.log(json);

            const locationUrl = 'http://localhost:8000/api/locations/';
            const fetchConfig = {
                method: 'post',
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const locationResponse = await fetch(locationUrl, fetchConfig);
            if (locationResponse.ok) {
                formTag.reset();
                const newLocation = await locationResponse.json();
                //console.log(newLocation);
            }
        });

    } catch (error) {
        console.error('error', error);
    }
});
