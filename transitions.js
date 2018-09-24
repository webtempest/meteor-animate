/**
 * Created by matt_000 on 24/09/2018.
 */
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const ENDTRANSITION = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionEnd msTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd animationEnd msAnimationEnd';

class Transitions {
  constructor(options) {
    const defaults = {
      onScreenClass: '',
      offScreenClass: '',
      hiddenClass: 'out',
      animateClass: "animated"
    };

    this.opt = _.defaults(options, defaults);
    this.opt.insertTimeout = this.getInsertTimeout();
    this.opt.removeTimeout = this.getRemoveTimeout();
    this.opt.parentNode._uihooks = this.createHooks();

    const self = this;
    this.setupStyles();

    // This for when the page first loads
    _.each($(this.opt.parentNode).find('.animated.out'), item => self.insertElement(item, null));
  }

  setupStyles() {
    if (this.opt.inDuration || this.opt.outDuration) {

      // For durations to be changed we need to inject CSS
      const randName = this.opt.onScreenClass + _.random(0, 1000);

      const styleInjection = $("<style></style>");
      $(this.opt.parentNode).addClass(randName);

      if (this.opt.inDuration) {
        styleInjection.append(`.${randName} .animated.${this.opt.onScreenClass} {-webkit-animation-duration: ${this.opt.inDuration}ms;animation-duration: ${this.opt.inDuration}ms;}`);
      }

      if (this.opt.outDuration) {
        styleInjection.append(`.${randName} .animated.${this.opt.offScreenClass} {-webkit-animation-duration: ${this.opt.outDuration}ms;animation-duration: ${this.opt.outDuration}ms;}`);
      }

      return $(this.opt.parentNode).append(styleInjection);
    }
  }

  getInsertTimeout() {
    if (this.opt.inDuration) { return parseInt(this.opt.inDuration); }
    switch (this.opt.onScreenClass) {
      case 'hinge': return 2000;
      case 'bounceIn': return 750;
      default: return 1000;
    }
  }

  getRemoveTimeout() {
    if (this.opt.outDuration) { return parseInt(this.opt.outDuration); }
    switch (this.opt.offScreenClass) {
      case 'hinge': return 2000;
      case 'bounceOut': return 750;
      case 'flipOutX': return 750;
      case 'flipOutY': return 750;
      default: return 1000;
    }
  }

  insertElement(node, next) {
    const self = this;
    const $node = $(node);
    const $parent = $(self.opt.parentNode);
    $node.addClass(`${self.opt.animateClass} ${self.opt.hiddenClass}`);
    $node.attr('hidden', true);
    $(next).before($node);

    const finish = function(e) {
      $node.removeClass(self.opt.onScreenClass);
      return node.setAttribute('inserting', false);
    };

    const insert = function() {
      $node.width();
      $node.attr('hidden', false);
      $node.removeClass(self.opt.hiddenClass);
      $node.addClass(self.opt.onScreenClass);
      return $node.one(ENDTRANSITION, finish);
    };

    if (self.removing) {
      return Meteor.setTimeout(insert, self.opt.removeTimeout);
    } else {
      return insert();
    }
  }

  removeElement(node) {
    const $node = $(node);

    const self = this;
    $node.addClass(self.opt.animateClass);
    const remove = function(e) {
      self.removing = false;
      return $node.remove();
    };

    if (self.opt.offScreenClass) {
      $node.addClass(self.opt.offScreenClass);
      self.removing = true;
      return $node.one(ENDTRANSITION, remove);
    } else {
      return remove();
    }
  }

  createHooks() {
    return {
      opt: this.opt,
      insertElement: this.insertElement,
      removeElement: this.removeElement
    };
  }
}


Template.transition.onRendered(function() {
  let parentNode, transitions;
  const transitionIn = __guard__(__guard__(this.data != null ? this.data.in : undefined, x1 => x1.match(/^(.*)\:/)), x => x[1]) || (this.data != null ? this.data.in : undefined);
  const transitionOut = __guard__(__guard__(this.data != null ? this.data.out : undefined, x3 => x3.match(/^(.*)\:/)), x2 => x2[1]) || (this.data != null ? this.data.out : undefined);

  // Duration can be passed in like this:
  // in="bounceIn:500"
  // 500 means 500 milliseconds
  const inDuration = __guard__(__guard__(this.data != null ? this.data.in : undefined, x5 => x5.match(/\:(\d*)/)), x4 => x4[1]);
  const outDuration = __guard__(__guard__(this.data != null ? this.data.out : undefined, x7 => x7.match(/\:(\d*)/)), x6 => x6[1]);

  // If "wrap=true" is provided, then div.transition-wrapper will
  // be the parent. Else just whatever is the parent above this template.
  if (this.$('>').first().hasClass('transition-wrapper')) {
    parentNode = this.$('>').first()[0];
  } else {
    parentNode = this.firstNode != null ? this.firstNode.parentNode : undefined;
  }

  const params = {
    onScreenClass: transitionIn,
    offScreenClass: transitionOut,
    inDuration,
    outDuration,
    parentNode
  };

  return transitions = new Transitions(params);
});

Template.transition.onDestroyed(function() {
  return __guard__(this.firstNode != null ? this.firstNode.parentNode : undefined, x => x._uihooks = null);
});

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}
