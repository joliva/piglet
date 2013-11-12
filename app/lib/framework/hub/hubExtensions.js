// Hub extensions (CommonJS)

var Alloy = require('Alloy');
var Kernel = Alloy.Globals.Kernel;

// Logging support (both kernel and module broadcast)
exports.log = {
    logInfo: function(text) {    		
		Kernel.log.info(text);
		this.broadcast('log-info',text);
	},
    logDebug: function(text) {    		
		Kernel.log.debug(text);
		this.broadcast('log-debug',text);
	},
    logError: function(text) {    		
		Kernel.log.error(text);
		this.broadcast('log-error',text);
    }
};

// BaaS support
exports.baas = {
	setDebug: function(flag) {
		Kernel.baas.setDebug(flag);
	},
    userLogin: function(username, password, callback) { 
    	Kernel.baas.userLogin({
    		username: username,
    		password: password,
    		callback: callback
    	});
	},
    userCreate: function(username, password, callback) { 
    	Kernel.baas.userCreate({
    		username: username,
    		password: password,
    		callback: callback
    	});
    },
    sessionRestore: function() {
    	Kernel.baas.sessionRestore();
    }
};

// Extensions below here are privileged -------------------------------------------------

// BaaS support
exports.baas_priv = {
	setBaasConfig: function(config) {
		Kernel.baas.setConfig(config);
	}
};

// Module life-cycle support
exports.lifecycle = {
	moduleStart: function(name) {
		if (!Kernel.module.isStarted(name)) {
			Kernel.start(name);
		}
	},
    moduleStop: function(name) { 
		if (Kernel.module.isStarted(name)) {
			Kernel.stop(name);
		}
	}
};