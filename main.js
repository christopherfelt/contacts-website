let contacts = [];

let contactForm = document.getElementById("new-contact-form");

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault();
  let form = event.target;
  //these variable are not necessary the assignments should be directly inserted into object
  // let contactName = form.contactName.value;
  // let contactPhone = form.contactPhone.value;
  // let emergencyContact = "";
  // if (form.emergencyContact.checked) {
  //   emergencyContact = "emergency-contact";
  // }

  // let newContact = {
  //   id: generateId(),
  //   name: contactName,
  //   phone: contactPhone,
  //   emergency: emergencyContact
  // };

  let newContact = {
    id: generateId(),
    name: form.contactName.value,
    phone: form.contactPhone.value,
    emergency: form.emergencyContact.checked
  };

  let existingContact = contacts.find(
    contact => contact.name == form.contactName.value
  ); //not included in tutorial

  if (!existingContact) {
    contacts.push(newContact);
    saveContacts();
    form.reset();
  }
  document.getElementById("new-contact-form").classList.add("hidden");
  document.getElementById("contactToggle").classList.remove("hidden");
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  drawContacts();
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"));
  if (contactsData) {
    contacts = contactsData;
  }
}

/**
 * This function targets the contacts-list on the
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = "";

  contacts.forEach(contact => {
    //initially had the emergency including the class name or a blank string
    template += `
      <div class="card mt-1 mb-1 ${
        contact.emergency ? "emergency-contact" : ""
      }"> 
        <h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${
            contact.id
          }')"></i>
        </div>
      </div>
    `;
  });

  document.getElementById("contact-list").innerHTML = template;
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the
 * contact by their id from the list of contacts
 * *** hints:
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId
 */
function removeContact(contactId) {
  let removeContactIndex = contacts.findIndex(
    contact => contact.id === contactId
  );
  contacts.splice(removeContactIndex, 1);
  saveContacts();
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  if (!contactForm.classList.contains("hidden")) {
    contactForm.classList.add("hidden");
    document.getElementById("contactToggle").classList.remove("hidden");
  } else {
    contactForm.classList.remove("hidden");
    document.getElementById("contactToggle").classList.add("hidden");
  }
}

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "_" +
    Math.floor(Math.random() * 10000000)
  );
}

loadContacts();
drawContacts();
