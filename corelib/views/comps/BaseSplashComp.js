import {SliderComp} from "./SliderComp";
import { CoreLib } from '../../core/CoreLib'
import { LibView } from '../../pixiwrapper/LibView'
import { LibContainer } from '../../pixiwrapper/LibContainer'

export class BaseSplashComp extends LibContainer {
    constructor(config) {
        super(config);

        this.pagesComp = this.elementsList["pagesComp"];
        this.pagesComp.on("PT_PAGE_CHANGED", this.onPTPageChanged.bind(this));
        this.maskRect = this.elementsList["maskRect"];
        this.gamelogo = this.elementsList["gamelogo"]

        // this.playBtn = this.elementsList["playBtn"];
        // this.playBtn.setEnabled(true);
        // this.playBtn.addInteraction(this.onPlayClicked.bind(this));



    }
    onPTPageChanged (index) {
        this.pageIndicator.showSelected(index);
    }

    onPlayClicked () {
        this.emit("CLOSE_CLICKED");
    }

    onNextClick () {
        this.pagesComp.navigateNext(1);
    }
    onPrevClick () {
        this.pagesComp.navigateNext(-1);
    }

    resizeViewComponents () {
        super.resizeViewComponents();

    }

}
