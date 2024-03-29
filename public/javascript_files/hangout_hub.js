let sortDirection = 1;

function loadTable(data) {
    if (!!data && data.length != 0) {
      currentData = data;
      const headers = parseHeader(data);
      const tableElement = generateTable(headers, data);
  
      const output = document.getElementById("table");
  
      removeAllChildNodes(output);
      output.appendChild(tableElement);
    } else {
      const table_box  = document.querySelector('#table');
      table_box.innerHTML = `<p>There are no planned events. To create one click <a href="plan_event.html">here</a> to be redirected to the Plan Event Page</p>`;
    }
  }
  

const headersToShow = ['Activity', 'Date', 'Time', "Location"]

function parseHeader(data) {
    let headers = [];
    for (const [key, value] of Object.entries(data[0])) {
      if (headersToShow.includes(key)) {
        headers.push({ name: key, type: typeof value });
      }
    }
    return headers;
  }
  
function generateTable(headers, data) {
    const tableElement = document.createElement("table");
  
    generateHeader(headers, tableElement);
    generateRows(data, tableElement);
  
    return tableElement;
  }
  
function generateHeader(headers, tableElement) {
    const rowElement = document.createElement("tr");
    tableElement.appendChild(rowElement);
  
    headers.forEach((header) => {
      const cellElement = document.createElement("th");
      rowElement.appendChild(cellElement);
      cellElement.onclick = () => sortColumn(header.name);
      const textNode = document.createTextNode(header.name);
      cellElement.appendChild(textNode);
    });
  }
  
function generateRows(data, tableElement) {
    data.forEach((dataRow) => {
      const rowElement = document.createElement("tr");
      tableElement.appendChild(rowElement);

      headersToShow.forEach(header => {
        const cellElement = document.createElement("td");
        rowElement.appendChild(cellElement);
        const textNode = document.createTextNode(dataRow[header]);
        cellElement.appendChild(textNode);
      });
    });
  }

function insertRule(rule) {
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(rule, sheet.cssRules.length);
  }
  
function sortColumn(column) {
    sortDirection *= -1;
    const sortBy = column.innerText;
    const sortedData = currentData.sort(
    	(a, b) => sortDirection * (a[sortBy] > b[sortBy] ? 1 : -1)
    );
    loadTable(sortedData);
  }
  
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
    	parent.removeChild(parent.firstChild);
    }
  }


// function displayWeather() {
//   const url = "http://dataservice.accuweather.com/currentconditions/v1/331215?apikey=qMnw1YnoAqsJNLNgnxVPu7uk6wPbGamA"
//   fetch(url)
//     .then((x => x.json()))
//     .then((response) => {
//       document.querySelector("#weather").textContent = response[0].Temperature.Imperial.Value + "° " + response[0].Temperature.Imperial.Unit;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       document.querySelector("#weather").textContent = "Not Connected";
//     });
// }

async function loadEvents() {
  let events = [];
  
  // Request List of Event Objects
  const response = await fetch('/api/pull-events');

  console.log(response)

  if (response.ok) {
    events = await response.json();
    console.log(events)
    loadTable(events);
  } else {
    if (response.status == 401) {
      alert(`⚠ Unauthorized to view events. Please Log in or Create an Account`)
      window.location.href = "log_in.html";
  }
}
}

loadEvents();

