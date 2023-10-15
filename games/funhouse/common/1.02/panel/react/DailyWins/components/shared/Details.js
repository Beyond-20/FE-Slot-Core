export default function Details(props) {
  var title = props.title,
      content = props.content,
      isList = props.isList,
      contentList = props.contentList;

  return React.createElement(
    "div",
    { className: "dw-details-container" },
    React.createElement(
      "div",
      { className: "dw-details-title" },
      title
    ),
    isList ? React.createElement(
      "ul",
      null,
      contentList.map(function (listItem, index) {
        return React.createElement(
          "li",
          { className: "dw-lis", key: index },
          listItem
        );
      })
    ) : React.createElement(
      "div",
      { className: "dw-details-content" },
      content
    )
  );
}