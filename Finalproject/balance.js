document.addEventListener("DOMContentLoaded", function() {
    // Retrieve total sales amount from localStorage
    var totalSales = localStorage.getItem("totalSales");
  
    // Get the total-sales element
    var totalSalesElement = document.getElementById("total-sales");
  
    // Check if totalSales value exists
    if (totalSales) {
      // Update the content of total-sales element with the total sales amount
      totalSalesElement.textContent = "Total Sales: $" + totalSales;
    } else {
      // If totalSales value does not exist, display a message
      totalSalesElement.textContent = "No sales recorded.";
    }
  });
  