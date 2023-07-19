chrome.runtime.onMessage.addListener(function (message) {
  if (message.cookiesList) {
    const cookiesList = message.cookiesList;

    // Update the UI with the received cookies list
    updateUI(cookiesList);
  }
});

function updateUI(cookiesList) {
  const cookiesListElement = document.getElementById("cookiesList");
  cookiesListElement.innerHTML = ""; // Clear the previous content

  // Create a new unordered list element
  const ulElement = document.createElement("ul");

  // Loop through the cookies list and create list items for each cookie
  cookiesList.forEach(function (cookie) {
    const liElement = document.createElement("li");
    const titleElement = document.createElement("h2");
    // Extract the domain and value from the cookie object
    const domain = cookie.domain;
    const value = cookie.value;

    // Create a text node with the domain and value
    const titleNode = document.createTextNode(`${domain}`);
    const textNode = document.createTextNode(`${value}`);

    titleElement.appendChild(titleNode);
    // Append the text node to the list item
    liElement.appendChild(titleElement);
    liElement.appendChild(textNode);

    // Append the list item to the unordered list
    ulElement.appendChild(liElement);
  });

  // Append the unordered list to the cookiesListElement
  cookiesListElement.appendChild(ulElement);
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.action.setBadgeText({ text: "" });

  // Request the cookies list from the background script
  chrome.runtime.sendMessage({ requestCookiesList: true });

  const removeAllCookiesButton = document.getElementById(
    "removeAllButton"
  );
  removeAllCookiesButton.addEventListener("click", function () {
    chrome.cookies.getAll({}, function (cookies) {
      // Loop through all cookies and remove them
      cookies.forEach(function (cookie) {
        chrome.cookies.remove({
          url: cookie.secure
            ? "https://"
            : "http://" + cookie.domain + cookie.path,
          name: cookie.name,
        });
      });
      // Clear the UI after removing the cookies
      updateUI([{domain: 'No cookies founds', value: ''}]);
    });
  });
});
