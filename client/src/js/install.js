// Get a reference to the button with the id "buttonInstall"
const butInstall = document.getElementById("buttonInstall");

// Listen for the "beforeinstallprompt" event
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("hit");
  console.log("event" + event);

  // Prevent the default browser install prompt
  event.preventDefault();

  // Store the event in a deferredPrompt variable for later use
  window.deferredPrompt = event;

  // Show the installation button by removing the "hidden" class
  butInstall.classList.toggle("hidden", false);
});

// Listen for a click event on the installation button
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  // If there's no deferredPrompt, exit the function
  if (!promptEvent) {
    return;
  }

  // Show the installation prompt
  promptEvent.prompt();

  // Reset the deferredPrompt to null
  window.deferredPrompt = null;

  // Hide the installation button by adding the "hidden" class
  butInstall.classList.toggle("hidden", true);
});

// Listen for the "appinstalled" event
window.addEventListener("appinstalled", (event) => {
  console.log("install hit");

  // Reset the deferredPrompt to null when the app is installed
  window.deferredPrompt = null;
});
