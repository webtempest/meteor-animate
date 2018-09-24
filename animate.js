Template.animate.onRendered(function() {
  const self = this;
  const $node = this.$('>').first();
  const animation = (self.data != null ? self.data.type : undefined) || 'bounce';
  const delay = ((self.data != null ? self.data.delay : undefined) && parseInt(self.data.delay)) || 200;

  const animate = () => $node.addClass(`animated ${animation}`);

  if (delay) {
    return Meteor.setTimeout(animate, delay);
  } else {
    return animate();
  }
});
