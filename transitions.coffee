ENDTRANSITION = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionEnd msTransitionEnd animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd animationEnd msAnimationEnd'

class Transitions
  constructor: (options) ->
    defaults =
      onScreenClass: ''
      offScreenClass: ''
      hiddenClass: 'out'
      animateClass: "animated"
      
    @opt = _.defaults options, defaults
    @opt.insertTimeout = @getInsertTimeout()
    @opt.removeTimeout = @getRemoveTimeout()

  getInsertTimeout: ->
    switch @opt.onScreenClass
      when 'hinge' then 2000
      when 'bounceIn' then 750
      else 1000

  getRemoveTimeout: ->
    switch @opt.offScreenClass
      when 'hinge' then 2000
      when 'bounceOut' then 750
      when 'flipOutX' then 750
      when 'flipOutY' then 750
      else 1000

  insertElement: (node, next, firstTime = false) ->
    self = @
    $node = $(node)
    $parent = $(self.opt.parentNode)
    $node.addClass("#{self.opt.animateClass} #{self.opt.hiddenClass}")
    $(self.opt.parentNode).append($node)

    finish = (e) ->
      $node.removeClass(self.opt.onScreenClass)

    insert = ->
      $node.width()
      $node.removeClass(self.opt.hiddenClass)
      $node.addClass(self.opt.onScreenClass)

      $node.one ENDTRANSITION, finish


    if self.transitioning
      console.log 'trans'
      Meteor.setTimeout insert, self.opt.removeTimeout
    else
      insert()
  
  removeElement: (node) ->
    $node = $(node)

    self = @
    $node.addClass(self.opt.animateClass)
    remove = (e) ->
      self.transitioning = false
      $node.remove()

    if self.opt.offScreenClass
      $node.addClass(self.opt.offScreenClass)
      self.transitioning = true
      $node.one ENDTRANSITION, remove
    else
      remove()

  createHooks: ->
    transitioning: false
    opt: @opt
    insertElement: @insertElement
    removeElement: @removeElement


Template.transition.onRendered ->
  transitionIn = @data?.in
  transitionOut = @data?.out

  params =
    onScreenClass: transitionIn
    offScreenClass: transitionOut
    parentNode: @firstNode?.parentNode

  transitions = new Transitions(params)

  @firstNode?.parentNode?._uihooks = transitions.createHooks()

  _.each @findAll('.animated'), (item) ->
    transitions.insertElement(item, null, true)

Template.transition.onDestroyed ->
  @firstNode?.parentNode?._uihooks = null
