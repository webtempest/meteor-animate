Template.animate.onRendered ->
  self = @
  animation = self.data?.type || 'bounce'
  delay = self.data?.delay && parseInt(self.data.delay) || 200

  animate = ->
    $(self.firstNode.nextSibling).addClass("animated #{animation}")

  if delay
    Meteor.setTimeout animate, delay
  else
    animate()
