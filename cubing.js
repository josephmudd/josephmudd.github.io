window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/US.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const competitions = await response.json();
    const currentDate = new Date();

    // Filter competitions to only include future events
    const futureEvents = competitions.items.filter(event => new Date(event.date.from) > currentDate);

    // Create a table and append it to the div with id="competitions"
    const competitionsDiv = document.getElementById('competitions');
    if (competitionsDiv) {
      const table = document.createElement('table');
      table.border = '1';

      // Create table header
      const headerRow = document.createElement('tr');
      const headers = ['Name', 'Start Date', 'End Date', 'Location'];
      headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Populate table rows with future events
      futureEvents.forEach(event => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = event.name;
        row.appendChild(nameCell);

        const startDateCell = document.createElement('td');
        startDateCell.textContent = event.date.from;
        row.appendChild(startDateCell);

        const endDateCell = document.createElement('td');
        endDateCell.textContent = event.date.till;
        row.appendChild(endDateCell);

        const locationCell = document.createElement('td');
        locationCell.textContent = event.city;
        row.appendChild(locationCell);

        table.appendChild(row);
      });

      competitionsDiv.appendChild(table);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
});