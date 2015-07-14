<controller-selector>
	<div class="mdl-cell mdl-cell--12-col">
		<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" id="controller-selector">
			Select MIDI controller
		</button>
		<div class="icon material-icons large" show="{selected}" style="display:none">done</div>
		<ul id="controller-selector-list" class="mdl-menu mdl-js-menu mdl-js-ripple-effect" for="controller-selector">
			<!-- generated list of midi controllers -->
			<li each={opts.devices} class="mdl-menu__item" onclick="{activate}" value="{id}">{name}</li>
		</ul>
	</div>
	<script>
		var selected = false;

		activate (e) {
			this.selected = true;
			opts.trigger('selected', e.target.value);
		}

		this.on('mount', function () {
			componentHandler.upgradeDom();
		});
	</script>
</controller-selector>