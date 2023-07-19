chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.requestCookiesList) {
      // Retrieve the stored cookies list from the background script
      chrome.runtime.sendMessage({ cookiesList: cookiesList });
    }
  });
  
  // Send a message to the background script to request the cookies list
  chrome.runtime.sendMessage({ requestCookiesList: true });
  