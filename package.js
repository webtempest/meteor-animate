Package.describe({
  name: 'webtempest:animate',
  version: '0.1.1',
  summary: 'Animate stuff in Meteor',
  git: 'https://github.com/webtempest/meteor-animate.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('coffeescript');
  api.use('templating');
  api.addFiles([
    'transition.html',
    'transitions.coffee',
    'animate.html',
    'animate.coffee',
    'animate.css'
  ], 'client');
});
