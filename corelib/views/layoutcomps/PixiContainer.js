import { LibContainer } from '../../pixiwrapper/LibContainer'
import {CoreLib} from "../../core/CoreLib";

export class PixiContainer extends LibContainer
{
  constructor(config, layoutconfig) {
    super(config, layoutconfig);
    this.guideRect = this.elementsList["guideRect"];
  }

  getWidth () {
    if (this.guideRect) {
      return this.guideRect.width * this.scale.x;
    } else {
      return this.width;
    }

  }
  getHeight() {
    if (this.guideRect) {
      return this.guideRect.height * this.scale.y;
    } else {
      return this.height;
    }

  }

}
