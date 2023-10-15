export default function Details(props) {
  let { title, content, isList, contentList } = props;
  return (
    <div className="dw-details-container">
      <div className="dw-details-title">{title}</div>

      {isList ? (
        <ul>
          {contentList.map((listItem, index) => (
            <li className="dw-lis" key={index}>
              {listItem}
            </li>
          ))}
        </ul>
      ) : (
        <div className="dw-details-content">{content}</div>
      )}
    </div>
  );
}
