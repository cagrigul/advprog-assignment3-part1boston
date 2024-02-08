require([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/Camera",
  "esri/widgets/Home",
  "dojo/domReady!"
], function(WebScene, SceneView, Camera, Home) {
  var scene = new WebScene({
    portalItem: {
      id: "8046207c1c214b5587230f5e5f8efc77"
    }
  });
  
  var camera = new Camera({
    position: [
      -71.060217,
      42.362655,
      2500 // elevation in meters
    ],
    tilt: 0,
    heading: 0
  });

  var camera2 = new Camera({
    position: [
      -71.049508,
      42.358162,
      2500 // elevation in meters
    ],
    tilt: 0,
    heading: 0
  });

  var camera3 = new Camera({
    position: {
      x: -71.050362, // Longitude for a view from the Atlantic towards downtown
      y: 42.3554,   // Latitude
      z: 1500       // Elevation in meters for a closer view
    },
    tilt: 60,       // Tilt down towards the ground
    heading: 45     // Facing direction towards downtown
  });

  var view = new SceneView({
    container: "viewDiv",
    map: scene,
    viewingMode: "global",
    camera: camera,
    environment: {
      lighting: {
        date: new Date(),
        directShadowsEnabled: true,
        cameraTrackingEnabled: false
      }
    },
  });
  
  var homeBtn = new Home({
    view: view
  });
  view.ui.add(homeBtn, "top-left");
  
  var bostonBtn = document.getElementById("v1");
  var bostonAreaBtn = document.getElementById("v2");
  var downtownBtn = document.getElementById("v3"); // Assumed correct ID following instructions

  // Update button text if needed
  bostonBtn.textContent = "Boston";
  bostonAreaBtn.textContent = "Boston Area";
  downtownBtn.textContent = "Downtown Boston"; // Ensure the button text is set correctly

  // Ensure the downtown button is displayed and added to the UI correctly
  downtownBtn.style.display = 'flex';
  [bostonBtn, bostonAreaBtn, downtownBtn].forEach(function(button) {
    button.style.display = 'flex';
    view.ui.add(button, 'top-right');
  });

  var homeBtn = new Home({
    view: view
  });
  
  bostonAreaBtn.addEventListener('click', function() {
    view.goTo(camera2);
  });
  
  bostonBtn.addEventListener('click', function() {
    view.goTo(camera);
  });

  downtownBtn.addEventListener('click', function() {
    view.goTo({
      target: camera3.position,
      tilt: camera3.tilt,
      heading: camera3.heading
    });
  });
});
