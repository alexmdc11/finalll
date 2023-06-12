var clients = [
    { name: "Client 1", email: "client1@example.com", number: "87636367289"},
    { name: "Client 2", email: "client2@example.com", number: "87636367289"},
    { name: "Client 3", email: "client3@example.com", number: "87636367289"}
    // Add more clients as needed
  ];

  var clientList = document.getElementById("client-list");
  var addClientForm = document.getElementById("add-client-form");
  var addClientButton = document.getElementById("add-client-btn");
  var clientForm = document.getElementById("client-form");

  addClientButton.addEventListener("click", function() {
    addClientForm.style.display = "block";
  });

  clientForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var numberInput = document.getElementById("number");

    var newClient = {
      name: nameInput.value,
      email: emailInput.value,
      number: numberInput.value
    };

    clients.push(newClient);
    renderClientList();

    // Clear the form inputs
    nameInput.value = "";
    emailInput.value = "";
    numberInput.value = "";

    addClientForm.style.display = "none";
  });

  function renderClientList() {
    clientList.innerHTML = "";

    for (var i = 0; i < clients.length; i++) {
      var client = clients[i];
      var listItem = document.createElement("li");
      listItem.innerHTML = client.name + " - " + client.email + " - " + client.number;
      clientList.appendChild(listItem);
    }
  }

  renderClientList();