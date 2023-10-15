const imagePath = "../common/1.02/images/dailywins";

const DetailsHeader = (props) => {
  let { headerName, changeState } = props;
  const backBtn = () => {
    changeState({
      isClicked: false,
      selectedRoute: "",
    });
  };
  const closeBtn = () => {
    window.dailyWinsCloseBtnClicked();
    changeState({closedModal: true})
  }
  return (
    <div className="dw-header-container">
      <div className="dw-backBtn-container" onClick={() => backBtn()}>
        <img className="dw-backBtn" src={imagePath + "/Back.png"} />
        <p className="dw-backBtn-text">back</p>
      </div>
      <div className="dw-header-title">
        <div>Daily Wins -</div>
        <div>{headerName}</div>
      </div>

      {window.innerWidth < 768 ? (
        <img
          onClick={closeBtn}
          className="dw-closeBtn"
          src={imagePath + "/Close_White.png"}
          alt="closeBtn"
        />
      ) : (
        <div id="dw-header-empty-div"></div>
      )}
    </div>
  );
};

export default DetailsHeader;
