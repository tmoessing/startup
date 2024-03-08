let sortDirection = 1;

function loadTable() {
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

function processdata(dataobject) {
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear();
	let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
	let currentDay = String(currentDate.getDate()).padStart(2, '0');
	// currentDate = year + "-" + month + "-" + day;

	let currentTime = new Date();
	let currentHour = currentTime.getHours();
	let currentMinute = currentTime.getMinutes();
	// currentTime = hours + ":" + minutes;

  let eventList = JSON.parse(localStorage.getItem("eventData"));
	// Look at each event
	for (let event of eventList) {
		let [eventYear, eventMonth, eventDay] = event["Date"].split('-').map(Number);
		let [eventHour, eventMinute] = event["Time"].split(":").map(Number);

		if (currentYear < eventYear) {
			continue;
		} else if (currentYear > eventYear) {
			eventList = eventList.filter(item => item !== event);
		} else {
			// currentYear is equal to eventYear, check month
			if (currentMonth < eventMonth) {
				continue;
			} else if (currentMonth > eventMonth) {
				// event has already occurred this month
				eventList = eventList.filter(item => item !== event);
			} else {
				// currentMonth is equal to eventMonth, check day
				if (currentDay < eventDay) {
					continue;
				} else if (currentDay > eventDay) {
					// event has already occurred today
					eventList = eventList.filter(item => item !== event);
				} else {
					// currentDay is equal to eventDay, check hour
					if (currentHour < eventHour) {
						continue;
					} else if (currentHour > eventHour) {
						// event has already occurred this hour
						eventList = eventList.filter(item => item !== event);
					} else {
						// currentHour is equal to eventHour, check minute
						if (currentMinute < eventMinute) {
							continue;
						} else if (currentMinute > eventMinute) {
							// event has already occurred this minute
							eventList = eventList.filter(item => item !== event);
						} else {
							// The event is happening right now!
						}
					}
				}
			}
		}
		
		// Remove element forom eventList
		
	}

	localStorage.setItem("eventData", JSON.stringify(eventList));

}


function displayWeather() {
  const url = "http://dataservice.accuweather.com/currentconditions/v1/331215?apikey=qMnw1YnoAqsJNLNgnxVPu7uk6wPbGamA"
  fetch(url)
    .then((x => x.json()))
    .then((response) => {
      document.querySelector("#weather").textContent = response[0].Temperature.Imperial.Value + "° " + response[0].Temperature.Imperial.Unit;
    })
}

async function loadEvents() {
  let events = [];
  try {
    // Request List of Event Objects
    const response = await fetch('/events');
    events = await response.json();

    console.log("Inside loadEvents")
    console.log(events);

    loadTable(events)

    return events;
  } catch {
    console.log("Trouble in River City: Couldn't connect to Backend");
  }

}
// displayWeather(); #ONot Connected to Internet
// console.log("Trouble in River City");
loadEvents();

