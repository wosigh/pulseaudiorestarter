enyo.kind(
    {
	name: "PulseAudioRestarter.Main",
	kind: enyo.VFlexBox,
	className: 'enyo-fit enyo-vflexbox main',
	published: {
	    deviceName:"PulseAudio Restarter",
		touched:0,
		request:false
	},
	components: [
	    { kind: "ApplicationEvents", onApplicationRelaunch: "applicationRelaunchHandler" },
	    
	    { kind: wi.Header, random: [
		  { weight: 1,  tagline: 'Sounds are Golden' }
	      ] },
	    
	    { name: 'nodeShellElement',   kind: 'Item', content: 'Waiting for Node Shell Service ...' },
	    
	    { name: 'nodeshellservice', kind: 'PalmService',
	      service: 'palm://com.foxtailsoftware.pulseaudiorestarter.node', method: 'restart',
	      onResponse: 'nodeShellResponse' }
	],

	applicationRelaunchHandler: function(params) {
	    var curwin = enyo.windows.getActiveWindow();
	    if (curwin && enyo.windowParams.sendDataToShare) {
		curwin.enyo.$.main.touchShareData();
	    }
	    else if (curwin && enyo.windowParams.target) {
		var string = enyo.windowParams.target.substring(21);
		curwin.enyo.$.main.touchDisplay(string);
	    }
	},

	rendered: function() {
	    this.inherited(arguments);
	    this.$.nodeShellElement.setContent("Restarting audio. This app will close in a few seconds.");
	    this.$.nodeshellservice.call({ 'name': 'Node Shell Service' });
	},
	
	nodeShellResponse: function(inSender, inResponse, inRequest) {
			enyo.windows.getActiveWindow().close();
	    if (inResponse.returnValue === true) {
		if (inResponse.stdout) {
			this.$.nodeShellElement.setContent("Trying to close.");
			enyo.windows.getActiveWindow().close();
			this.$.nodeShellElement.setContent("Failing to close.");
		}
	    }
	    else {
		this.$.nodeShellElement.setContent("Error "+inResponse.errorCode+": "+inResponse.errorText);
	    }
	}
    }
);