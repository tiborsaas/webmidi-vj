
var midiObject = function(){
	this.midiAccess = null;
	this.selectedDevice = null;
	this.deviceList = [];
	this.events = riot.observable();

	this.initialize = function(){
		navigator.requestMIDIAccess().then( 
			this.onMIDISuccess.bind(this), 
			this.onMIDIFailure
		);
	}

	this.onMIDISuccess = function(midiAccess){
		console.log( "WebMIDI ready" );
		console.log(midiAccess);
		this.midiAccess = midiAccess;

		this.initMIDILogging();
		this.events.trigger('device-ready'); 
	}

	this.onMIDIFailure = function (argument) {
		console.log( "Failed to get MIDI access - " + msg );
	}

	this.onMIDIMessage = function(event) {
		for (var i=0; i<event.data.length; i++) {
			this.events.trigger('message',event.data);
		}
	}

	this.getDeviceById = function (id) {
		return this.midiAccess.inputs.get(id);
	}

	this.selectDevice = function (id) {
		this.selectedDevice = this.deviceList[id];
		this.selectedDevice.onmidimessage = this.onMIDIMessage.bind(this);
	}

	this.initMIDILogging = function() {
		this.midiAccess.inputs.forEach( function(entry,port) {
			this.deviceList.push(entry);
		}.bind(this));
	};
}
