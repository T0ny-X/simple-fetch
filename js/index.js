document.getElementById("fetchButton").addEventListener("click", fetchData);

function fetchData() {
    const jsonUrl = "../data.json";

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error("Error during fetch:", error);
        });
}

function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");

    let table = document.createElement('table');

    let dataHeader = Object.keys(data[0]);
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');

    dataHeader.forEach((key) => {
        let headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    data.forEach((object) => {
        let row = document.createElement('tr');
        dataHeader.forEach((key) => {
            let cell = document.createElement('td');
            cell.textContent = object[key];
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Append the table to the container
    dataContainer.appendChild(table);
}
