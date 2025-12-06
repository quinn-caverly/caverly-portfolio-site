// reset-tooltip.js
// A simple script that clears the localStorage flag for the welcome tooltip

(function() {
  // Remove the localStorage item that tracks whether the user has seen the tooltip
  localStorage.removeItem("hasSeenWelcomeTooltip");

  // Provide feedback to the user
  console.log("Welcome tooltip has been reset! Refresh the page to see it again.");

  // If this script is executed directly in the browser
  if (typeof document !== 'undefined') {
    // Create a feedback element
    const feedback = document.createElement('div');
    feedback.style.position = 'fixed';
    feedback.style.top = '20px';
    feedback.style.left = '50%';
    feedback.style.transform = 'translateX(-50%)';
    feedback.style.background = 'rgba(0, 0, 0, 0.8)';
    feedback.style.color = 'white';
    feedback.style.padding = '12px 20px';
    feedback.style.borderRadius = '8px';
    feedback.style.zIndex = '9999';
    feedback.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    feedback.style.transition = 'opacity 0.3s ease';
    feedback.textContent = 'Welcome tooltip reset! Refresh the page to see it.';

    // Add to document
    document.body.appendChild(feedback);

    // Remove after a few seconds
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 300);
    }, 3000);
  }
})();
