let sortDirection = 1;

function loadTable(data = recieveData()) {
    if (!!data && data.length > 1) {
      currentData = data;
      const headers = parseHeader(data);
      const tableElement = generateTable(headers, data);
  
      const output = document.getElementById("table");
  
      removeAllChildNodes(output);
      output.appendChild(tableElement);
    } else {
      outputData("invalid input", data);
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
    //   cellElement.setAttribute("onclick", `sortColumn(this)`);
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
  
  function outputData(title, data) {
    const output = document.getElementById("output");
    output.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(
      data,
      null,
      2
    )}</pre>`;
  }


function recieveData() {
    let dataobject = JSON.parse(localStorage.getItem("eventData"))
    if (dataobject.length === 0){

    }
    else {
      return dataobject;
    }
   
    
    }


// const sampleData = [
//     { Activity: "Take Five", Date: "Dave Brubeck", Time: 4.8, Location: "SFH" },
//     { Activity: "So What", Date: "Miles Davis", Time: 3.8, Location: "SFH" },
//     { Activity: "Take The A Train", Date: "Duke Ellington", Time: 4.2, Location: "SFH" },
//     { Activity: "Round Midnight", Date: "Thelonious Monk", Time: 3.1, Location: "SFH" },
//     { Activity: "My Favorite Things", Date: "John Coltrane", Time: 3., Location: "SFH" }
//   ];