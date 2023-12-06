<template>
        <div class="scene" ref="scene" onselectstart="return false" onmousedown="return false">
            <div class="viseur d-flex align-center justify-center">
                <div>
                    <v-img class="icon-viseur" :src="viseur"></v-img>
                </div>
            </div>
        </div>
</template>

<script>
    // ThreeJs
    import * as THREE from 'three';
    import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';      // Pour les objets 3D
    import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';      // Texture des objets 3D
    import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'     // Image 360
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';    // Pour les animation
    // Plugins
    import { eventBus } from '../../plugins/eventBus'
    // Ammo
    import Ammo from 'ammo.js';
    // Import datas
    import {sceneItems } from '../../../static/datas/Maps/426'
    import { appartParts } from '../../../static/datas/Maps/appart'
    import sounds from '../../../static/datas/sounds'


    export default {
        components: {
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
            let ressourcesLoad, loadingScreen, deathScreen
            // ThreeJs : graphic
            let scene, camera, clock, deltaTime, renderer, raycaster, tmpPos, mixers
            const canvas = this.$refs.scene                 // Canvas affiche le jeu
            //  AmmoJs : physic
            let physicsWorld, tmpTrans, rigidBodies, cbContactResult, cbContactPairResult
            let AmmoJs = null
            // Game
            let fpsControls, inventory, indexWeapon, hitboxPlayer, zombieKillArea, keyboard, previousWeapon, round, remainZombie, gameStop, clips, newRound, backgroundSound, backgroundSoundActive
            
            let player = this.player
            let score = this.score
            let isSound = this.isSound               // Parametre active son

            // Mise en place du viseur
            this.viseur = new URL('../../assets/Icons/viseur.png', import.meta.url).href

            async function initVariable(){
                // loading et death screen
                ressourcesLoad = false
                loadingScreen = deathScreen = null
                // ThreeJs : graphic
                scene = camera = clock = deltaTime = null
                renderer = new THREE.WebGLRenderer()        // Fonction de rendu
                raycaster = new THREE.Raycaster()           // Axe de tire
                tmpPos = new THREE.Vector3()
                mixers = []
                //  AmmoJs : physic
                physicsWorld = tmpTrans = cbContactResult = cbContactPairResult = null
                rigidBodies = []
                // Game
                fpsControls = null
                player = {height: 1.8, canShoot: true, canJump: true, speed: 0.065, turnSpeed: Math.PI*0.02, alive: true, weapon: 'pistolSilencer', weaponMesh: null},
                inventory = ['knife']
                indexWeapon = 1
                hitboxPlayer = null
                zombieKillArea = []             // Liste des position des zombies, avec mort si contact
                keyboard = {}                   // Liste des touches actives, ou non
                gameStop = false                    // Sert a mettre en pause le jeu
                clips = null                               // Liste des animations dispos
                newRound = null                            // Pour savoir nouvelle manches
                backgroundSound = null                     // Son de fond
                backgroundSoundActive = false
                score = 0
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
                //
                tmpTrans = new AmmoJs.btTransform();
                // Physic : Ammo
                setupPhysicsWorld()
                // Crée l'élement scene et les différents élement permettant l'affichage
                setupGraphics()
                // Prepare anim de la mort
                await initScene()
                // Setup des event clavier/souris
                setupEventHandlers()
                // Mise en place des fonction de contact
                setupContactResultCallback()
                setupContactPairResultCallback();
                // Enlève l'ecran de chargement
                ressourcesLoad = true
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
                camera.position.set(0, player.height, 0)
                camera.lookAt(0, player.height, 0)
                camera.userData.tag = 'cameraPlayer'
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
                scene.background = new THREE.Color( 0xe3e3e3 );
                // POV, class js
                fpsControls = new FirstPersonCamera(camera);

                // Hitbox pour les zones d'armes
                hitboxPlayer = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())

                // Ambient light
                let ambientLight = new THREE.AmbientLight(0xFFD8C4, 0.5)
                scene.add(ambientLight)
                // Light
                let light = new THREE.PointLight(0xfefff2, 1, 0)
                light.position.set(0, 4, 0)
                light.castShadow = true
                light.shadow.camera.near = 0.1
                light.shadow.camera.far = 25
                scene.add(light)

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

                
                // // Walls for appart
                // const appartKeys = Object.keys(appartParts);
                // // Pour chaques items
                // for (const part of appartKeys) {
                //     console.log(appartParts[part])

                //     const appartMesh = new THREE.Mesh(
                //         new THREE.BoxGeometry(
                //             appartParts[part].box.x, 
                //             appartParts[part].box.y, 
                //             appartParts[part].box.z, 
                //             ),
                //         new THREE.MeshBasicMaterial({color: appartParts[part].color, wireframe: false})
                //     )
                //     appartMesh.position.set(
                //         appartParts[part].position.x,
                //         appartParts[part].position.y,
                //         appartParts[part].position.z,
                //         )
                //     // appartMesh.rotation.x -= Math.PI / 2;
                //     appartMesh.userData.tag = "appartMesh"
                //     appartMesh.receiveShadow = true
                //     scene.add(appartMesh)
                // }


         
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
                        // Inspecter les positions des vertices
                        materielMesh.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                var geometry = child.geometry;
                                var positions = geometry.getAttribute('position').array;

                                for (var i = 0; i < positions.length; i += 3) {
                                    var x = positions[i];
                                    var y = positions[i + 1];
                                    var z = positions[i + 2];

                                    if (isNaN(x) || isNaN(y) || isNaN(z)) {
                                        console.error('NaN value found in position data');
                                        console.log('Vertex index:', i / 3);
                                        console.log('Position:', x, y, z);
                                    }
                                }
                            }
                        });
                        
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
                        console.log(materielMesh)
                        // Ajout à la scene
                        scene.add(materielMesh)
                        // //// -------------------
                        // // ------ AMMOJS SECTION
                        // let mass = 0    // Mass=0 : objet immobile
                        // let transform = new AmmoJs.btTransform()
                        // transform.setIdentity()
                        // // Position
                        // transform.setOrigin( new AmmoJs.btVector3(
                        //     sceneItem.hitBoxPosition.x,
                        //     sceneItem.hitBoxPosition.y,
                        //     sceneItem.hitBoxPosition.z
                        // ));
                        // // Rotation
                        // transform.setRotation( new AmmoJs.btQuaternion(
                        //     sceneItem.rotation.x,
                        //     sceneItem.rotation.y,
                        //     sceneItem.rotation.z,
                        //     1
                        // ));
                        // let motionState = new AmmoJs.btDefaultMotionState( transform );
                        // // Equivalent hitbox
                        // let colShape = new AmmoJs.btBoxShape( new AmmoJs.btVector3(
                        //     sceneItem.hitBox.x,
                        //     sceneItem.hitBox.y,
                        //     sceneItem.hitBox.z,
                        // ));
                        // colShape.setMargin( 0.05 );
                        // // Inertie
                        // let localInertia = new AmmoJs.btVector3( 0, 0, 0 );
                        // colShape.calculateLocalInertia( mass, localInertia );
                        // // Création de l'element physique, avec ses attributs
                        // let rbInfo = new AmmoJs.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
                        // let body = new AmmoJs.btRigidBody( rbInfo );
                        // // Ajout du body au monde physique, avec contraintes de colisions
                        // physicsWorld.addRigidBody( body );

                        // rigidBodies.push(materielMesh)
                        // materielMesh.userData.physicsBody = body
                        // body.threeObject = materielMesh

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

            // Tire au click
            function onClick(e){
                // Si jeu en pause, joueur mort, ou attente de pouvoir tirer, on fait rien
                if(gameStop || !player.alive || !player.canShoot){
                } else {

                }
            }
            function keyDown(e){
                keyboard[e.keyCode] = true
                keyUse()
            }
            function keyUp(e){
                keyboard[e.keyCode] = false
                keyUse()
            }

            function keyUse(){
                if(keyboard[27]){       // Esc, menu pause
                    if(!gameStop){
                        gameStop = true
                    } else {
                        if(!(isSound[isSound.length - 1])){
                            backgroundSound.pause()
                        }
                        gameStop = false
                        renderFrame()
                    }
                    eventBus.emit("gameStop", gameStop)
                }
                // Active le son de fond
                if(keyboard[80]){   // P
                    backgroundSoundPlay()
                }
            }


            function backgroundSoundPlay(){
                if((isSound[isSound.length - 1])){
                    if(backgroundSoundActive){
                        backgroundSound.pause()
                    } else{
                        backgroundSound.play()
                    }
                    backgroundSoundActive = !backgroundSoundActive
                }
            }


            ////
            // Contact entre 2 physicBody
            ////
            function setupContactResultCallback(){
                cbContactResult = new AmmoJs.ConcreteContactResultCallback();
                cbContactResult.addSingleResult = function(cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1){

                    let contactPoint = AmmoJs.wrapPointer( cp, AmmoJs.btManifoldPoint );
                    const distance = contactPoint.getDistance();
                    if( distance > 0 ) return;

                    let colWrapper0 = AmmoJs.wrapPointer( colObj0Wrap, AmmoJs.btCollisionObjectWrapper );
                    let rb0 = AmmoJs.castObject( colWrapper0.getCollisionObject(), AmmoJs.btRigidBody );

                    let colWrapper1 = AmmoJs.wrapPointer( colObj1Wrap, AmmoJs.btCollisionObjectWrapper );
                    let rb1 = AmmoJs.castObject( colWrapper1.getCollisionObject(), AmmoJs.btRigidBody );

                    let threeObject0 = rb0.threeObject;
                    let threeObject1 = rb1.threeObject;
                    
                    // console.log(threeObject0.userData.tag, threeObject1.userData.tag)

                    // Si la balle (dans threeObject0) touche un zombie (cible dans threeObject1)
                    if(threeObject0.userData.tag == "ammo_"+inventory[indexWeapon] && threeObject1.userData.tag == "targetItem_zombie"){
                        // Si la vie est > 0, on décremente, sinon on tue
                        if(threeObject1.userData.remainLife > 0){
                            threeObject1.userData.remainLife -= 1
                        } else if (threeObject1.userData.points) { // Zombie mort
                            // Permet de changer l'animation du zombie, et de ne pas comptabiliser plusieurs fois un zombie
                            mixers.forEach((mixer, index) => {
                                // Celui qui correspond à l'uuid du zomb touché
                                if(mixer._root.uuid == threeObject1.uuid && mixer._actions[0]._clip.name == 'Walk'){
                                    // On commence par stopper l'animation
                                    mixers.splice(index, 1)
                                    // On créé un nouveau mixer, pour ne pas avoir l'anim précédente
                                    const clip = THREE.AnimationClip.findByName(clips, 'Roll')
                                    let mixer2 = new THREE.AnimationMixer(threeObject1)
                                    let action = (mixer2.clipAction(clip))
                                    action.play()
                                    // On l'ajoute à la liste des anim, pour lancer l'animation tomber
                                    mixers.push(mixer2)
                                    // Les points sont utilisés
                                    threeObject1.userData.points = false
                                    // On enlève la balle pour pas de problème de contacts
                                    // On récupère les index physic des objects
                                    const physicAmmo = rigidBodies.findIndex((obj) => obj.uuid === threeObject0.uuid);
                                    // On enleve la partie physic de la liste
                                    rigidBodies.splice(physicAmmo, 1);
                                    // On enleve du monde physic
                                    physicsWorld.removeRigidBody(threeObject0.userData.physicsBody)
                                    // On enleve la partie graphic
                                    threeObject0.alive = false
                                    scene.remove(threeObject0)
                                    // On enlève la box3, qui sert de hitbox pour la mort du joueur
                                    zombieKillArea.forEach((zombieArea, index) => {
                                        if(zombieArea[1] == threeObject1.uuid){
                                            zombieKillArea.splice(index, 1)
                                        }
                                    })
                                    // On enlève le zombie 2.9 secondes apres
                                    let killInterval
                                    killInterval = setInterval(function(){
                                        if(!threeObject1.userData.points){
                                            // On recupere les index physic des objects
                                            const physicTarget = rigidBodies.findIndex((obj) => obj.uuid === threeObject1.uuid);
                                            // Si index > -1, c'est que les objets sont dans la liste, donc sur la scene
                                            if (physicTarget > -1) {
                                                // On enleve la partie physic de la liste
                                                rigidBodies.splice(physicTarget, 1);
                                                // On enleve du monde physic
                                                physicsWorld.removeRigidBody(threeObject1.userData.physicsBody)
                                                // On enleve la partie graphic
                                                scene.remove(threeObject1)
                                                // A la mort : 100 points
                                                score += 100
                                                eventBus.emit("scoreChange", score)
                                                // On decremente le nombre de zombie restant
                                                remainZombie = remainZombie - 1
                                                clearInterval(killInterval);
                                            }
                                        }
                                    }, 2900)
                                }
                            })
                        }
                    // Si scene, on enlève la balle (a la base, mais pour les tests on l'enlève pas)
                    } else if (threeObject0.userData.tag == "ammo_"+inventory[indexWeapon] && threeObject1.userData.tag == "sceneItem"){
                        // scene.remove(threeObject0)
                    // Si contact entre zombie et joueur : mort
                    } else if((threeObject0.userData.tag == "player_hitbox" ) || (threeObject1.userData.tag == "player_hitbox" )){
                        console.log("Joueur mort")
                    }
                }
            }
            function setupContactPairResultCallback(){

                cbContactPairResult = new AmmoJs.ConcreteContactResultCallback();
                cbContactPairResult.hasContact = false;
                cbContactPairResult.addSingleResult = function(cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1){

                    let contactPoint = AmmoJs.wrapPointer( cp, AmmoJs.btManifoldPoint );
                    const distance = contactPoint.getDistance();
                    if( distance > 0 ) return;

                    this.hasContact = true;
                }
            }


            ////
            // Moteur de rendu, fait les frames
            ////
            function renderFrame() {

                // Ecran de chargement
                if(!ressourcesLoad){
                    requestAnimationFrame(renderFrame)
                    // // Mouvement de la box
                    loadingScreen.box.rotation.y += 0.05
                    renderer.render(loadingScreen.scene, loadingScreen.camera)
                    return
                } else if(!player.alive || gameStop){
                    requestAnimationFrame(renderFrame)
                    // Mouvement de la box
                    deathScreen.camera.position.x -= 0.07

                    if(deathScreen.camera.position.x < -10) deathScreen.camera.position.x = 13
                    deathScreen.camera.position.y = Math.sin(deathScreen.camera.position.x) + 12

                    renderer.render(deathScreen.scene, deathScreen.camera)
                    // return
                } else {

                    // Marche ralentie par la lave, sprint ou marche normal
                    if(player.speed == 4){
                        fpsControls.playerSpeed = 4
                    } else if(keyboard[16]){
                        fpsControls.playerSpeed = 11
                    } else {
                        fpsControls.playerSpeed = 7
                    }
                    // AmmoJs update physics : create clock for timing
                    deltaTime = clock.getDelta();
                    updatePhysics( deltaTime );

                    renderer.render(scene, camera);
                    requestAnimationFrame(renderFrame);
                    // On met a jour la position de la hitbox du joueur
                    hitboxPlayer.setFromCenterAndSize(camera.position, new THREE.Vector3(0.8, 2, 0.8))

                    //////
                    // POV
                    //////
                    fpsControls.update(deltaTime)

                };
            }
            // AmmoJs : update la partie physic du jeu
            function updatePhysics(deltaTime){
                // Step world
                physicsWorld.stepSimulation( deltaTime, 10 );
                // Update rigid bodies
                for ( let i = 0; i < rigidBodies.length; i++ ) {
                    let objThree = rigidBodies[ i ];
                    let objAmmo = objThree.userData.physicsBody;
                    let ms = objAmmo.getMotionState();
                    // Pas capté
                    if ( ms ) {
                        ms.getWorldTransform( tmpTrans );
                        let p = tmpTrans.getOrigin();
                        let q = tmpTrans.getRotation();
                        objThree.position.set( p.x(), p.y(), p.z() );
                        objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
                    }
                    // Rotation et déplacement des zombies
                    if(rigidBodies[i].userData.tag == 'targetItem_zombie' && rigidBodies[i].userData.remainLife > 0){
                        // Position de la camera, l'endroit vers où le zombie regarde
                        let camPosX = camera.position.x
                        let camPosY = camera.position.y/2
                        let camPosZ = camera.position.z
                        rigidBodies[i].lookAt(camPosX, camPosY, camPosZ)
                        // 'Vitesse' du vecteur de direction
                        let scalingFactor = 1;
                        // Met à jour la position du zombie
                        rigidBodies[i].updateMatrixWorld();
                        let zombPosX = rigidBodies[i].matrixWorld.elements[12]  // Coord X
                        let zombPosZ = rigidBodies[i].matrixWorld.elements[14]  // Coord Z
                        // Différence entre les 2 objects
                        let diffX = camPosX - zombPosX
                        let diffZ = camPosZ - zombPosZ
                        // Distance de déplacement
                        let moveX
                        let moveZ
                        // Déplace dans une direction, en fonction de la position du zomb et de la cam
                        if(diffX > 0.1){ moveX = 0.85 } else if (diffX < -0.1){ moveX = -0.85 } else { moveX = 0 }
                        if(diffZ > 0.1){ moveZ = 0.85 } else if (diffZ < -0.1){ moveZ = -0.85 } else { moveZ = 0 }
                        // Si zombie sur la cam, on fait rien
                        if( moveX == 0 && moveZ == 0) return;
                        // Sinon vecteur dans la direction
                        let resultantImpulse = new AmmoJs.btVector3( moveX, 0 , moveZ )
                        resultantImpulse.op_mul(scalingFactor);
                        // Assignation vecteur pour déplacement
                        let physicsBody = rigidBodies[i].userData.physicsBody;
                        // Collé au sol
                        physicsBody.threeObject.position.y = 0
                        // Ajout le vecteur de déplacement
                        physicsBody.setLinearVelocity( resultantImpulse )
                        /////////////////////
                        // ---------------DéplacementBOX3
                        if(rigidBodies[i].userData.remainLife > 0){
                            const zombieArea = zombieKillArea.find((obj) => obj[1] === rigidBodies[i].uuid);
                            zombieArea[0].setFromCenterAndSize(rigidBodies[i].position, new THREE.Vector3(1, 2, 1))
                        }
                    }
                    // Rotation et déplacement de la hit box : sur la position du joueur
                    if(rigidBodies[i].userData.tag == 'player_hitbox'){
                        // Position de la camera, l'endroit vers où le zombie regarde
                        rigidBodies[i].rotation.set(
                            0,
                            camera.rotation.y,
                            0,
                        )

                        rigidBodies[i].position.set(
                            camera.position.x + 2,
                            camera.position.y,
                            camera.position.z,
                        )
                    }
                }
            };


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
                    this.input_ = new InputController();
                    this.rotation_ = new THREE.Quaternion();
                    this.translation_ = new THREE.Vector3(0, 2, 0);
                    this.phi_ = 0;
                    this.phiSpeed_ = 8;
                    this.theta_ = 0;
                    this.thetaSpeed_ = 5;
                    this.playerSpeed = 7
                    this.velocity_y = 0
                    this.playerCanJump = true
                    this.clock = new THREE.Clock()
                    this.deltaTime = null
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

                    let deltaTime = 0.0165
                    // Snike : accroupi
                    if(this.input_.key(20)){
                        this.camera_.position.y = 1
                    }
                    // Space : jump !
                    if (this.input_.key(32) && this.playerCanJump) {
                        this.playerCanJump = false
                        this.velocity_y = 100;
                        this.camera_.position.y+=(this.velocity_y/2)*deltaTime;
                    }
                    this.camera_.position.y+=this.velocity_y*deltaTime;
                    if(!this.playerCanJump){
                        this.velocity_y-=9.8*30*deltaTime;
                        if(this.camera_.position.y<=1.8){
                            this.playerCanJump = true
                            this.velocity_y=0;
                            this.camera_.position.y= 1.8;
                        }
                    }
                    const forward = new THREE.Vector3(0, 0, -1);
                    forward.applyQuaternion(this.rotation_);

                    const dir = forward.clone();

                    forward.multiplyScalar(100);
                    forward.add(this.translation_);

                    let closest = forward;
                    const result = new THREE.Vector3();
                    const ray = new THREE.Ray(this.translation_, dir);

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
                player: {height: 1.8, canShoot: true, canJump: true, speed: 0.065, turnSpeed: Math.PI*0.02, alive: true, weapon: 'pistolSilencer', weaponMesh: null},
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
/* Affichage score */
.menu-score{
    width: auto !important;
    height: auto;
    background-color: rgba(224, 224, 224, 0.557);
    border-radius: 5px;
    position:absolute;
    left:30vw;
    right: 30vw;
    color: #e8e8e8;
}
/* Affichage chargeur */
.display-component{
    position:absolute;
}
/* Animation dans la lave */
.in-lava-animation{    
    animation-name: lavaEffect;
    animation-iteration-count: infinite;
    transition: none;
    animation-duration: 3.3s;
}@keyframes lavaEffect {
  0% {
    filter: blur(0px); 
  }
  19% {
    filter: blur(5px); 
    }
  38% {
    filter: blur(1px); 
    }
  57% {
    filter: blur(7.5px); 
    }
  76% {
    filter: blur(3px); 
    }
  90% {
    filter: blur(5px);
  }
  100% { 
    filter: blur(10px);
    }
}

</style>
