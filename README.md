# Meteor Animate

Transition blaze templates. Animate any element. Imports [Animate.css](https://github.com/daneden/animate.css) under the hood (~50kb minified sorry).

[Check out the animations here!](https://daneden.github.io/animate.css/)

## Usage

### Animations

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

Note that the transition rules live in the parent element of wherever `{{#transition}}` sits. So in the above case the 'zoomIn' and 'bounceOut' rules will live in the top `<ul>` element, which kind of manages it's children. Every time a new `<li>` is inserted it asks the parent `<ul>` what animation to use - and uses it.

The class name `animated out` on the `<li>` is optional, but without it the `in` animation won't work when the page first loads.

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
