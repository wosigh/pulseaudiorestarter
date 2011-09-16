function MainAssistant() {
    this.activated = false;
    this.touched = 0;
    this.deviceName = "PulseAudio Restarter";
};

MainAssistant.prototype.setup = function() {
    this.controller.get('main-title').innerHTML = $L('Audio Restarter');
    this.controller.get('version').innerHTML = $L("v" + Mojo.Controller.appInfo.version);
    this.controller.get('subTitle').innerHTML = $L('Sounds are golden.');	

    this.htmlElement = this.controller.get('htmlDiv');
    this.nodeShellElement = this.controller.get('nodeShellDiv');
};

MainAssistant.prototype.activate = function(params)
{
    console.log("activate: "+JSON.stringify(params));

    if (!this.activated) {
	if (Mojo.Environment.DeviceInfo.platformVersionMajor != 1) {
	    this.nodeShellElement.innerHTML = "Restarting audio. This app will close in a few seconds.";
	    this.controller.serviceRequest('palm://com.foxtailsoftware.pulseaudiorestarter.node', {
		    method: "restart",
			parameters: {},
			onSuccess: this.nodeSuccess.bind(this, this.nodeShellElement),
			onFailure: this.nodeFailure.bind(this, this.nodeShellElement)
			});
	}
	else {
	    this.nodeShellElement.innerHTML = "Node Restart Service not available.";
	}

	this.activated = 1;
    }
};

MainAssistant.prototype.nodeSuccess = function(element, successData){
	this.controller.stageController.popScene();
	this.controller.window.close();
};

MainAssistant.prototype.nodeFailure = function(element, failData){
    element.innerHTML = "Error "+failData.errorCode+": "+failData.errorText;
};
