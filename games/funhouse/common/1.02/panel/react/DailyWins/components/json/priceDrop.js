export var prizeDrop = {
  brief: "Increase your chances for Bonus rewards the more you play. Earn yourself these weekly prize drops to boost your winnings on top of your Multipliers and Scatters.",
  ruleList: ["Stand a chance to win an extra RM3,000, when you hit a X1000 multiplier.", "RM11,500 weekly in prize money for players who land multipliers.", "Land a Scatter of 4 or more on your spin to win special scatter rewards. Upto RM4,500 is up for grabs every week."],
  prizeAllocation: {
    name: "Prize Allocation",
    tableHead: { 0: "Multiplier", 1: "Reward (MYR)", 2: "Reward per week" },
    tableData: [{
      0: "Multiplier",
      1: "Reward (MYR)",
      2: "Rewarded per week"
    }, {
      0: "x1000",
      1: "3000",
      2: "1"
    }, {
      0: "x500",
      1: "1000",
      2: "2"
    }, {
      0: "x200",
      1: "500",
      2: "3"
    }, {
      0: "x100",
      1: "250",
      2: "4"
    }, {
      0: "x50",
      1: "100",
      2: "10"
    }, {
      0: "x20",
      1: "60",
      2: "15"
    }, {
      0: "x10",
      1: "40",
      2: "50"
    }]
  },
  scatterPrizeAllocation: {
    name: "Scatter Count",
    tableHead: { 0: "Scatter Count", 1: "Reward (MYR)", 2: "Reward per week" },
    tableData: [{ 0: "4 Scatters", 1: "100", 2: 20 }, { 0: "5 Scatters", 1: "250", 2: 10 }]
  }
};