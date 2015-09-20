Template.animate.onRendered ->
  self = @
  $node = @$('>').first()
  animation = self.data?.type || 'bounce'
  delay = self.data?.delay && parseInt(self.data.delay) || 200

  animate = ->
    $node.addClass("animated #{animation}")

  if delay
    Meteor.setTimeout animate, delay
  else
    animate()
