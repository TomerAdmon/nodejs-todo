var _ = require('underscore');

var boundServicesHelper = function(serviceName, instanceName) {
  this.serviceName = serviceName;
  this.instanceName = instanceName;
  this.credentials = null;
};

boundServicesHelper.prototype.getCloudFoundryServiceVariables = function() {
  return JSON.parse(process.env.VCAP_SERVICES);
};

boundServicesHelper.prototype.getServiceInstanceMetaData = function() {
  var self = this;
  var vcap = this.getCloudFoundryServiceVariables();

  return _.find(vcap[self.serviceName], function(service){
    return service.name === self.instanceName;
  });
};

boundServicesHelper.prototype.parseCredentials = function() {
  var match = this.getServiceInstanceMetaData();
  this.credentials = match.credentials;
  return this.credentials;
};

boundServicesHelper.prototype.getPort = function() {
  var creds = this.getCreds();
  return creds.port;
};

boundServicesHelper.prototype.getHost = function() {
  var creds = this.getCreds();
  return creds.hostname;
};

boundServicesHelper.prototype.getPass = function() {
  var creds = this.getCreds();
  return creds.password;
};

boundServicesHelper.prototype.getCreds = function() {
  return this.credentials || this.parseCredentials();
};

module.exports = boundServicesHelper;
