
class AnimationManager {
    constructor() {
        this.speed = 1;
        this.animationMap = [];
        this.animationSequence = {};
        this.callbackSequence = {};
    }

    animateTween (element, duration, props, kill = true) {
        if (kill) {
            TweenMax.killTweensOf(element);
        }
        return gsap.to(element, duration / this.speed, props);
    }
    animateFromTo (element, duration, props1, props2, kill = true) {
        if (kill) {
            TweenMax.killTweensOf(element);
        }
        return gsap.fromTo(element, duration / this.speed, props1, props2);
    }
    animateBezier (element, duration, props, bezier) {
        let values = [];
        let dist = Math.abs(props.y - element.y) / bezier.curves;
        let currentDist = dist;
        for (let k = 0; k < bezier.curves; k++) {
            if (k % 2 == 0) {
                values.push({x : element.x - bezier.width, y : element.y - currentDist})
            } else {
                values.push({x : element.x + bezier.width, y : element.y - currentDist})
            }
            currentDist += dist;
        }
        values.push({x : props.x ? props.x : element.x, y : props.y ? props.y : element.y});
        props.bezier = {curviness:2, type : "thru", values:values};
        gsap.to(element, duration / this.speed, props);
    }
    animateSpine (element, state, loop, speed = 1, trackIndex = 0, delay = 0) {
        element.state.timeScale = speed * this.speed;
        if (delay > 0) {
            setTimeout(this.animateSpineWithDelay.bind(this, element, state, loop, trackIndex), delay);
        } else {
            element.playAnimation(state, loop, trackIndex);
        }

    }
    animateSpineWithDelay (element, state, loop, trackIndex = 0) {
        element.state.setAnimation(trackIndex, state, loop);
    }
    destroyTimeline (id) {
        this.animationMap[id] = null;
    }
    addSpineToTimeline (id, elements, props, delays) {
        if (this.animationMap[id] == null) {
            this.animationMap[id] = [];
        }
        this.animationMap[id].push({elements : elements, props : props, delays : delays});
    }
    playTimeline (id, callback) {
        this.callbackSequence[id] = callback;
        this.animationSequence[id] = 0;
        this.playNextTimelineAnim(id);

    }
    playNextTimelineAnim (id) {
        this.currentId = id;
        let delay = 0;
        let animlen = this.animationMap[id].length;
        for (let p = 0; p < animlen; p++) {
            let animObj = this.animationMap[id][p];
            if (Array.isArray(animObj.elements)) {
                let len = animObj.elements.length;
                for (let k = 0; k < len; k++) {
                    delay += animObj.delays[k] / this.speed;
                    this.animateSpine(animObj.elements[k], animObj.props[k].state, animObj.props[k].loop, animObj.props[k].speed, animObj.props[k].trackIndex, delay);
                }
            } else {
                delay += animObj.delays / this.speed;
                this.animateSpine(animObj.elements, animObj.props.state, animObj.props.loop, animObj.props.speed, animObj.props.trackIndex, delay);
            }
        }
        setTimeout(this.callbackSequence[id], delay);
    }

    killTweensOf (element) {
        gsap.killTweensOf(element);
    }


}

export const animationManager = new AnimationManager();
