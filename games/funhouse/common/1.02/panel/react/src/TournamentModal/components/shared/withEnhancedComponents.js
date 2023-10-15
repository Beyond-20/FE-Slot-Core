function UpdatedComponent(OriginalComponent) {
  class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      };
      window.addEventListener("resize", this.isMobile);
    }

    isMobile = () => {
      this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    };

    render() {
      let { windowWidth, windowHeight } = this.state;
      return <OriginalComponent size={{ windowWidth, windowHeight }} />;
    }
  }
  return EnhancedComponent;
}

export default UpdatedComponent;
