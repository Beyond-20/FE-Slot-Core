export default function Spacer(props) {
  var height = props.height;

  return React.createElement("div", {
    style: {
      height: height || 0
    }
  });
}