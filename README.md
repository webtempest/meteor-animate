# Meteor Animate

Easily perform CSS3 animations and transitions in Meteor. [Video tutorial here](http://nebula.blue/video/meteor-animate-package).

Imports [Animate.css](https://github.com/daneden/animate.css) under the hood.

[Demo](http://animate-demo.meteor.com/one) ([Source with Iron Router](https://github.com/webtempest/meteor-animate-demo-iron-router), [Source with Flow Router](https://github.com/webtempest/meteor-animate-demo-flow-router))

[See all possible animations here](https://daneden.github.io/animate.css/)

## Usage

`meteor add webtempest:animate`

You have two types of animations:

1. Static Animations - when you want to make a single static element bounce or something
2. Transitions - to make elements disappear/appear in a fancy way (slide in, fade in, etc)

### Static Animations

```html
{{#animate type="rubberBand" delay="200"}}
  <h1 class="logo">Awesome Site</h1>
{{/animate}}
```

`delay` defaults to `200`

`type` possibilities:

- `bounce`
- `flash`
- `pulse`
- `rubberBand`
- `shake`
- `swing`
- `tada`
- `wobble`
- `jello`

### Transitions

Use transitions for elements that hide/appear.

```html
<ul>
  {{#transition in="zoomIn" out="bounceOut"}}
    {{#each items}}
      <li class="animated out">{{name}}</li>
    {{/each}}
  {{/transition}}
</ul>
```



The class name `animated out` on the `<li>` is optional, but without it the `in` animation won't work when the page first loads.

Note that the transition rules live in the parent element of wherever `{{#transition}}` sits. So in the above case the 'zoomIn' and 'bounceOut' rules will live in the top `<ul>` element, which manages it's children. Every time a new `<li>` is inserted it asks the parent `<ul>` what animation to use - and uses it.

**Important!** This means if you have something like this:

```html
<div>
  <ul>
    <li><a href="/one">View 1</a></li>
    <li><a href="/two">View 2</a></li>
  </ul>

  {{#transition in="bounceIn" out="bounceOut"}}
    {{> yield}}
  {{/transition}}
</div>
```

The parent of `{{#transition}}` is the `<div>` at the top. But the `<div>` is ALSO the parent of the `<ul>` element. This is bad because the `<ul>` element will now transition too! To prevent this we can do two things.

Option 1: Wrap `{{#transition}}` in an element to give it a parent:

```html
<div>
  <ul>
    <li><a href="/one">View 1</a></li>
    <li><a href="/two">View 2</a></li>
  </ul>
  <div>
    {{#transition in="bounceIn" out="bounceOut"}}
      {{> yield}}
    {{/transition}}
  </div>
</div>
```

Option 2: Use the `wrap` option for `{{#transition}}`, which I programmed to do the exact same as Option 1, but keeps your code cleaner:

```html
<div>
  <ul>
    <li><a href="/one">View 1</a></li>
    <li><a href="/two">View 2</a></li>
  </ul>

  {{#transition wrap="true" in="bounceIn" out="bounceOut"}}
    {{> yield}}
  {{/transition}}
</div>
```

#### Template level subscriptions

If you are using template level subscriptions like this:

```js
Template.home.onCreated(function(){
  this.subscribe('items');
});
```

Then make sure you wrap your animated database items like this:

```html
<ul>
  {{#if Template.subscriptionsReady}}
    {{#transition in="zoomIn" out="bounceOut"}}
      {{#each items}}
        <li class="animated out">{{name}}</li>
      {{/each}}
    {{/transition}}
  {{/if}}
</ul>
```

Otherwise you get some weird double rendering issues.

#### Transition durations

Here are the duration defaults (animate.css set these, not me). Everything is 1000ms, except:

- hinge: 2000ms
- bounceIn, bounceOut: 750ms
- flipOutX, flipOutY: 750ms

To set your own duration, follow the pattern: `transition:duration`. Eg:

```html
<ul>
  {{#transition in="zoomIn:500" out="bounceOut:2000"}}
    {{#each items}}
      <li class="animated out">{{name}}</li>
    {{/each}}
  {{/transition}}
</ul>
```

This works by creating a custom CSS class and injecting a new `<style>` element into the page within the parent element. Keep in mind IE 9 and below only allows up to 32 stylesheets. Alternatively you can add your own custom CSS class:

```html
<ul>
  {{#transition in="zoomIn" out="bounceOut"}}
    {{#each items}}
      <li class="animated your-custom-class out">{{name}}</li>
    {{/each}}
  {{/transition}}
</ul>
```

```css
animated.your-custom-class.zoomIn {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}

animated.your-custom-class.bounceOut {
  -webkit-animation-duration: 2000ms;
  animation-duration: 2000ms;
}
```

### Transition possibilities

`in` possibilities:

- `bounceIn`
- `bounceInDown`
- `bounceInLeft`
- `bounceInRight`
- `bounceInUp`
- `fadeIn`
- `fadeInDown`
- `fadeInDownBig`
- `fadeInLeft`
- `fadeInLeftBig`
- `fadeInRight`
- `fadeInRightBig`
- `fadeInUp`
- `fadeInUpBig`
- `flipInX`
- `flipInY`
- `lightSpeedIn`
- `rotateIn`
- `rotateInDownLeft`
- `rotateInDownRight`
- `rotateInUpLeft`
- `rotateInUpRight`
- `rollIn`
- `zoomIn`
- `zoomInDown`
- `zoomInLeft`
- `zoomInRight`
- `zoomInUp`
- `slideInDown`
- `slideInLeft`
- `slideInRight`
- `slideInUp`

`out` possibilities:

- `bounceOut`
- `bounceOutDown`
- `bounceOutLeft`
- `bounceOutRight`
- `bounceOutUp`
- `fadeOut`
- `fadeOutDown`
- `fadeOutDownBig`
- `fadeOutLeft`
- `fadeOutLeftBig`
- `fadeOutRight`
- `fadeOutRightBig`
- `fadeOutUp`
- `fadeOutUpBig`
- `flipOutX`
- `flipOutY`
- `lightSpeedOut`
- `rotateOut`
- `rotateOutDownLeft`
- `rotateOutDownRight`
- `rotateOutUpLeft`
- `rotateOutUpRight`
- `hinge`
- `rollOut`
- `zoomOut`
- `zoomOutDown`
- `zoomOutLeft`
- `zoomOutRight`
- `zoomOutUp`
- `slideOutDown`
- `slideOutLeft`
- `slideOutRight`
- `slideOutUp`
