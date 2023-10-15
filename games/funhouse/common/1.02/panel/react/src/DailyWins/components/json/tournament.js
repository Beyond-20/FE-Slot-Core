export const tournament = {
  brief:
    "A Weekly cashprize giveaway for the Top 60 players with the highest combined scores collected from both Funhouse Table Games and a selected Slot Game for the week.",
  ruleList: ["Grand prize of RM3,000 in the Weekly Funhouse Tournament"],
  prizeGiveway: {
    name: "Prize Giveaway",
    tableHead: { 0: "Leaderboard Position", 1: "Cashprize (MYR)" },
    tableData: [
      { 0: "1", 1: 3000 },
      { 0: "2", 1: 2000 },
      { 0: "3", 1: 1000 },
      { 0: "4 to 10", 1: 300 },
      { 0: "10 to 30", 1: 150 },
      { 0: "30 to 60", 1: 80 },
    ],
  },

  scoringExample: {
    name: "Table Game Scoring Example",
    tableHead: {
      0: "Bet (MYR)",
      1: "Winnings (MYR)",
      2: "Winnings (USD)*",
      3: "Score Rate",
      4: "Score Earned",
    },
    tableData: [
      {
        0: "RM(100)",
        1: "RM(800)",
        2: "$181.81",
        3: "[0.5]x",
        4: "[800]",
      },
    ],
    note: "The Selected Slot Game of the week will earn you [1.0]x score points based on your winnings in USD.",
  },
};
