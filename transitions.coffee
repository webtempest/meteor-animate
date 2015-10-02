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
    @opt.parentNode._uihooks = @createHooks()

    self = @
    @setupStyles()

    # This for when the page first loads
    _.each $(@opt.parentNode).find('.animated.out'), (item) ->
      self.insertElement(item, null, true)

  setupStyles: ->
    if @opt.inDuration or @opt.outDuration

      # For durations to be changed we need to inject CSS
      randName = @opt.onScreenClass + _.random(0, 1000)

      styleInjection = $("<style></style>")
      $(@opt.parentNode).addClass(randName)

      if @opt.inDuration
        styleInjection.append(".#{randName} .animated.#{@opt.onScreenClass} {-webkit-animation-duration: #{@opt.inDuration}ms;animation-duration: #{@opt.inDuration}ms;}")

      if @opt.outDuration
        styleInjection.append(".#{randName} .animated.#{@opt.offScreenClass} {-webkit-animation-duration: #{@opt.outDuration}ms;animation-duration: #{@opt.outDuration}ms;}")

      $(@opt.parentNode).append(styleInjection)

  getInsertTimeout: ->
    return parseInt(@opt.inDuration) if @opt.inDuration
    switch @opt.onScreenClass
      when 'hinge' then 2000
      when 'bounceIn' then 750
      else 1000

  getRemoveTimeout: ->
    return parseInt(@opt.outDuration) if @opt.outDuration
    switch @opt.offScreenClass
      when 'hinge' then 2000
      when 'bounceOut' then 750
      when 'flipOutX' then 750
      when 'flipOutY' then 750
      else 1000

  insertElement: (node, next, firstTime = false) ->
    node.setAttribute('inserting', true)
    self = @
    $node = $(node)
    $parent = $(self.opt.parentNode)
    $node.addClass("#{self.opt.animateClass} #{self.opt.hiddenClass}")
    $node.attr('hidden', true)
    $(next).before($node)

    finish = (e) ->
      $node.removeClass(self.opt.onScreenClass)
      node.setAttribute('inserting', false)

    insert = ->
      $node.width()
      $node.attr('hidden', false)
      $node.removeClass(self.opt.hiddenClass)
      $node.addClass(self.opt.onScreenClass)
      $node.one ENDTRANSITION, finish

    if node.getAttribute('removing')
      $node.one ENDTRANSITION, insert
    else
      insert()
  
  removeElement: (node) ->
    $node = $(node)

    self = @
    $node.addClass(self.opt.animateClass)
    remove = (e) ->
      node.setAttribute('removing', false)
      $node.remove()

    if self.opt.offScreenClass  and !node.getAttribute('inserting')
      $node.addClass(self.opt.offScreenClass)
      node.setAttribute('removing', true)
      $node.one ENDTRANSITION, remove
    else
      remove()

  createHooks: ->
    opt: @opt
    insertElement: @insertElement
    removeElement: @removeElement


Template.transition.onRendered ->
  transitionIn = @data?.in?.match(/^(.*)\:/)?[1] || @data?.in
  transitionOut = @data?.out?.match(/^(.*)\:/)?[1] || @data?.out

  # Duration can be passed in like this:
  # in="bounceIn:500"
  # 500 means 500 milliseconds
  inDuration = @data?.in?.match(/\:(\d*)/)?[1]
  outDuration = @data?.out?.match(/\:(\d*)/)?[1]

  # If "wrap=true" is provided, then div.transition-wrapper will
  # be the parent. Else just whatever is the parent above this template.
  if @$('>').first().hasClass('transition-wrapper')
    parentNode = @$('>').first()[0]
  else
    parentNode = @firstNode?.parentNode

  params =
    onScreenClass: transitionIn
    offScreenClass: transitionOut
    inDuration: inDuration
    outDuration: outDuration
    parentNode: parentNode

  transitions = new Transitions(params)

Template.transition.onDestroyed ->
  @firstNode?.parentNode?._uihooks = null
