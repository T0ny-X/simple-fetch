document.getElementById("fetchButton").addEventListener("click", fetchData);

function fetchData() {
    const jsonUrl = "https://raw.githubusercontent.com/T0ny-X/simple-fetch/master/data.json";

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
            displayError(error.message);
        });
}

function displayData(data, container = document.getElementById("dataContainer")) {
    // Check data structure
    if (typeof data === 'object' && data !== null) {
        // Handle arrays
        if (Array.isArray(data)) {
            const listContainer = document.createElement('ul');
            container.appendChild(listContainer);

            for (const item of data) {
                const listItem = document.createElement('li');
                listContainer.appendChild(listItem);
                displayData(item, listItem);
            }
        } else {
            // Handle objects
            for (const key in data) {
                // Check if the value is presentable
                if (typeof data[key] === 'string' || typeof data[key] === 'number') {
                    const element = document.createElement('p');
                    element.textContent = `${key}: ${data[key]}`;
                    container.appendChild(element);
                }
                else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
                    // Handle nested
                    const nestedContainer = document.createElement('div');
                    container.appendChild(nestedContainer);
                    displayData(data[key], nestedContainer);
                }
            }
        }
    } else {
        // Single value
        const element = document.createElement('p');
        element.textContent = String(data);
        container.appendChild(element);
    }
}

function displayError(errorMessage, container = document.getElementById("dataContainer")) {
    const errorElement = document.createElement('p');
    errorElement.style.color = 'red';
    errorElement.textContent = `Error: ${errorMessage}`;
    container.appendChild(errorElement);
}

function clearData(container = document.getElementById('dataContainer')) {
    // Clear the data container
    container.innerHTML = '';
}