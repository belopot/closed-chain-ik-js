var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequireafd0;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},e.parcelRequireafd0=r);var n=r("ilwiq"),s=r("jiuw3");class i{static createButton(e,t){t&&console.error('THREE.VRButton: The "options" parameter has been removed. Please set the reference space type via renderer.xr.setReferenceSpaceType() instead.');const o=document.createElement("button");function r(){o.style.display="",o.style.cursor="auto",o.style.left="calc(50% - 75px)",o.style.width="150px",o.onmouseenter=null,o.onmouseleave=null,o.onclick=null}function n(e){e.style.position="absolute",e.style.bottom="20px",e.style.padding="12px 6px",e.style.border="1px solid #fff",e.style.borderRadius="4px",e.style.background="rgba(0,0,0,0.1)",e.style.color="#fff",e.style.font="normal 13px sans-serif",e.style.textAlign="center",e.style.opacity="0.5",e.style.outline="none",e.style.zIndex="999"}if("xr"in navigator)return o.id="VRButton",o.style.display="none",n(o),navigator.xr.isSessionSupported("immersive-vr").then((function(t){t?function(){let t=null;async function r(r){r.addEventListener("end",n),await e.xr.setSession(r),o.textContent="EXIT VR",t=r}function n(){t.removeEventListener("end",n),o.textContent="ENTER VR",t=null}o.style.display="",o.style.cursor="pointer",o.style.left="calc(50% - 50px)",o.style.width="100px",o.textContent="ENTER VR",o.onmouseenter=function(){o.style.opacity="1.0"},o.onmouseleave=function(){o.style.opacity="0.5"},o.onclick=function(){if(null===t){const e={optionalFeatures:["local-floor","bounded-floor","hand-tracking","layers"]};navigator.xr.requestSession("immersive-vr",e).then(r)}else t.end()}}():(r(),o.textContent="VR NOT SUPPORTED"),t&&i.xrSessionIsGranted&&o.click()})).catch((function(e){r(),console.warn("Exception when trying to call xr.isSessionSupported",e),o.textContent="VR NOT ALLOWED"})),o;{const e=document.createElement("a");return!1===window.isSecureContext?(e.href=document.location.href.replace(/^http:/,"https:"),e.innerHTML="WEBXR NEEDS HTTPS"):(e.href="https://immersiveweb.dev/",e.innerHTML="WEBXR NOT AVAILABLE"),e.style.left="calc(50% - 90px)",e.style.width="180px",e.style.textDecoration="none",n(e),e}}static xrSessionIsGranted=!1;static registerSessionGrantedListener(){"xr"in navigator&&navigator.xr.addEventListener("sessiongranted",(()=>{i.xrSessionIsGranted=!0}))}}i.registerSessionGrantedListener();n=r("ilwiq");var a=r("7lx9d");const l={Handedness:Object.freeze({NONE:"none",LEFT:"left",RIGHT:"right"}),ComponentState:Object.freeze({DEFAULT:"default",TOUCHED:"touched",PRESSED:"pressed"}),ComponentProperty:Object.freeze({BUTTON:"button",X_AXIS:"xAxis",Y_AXIS:"yAxis",STATE:"state"}),ComponentType:Object.freeze({TRIGGER:"trigger",SQUEEZE:"squeeze",TOUCHPAD:"touchpad",THUMBSTICK:"thumbstick",BUTTON:"button"}),ButtonTouchThreshold:.05,AxisTouchThreshold:.1,VisualResponseProperty:Object.freeze({TRANSFORM:"transform",VISIBILITY:"visibility"})};async function d(e){const t=await fetch(e);if(t.ok)return t.json();throw new Error(t.statusText)}async function u(e,t,o=null,r=!0){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No basePath supplied");const n=await async function(e){if(!e)throw new Error("No basePath supplied");return await d(`${e}/profilesList.json`)}(t);let s;if(e.profiles.some((e=>{const o=n[e];return o&&(s={profileId:e,profilePath:`${t}/${o.path}`,deprecated:!!o.deprecated}),!!s})),!s){if(!o)throw new Error("No matching profile name found");const e=n[o];if(!e)throw new Error(`No matching profile name found and default profile "${o}" missing.`);s={profileId:o,profilePath:`${t}/${e.path}`,deprecated:!!e.deprecated}}const i=await d(s.profilePath);let a;if(r){let t;if(t="any"===e.handedness?i.layouts[Object.keys(i.layouts)[0]]:i.layouts[e.handedness],!t)throw new Error(`No matching handedness, ${e.handedness}, in profile ${s.profileId}`);t.assetPath&&(a=s.profilePath.replace("profile.json",t.assetPath))}return{profile:i,assetPath:a}}const c={xAxis:0,yAxis:0,button:0,state:l.ComponentState.DEFAULT};class h{constructor(e){this.componentProperty=e.componentProperty,this.states=e.states,this.valueNodeName=e.valueNodeName,this.valueNodeProperty=e.valueNodeProperty,this.valueNodeProperty===l.VisualResponseProperty.TRANSFORM&&(this.minNodeName=e.minNodeName,this.maxNodeName=e.maxNodeName),this.value=0,this.updateFromComponent(c)}updateFromComponent({xAxis:e,yAxis:t,button:o,state:r}){const{normalizedXAxis:n,normalizedYAxis:s}=function(e=0,t=0){let o=e,r=t;if(Math.sqrt(e*e+t*t)>1){const n=Math.atan2(t,e);o=Math.cos(n),r=Math.sin(n)}return{normalizedXAxis:.5*o+.5,normalizedYAxis:.5*r+.5}}(e,t);switch(this.componentProperty){case l.ComponentProperty.X_AXIS:this.value=this.states.includes(r)?n:.5;break;case l.ComponentProperty.Y_AXIS:this.value=this.states.includes(r)?s:.5;break;case l.ComponentProperty.BUTTON:this.value=this.states.includes(r)?o:0;break;case l.ComponentProperty.STATE:this.valueNodeProperty===l.VisualResponseProperty.VISIBILITY?this.value=this.states.includes(r):this.value=this.states.includes(r)?1:0;break;default:throw new Error(`Unexpected visualResponse componentProperty ${this.componentProperty}`)}}}class p{constructor(e,t){if(!(e&&t&&t.visualResponses&&t.gamepadIndices&&0!==Object.keys(t.gamepadIndices).length))throw new Error("Invalid arguments supplied");this.id=e,this.type=t.type,this.rootNodeName=t.rootNodeName,this.touchPointNodeName=t.touchPointNodeName,this.visualResponses={},Object.keys(t.visualResponses).forEach((e=>{const o=new h(t.visualResponses[e]);this.visualResponses[e]=o})),this.gamepadIndices=Object.assign({},t.gamepadIndices),this.values={state:l.ComponentState.DEFAULT,button:void 0!==this.gamepadIndices.button?0:void 0,xAxis:void 0!==this.gamepadIndices.xAxis?0:void 0,yAxis:void 0!==this.gamepadIndices.yAxis?0:void 0}}get data(){return{id:this.id,...this.values}}updateFromGamepad(e){if(this.values.state=l.ComponentState.DEFAULT,void 0!==this.gamepadIndices.button&&e.buttons.length>this.gamepadIndices.button){const t=e.buttons[this.gamepadIndices.button];this.values.button=t.value,this.values.button=this.values.button<0?0:this.values.button,this.values.button=this.values.button>1?1:this.values.button,t.pressed||1===this.values.button?this.values.state=l.ComponentState.PRESSED:(t.touched||this.values.button>l.ButtonTouchThreshold)&&(this.values.state=l.ComponentState.TOUCHED)}void 0!==this.gamepadIndices.xAxis&&e.axes.length>this.gamepadIndices.xAxis&&(this.values.xAxis=e.axes[this.gamepadIndices.xAxis],this.values.xAxis=this.values.xAxis<-1?-1:this.values.xAxis,this.values.xAxis=this.values.xAxis>1?1:this.values.xAxis,this.values.state===l.ComponentState.DEFAULT&&Math.abs(this.values.xAxis)>l.AxisTouchThreshold&&(this.values.state=l.ComponentState.TOUCHED)),void 0!==this.gamepadIndices.yAxis&&e.axes.length>this.gamepadIndices.yAxis&&(this.values.yAxis=e.axes[this.gamepadIndices.yAxis],this.values.yAxis=this.values.yAxis<-1?-1:this.values.yAxis,this.values.yAxis=this.values.yAxis>1?1:this.values.yAxis,this.values.state===l.ComponentState.DEFAULT&&Math.abs(this.values.yAxis)>l.AxisTouchThreshold&&(this.values.state=l.ComponentState.TOUCHED)),Object.values(this.visualResponses).forEach((e=>{e.updateFromComponent(this.values)}))}}class m{constructor(e,t,o){if(!e)throw new Error("No xrInputSource supplied");if(!t)throw new Error("No profile supplied");this.xrInputSource=e,this.assetUrl=o,this.id=t.profileId,this.layoutDescription=t.layouts[e.handedness],this.components={},Object.keys(this.layoutDescription.components).forEach((e=>{const t=this.layoutDescription.components[e];this.components[e]=new p(e,t)})),this.updateFromGamepad()}get gripSpace(){return this.xrInputSource.gripSpace}get targetRaySpace(){return this.xrInputSource.targetRaySpace}get data(){const e=[];return Object.values(this.components).forEach((t=>{e.push(t.data)})),e}updateFromGamepad(){Object.values(this.components).forEach((e=>{e.updateFromGamepad(this.xrInputSource.gamepad)}))}}class f extends n.Object3D{constructor(){super(),this.motionController=null,this.envMap=null}setEnvironmentMap(e){return this.envMap==e||(this.envMap=e,this.traverse((e=>{e.isMesh&&(e.material.envMap=this.envMap,e.material.needsUpdate=!0)}))),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&(this.motionController.updateFromGamepad(),Object.values(this.motionController.components).forEach((e=>{Object.values(e.visualResponses).forEach((e=>{const{valueNode:t,minNode:o,maxNode:r,value:n,valueNodeProperty:s}=e;t&&(s===l.VisualResponseProperty.VISIBILITY?t.visible=n:s===l.VisualResponseProperty.TRANSFORM&&(t.quaternion.slerpQuaternions(o.quaternion,r.quaternion,n),t.position.lerpVectors(o.position,r.position,n)))}))})))}}function y(e,t){!function(e,t){Object.values(e.components).forEach((e=>{const{type:o,touchPointNodeName:r,visualResponses:s}=e;if(o===l.ComponentType.TOUCHPAD)if(e.touchPointNode=t.getObjectByName(r),e.touchPointNode){const t=new n.SphereGeometry(.001),o=new n.MeshBasicMaterial({color:255}),r=new n.Mesh(t,o);e.touchPointNode.add(r)}else console.warn(`Could not find touch dot, ${e.touchPointNodeName}, in touchpad component ${e.id}`);Object.values(s).forEach((e=>{const{valueNodeName:o,minNodeName:r,maxNodeName:n,valueNodeProperty:s}=e;if(s===l.VisualResponseProperty.TRANSFORM){if(e.minNode=t.getObjectByName(r),e.maxNode=t.getObjectByName(n),!e.minNode)return void console.warn(`Could not find ${r} in the model`);if(!e.maxNode)return void console.warn(`Could not find ${n} in the model`)}e.valueNode=t.getObjectByName(o),e.valueNode||console.warn(`Could not find ${o} in the model`)}))}))}(e.motionController,t),e.envMap&&t.traverse((t=>{t.isMesh&&(t.material.envMap=e.envMap,t.material.needsUpdate=!0)})),e.add(t)}class g{constructor(e=null){this.gltfLoader=e,this.path="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles",this._assetCache={},this.gltfLoader||(this.gltfLoader=new a.GLTFLoader)}createControllerModel(e){const t=new f;let o=null;return e.addEventListener("connected",(e=>{const r=e.data;"tracked-pointer"===r.targetRayMode&&r.gamepad&&u(r,this.path,"generic-trigger").then((({profile:e,assetPath:n})=>{t.motionController=new m(r,e,n);const s=this._assetCache[t.motionController.assetUrl];if(s)o=s.scene.clone(),y(t,o);else{if(!this.gltfLoader)throw new Error("GLTFLoader not set.");this.gltfLoader.setPath(""),this.gltfLoader.load(t.motionController.assetUrl,(e=>{this._assetCache[t.motionController.assetUrl]=e,o=e.scene.clone(),y(t,o)}),null,(()=>{throw new Error(`Asset ${t.motionController.assetUrl} missing or malformed.`)}))}})).catch((e=>{console.warn(e)}))})),e.addEventListener("disconnected",(()=>{t.motionController=null,t.remove(o),o=null})),t}}var w=r("6yEsn"),x=r("4CEV9"),v=r("7coGQ");function b(e){return e.buffer instanceof ArrayBuffer&&"BYTES_PER_ELEMENT"in e}class E{constructor(){const e=new Set;e.add("uuid"),this.ignoreKeys=e,this.shareTextures=!0}areEqual(e,t){const o=new Set,r=new Set,n=this.ignoreKeys,s=(e,t)=>{if(e===t)return!0;if(e&&t&&e instanceof Object&&t instanceof Object){if(r.has(e)||r.has(t))throw new Error("MaterialReducer: Material is recursive.");const i=e instanceof Element,a=t instanceof Element;if(i||a)return i===a&&e instanceof Image&&t instanceof Image&&e.src===t.src;if(e.equals)return e.equals(t);const l=b(e),d=b(t);if(l||d){if(l!==d||e.constructor!==t.constructor||e.length!==t.length)return!1;for(let o=0,r=e.length;o<r;o++)if(e[o]!==t[o])return!1;return!0}r.add(e),r.add(t),o.clear();for(const t in e)!e.hasOwnProperty(t)||e[t]instanceof Function||n.has(t)||o.add(t);for(const e in t)!t.hasOwnProperty(e)||t[e]instanceof Function||n.has(e)||o.add(e);const u=Array.from(o.values());let c=!0;for(const o in u){const r=u[o];if(!n.has(r)&&(c=s(e[r],t[r]),!c))break}return r.delete(e),r.delete(t),c}return!1};return s(e,t)}process(e){const t=[],o=[];let r=0;const n=e=>{let n=null;for(const t in o){const r=o[t];this.areEqual(e,r)&&(n=r)}if(n)return r++,n;if(o.push(e),this.shareTextures)for(const o in e){if(!e.hasOwnProperty(o))continue;const r=e[o];if(r&&r.isTexture&&r.image instanceof Image){let n=null;for(const e in t){const o=t[e];if(this.areEqual(o,r)){n=o;break}}n?e[o]=n:t.push(r)}}return e};return e.traverse((e=>{if(e.isMesh&&e.material){const t=e.material;if(Array.isArray(t))for(let e=0;e<t.length;e++)t[e]=n(t[e]);else e.material=n(t)}})),{replaced:r,retained:o.length}}}n=r("ilwiq");function A(e){let t,o,r,s=0;for(let n=0;n<e.length;++n){const i=e[n];if(i.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(void 0===t&&(t=i.array.constructor),t!==i.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(void 0===o&&(o=i.itemSize),o!==i.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(void 0===r&&(r=i.normalized),r!==i.normalized)return console.error("THREE.BufferGeometryUtils: .mergeBufferAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;s+=i.array.length}const i=new t(s);let a=0;for(let t=0;t<e.length;++t)i.set(e[t].array,a),a+=e[t].array.length;return new n.BufferAttribute(i,o,r)}const S=new((n=r("ilwiq")).Matrix4);class T extends n.SkinnedMesh{constructor(e,t,o){super(e,t),this.proxied=o}raycast(...e){const{proxied:t}=this;for(let o=0,r=t.length;o<r;o++){t[o].raycast(...e)}}updateMatrixWorld(...e){super.updateMatrixWorld(...e);const{geometry:t,matrixWorld:o,proxied:r,frustumCulled:s}=this;if(t.boundingBox||(t.boundingBox=new n.Box3),t.boundingSphere||(t.boundingSphere=new n.Sphere),s){const e=t.boundingBox;e.makeEmpty();for(let t=0,o=r.length;t<o;t++)e.expandByObject(r[t]);S.getInverse(o),e.applyMatrix4(S),e.getBoundingSphere(t.boundingSphere)}}}class M extends n.Bone{constructor(e){super(),this.proxied=e}updateMatrixWorld(){const{matrixWorld:e,proxied:t}=this;t.updateMatrixWorld(!0),e.copy(t.matrixWorld)}}class C extends n.Group{get visible(){return this.proxied.visible}set visible(e){this.proxied&&(this.proxied.visible=e)}constructor(e){if(super(),e.parent)throw new Error("ProxyBatchedMesh : Proxied root is not expected to have a parent.");e.parent=this,this.proxied=e;const t=new Map;e.updateMatrixWorld(!0),e.traverse((e=>{if(e.isMesh)if(Array.isArray(e.material)){const o=e.material,r=Boolean(e.geometry.index),s=r?e.geometry.clone().toNonIndexed():e.geometry,i=s.groups,a=s.attributes;i.forEach((s=>{const i=o[s.materialIndex];t.get(i)||t.set(i,[]);const l=new n.BufferGeometry;for(const e in a){const t=a[e],o=t.itemSize,r=new n.BufferAttribute(t.array.slice(o*s.start,o*(s.start+s.count)),t.itemSize,t.normalized);l.setAttribute(e,r)}if(r){const e=l.attributes.position.count,t=new Array(e).fill().map(((e,t)=>t));l.setIndex(t)}t.get(i).push({mesh:e,geometry:l})}))}else{const o=e.material;t.get(o)||t.set(o,[]),t.get(o).push({mesh:e,geometry:e.geometry})}})),t.forEach(((e,t)=>{const o=e.length>256?Uint16Array:Uint8Array,r=[],s=e.map(((e,t)=>{const s=e.geometry,i=new n.BufferGeometry;for(const e in s.attributes)i.setAttribute(e,s.getAttribute(e));i.setIndex(s.getIndex());const a=i.attributes.position.count,l=new Uint8Array(4*a);for(let e=0,t=l.length;e<t;e++){const t=4*e;l[t]=255,l[t+1]=0,l[t+2]=0,l[t+3]=0}i.setAttribute("skinWeight",new n.BufferAttribute(l,4,!0)),i.setAttribute("skinIndex",new n.BufferAttribute(new o(4*a).fill(t),4));const d=new M(e.mesh);return r.push(d),i})),i=new n.Skeleton(r),a=function(e,t=!1){const o=null!==e[0].index,r=new Set(Object.keys(e[0].attributes)),s=new Set(Object.keys(e[0].morphAttributes)),i={},a={},l=e[0].morphTargetsRelative,d=new n.BufferGeometry;let u=0;for(let n=0;n<e.length;++n){const c=e[n];let h=0;if(o!==(null!==c.index))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+n+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const e in c.attributes){if(!r.has(e))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+n+'. All geometries must have compatible attributes; make sure "'+e+'" attribute exists among all geometries, or in none of them.'),null;void 0===i[e]&&(i[e]=[]),i[e].push(c.attributes[e]),h++}if(h!==r.size)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+n+". Make sure all geometries have the same number of attributes."),null;if(l!==c.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+n+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const e in c.morphAttributes){if(!s.has(e))return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+n+".  .morphAttributes must be consistent throughout all geometries."),null;void 0===a[e]&&(a[e]=[]),a[e].push(c.morphAttributes[e])}if(d.userData.mergedUserData=d.userData.mergedUserData||[],d.userData.mergedUserData.push(c.userData),t){let e;if(o)e=c.index.count;else{if(void 0===c.attributes.position)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed with geometry at index "+n+". The geometry must have either an index or a position attribute"),null;e=c.attributes.position.count}d.addGroup(u,e,n),u+=e}}if(o){let t=0;const o=[];for(let r=0;r<e.length;++r){const n=e[r].index;for(let e=0;e<n.count;++e)o.push(n.getX(e)+t);t+=e[r].attributes.position.count}d.setIndex(o)}for(const e in i){const t=A(i[e]);if(!t)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+e+" attribute."),null;d.setAttribute(e,t)}for(const e in a){const t=a[e][0].length;if(0===t)break;d.morphAttributes=d.morphAttributes||{},d.morphAttributes[e]=[];for(let o=0;o<t;++o){const t=[];for(let r=0;r<a[e].length;++r)t.push(a[e][r][o]);const r=A(t);if(!r)return console.error("THREE.BufferGeometryUtils: .mergeBufferGeometries() failed while trying to merge the "+e+" morphAttribute."),null;d.morphAttributes[e].push(r)}}return d}(s),l=new Set(e.map((e=>e.mesh))),d=new T(a,t,Array.from(l));d.bind(i),d.add(...r),this.add(d)}))}updateMatrixWorld(...e){const{proxied:t}=this;return t.parent&&t.parent!==this&&console.warn("ProxyBatchedMesh : Proxy mesh is expected to not have parent."),null===t.parent&&(t.parent=this),this.updateWorldMatrix(!1,!1),t.updateMatrixWorld(...e),super.updateMatrixWorld(...e)}}const R={shadows:!0,liveRaycasting:!0,scale:1,solve:!0,displayIk:!1,displayGoals:!0,model:"ATHLETE",webworker:!0},B={useSVD:!1,maxIterations:3,divergeThreshold:.05,stallThreshold:1e-4,translationErrorClamp:.25,rotationErrorClamp:.25,translationConvergeThreshold:.001,rotationConvergeThreshold:1e-5,restPoseFactor:.025},N=new Map,I=new Map,P=[],G=[];let k,L,O,U,W,H,j,D,F,z,q,V,$,X,Q,_,Y,K,J=-1,Z=0;const ee=new n.Vector3,te=new n.Quaternion,oe=new n.Raycaster;function re(e){const t=P.indexOf(e),o=P[t];o.traverse((e=>{e.isClosure&&e.removeChild(e.child)})),P.splice(t,1);const r=N.get(o);N.delete(o),I.delete(r),$.updateStructure(),X.updateStructure(),Q.updateStructure()}function ne(){const e=window.innerWidth,t=window.innerHeight,o=e/t;L.setSize(e,t),U.aspect=o,U.updateProjectionMatrix(),X&&(X.setResolution(window.innerWidth,window.innerHeight),Q.setResolution(window.innerWidth,window.innerHeight))}function se(e=!1){let t;H.updateMatrixWorld(),oe.ray.origin.set(0,0,0).applyMatrix4(H.matrixWorld),oe.ray.direction.set(0,0,-1).transformDirection(H.matrixWorld);const o=[...G];if(o.length=o.length<P.length?o.length:P.length,t=oe.intersectObjects(o,!0),0!==t.length)return{ikLink:null,result:t[0]};if(e)return{ikLink:null,result:null};if(t=oe.intersectObjects([Y],!0),0===t.length)return{ikLink:null,result:null};const r=t[0];let n=null,s=null;return r.object.traverseAncestors((e=>{null===n&&e.isURDFLink&&(n=e,_.traverse((e=>{e.name===n.name&&(s=e)})))})),{ikLink:s,result:r}}function ie(){const e=P,t=e[J];if(_){if(z.visible=!1,q.visible=!1,t)V.getWorldPosition(ee),V.getWorldQuaternion(te),t.setPosition(ee.x,ee.y,ee.z),t.setQuaternion(te.x,te.y,te.z,te.w);else{const{result:e}=se(!R.liveRaycasting),t=H.children[0];if(t&&t.scale.setScalar(1,1,1),null===e){oe.ray.origin.set(0,0,0).applyMatrix4(H.matrixWorld),oe.ray.direction.set(0,0,-1).transformDirection(H.matrixWorld);const e=oe.intersectObject(D)[0];e&&(z.visible=!0,z.position.copy(e.point))}else t&&t.scale.setScalar(e.distance*R.scale),q.position.copy(e.point),q.visible=!0}R.solve&&($ instanceof x.WorkerSolver?($.updateFrameState(...e),$.updateSolverSettings(B),$.running||$.solve()):(Object.assign($,B),$.solve()),x.setUrdfFromIK(Y,_)),!R.displayIk&&X.parent?(O.remove(X),O.remove(Q)):R.displayIk&&!X.parent&&(O.add(X),O.add(Q))}for(;G.length<e.length;){const e=new n.Color(16763432).convertSRGBToLinear(),t=new n.Group,o=new n.Mesh(new n.SphereBufferGeometry(.01,30,30),new n.MeshBasicMaterial({color:e})),r=new n.Mesh(new n.SphereBufferGeometry(.01,30,30),new n.MeshBasicMaterial({color:e,opacity:.4,transparent:!0,depthWrite:!1,depthTest:!1}));t.add(o,r),O.add(t),G.push(t)}G.forEach((e=>{e.visible=!1,e.scale.setScalar(1/R.scale)})),e.forEach(((e,t)=>{G[t].position.set(...e.position),G[t].quaternion.set(...e.quaternion),G[t].visible=R.displayGoals})),z.scale.setScalar(1/R.scale),q.scale.setScalar(1/R.scale),W.scale.setScalar(1/R.scale),F.castShadow=R.shadows,L.render(O,U)}function ae(){if(k&&k.destroy(),!_)return;k=new s.GUI,k.width=350,k.add(R,"model",["ATHLETE","Robonaut","Curiosity","Staubli"]).onChange((e=>{let t=null;switch(e){case"ATHLETE":t=v.loadATHLETE();break;case"Robonaut":t=v.loadRobonaut();break;case"Curiosity":t=v.loadCuriosity();break;case"Staubli":t=v.loadStaubli()}de(t)})),k.add(R,"scale",.1,4,.01),k.add(R,"shadows"),k.add(R,"liveRaycasting"),k.add(R,"displayGoals").name("display goals"),k.add(R,"displayIk").name("display ik chains"),k.add(R,"webworker").onChange((e=>{e?$=new x.WorkerSolver($.roots):($.dispose(),$=new x.Solver($.roots))})),k.add({reset:()=>{let e=null;switch(R.model){case"ATHLETE":e=v.loadATHLETE();break;case"Robonaut":e=v.loadRobonaut();break;case"Curiosity":e=v.loadCuriosity();break;case"Staubli":e=v.loadStaubli()}de(e)}},"reset");const e=k.addFolder("solver");e.add(R,"solve").onChange((e=>{!e&&$ instanceof x.WorkerSolver&&$.stop()})),e.add(B,"useSVD"),e.add(B,"maxIterations").min(1).max(10).step(1).listen(),e.add(B,"divergeThreshold").min(0).max(.5).step(.01).listen(),e.add(B,"stallThreshold").min(0).max(.01).step(1e-4).listen(),e.add(B,"translationErrorClamp").min(.01).max(1).listen(),e.add(B,"rotationErrorClamp").min(.01).max(1).listen(),e.add(B,"translationConvergeThreshold").min(.001).max(.1).listen(),e.add(B,"rotationConvergeThreshold").min(1e-5).max(.01).listen(),e.add(B,"restPoseFactor").min(0).max(.25).step(.01).listen(),e.open()}function le(e){if(e.geometry&&e.geometry.dispose(),e.material){function t(e){e.dispose();for(const t in e)e[t]&&e[t].isTexture&&e[t].dispose()}Array.isArray(e.material)?e.material.forEach(t):t(e.material)}}function de(e){Y&&(Y.traverse(le),Q.traverse(le),X.traverse(le),K.traverse(le),O.remove(Y,Q,X,K)),_=null,Y=null,X=null,Q=null,P.length=0,N.clear(),I.clear(),J=-1,Z++;const t=Z;e.then((({goalMap:e,urdf:o,ik:r,helperScale:s=1})=>{if(Z!==t)return;o.traverse((e=>{if(e.castShadow=!0,e.receiveShadow=!0,e.material){function t(e){return new n.MeshPhongMaterial({map:e.map,color:e.color,normalMap:e.normalMap,normalMapType:e.normalMapType})}Array.isArray(e.material)?e.material=e.material.map(t):e.material=t(e.material)}}));(new E).process(o),o.traverse((e=>{if(e.isMesh)if(e.geometry.deleteAttribute("color"),e.geometry.index&&e.geometry.toNonIndexed(),e.geometry.attributes.uv&&!e.material.map)e.geometry.deleteAttribute("uv");else if(!e.geometry.attributes.uv&&e.material.map){const t=e.geometry.attributes.position.count;e.geometry.setAttribute("uv",new n.BufferAttribute(new Float32Array(2*t),2,!1))}})),K=new C(o),K.children.forEach((e=>{e.castShadow=!0,e.receiveShadow=!0,e.material.skinning=!0})),x.setUrdfFromIK(o,r);const i=new n.Box3;o.updateMatrixWorld(!0),i.setFromObject(o),o.position.y-=i.min.y,r.position[1]-=i.min.y,r.setMatrixNeedsUpdate(),e.forEach(((e,t)=>{t.position[1]-=i.min.y,t.setMatrixNeedsUpdate()})),r.updateMatrixWorld(!0),X=new x.IKRootsHelper(r),X.setJointScale(s),X.setResolution(window.innerWidth,window.innerHeight),X.color.set(15277667).convertSRGBToLinear(),X.setColor(X.color),Q=new x.IKRootsHelper(r),Q.setJointScale(s),Q.setResolution(window.innerWidth,window.innerHeight),Q.color.set(15277667).convertSRGBToLinear(),Q.setColor(Q.color),Q.setDrawThrough(!0),O.add(K,X,Q);const a=[];e.forEach(((e,t)=>{a.push(t),N.set(t,e),I.set(e,t)})),$=R.webworker?new x.WorkerSolver(r):new x.Solver(r),J=-1,a.forEach((e=>{e.originalPosition=[0,0,0],e.originalQuaternion=[0,0,0,1]})),_=r,Y=o,P.push(...a),ae()}))}!function(){L=new n.WebGLRenderer({antialias:!0}),L.setPixelRatio(window.devicePixelRatio),L.setSize(window.innerWidth,window.innerHeight),L.shadowMap.enabled=!0,L.shadowMap.type=n.PCFSoftShadowMap,L.outputEncoding=n.sRGBEncoding,document.body.appendChild(L.domElement),O=new n.Scene,O.background=new n.Color(1250841),W=new n.Group,W.position.z=3,O.add(W),U=new n.PerspectiveCamera(50,window.innerWidth/window.innerHeight),W.add(U),F=new n.DirectionalLight,F.position.set(5,30,15),F.castShadow=!0,F.shadow.mapSize.set(2048,2048),O.add(F);const e=new n.AmbientLight(2503224,1);O.add(e);const t=new n.GridHelper(10,10,16777215,16777215);t.material.transparent=!0,t.material.opacity=.1,t.material.depthWrite=!1,O.add(t),D=new n.Mesh(new n.PlaneBufferGeometry,new n.ShadowMaterial({color:0,opacity:.25,transparent:!0,depthWrite:!1})),D.receiveShadow=!0,D.scale.setScalar(30),D.rotation.x=-Math.PI/2,D.renderOrder=1,O.add(D),V=new n.Group,V.position.set(0,1,1),O.add(V),window.addEventListener("resize",ne);const o=new n.MeshBasicMaterial({color:16777215});z=new n.Mesh(new n.TorusBufferGeometry(.25,.02,16,100),o),z.rotation.x=Math.PI/2,z.visible=!1,O.add(z),q=new n.Mesh(new n.SphereBufferGeometry(.005,50,50),o),O.add(q),L.xr.enabled=!0,L.setAnimationLoop(ie),document.body.appendChild(i.createButton(L)),H=L.xr.getController(0),H.addEventListener("connected",(function(e){this.add(function(e){let t,o;switch(e.targetRayMode){case"tracked-pointer":return t=new n.BufferGeometry,t.setAttribute("position",new n.Float32BufferAttribute([0,0,0,0,0,-1],3)),t.setAttribute("color",new n.Float32BufferAttribute([.5,.5,.5,0,0,0],3)),o=new n.LineBasicMaterial({vertexColors:!0,blending:n.AdditiveBlending,depthWrite:!1,transparent:!0}),new n.Line(t,o);case"gaze":return t=new n.RingBufferGeometry(.02,.04,32).translate(0,0,-1),o=new n.MeshBasicMaterial({opacity:.5,transparent:!0}),new n.Mesh(t,o)}}(e.data))})),H.addEventListener("disconnected",(function(){this.remove(this.children[0])})),W.add(H);const r=new n.Vector3,s=new n.Vector3;let a=-1;H.addEventListener("selectend",(()=>{if(-1!==J){const e=P[J],t=N.get(e);t&&(t.updateMatrixWorld(),t.attachChild(e),e.setPosition(...e.originalPosition),e.setQuaternion(...e.originalQuaternion),t.detachChild(e),V.position.set(...e.position),V.quaternion.set(...e.quaternion)),s.set(...e.position),r.distanceTo(s)<.01/R.scale&&window.performance.now()-a<500&&re(e),H.remove(V),J=-1}})),H.addEventListener("selectstart",(()=>{if(!Y)return;const{ikLink:e,result:t}=se();if(r.setScalar(1/0),null===e){let e=-1;if(t&&(e=G.indexOf(t.object.parent)),J=e,-1!==e){const t=P[e];V.position.set(...t.position),V.quaternion.set(...t.quaternion),H.attach(V),r.set(...t.position),a=window.performance.now()}else-1===e&&z.visible&&(W.position.copy(z.position).addScaledVector(H.position,-1/R.scale),W.position.y=0);return}if(I.has(e)){re(I.get(e))}const o=new n.Vector4;o.copy(t.face.normal),o.w=0,o.applyMatrix4(t.object.matrixWorld);const s=w.mat4.create(),i=o.toArray();let l=[0,1,0];Math.abs(i[1])>.9&&(l=[0,0,1]),w.mat4.targetTo(s,[0,0,0],i,l);const d=new x.Joint;d.name="GoalRootJoint-"+e.name,d.setPosition(t.point.x,t.point.y,t.point.z),w.mat4.getRotation(d.quaternion,s);const u=new x.Link;d.addChild(u);const c=new x.Joint;d.name="GoalJoint-"+e.name,e.getWorldPosition(c.position),e.getWorldQuaternion(c.quaternion),c.setMatrixNeedsUpdate(),u.attachChild(c),c.makeClosure(e),e.attachChild(d),d.originalPosition=d.position.slice(),d.originalQuaternion=d.quaternion.slice(),e.detachChild(d),$.updateStructure(),X.updateStructure(),Q.updateStructure(),V.position.set(...d.position),V.quaternion.set(...d.quaternion),H.attach(V),N.set(d,e),I.set(e,d),P.push(d),J=P.length-1}));const l=new g;j=L.xr.getControllerGrip(0),j.add(l.createControllerModel(j)),W.add(j)}(),ae(),de(v.loadATHLETE());
//# sourceMappingURL=vr.747c8674.js.map
