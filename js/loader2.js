//////////////////////////////////////////////////////////////////////////////
//		initialize babylon.js engine
//////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById("renderCanvas");
var sceneChecked;


// Babylon
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });



//////////////////////////////////////////////////////////////////////////////
//		create babylon.js scene 
//////////////////////////////////////////////////////////////////////////////
	
	
function createScene(){
	var scene = new BABYLON.Scene(engine);
	var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
	var camera = new BABYLON.ArcRotateCamera("Camera", 1.0, 1.0, 12, BABYLON.Vector3.Zero(), scene);
	light.position = new BABYLON.Vector3(20, 150, 70);
	camera.minZ = 10.0;
	

	camera.attachControl(canvas, true);

	scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

	// Ground
	var box = BABYLON.Mesh.CreateBox("mesh", 1, scene);
	box.scaling.y=0.01;
	box.position.y = 0.;
	box.showBoundingBox = true;


	var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
	groundMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
	groundMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);

	box.material = groundMaterial;
	box.receiveShadows = false;
   
	// Shadows
	var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	shadowGenerator.getShadowMap().renderList.push(box);

	// Meshes
	BABYLON.SceneLoader.ImportMesh("Rabbit", "scenes/", "Rabbit.babylon", scene, function (newMeshes, particleSystems, skeletons) {
		var rabbit = newMeshes[1];
		
		rabbit.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
		shadowGenerator.getShadowMap().renderList.push(rabbit);


		scene.beginAnimation(skeletons[0], 0, 100, true, 0.8);
		
	});

	return scene;
}



var scene = createScene()
scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

////////////////////////////////////////////////////////////////////////////////
//          	Set up Arjs.Profile
////////////////////////////////////////////////////////////////////////////////


ARjs.Babylon.init(engine, scene, scene.cameras[0])


//////////////////////////////////////////////////////////////////////////////
//		Code Separator
//////////////////////////////////////////////////////////////////////////////
engine.runRenderLoop(function () {
	if (scene) {
		scene.render();
	}
});

// Resize
window.addEventListener("resize", function () {
	engine.resize();
});
