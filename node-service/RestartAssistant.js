var exec = require('child_process').exec;

var RestartAssistant = function() {
};
  
RestartAssistant.prototype.run = function(future) {
    var cmd = "stop pulseaudio; sleep 2; start pulseaudio";

    exec(cmd, function(error, stdout, stderr) {
	    if (error !== null) { 
		error.errorCode = error.code;
		future.exception = error;
	    }
	    else {
		future.result = { stdout: stdout, stderr: stderr };
	    }
	});
};
