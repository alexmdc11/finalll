// Retrieve the sales data from the local storage or initialize an empty array
let salesData = JSON.parse(localStorage.getItem('salesData')) || [];

// Function to add a new sale and update the sales history
function addSale() {
  const clientSelect = document.getElementById('client-select');
  const saleAmountInput = document.getElementById('sale-amount');
  const saleDateInput = document.getElementById('sale-date');
  const unitTypeSelect = document.getElementById('unit-type');

  // Retrieve the values from the input fields
  const client = clientSelect.value;
  const saleAmount = saleAmountInput.value;
  const saleDate = saleDateInput.value;
  const unitType = unitTypeSelect.value;

  // Create a new row in the sales table
  const tableBody = document.getElementById('sales-body');
  const newRow = tableBody.insertRow();

  // Create cells and assign values
  const clientCell = newRow.insertCell();
  clientCell.textContent = client;

  const saleAmountCell = newRow.insertCell();
  saleAmountCell.textContent = saleAmount;

  const saleDateCell = newRow.insertCell();
  saleDateCell.textContent = saleDate;

  const unitTypeCell = newRow.insertCell();
  unitTypeCell.textContent = unitType;

  // Add the new sale to the salesData array
  salesData.push({
    client,
    saleAmount,
    saleDate,
    unitType,
  });

  // Save the updated salesData array to local storage
  localStorage.setItem('salesData', JSON.stringify(salesData));

  // Clear input fields
  clientSelect.value = '';
  saleAmountInput.value = '';
  saleDateInput.value = '';
  unitTypeSelect.value = '';

  // Calculate the total sales
  let totalSales = salesData.reduce((sum, sale) => sum + Number(sale.saleAmount), 0);

  // Update the total sales in the HTML page
  const totalSalesElement = document.getElementById('total-sales');
  totalSalesElement.textContent = totalSales;

  initializeSalesHistory();
  updateChart();

}

// Function to initialize the sales history table
function initializeSalesHistory() {
  const tableBody = document.getElementById('sales-body');

  // Clear the existing table rows
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }

  // Populate the table with sales data
  salesData.forEach((sale, index) => {
    const newRow = tableBody.insertRow();

    const clientCell = newRow.insertCell();
    clientCell.textContent = sale.client;

    const saleAmountCell = newRow.insertCell();
    saleAmountCell.textContent = sale.saleAmount;

    const saleDateCell = newRow.insertCell();
    saleDateCell.textContent = sale.saleDate;

    const unitTypeCell = newRow.insertCell();
    unitTypeCell.textContent = sale.unitType;

    // Add a delete button for each row
    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      removeSale(index); // Call the function to remove the sale at the specified index
    });
    deleteCell.appendChild(deleteButton);
  });

  updateTotalSales(); // Call the function to update the total sales
}

// Function to remove a sale
function removeSale(index) {
  // Remove the sale from the salesData array
  salesData.splice(index, 1);

  // Save the updated salesData array to local storage
  localStorage.setItem('salesData', JSON.stringify(salesData));

  // Call the function to reinitialize the sales history table to update the displayed data
  initializeSalesHistory();

   // Call the function to recalculate and update the total sales
  updateTotalSales();
}

function updateTotalSales() {
  // Calculate the total sales
  let totalSales = salesData.reduce((sum, sale) => sum + Number(sale.saleAmount), 0);

  // Update the total sales in the balance.html page
  const totalSalesElement = document.getElementById('total-sales');
  totalSalesElement.textContent = 'Total Sales: ' + totalSales;
}

// Initial chart rendering
updateChart();

// Call the function to initialize the sales history table when the page loads
initializeSalesHistory();