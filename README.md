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

These are the public methods on the `TransloaditClient` object and their descriptions.

### Main

#### constructor([options])

Returns a new instance of the client. The `options` object must at least include `authKey` and `authSecret` keys (and their values).

You can also provide `service`, which defaults to `"api2.transloadit.com"`, and `region`, which defaults to `"us-east-1"`.

### Assemblies

#### TransloaditClient.addFile(name, path)

Registers the local file with the client. The next call to `createAssembly` will upload that file.

#### TransloaditClient.addStream(name, stream)

Registers the provided stream with the client. The next call to `createAssembly` will upload that stream.

#### TransloaditClient.createAssembly(options, cb)

Creates a new assembly on Transloadit, uploading all streams and files that were registered via `.addStream()` and `.addFile()` prior to the call to `.createAssembly()`.

You can provide some options:

* `params` - an object containing your `template_id`, `notify_url`, some steps that overwrite your Transloadit template and other params to control Transloadit behavior.
* `fields` - an object of form fields to add to the request, to make use of in the assembly via [assembly variables](https://transloadit.com/docs#assembly-variables).

#### TransloaditClient.listAssemblies(params, cb)

Retrieves an array of assemblies according to the given `params`.

Valid params can be page, pagesize, type, fromdate and todate. Please consult the [Transloadit API docs](https://transloadit.com/docs/api-docs#retrieve-assembly-list) for details.

#### TransloaditClient.getAssembly(assemblyId, cb)

Retrieves the JSON status of the assembly identified by the given `assemblyId`.

#### TransloaditClient.deleteAssembly(assemblyId, cb)

Removes the assembly identified by the given `assemblyId` from the memory of the Transloadit machines, ultimately cancelling it. This does not delete the assembly from the database - you can still access it on `https://transloadit.com/assemblies/{assembly_id}` in your Transloadit account. This also does not delete any files associated with the assembly from the Transloadit servers.

#### TransloaditClient.replayAssembly(options, cb)

Replays the assembly identified by the given `assembly_id`. The `options` parameter must contain an `assembly_id` key containing the assembly id. Optionally you can also provide a `notify_url` key if you want to change the notification target.

### Assembly notifications

#### TransloaditClient.replayAssemblyNotification(options, cb)

Replays the notification for the assembly identified by the given `assembly_id`.  The `options` parameter must contain an `assembly_id` key containing the assembly id. Optionally you can also provide a `notify_url` key if you want to change the notification target.

#### TransloaditClient.listAssemblyNotifications(params, cb)

Retrieves an array of assembly notifications according to the given `params`.

Valid params can be `page`, `pagesize`, `type` and `assembly_id`. Please consult the [Transloadit API docs](https://transloadit.com/docs/api-docs#retrieve-notification-list) for details.

### Templates

#### TransloaditClient.createTemplate(params, cb)

Creates a template the provided params. The required `params` keys are: name (the template name) and template (the template JSON string).

#### TransloaditClient.editTemplate(templateId, params, cb)

Updates the template represented by the given `templateId` with the new value. The `params` works just like the one from the `createTemplate` call.

#### TransloaditClient.getTemplate(templateId, cb)

Retrieves the name and the template JSON for the template represented by the given templateId.

#### TransloaditClient.deleteTemplate(templateId, cb)

Deletes the template represented by the given templateId on Transloadit.

#### TransloaditClient.listTemplates(params, cb)

Retrieves a list of all your templates from Transloadit. The `params` parameter can contain properties such as `order`, `sort`, and `page`. For a list of all available params please check [this entry](https://transloadit.com/docs/api-docs#retrieve-template-list) in the Transloadit API docs.

## Contributing

We'd be happy to accept pull requests. If you plan on working on something big, please first drop us a line!

### Testing

Details on unit testing coming soon.

## Authors

Meteor package compiled by:

* [Joe Danziger](https://twitter.com/joedanz)

Based on the Transloadit NodeJS SDK by:

* [Tim Koschützki](https://twitter.com/tim_kos)

With contributions from:

* [Kevin van Zonneveld](https://twitter.com/kvz)
* [Geoff Wilson](mailto:gmwils@gmail.com)
* [Jim Gibbs](https://www.linkedin.com/pub/james-gibbs/0/8/4ab)


## License

[MIT Licensed](LICENSE).