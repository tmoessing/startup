let sortDirection = 1;

function sortHeaderColumn(column) {
    sortDirection *= -1;
    const column_values = column.innertext;
    const sortedData = currentData.sort((a,b) => sortDirection *(a[column_values] > b[column_values] ? 1 : -1));
    // table(sortedData)