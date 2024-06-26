

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/'

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            //console.log(data)

            const selectTag = document.getElementById('conference')
            for (let conference of data.conferences) {
                const option = document.createElement('option');
                option.value = conference.id;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }

            const formTag = document.getElementById('create-presentation-form');

            formTag.addEventListener('submit', async event => {
                event.preventDefault();

                const formData = new FormData(formTag);
                const conferenceId = formData.get('conference');
                const json = JSON.stringify(Object.fromEntries(formData));
                //console.log(json)

                const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`

                const fetchConfig = {
                    method: 'post',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }

                const presentationResponse = await fetch(presentationUrl, fetchConfig);

                if (presentationResponse.ok) {
                    formTag.reset();
                    const newPresentation = await presentationResponse.json()
                    console.log(newPresentation);
                }
            });
        } else {
            throw new Error(`An error has occurred: ${response.status} (${response.statusText})`);
        };
        
    } catch (error) {
        console.error('error', error);
    }
})
