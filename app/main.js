/**
 * Main demo controller
 */
var App = {
	learnSlider: null,
	learnMode: false,
	context: new midiObject(),
	eventBus: riot.observable(),
	selectorEvents: riot.observable(),
	map: {
		// Store the slider <-> contoller assigments here
	},

	initialize: function () {
		this.context.events.on('message', function (midiData,e) {
			this.eventBus.trigger('set', midiData );

			var keys = Object.keys(this.map);
			for (var i = 0; i < keys.length; i++) {
				if( keys[i] == midiData[1] ){
					ThreeDemo[ this.map[ keys[i] ] ] = midiData[2]*5;
				}
			};
		}.bind(this));

		this.context.events.on('device-ready', function () {
			this.initSelector();
		}.bind(this));

		this.context.initialize();
		this.startRiot();

		ThreeDemo.init();
	},

	/**
	 * Start a riot
	 * (is this legal?)
	 */
	startRiot: function () {
		this.eventBus.on('learning', function (id) {
			this.learnMode = true;
			this.learnSlider = id;
			this.eventBus.currentId = id;
		}.bind(this));

		this.eventBus.on('saved', function (id,controllerId) {
			this.learnMode = false;
			this.learnSlider = null;
			this.map[controllerId] = id;
		}.bind(this));

		this.eventBus.on('change', function (params){
			ThreeDemo[params[0]] = params[2];
		});

		this.eventBus.sliderValue = 0;

		riot.mount('slider', this.eventBus);
	},

	initSelector: function () {
		this.selectorEvents.devices = this.context.deviceList;

		this.selectorEvents.on('selected',function(id){
			this.context.selectDevice(id);
		}.bind(this));

		riot.mount('controller-selector', this.selectorEvents);
	}
}

window.addEventListener('load', function () {
	App.initialize();
});