let sortDirection = 1;

function loadTable(data, navigate) {
  if (!!data && data.length != 0) {
    let currentData = data;
    const headers = parseHeader(data);
    const tableElement = generateTable(headers, data);

    const output = document.getElementById("event-table");

    removeAllChildNodes(output);
    output.appendChild(tableElement);
  } else {
    const table_box = document.querySelector('#event-table');
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
  const theadElement = document.createElement("thead")
  tableElement = tableElement.appendChild(theadElement);

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
  const tbody = document.createElement("tbody")
  tableElement = tableElement.appendChild(tbody);

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

async function loadEvents(navigate) {
  let events = [];

  // Request List of Event Objects
  const response = await fetch('/api/pull-events');

  console.log(response)

  if (response.ok) {
    events = await response.json();
    console.log(events)
    loadTable(events, navigate);
  } else {
    if (response.status == 401) {
      alert(`⚠ Unauthorized to view events. Please Log in or Create an Account`)
      navigate('/');
    }
  }
}


export default loadEvents