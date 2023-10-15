const imagePath = "../common/1.02/images/dailywins";

const Header = ({ changeStateClose }) => {
  const closeBtn = () => {
    changeStateClose({ closedModal: true });
  };
  return (
    <div className="dw-header-container">
      {/* {window.innerWidth < 768 ? (
        <div className="dw-backBtn-container" onClick={() => backBtn()}>
          <img className="dw-backBtn" src={imagePath + "/Back.png"} />
          <p className="dw-backBtn-text">back</p>
        </div>
      ) : (
        <div></div>
      )} */}
      <div></div>
      <div className="dw-header-title">Daily Wins</div>

      <img
        onClick={closeBtn}
        className="dw-closeBtn"
        src={imagePath + "/Close_White.png"}
        alt="closeBtn"
      />
    </div>
  );
};

export default Header;
