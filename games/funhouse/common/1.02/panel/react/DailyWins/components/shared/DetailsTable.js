import { parseNumber } from "../../../TournamentModal/components/common/CommonFunction.js";

export default function DetailsTable(props) {
  var title = props.title,
      data = props.data,
      rowData = props.rowData,
      width = props.width;

  return React.createElement(
    "div",
    { id: "dw-table-main-container", style: { width: width || "60%" } },
    React.createElement(
      "div",
      { className: "dw-table-name" },
      data.name || title
    ),
    React.createElement(
      "div",
      { className: "dw-details-table-container" },
      React.createElement(
        "table",
        { className: "dw-details-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { className: "dw-tableRow" },
            Object.values(data.tableHead).map(function (head, index) {
              return React.createElement(
                "th",
                { className: "dw-table-th", key: index },
                head
              );
            })
          )
        ),
        React.createElement(
          "tbody",
          null,
          rowData ? rowData.map(function (item, index) {
            return title === "Prize Giveaway" ? React.createElement(
              "tr",
              { className: "dw-tableRow", key: index },
              React.createElement(
                "td",
                { className: "dw-table-td" },
                item && item.from_position === item.to_position ? item.from_position : item.from_position + " to " + item.to_position
              ),
              React.createElement(
                "td",
                { className: "dw-table-td" },
                parseNumber(item.cash)
              )
            ) : React.createElement(
              "tr",
              { className: "dw-tableRow", key: index },
              Object.values(item).map(function (tdData, tdIndex) {
                return tdIndex !== 0 && (title === "Prize Allocation" || title === "Scatter Count") && React.createElement(
                  "td",
                  { className: "dw-table-td", key: tdIndex },
                  tdData
                );
              })
            );
          }) : data.tableData.map(function (item, index) {
            return React.createElement(
              "tr",
              { className: "dw-tableRow", key: index },
              Object.values(item).map(function (tdData, tdIndex) {
                return React.createElement(
                  "td",
                  { className: "dw-table-td", key: tdIndex },
                  tdData
                );
              })
            );
          })
        )
      )
    ),
    data.note && React.createElement(
      "p",
      { className: "dw-data-note" },
      data.note
    )
  );
}