const widgetTitle = document.getElementById("widget-title");
const statsIcons = document.getElementById("stats-icons");
const avgOdds = document.getElementById("avg-odds");

const data = window.BET_STATS_DATA;

const statsMarkup = data.stats
  .map(
    (item) => `
      <div class="stats-item" aria-label="${item.label}: ${item.value}">
        <span class="stats-icon stats-icon-${item.type}" aria-hidden="true">${item.icon}</span>
        <span class="stats-value">${item.value}</span>
      </div>
    `
  )
  .join("");

widgetTitle.textContent = data.title;
statsIcons.innerHTML = statsMarkup;
avgOdds.textContent = data.averageOdds;
