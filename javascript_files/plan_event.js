// Set limits for input boxes
let currentDateandTime =  new Date().toISOString().split('T')[0]
console.log(currentDateandTime)
document.getElementById('date').min = currentDateandTime