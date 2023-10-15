import { parseNumber } from "../../../TournamentModal/components/common/CommonFunction.js";

export default function DetailsTable(props) {
  let { title, data, rowData, width } = props;
  return (
    <div id="dw-table-main-container" style={{ width: width || "60%" }}>
      <div className="dw-table-name">{data.name || title}</div>
      <div className="dw-details-table-container">
        <table className="dw-details-table">
          <thead>
            <tr className="dw-tableRow">
              {Object.values(data.tableHead).map((head, index) => (
                <th className="dw-table-th" key={index}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rowData
              ? rowData.map((item, index) =>
                  title === "Prize Giveaway" ? (
                    <tr className="dw-tableRow" key={index}>
                      <td className="dw-table-td">
                        {item && item.from_position === item.to_position
                          ? item.from_position
                          : item.from_position + " to " + item.to_position}
                      </td>
                      <td className="dw-table-td">{parseNumber(item.cash)}</td>
                    </tr>
                  ) : (
                    <tr className="dw-tableRow" key={index}>
                      {Object.values(item).map(
                        (tdData, tdIndex) =>
                          tdIndex !== 0 &&
                          (title === "Prize Allocation" || title === "Scatter Count") && (
                            <td className="dw-table-td" key={tdIndex}>
                              {tdData}
                            </td>
                          )
                      )}
                    </tr>
                  )
                )
              : data.tableData.map((item, index) => (
                  <tr className="dw-tableRow" key={index}>
                    {Object.values(item).map((tdData, tdIndex) => (
                      <td className="dw-table-td" key={tdIndex}>
                        {tdData}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {data.note && <p className="dw-data-note">{data.note}</p>}
    </div>
  );
}
