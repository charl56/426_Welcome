<template>
    <div class="scene" ref="scene" onselectstart="return false" onmousedown="return false">
        <div class="viseur d-flex align-center justify-center">
            <!-- <div>
                <v-img class="icon-viseur" :src="viseur"></v-img>
            </div> -->
        </div>
        <Display />
    </div>
</template>

<script>
    // ThreeJs
    import * as THREE from 'three';
    import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';      // Pour les objets 3D
    import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';      // Texture des objets 3D
    import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'     // Image 360
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';    // Pour les animation
    import { STLLoader } from 'three/addons/loaders/STLLoader.js';    // Pour les animation    
    // Plugins
    import { eventBus } from '../../plugins/eventBus'
    // Ammo
    import Ammo from 'ammo.js';
    // Import datas
    import {sceneItems} from '../../../static/datas/Maps/426_items'
    import {lights} from '../../../static/datas/Maps/426_lights'
    import sounds from '../../../static/datas/sounds'
    // Display
    import Display from '../Display/Display.vue'


    export default {
        components: {
            Display
        },
        created(){
        },
        mounted() {
            eventBus.on("restartGame", () => {
                restart()
            })
            ////
            // VARIABLES
            ////
            // Ecrans de chargement
            let ressourcesLoad, loadingScreen, welcome
            // ThreeJs : graphic
            let scene, camera, welcomeIndex, clock, deltaTime, renderer
            const canvas = this.$refs.scene                 // Canvas affiche le jeu
            //  AmmoJs : physic
            let physicsWorld
            let AmmoJs = null
            // Game
            let fpsControls, hitboxPlayer, keyboard, gameStop, backgroundSound, backgroundSoundActive
            
            let player = this.player
            let isSound = this.isSound               // Parametre active son

            // Mise en place du viseur
            this.viseur = new URL('../../assets/Icons/viseur.png', import.meta.url).href

            async function initVariable(){
                // loading et death screen
                ressourcesLoad = false
                welcomeIndex = 0
                // ThreeJs : graphic
                scene = camera = clock = deltaTime = null
                renderer = new THREE.WebGLRenderer()        // Fonction de rendu
                //  AmmoJs : physic
                physicsWorld = null
                // Game
                fpsControls = null
                player = {height: 2, canShoot: true, canJump: true, speed: 0.065, turnSpeed: Math.PI*0.02, alive: true},
                hitboxPlayer = null
                keyboard = {}                   // Liste des touches actives, ou non
                gameStop = false                    // Sert a mettre en pause le jeu
                backgroundSound = null                     // Son de fond
                backgroundSoundActive = false
                isSound = [false]               // Parametre active son
            }


            // AmmoJs : création physiques
            new Ammo().then(
                (ammo) => {
                    AmmoJs = ammo
                    start()
                }
            )

            function restart(){
                location.href = location.href
            }
            async function start(){
                // On commence par init les variables
                await initVariable()
                // On commence par afficher l'ecran de chargemement
                loadScreen()
                // Moteur de rendu, fait les frame
                renderFrame()
                // Physic : Ammo
                setupPhysicsWorld()
                // Crée l'élement scene et les différents élement permettant l'affichage
                setupGraphics()
                // Prepare anim de la mort
                await initScene()
                // Setup des event clavier/souris
                setupEventHandlers()
                // Enlève l'ecran de chargement
                ressourcesLoad = true
                eventBus.emit("welcome", true)
                welcome = true
            }
            ////
            // Loading screen
            ////
            function loadScreen(){
                loadingScreen = {
                    scene: new THREE.Scene(),
                    camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
                    box: new THREE.Mesh(
                        new THREE.BoxGeometry(0.5, 0.5, 0.5),
                        new THREE.MeshBasicMaterial({ color:0x4444ff })
                    )
                }
                // Préparation de l'écran de chargement
                loadingScreen.box.position.set(0, 0, 5)
                loadingScreen.camera.lookAt(0, 0, 5)
                loadingScreen.scene.add(loadingScreen.box)
            }
            ////
            // Setup AmmoJs
            ////
            function setupPhysicsWorld(){
                // J'ai pas tout capté, mais tous les premier éléments sont nécessaires pour la variable physicsWorld (où simulation physique s'effectue)
                let collisionConfiguration = new AmmoJs.btDefaultCollisionConfiguration()
                let dispatcher = new AmmoJs.btCollisionDispatcher(collisionConfiguration)
                let overlappingPairCache = new AmmoJs.btDbvtBroadphase()
                let solver = new AmmoJs.btSequentialImpulseConstraintSolver()
                // Création monde physique
                physicsWorld = new AmmoJs.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
                physicsWorld.setGravity(new AmmoJs.btVector3(0, -2, 0));
            }
            ////
            // Création de la scene init des élements graphiques
            ////
            function setupGraphics(){
                //create clock for timing
                clock = new THREE.Clock();
                // Init caméra
                camera = new THREE.PerspectiveCamera(75,canvas.clientWidth / canvas.clientHeight,0.1,100);
                // Position camera
                camera.position.set(4, player.height, 0)
                camera.rotation.set(0, -Math.PI/2, 0)
                camera.userData.tag = 'cameraPlayer'
                // POV, class js
                fpsControls = new FirstPersonCamera(camera);
                // Init rendu
                renderer.setSize(canvas.clientWidth, canvas.clientHeight);  // taille
                renderer.shadowMap.enabled = true               // Active les ombres
                renderer.shadowMap.type = THREE.BasicShadowMap  // Type d'ombres
                // Créer le canvas
                canvas.appendChild(renderer.domElement);
                // Ajout d'un id au canvas
                document.querySelector("canvas").setAttribute("id", "inLavaId" )
                // Création scene
                scene = new THREE.Scene()
                scene.background = new THREE.Color( 0x000000 );
               
                // // Hitbox pour les zones d'armes
                hitboxPlayer = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

                // Ambient light
                let ambientLight = new THREE.AmbientLight(0xFDFDFD)
                scene.add(ambientLight)

                // Lights
                const lightKeys = Object.keys(lights);
                // Pour chaques items
                for (const element of lightKeys) {
                    const lightItem = lights[element];

                    // Set light
                    let light = new THREE.PointLight(
                        lightItem.color, 
                        lightItem.distance, 
                        lightItem.intensity
                    )
                    light.position.set(
                        lightItem.position.x, 
                        lightItem.position.y, 
                        lightItem.position.z, 
                    )
                    light.decay = lightItem.decay

                    light.castShadow = true
                    light.shadow.camera.near = 0.1
                    light.shadow.camera.far = 25
                    scene.add(light)
                
                }


                // Musique de fond
                const listener = new THREE.AudioListener()
                camera.add(listener)

                const audioLoader = new THREE.AudioLoader()
                backgroundSound = new THREE.Audio(listener)
                audioLoader.load(sounds['CouldYouBeLoved'].soundSrc, function( buffer ){
                    backgroundSound.setBuffer(buffer)
                    backgroundSound.setLoop(true)
                    backgroundSound.setVolume(0.8)
                })
            }
            ////
            // Ajout des élements à la scene, chargement graphique des éléments
            ////
            async function initScene(){
                // Sol : THREEHS
                const floor = new THREE.Mesh(
                    new THREE.PlaneGeometry(300, 300),
                    new THREE.MeshBasicMaterial({color: 0xa6a6a6, wireframe: false})
                )
                floor.position.set(0, 0, 0)
                floor.rotation.x -= Math.PI / 2;
                floor.userData.tag = "floor"
                floor.receiveShadow = true
                scene.add(floor)
                // Ammojs Section
                let transform = new AmmoJs.btTransform();
                transform.setIdentity();
                transform.setOrigin( new AmmoJs.btVector3(0, 0, 0));
                transform.setRotation( new AmmoJs.btQuaternion(0, 0, 0, 1));
                let motionState = new AmmoJs.btDefaultMotionState( transform );
                // Equivalent hitbox
                let colShape = new AmmoJs.btBoxShape( new AmmoJs.btVector3(35, 0.1, 35));
                colShape.setMargin( 0.05 );

                let localInertia = new AmmoJs.btVector3( 0, 0, 0 );
                colShape.calculateLocalInertia( 0, localInertia );

                let rbInfo = new AmmoJs.btRigidBodyConstructionInfo( 0, motionState, colShape, localInertia );
                let body = new AmmoJs.btRigidBody( rbInfo );
                //
                body.setFriction(4);
                body.setRollingFriction(10);
                // Ajout au monde physic
                physicsWorld.addRigidBody( body );
                body.threeObject = floor;

                // Affichage appartememnt 
                const material = new THREE.MeshPhysicalMaterial({
                    color: 0xF6F6F6,
                    roughness: 1,
                    metalness: 0.5,
                    opacity: 1,
                    transparent: true,
                    transmission: 1,
                    clearcoat: 1,
                    clearcoatRoughness: 0.9

                    // color: 0xFDFDFD,
                    // roughness: 1,
                    // metalness: 0,
                    // opacity: 1.0,
                    // transparent: false,
                    // transmission: 0.99,
                    // clearcoat: 0.9,
                    // clearcoatRoughness: 0.95
                })
                // Appart 426 en stl
                const loloader = new STLLoader()
                loloader.load(
                    '../../../static/Models/426.stl',
                    function (geometry) {
                        const mesh = new THREE.Mesh(geometry, material)

                        mesh.scale.set(
                            0.02,
                            0.02,
                            0.02
                        );
                        mesh.position.x = -10
                        mesh.position.y = 0.01
                        mesh.position.z = 0
                        mesh.rotation.x -= Math.PI/2

                        scene.add(mesh)
                    },
                )

         
                // Ajout des items pour faire la map, du fichier sceneItems.js
                const keys = Object.keys(sceneItems);
                // Pour chaques items
                for (const element of keys) {
                    const key = element;
                    const sceneItem = sceneItems[key];
                    try {
                        // ------ THREEJS SECTION
                        // Load items for scene
                        const materialItem = await loadMTL(sceneItem.mtl);
                        await materialItem.preload();

                        const materielMesh = await loadOBJ(sceneItem.obj, materialItem);
                        // // Inspecter les positions des vertices
                        // materielMesh.traverse(function (child) {
                        //     if (child instanceof THREE.Mesh) {
                        //         var geometry = child.geometry;
                        //         var positions = geometry.getAttribute('position').array;

                        //         for (var i = 0; i < positions.length; i += 3) {
                        //             var x = positions[i];
                        //             var y = positions[i + 1];
                        //             var z = positions[i + 2];

                        //             if (isNaN(x) || isNaN(y) || isNaN(z)) {
                        //                 console.error('NaN value found in position data');
                        //                 console.log('Vertex index:', i / 3);
                        //                 console.log('Position:', x, y, z);
                        //             }
                        //         }
                        //     }
                        // });
                        
                        // Ombre de l'objet
                        materielMesh.receiveShadow = true
                        materielMesh.castShadow = true
                        // Position
                        materielMesh.position.set(
                            sceneItem.position.x,
                            sceneItem.position.y,
                            sceneItem.position.z
                        );
                        // Rotation
                        materielMesh.rotation.set(
                            sceneItem.rotation.x,
                            sceneItem.rotation.y,
                            sceneItem.rotation.z,
                        )
                        // Echelle
                        materielMesh.scale.set(
                            sceneItem.scale,
                            sceneItem.scale,
                            sceneItem.scale
                        );
                        // Ajout d'un tag pour différencier
                        materielMesh.userData.tag = "sceneItem"
                        // Ajout de la mesh à l'objet de l'item
                        sceneItem.mesh = materielMesh;
                        // console.log(materielMesh)
                        // Ajout à la scene
                        scene.add(materielMesh)


                    } catch (error) {
                        console.error("Erreur lors du chargement de la physique d'un élement", error);
                    }
                }

            }
            ////
            // Fonctions pour charger les élements 'obj' et 'mtl'
            ////
            async function loadMTL(mtlPath) {                  // Decoupe de la fonction setWeapons, pour les await/async
                return new Promise((resolve, reject) => {
                    const mtlLoader = new MTLLoader();
                    mtlLoader.load(mtlPath, resolve, undefined, reject);
                });
            }
            async function loadOBJ(objPath, materials) {       // Decoupe de la fonction setWeapons, pour les await/async
                return new Promise((resolve, reject) => {
                    const objLoader = new OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.load(objPath, resolve, undefined, reject);
                });
            }
            ////
            // Mise en place des fonction d'évenement
            ////
            function setupEventHandlers(){
                document.addEventListener('click', (e) => onClick(e), false)       // Tire
                document.addEventListener('keyup', (e) => keyUp(e), false)  // Appuie d'une touche
                document.addEventListener('keydown', (e) => keyDown(e), false)  // Lachement d'une touche
                document.addEventListener('wheel', (e) => wheel(e), false)  // Roulette inventaire
            }

            // Roulette inventaire
            function wheel(e){

            }

            function onClick(e){
            }
            function keyDown(e){
                keyboard[e.keyCode] = true
                console.log(e.keyCode)
                keyUse()
            }
            function keyUp(e){
                keyboard[e.keyCode] = false
                keyUse()
            }

            function keyUse(){
                if(welcome){
                    if(keyboard[32]){
                        eventBus.emit("welcome", false)
                        welcome = false
                    }
                } else {
                    // Sprint ou marche normal
                    if(keyboard[20]){
                        fpsControls.playerSpeed = 11
                    } else {
                        fpsControls.playerSpeed = 7
                    }
                }
            }

            ////
            // Moteur de rendu, fait les frames
            ////
            function renderFrame() {

                // Ecran de chargement
                if(!ressourcesLoad){
                    // // Mouvement de la box
                    loadingScreen.box.rotation.y += 0.05
                    
                    requestAnimationFrame(renderFrame)
                    renderer.render(loadingScreen.scene, loadingScreen.camera)
                    return

                } else if(welcome){
                    camera.position.set(4, player.height, 0)
                    camera.rotation.set(0, -Math.PI/2, 0)
                    //
                    // Effet haut/bas sur la cam
                    welcomeIndex ++
                    camera.position.y = (Math.sin(welcomeIndex/50)/3)+2
                    // Animation
                    requestAnimationFrame(renderFrame)
                    renderer.render(scene, camera)
                    return

                } else {      
                    // On met a jour la position de la hitbox du joueur
                    hitboxPlayer.setFromCenterAndSize(camera.position, new THREE.Vector3(0.8, 2, 0.8))

                    // POV
                    fpsControls.mouseEventsEnabled = false
                    deltaTime = clock.getDelta()
                    fpsControls.update(deltaTime)
                    // Render
                    renderer.render(scene, camera);
                    requestAnimationFrame(renderFrame);
                    return

                }
            }


            ///////////////////////////////////////////////////////////
            // Class controle POV
            const KEYS = {
                'z': 90,
                's': 83,
                'q': 81,
                'd': 68,
            };

            function clamp(x, a, b) {
                return Math.min(Math.max(x, a), b);
            }

            class InputController {
                constructor(target) {
                    this.target_ = target || document;
                    this.initialize_();
                }

                initialize_() {
                    this.current_ = {
                        mouseXDelta: 0,
                        mouseYDelta: 0,
                        mouseX: 0,
                        mouseY: 0,
                    };
                    this.previous_ = null;
                    this.keys_ = {};
                    this.previousKeys_ = {};
                    this.target_.addEventListener('mousemove', (e) => this.onMouseMove_(e), false);
                    this.target_.addEventListener('keydown', (e) => this.onKeyDown_(e), false);
                    this.target_.addEventListener('keyup', (e) => this.onKeyUp_(e), false);
                }

                onMouseMove_(e) {
                    if (fpsControls.mouseEventsEnabled) return; // Ne réagissez pas aux mouvements de la souris si désactivé

                    this.current_.mouseX = e.pageX - window.innerWidth / 2;
                    this.current_.mouseY = e.pageY - window.innerHeight / 2;

                    if (this.previous_ === null) {
                    this.previous_ = {...this.current_};
                    }

                    this.current_.mouseXDelta = this.current_.mouseX - this.previous_.mouseX;
                    this.current_.mouseYDelta = this.current_.mouseY - this.previous_.mouseY;
                }

                onKeyDown_(e) {
                    this.keys_[e.keyCode] = true;
                }

                onKeyUp_(e) {
                    this.keys_[e.keyCode] = false;
                }

                key(keyCode) {
                    return !!this.keys_[keyCode];
                }

                update(_) {
                    if (this.previous_ !== null) {
                        this.current_.mouseXDelta = this.current_.mouseX - this.previous_.mouseX;
                        this.current_.mouseYDelta = this.current_.mouseY - this.previous_.mouseY;

                        this.previous_ = {...this.current_};
                    }
                }
            };

            class FirstPersonCamera {
                constructor(camera) {
                    this.camera_ = camera;
                    this.mouseEventsEnabled = true; // Activer les événements de la souris par défaut
                    this.input_ = new InputController();
                    this.rotation_ = new THREE.Quaternion();
                    this.translation_ = new THREE.Vector3(4, 2, 0);
                    this.phi_ = -Math.PI/2;
                    this.phiSpeed_ = 8;
                    this.theta_ = 0;
                    this.thetaSpeed_ = 5;
                    this.playerSpeed = 7
                    this.velocity_y = 0
                    this.clock = new THREE.Clock()
                    this.deltaTime = null
                    this.firstRotation = false
                }

                update(timeElapsedS) {
                    this.updateRotation_(timeElapsedS);
                    this.updateCamera_(timeElapsedS);
                    this.updateTranslation_(timeElapsedS);
                    this.input_.update(timeElapsedS);
                }

                updateCamera_(_) {
                    this.camera_.quaternion.copy(this.rotation_);
                    this.camera_.position.copy(this.translation_);

                    const forward = new THREE.Vector3(0, 0, -1);
                    forward.applyQuaternion(this.rotation_);

                    const dir = forward.clone();

                    forward.multiplyScalar(100);
                    forward.add(this.translation_);

                    let closest = forward;
                    this.camera_.lookAt(closest);
                }

                updateTranslation_(timeElapsedS) {
                    const forwardVelocity = (this.input_.key(KEYS.z) ? 1 : 0) + (this.input_.key(KEYS.s) ? -1 : 0)
                    const strafeVelocity = (this.input_.key(KEYS.q) ? 1 : 0) + (this.input_.key(KEYS.d) ? -1 : 0)

                    const qx = new THREE.Quaternion();
                    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi_);

                    const forward = new THREE.Vector3(0, 0, -1);
                    forward.applyQuaternion(qx);
                    forward.multiplyScalar(forwardVelocity * timeElapsedS * this.playerSpeed);

                    const left = new THREE.Vector3(-1, 0, 0);
                    left.applyQuaternion(qx);
                    left.multiplyScalar(strafeVelocity * timeElapsedS * this.playerSpeed);

                    this.translation_.add(forward);
                    this.translation_.add(left);
                }

                updateRotation_(timeElapsedS) {
                    const xh = this.input_.current_.mouseXDelta / window.innerWidth;
                    const yh = this.input_.current_.mouseYDelta / window.innerHeight;
                    
                    this.phi_ += -xh * this.phiSpeed_;
                    this.theta_ = clamp(this.theta_ + -yh * this.thetaSpeed_, -Math.PI / 2, Math.PI / 2);
                    
                    const qx = new THREE.Quaternion();
                    qx.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.phi_);
                    const qz = new THREE.Quaternion();
                    qz.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.theta_);
                    
                    const q = new THREE.Quaternion();
                    q.multiply(qx);
                    q.multiply(qz);
                
                    this.rotation_.copy(q);
                }
            }

        },
        data(){
            return {
                // Variables déclarées ici pour être envoyé en tant que props, dans un component
                player: {height: 2, canShoot: true, canJump: true, speed: 0.065, turnSpeed: Math.PI*0.02, alive: true},
                viseur: '',         // Change la couleur du viseur
                isSound: [false],
            }
        },
    };
</script>


<style>
.scene{
    height: 100vh;
    width: 100vw;
    cursor: none;
    position: relative;
}
/* Viseur */
.viseur{
    position:absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}.icon-viseur{
    height: 40px;
    width: 40px;
}

</style>
