export default function Button(props) {
  let { title } = props;
  return (
    <div
      onClick={() => window.dailyWinsCloseBtnClicked()}
      className="dw-button-container"
    >
      {title}
    </div>
  );
}
