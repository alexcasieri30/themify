(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  
  function getBackgroundColor(name) {
    if (name === 'red') {
      return 'MistyRose'
    }
    else if (name === 'green') {
      return 'LightGreen'
    }
    else if (name === 'purple') {
      return 'DarkOrchid'
    }
    else {
      return 'LightCyan'
    }
  }

  /**
   * Change the theme of the document to be colored with the
   * color passed by the message corresponding to the color
   * picked from the popup
   */
  function changeTheme(color) {
    document.body.style.border = "5px solid " + color;
    backgroundC = getBackgroundColor(color)
    document.body.style.backgroundColor = "" + backgroundC;
    /*
    document.style.scrollbarBaseColor = "red";
    document.body.style.scrollbarArrowColor = "red";
    document.body.style.scrollbarTrackColor = "red";
    Above code to change the color of the scrollbar works but will not show on most browsers
    */
  }

  /**
   * Reset the theme of the page to default
   */
  function resetTheme() {
    document.body.style.border = "0px solid red";
    document.body.style.backgroundColor = "white";
  }
  
  function biggerWidth(color) {
    document.body.style.border = "20px solid " + color;
  }

  /**
   * Listen for messages from the background script.
   * Call "changeTheme()" or "resetTheme()".
   */
  browser.runtime.onMessage.addListener((message) => {
    const m = message.color
    if (message.command === "themify") {
      changeTheme(m);
    } else if (message.command === "reset") {
      resetTheme();
    } else if (message.command === "WIDER"){
      biggerWidth(m);
    }
  });
})();