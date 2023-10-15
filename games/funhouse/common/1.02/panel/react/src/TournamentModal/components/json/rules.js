import { formatDate, getDateAndTime24H } from "../common/CommonFunction.js";

export const rules = {
  tournament: {
    title: "Funhouse Tournament",
    brief:
      "Stand a chance to win a grand prize of RM3000 in the weekly Funhouse Tournament. This is a weekly cash prize giveway for the 60 players with the highest combmined scores collected from both Funhouse Table Games and a Selected Slot Game for the week",
    prizeGiveway: {
      title: "Prize Giveway",
      tableData: [
        { 0: "Leaderboard Position", 1: "Cashprize (MYR)" },
        { 0: "1", 1: 3000 },
        { 0: "2", 1: 2000 },
        { 0: "3", 1: 1000 },
        { 0: "4 to 10", 1: 300 },
        { 0: "10 to 30", 1: 150 },
        { 0: "30 to 60", 1: 80 },
      ],
    },
    scoringStructure: {
      title: "Scoring Structure",
      brief:
        "Funhouse Table Games earn you [0.5]x score points based on your winnings in USD.",
    },
    scoringExample: {
      title: "Table Game Scoring Example",
      tableData: [
        {
          0: "Bet (MYR)",
          1: "Winnings (MYR)",
          2: "Winnings (USD)*",
          3: "Score Rate",
          4: "Score Earned",
        },
        {
          0: "RM(100)",
          1: "RM(800)",
          2: "$181.81",
          3: "[0.5]x",
          4: "[400]",
        },
      ],
      note: "The Selected Slot Game of the week will earn you [1.0]x score points based on your winnings in USD. \n *1 USD = [4.40] MYR",
    },
    tournamentRules: {
      title: "Tournament Rules",
      ruleList: [
        "Min. bet to participate is RM1.50",
        "Cash drop will run weekly from Monday to Sunday between [XXX] to [XXXX]",
        "Qualified Games: [XXXX], [XXXX]",
        "If there are two or more players with identical scores in the tournament leaderboard, the player who scores first will get the higher position on the leaderboard.",
        "The tournament leaderboard is built in the qualifying games and updates in real-time.",
        "Funhouse reserves the right to amend, suspend or cancel the promotion at any time and without prior notice",
      ],
    },
  },

  multiplier: {
    title: "Multiplier Reward",
    brief:
      "Hit a X1000 multiplier and stand a chance to win an extra RM3,000. We’re giving out a total of RM11,500 weekly in prize money as a reward to players who land multipliers.",
    prizeAllocation: {
      title: "Prize Allocation",
      tableData: [
        {
          0: "Multiplier",
          1: "Reward (MYR)",
          2: "Rewarded per week",
        },
        {
          0: "x1000",
          1: "3000",
          2: "1",
        },
        {
          0: "x500",
          1: "1000",
          2: "2",
        },
        {
          0: "x200",
          1: "500",
          2: "3",
        },
        {
          0: "x100",
          1: "250",
          2: "4",
        },
        {
          0: "x50",
          1: "100",
          2: "10",
        },
        {
          0: "x20",
          1: "60",
          2: "15",
        },
        {
          0: "x10",
          1: "40",
          2: "50",
        },
      ],
    },
    multiplierRules: {
      title: "Prize-Drop Rules",
      ruleList: [
        "Min. bet to participate is RM1.50 & above.",
        "There are prizes worth RM11,400 which will be given to Funhouse players per week during the promotion period.",
        "Cash drop will run weekly from Monday to Sunday between [XXX] to [XXXX]",
        "Qualified Games: [XXXX], [XXXX]",
        "Funhouse reserves the right to amend, suspend or cancel the promotion at any time and without prior notice.",
      ],
    },
  },

  scatter: {
    title: "Scatter Reward",
    brief:
      "Land a scatter of 4 or more on your spin to win special scatter rewards. A total of RM4,500 is up for grabs every week.",
    scatterTable: [
      {
        0: "Scatter Count",
        1: "Reward (MYR)",
        2: "Rewarded per week",
      },
      {
        0: "4 Scatter",
        1: "100",
        2: "20",
      },
      {
        0: "5 Scatter",
        1: "250",
        2: "10",
      },
    ],
    scatterRules: {
      title: "Prize-Drop Rules",
      ruleList: [
        "Min. bet to participate is RM1.50 & above.",
        "There are prizes worth RM4,500 which will be given to Funhouse players per week during the promotion period.",
        "Cash drop will run weekly from Monday to Sunday between [XXX] to [XXXX]",
        "Qualified Games: [XXXX], [XXXX]",
        "Funhouse reserves the right to amend, suspend or cancel the promotion at any time and without prior notice.",
      ],
    },
  },
};

export function ruleList(tournamentInfo) {
  const {
    start_date = "",
    end_date = "",
    qualified_games,
  } = tournamentInfo && tournamentInfo.tournament_info;
  return [
    "Min. bet to participate is RM1.50 & above.",
    "There are prizes worth RM4,500 which will be given to Funhouse players per week during the promotion period.",
    `Cash drop will run weekly from Monday to Sunday between ${
      getDateAndTime24H(start_date)|| ""
    } to ${getDateAndTime24H(end_date) || ""}`,
    `Qualified Games: ${qualified_games.map(
      (gameName) => (" " + gameName && gameName.game_name + " ") || " "
    )}`,
    "Funhouse reserves the right to amend, suspend or cancel the promotion at any time and without prior notice.",
  ];
}
