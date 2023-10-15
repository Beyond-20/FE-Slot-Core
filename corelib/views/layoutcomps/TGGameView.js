import {LibView} from "../../pixiwrapper/LibView";
import {CoreLib} from "../../core/CoreLib";

export class TGGameView extends LibView
{
    constructor(config) {
        super(config);
        this.bgComp = this.elementsList["bgComp"];


    }

    onResizeEndEvent() {
        super.onResizeEndEvent();

    }


}
