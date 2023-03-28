let Players = [];

function loadPlayers(data) {
  Players = JSON.parse(data);
}

function savePlayers() {
  return JSON.stringify(Players);
}

function clearPlayers() {
  if (Players.length > 0) {
    Players.length = 0;
  }
}

export { Players, clearPlayers, loadPlayers, savePlayers };
