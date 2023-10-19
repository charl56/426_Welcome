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
    import { STLLoader } from 'three/addons/loaders/STLLoader.js';      // Pour les animation 
    import Stats from 'three/examples/jsm/libs/stats.module'            // FPS
   
    // Ammo
    import Ammo from 'ammo.js';
    // Plugins
    import { eventBus } from '../../plugins/eventBus'
    import { FirstPersonCamera } from '../../plugins/FirstPersonCamera';
    // Import datas
    import {sceneItems} from '../../../static/datas/Maps/426_items'
    import {lights} from '../../../static/datas/Maps/426_lights'
    import {sounds} from '../../../static/datas/sounds'
    // VueComponents
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
            let scene, camera, welcomeIndex, clock, deltaTime, renderer, stats
            const canvas = this.$refs.scene                 // Canvas affiche le jeu
            //  AmmoJs : physic
            let physicsWorld
            let AmmoJs = null
            // Game
            let fpsControls, hitboxPlayer, keyboard, backgroundSound, exitMap, remote
            
            let player = this.player
            let isSound = false     // Parametre active son

            // Mise en place du viseur
            this.viseur = new URL('../../assets/Icons/viseur.png', import.meta.url).href

            async function initVariable(){
                // loading et death screen
                ressourcesLoad = false
                welcomeIndex = 0
                stats = new Stats()
                document.body.appendChild(stats.dom)

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
                backgroundSound = null                     // Son de fond
                isSound = false               // Parametre active son
                exitMap = false
                remote = false
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
                let ambientLight = new THREE.AmbientLight(0xf2f2ed)
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
                //  Global audio source
                backgroundSound = new THREE.Audio(listener)
                // Load sound
                const audioLoader = new THREE.AudioLoader()
                audioLoader.load(sounds['CouldYouBeLoved'].soundSrc, function( buffer ){
                    backgroundSound.setBuffer(buffer)
                    backgroundSound.setLoop(true)
                    backgroundSound.setVolume(0.2)
                })
            }
            ////
            // Ajout des élements à la scene, chargement graphique des éléments
            ////
            async function initScene(){
                // Affichage appartememnt 
                

                // const material = new THREE.MeshBasicMaterial({map: woodTexture2})
                const material = new THREE.MeshPhysicalMaterial({
                    color: 0xebebd8,
                    // emissive: 0x000000,
                    roughness: 1,   // Transparence
                    metalness: 0.3,   // Ouai
                    clearcoat: 1,
                    clearcoatRoughness: 1,
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
                        mesh.position.set(-10, 0.01, 0)
                        mesh.rotation.x -= Math.PI/2
                        scene.add(mesh)
                    },
                )
                
                // Appart floor wood
                var woodTexture = new THREE.TextureLoader().load( './static/Texture/Floor_wood.jpg', function ( texture ) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.offset.set( 0, 0 );
                    texture.repeat.set( 2, 2 );
                });
                const wood = new THREE.Mesh(
                    new THREE.BoxGeometry(12.2, 0, 14.5),
                    new THREE.MeshBasicMaterial({map: woodTexture})
                )
                wood.position.set(12.1, 0.05, -6.3)
                scene.add(wood)

         
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
                        document.body.requestPointerLock();
                        eventBus.emit("welcome", false) // Change display
                        welcome = false     // Change car plus devant porte 
                    }
                } else {
                    // Sprint ou marche normal
                    if(keyboard[20]){
                        fpsControls.playerSpeed = 11
                    } else {
                        fpsControls.playerSpeed = 7
                    }
                    if(keyboard[80]){
                        if(isSound){
                            backgroundSound.pause()
                        } else {
                            backgroundSound.play()
                        }
                        isSound = !isSound
                    }
                    // ExitMap
                    if(keyboard[69]){
                        exitMap = !exitMap
                        eventBus.emit("openExitMap", exitMap)
                        if(exitMap){
                            document.exitPointerLock();
                        } else {
                            document.body.requestPointerLock();
                        }
                    }
                    if(keyboard[82]){
                        remote = !remote
                        console.log(remote)
                        eventBus.emit("openRemote", remote)
                        if(remote){
                            document.exitPointerLock();
                        } else {
                            document.body.requestPointerLock();
                        }
                    }
                }
            }

            ////
            // Moteur de rendu, fait les frames
            ////
            function renderFrame() {
                stats.update()

                // Ecran de chargement
                if(!ressourcesLoad){
                    // // Mouvement de la box
                    loadingScreen.box.rotation.y += 0.05
                    
                    requestAnimationFrame(renderFrame)
                    renderer.render(loadingScreen.scene, loadingScreen.camera)
                    return
                // Menu de bienvenue, devant la porte
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
                // Si ouverture tool (exitMap, ...)
                } else if(exitMap || remote){
                    // Animation
                    requestAnimationFrame(renderFrame)
                    renderer.render(scene, camera)
                    return
                } else {      
                    // On met a jour la position de la hitbox du joueur
                    hitboxPlayer.setFromCenterAndSize(camera.position, new THREE.Vector3(0.8, 2, 0.8))
                    // console.log(parseInt(camera.position.x), parseInt(camera.position.z))

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


        },
        data(){
            return {
                // Variables déclarées ici pour être envoyé en tant que props, dans un component
                player: {height: 2, canShoot: true, canJump: true, speed: 0.065, turnSpeed: Math.PI*0.02, alive: true},
                viseur: '',         // Change la couleur du viseur
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
