Package.describe({
  name: 'danziger:transloadit',
  summary: 'Transloadit API Wrapper for Meteor',
  version: '0.1.2',
  git: 'https://github.com/transloadit/meteor-sdk.git'
});

Npm.depends({ "transloadit": "1.2.1" });

Package.onUse(function(api) {
  if (api.export) api.export('TransloaditClient', 'server');
  api.addFiles('transloadit_npm.js', 'server');
});

Package.onTest(function(api) {
  api.use(["danziger:transloadit", "tinytest", "test-helpers"]);
  api.addFiles('transloadit_tests.js', 'server');
});