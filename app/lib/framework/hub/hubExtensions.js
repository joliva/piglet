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

// Key/Value support (values are JSON objects)
exports.keyobject = {
	setDebug: function(flag) {
		Kernel.keyobject.setDebug(flag);
	},
	getKeys: function() {
		return Kernel.keyobject.getKeys(args);
	},
	getObject: function(args) {
		return Kernel.keyobject.getObject(args);
	},
	setObject: function(args) {
		Kernel.keyobject.setObject(args);
	},	
	removeObject: function(args) {
		Kernel.keyobject.removeObject(args);
	}
}

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
    userLogout: function(username, callback) { 
    	Kernel.baas.userLogout({
    		username: username,
    		callback: callback
    	});
	},
    userLoggedIn: function() { 
    	Kernel.baas.userLoggedIn();
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

// SQL database support
exports.sqldb = {
	dbOpen: function(name, callback) {
	   	Kernel.sqldb.dbOpen({
    		'name': name,
    		'callback': callback
	   	});
	},
	dbExecute: function(callback, sql, vararg) {
	   	Kernel.sqldb.db.execute({
    		'callback': callback,
	   		'sql': sql,
	   		'vararg': vararg
	   	});
	},
	dbClose: function(callback) {
	   	Kernel.sqldb.db.close({
    		'callback': callback
    	});
	},
	dbRemove: function(callback) {
	   	Kernel.sqldb.db.remove({
    		'callback': callback
    	});
	},
	dbGetLastInsertRowId: function(callback) {
	   	Kernel.sqldb.db.getLastInsertRowId({
    		'callback': callback
    	});
	},
	dbGetName: function(callback) {
	   	Kernel.sqldb.db.getName({
    		'callback': callback
    	});
	},
	dbSetName: function(name, callback) {
	   	Kernel.sqldb.db.setName({
    		'name': name,
    		'callback': callback
	   	});
	},
	dbGetRowsAffected: function(callback) {
	   	Kernel.sqldb.db.getRowsAffected({
    		'callback': callback
    	});
	},
	dbSetRowsAffected: function(numRows, callback) {
	   	Kernel.sqldb.db.setRowsAffected({
	   		'numRows': numRows,
    		'callback': callback
    	});
	},

	rsGetTypes: function(numRows, callback) {
		return Kernel.sqldb.rs.type;
	},
	rsIsValidRow: function(rs, callback) {
	   	Kernel.sqldb.rs.isValidRow({
	   		'rs': rs,
    		'callback': callback
    	});
	},
	rsGetFieldCount: function(rs, callback) {
	   	Kernel.sqldb.rs.getFieldCount({
	   		'rs': rs,
    		'callback': callback
    	});
	},
	rsGetFieldName: function(rs, index, callback) {
	   	Kernel.sqldb.rs.getFieldName({
	   		'rs': rs,
	   		'index': index,
    		'callback': callback
    	});
	},
	rsGetRowCount: function(rs, callback) {
	   	Kernel.sqldb.rs.getRowCount({
	   		'rs': rs,
    		'callback': callback
    	});
	},
	rsGetField: function(rs, index, type, callback) {
	   	Kernel.sqldb.rs.getField({
	   		'rs': rs,
	   		'index': index,
	   		'type': type,
    		'callback': callback
    	});
	},
	rsGetFieldByName: function(rs, name, type, callback) {
	   	Kernel.sqldb.rs.getFieldByName({
	   		'rs': rs,
	   		'name': name,
	   		'type': type,
    		'callback': callback
    	});
	},
	rsNext: function(rs, callback) {
	   	Kernel.sqldb.rs.next({
	   		'rs': rs,
    		'callback': callback
    	});
	},
	rsClose: function(rs, callback) {
	   	Kernel.sqldb.rs.close({
	   		'rs': rs,
    		'callback': callback
    	});
	}
}

// Extensions below here are privileged -------------------------------------------------

// BaaS support
exports.baas_priv = {
	setBaasConfig: function(config) {
		Kernel.baas.setConfig(config);
	}
};

// Key/Object support
exports.keyobject_priv = {
	setKeyObjectConfig: function(config) {
		Kernel.keyobject.setConfig(config);
	}
};

// SQL database support
exports.sqldb_priv = {
	setDbConfig: function(config) {
		Kernel.sqldb.setConfig(config);
	}
}

// Module life-cycle support
exports.lifecycle = {
	moduleStart: function(name, args) {
		if (!Kernel.module.isStarted(name)) {
			Kernel.start(name, args);
		}
	},
    moduleStop: function(name) { 
		if (Kernel.module.isStarted(name)) {
			Kernel.stop(name);
		}
	}
};
