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
  
function parseHeader(data) {
    let headers = [];
    for (const [key, value] of Object.entries(data[0])) {
      headers.push({ name: key, type: typeof value });
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
      for (const [, value] of Object.entries(dataRow)) {
        const cellElement = document.createElement("td");
        rowElement.appendChild(cellElement);
        const textNode = document.createTextNode(value);
        cellElement.appendChild(textNode);
      }
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
    table(sortedData);
  }
  
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
    	parent.removeChild(parent.firstChild);
    }
  }

function displayWeather() {
  const url = "http://dataservice.accuweather.com/currentconditions/v1/331215?apikey=qMnw1YnoAqsJNLNgnxVPu7uk6wPbGamA"
  fetch(url)
    .then((x => x.json()))
    .then((response) => {
      document.querySelector("#weather").textContent = response[0].Temperature.Imperial.Value + "° " + response[0].Temperature.Imperial.Unit;
    })
    .catch(document.querySelector("#weather").textContent = "Not Connected")
}

async function loadEvents() {
  let events = [];
  try {
    // Request List of Event Objects
    const response = await fetch('/pull-events');
    events = await response.json();

  } catch {
    console.log("Trouble in River City: Couldn't connect to Backend");
  }
  loadTable(events);

}

// Third Party API Service
displayWeather();

loadEvents();

