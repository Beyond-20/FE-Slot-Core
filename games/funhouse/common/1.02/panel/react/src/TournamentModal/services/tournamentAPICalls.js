import { config } from "./config.js";
const API_KEY = config.API_KEY;
const API_URL = config.API_URL;
const PROVIDER_ID = config.PROVIDER_ID;
const USER_SERVICE_URL = config.USER_SERVICE_URL;
const gameName = config.gameName;

export function getTournamentRanking(tournamentId) {
  const playerInfo = window.getPlayerInfo();
  const tournamentRankingRequest = {
    tournament_id: playerInfo.tournament_id,
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      data: tournamentRankingRequest,
      url: `${USER_SERVICE_URL}/${gameName}/ranking`,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export const getTournamentInfo = () => {
  const playerInfo = window.getPlayerInfo();
  const tournamentInfoRequest = {
    tournament_id: playerInfo.tournament_id,
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      data: tournamentInfoRequest,
      url: `${USER_SERVICE_URL}/${gameName}/info`,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
};

export function getPlayerInfo() {
  const playerInfo = window.getPlayerInfo();
  const playerInfoRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id,
  };
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      data: playerInfoRequest,
      url: `${USER_SERVICE_URL}/${gameName}/player-info`,
    })
      .then((response) => resolve({ ...response.data, ...playerInfo }))
      .catch((err) => reject(err));
  });
}

export function getPrizeDropHistory(type, playerId) {
  const playerInfo = window.getPlayerInfo();
  const getPrizeDropHistoryRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id,
    type: type,
  };
  const getPrizeDropHistoryRequestWinners = {
    tournament_id: playerInfo.tournament_id,
    type: type,
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      data: !playerId
        ? getPrizeDropHistoryRequest
        : getPrizeDropHistoryRequestWinners,
      url: `${USER_SERVICE_URL}/${gameName}/prize-drop-history`,
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function playerRankingHistory() {
  const playerInfo = window.getPlayerInfo();
  const getPlayerRankingHistoryRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id,
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      data: getPlayerRankingHistoryRequest,
      url: `${USER_SERVICE_URL}/${gameName}/player-ranking`,
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function getPrizeDropSummary(type) {
  const playerInfo = window.getPlayerInfo();
  const getPrizeDropSummaryRequest = {
    tournament_id: playerInfo.tournament_id,
    player_id: playerInfo.player_id,
    type: type,
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      data: getPrizeDropSummaryRequest,
      url: `${USER_SERVICE_URL}/${gameName}/prize-drop-summary`,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
