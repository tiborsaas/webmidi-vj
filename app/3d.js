
/*******************************************************************

	ThreeJS demo
	--
	based on a factory demo, with some applied post processing

********************************************************************/

var ThreeDemo = {
	windowHalfX: window.innerWidth / 2,
	windowHalfY: window.innerHeight / 2,
	renderer: null,
	camera: null,
	scene: null,
	headerSize: 350,

	xMod: 0, // Connection to the riot UI
	yMod: 0, // updating these values 
	zMod: 0, // will change camera position

	init: function() {
		var container, separation = 100, amountX = 50, amountY = 50,
		particles, particle,
		container = document.querySelector('.app');

		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.z = 100;

		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog( 0x000000, 1, 1000 );

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( container.offsetWidth, window.innerHeight-this.headerSize );
		container.appendChild( this.renderer.domElement );

		// particles
		var PI2 = Math.PI * 2;
		var material = new THREE.MeshPhongMaterial( { color: 0xffff00, shading: THREE.FlatShading } );

		var geometry = new THREE.Geometry();

		for ( var i = 0; i < 100; i ++ ) {
			particle = new THREE.Sprite( material );
			particle.position.x = Math.random() * 2 - 1;
			particle.position.y = Math.random() * 2 - 1;
			particle.position.z = Math.random() * 2 - 1;
			particle.position.normalize();
			particle.position.multiplyScalar( Math.random() * 10 + 450 );
			particle.scale.x = particle.scale.y = 10;
			this.scene.add( particle );

			geometry.vertices.push( particle.position );
		}

		// lines
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xffffff, opacity: 0.5 } ) );
		this.scene.add( line );

		//
		window.addEventListener( 'resize', this.onWindowResize, false );

		// postprocessing
		composer = new THREE.EffectComposer( this.renderer );
		composer.addPass( new THREE.RenderPass( this.scene, this.camera ) );

		glitchPass = new THREE.GlitchPass();
		glitchPass.renderToScreen = true;
		composer.addPass( glitchPass );

		this.animate();
	},

	onWindowResize: function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		this.renderer.setSize( container.offsetWidth, window.innerHeight-this.headerSize );
	},

	animate: function() {
		requestAnimationFrame( this.animate.bind(this) );
		this.render();
	},

	render: function() {
		this.camera.position.x += ( this.xMod - this.camera.position.x ) * .05;
		this.camera.position.y += ( -this.yMod - this.camera.position.y ) * .05;
		this.camera.position.z += ( this.zMod - this.camera.position.z ) * .05;
		this.camera.lookAt( this.scene.position );

		composer.render();
	}
}