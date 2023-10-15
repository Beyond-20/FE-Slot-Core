import { config } from "./config.js";
var API_KEY = config.API_KEY;
var API_URL = config.API_URL;
var PROVIDER_ID = config.PROVIDER_ID;
var USER_SERVICE_URL = config.USER_SERVICE_URL;
var gameName = config.gameName;

export function getTournamentRanking(tournamentId) {
  var playerInfo = window.getPlayerInfo();
  var tournamentRankingRequest = {
    tournament_id: playerInfo.tournament_id
  };

  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      data: tournamentRankingRequest,
      url: USER_SERVICE_URL + "/" + gameName + "/ranking"
    }).then(function (response) {
      resolve(response.data);
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
}

export var getTournamentInfo = function getTournamentInfo() {
  var playerInfo = window.getPlayerInfo();
  var tournamentInfoRequest = {
    tournament_id: playerInfo.tournament_id
  };

  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      data: tournamentInfoRequest,
      url: USER_SERVICE_URL + "/" + gameName + "/info"
    }).then(function (response) {
      resolve(response.data);
    }).catch(function (err) {
      return reject(err);
    });
  });
};

export function getPlayerInfo() {
  var playerInfo = window.getPlayerInfo();
  var playerInfoRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id
  };
  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      data: playerInfoRequest,
      url: USER_SERVICE_URL + "/" + gameName + "/player-info"
    }).then(function (response) {
      return resolve(Object.assign({}, response.data, playerInfo));
    }).catch(function (err) {
      return reject(err);
    });
  });
}

export function getPrizeDropHistory(type, playerId) {
  var playerInfo = window.getPlayerInfo();
  var getPrizeDropHistoryRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id,
    type: type
  };
  var getPrizeDropHistoryRequestWinners = {
    tournament_id: playerInfo.tournament_id,
    type: type
  };

  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      data: !playerId ? getPrizeDropHistoryRequest : getPrizeDropHistoryRequestWinners,
      url: USER_SERVICE_URL + "/" + gameName + "/prize-drop-history"
    }).then(function (response) {
      return resolve(response.data);
    }).catch(function (err) {
      return reject(err);
    });
  });
}

export function playerRankingHistory() {
  var playerInfo = window.getPlayerInfo();
  var getPlayerRankingHistoryRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id
  };

  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      data: getPlayerRankingHistoryRequest,
      url: USER_SERVICE_URL + "/" + gameName + "/player-ranking"
    }).then(function (response) {
      return resolve(response.data);
    }).catch(function (err) {
      return reject(err);
    });
  });
}

export function getPrizeDropSummary(type) {
  var playerInfo = window.getPlayerInfo();
  var getPrizeDropSummaryRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id,
    type: type
  };

  return new Promise(function (resolve, reject) {
    axios({
      method: "post",
      data: getPrizeDropSummaryRequest,
      url: USER_SERVICE_URL + "/" + gameName + "/prize-drop-summary"
    }).then(function (response) {
      resolve(response.data);
    }).catch(function (err) {
      console.log(err);
      reject(err);
    });
  });
}