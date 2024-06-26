

window.addEventListener("DOMContentLoaded", async () => {
    const url = 'http://localhost:8000/api/states/'

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log(data);

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

    } catch (error) {
        console.error('error', error);
    }
})
