

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/'

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            //console.log(data);

            const selectTag = document.getElementById('location');
            for(let location of data.locations) {
                const option = document.createElement('option');
                option.value = location.id;
                option.innerHTML = location.name;
                selectTag.appendChild(option);
            }

            const formTag = document.getElementById('create-conference-form');
            //console.log(formTag)

            formTag.addEventListener('submit', async event => {
                event.preventDefault();

                const formData = new FormData(formTag);
                const json = JSON.stringify(Object.fromEntries(formData));
                //console.log(formData)
                console.log(json);

                const conferenceUrl = 'http://localhost:8000/api/conferences/';
                const fetchConfig = {
                    method: 'post',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                //console.log(fetchConfig)

                const conferenceResponse = await fetch(conferenceUrl, fetchConfig);

                //console.log(conferenceResponse)
                if (conferenceResponse.ok) {
                    formTag.reset();
                    const newConference = await conferenceResponse.json();
                    //console.log(newConference);
                }
            });

        } else {
            throw new Error(`An error has occurred: ${response.status} (${response.statusText})`);
        };

    } catch (error) {
        console.error('error', error);
    }
})
