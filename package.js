Package.describe({
  name: 'webtempest:animate',
  version: '0.2.0',
  summary: 'Easily perform CSS animations and transitions in Meteor',
  git: 'https://github.com/webtempest/meteor-animate.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('templating');
  api.addFiles([
    'transition.html',
    'transitions.js',
    'animate.html',
    'animate.js',
    'animate.css'
  ], 'client');
});
