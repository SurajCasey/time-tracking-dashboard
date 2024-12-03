// Fetch the data from the JSON file
fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    // Add event listeners to the buttons
    document.getElementById('daily').addEventListener('click', () => updateData('daily', data));
    document.getElementById('weekly').addEventListener('click', () => updateData('weekly', data));
    document.getElementById('monthly').addEventListener('click', () => updateData('monthly', data));

    // Set default to weekly view
    updateData('weekly', data);
  })
  .catch((error) => console.error('Error fetching data:', error));

// Function to update the DOM based on the selected timeframe
function updateData(timeframe, data) {
  data.forEach((item) => {
    // Get the container corresponding to the activity (Work, Play, etc.)
    const container = document.querySelector(`.${item.title.toLowerCase().replace(' ', '-')}`);

    if (container) {
      // Update the .time element
      const timeElement = container.querySelector('.time');
      timeElement.textContent = `${item.timeframes[timeframe].current}hrs`;

      // Update the .previous element
      const previousElement = container.querySelector('.previous');
      previousElement.textContent = `Last ${
        timeframe === 'daily' ? 'Day' : timeframe === 'weekly' ? 'Week' : 'Month'
      } - ${item.timeframes[timeframe].previous}hrs`;
    }
  });
}
