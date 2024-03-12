let eventID = 0;
let eventTitle
let eventDate
let eventTime
let eventLocation
let eventDescription

function onPageLoad() {
    let storedValue = localStorage.getItem("eventData");
    if (storedValue !== null) {
        console.log("Database already created")
    } else {
        let userData = {total_users: 0};
        let eventData = [];
        // localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("eventData", JSON.stringify(eventData));
    }
    }

function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
    
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
    
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
    
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
}

displayQuote();
    