<slider>
	<input class="mdl-slider mdl-js-slider" type="range" min="0" max="127" value="{opts.sliderValue}" oninput="{change}" tabindex="0"/>
	<button class="mdl-button mdl-js-button mdl-js-ripple-effect learn" onclick="{learn}" hide="{learningMode}">Learn</button>
	<div class="waiting" show="{learningMode}" style="display:none">
		<div class="mdl-spinner mdl-js-spinner is-active"></div> 
		<div class="label">Move a knob or fader ({opts.controllerId})</div>
		<button class="mdl-button mdl-js-button mdl-button--icon slider-save" onclick="{save}">
		  <i class="material-icons">done</i>
		</button>
	</div>
	<script>
		var self = this;
		var assignedControllerId = null;
		var learningMode = false;

		learn () {
			this.learningMode = true;
			opts.trigger('learning',opts.id);
		}

		save () {
			opts.trigger('saved',opts.id, this.assignedControllerId);
			this.learningMode = false;
		}

		change () {
			var sValue = parseInt( this.root.querySelector('input').value );
			opts.trigger('change',[opts.id, assignedControllerId, sValue]);
		}

		opts.on('set', function (midiData) {
			if( self.learningMode === true && this.currentId == opts.id ){
				this.sliderValue = midiData[2]
				this.controllerId = midiData[1]
				self.assignedControllerId = midiData[1]
				self.update();
			}

			if( !self.learningMode && self.assignedControllerId == midiData[1] ){
				this.sliderValue = midiData[2]
				self.update();
			}
		});

		this.on('mount', function () {
			componentHandler.upgradeDom();
		});
	</script>
</slider>