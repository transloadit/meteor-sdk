Transloadit Meteor API bindings
===============================

This smart package exposes the official Transloadit Meteor API from the node.js npm package: https://github.com/transloadit/node-sdk/

This Meteor package is licensed under the MIT license.

This uses version 1.2.0 of the Transloadit node.js package and the new meteor 0.6.5.1+ npm bindings.

#### To Install

    meteor add danziger:transloadit
    
To get started, replace YOUR_AUTH_KEY, YOUR_AUTH_SECRET, and YOUR_TEMPLATE_ID with your Twilio credentials and use some of the example below:

```javascript
var transloadit       = new TransloaditClient({
  authKey    : 'YOUR_AUTH_KEY',
  authSecret : 'YOUR_AUTH_SECRET'
});

transloadit.addFile('file1', filePath);
var assemblyOptions = {
  params: {
    template_id: 'YOUR_TEMPLATE_ID'
  }
};
transloadit.createAssembly(assemblyOptions, function(err, result) {
  if (err) {
    throw new Error(err);
  }

  console.log('success');

  var assemblyId = result.assembly_id;
  console.log({
    assemblyId: assemblyId
  });

  transloadit.deleteAssembly(assemblyId, function(err) {
    console.log('deleted');
  });
});
```

## API

Please see the node-sdk README for public methods on the `TransloaditClient` object and their descriptions.