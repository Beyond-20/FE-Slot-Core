export default function Button(props) {
  var title = props.title;

  return React.createElement(
    "div",
    {
      onClick: function onClick() {
        return window.dailyWinsCloseBtnClicked();
      },
      className: "dw-button-container"
    },
    title
  );
}