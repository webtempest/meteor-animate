Package.describe({
  name: 'tempest:animations',
  version: '0.0.1',
  summary: 'Animate stuff in Meteor',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('coffee:script');
  api.use('stylus');
  api.use('templating');
  api.addFiles([
    'transition.html',
    'transitions.coffee',
    'animate.html',
    'animate.coffee',
    'animate.css'
  ], 'client');
});
