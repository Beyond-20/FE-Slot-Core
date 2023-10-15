export default function Spacer(props) {
  let { height } = props;
  return (
    <div
      style={{
        height: height || 0,
      }}
    ></div>
  );
}
