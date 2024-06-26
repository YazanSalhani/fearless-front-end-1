function createCard(name, description, pictureUrl, start, end, location) {
    return `
    <div class="card" style="box-shadow: 5px 5px 5px grey; margin-top: 20px;">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-body-secondary">
            ${start} - ${end}
        </div>
    </div>

  `;
}

// function formatDate(date) {
//     const dateObject = new Date(date);
//     const month = dateObject.getUTCMonth() + 1
//     const day = dateObject.getUTCDate()
//     const year = dateObject.getUTCFullYear()

//     return `${month}/${day}/${year}`
// }

function createAlert(message, type) {
    return `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `;
}

function displayAlert(message, type) {
    const html = createAlert(message, type);
    const containerTag = document.querySelector('.container');
    const htmlElement = document.createElement('div');
    htmlElement.innerHTML = html;
    containerTag.append(htmlElement);
}

function handleResponseError(response) {
    if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status} (${response.statusText})`);
    }
    return response;
}

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error retrieving conferences. ${response.status} (${response.statusText})`);
        } else {
            const data = await response.json();

            for (let i = 0; i < data.conferences.length; i++) {

                const conference = data.conferences[i]
                const detailURL = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailURL);

                if (detailResponse.ok) {
                    const details = await detailResponse.json();

                    const name = details.conference.name;
                    //const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;

                    const startDate = new Date(details.conference.starts)
                    const formattedStartDate = startDate.toLocaleDateString();

                    const endDate = new Date(details.conference.ends);
                    const formattedEndDate = endDate.toLocaleDateString();

                    const location = details.conference.location.name;

                    const html = createCard(name, description, pictureUrl, formattedStartDate, formattedEndDate, location);

                    const columns = document.querySelectorAll('.col');
                    columns[i % columns.length].innerHTML += html;

                }
            }
            }
    } catch (error) {
        displayAlert(error.message, 'danger');
    }
});
