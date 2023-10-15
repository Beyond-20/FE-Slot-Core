import { LibContainer } from "../../pixiwrapper/LibContainer";
import { CoreLib } from "../../core/CoreLib";
import {
  Emitter,
  upgradeConfig,
} from "../../../games/funhouse/jslibs/1.00/pixi/particle-emitter.js";

export class LibParticleComp extends LibContainer {
  constructor(particle, art = null) {
    super();
    this.container = CoreLib.UIUtil.getContainer();
    this.addChild(this.container);


    let pConfig = upgradeConfig(particle, art);
    this.emitter = new Emitter(this.container, pConfig);

    this.elapsed = Date.now();
    this.emitter.emit = false;
    this.updateFrame();

    // console.log('upgradeConfig(particle.config, particle.config.texture)', upgradeConfig(particle.config, particle.config.texture))
  }
  updatePosition(obj) {
    this.emitter.updateOwnerPos(obj.x, obj.y);
  }

  stopAnimation() {
    this.emitter.emit = false;
  }
  playAnimation() {
    this.emitter.emit = true;
  }

  updateFrame() {
    if (this.emitter) {
      requestAnimationFrame(this.updateFrame.bind(this));
      var now = Date.now();
      // The emitter requires the elapsed
      // number of seconds since the last update
      this.emitter.update((now - this.elapsed) * 0.001);
      this.elapsed = now;
    }
  }

  destroyParticle() {
    if (this.emitter) {
      this.emitter.emit = false;
      this.emitter.destroy();
      this.emitter = null;
      window.destroyEmitter = null;
    }
  }
  stopEmitter() {
    this.emitter.emit = false;
  }
}
