function createCard(name, description, pictureUrl, formattedStartDate, formattedEndDate, location) {
    return `
    <div class="card" style="box-shadow: 5px 5px 5px grey; margin-top: 20px;">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-body-secondary">
            ${formattedStartDate} - ${formattedEndDate}
        </div>
    </div>

  `;
}

function formatDate(date) {
    const dateObject = new Date(date);
    const month = dateObject.getUTCMonth() + 1
    const day = dateObject.getUTCDate()
    const year = dateObject.getUTCFullYear()

    return `${month}/${day}/${year}`
}


window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Response not ok');
        } else {
            const data = await response.json();

            let count = 1
            for (let conference of data.conferences) {
                const detailURL = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailURL);

                if (detailResponse.ok) {
                    const details = await detailResponse.json();

                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;

                    const startDate = details.conference.starts
                    const formattedStartDate = formatDate(startDate);

                    const endDate = details.conference.ends
                    const formattedEndDate = formatDate(endDate);

                    const location = details.conference.location.name;

                    const html = createCard(name, description, pictureUrl, formattedStartDate, formattedEndDate, location);

                    let col
                    if (count === 1) {
                        col = '.col1';
                        count++;
                    } else if (count === 2) {
                        col = '.col2';
                        count++;
                    } else if (count === 3) {
                        col = '.col3';
                        count = 1
                    }
                    const column = document.querySelector(col)
                    column.innerHTML += html
                }
            }
            }
    } catch (error) {
        console.error('error', error);
    }
});
