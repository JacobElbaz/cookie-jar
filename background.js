let cookiesList = [{domain: 'No cookies founds', value: ''}];

chrome.cookies.onChanged.addListener(function (changeInfo) {
  chrome.action.setBadgeText({ text: "New" });

  // Store the received cookie information
  cookiesList.unshift(changeInfo.cookie);

  // Limit the cookies list to 5 elements
  if (cookiesList.length > 5) {
    cookiesList = cookiesList.slice(0, 5);
  }

  // Send the updated cookies list to the popup
  chrome.runtime.sendMessage({ cookiesList });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.requestCookiesList) {
    // Send the stored cookies list to the popup
    chrome.runtime.sendMessage({ cookiesList });
  }
});