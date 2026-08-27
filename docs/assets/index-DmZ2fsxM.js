(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fo="174",Go=0,Nu=1,Kt=2,Ou=0,Fu=2,Bu=1,zu=2,ku=3,Bc=4,Hu=5,Gu=6,Vu=7,Wu=1e3,Xu=1001,ju=1002,$u=1003,qu=1004,Yu=1005,Ku=1006,Zu=1007,Ju=1008,Ts=1016,Qu=1023,eh=2300,th=2301,zc="",Wt="srgb",Gi="srgb-linear",Ps="linear",Ze="srgb",Vo="300 es";let ji=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const i=r[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const i=r.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}};const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wo=1234567;const _n=Math.PI/180,Sn=180/Math.PI;function $i(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[r&255]+Pt[r>>8&255]+Pt[r>>16&255]+Pt[r>>24&255]).toLowerCase()}function Fe(n,e,t){return Math.max(e,Math.min(t,n))}function mo(n,e){return(n%e+e)%e}function rh(n,e,t,r,i){return r+(n-e)*(i-r)/(t-e)}function ih(n,e,t){return n!==e?(t-n)/(e-n):0}function xn(n,e,t){return(1-t)*n+t*e}function nh(n,e,t,r){return xn(n,e,1-Math.exp(-t*r))}function sh(n,e=1){return e-Math.abs(mo(n,e*2)-e)}function ah(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function oh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function lh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ch(n,e){return n+Math.random()*(e-n)}function uh(n){return n*(.5-Math.random())}function hh(n){n!==void 0&&(Wo=n);let e=Wo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dh(n){return n*_n}function ph(n){return n*Sn}function fh(n){return(n&n-1)===0&&n!==0}function mh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function gh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function vh(n,e,t,r,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+r)/2),u=a((e+r)/2),h=s((e-r)/2),d=a((e-r)/2),p=s((r-e)/2),g=a((r-e)/2);switch(i){case"XYX":n.set(o*u,l*h,l*d,o*c);break;case"YZY":n.set(l*d,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*d,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Di(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function kt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Dt={DEG2RAD:_n,RAD2DEG:Sn,generateUUID:$i,clamp:Fe,euclideanModulo:mo,mapLinear:rh,inverseLerp:ih,lerp:xn,damp:nh,pingpong:sh,smoothstep:ah,smootherstep:oh,randInt:lh,randFloat:ch,randFloatSpread:uh,seededRandom:hh,degToRad:dh,radToDeg:ph,isPowerOfTwo:fh,ceilPowerOfTwo:mh,floorPowerOfTwo:gh,setQuaternionFromProperEuler:vh,normalize:kt,denormalize:Di};let be=class kc{constructor(e=0,t=0){kc.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,i=e.elements;return this.x=i[0]*t+i[3]*r+i[6],this.y=i[1]*t+i[4]*r+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Fe(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Fe(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*r-a*i+e.x,this.y=s*i+a*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ne=class Hc{constructor(e,t,r,i,s,a,o,l,c){Hc.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,i,s,a,o,l,c)}set(e,t,r,i,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=r,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,i=t.elements,s=this.elements,a=r[0],o=r[3],l=r[6],c=r[1],u=r[4],h=r[7],d=r[2],p=r[5],g=r[8],v=i[0],m=i[3],f=i[6],b=i[1],x=i[4],_=i[7],S=i[2],w=i[5],T=i[8];return s[0]=a*v+o*b+l*S,s[3]=a*m+o*x+l*w,s[6]=a*f+o*_+l*T,s[1]=c*v+u*b+h*S,s[4]=c*m+u*x+h*w,s[7]=c*f+u*_+h*T,s[2]=d*v+p*b+g*S,s[5]=d*m+p*x+g*w,s[8]=d*f+p*_+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-r*s*u+r*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],r=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,p=c*s-a*l,g=t*h+r*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=h*v,e[1]=(i*c-u*r)*v,e[2]=(o*r-i*a)*v,e[3]=d*v,e[4]=(u*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=p*v,e[7]=(r*l-c*t)*v,e[8]=(a*t-r*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(r*l,r*c,-r*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(js.makeScale(e,t)),this}rotate(e){return this.premultiply(js.makeRotation(-e)),this}translate(e,t){return this.premultiply(js.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let i=0;i<9;i++)if(t[i]!==r[i])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};const js=new Ne;function Gc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Tn(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function _h(){const n=Tn("canvas");return n.style.display="block",n}const Xo={};function si(n){n in Xo||(Xo[n]=!0,console.warn(n))}function xh(n,e,t){return new Promise(function(r,i){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:i();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:r()}}setTimeout(s,t)})}function yh(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function bh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const jo=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$o=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Mh(){const n={enabled:!0,workingColorSpace:Gi,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ze&&(i.r=Rr(i.r),i.g=Rr(i.g),i.b=Rr(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ze&&(i.r=ki(i.r),i.g=ki(i.g),i.b=ki(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?Ps:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return n.define({[Gi]:{primaries:e,whitePoint:r,transfer:Ps,toXYZ:jo,fromXYZ:$o,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:r,transfer:Ze,toXYZ:jo,fromXYZ:$o,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),n}const ze=Mh();function Rr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ki(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let pi;class Sh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{pi===void 0&&(pi=Tn("canvas")),pi.width=e.width,pi.height=e.height;const r=pi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=pi}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Tn("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const i=r.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Rr(s[a]/255)*255;return r.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Rr(t[r]/255)*255):t[r]=Rr(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Th=0;class Bs{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=$i(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push($s(i[a].image)):s.push($s(i[a]))}else s=$s(i);r.url=s}return t||(e.images[this.uuid]=r),r}}function $s(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Sh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wh=0,Zt=class ws extends ji{constructor(e=ws.DEFAULT_IMAGE,t=ws.DEFAULT_MAPPING,r=1001,i=1001,s=1006,a=1008,o=1023,l=1009,c=ws.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=$i(),this.name="",this.source=new Bs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=300;Zt.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,r=0,i=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,i){return this.x=e,this.y=t,this.z=r,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*r+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*r+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*r+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*r+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,i,s;const a=e.elements,o=a[0],l=a[4],c=a[8],u=a[1],h=a[5],d=a[9],p=a[2],g=a[6],v=a[10];if(Math.abs(l-u)<.01&&Math.abs(c-p)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+p)<.1&&Math.abs(d+g)<.1&&Math.abs(o+h+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const f=(o+1)/2,b=(h+1)/2,x=(v+1)/2,_=(l+u)/4,S=(c+p)/4,w=(d+g)/4;return f>b&&f>x?f<.01?(r=0,i=.707106781,s=.707106781):(r=Math.sqrt(f),i=_/r,s=S/r):b>x?b<.01?(r=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),r=_/i,s=w/i):x<.01?(r=.707106781,i=.707106781,s=0):(s=Math.sqrt(x),r=S/s,i=w/s),this.set(r,i,s,t),this}let m=Math.sqrt((g-d)*(g-d)+(c-p)*(c-p)+(u-l)*(u-l));return Math.abs(m)<.001&&(m=1),this.x=(g-d)/m,this.y=(c-p)/m,this.z=(u-l)/m,this.w=Math.acos((o+h+v-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this.w=Fe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this.w=Fe(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Fe(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Eh extends ji{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const i={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const s=new Zt(i,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);s.flipY=!1,s.generateMipmaps=r.generateMipmaps,s.internalFormat=r.internalFormat,this.textures=[];const a=r.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Bs(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}let mr=class extends Eh{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}};class Vc extends Zt{constructor(e=null,t=1,r=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ah extends Zt{constructor(e=null,t=1,r=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Vr=class{constructor(e=0,t=0,r=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=i}static slerpFlat(e,t,r,i,s,a,o){let l=r[i+0],c=r[i+1],u=r[i+2],h=r[i+3];const d=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==d||c!==p||u!==g){let m=1-o;const f=l*d+c*p+u*g+h*v,b=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const S=Math.sqrt(x),w=Math.atan2(S,f*b);m=Math.sin(m*w)/S,o=Math.sin(o*w)/S}const _=o*b;if(l=l*m+d*_,c=c*m+p*_,u=u*m+g*_,h=h*m+v*_,m===1-o){const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,r,i,s,a){const o=r[i],l=r[i+1],c=r[i+2],u=r[i+3],h=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*h+l*p-c*d,e[t+1]=l*g+u*d+c*h-o*p,e[t+2]=c*g+u*p+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,i){return this._x=e,this._y=t,this._z=r,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(r/2),u=o(i/2),h=o(s/2),d=l(r/2),p=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"YZX":this._x=d*u*h+c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h-d*p*g;break;case"XZY":this._x=d*u*h-c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,i=Math.sin(r);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=r+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-i)*p}else if(r>o&&r>h){const p=2*Math.sqrt(1+r-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-r-h);this._w=(s-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-r-o);this._w=(a-i)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fe(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const i=Math.min(1,t/r);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=r*u+a*o+i*c-s*l,this._y=i*u+a*l+s*o-r*c,this._z=s*u+a*c+r*l-i*o,this._w=a*u-r*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+r*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=r,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*r+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=r*h+this._x*d,this._y=i*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),i=Math.sqrt(1-r),s=Math.sqrt(r);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class P{constructor(e=0,t=0,r=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6]*i,this.y=s[1]*t+s[4]*r+s[7]*i,this.z=s[2]*t+s[5]*r+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*r+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*r+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*r+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*r+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,r=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*r),u=2*(o*t-s*i),h=2*(s*r-a*t);return this.x=t+l*c+a*h-o*u,this.y=r+l*u+o*c-s*h,this.z=i+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*r+s[8]*i,this.y=s[1]*t+s[5]*r+s[9]*i,this.z=s[2]*t+s[6]*r+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Fe(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-r*l,this.z=r*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return qs.copy(this).projectOnVector(e),this.sub(qs)}reflect(e){return this.sub(qs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Fe(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,i=this.z-e.z;return t*t+r*r+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const i=Math.sin(t)*e;return this.x=i*Math.sin(r),this.y=Math.cos(t)*e,this.z=i*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qs=new P,qo=new Vr;let ft=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(cr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(cr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=cr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const s=r.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,cr):cr.fromBufferAttribute(s,a),cr.applyMatrix4(e.matrixWorld),this.expandByPoint(cr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ln.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ln.copy(r.boundingBox)),Ln.applyMatrix4(e.matrixWorld),this.union(Ln)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,cr),cr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),Un.subVectors(this.max,Qi),fi.subVectors(e.a,Qi),mi.subVectors(e.b,Qi),gi.subVectors(e.c,Qi),Ir.subVectors(mi,fi),Lr.subVectors(gi,mi),qr.subVectors(fi,gi);let t=[0,-Ir.z,Ir.y,0,-Lr.z,Lr.y,0,-qr.z,qr.y,Ir.z,0,-Ir.x,Lr.z,0,-Lr.x,qr.z,0,-qr.x,-Ir.y,Ir.x,0,-Lr.y,Lr.x,0,-qr.y,qr.x,0];return!Ys(t,fi,mi,gi,Un)||(t=[1,0,0,0,1,0,0,0,1],!Ys(t,fi,mi,gi,Un))?!1:(Dn.crossVectors(Ir,Lr),t=[Dn.x,Dn.y,Dn.z],Ys(t,fi,mi,gi,Un))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(br[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),br[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),br[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),br[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),br[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),br[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),br[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),br[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(br),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};const br=[new P,new P,new P,new P,new P,new P,new P,new P],cr=new P,Ln=new ft,fi=new P,mi=new P,gi=new P,Ir=new P,Lr=new P,qr=new P,Qi=new P,Un=new P,Dn=new P,Yr=new P;function Ys(n,e,t,r,i){for(let s=0,a=n.length-3;s<=a;s+=3){Yr.fromArray(n,s);const o=i.x*Math.abs(Yr.x)+i.y*Math.abs(Yr.y)+i.z*Math.abs(Yr.z),l=e.dot(Yr),c=t.dot(Yr),u=r.dot(Yr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ch=new ft,en=new P,Ks=new P;let xr=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Ch.setFromPoints(e).getCenter(r);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,r.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;en.subVectors(e,this.center);const t=en.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),i=(r-this.radius)*.5;this.center.addScaledVector(en,i/r),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ks.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(en.copy(e.center).add(Ks)),this.expandByPoint(en.copy(e.center).sub(Ks))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Mr=new P,Zs=new P,Nn=new P,Ur=new P,Js=new P,On=new P,Qs=new P;let En=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mr.copy(this.origin).addScaledVector(this.direction,t),Mr.distanceToSquared(e))}distanceSqToSegment(e,t,r,i){Zs.copy(e).add(t).multiplyScalar(.5),Nn.copy(t).sub(e).normalize(),Ur.copy(this.origin).sub(Zs);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Nn),o=Ur.dot(this.direction),l=-Ur.dot(Nn),c=Ur.lengthSq(),u=Math.abs(1-a*a);let h,d,p,g;if(u>0)if(h=a*l-o,d=a*o-l,g=s*u,h>=0)if(d>=-g)if(d<=g){const v=1/u;h*=v,d*=v,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return r&&r.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Zs).addScaledVector(Nn,d),p}intersectSphere(e,t){Mr.subVectors(e.center,this.origin);const r=Mr.dot(this.direction),i=Mr.dot(Mr)-r*r,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=r-a,l=r+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,i,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(r=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(r=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),r>a||s>i||((s>r||isNaN(r))&&(r=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),r>l||o>i)||((o>r||r!==r)&&(r=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(r>=0?r:i,t)}intersectsBox(e){return this.intersectBox(e,Mr)!==null}intersectTriangle(e,t,r,i,s){Js.subVectors(t,e),On.subVectors(r,e),Qs.crossVectors(Js,On);let a=this.direction.dot(Qs),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ur.subVectors(this.origin,e);const l=o*this.direction.dot(On.crossVectors(Ur,On));if(l<0)return null;const c=o*this.direction.dot(Js.cross(Ur));if(c<0||l+c>a)return null;const u=-o*Ur.dot(Qs);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},je=class Wa{constructor(e,t,r,i,s,a,o,l,c,u,h,d,p,g,v,m){Wa.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,i,s,a,o,l,c,u,h,d,p,g,v,m)}set(e,t,r,i,s,a,o,l,c,u,h,d,p,g,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=r,f[12]=i,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wa().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,i=1/vi.setFromMatrixColumn(e,0).length(),s=1/vi.setFromMatrixColumn(e,1).length(),a=1/vi.setFromMatrixColumn(e,2).length();return t[0]=r[0]*i,t[1]=r[1]*i,t[2]=r[2]*i,t[3]=0,t[4]=r[4]*s,t[5]=r[5]*s,t[6]=r[6]*s,t[7]=0,t[8]=r[8]*a,t[9]=r[9]*a,t[10]=r[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,i=e.y,s=e.z,a=Math.cos(r),o=Math.sin(r),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*h,g=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,g=c*u,v=c*h;t[0]=d+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,g=c*u,v=c*h;t[0]=d-v*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*h,g=o*u,v=o*h;t[0]=l*u,t[4]=g*c-p,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-d*h,t[8]=g*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+g,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=a*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rh,e,Ph)}lookAt(e,t,r){const i=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Dr.crossVectors(r,$t),Dr.lengthSq()===0&&(Math.abs(r.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Dr.crossVectors(r,$t)),Dr.normalize(),Fn.crossVectors($t,Dr),i[0]=Dr.x,i[4]=Fn.x,i[8]=$t.x,i[1]=Dr.y,i[5]=Fn.y,i[9]=$t.y,i[2]=Dr.z,i[6]=Fn.z,i[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,i=t.elements,s=this.elements,a=r[0],o=r[4],l=r[8],c=r[12],u=r[1],h=r[5],d=r[9],p=r[13],g=r[2],v=r[6],m=r[10],f=r[14],b=r[3],x=r[7],_=r[11],S=r[15],w=i[0],T=i[4],E=i[8],M=i[12],y=i[1],R=i[5],I=i[9],U=i[13],D=i[2],z=i[6],k=i[10],X=i[14],G=i[3],J=i[7],se=i[11],pe=i[15];return s[0]=a*w+o*y+l*D+c*G,s[4]=a*T+o*R+l*z+c*J,s[8]=a*E+o*I+l*k+c*se,s[12]=a*M+o*U+l*X+c*pe,s[1]=u*w+h*y+d*D+p*G,s[5]=u*T+h*R+d*z+p*J,s[9]=u*E+h*I+d*k+p*se,s[13]=u*M+h*U+d*X+p*pe,s[2]=g*w+v*y+m*D+f*G,s[6]=g*T+v*R+m*z+f*J,s[10]=g*E+v*I+m*k+f*se,s[14]=g*M+v*U+m*X+f*pe,s[3]=b*w+x*y+_*D+S*G,s[7]=b*T+x*R+_*z+S*J,s[11]=b*E+x*I+_*k+S*se,s[15]=b*M+x*U+_*X+S*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+s*l*h-i*c*h-s*o*d+r*c*d+i*o*p-r*l*p)+v*(+t*l*p-t*c*d+s*a*d-i*a*p+i*c*u-s*l*u)+m*(+t*c*h-t*o*p-s*a*h+r*a*p+s*o*u-r*c*u)+f*(-i*o*u-t*l*h+t*o*d+i*a*h-r*a*d+r*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],b=h*m*c-v*d*c+v*l*p-o*m*p-h*l*f+o*d*f,x=g*d*c-u*m*c-g*l*p+a*m*p+u*l*f-a*d*f,_=u*v*c-g*h*c+g*o*p-a*v*p-u*o*f+a*h*f,S=g*h*l-u*v*l-g*o*d+a*v*d+u*o*m-a*h*m,w=t*b+r*x+i*_+s*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=b*T,e[1]=(v*d*s-h*m*s-v*i*p+r*m*p+h*i*f-r*d*f)*T,e[2]=(o*m*s-v*l*s+v*i*c-r*m*c-o*i*f+r*l*f)*T,e[3]=(h*l*s-o*d*s-h*i*c+r*d*c+o*i*p-r*l*p)*T,e[4]=x*T,e[5]=(u*m*s-g*d*s+g*i*p-t*m*p-u*i*f+t*d*f)*T,e[6]=(g*l*s-a*m*s-g*i*c+t*m*c+a*i*f-t*l*f)*T,e[7]=(a*d*s-u*l*s+u*i*c-t*d*c-a*i*p+t*l*p)*T,e[8]=_*T,e[9]=(g*h*s-u*v*s-g*r*p+t*v*p+u*r*f-t*h*f)*T,e[10]=(a*v*s-g*o*s+g*r*c-t*v*c-a*r*f+t*o*f)*T,e[11]=(u*o*s-a*h*s-u*r*c+t*h*c+a*r*p-t*o*p)*T,e[12]=S*T,e[13]=(u*v*i-g*h*i+g*r*d-t*v*d-u*r*m+t*h*m)*T,e[14]=(g*o*i-a*v*i-g*r*l+t*v*l+a*r*m-t*o*m)*T,e[15]=(a*h*i-u*o*i+u*r*l-t*h*l-a*r*d+t*o*d)*T,this}scale(e){const t=this.elements,r=e.x,i=e.y,s=e.z;return t[0]*=r,t[4]*=i,t[8]*=s,t[1]*=r,t[5]*=i,t[9]*=s,t[2]*=r,t[6]*=i,t[10]*=s,t[3]*=r,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,i))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),i=Math.sin(t),s=1-r,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+r,c*o-i*l,c*l+i*o,0,c*o+i*l,u*o+r,u*l-i*a,0,c*l-i*o,u*l+i*a,s*l*l+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,i,s,a){return this.set(1,r,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,r){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,h=o+o,d=s*c,p=s*u,g=s*h,v=a*u,m=a*h,f=o*h,b=l*c,x=l*u,_=l*h,S=r.x,w=r.y,T=r.z;return i[0]=(1-(v+f))*S,i[1]=(p+_)*S,i[2]=(g-x)*S,i[3]=0,i[4]=(p-_)*w,i[5]=(1-(d+f))*w,i[6]=(m+b)*w,i[7]=0,i[8]=(g+x)*T,i[9]=(m-b)*T,i[10]=(1-(d+v))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,r){const i=this.elements;let s=vi.set(i[0],i[1],i[2]).length();const a=vi.set(i[4],i[5],i[6]).length(),o=vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],ur.copy(this);const l=1/s,c=1/a,u=1/o;return ur.elements[0]*=l,ur.elements[1]*=l,ur.elements[2]*=l,ur.elements[4]*=c,ur.elements[5]*=c,ur.elements[6]*=c,ur.elements[8]*=u,ur.elements[9]*=u,ur.elements[10]*=u,t.setFromRotationMatrix(ur),r.x=s,r.y=a,r.z=o,this}makePerspective(e,t,r,i,s,a,o=2e3){const l=this.elements,c=2*s/(t-e),u=2*s/(r-i),h=(t+e)/(t-e),d=(r+i)/(r-i);let p,g;if(o===2e3)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===2001)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,r,i,s,a,o=2e3){const l=this.elements,c=1/(t-e),u=1/(r-i),h=1/(a-s),d=(t+e)*c,p=(r+i)*u;let g,v;if(o===2e3)g=(a+s)*h,v=-2*h;else if(o===2001)g=s*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let i=0;i<16;i++)if(t[i]!==r[i])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}};const vi=new P,ur=new je,Rh=new P(0,0,0),Ph=new P(1,1,1),Dr=new P,Fn=new P,$t=new P,Yo=new je,Ko=new Vr;let Hr=class Wc{constructor(e=0,t=0,r=0,i=Wc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,i=this._order){return this._x=e,this._y=t,this._z=r,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yo,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ko.setFromEuler(this),this.setFromQuaternion(Ko,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hr.DEFAULT_ORDER="XYZ";class go{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ih=0;const Zo=new P,_i=new Vr,Sr=new je,Bn=new P,tn=new P,Lh=new P,Uh=new Vr,Jo=new P(1,0,0),Qo=new P(0,1,0),el=new P(0,0,1),tl={type:"added"},Dh={type:"removed"},xi={type:"childadded",child:null},ea={type:"childremoved",child:null};let Ft=class Es extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ih++}),this.uuid=$i(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Es.DEFAULT_UP.clone();const e=new P,t=new Hr,r=new Vr,i=new P(1,1,1);function s(){r.setFromEuler(t,!1)}function a(){t.setFromQuaternion(r,void 0,!1)}t._onChange(s),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new je},normalMatrix:{value:new Ne}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=Es.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Es.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.multiply(_i),this}rotateOnWorldAxis(e,t){return _i.setFromAxisAngle(e,t),this.quaternion.premultiply(_i),this}rotateX(e){return this.rotateOnAxis(Jo,e)}rotateY(e){return this.rotateOnAxis(Qo,e)}rotateZ(e){return this.rotateOnAxis(el,e)}translateOnAxis(e,t){return Zo.copy(e).applyQuaternion(this.quaternion),this.position.add(Zo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jo,e)}translateY(e){return this.translateOnAxis(Qo,e)}translateZ(e){return this.translateOnAxis(el,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sr.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Bn.copy(e):Bn.set(e,t,r);const i=this.parent;this.updateWorldMatrix(!0,!1),tn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sr.lookAt(tn,Bn,this.up):Sr.lookAt(Bn,tn,this.up),this.quaternion.setFromRotationMatrix(Sr),i&&(Sr.extractRotation(i.matrixWorld),_i.setFromRotationMatrix(Sr),this.quaternion.premultiply(_i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tl),xi.child=e,this.dispatchEvent(xi),xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dh),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tl),xi.child=e,this.dispatchEvent(xi),xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,i=this.children.length;r<i;r++){const s=this.children[r].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,e,Lh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,Uh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,i=t.length;r<i;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,i=t.length;r<i;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,i=t.length;r<i;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(r.geometries=o),l.length>0&&(r.materials=l),c.length>0&&(r.textures=c),u.length>0&&(r.images=u),h.length>0&&(r.shapes=h),d.length>0&&(r.skeletons=d),p.length>0&&(r.animations=p),g.length>0&&(r.nodes=g)}return r.object=i,r;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const i=e.children[r];this.add(i.clone())}return this}};Ft.DEFAULT_UP=new P(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hr=new P,Tr=new P,ta=new P,wr=new P,yi=new P,bi=new P,rl=new P,ra=new P,ia=new P,na=new P,sa=new dt,aa=new dt,oa=new dt;let fr=class Ni{constructor(e=new P,t=new P,r=new P){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,i){i.subVectors(r,t),hr.subVectors(e,t),i.cross(hr);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,r,i,s){hr.subVectors(i,t),Tr.subVectors(r,t),ta.subVectors(e,t);const a=hr.dot(hr),o=hr.dot(Tr),l=hr.dot(ta),c=Tr.dot(Tr),u=Tr.dot(ta),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-o*u)*d,g=(a*u-o*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,r,i){return this.getBarycoord(e,t,r,i,wr)===null?!1:wr.x>=0&&wr.y>=0&&wr.x+wr.y<=1}static getInterpolation(e,t,r,i,s,a,o,l){return this.getBarycoord(e,t,r,i,wr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wr.x),l.addScaledVector(a,wr.y),l.addScaledVector(o,wr.z),l)}static getInterpolatedAttribute(e,t,r,i,s,a){return sa.setScalar(0),aa.setScalar(0),oa.setScalar(0),sa.fromBufferAttribute(e,t),aa.fromBufferAttribute(e,r),oa.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(sa,s.x),a.addScaledVector(aa,s.y),a.addScaledVector(oa,s.z),a}static isFrontFacing(e,t,r,i){return hr.subVectors(r,t),Tr.subVectors(e,t),hr.cross(Tr).dot(i)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,i){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,r,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hr.subVectors(this.c,this.b),Tr.subVectors(this.a,this.b),hr.cross(Tr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ni.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,i,s){return Ni.getInterpolation(e,this.a,this.b,this.c,t,r,i,s)}containsPoint(e){return Ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,i=this.b,s=this.c;let a,o;yi.subVectors(i,r),bi.subVectors(s,r),ra.subVectors(e,r);const l=yi.dot(ra),c=bi.dot(ra);if(l<=0&&c<=0)return t.copy(r);ia.subVectors(e,i);const u=yi.dot(ia),h=bi.dot(ia);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(r).addScaledVector(yi,a);na.subVectors(e,s);const p=yi.dot(na),g=bi.dot(na);if(g>=0&&p<=g)return t.copy(s);const v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(r).addScaledVector(bi,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return rl.subVectors(s,i),o=(h-u)/(h-u+(p-g)),t.copy(i).addScaledVector(rl,o);const f=1/(m+v+d);return a=v*f,o=d*f,t.copy(r).addScaledVector(yi,a).addScaledVector(bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nr={h:0,s:0,l:0},zn={h:0,s:0,l:0};function la(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}let ue=class{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ze.toWorkingColorSpace(this,t),this}setRGB(e,t,r,i=ze.workingColorSpace){return this.r=e,this.g=t,this.b=r,ze.toWorkingColorSpace(this,i),this}setHSL(e,t,r,i=ze.workingColorSpace){if(e=mo(e,1),t=Fe(t,0,1),r=Fe(r,0,1),t===0)this.r=this.g=this.b=r;else{const s=r<=.5?r*(1+t):r+t-r*t,a=2*r-s;this.r=la(a,s,e+1/3),this.g=la(a,s,e),this.b=la(a,s,e-1/3)}return ze.toWorkingColorSpace(this,i),this}setStyle(e,t=Wt){function r(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const r=Xc[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}copyLinearToSRGB(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return ze.fromWorkingColorSpace(It.copy(this),e),Math.round(Fe(It.r*255,0,255))*65536+Math.round(Fe(It.g*255,0,255))*256+Math.round(Fe(It.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ze.workingColorSpace){ze.fromWorkingColorSpace(It.copy(this),t);const r=It.r,i=It.g,s=It.b,a=Math.max(r,i,s),o=Math.min(r,i,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case r:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-r)/h+2;break;case s:l=(r-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ze.workingColorSpace){return ze.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Wt){ze.fromWorkingColorSpace(It.copy(this),e);const t=It.r,r=It.g,i=It.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(i*255)})`}offsetHSL(e,t,r){return this.getHSL(Nr),this.setHSL(Nr.h+e,Nr.s+t,Nr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Nr),e.getHSL(zn);const r=xn(Nr.h,zn.h,t),i=xn(Nr.s,zn.s,t),s=xn(Nr.l,zn.l,t);return this.setHSL(r,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*r+s[6]*i,this.g=s[1]*t+s[4]*r+s[7]*i,this.b=s[2]*t+s[5]*r+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const It=new ue;ue.NAMES=Xc;let Nh=0,hi=class extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=$i(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(r):i&&i.isVector3&&r&&r.isVector3?i.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(r.blending=this.blending),this.side!==0&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==204&&(r.blendSrc=this.blendSrc),this.blendDst!==205&&(r.blendDst=this.blendDst),this.blendEquation!==100&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(r.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(r.textures=s),a.length>0&&(r.images=a)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const i=t.length;r=new Array(i);for(let s=0;s!==i;++s)r[s]=t[s].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}};class Wr extends hi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new P,kn=new be;let Oh=0,We=class{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[r+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)kn.fromBufferAttribute(this,t),kn.applyMatrix3(e),this.setXY(t,kn.x,kn.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Di(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=kt(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Di(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Di(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Di(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Di(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,i){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),r=kt(r,this.array),i=kt(i,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=i,this}setXYZW(e,t,r,i,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),r=kt(r,this.array),i=kt(i,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}};class jc extends We{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class $c extends We{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class qe extends We{constructor(e,t,r){super(new Float32Array(e),t,r)}}let Fh=0;const tr=new je,ca=new Ft,Mi=new P,qt=new ft,rn=new ft,Tt=new P;let Ye=class qc extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=$i(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gc(e)?$c:jc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const s=new Ne().getNormalMatrix(e);r.applyNormalMatrix(s),r.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tr.makeRotationFromQuaternion(e),this.applyMatrix4(tr),this}rotateX(e){return tr.makeRotationX(e),this.applyMatrix4(tr),this}rotateY(e){return tr.makeRotationY(e),this.applyMatrix4(tr),this}rotateZ(e){return tr.makeRotationZ(e),this.applyMatrix4(tr),this}translate(e,t,r){return tr.makeTranslation(e,t,r),this.applyMatrix4(tr),this}scale(e,t,r){return tr.makeScale(e,t,r),this.applyMatrix4(tr),this}lookAt(e){return ca.lookAt(e),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mi).negate(),this.translate(Mi.x,Mi.y,Mi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];r.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qe(r,3))}else{const r=Math.min(e.length,t.count);for(let i=0;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ft);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,i=t.length;r<i;r++){const s=t[r];qt.setFromBufferAttribute(s),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const r=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];rn.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(qt.min,rn.min),qt.expandByPoint(Tt),Tt.addVectors(qt.max,rn.max),qt.expandByPoint(Tt)):(qt.expandByPoint(rn.min),qt.expandByPoint(rn.max))}qt.getCenter(r);let i=0;for(let s=0,a=e.count;s<a;s++)Tt.fromBufferAttribute(e,s),i=Math.max(i,r.distanceToSquared(Tt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Tt.fromBufferAttribute(o,c),l&&(Mi.fromBufferAttribute(e,c),Tt.add(Mi)),i=Math.max(i,r.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new We(new Float32Array(4*r.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<r.count;E++)o[E]=new P,l[E]=new P;const c=new P,u=new P,h=new P,d=new be,p=new be,g=new be,v=new P,m=new P;function f(E,M,y){c.fromBufferAttribute(r,E),u.fromBufferAttribute(r,M),h.fromBufferAttribute(r,y),d.fromBufferAttribute(s,E),p.fromBufferAttribute(s,M),g.fromBufferAttribute(s,y),u.sub(c),h.sub(c),p.sub(d),g.sub(d);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(R),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[E].add(v),o[M].add(v),o[y].add(v),l[E].add(m),l[M].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,M=b.length;E<M;++E){const y=b[E],R=y.start,I=y.count;for(let U=R,D=R+I;U<D;U+=3)f(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new P,_=new P,S=new P,w=new P;function T(E){S.fromBufferAttribute(i,E),w.copy(S);const M=o[E];x.copy(M),x.sub(S.multiplyScalar(S.dot(M))).normalize(),_.crossVectors(w,M);const y=_.dot(l[E])<0?-1:1;a.setXYZW(E,x.x,x.y,x.z,y)}for(let E=0,M=b.length;E<M;++E){const y=b[E],R=y.start,I=y.count;for(let U=R,D=R+I;U<D;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new We(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let d=0,p=r.count;d<p;d++)r.setXYZ(d,0,0,0);const i=new P,s=new P,a=new P,o=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(r,g),l.fromBufferAttribute(r,v),c.fromBufferAttribute(r,m),o.add(u),l.add(u),c.add(u),r.setXYZ(g,o.x,o.y,o.z),r.setXYZ(v,l.x,l.y,l.z),r.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),r.setXYZ(d+0,u.x,u.y,u.z),r.setXYZ(d+1,u.x,u.y,u.z),r.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let f=0;f<u;f++)d[g++]=c[p++]}return new We(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qc,r=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,r);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,r);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const l in r){const c=r[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};const il=new je,Kr=new En,Hn=new xr,nl=new P,Gn=new P,Vn=new P,Wn=new P,ua=new P,Xn=new P,sl=new P,jn=new P;let nt=class extends Ft{constructor(e=new Ye,t=new Wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=r.length;i<s;i++){const a=r[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){const r=this.geometry,i=r.attributes.position,s=r.morphAttributes.position,a=r.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Xn.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(ua.fromBufferAttribute(h,e),a?Xn.addScaledVector(ua,u):Xn.addScaledVector(ua.sub(t),u))}t.add(Xn)}return t}raycast(e,t){const r=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Hn.copy(r.boundingSphere),Hn.applyMatrix4(s),Kr.copy(e.ray).recast(e.near),!(Hn.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(Hn,nl)===null||Kr.origin.distanceToSquared(nl)>(e.far-e.near)**2))&&(il.copy(s).invert(),Kr.copy(e.ray).applyMatrix4(il),!(r.boundingBox!==null&&Kr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,Kr)))}_computeIntersections(e,t,r){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,S=x;_<S;_+=3){const w=o.getX(_),T=o.getX(_+1),E=o.getX(_+2);i=$n(this,f,e,r,c,u,h,w,T,E),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const b=o.getX(m),x=o.getX(m+1),_=o.getX(m+2);i=$n(this,a,e,r,c,u,h,b,x,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let _=b,S=x;_<S;_+=3){const w=_,T=_+1,E=_+2;i=$n(this,f,e,r,c,u,h,w,T,E),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){const b=m,x=m+1,_=m+2;i=$n(this,a,e,r,c,u,h,b,x,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}};function Bh(n,e,t,r,i,s,a,o){let l;if(e.side===1?l=r.intersectTriangle(a,s,i,!0,o):l=r.intersectTriangle(i,s,a,e.side===0,o),l===null)return null;jn.copy(o),jn.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(jn);return c<t.near||c>t.far?null:{distance:c,point:jn.clone(),object:n}}function $n(n,e,t,r,i,s,a,o,l,c){n.getVertexPosition(o,Gn),n.getVertexPosition(l,Vn),n.getVertexPosition(c,Wn);const u=Bh(n,e,t,r,Gn,Vn,Wn,sl);if(u){const h=new P;fr.getBarycoord(sl,Gn,Vn,Wn,h),i&&(u.uv=fr.getInterpolatedAttribute(i,o,l,c,h,new be)),s&&(u.uv1=fr.getInterpolatedAttribute(s,o,l,c,h,new be)),a&&(u.normal=fr.getInterpolatedAttribute(a,o,l,c,h,new P),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new P,materialIndex:0};fr.getNormal(Gn,Vn,Wn,d.normal),u.face=d,u.barycoord=h}return u}let An=class Yc extends Ye{constructor(e=1,t=1,r=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,r,t,e,a,s,0),g("z","y","x",1,-1,r,t,-e,a,s,1),g("x","z","y",1,1,e,r,t,i,a,2),g("x","z","y",1,-1,e,r,-t,i,a,3),g("x","y","z",1,-1,e,t,r,i,s,4),g("x","y","z",-1,-1,e,t,-r,i,s,5),this.setIndex(l),this.setAttribute("position",new qe(c,3)),this.setAttribute("normal",new qe(u,3)),this.setAttribute("uv",new qe(h,2));function g(v,m,f,b,x,_,S,w,T,E,M){const y=_/T,R=S/E,I=_/2,U=S/2,D=w/2,z=T+1,k=E+1;let X=0,G=0;const J=new P;for(let se=0;se<k;se++){const pe=se*R-U;for(let ve=0;ve<z;ve++){const Le=ve*y-I;J[v]=Le*b,J[m]=pe*x,J[f]=D,c.push(J.x,J.y,J.z),J[v]=0,J[m]=0,J[f]=w>0?1:-1,u.push(J.x,J.y,J.z),h.push(ve/T),h.push(1-se/E),X+=1}}for(let se=0;se<E;se++)for(let pe=0;pe<T;pe++){const ve=d+pe+z*se,Le=d+pe+z*(se+1),$=d+(pe+1)+z*(se+1),K=d+(pe+1)+z*se;l.push(ve,Le,K),l.push(Le,$,K),G+=6}o.addGroup(p,G,M),p+=G,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Vi(n){const e={};for(const t in n){e[t]={};for(const r in n[t]){const i=n[t][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=i.clone():Array.isArray(i)?e[t][r]=i.slice():e[t][r]=i}}return e}function Ht(n){const e={};for(let t=0;t<n.length;t++){const r=Vi(n[t]);for(const i in r)e[i]=r[i]}return e}function zh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Kc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ze.workingColorSpace}const wn={clone:Vi,merge:Ht};var kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;let gt=class extends hi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kh,this.fragmentShader=Hh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=zh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const i in this.extensions)this.extensions[i]===!0&&(r[i]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}};class Zc extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Or=new P,al=new be,ol=new be;let ir=class extends Zc{constructor(e=50,t=1,r=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Sn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_n*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Sn*2*Math.atan(Math.tan(_n*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Or.x,Or.y).multiplyScalar(-e/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Or.x,Or.y).multiplyScalar(-e/Or.z)}getViewSize(e,t){return this.getViewBounds(e,al,ol),t.subVectors(ol,al)}setViewOffset(e,t,r,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(_n*.5*this.fov)/this.zoom,r=2*t,i=this.aspect*r,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*r/c,i*=a.width/l,r*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};const Si=-90,Ti=1;class Gh extends Ft{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ir(Si,Ti,e,t);i.layers=this.layers,this.add(i);const s=new ir(Si,Ti,e,t);s.layers=this.layers,this.add(s);const a=new ir(Si,Ti,e,t);a.layers=this.layers,this.add(a);const o=new ir(Si,Ti,e,t);o.layers=this.layers,this.add(o);const l=new ir(Si,Ti,e,t);l.layers=this.layers,this.add(l);const c=new ir(Si,Ti,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)r.up.set(0,1,0),r.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)r.up.set(0,-1,0),r.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,i),e.render(t,s),e.setRenderTarget(r,1,i),e.render(t,a),e.setRenderTarget(r,2,i),e.render(t,o),e.setRenderTarget(r,3,i),e.render(t,l),e.setRenderTarget(r,4,i),e.render(t,c),r.texture.generateMipmaps=v,e.setRenderTarget(r,5,i),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=g,r.texture.needsPMREMUpdate=!0}}class Jc extends Zt{constructor(e,t,r,i,s,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,r,i,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vh extends mr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},i=[r,r,r,r,r,r];this.texture=new Jc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new An(5,5,5),s=new gt({name:"CubemapFromEquirect",uniforms:Vi(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;const a=new nt(i,s),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new Gh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,r,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,r,i);e.setRenderTarget(s)}}let Xt=class extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}};const Wh={type:"move"};class ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,r),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,r),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wh)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Xt;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class Xa extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hr,this.environmentIntensity=1,this.environmentRotation=new Hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class da extends Zt{constructor(e=null,t=1,r=1,i,s,a,o,l,c=1003,u=1003,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pa=new P,Xh=new P,jh=new Ne;let pr=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,i){return this.normal.set(e,t,r),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const i=pa.subVectors(r,t).cross(Xh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(pa),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||jh.getNormalMatrix(e),i=this.coplanarPoint(pa).applyMatrix4(e),s=this.normal.applyMatrix3(r).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};const Zr=new xr,qn=new P;let zs=class{constructor(e=new pr,t=new pr,r=new pr,i=new pr,s=new pr,a=new pr){this.planes=[e,t,r,i,s,a]}set(e,t,r,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(r),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=2e3){const r=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],p=i[8],g=i[9],v=i[10],m=i[11],f=i[12],b=i[13],x=i[14],_=i[15];if(r[0].setComponents(l-s,d-c,m-p,_-f).normalize(),r[1].setComponents(l+s,d+c,m+p,_+f).normalize(),r[2].setComponents(l+a,d+u,m+g,_+b).normalize(),r[3].setComponents(l-a,d-u,m-g,_-b).normalize(),r[4].setComponents(l-o,d-h,m-v,_-x).normalize(),t===2e3)r[5].setComponents(l+o,d+h,m+v,_+x).normalize();else if(t===2001)r[5].setComponents(o,h,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zr)}intersectsSprite(e){return Zr.center.set(0,0,0),Zr.radius=.7071067811865476,Zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zr)}intersectsSphere(e){const t=this.planes,r=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(r)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const i=t[r];if(qn.x=i.normal.x>0?e.max.x:e.min.x,qn.y=i.normal.y>0?e.max.y:e.min.y,qn.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(qn)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function fa(n,e){return n-e}function $h(n,e){return n.z-e.z}function qh(n,e){return e.z-n.z}class Yh{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,r,i){const s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});const o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=r,o.index=i}reset(){this.list.length=0,this.index=0}}const Vt=new je,Kh=new ue(1,1,1),ma=new zs,Yn=new ft,Jr=new xr,nn=new P,ll=new P,Zh=new P,ga=new Yh,Lt=new nt,Kn=[];function Jh(n,e,t=0){const r=e.itemSize;if(n.isInterleavedBufferAttribute||n.array.constructor!==e.array.constructor){const i=n.count;for(let s=0;s<i;s++)for(let a=0;a<r;a++)e.setComponent(s+t,a,n.getComponent(s,a))}else e.array.set(n.array,t*r);e.needsUpdate=!0}function Qr(n,e){if(n.constructor!==e.constructor){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++)e[r]=n[r]}else{const t=Math.min(n.length,e.length);e.set(new n.constructor(n.buffer,0,t))}}class Qh extends nt{constructor(e,t,r=t*2,i){super(new Ye,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=r,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4),r=new da(t,e,e,1023,1015);this._matricesTexture=r}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Uint32Array(e*e),r=new da(t,e,e,1029,1014);this._indirectTexture=r}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);const t=new Float32Array(e*e*4).fill(1),r=new da(t,e,e,1023,1015);r.colorSpace=ze.workingColorSpace,this._colorsTexture=r}_initializeGeometry(e){const t=this.geometry,r=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(const s in e.attributes){const a=e.getAttribute(s),{array:o,itemSize:l,normalized:c}=a,u=new o.constructor(r*l),h=new We(u,l,c);t.setAttribute(s,h)}if(e.getIndex()!==null){const s=r>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new We(s,1))}this._geometryInitialized=!0}}_validateGeometry(e){const t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(const r in t.attributes){if(!e.hasAttribute(r))throw new Error(`THREE.BatchedMesh: Added geometry missing "${r}". All geometries must have consistent attributes.`);const i=e.getAttribute(r),s=t.getAttribute(r);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){const t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){const t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ft);const e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let r=0,i=t.length;r<i;r++){if(t[r].active===!1)continue;const s=t[r].geometryIndex;this.getMatrixAt(r,Vt),this.getBoundingBoxAt(s,Yn).applyMatrix4(Vt),e.union(Yn)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xr);const e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let r=0,i=t.length;r<i;r++){if(t[r].active===!1)continue;const s=t[r].geometryIndex;this.getMatrixAt(r,Vt),this.getBoundingSphereAt(s,Jr).applyMatrix4(Vt),e.union(Jr)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");const t={visible:!0,active:!0,geometryIndex:e};let r=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(fa),r=this._availableInstanceIds.shift(),this._instanceInfo[r]=t):(r=this._instanceInfo.length,this._instanceInfo.push(t));const i=this._matricesTexture;Vt.identity().toArray(i.image.data,r*16),i.needsUpdate=!0;const s=this._colorsTexture;return s&&(Kh.toArray(s.image.data,r*4),s.needsUpdate=!0),this._visibilityChanged=!0,r}addGeometry(e,t=-1,r=-1){this._initializeGeometry(e),this._validateGeometry(e);const i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;const a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=r===-1?a.count:r),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let o;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(fa),o=this._availableGeometryIds.shift(),s[o]=i):(o=this._geometryCount,this._geometryCount++,s.push(i)),this.setGeometryAt(o,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,o}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);const r=this.geometry,i=r.getIndex()!==null,s=r.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");const l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(const u in r.attributes){const h=t.getAttribute(u),d=r.getAttribute(u);Jh(h,d,l);const p=h.itemSize;for(let g=h.count,v=c;g<v;g++){const m=l+g;for(let f=0;f<p;f++)d.setComponent(m,f,0)}d.needsUpdate=!0,d.addUpdateRange(l*p,c*p)}if(i){const u=o.indexStart,h=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let d=0;d<a.count;d++)s.setX(u+d,l+a.getX(d));for(let d=a.count,p=h;d<p;d++)s.setX(u+d,l);s.needsUpdate=!0,s.addUpdateRange(u,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){const t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;const r=this._instanceInfo;for(let i=0,s=r.length;i<s;i++)r[i].active&&r[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0;const r=this._geometryInfo,i=r.map((a,o)=>o).sort((a,o)=>r[a].vertexStart-r[o].vertexStart),s=this.geometry;for(let a=0,o=r.length;a<o;a++){const l=i[a],c=r[l];if(c.active!==!1){if(s.index!==null){if(c.indexStart!==t){const{indexStart:u,vertexStart:h,reservedIndexCount:d}=c,p=s.index,g=p.array,v=e-h;for(let m=u;m<u+d;m++)g[m]=g[m]+v;p.array.copyWithin(t,u,u+d),p.addUpdateRange(t,d),c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){const{vertexStart:u,reservedVertexCount:h}=c,d=s.attributes;for(const p in d){const g=d[p],{array:v,itemSize:m}=g;v.copyWithin(e*m,u*m,(u+h)*m),g.addUpdateRange(e*m,h*m)}c.vertexStart=e}e+=c.reservedVertexCount,c.start=s.index?c.indexStart:c.vertexStart,this._nextIndexStart=s.index?c.indexStart+c.reservedIndexCount:0,this._nextVertexStart=c.vertexStart+c.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;const r=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){const s=new ft,a=r.index,o=r.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let u=l;a&&(u=a.getX(u)),s.expandByPoint(nn.fromBufferAttribute(o,u))}i.boundingBox=s}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;const r=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){const s=new xr;this.getBoundingBoxAt(e,Yn),Yn.getCenter(s.center);const a=r.index,o=r.attributes.position;let l=0;for(let c=i.start,u=i.start+i.count;c<u;c++){let h=c;a&&(h=a.getX(h)),nn.fromBufferAttribute(o,h),l=Math.max(l,s.center.distanceToSquared(nn))}s.radius=Math.sqrt(l),i.boundingSphere=s}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);const r=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),r.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);const r=this._geometryInfo[e];return t.vertexStart=r.vertexStart,t.vertexCount=r.vertexCount,t.reservedVertexCount=r.reservedVertexCount,t.indexStart=r.indexStart,t.indexCount=r.indexCount,t.reservedIndexCount=r.reservedIndexCount,t.start=r.start,t.count=r.count,t}setInstanceCount(e){const t=this._availableInstanceIds,r=this._instanceInfo;for(t.sort(fa);t[t.length-1]===r.length;)r.pop(),t.pop();if(e<r.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);const i=new Int32Array(e),s=new Int32Array(e);Qr(this._multiDrawCounts,i),Qr(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=e;const a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Qr(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Qr(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Qr(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){const r=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...r.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...r.map(a=>a.indexStart+a.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);const i=this.geometry;i.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new Ye,this._initializeGeometry(i));const s=this.geometry;i.index&&Qr(i.index.array,s.index.array);for(const a in i.attributes)Qr(i.attributes[a].array,s.attributes[a].array)}raycast(e,t){const r=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,a=this.geometry;Lt.material=this.material,Lt.geometry.index=a.index,Lt.geometry.attributes=a.attributes,Lt.geometry.boundingBox===null&&(Lt.geometry.boundingBox=new ft),Lt.geometry.boundingSphere===null&&(Lt.geometry.boundingSphere=new xr);for(let o=0,l=r.length;o<l;o++){if(!r[o].visible||!r[o].active)continue;const c=r[o].geometryIndex,u=i[c];Lt.geometry.setDrawRange(u.start,u.count),this.getMatrixAt(o,Lt.matrixWorld).premultiply(s),this.getBoundingBoxAt(c,Lt.geometry.boundingBox),this.getBoundingSphereAt(c,Lt.geometry.boundingSphere),Lt.raycast(e,Kn);for(let h=0,d=Kn.length;h<d;h++){const p=Kn[h];p.object=this,p.batchId=o,t.push(p)}Kn.length=0}Lt.material=null,Lt.geometry.index=null,Lt.geometry.attributes={},Lt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._geometryCount=e._geometryCount,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,r,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;const a=i.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=this._instanceInfo,c=this._multiDrawStarts,u=this._multiDrawCounts,h=this._geometryInfo,d=this.perObjectFrustumCulled,p=this._indirectTexture,g=p.image.data;d&&(Vt.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse).multiply(this.matrixWorld),ma.setFromProjectionMatrix(Vt,e.coordinateSystem));let v=0;if(this.sortObjects){Vt.copy(this.matrixWorld).invert(),nn.setFromMatrixPosition(r.matrixWorld).applyMatrix4(Vt),ll.set(0,0,-1).transformDirection(r.matrixWorld).transformDirection(Vt);for(let b=0,x=l.length;b<x;b++)if(l[b].visible&&l[b].active){const _=l[b].geometryIndex;this.getMatrixAt(b,Vt),this.getBoundingSphereAt(_,Jr).applyMatrix4(Vt);let S=!1;if(d&&(S=!ma.intersectsSphere(Jr)),!S){const w=h[_],T=Zh.subVectors(Jr.center,nn).dot(ll);ga.push(w.start,w.count,T,b)}}const m=ga.list,f=this.customSort;f===null?m.sort(s.transparent?qh:$h):f.call(this,m,r);for(let b=0,x=m.length;b<x;b++){const _=m[b];c[v]=_.start*o,u[v]=_.count,g[v]=_.index,v++}ga.reset()}else for(let m=0,f=l.length;m<f;m++)if(l[m].visible&&l[m].active){const b=l[m].geometryIndex;let x=!1;if(d&&(this.getMatrixAt(m,Vt),this.getBoundingSphereAt(b,Jr).applyMatrix4(Vt),x=!ma.intersectsSphere(Jr)),!x){const _=h[b];c[v]=_.start*o,u[v]=_.count,g[v]=m,v++}}p.needsUpdate=!0,this._multiDrawCount=v,this._visibilityChanged=!1}onBeforeShadow(e,t,r,i,s,a){this.onBeforeRender(e,null,i,s,a)}}let qi=class extends hi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};const Is=new P,Ls=new P,cl=new je,sn=new En,Zn=new xr,va=new P,ul=new P;class Cn extends Ft{constructor(e=new Ye,t=new qi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let i=1,s=t.count;i<s;i++)Is.fromBufferAttribute(t,i-1),Ls.fromBufferAttribute(t,i),r[i]=r[i-1],r[i]+=Is.distanceTo(Ls);e.setAttribute("lineDistance",new qe(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Zn.copy(r.boundingSphere),Zn.applyMatrix4(i),Zn.radius+=s,e.ray.intersectsSphere(Zn)===!1)return;cl.copy(i).invert(),sn.copy(e.ray).applyMatrix4(cl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=r.index,h=r.attributes.position;if(u!==null){const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,v=p-1;g<v;g+=c){const m=u.getX(g),f=u.getX(g+1),b=Jn(this,e,sn,l,m,f,g);b&&t.push(b)}if(this.isLineLoop){const g=u.getX(p-1),v=u.getX(d),m=Jn(this,e,sn,l,g,v,p-1);m&&t.push(m)}}else{const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,v=p-1;g<v;g+=c){const m=Jn(this,e,sn,l,g,g+1,g);m&&t.push(m)}if(this.isLineLoop){const g=Jn(this,e,sn,l,p-1,d,p-1);g&&t.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=r.length;i<s;i++){const a=r[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}}function Jn(n,e,t,r,i,s,a){const o=n.geometry.attributes.position;if(Is.fromBufferAttribute(o,i),Ls.fromBufferAttribute(o,s),t.distanceSqToSegment(Is,Ls,va,ul)>r)return;va.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(va);if(!(l<e.near||l>e.far))return{distance:l,point:ul.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const hl=new P,dl=new P;class Yi extends Cn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let i=0,s=t.count;i<s;i+=2)hl.fromBufferAttribute(t,i),dl.fromBufferAttribute(t,i+1),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+hl.distanceTo(dl);e.setAttribute("lineDistance",new qe(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qc extends Cn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class ed extends hi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pl=new je,ja=new En,Qn=new xr,es=new P;class eu extends Ft{constructor(e=new Ye,t=new ed){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Qn.copy(r.boundingSphere),Qn.applyMatrix4(i),Qn.radius+=s,e.ray.intersectsSphere(Qn)===!1)return;pl.copy(i).invert(),ja.copy(e.ray).applyMatrix4(pl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=r.index,u=r.attributes.position;if(c!==null){const h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,g=d;p<g;p++){const v=c.getX(p);es.fromBufferAttribute(u,v),fl(es,v,l,i,e,t,this)}}else{const h=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let p=h,g=d;p<g;p++)es.fromBufferAttribute(u,p),fl(es,p,l,i,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=r.length;i<s;i++){const a=r[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}}function fl(n,e,t,r,i,s,a){const o=ja.distanceSqToPoint(n);if(o<t){const l=new P;ja.closestPointToPoint(n,l),l.applyMatrix4(r);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class _a extends Zt{constructor(e,t,r,i,s,a,o,l,c,u,h,d){super(null,a,o,l,c,u,i,s,h,d),this.isCompressedTexture=!0,this.image={width:t,height:r},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class tu extends Zt{constructor(e,t,r,i,s,a,o,l,c,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&u===1026&&(r=1014),r===void 0&&u===1027&&(r=1020),super(null,i,s,a,o,l,u,r,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}let vo=class ru extends Ye{constructor(e=1,t=1,r=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],d=[],p=[];let g=0;const v=[],m=r/2;let f=0;b(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new qe(h,3)),this.setAttribute("normal",new qe(d,3)),this.setAttribute("uv",new qe(p,2));function b(){const _=new P,S=new P;let w=0;const T=(t-e)/r;for(let E=0;E<=s;E++){const M=[],y=E/s,R=y*(t-e)+e;for(let I=0;I<=i;I++){const U=I/i,D=U*l+o,z=Math.sin(D),k=Math.cos(D);S.x=R*z,S.y=-y*r+m,S.z=R*k,h.push(S.x,S.y,S.z),_.set(z,T,k).normalize(),d.push(_.x,_.y,_.z),p.push(U,1-y),M.push(g++)}v.push(M)}for(let E=0;E<i;E++)for(let M=0;M<s;M++){const y=v[M][E],R=v[M+1][E],I=v[M+1][E+1],U=v[M][E+1];(e>0||M!==0)&&(u.push(y,R,U),w+=3),(t>0||M!==s-1)&&(u.push(R,I,U),w+=3)}c.addGroup(f,w,0),f+=w}function x(_){const S=g,w=new be,T=new P;let E=0;const M=_===!0?e:t,y=_===!0?1:-1;for(let I=1;I<=i;I++)h.push(0,m*y,0),d.push(0,y,0),p.push(.5,.5),g++;const R=g;for(let I=0;I<=i;I++){const U=I/i*l+o,D=Math.cos(U),z=Math.sin(U);T.x=M*z,T.y=m*y,T.z=M*D,h.push(T.x,T.y,T.z),d.push(0,y,0),w.x=D*.5+.5,w.y=z*.5*y+.5,p.push(w.x,w.y),g++}for(let I=0;I<i;I++){const U=S+I,D=R+I;_===!0?u.push(D,D+1,U):u.push(D+1,D,U),E+=3}c.addGroup(f,E,_===!0?1:2),f+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ru(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};class _o extends vo{constructor(e=1,t=1,r=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,r,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new _o(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}let Rn=class iu extends Ye{constructor(e=1,t=1,r=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(r),l=Math.floor(i),c=o+1,u=l+1,h=e/o,d=t/l,p=[],g=[],v=[],m=[];for(let f=0;f<u;f++){const b=f*d-a;for(let x=0;x<c;x++){const _=x*h-s;g.push(_,-b,0),v.push(0,0,1),m.push(x/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<o;b++){const x=b+c*f,_=b+c*(f+1),S=b+1+c*(f+1),w=b+1+c*f;p.push(x,_,w),p.push(_,S,w)}this.setIndex(p),this.setAttribute("position",new qe(g,3)),this.setAttribute("normal",new qe(v,3)),this.setAttribute("uv",new qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new iu(e.width,e.height,e.widthSegments,e.heightSegments)}};class xo extends Ye{constructor(e=1,t=32,r=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new P,d=new P,p=[],g=[],v=[],m=[];for(let f=0;f<=r;f++){const b=[],x=f/r;let _=0;f===0&&a===0?_=.5/t:f===r&&l===Math.PI&&(_=-.5/t);for(let S=0;S<=t;S++){const w=S/t;h.x=-e*Math.cos(i+w*s)*Math.sin(a+x*o),h.y=e*Math.cos(a+x*o),h.z=e*Math.sin(i+w*s)*Math.sin(a+x*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),m.push(w+_,1-x),b.push(c++)}u.push(b)}for(let f=0;f<r;f++)for(let b=0;b<t;b++){const x=u[f][b+1],_=u[f][b],S=u[f+1][b],w=u[f+1][b+1];(f!==0||a>0)&&p.push(x,_,w),(f!==r-1||l<Math.PI)&&p.push(_,S,w)}this.setIndex(p),this.setAttribute("position",new qe(g,3)),this.setAttribute("normal",new qe(v,3)),this.setAttribute("uv",new qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class yo extends Ye{constructor(e=1,t=.4,r=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:i,arc:s},r=Math.floor(r),i=Math.floor(i);const a=[],o=[],l=[],c=[],u=new P,h=new P,d=new P;for(let p=0;p<=r;p++)for(let g=0;g<=i;g++){const v=g/i*s,m=p/r*Math.PI*2;h.x=(e+t*Math.cos(m))*Math.cos(v),h.y=(e+t*Math.cos(m))*Math.sin(v),h.z=t*Math.sin(m),o.push(h.x,h.y,h.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),d.subVectors(h,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(p/r)}for(let p=1;p<=r;p++)for(let g=1;g<=i;g++){const v=(i+1)*p+g-1,m=(i+1)*(p-1)+g-1,f=(i+1)*(p-1)+g,b=(i+1)*p+g;a.push(v,m,b),a.push(m,f,b)}this.setIndex(a),this.setAttribute("position",new qe(o,3)),this.setAttribute("normal",new qe(l,3)),this.setAttribute("uv",new qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ml extends Ye{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],r=new Set,i=new P,s=new P;if(e.index!==null){const a=e.attributes.position,o=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const h=l[c],d=h.start,p=h.count;for(let g=d,v=d+p;g<v;g+=3)for(let m=0;m<3;m++){const f=o.getX(g+m),b=o.getX(g+(m+1)%3);i.fromBufferAttribute(a,f),s.fromBufferAttribute(a,b),gl(i,s,r)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{const a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){const u=3*o+c,h=3*o+(c+1)%3;i.fromBufferAttribute(a,u),s.fromBufferAttribute(a,h),gl(i,s,r)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new qe(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function gl(n,e,t){const r=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(r)===!0||t.has(i)===!0?!1:(t.add(r),t.add(i),!0)}class td extends gt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rd extends hi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class id extends hi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nd extends hi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vl={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class sd{constructor(e,t,r){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}}const ad=new sd;class bo{constructor(e){this.manager=e!==void 0?e:ad,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const r=this;return new Promise(function(i,s){r.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}bo.DEFAULT_MATERIAL_NAME="__DEFAULT";class od extends bo{constructor(e){super(e)}load(e,t,r,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=vl.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=Tn("img");function l(){u(),vl.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class ld extends bo{constructor(e){super(e)}load(e,t,r,i){const s=new Zt,a=new od(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},r,i),s}}class nu extends Ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const xa=new je,_l=new P,xl=new P;class cd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zs,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;_l.setFromMatrixPosition(e.matrixWorld),t.position.copy(_l),xl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xl),t.updateMatrixWorld(),xa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(xa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Mo extends Zc{constructor(e=-1,t=1,r=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=r-e,a=r+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ud extends cd{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hd extends nu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new ud}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class dd extends nu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class pd extends ir{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class fd{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=yl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function yl(){return performance.now()}const So="\\[\\]\\.:\\/",md=new RegExp("["+So+"]","g"),To="[^"+So+"]",gd="[^"+So.replace("\\.","")+"]",vd=/((?:WC+[\/:])*)/.source.replace("WC",To),_d=/(WCOD+)?/.source.replace("WCOD",gd),xd=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",To),yd=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",To),bd=new RegExp("^"+vd+_d+xd+yd+"$"),Md=["material","materials","bones","map"];class Sd{constructor(e,t,r){const i=r||it.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const r=this._targetGroup.nCachedObjects_,i=this._bindings[r];i!==void 0&&i.getValue(e,t)}setValue(e,t){const r=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=r.length;i!==s;++i)r[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].unbind()}}let it=class Oi{constructor(e,t,r){this.path=t,this.parsedPath=r||Oi.parseTrackName(t),this.node=Oi.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,r){return e&&e.isAnimationObjectGroup?new Oi.Composite(e,t,r):new Oi(e,t,r)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(md,"")}static parseTrackName(e){const t=bd.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const r={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=r.nodeName&&r.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=r.nodeName.substring(i+1);Md.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,i),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return r}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const r=e.skeleton.getBoneByName(t);if(r!==void 0)return r}if(e.children){const r=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=r(o.children);if(l)return l}return null},i=r(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)e[t++]=r[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)r[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)r[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)r[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,r=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Oi.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let c=t.objectIndex;switch(r){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[r]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};it.Composite=Sd;it.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};it.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};it.prototype.GetterByBindingType=[it.prototype._getValue_direct,it.prototype._getValue_array,it.prototype._getValue_arrayElement,it.prototype._getValue_toArray];it.prototype.SetterByBindingTypeAndVersioning=[[it.prototype._setValue_direct,it.prototype._setValue_direct_setNeedsUpdate,it.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[it.prototype._setValue_array,it.prototype._setValue_array_setNeedsUpdate,it.prototype._setValue_array_setMatrixWorldNeedsUpdate],[it.prototype._setValue_arrayElement,it.prototype._setValue_arrayElement_setNeedsUpdate,it.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[it.prototype._setValue_fromArray,it.prototype._setValue_fromArray_setNeedsUpdate,it.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const bl=new je;class ci{constructor(e,t,r=0,i=1/0){this.ray=new En(e,t),this.near=r,this.far=i,this.camera=null,this.layers=new go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return bl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bl),this}intersectObject(e,t=!0,r=[]){return $a(e,this,r,t),r.sort(Ml),r}intersectObjects(e,t=!0,r=[]){for(let i=0,s=e.length;i<s;i++)$a(e[i],this,r,t);return r.sort(Ml),r}}function Ml(n,e){return n.distance-e.distance}function $a(n,e,t,r){let i=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(i=!1),i===!0&&r===!0){const s=n.children;for(let a=0,o=s.length;a<o;a++)$a(s[a],e,t,!0)}}const Sl=new P,ts=new P;class gr{constructor(e=new P,t=new P){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Sl.subVectors(e,this.start),ts.subVectors(this.end,this.start);const r=ts.dot(ts);let i=ts.dot(Sl)/r;return t&&(i=Fe(i,0,1)),i}closestPointToPoint(e,t,r){const i=this.closestPointToPointParameter(e,t);return this.delta(r).multiplyScalar(i).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}class qa extends Yi{constructor(e=10,t=10,r=4473924,i=8947848){r=new ue(r),i=new ue(i);const s=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,p=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);const v=d===s?r:i;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}const u=new Ye;u.setAttribute("position",new qe(l,3)),u.setAttribute("color",new qe(c,3));const h=new qi({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const rs=new ft;class Td extends Yi{constructor(e,t=16776960){const r=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new Ye;s.setIndex(new We(r,1)),s.setAttribute("position",new We(i,3)),super(s,new qi({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&rs.setFromObject(this.object),rs.isEmpty())return;const e=rs.min,t=rs.max,r=this.geometry.attributes.position,i=r.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,r.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}const Tl=new P;let is,ya;class ba extends Ft{constructor(e=new P(0,0,1),t=new P(0,0,0),r=1,i=16776960,s=r*.2,a=s*.2){super(),this.type="ArrowHelper",is===void 0&&(is=new Ye,is.setAttribute("position",new qe([0,0,0,0,1,0],3)),ya=new vo(0,.5,1,5,1),ya.translate(0,-.5,0)),this.position.copy(t),this.line=new Cn(is,new qi({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new nt(ya,new Wr({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(r,s,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Tl.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Tl,t)}}setLength(e,t=e*.2,r=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(r,t,r),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class wd extends Yi{constructor(e=1){const t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],r=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ye;i.setAttribute("position",new qe(t,3)),i.setAttribute("color",new qe(r,3));const s=new qi({vertexColors:!0,toneMapped:!1});super(i,s),this.type="AxesHelper"}setColors(e,t,r){const i=new ue,s=this.geometry.attributes.color.array;return i.set(e),i.toArray(s,0),i.toArray(s,3),i.set(t),i.toArray(s,6),i.toArray(s,9),i.set(r),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function wl(n,e,t,r){const i=Ed(r);switch(t){case 1021:return n*e;case 1024:return n*e;case 1025:return n*e*2;case 1028:return n*e/i.components*i.byteLength;case 1029:return n*e/i.components*i.byteLength;case 1030:return n*e*2/i.components*i.byteLength;case 1031:return n*e*2/i.components*i.byteLength;case 1022:return n*e*3/i.components*i.byteLength;case 1023:return n*e*4/i.components*i.byteLength;case 1033:return n*e*4/i.components*i.byteLength;case 33776:case 33777:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(n,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(n,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(n/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(n/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ed(n){switch(n){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"174"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="174");/**
* @license
* Copyright 2010-2025 Three.js Authors
* SPDX-License-Identifier: MIT
*/function su(){let n=null,e=!1,t=null,r=null;function i(s,a){t(s,a),r=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(r=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Ad(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function r(o,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){const g=h[d],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,h[d]=v)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){const v=h[p];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Id=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ld=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ud=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Od=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Fd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$d=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Zd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ep=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ip=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,np="gl_FragColor = linearToOutputTexel( gl_FragColor );",sp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ap=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,up=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,yp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ep=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ap=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Rp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ip=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Up=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,af=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,of=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,hf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,df=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ff=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_f=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,If=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Nf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Of=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ff=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$f=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Kf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,nm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,am=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,De={alphahash_fragment:Cd,alphahash_pars_fragment:Rd,alphamap_fragment:Pd,alphamap_pars_fragment:Id,alphatest_fragment:Ld,alphatest_pars_fragment:Ud,aomap_fragment:Dd,aomap_pars_fragment:Nd,batching_pars_vertex:Od,batching_vertex:Fd,begin_vertex:Bd,beginnormal_vertex:zd,bsdfs:kd,iridescence_fragment:Hd,bumpmap_pars_fragment:Gd,clipping_planes_fragment:Vd,clipping_planes_pars_fragment:Wd,clipping_planes_pars_vertex:Xd,clipping_planes_vertex:jd,color_fragment:$d,color_pars_fragment:qd,color_pars_vertex:Yd,color_vertex:Kd,common:Zd,cube_uv_reflection_fragment:Jd,defaultnormal_vertex:Qd,displacementmap_pars_vertex:ep,displacementmap_vertex:tp,emissivemap_fragment:rp,emissivemap_pars_fragment:ip,colorspace_fragment:np,colorspace_pars_fragment:sp,envmap_fragment:ap,envmap_common_pars_fragment:op,envmap_pars_fragment:lp,envmap_pars_vertex:cp,envmap_physical_pars_fragment:yp,envmap_vertex:up,fog_vertex:hp,fog_pars_vertex:dp,fog_fragment:pp,fog_pars_fragment:fp,gradientmap_pars_fragment:mp,lightmap_pars_fragment:gp,lights_lambert_fragment:vp,lights_lambert_pars_fragment:_p,lights_pars_begin:xp,lights_toon_fragment:bp,lights_toon_pars_fragment:Mp,lights_phong_fragment:Sp,lights_phong_pars_fragment:Tp,lights_physical_fragment:wp,lights_physical_pars_fragment:Ep,lights_fragment_begin:Ap,lights_fragment_maps:Cp,lights_fragment_end:Rp,logdepthbuf_fragment:Pp,logdepthbuf_pars_fragment:Ip,logdepthbuf_pars_vertex:Lp,logdepthbuf_vertex:Up,map_fragment:Dp,map_pars_fragment:Np,map_particle_fragment:Op,map_particle_pars_fragment:Fp,metalnessmap_fragment:Bp,metalnessmap_pars_fragment:zp,morphinstance_vertex:kp,morphcolor_vertex:Hp,morphnormal_vertex:Gp,morphtarget_pars_vertex:Vp,morphtarget_vertex:Wp,normal_fragment_begin:Xp,normal_fragment_maps:jp,normal_pars_fragment:$p,normal_pars_vertex:qp,normal_vertex:Yp,normalmap_pars_fragment:Kp,clearcoat_normal_fragment_begin:Zp,clearcoat_normal_fragment_maps:Jp,clearcoat_pars_fragment:Qp,iridescence_pars_fragment:ef,opaque_fragment:tf,packing:rf,premultiplied_alpha_fragment:nf,project_vertex:sf,dithering_fragment:af,dithering_pars_fragment:of,roughnessmap_fragment:lf,roughnessmap_pars_fragment:cf,shadowmap_pars_fragment:uf,shadowmap_pars_vertex:hf,shadowmap_vertex:df,shadowmask_pars_fragment:pf,skinbase_vertex:ff,skinning_pars_vertex:mf,skinning_vertex:gf,skinnormal_vertex:vf,specularmap_fragment:_f,specularmap_pars_fragment:xf,tonemapping_fragment:yf,tonemapping_pars_fragment:bf,transmission_fragment:Mf,transmission_pars_fragment:Sf,uv_pars_fragment:Tf,uv_pars_vertex:wf,uv_vertex:Ef,worldpos_vertex:Af,background_vert:Cf,background_frag:Rf,backgroundCube_vert:Pf,backgroundCube_frag:If,cube_vert:Lf,cube_frag:Uf,depth_vert:Df,depth_frag:Nf,distanceRGBA_vert:Of,distanceRGBA_frag:Ff,equirect_vert:Bf,equirect_frag:zf,linedashed_vert:kf,linedashed_frag:Hf,meshbasic_vert:Gf,meshbasic_frag:Vf,meshlambert_vert:Wf,meshlambert_frag:Xf,meshmatcap_vert:jf,meshmatcap_frag:$f,meshnormal_vert:qf,meshnormal_frag:Yf,meshphong_vert:Kf,meshphong_frag:Zf,meshphysical_vert:Jf,meshphysical_frag:Qf,meshtoon_vert:em,meshtoon_frag:tm,points_vert:rm,points_frag:im,shadow_vert:nm,shadow_frag:sm,sprite_vert:am,sprite_frag:om},ne={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},_r={basic:{uniforms:Ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:Ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ue(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:Ht([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:Ht([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:Ht([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new ue(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:Ht([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:Ht([ne.points,ne.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:Ht([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:Ht([ne.common,ne.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:Ht([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:Ht([ne.sprite,ne.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:Ht([ne.common,ne.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:Ht([ne.lights,ne.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};_r.physical={uniforms:Ht([_r.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const ns={r:0,b:0,g:0},ei=new Hr,lm=new je;function cm(n,e,t,r,i,s,a){const o=new ue(0);let l=s===!0?0:1,c,u,h=null,d=0,p=null;function g(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?t:e).get(_)),_}function v(x){let _=!1;const S=g(x);S===null?f(o,l):S&&S.isColor&&(f(S,1),_=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?r.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,a),(n.autoClear||_)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,_){const S=g(_);S&&(S.isCubeTexture||S.mapping===306)?(u===void 0&&(u=new nt(new An(1,1,1),new gt({name:"BackgroundCubeMaterial",uniforms:Vi(_r.backgroundCube.uniforms),vertexShader:_r.backgroundCube.vertexShader,fragmentShader:_r.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ei.copy(_.backgroundRotation),ei.x*=-1,ei.y*=-1,ei.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(lm.makeRotationFromEuler(ei)),u.material.toneMapped=ze.getTransfer(S.colorSpace)!==Ze,(h!==S||d!==S.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=S,d=S.version,p=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new nt(new Rn(2,2),new gt({name:"BackgroundMaterial",uniforms:Vi(_r.background.uniforms),vertexShader:_r.background.vertexShader,fragmentShader:_r.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ze.getTransfer(S.colorSpace)!==Ze,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,_){x.getRGB(ns,Kc(n)),r.buffers.color.setClear(ns.r,ns.g,ns.b,_,a)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),l=_,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,f(o,l)},render:v,addToRenderList:m,dispose:b}}function um(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),r={},i=d(null);let s=i,a=!1;function o(y,R,I,U,D){let z=!1;const k=h(U,I,R);s!==k&&(s=k,c(s.object)),z=p(y,U,I,D),z&&g(y,U,I,D),D!==null&&e.update(D,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,_(y,R,I,U),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function u(y){return n.deleteVertexArray(y)}function h(y,R,I){const U=I.wireframe===!0;let D=r[y.id];D===void 0&&(D={},r[y.id]=D);let z=D[R.id];z===void 0&&(z={},D[R.id]=z);let k=z[U];return k===void 0&&(k=d(l()),z[U]=k),k}function d(y){const R=[],I=[],U=[];for(let D=0;D<t;D++)R[D]=0,I[D]=0,U[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:I,attributeDivisors:U,object:y,attributes:{},index:null}}function p(y,R,I,U){const D=s.attributes,z=R.attributes;let k=0;const X=I.getAttributes();for(const G in X)if(X[G].location>=0){const J=D[G];let se=z[G];if(se===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(se=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(se=y.instanceColor)),J===void 0||J.attribute!==se||se&&J.data!==se.data)return!0;k++}return s.attributesNum!==k||s.index!==U}function g(y,R,I,U){const D={},z=R.attributes;let k=0;const X=I.getAttributes();for(const G in X)if(X[G].location>=0){let J=z[G];J===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(J=y.instanceColor));const se={};se.attribute=J,J&&J.data&&(se.data=J.data),D[G]=se,k++}s.attributes=D,s.attributesNum=k,s.index=U}function v(){const y=s.newAttributes;for(let R=0,I=y.length;R<I;R++)y[R]=0}function m(y){f(y,0)}function f(y,R){const I=s.newAttributes,U=s.enabledAttributes,D=s.attributeDivisors;I[y]=1,U[y]===0&&(n.enableVertexAttribArray(y),U[y]=1),D[y]!==R&&(n.vertexAttribDivisor(y,R),D[y]=R)}function b(){const y=s.newAttributes,R=s.enabledAttributes;for(let I=0,U=R.length;I<U;I++)R[I]!==y[I]&&(n.disableVertexAttribArray(I),R[I]=0)}function x(y,R,I,U,D,z,k){k===!0?n.vertexAttribIPointer(y,R,I,D,z):n.vertexAttribPointer(y,R,I,U,D,z)}function _(y,R,I,U){v();const D=U.attributes,z=I.getAttributes(),k=R.defaultAttributeValues;for(const X in z){const G=z[X];if(G.location>=0){let J=D[X];if(J===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(J=y.instanceColor)),J!==void 0){const se=J.normalized,pe=J.itemSize,ve=e.get(J);if(ve===void 0)continue;const Le=ve.buffer,$=ve.type,K=ve.bytesPerElement,de=$===n.INT||$===n.UNSIGNED_INT||J.gpuType===1013;if(J.isInterleavedBufferAttribute){const re=J.data,Me=re.stride,Ee=J.offset;if(re.isInstancedInterleavedBuffer){for(let Re=0;Re<G.locationSize;Re++)f(G.location+Re,re.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Re=0;Re<G.locationSize;Re++)m(G.location+Re);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let Re=0;Re<G.locationSize;Re++)x(G.location+Re,pe/G.locationSize,$,se,Me*K,(Ee+pe/G.locationSize*Re)*K,de)}else{if(J.isInstancedBufferAttribute){for(let re=0;re<G.locationSize;re++)f(G.location+re,J.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let re=0;re<G.locationSize;re++)m(G.location+re);n.bindBuffer(n.ARRAY_BUFFER,Le);for(let re=0;re<G.locationSize;re++)x(G.location+re,pe/G.locationSize,$,se,pe*K,pe/G.locationSize*re*K,de)}}else if(k!==void 0){const se=k[X];if(se!==void 0)switch(se.length){case 2:n.vertexAttrib2fv(G.location,se);break;case 3:n.vertexAttrib3fv(G.location,se);break;case 4:n.vertexAttrib4fv(G.location,se);break;default:n.vertexAttrib1fv(G.location,se)}}}}b()}function S(){E();for(const y in r){const R=r[y];for(const I in R){const U=R[I];for(const D in U)u(U[D].object),delete U[D];delete R[I]}delete r[y]}}function w(y){if(r[y.id]===void 0)return;const R=r[y.id];for(const I in R){const U=R[I];for(const D in U)u(U[D].object),delete U[D];delete R[I]}delete r[y.id]}function T(y){for(const R in r){const I=r[R];if(I[y.id]===void 0)continue;const U=I[y.id];for(const D in U)u(U[D].object),delete U[D];delete I[y.id]}}function E(){M(),a=!0,s!==i&&(s=i,c(s.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:M,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function hm(n,e,t){let r;function i(c){r=c}function s(c,u){n.drawArrays(r,c,u),t.update(u,r,1)}function a(c,u,h){h!==0&&(n.drawArraysInstanced(r,c,u,h),t.update(u,r,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,r,1)}function l(c,u,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],u[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(r,c,0,u,0,d,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*d[v];t.update(g,r,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function dm(n,e,t,r){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==1023&&r.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const E=T===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==1009&&r.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==1015&&!E)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=g>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:S,maxSamples:w}}function pm(n){const e=this;let t=null,r=0,i=!1,s=!1;const a=new pr,o=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||r!==0||i;return i=d,r=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=n.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:r,x=b*4;let _=f.clippingState||null;l.value=_,_=u(g,d,x,p);for(let S=0;S!==x;++S)_[S]=t[S];f.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function u(h,d,p,g){const v=h!==null?h.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const f=p+v*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,_=p;x!==v;++x,_+=4)a.copy(h[x]).applyMatrix4(b,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function fm(n){let e=new WeakMap;function t(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function r(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Vh(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:r,dispose:s}}const Bi=4,El=[.125,.215,.35,.446,.526,.582],oi=20,Ma=new Mo,Al=new ue;let Sa=null,Ta=0,wa=0,Ea=!1;const ai=(1+Math.sqrt(5))/2,wi=1/ai,Cl=[new P(-ai,wi,0),new P(ai,wi,0),new P(-wi,0,ai),new P(wi,0,ai),new P(0,ai,-wi),new P(0,ai,wi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],mm=new P;class Rl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,i=100,s={}){const{size:a=256,position:o=mm}=s;Sa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sa,Ta,wa),this._renderer.xr.enabled=Ea,e.scissorTest=!1,ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Gi,depthBuffer:!1},i=Pl(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(e,t,r);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gm(s)),this._blurMaterial=vm(s,e,t)}return i}_compileMaterial(e){const t=new nt(this._lodPlanes[0],e);this._renderer.compile(t,Ma)}_sceneToCubeUV(e,t,r,i,s){const a=new ir(90,1,t,r),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,h=c.toneMapping;c.getClearColor(Al),c.toneMapping=0,c.autoClear=!1;const d=new Wr({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),p=new nt(new An,d);let g=!1;const v=e.background;v?v.isColor&&(d.color.copy(v),e.background=null,g=!0):(d.color.copy(Al),g=!0);for(let m=0;m<6;m++){const f=m%3;f===0?(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x+l[m],s.y,s.z)):f===1?(a.up.set(0,0,o[m]),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y+l[m],s.z)):(a.up.set(0,o[m],0),a.position.set(s.x,s.y,s.z),a.lookAt(s.x,s.y,s.z+l[m]));const b=this._cubeSize;ss(i,f*b,m>2?b:0,b,b),c.setRenderTarget(i),g&&c.render(p,a),c.render(e,a)}p.geometry.dispose(),p.material.dispose(),c.toneMapping=h,c.autoClear=u,e.background=v}_textureToCubeUV(e,t){const r=this._renderer,i=e.mapping===301||e.mapping===302;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new nt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ss(t,0,0,3*l,2*l),r.setRenderTarget(t),r.render(a,Ma)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Cl[(i-s-1)%Cl.length];this._blur(e,s-1,s,a,o)}t.autoClear=r}_blur(e,t,r,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,r,i,"latitudinal",s),this._halfBlur(a,e,r,r,i,"longitudinal",s)}_halfBlur(e,t,r,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new nt(this._lodPlanes[i],c),d=c.uniforms,p=this._sizeLods[r]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*oi-1),v=s/g,m=isFinite(s)?1+Math.floor(u*v):oi;m>oi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const f=[];let b=0;for(let T=0;T<oi;++T){const E=T/v,M=Math.exp(-E*E/2);f.push(M),T===0?b+=M:T<m&&(b+=2*M)}for(let T=0;T<f.length;T++)f[T]=f[T]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-r;const _=this._sizeLods[i],S=3*_*(i>x-Bi?i-x+Bi:0),w=4*(this._cubeSize-_);ss(t,S,w,3*_,2*_),l.setRenderTarget(t),l.render(h,Ma)}}function gm(n){const e=[],t=[],r=[];let i=n;const s=n-Bi+1+El.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>n-Bi?l=El[a-n+Bi-1]:a===0&&(l=0),r.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,v=3,m=2,f=1,b=new Float32Array(v*g*p),x=new Float32Array(m*g*p),_=new Float32Array(f*g*p);for(let w=0;w<p;w++){const T=w%3*2/3-1,E=w>2?0:-1,M=[T,E,0,T+2/3,E,0,T+2/3,E+1,0,T,E,0,T+2/3,E+1,0,T,E+1,0];b.set(M,v*g*w),x.set(d,m*g*w);const y=[w,w,w,w,w,w];_.set(y,f*g*w)}const S=new Ye;S.setAttribute("position",new We(b,v)),S.setAttribute("uv",new We(x,m)),S.setAttribute("faceIndex",new We(_,f)),e.push(S),i>Bi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Pl(n,e,t){const r=new mr(n,e,t);return r.texture.mapping=306,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function ss(n,e,t,r,i){n.viewport.set(e,t,r,i),n.scissor.set(e,t,r,i)}function vm(n,e,t){const r=new Float32Array(oi),i=new P(0,1,0);return new gt({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Il(){return new gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ll(){return new gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _m(n){let e=new WeakMap,t=null;function r(o){if(o&&o.isTexture){const l=o.mapping,c=l===303||l===304,u=l===301||l===302;if(c||u){let h=e.get(o);const d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Rl(n)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&i(p)?(t===null&&(t=new Rl(n)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:a}}function xm(n){const e={};function t(r){if(e[r]!==void 0)return e[r];let i;switch(r){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(r)}return e[r]=i,i}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const i=t(r);return i===null&&si("THREE.WebGLRenderer: "+r+" extension not supported."),i}}}function ym(n,e,t,r){const i={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete i[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),r.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,g=h.attributes.position;let v=0;if(p!==null){const b=p.array;v=p.version;for(let x=0,_=b.length;x<_;x+=3){const S=b[x+0],w=b[x+1],T=b[x+2];d.push(S,w,w,T,T,S)}}else if(g!==void 0){const b=g.array;v=g.version;for(let x=0,_=b.length/3-1;x<_;x+=3){const S=x+0,w=x+1,T=x+2;d.push(S,w,w,T,T,S)}}else return;const m=new(Gc(d)?$c:jc)(d,1);m.version=v;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function bm(n,e,t){let r;function i(d){r=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,p){n.drawElements(r,p,s,d*a),t.update(p,r,1)}function c(d,p,g){g!==0&&(n.drawElementsInstanced(r,p,s,d*a,g),t.update(p,r,g))}function u(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,p,0,s,d,0,g);let v=0;for(let m=0;m<g;m++)v+=p[m];t.update(v,r,1)}function h(d,p,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(r,p,0,s,d,0,v,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*v[b];t.update(f,r,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Mm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:r}}function Sm(n,e,t){const r=new WeakMap,i=new dt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=r.get(o);if(d===void 0||d.count!==h){let p=function(){E.dispose(),r.delete(o),o.removeEventListener("dispose",p)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let S=o.attributes.position.count*_,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const T=new Float32Array(S*w*4*h),E=new Vc(T,S,w,h);E.type=1015,E.needsUpdate=!0;const M=_*4;for(let y=0;y<h;y++){const R=f[y],I=b[y],U=x[y],D=S*w*4*y;for(let z=0;z<R.count;z++){const k=z*M;g===!0&&(i.fromBufferAttribute(R,z),T[D+k+0]=i.x,T[D+k+1]=i.y,T[D+k+2]=i.z,T[D+k+3]=0),v===!0&&(i.fromBufferAttribute(I,z),T[D+k+4]=i.x,T[D+k+5]=i.y,T[D+k+6]=i.z,T[D+k+7]=0),m===!0&&(i.fromBufferAttribute(U,z),T[D+k+8]=i.x,T[D+k+9]=i.y,T[D+k+10]=i.z,T[D+k+11]=U.itemSize===4?i.w:1)}}d={count:h,texture:E,size:new be(S,w)},r.set(o,d),o.addEventListener("dispose",p)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Tm(n,e,t,r){let i=new WeakMap;function s(l){const c=r.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}const au=new Zt,Ul=new tu(1,1),ou=new Vc,lu=new Ah,cu=new Jc,Dl=[],Nl=[],Ol=new Float32Array(16),Fl=new Float32Array(9),Bl=new Float32Array(4);function Ki(n,e,t){const r=n[0];if(r<=0||r>0)return n;const i=e*t;let s=Dl[i];if(s===void 0&&(s=new Float32Array(i),Dl[i]=s),e!==0){r.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,r=n.length;t<r;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,r=e.length;t<r;t++)n[t]=e[t]}function ks(n,e){let t=Nl[e];t===void 0&&(t=new Int32Array(e),Nl[e]=t);for(let r=0;r!==e;++r)t[r]=n.allocateTextureUnit();return t}function wm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Em(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Am(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function Cm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Rm(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,r))return;Bl.set(r),n.uniformMatrix2fv(this.addr,!1,Bl),St(t,r)}}function Pm(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,r))return;Fl.set(r),n.uniformMatrix3fv(this.addr,!1,Fl),St(t,r)}}function Im(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,r))return;Ol.set(r),n.uniformMatrix4fv(this.addr,!1,Ol),St(t,r)}}function Lm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Um(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function Dm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function Nm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function Om(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function Bm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function km(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i);let s;this.type===n.SAMPLER_2D_SHADOW?(Ul.compareFunction=515,s=Ul):s=au,t.setTexture2D(e||s,i)}function Hm(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i),t.setTexture3D(e||lu,i)}function Gm(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i),t.setTextureCube(e||cu,i)}function Vm(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i),t.setTexture2DArray(e||ou,i)}function Wm(n){switch(n){case 5126:return wm;case 35664:return Em;case 35665:return Am;case 35666:return Cm;case 35674:return Rm;case 35675:return Pm;case 35676:return Im;case 5124:case 35670:return Lm;case 35667:case 35671:return Um;case 35668:case 35672:return Dm;case 35669:case 35673:return Nm;case 5125:return Om;case 36294:return Fm;case 36295:return Bm;case 36296:return zm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return Vm}}function Xm(n,e){n.uniform1fv(this.addr,e)}function jm(n,e){const t=Ki(e,this.size,2);n.uniform2fv(this.addr,t)}function $m(n,e){const t=Ki(e,this.size,3);n.uniform3fv(this.addr,t)}function qm(n,e){const t=Ki(e,this.size,4);n.uniform4fv(this.addr,t)}function Ym(n,e){const t=Ki(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Km(n,e){const t=Ki(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Zm(n,e){const t=Ki(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Jm(n,e){n.uniform1iv(this.addr,e)}function Qm(n,e){n.uniform2iv(this.addr,e)}function eg(n,e){n.uniform3iv(this.addr,e)}function tg(n,e){n.uniform4iv(this.addr,e)}function rg(n,e){n.uniform1uiv(this.addr,e)}function ig(n,e){n.uniform2uiv(this.addr,e)}function ng(n,e){n.uniform3uiv(this.addr,e)}function sg(n,e){n.uniform4uiv(this.addr,e)}function ag(n,e,t){const r=this.cache,i=e.length,s=ks(t,i);Mt(r,s)||(n.uniform1iv(this.addr,s),St(r,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||au,s[a])}function og(n,e,t){const r=this.cache,i=e.length,s=ks(t,i);Mt(r,s)||(n.uniform1iv(this.addr,s),St(r,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||lu,s[a])}function lg(n,e,t){const r=this.cache,i=e.length,s=ks(t,i);Mt(r,s)||(n.uniform1iv(this.addr,s),St(r,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||cu,s[a])}function cg(n,e,t){const r=this.cache,i=e.length,s=ks(t,i);Mt(r,s)||(n.uniform1iv(this.addr,s),St(r,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||ou,s[a])}function ug(n){switch(n){case 5126:return Xm;case 35664:return jm;case 35665:return $m;case 35666:return qm;case 35674:return Ym;case 35675:return Km;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return Qm;case 35668:case 35672:return eg;case 35669:case 35673:return tg;case 5125:return rg;case 36294:return ig;case 36295:return ng;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return ag;case 35679:case 36299:case 36307:return og;case 35680:case 36300:case 36308:case 36293:return lg;case 36289:case 36303:case 36311:case 36292:return cg}}class hg{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=Wm(t.type)}}class dg{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ug(t.type)}}class pg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],r)}}}const Aa=/(\w+)(\])?(\[|\.)?/g;function zl(n,e){n.seq.push(e),n.map[e.id]=e}function fg(n,e,t){const r=n.name,i=r.length;for(Aa.lastIndex=0;;){const s=Aa.exec(r),a=Aa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){zl(t,c===void 0?new hg(o,n,e):new dg(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new pg(o),zl(t,u)),t=u}}}let As=class{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<r;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);fg(s,a,this)}}setValue(e,t,r,i){const s=this.map[t];s!==void 0&&s.setValue(e,r,i)}setOptional(e,t,r){const i=t[r];i!==void 0&&this.setValue(e,r,i)}static upload(e,t,r,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=r[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const r=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&r.push(a)}return r}};function kl(n,e,t){const r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),r}const mg=37297;let gg=0;function vg(n,e){const t=n.split(`
`),r=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;r.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return r.join(`
`)}const Hl=new Ne;function _g(n){ze._getMatrix(Hl,ze.workingColorSpace,n);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(ze.getTransfer(n)){case Ps:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gl(n,e,t){const r=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(r&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+vg(n.getShaderSource(e),a)}else return i}function xg(n,e){const t=_g(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function yg(n,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const as=new P;function bg(){ze.getLuminanceCoefficients(as);const n=as.x.toFixed(4),e=as.y.toFixed(4),t=as.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gn).join(`
`)}function Sg(n){const e=[];for(const t in n){const r=n[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function Tg(n,e){const t={},r=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){const s=n.getActiveAttrib(e,i),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function gn(n){return n!==""}function Vl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const wg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ya(n){return n.replace(wg,Ag)}const Eg=new Map;function Ag(n,e){let t=De[e];if(t===void 0){const r=Eg.get(e);if(r!==void 0)t=De[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Ya(t)}const Cg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(n){return n.replace(Cg,Rg)}function Rg(n,e,t,r){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=r.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function jl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Pg(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function Ig(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lg(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function Ug(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function Dg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function Ng(n,e,t,r){const i=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Pg(t),c=Ig(t),u=Lg(t),h=Ug(t),d=Dg(t),p=Mg(t),g=Sg(s),v=i.createProgram();let m,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(gn).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(gn).join(`
`),f.length>0&&(f+=`
`)):(m=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gn).join(`
`),f=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?De.tonemapping_pars_fragment:"",t.toneMapping!==0?yg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,xg("linearToOutputTexel",t.outputColorSpace),bg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gn).join(`
`)),a=Ya(a),a=Vl(a,t),a=Wl(a,t),o=Ya(o),o=Vl(o,t),o=Wl(o,t),a=Xl(a),o=Xl(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Vo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=b+m+a,_=b+f+o,S=kl(i,i.VERTEX_SHADER,x),w=kl(i,i.FRAGMENT_SHADER,_);i.attachShader(v,S),i.attachShader(v,w),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function T(R){if(n.debug.checkShaderErrors){const I=i.getProgramInfoLog(v).trim(),U=i.getShaderInfoLog(S).trim(),D=i.getShaderInfoLog(w).trim();let z=!0,k=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,v,S,w);else{const X=Gl(i,S,"vertex"),G=Gl(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+X+`
`+G)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(U===""||D==="")&&(k=!1);k&&(R.diagnostics={runnable:z,programLog:I,vertexShader:{log:U,prefix:m},fragmentShader:{log:D,prefix:f}})}i.deleteShader(S),i.deleteShader(w),E=new As(i,v),M=Tg(i,v)}let E;this.getUniforms=function(){return E===void 0&&T(this),E};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(v,mg)),y},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=w,this}let Og=0;class Fg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(r),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new Bg(e),t.set(e,r)),r}}class Bg{constructor(e){this.id=Og++,this.code=e,this.usedTimes=0}}function zg(n,e,t,r,i,s,a){const o=new go,l=new Fg,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,y,R,I,U){const D=I.fog,z=U.geometry,k=M.isMeshStandardMaterial?I.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||k),G=X&&X.mapping===306?X.image.height:null,J=g[M.type];M.precision!==null&&(p=i.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const se=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,pe=se!==void 0?se.length:0;let ve=0;z.morphAttributes.position!==void 0&&(ve=1),z.morphAttributes.normal!==void 0&&(ve=2),z.morphAttributes.color!==void 0&&(ve=3);let Le,$,K,de;if(J){const Ke=_r[J];Le=Ke.vertexShader,$=Ke.fragmentShader}else Le=M.vertexShader,$=M.fragmentShader,l.update(M),K=l.getVertexShaderID(M),de=l.getFragmentShaderID(M);const re=n.getRenderTarget(),Me=n.state.buffers.depth.getReversed(),Ee=U.isInstancedMesh===!0,Re=U.isBatchedMesh===!0,et=!!M.map,Be=!!M.matcap,st=!!X,N=!!M.aoMap,Jt=!!M.lightMap,ke=!!M.bumpMap,He=!!M.normalMap,Se=!!M.displacementMap,at=!!M.emissiveMap,ye=!!M.metalnessMap,L=!!M.roughnessMap,A=M.anisotropy>0,H=M.clearcoat>0,Y=M.dispersion>0,ee=M.iridescence>0,q=M.sheen>0,xe=M.transmission>0,oe=A&&!!M.anisotropyMap,ge=H&&!!M.clearcoatMap,Xe=H&&!!M.clearcoatNormalMap,te=H&&!!M.clearcoatRoughnessMap,fe=ee&&!!M.iridescenceMap,we=ee&&!!M.iridescenceThicknessMap,Ae=q&&!!M.sheenColorMap,me=q&&!!M.sheenRoughnessMap,Ge=!!M.specularMap,Ue=!!M.specularColorMap,tt=!!M.specularIntensityMap,O=xe&&!!M.transmissionMap,ae=xe&&!!M.thicknessMap,j=!!M.gradientMap,Z=!!M.alphaMap,le=M.alphaTest>0,ie=!!M.alphaHash,Ve=!!M.extensions;let ut=0;M.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ut=n.toneMapping);const Rt={shaderID:J,shaderType:M.type,shaderName:M.name,vertexShader:Le,fragmentShader:$,defines:M.defines,customVertexShaderID:K,customFragmentShaderID:de,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Re,batchingColor:Re&&U._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&U.instanceColor!==null,instancingMorph:Ee&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Gi,alphaToCoverage:!!M.alphaToCoverage,map:et,matcap:Be,envMap:st,envMapMode:st&&X.mapping,envMapCubeUVHeight:G,aoMap:N,lightMap:Jt,bumpMap:ke,normalMap:He,displacementMap:d&&Se,emissiveMap:at,normalMapObjectSpace:He&&M.normalMapType===1,normalMapTangentSpace:He&&M.normalMapType===0,metalnessMap:ye,roughnessMap:L,anisotropy:A,anisotropyMap:oe,clearcoat:H,clearcoatMap:ge,clearcoatNormalMap:Xe,clearcoatRoughnessMap:te,dispersion:Y,iridescence:ee,iridescenceMap:fe,iridescenceThicknessMap:we,sheen:q,sheenColorMap:Ae,sheenRoughnessMap:me,specularMap:Ge,specularColorMap:Ue,specularIntensityMap:tt,transmission:xe,transmissionMap:O,thicknessMap:ae,gradientMap:j,opaque:M.transparent===!1&&M.blending===1&&M.alphaToCoverage===!1,alphaMap:Z,alphaTest:le,alphaHash:ie,combine:M.combine,mapUv:et&&v(M.map.channel),aoMapUv:N&&v(M.aoMap.channel),lightMapUv:Jt&&v(M.lightMap.channel),bumpMapUv:ke&&v(M.bumpMap.channel),normalMapUv:He&&v(M.normalMap.channel),displacementMapUv:Se&&v(M.displacementMap.channel),emissiveMapUv:at&&v(M.emissiveMap.channel),metalnessMapUv:ye&&v(M.metalnessMap.channel),roughnessMapUv:L&&v(M.roughnessMap.channel),anisotropyMapUv:oe&&v(M.anisotropyMap.channel),clearcoatMapUv:ge&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:we&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:me&&v(M.sheenRoughnessMap.channel),specularMapUv:Ge&&v(M.specularMap.channel),specularColorMapUv:Ue&&v(M.specularColorMap.channel),specularIntensityMapUv:tt&&v(M.specularIntensityMap.channel),transmissionMapUv:O&&v(M.transmissionMap.channel),thicknessMapUv:ae&&v(M.thicknessMap.channel),alphaMapUv:Z&&v(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(He||A),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!z.attributes.uv&&(et||Z),fog:!!D,useFog:M.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Me,skinning:U.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:ve,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ut,decodeVideoTexture:et&&M.map.isVideoTexture===!0&&ze.getTransfer(M.map.colorSpace)===Ze,decodeVideoTextureEmissive:at&&M.emissiveMap.isVideoTexture===!0&&ze.getTransfer(M.emissiveMap.colorSpace)===Ze,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===2,flipSided:M.side===1,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Ve&&M.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&M.extensions.multiDraw===!0||Re)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function f(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const R in M.defines)y.push(R),y.push(M.defines[R]);return M.isRawShaderMaterial===!1&&(b(y,M),x(y,M),y.push(n.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function b(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),M.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),M.push(o.mask)}function _(M){const y=g[M.type];let R;if(y){const I=_r[y];R=wn.clone(I.uniforms)}else R=M.uniforms;return R}function S(M,y){let R;for(let I=0,U=u.length;I<U;I++){const D=u[I];if(D.cacheKey===y){R=D,++R.usedTimes;break}}return R===void 0&&(R=new Ng(n,y,M,s),u.push(R)),R}function w(M){if(--M.usedTimes===0){const y=u.indexOf(M);u[y]=u[u.length-1],u.pop(),M.destroy()}}function T(M){l.remove(M)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:E}}function kg(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function r(a){n.delete(a)}function i(a,o,l){n.get(a)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:r,update:i,dispose:s}}function Hg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function $l(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ql(){const n=[];let e=0;const t=[],r=[],i=[];function s(){e=0,t.length=0,r.length=0,i.length=0}function a(h,d,p,g,v,m){let f=n[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},n[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),e++,f}function o(h,d,p,g,v,m){const f=a(h,d,p,g,v,m);p.transmission>0?r.push(f):p.transparent===!0?i.push(f):t.push(f)}function l(h,d,p,g,v,m){const f=a(h,d,p,g,v,m);p.transmission>0?r.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function c(h,d){t.length>1&&t.sort(h||Hg),r.length>1&&r.sort(d||$l),i.length>1&&i.sort(d||$l)}function u(){for(let h=e,d=n.length;h<d;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:r,transparent:i,init:s,push:o,unshift:l,finish:u,sort:c}}function Gg(){let n=new WeakMap;function e(r,i){const s=n.get(r);let a;return s===void 0?(a=new ql,n.set(r,[a])):i>=s.length?(a=new ql,s.push(a)):a=s[i],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Vg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new ue};break;case"SpotLight":t={position:new P,direction:new P,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":t={color:new ue,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function Wg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Xg=0;function jg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function $g(n){const e=new Vg,t=Wg(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new P);const i=new P,s=new je,a=new je;function o(c){let u=0,h=0,d=0;for(let M=0;M<9;M++)r.probe[M].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,b=0,x=0,_=0,S=0,w=0,T=0;c.sort(jg);for(let M=0,y=c.length;M<y;M++){const R=c[M],I=R.color,U=R.intensity,D=R.distance,z=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=I.r*U,h+=I.g*U,d+=I.b*U;else if(R.isLightProbe){for(let k=0;k<9;k++)r.probe[k].addScaledVector(R.sh.coefficients[k],U);T++}else if(R.isDirectionalLight){const k=e.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,G=t.get(R);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,r.directionalShadow[p]=G,r.directionalShadowMap[p]=z,r.directionalShadowMatrix[p]=R.shadow.matrix,b++}r.directional[p]=k,p++}else if(R.isSpotLight){const k=e.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(I).multiplyScalar(U),k.distance=D,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,r.spot[v]=k;const X=R.shadow;if(R.map&&(r.spotLightMap[S]=R.map,S++,X.updateMatrices(R),R.castShadow&&w++),r.spotLightMatrix[v]=X.matrix,R.castShadow){const G=t.get(R);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,r.spotShadow[v]=G,r.spotShadowMap[v]=z,_++}v++}else if(R.isRectAreaLight){const k=e.get(R);k.color.copy(I).multiplyScalar(U),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),r.rectArea[m]=k,m++}else if(R.isPointLight){const k=e.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),k.distance=R.distance,k.decay=R.decay,R.castShadow){const X=R.shadow,G=t.get(R);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,G.shadowCameraNear=X.camera.near,G.shadowCameraFar=X.camera.far,r.pointShadow[g]=G,r.pointShadowMap[g]=z,r.pointShadowMatrix[g]=R.shadow.matrix,x++}r.point[g]=k,g++}else if(R.isHemisphereLight){const k=e.get(R);k.skyColor.copy(R.color).multiplyScalar(U),k.groundColor.copy(R.groundColor).multiplyScalar(U),r.hemi[f]=k,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ne.LTC_FLOAT_1,r.rectAreaLTC2=ne.LTC_FLOAT_2):(r.rectAreaLTC1=ne.LTC_HALF_1,r.rectAreaLTC2=ne.LTC_HALF_2)),r.ambient[0]=u,r.ambient[1]=h,r.ambient[2]=d;const E=r.hash;(E.directionalLength!==p||E.pointLength!==g||E.spotLength!==v||E.rectAreaLength!==m||E.hemiLength!==f||E.numDirectionalShadows!==b||E.numPointShadows!==x||E.numSpotShadows!==_||E.numSpotMaps!==S||E.numLightProbes!==T)&&(r.directional.length=p,r.spot.length=v,r.rectArea.length=m,r.point.length=g,r.hemi.length=f,r.directionalShadow.length=b,r.directionalShadowMap.length=b,r.pointShadow.length=x,r.pointShadowMap.length=x,r.spotShadow.length=_,r.spotShadowMap.length=_,r.directionalShadowMatrix.length=b,r.pointShadowMatrix.length=x,r.spotLightMatrix.length=_+S-w,r.spotLightMap.length=S,r.numSpotLightShadowsWithMaps=w,r.numLightProbes=T,E.directionalLength=p,E.pointLength=g,E.spotLength=v,E.rectAreaLength=m,E.hemiLength=f,E.numDirectionalShadows=b,E.numPointShadows=x,E.numSpotShadows=_,E.numSpotMaps=S,E.numLightProbes=T,r.version=Xg++)}function l(c,u){let h=0,d=0,p=0,g=0,v=0;const m=u.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){const x=c[f];if(x.isDirectionalLight){const _=r.directional[h];_.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),h++}else if(x.isSpotLight){const _=r.spot[p];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const _=r.rectArea[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),a.identity(),s.copy(x.matrixWorld),s.premultiply(m),a.extractRotation(s),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const _=r.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const _=r.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:r}}function Yl(n){const e=new $g(n),t=[],r=[];function i(u){c.camera=u,t.length=0,r.length=0}function s(u){t.push(u)}function a(u){r.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function qg(n){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Yl(n),e.set(i,[o])):s>=a.length?(o=new Yl(n),a.push(o)):o=a[s],o}function r(){e=new WeakMap}return{get:t,dispose:r}}const Yg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Zg(n,e,t){let r=new zs;const i=new be,s=new be,a=new dt,o=new id({depthPacking:3201}),l=new nd,c={},u=t.maxTextureSize,h={0:1,1:0,2:2},d=new gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:Yg,fragmentShader:Kg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ye;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new nt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let f=this.type;this.render=function(w,T,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=n.getRenderTarget(),y=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(0),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const U=f!==3&&this.type===3,D=f===3&&this.type!==3;for(let z=0,k=w.length;z<k;z++){const X=w[z],G=X.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const J=G.getFrameExtents();if(i.multiply(J),s.copy(G.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/J.x),i.x=s.x*J.x,G.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/J.y),i.y=s.y*J.y,G.mapSize.y=s.y)),G.map===null||U===!0||D===!0){const pe=this.type!==3?{minFilter:1003,magFilter:1003}:{};G.map!==null&&G.map.dispose(),G.map=new mr(i.x,i.y,pe),G.map.texture.name=X.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const se=G.getViewportCount();for(let pe=0;pe<se;pe++){const ve=G.getViewport(pe);a.set(s.x*ve.x,s.y*ve.y,s.x*ve.z,s.y*ve.w),I.viewport(a),G.updateMatrices(X,pe),r=G.getFrustum(),_(T,E,G.camera,X,this.type)}G.isPointLightShadow!==!0&&this.type===3&&b(G,E),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(M,y,R)};function b(w,T){const E=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new mr(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(T,null,E,d,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(T,null,E,p,v,null)}function x(w,T,E,M){let y=null;const R=E.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=E.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const I=y.uuid,U=T.uuid;let D=c[I];D===void 0&&(D={},c[I]=D);let z=D[U];z===void 0&&(z=y.clone(),D[U]=z,T.addEventListener("dispose",S)),y=z}if(y.visible=T.visible,y.wireframe=T.wireframe,M===3?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:h[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,E.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=n.properties.get(y);I.light=E}return y}function _(w,T,E,M,y){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===3)&&(!w.frustumCulled||r.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,w.matrixWorld);const I=e.update(w),U=w.material;if(Array.isArray(U)){const D=I.groups;for(let z=0,k=D.length;z<k;z++){const X=D[z],G=U[X.materialIndex];if(G&&G.visible){const J=x(w,G,M,y);w.onBeforeShadow(n,w,T,E,I,J,X),n.renderBufferDirect(E,null,I,J,w,X),w.onAfterShadow(n,w,T,E,I,J,X)}}}else if(U.visible){const D=x(w,U,M,y);w.onBeforeShadow(n,w,T,E,I,D,null),n.renderBufferDirect(E,null,I,D,w,null),w.onAfterShadow(n,w,T,E,I,D,null)}}const R=w.children;for(let I=0,U=R.length;I<U;I++)_(R[I],T,E,M,y)}function S(w){w.target.removeEventListener("dispose",S);for(const T in c){const E=c[T],M=w.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const Jg={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Qg(n,e){function t(){let O=!1;const ae=new dt;let j=null;const Z=new dt(0,0,0,0);return{setMask:function(le){j!==le&&!O&&(n.colorMask(le,le,le,le),j=le)},setLocked:function(le){O=le},setClear:function(le,ie,Ve,ut,Rt){Rt===!0&&(le*=ut,ie*=ut,Ve*=ut),ae.set(le,ie,Ve,ut),Z.equals(ae)===!1&&(n.clearColor(le,ie,Ve,ut),Z.copy(ae))},reset:function(){O=!1,j=null,Z.set(-1,0,0,0)}}}function r(){let O=!1,ae=!1,j=null,Z=null,le=null;return{setReversed:function(ie){if(ae!==ie){const Ve=e.get("EXT_clip_control");ae?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT);const ut=le;le=null,this.setClear(ut)}ae=ie},getReversed:function(){return ae},setTest:function(ie){ie?re(n.DEPTH_TEST):Me(n.DEPTH_TEST)},setMask:function(ie){j!==ie&&!O&&(n.depthMask(ie),j=ie)},setFunc:function(ie){if(ae&&(ie=Jg[ie]),Z!==ie){switch(ie){case 0:n.depthFunc(n.NEVER);break;case 1:n.depthFunc(n.ALWAYS);break;case 2:n.depthFunc(n.LESS);break;case 3:n.depthFunc(n.LEQUAL);break;case 4:n.depthFunc(n.EQUAL);break;case 5:n.depthFunc(n.GEQUAL);break;case 6:n.depthFunc(n.GREATER);break;case 7:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Z=ie}},setLocked:function(ie){O=ie},setClear:function(ie){le!==ie&&(ae&&(ie=1-ie),n.clearDepth(ie),le=ie)},reset:function(){O=!1,j=null,Z=null,le=null,ae=!1}}}function i(){let O=!1,ae=null,j=null,Z=null,le=null,ie=null,Ve=null,ut=null,Rt=null;return{setTest:function(Ke){O||(Ke?re(n.STENCIL_TEST):Me(n.STENCIL_TEST))},setMask:function(Ke){ae!==Ke&&!O&&(n.stencilMask(Ke),ae=Ke)},setFunc:function(Ke,ar,yr){(j!==Ke||Z!==ar||le!==yr)&&(n.stencilFunc(Ke,ar,yr),j=Ke,Z=ar,le=yr)},setOp:function(Ke,ar,yr){(ie!==Ke||Ve!==ar||ut!==yr)&&(n.stencilOp(Ke,ar,yr),ie=Ke,Ve=ar,ut=yr)},setLocked:function(Ke){O=Ke},setClear:function(Ke){Rt!==Ke&&(n.clearStencil(Ke),Rt=Ke)},reset:function(){O=!1,ae=null,j=null,Z=null,le=null,ie=null,Ve=null,ut=null,Rt=null}}}const s=new t,a=new r,o=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,b=null,x=null,_=null,S=null,w=null,T=new ue(0,0,0),E=0,M=!1,y=null,R=null,I=null,U=null,D=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,X=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(G)[1]),k=X>=1):G.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),k=X>=2);let J=null,se={};const pe=n.getParameter(n.SCISSOR_BOX),ve=n.getParameter(n.VIEWPORT),Le=new dt().fromArray(pe),$=new dt().fromArray(ve);function K(O,ae,j,Z){const le=new Uint8Array(4),ie=n.createTexture();n.bindTexture(O,ie),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ve=0;Ve<j;Ve++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(ae,0,n.RGBA,1,1,Z,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(ae+Ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return ie}const de={};de[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(n.DEPTH_TEST),a.setFunc(3),ke(!1),He(1),re(n.CULL_FACE),N(0);function re(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function Me(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function Ee(O,ae){return h[O]!==ae?(n.bindFramebuffer(O,ae),h[O]=ae,O===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ae),O===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ae),!0):!1}function Re(O,ae){let j=p,Z=!1;if(O){j=d.get(ae),j===void 0&&(j=[],d.set(ae,j));const le=O.textures;if(j.length!==le.length||j[0]!==n.COLOR_ATTACHMENT0){for(let ie=0,Ve=le.length;ie<Ve;ie++)j[ie]=n.COLOR_ATTACHMENT0+ie;j.length=le.length,Z=!0}}else j[0]!==n.BACK&&(j[0]=n.BACK,Z=!0);Z&&n.drawBuffers(j)}function et(O){return g!==O?(n.useProgram(O),g=O,!0):!1}const Be={100:n.FUNC_ADD,101:n.FUNC_SUBTRACT,102:n.FUNC_REVERSE_SUBTRACT};Be[103]=n.MIN,Be[104]=n.MAX;const st={200:n.ZERO,201:n.ONE,202:n.SRC_COLOR,204:n.SRC_ALPHA,210:n.SRC_ALPHA_SATURATE,208:n.DST_COLOR,206:n.DST_ALPHA,203:n.ONE_MINUS_SRC_COLOR,205:n.ONE_MINUS_SRC_ALPHA,209:n.ONE_MINUS_DST_COLOR,207:n.ONE_MINUS_DST_ALPHA,211:n.CONSTANT_COLOR,212:n.ONE_MINUS_CONSTANT_COLOR,213:n.CONSTANT_ALPHA,214:n.ONE_MINUS_CONSTANT_ALPHA};function N(O,ae,j,Z,le,ie,Ve,ut,Rt,Ke){if(O===0){v===!0&&(Me(n.BLEND),v=!1);return}if(v===!1&&(re(n.BLEND),v=!0),O!==5){if(O!==m||Ke!==M){if((f!==100||_!==100)&&(n.blendEquation(n.FUNC_ADD),f=100,_=100),Ke)switch(O){case 1:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.ONE,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case 1:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case 2:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case 3:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case 4:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}b=null,x=null,S=null,w=null,T.set(0,0,0),E=0,m=O,M=Ke}return}le=le||ae,ie=ie||j,Ve=Ve||Z,(ae!==f||le!==_)&&(n.blendEquationSeparate(Be[ae],Be[le]),f=ae,_=le),(j!==b||Z!==x||ie!==S||Ve!==w)&&(n.blendFuncSeparate(st[j],st[Z],st[ie],st[Ve]),b=j,x=Z,S=ie,w=Ve),(ut.equals(T)===!1||Rt!==E)&&(n.blendColor(ut.r,ut.g,ut.b,Rt),T.copy(ut),E=Rt),m=O,M=!1}function Jt(O,ae){O.side===2?Me(n.CULL_FACE):re(n.CULL_FACE);let j=O.side===1;ae&&(j=!j),ke(j),O.blending===1&&O.transparent===!1?N(0):N(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),s.setMask(O.colorWrite);const Z=O.stencilWrite;o.setTest(Z),Z&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),at(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ke(O){y!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),y=O)}function He(O){O!==0?(re(n.CULL_FACE),O!==R&&(O===1?n.cullFace(n.BACK):O===2?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Me(n.CULL_FACE),R=O}function Se(O){O!==I&&(k&&n.lineWidth(O),I=O)}function at(O,ae,j){O?(re(n.POLYGON_OFFSET_FILL),(U!==ae||D!==j)&&(n.polygonOffset(ae,j),U=ae,D=j)):Me(n.POLYGON_OFFSET_FILL)}function ye(O){O?re(n.SCISSOR_TEST):Me(n.SCISSOR_TEST)}function L(O){O===void 0&&(O=n.TEXTURE0+z-1),J!==O&&(n.activeTexture(O),J=O)}function A(O,ae,j){j===void 0&&(J===null?j=n.TEXTURE0+z-1:j=J);let Z=se[j];Z===void 0&&(Z={type:void 0,texture:void 0},se[j]=Z),(Z.type!==O||Z.texture!==ae)&&(J!==j&&(n.activeTexture(j),J=j),n.bindTexture(O,ae||de[O]),Z.type=O,Z.texture=ae)}function H(){const O=se[J];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function Y(){try{n.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{n.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function q(){try{n.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xe(){try{n.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{n.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ge(){try{n.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xe(){try{n.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{n.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{n.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function we(){try{n.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ae(O){Le.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),Le.copy(O))}function me(O){$.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),$.copy(O))}function Ge(O,ae){let j=c.get(ae);j===void 0&&(j=new WeakMap,c.set(ae,j));let Z=j.get(O);Z===void 0&&(Z=n.getUniformBlockIndex(ae,O.name),j.set(O,Z))}function Ue(O,ae){const j=c.get(ae).get(O);l.get(ae)!==j&&(n.uniformBlockBinding(ae,j,O.__bindingPointIndex),l.set(ae,j))}function tt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},J=null,se={},h={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,b=null,x=null,_=null,S=null,w=null,T=new ue(0,0,0),E=0,M=!1,y=null,R=null,I=null,U=null,D=null,Le.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:re,disable:Me,bindFramebuffer:Ee,drawBuffers:Re,useProgram:et,setBlending:N,setMaterial:Jt,setFlipSided:ke,setCullFace:He,setLineWidth:Se,setPolygonOffset:at,setScissorTest:ye,activeTexture:L,bindTexture:A,unbindTexture:H,compressedTexImage2D:Y,compressedTexImage3D:ee,texImage2D:fe,texImage3D:we,updateUBOMapping:Ge,uniformBlockBinding:Ue,texStorage2D:Xe,texStorage3D:te,texSubImage2D:q,texSubImage3D:xe,compressedTexSubImage2D:oe,compressedTexSubImage3D:ge,scissor:Ae,viewport:me,reset:tt}}function ev(n,e,t,r,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(L,A){return p?new OffscreenCanvas(L,A):Tn("canvas")}function v(L,A,H){let Y=1;const ee=ye(L);if((ee.width>H||ee.height>H)&&(Y=H/Math.max(ee.width,ee.height)),Y<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const q=Math.floor(Y*ee.width),xe=Math.floor(Y*ee.height);h===void 0&&(h=g(q,xe));const oe=A?g(q,xe):h;return oe.width=q,oe.height=xe,oe.getContext("2d").drawImage(L,0,0,q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+q+"x"+xe+")."),oe}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),L;return L}function m(L){return L.generateMipmaps}function f(L){n.generateMipmap(L)}function b(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(L,A,H,Y,ee=!1){if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let q=A;if(A===n.RED&&(H===n.FLOAT&&(q=n.R32F),H===n.HALF_FLOAT&&(q=n.R16F),H===n.UNSIGNED_BYTE&&(q=n.R8)),A===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.R8UI),H===n.UNSIGNED_SHORT&&(q=n.R16UI),H===n.UNSIGNED_INT&&(q=n.R32UI),H===n.BYTE&&(q=n.R8I),H===n.SHORT&&(q=n.R16I),H===n.INT&&(q=n.R32I)),A===n.RG&&(H===n.FLOAT&&(q=n.RG32F),H===n.HALF_FLOAT&&(q=n.RG16F),H===n.UNSIGNED_BYTE&&(q=n.RG8)),A===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.RG8UI),H===n.UNSIGNED_SHORT&&(q=n.RG16UI),H===n.UNSIGNED_INT&&(q=n.RG32UI),H===n.BYTE&&(q=n.RG8I),H===n.SHORT&&(q=n.RG16I),H===n.INT&&(q=n.RG32I)),A===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.RGB8UI),H===n.UNSIGNED_SHORT&&(q=n.RGB16UI),H===n.UNSIGNED_INT&&(q=n.RGB32UI),H===n.BYTE&&(q=n.RGB8I),H===n.SHORT&&(q=n.RGB16I),H===n.INT&&(q=n.RGB32I)),A===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),H===n.UNSIGNED_INT&&(q=n.RGBA32UI),H===n.BYTE&&(q=n.RGBA8I),H===n.SHORT&&(q=n.RGBA16I),H===n.INT&&(q=n.RGBA32I)),A===n.RGB&&H===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),A===n.RGBA){const xe=ee?Ps:ze.getTransfer(Y);H===n.FLOAT&&(q=n.RGBA32F),H===n.HALF_FLOAT&&(q=n.RGBA16F),H===n.UNSIGNED_BYTE&&(q=xe===Ze?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function _(L,A){let H;return L?A===null||A===1014||A===1020?H=n.DEPTH24_STENCIL8:A===1015?H=n.DEPTH32F_STENCIL8:A===1012&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===1014||A===1020?H=n.DEPTH_COMPONENT24:A===1015?H=n.DEPTH_COMPONENT32F:A===1012&&(H=n.DEPTH_COMPONENT16),H}function S(L,A){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==1003&&L.minFilter!==1006?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function w(L){const A=L.target;A.removeEventListener("dispose",w),E(A),A.isVideoTexture&&u.delete(A)}function T(L){const A=L.target;A.removeEventListener("dispose",T),y(A)}function E(L){const A=r.get(L);if(A.__webglInit===void 0)return;const H=L.source,Y=d.get(H);if(Y){const ee=Y[A.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&M(L),Object.keys(Y).length===0&&d.delete(H)}r.remove(L)}function M(L){const A=r.get(L);n.deleteTexture(A.__webglTexture);const H=L.source,Y=d.get(H);delete Y[A.__cacheKey],a.memory.textures--}function y(L){const A=r.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),r.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(A.__webglFramebuffer[Y]))for(let ee=0;ee<A.__webglFramebuffer[Y].length;ee++)n.deleteFramebuffer(A.__webglFramebuffer[Y][ee]);else n.deleteFramebuffer(A.__webglFramebuffer[Y]);A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer[Y])}else{if(Array.isArray(A.__webglFramebuffer))for(let Y=0;Y<A.__webglFramebuffer.length;Y++)n.deleteFramebuffer(A.__webglFramebuffer[Y]);else n.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&n.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let Y=0;Y<A.__webglColorRenderbuffer.length;Y++)A.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(A.__webglColorRenderbuffer[Y]);A.__webglDepthRenderbuffer&&n.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const H=L.textures;for(let Y=0,ee=H.length;Y<ee;Y++){const q=r.get(H[Y]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),a.memory.textures--),r.remove(H[Y])}r.remove(L)}let R=0;function I(){R=0}function U(){const L=R;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),R+=1,L}function D(L){const A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function z(L,A){const H=r.get(L);if(L.isVideoTexture&&Se(L),L.isRenderTargetTexture===!1&&L.version>0&&H.__version!==L.version){const Y=L.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(H,L,A);return}}t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+A)}function k(L,A){const H=r.get(L);if(L.version>0&&H.__version!==L.version){$(H,L,A);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+A)}function X(L,A){const H=r.get(L);if(L.version>0&&H.__version!==L.version){$(H,L,A);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+A)}function G(L,A){const H=r.get(L);if(L.version>0&&H.__version!==L.version){K(H,L,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+A)}const J={1e3:n.REPEAT,1001:n.CLAMP_TO_EDGE,1002:n.MIRRORED_REPEAT},se={1003:n.NEAREST,1004:n.NEAREST_MIPMAP_NEAREST,1005:n.NEAREST_MIPMAP_LINEAR,1006:n.LINEAR,1007:n.LINEAR_MIPMAP_NEAREST,1008:n.LINEAR_MIPMAP_LINEAR},pe={512:n.NEVER,519:n.ALWAYS,513:n.LESS,515:n.LEQUAL,514:n.EQUAL,518:n.GEQUAL,516:n.GREATER,517:n.NOTEQUAL};function ve(L,A){if(A.type===1015&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===1006||A.magFilter===1007||A.magFilter===1005||A.magFilter===1008||A.minFilter===1006||A.minFilter===1007||A.minFilter===1005||A.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,J[A.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,J[A.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,J[A.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,se[A.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,se[A.minFilter]),A.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,pe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===1003||A.minFilter!==1005&&A.minFilter!==1008||A.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||r.get(A).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(L,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),r.get(A).__currentAnisotropy=A.anisotropy}}}function Le(L,A){let H=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",w));const Y=A.source;let ee=d.get(Y);ee===void 0&&(ee={},d.set(Y,ee));const q=D(A);if(q!==L.__cacheKey){ee[q]===void 0&&(ee[q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),ee[q].usedTimes++;const xe=ee[L.__cacheKey];xe!==void 0&&(ee[L.__cacheKey].usedTimes--,xe.usedTimes===0&&M(A)),L.__cacheKey=q,L.__webglTexture=ee[q].texture}return H}function $(L,A,H){let Y=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(Y=n.TEXTURE_3D);const ee=Le(L,A),q=A.source;t.bindTexture(Y,L.__webglTexture,n.TEXTURE0+H);const xe=r.get(q);if(q.version!==xe.__version||ee===!0){t.activeTexture(n.TEXTURE0+H);const oe=ze.getPrimaries(ze.workingColorSpace),ge=A.colorSpace===""?null:ze.getPrimaries(A.colorSpace),Xe=A.colorSpace===""||oe===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let te=v(A.image,!1,i.maxTextureSize);te=at(A,te);const fe=s.convert(A.format,A.colorSpace),we=s.convert(A.type);let Ae=x(A.internalFormat,fe,we,A.colorSpace,A.isVideoTexture);ve(Y,A);let me;const Ge=A.mipmaps,Ue=A.isVideoTexture!==!0,tt=xe.__version===void 0||ee===!0,O=q.dataReady,ae=S(A,te);if(A.isDepthTexture)Ae=_(A.format===1027,A.type),tt&&(Ue?t.texStorage2D(n.TEXTURE_2D,1,Ae,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Ae,te.width,te.height,0,fe,we,null));else if(A.isDataTexture)if(Ge.length>0){Ue&&tt&&t.texStorage2D(n.TEXTURE_2D,ae,Ae,Ge[0].width,Ge[0].height);for(let j=0,Z=Ge.length;j<Z;j++)me=Ge[j],Ue?O&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,me.width,me.height,fe,we,me.data):t.texImage2D(n.TEXTURE_2D,j,Ae,me.width,me.height,0,fe,we,me.data);A.generateMipmaps=!1}else Ue?(tt&&t.texStorage2D(n.TEXTURE_2D,ae,Ae,te.width,te.height),O&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,te.width,te.height,fe,we,te.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,te.width,te.height,0,fe,we,te.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ue&&tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ae,Ae,Ge[0].width,Ge[0].height,te.depth);for(let j=0,Z=Ge.length;j<Z;j++)if(me=Ge[j],A.format!==1023)if(fe!==null)if(Ue){if(O)if(A.layerUpdates.size>0){const le=wl(me.width,me.height,A.format,A.type);for(const ie of A.layerUpdates){const Ve=me.data.subarray(ie*le/me.data.BYTES_PER_ELEMENT,(ie+1)*le/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,ie,me.width,me.height,1,fe,Ve)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,me.width,me.height,te.depth,fe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,Ae,me.width,me.height,te.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?O&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,me.width,me.height,te.depth,fe,we,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,j,Ae,me.width,me.height,te.depth,0,fe,we,me.data)}else{Ue&&tt&&t.texStorage2D(n.TEXTURE_2D,ae,Ae,Ge[0].width,Ge[0].height);for(let j=0,Z=Ge.length;j<Z;j++)me=Ge[j],A.format!==1023?fe!==null?Ue?O&&t.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,me.width,me.height,fe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,j,Ae,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?O&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,me.width,me.height,fe,we,me.data):t.texImage2D(n.TEXTURE_2D,j,Ae,me.width,me.height,0,fe,we,me.data)}else if(A.isDataArrayTexture)if(Ue){if(tt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ae,Ae,te.width,te.height,te.depth),O)if(A.layerUpdates.size>0){const j=wl(te.width,te.height,A.format,A.type);for(const Z of A.layerUpdates){const le=te.data.subarray(Z*j/te.data.BYTES_PER_ELEMENT,(Z+1)*j/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,fe,we,le)}A.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,we,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,te.width,te.height,te.depth,0,fe,we,te.data);else if(A.isData3DTexture)Ue?(tt&&t.texStorage3D(n.TEXTURE_3D,ae,Ae,te.width,te.height,te.depth),O&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,we,te.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,te.width,te.height,te.depth,0,fe,we,te.data);else if(A.isFramebufferTexture){if(tt)if(Ue)t.texStorage2D(n.TEXTURE_2D,ae,Ae,te.width,te.height);else{let j=te.width,Z=te.height;for(let le=0;le<ae;le++)t.texImage2D(n.TEXTURE_2D,le,Ae,j,Z,0,fe,we,null),j>>=1,Z>>=1}}else if(Ge.length>0){if(Ue&&tt){const j=ye(Ge[0]);t.texStorage2D(n.TEXTURE_2D,ae,Ae,j.width,j.height)}for(let j=0,Z=Ge.length;j<Z;j++)me=Ge[j],Ue?O&&t.texSubImage2D(n.TEXTURE_2D,j,0,0,fe,we,me):t.texImage2D(n.TEXTURE_2D,j,Ae,fe,we,me);A.generateMipmaps=!1}else if(Ue){if(tt){const j=ye(te);t.texStorage2D(n.TEXTURE_2D,ae,Ae,j.width,j.height)}O&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,we,te)}else t.texImage2D(n.TEXTURE_2D,0,Ae,fe,we,te);m(A)&&f(Y),xe.__version=q.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function K(L,A,H){if(A.image.length!==6)return;const Y=Le(L,A),ee=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+H);const q=r.get(ee);if(ee.version!==q.__version||Y===!0){t.activeTexture(n.TEXTURE0+H);const xe=ze.getPrimaries(ze.workingColorSpace),oe=A.colorSpace===""?null:ze.getPrimaries(A.colorSpace),ge=A.colorSpace===""||xe===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Xe=A.isCompressedTexture||A.image[0].isCompressedTexture,te=A.image[0]&&A.image[0].isDataTexture,fe=[];for(let Z=0;Z<6;Z++)!Xe&&!te?fe[Z]=v(A.image[Z],!0,i.maxCubemapSize):fe[Z]=te?A.image[Z].image:A.image[Z],fe[Z]=at(A,fe[Z]);const we=fe[0],Ae=s.convert(A.format,A.colorSpace),me=s.convert(A.type),Ge=x(A.internalFormat,Ae,me,A.colorSpace),Ue=A.isVideoTexture!==!0,tt=q.__version===void 0||Y===!0,O=ee.dataReady;let ae=S(A,we);ve(n.TEXTURE_CUBE_MAP,A);let j;if(Xe){Ue&&tt&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ae,Ge,we.width,we.height);for(let Z=0;Z<6;Z++){j=fe[Z].mipmaps;for(let le=0;le<j.length;le++){const ie=j[le];A.format!==1023?Ae!==null?Ue?O&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,0,0,ie.width,ie.height,Ae,ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,Ge,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?O&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,0,0,ie.width,ie.height,Ae,me,ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le,Ge,ie.width,ie.height,0,Ae,me,ie.data)}}}else{if(j=A.mipmaps,Ue&&tt){j.length>0&&ae++;const Z=ye(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ae,Ge,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){Ue?O&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,fe[Z].width,fe[Z].height,Ae,me,fe[Z].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,fe[Z].width,fe[Z].height,0,Ae,me,fe[Z].data);for(let le=0;le<j.length;le++){const ie=j[le].image[Z].image;Ue?O&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,0,0,ie.width,ie.height,Ae,me,ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,Ge,ie.width,ie.height,0,Ae,me,ie.data)}}else{Ue?O&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ae,me,fe[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ge,Ae,me,fe[Z]);for(let le=0;le<j.length;le++){const ie=j[le];Ue?O&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,0,0,Ae,me,ie.image[Z]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Z,le+1,Ge,Ae,me,ie.image[Z])}}}m(A)&&f(n.TEXTURE_CUBE_MAP),q.__version=ee.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function de(L,A,H,Y,ee,q){const xe=s.convert(H.format,H.colorSpace),oe=s.convert(H.type),ge=x(H.internalFormat,xe,oe,H.colorSpace),Xe=r.get(A),te=r.get(H);if(te.__renderTarget=A,!Xe.__hasExternalTextures){const fe=Math.max(1,A.width>>q),we=Math.max(1,A.height>>q);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,q,ge,fe,we,A.depth,0,xe,oe,null):t.texImage2D(ee,q,ge,fe,we,0,xe,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,L),He(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,ee,te.__webglTexture,0,ke(A)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,ee,te.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function re(L,A,H){if(n.bindRenderbuffer(n.RENDERBUFFER,L),A.depthBuffer){const Y=A.depthTexture,ee=Y&&Y.isDepthTexture?Y.type:null,q=_(A.stencilBuffer,ee),xe=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=ke(A);He(A)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,q,A.width,A.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,q,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,q,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,xe,n.RENDERBUFFER,L)}else{const Y=A.textures;for(let ee=0;ee<Y.length;ee++){const q=Y[ee],xe=s.convert(q.format,q.colorSpace),oe=s.convert(q.type),ge=x(q.internalFormat,xe,oe,q.colorSpace),Xe=ke(A);H&&He(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe,ge,A.width,A.height):He(A)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe,ge,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,ge,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Me(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const H=r.get(A.depthTexture);H.__renderTarget=A,(!H.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),z(A.depthTexture,0);const Y=H.__webglTexture,ee=ke(A);if(A.depthTexture.format===1026)He(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Y,0);else if(A.depthTexture.format===1027)He(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Ee(L){const A=r.get(L),H=L.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==L.depthTexture){const Y=L.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),Y){const ee=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,Y.removeEventListener("dispose",ee)};Y.addEventListener("dispose",ee),A.__depthDisposeCallback=ee}A.__boundDepthTexture=Y}if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Me(A.__webglFramebuffer,L)}else if(H){A.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[Y]),A.__webglDepthbuffer[Y]===void 0)A.__webglDepthbuffer[Y]=n.createRenderbuffer(),re(A.__webglDepthbuffer[Y],L,!1);else{const ee=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=A.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=n.createRenderbuffer(),re(A.__webglDepthbuffer,L,!1);else{const Y=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=A.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,ee)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(L,A,H){const Y=r.get(L);A!==void 0&&de(Y.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ee(L)}function et(L){const A=L.texture,H=r.get(L),Y=r.get(A);L.addEventListener("dispose",T);const ee=L.textures,q=L.isWebGLCubeRenderTarget===!0,xe=ee.length>1;if(xe||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=A.version,a.memory.textures++),q){H.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer[oe]=[];for(let ge=0;ge<A.mipmaps.length;ge++)H.__webglFramebuffer[oe][ge]=n.createFramebuffer()}else H.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer=[];for(let oe=0;oe<A.mipmaps.length;oe++)H.__webglFramebuffer[oe]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(xe)for(let oe=0,ge=ee.length;oe<ge;oe++){const Xe=r.get(ee[oe]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=n.createTexture(),a.memory.textures++)}if(L.samples>0&&He(L)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let oe=0;oe<ee.length;oe++){const ge=ee[oe];H.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[oe]);const Xe=s.convert(ge.format,ge.colorSpace),te=s.convert(ge.type),fe=x(ge.internalFormat,Xe,te,ge.colorSpace,L.isXRRenderTarget===!0),we=ke(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,fe,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,H.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),re(H.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ve(n.TEXTURE_CUBE_MAP,A);for(let oe=0;oe<6;oe++)if(A.mipmaps&&A.mipmaps.length>0)for(let ge=0;ge<A.mipmaps.length;ge++)de(H.__webglFramebuffer[oe][ge],L,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ge);else de(H.__webglFramebuffer[oe],L,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(A)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let oe=0,ge=ee.length;oe<ge;oe++){const Xe=ee[oe],te=r.get(Xe);t.bindTexture(n.TEXTURE_2D,te.__webglTexture),ve(n.TEXTURE_2D,Xe),de(H.__webglFramebuffer,L,Xe,n.COLOR_ATTACHMENT0+oe,n.TEXTURE_2D,0),m(Xe)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(oe=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),ve(oe,A),A.mipmaps&&A.mipmaps.length>0)for(let ge=0;ge<A.mipmaps.length;ge++)de(H.__webglFramebuffer[ge],L,A,n.COLOR_ATTACHMENT0,oe,ge);else de(H.__webglFramebuffer,L,A,n.COLOR_ATTACHMENT0,oe,0);m(A)&&f(oe),t.unbindTexture()}L.depthBuffer&&Ee(L)}function Be(L){const A=L.textures;for(let H=0,Y=A.length;H<Y;H++){const ee=A[H];if(m(ee)){const q=b(L),xe=r.get(ee).__webglTexture;t.bindTexture(q,xe),f(q),t.unbindTexture()}}}const st=[],N=[];function Jt(L){if(L.samples>0){if(He(L)===!1){const A=L.textures,H=L.width,Y=L.height;let ee=n.COLOR_BUFFER_BIT;const q=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=r.get(L),oe=A.length>1;if(oe)for(let ge=0;ge<A.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let ge=0;ge<A.length;ge++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,xe.__webglColorRenderbuffer[ge]);const Xe=r.get(A[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Xe,0)}n.blitFramebuffer(0,0,H,Y,0,0,H,Y,ee,n.NEAREST),l===!0&&(st.length=0,N.length=0,st.push(n.COLOR_ATTACHMENT0+ge),L.depthBuffer&&L.resolveDepthBuffer===!1&&(st.push(q),N.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,N)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,st))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let ge=0;ge<A.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,xe.__webglColorRenderbuffer[ge]);const Xe=r.get(A[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,xe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Xe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const A=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[A])}}}function ke(L){return Math.min(i.maxSamples,L.samples)}function He(L){const A=r.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Se(L){const A=a.render.frame;u.get(L)!==A&&(u.set(L,A),L.update())}function at(L,A){const H=L.colorSpace,Y=L.format,ee=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||H!==Gi&&H!==""&&(ze.getTransfer(H)===Ze?(Y!==1023||ee!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),A}function ye(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=I,this.setTexture2D=z,this.setTexture2DArray=k,this.setTexture3D=X,this.setTextureCube=G,this.rebindTextures=Re,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=Jt,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=de,this.useMultisampledRTT=He}function tv(n,e){function t(r,i=""){let s;const a=ze.getTransfer(i);if(r===1009)return n.UNSIGNED_BYTE;if(r===1017)return n.UNSIGNED_SHORT_4_4_4_4;if(r===1018)return n.UNSIGNED_SHORT_5_5_5_1;if(r===35902)return n.UNSIGNED_INT_5_9_9_9_REV;if(r===1010)return n.BYTE;if(r===1011)return n.SHORT;if(r===1012)return n.UNSIGNED_SHORT;if(r===1013)return n.INT;if(r===1014)return n.UNSIGNED_INT;if(r===1015)return n.FLOAT;if(r===1016)return n.HALF_FLOAT;if(r===1021)return n.ALPHA;if(r===1022)return n.RGB;if(r===1023)return n.RGBA;if(r===1024)return n.LUMINANCE;if(r===1025)return n.LUMINANCE_ALPHA;if(r===1026)return n.DEPTH_COMPONENT;if(r===1027)return n.DEPTH_STENCIL;if(r===1028)return n.RED;if(r===1029)return n.RED_INTEGER;if(r===1030)return n.RG;if(r===1031)return n.RG_INTEGER;if(r===1033)return n.RGBA_INTEGER;if(r===33776||r===33777||r===33778||r===33779)if(a===Ze)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(r===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(r===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===35840||r===35841||r===35842||r===35843)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(r===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===36196||r===37492||r===37496)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(r===36196||r===37492)return a===Ze?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(r===37496)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===37808||r===37809||r===37810||r===37811||r===37812||r===37813||r===37814||r===37815||r===37816||r===37817||r===37818||r===37819||r===37820||r===37821)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(r===37808)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===37809)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===37810)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===37811)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===37812)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===37813)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===37814)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===37815)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===37816)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===37817)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===37818)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===37819)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===37820)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===37821)return a===Ze?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===36492||r===36494||r===36495)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(r===36492)return a===Ze?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===36283||r===36284||r===36285||r===36286)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(r===36492)return s.COMPRESSED_RED_RGTC1_EXT;if(r===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===1020?n.UNSIGNED_INT_24_8:n[r]!==void 0?n[r]:null}return{convert:t}}const rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class nv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const i=new Zt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==r.depthNear||t.depthFar!==r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new gt({vertexShader:rv,fragmentShader:iv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Rn(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sv extends ji{constructor(e,t){super();const r=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,g=null;const v=new nv,m=t.getContextAttributes();let f=null,b=null;const x=[],_=[],S=new be;let w=null;const T=new ir;T.viewport=new dt;const E=new ir;E.viewport=new dt;const M=[T,E],y=new pd;let R=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let K=x[$];return K===void 0&&(K=new ha,x[$]=K),K.getTargetRaySpace()},this.getControllerGrip=function($){let K=x[$];return K===void 0&&(K=new ha,x[$]=K),K.getGripSpace()},this.getHand=function($){let K=x[$];return K===void 0&&(K=new ha,x[$]=K),K.getHandSpace()};function U($){const K=_.indexOf($.inputSource);if(K===-1)return;const de=x[K];de!==void 0&&(de.update($.inputSource,$.frame,c||a),de.dispatchEvent({type:$.type,data:$.inputSource}))}function D(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",z);for(let $=0;$<x.length;$++){const K=_[$];K!==null&&(_[$]=null,x[$].disconnect(K))}R=null,I=null,v.reset(),e.setRenderTarget(f),p=null,d=null,h=null,i=null,b=null,Le.stop(),r.isPresenting=!1,e.setPixelRatio(w),e.setSize(S.width,S.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",D),i.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(S),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,de=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=m.stencil?1027:1026,de=m.stencil?1020:1014);const Me={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:s};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(Me),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new mr(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new tu(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const K={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new mr(p.framebufferWidth,p.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Le.setContext(i),Le.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function z($){for(let K=0;K<$.removed.length;K++){const de=$.removed[K],re=_.indexOf(de);re>=0&&(_[re]=null,x[re].disconnect(de))}for(let K=0;K<$.added.length;K++){const de=$.added[K];let re=_.indexOf(de);if(re===-1){for(let Ee=0;Ee<x.length;Ee++)if(Ee>=_.length){_.push(de),re=Ee;break}else if(_[Ee]===null){_[Ee]=de,re=Ee;break}if(re===-1)break}const Me=x[re];Me&&Me.connect(de)}}const k=new P,X=new P;function G($,K,de){k.setFromMatrixPosition(K.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);const re=k.distanceTo(X),Me=K.projectionMatrix.elements,Ee=de.projectionMatrix.elements,Re=Me[14]/(Me[10]-1),et=Me[14]/(Me[10]+1),Be=(Me[9]+1)/Me[5],st=(Me[9]-1)/Me[5],N=(Me[8]-1)/Me[0],Jt=(Ee[8]+1)/Ee[0],ke=Re*N,He=Re*Jt,Se=re/(-N+Jt),at=Se*-N;if(K.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(at),$.translateZ(Se),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Me[10]===-1)$.projectionMatrix.copy(K.projectionMatrix),$.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const ye=Re+Se,L=et+Se,A=ke-at,H=He+(re-at),Y=Be*et/L*ye,ee=st*et/L*ye;$.projectionMatrix.makePerspective(A,H,Y,ee,ye,L),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function J($,K){K===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(K.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let K=$.near,de=$.far;v.texture!==null&&(v.depthNear>0&&(K=v.depthNear),v.depthFar>0&&(de=v.depthFar)),y.near=E.near=T.near=K,y.far=E.far=T.far=de,(R!==y.near||I!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,I=y.far),T.layers.mask=$.layers.mask|2,E.layers.mask=$.layers.mask|4,y.layers.mask=T.layers.mask|E.layers.mask;const re=$.parent,Me=y.cameras;J(y,re);for(let Ee=0;Ee<Me.length;Ee++)J(Me[Ee],re);Me.length===2?G(y,T,E):y.projectionMatrix.copy(T.projectionMatrix),se($,y,re)};function se($,K,de){de===null?$.matrix.copy(K.matrixWorld):($.matrix.copy(de.matrixWorld),$.matrix.invert(),$.matrix.multiply(K.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(K.projectionMatrix),$.projectionMatrixInverse.copy(K.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Sn*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let pe=null;function ve($,K){if(u=K.getViewerPose(c||a),g=K,u!==null){const de=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let re=!1;de.length!==y.cameras.length&&(y.cameras.length=0,re=!0);for(let Ee=0;Ee<de.length;Ee++){const Re=de[Ee];let et=null;if(p!==null)et=p.getViewport(Re);else{const st=h.getViewSubImage(d,Re);et=st.viewport,Ee===0&&(e.setRenderTargetTextures(b,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),e.setRenderTarget(b))}let Be=M[Ee];Be===void 0&&(Be=new ir,Be.layers.enable(Ee),Be.viewport=new dt,M[Ee]=Be),Be.matrix.fromArray(Re.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(Re.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(et.x,et.y,et.width,et.height),Ee===0&&(y.matrix.copy(Be.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),re===!0&&y.cameras.push(Be)}const Me=i.enabledFeatures;if(Me&&Me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&h){const Ee=h.getDepthInformation(de[0]);Ee&&Ee.isValid&&Ee.texture&&v.init(e,Ee,i.renderState)}}for(let de=0;de<x.length;de++){const re=_[de],Me=x[de];re!==null&&Me!==void 0&&Me.update(re,K,c||a)}pe&&pe($,K),K.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:K}),g=null}const Le=new su;Le.setAnimationLoop(ve),this.setAnimationLoop=function($){pe=$},this.dispose=function(){}}}const ti=new Hr,av=new je;function ov(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function r(m,f){f.color.getRGB(m.fogColor.value,Kc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,b,x,_){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,_)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),v(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,b,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===1&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===1&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=e.get(f),x=b.envMap,_=b.envMapRotation;x&&(m.envMap.value=x,ti.copy(_),ti.x*=-1,ti.y*=-1,ti.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),m.envMapRotation.value.setFromMatrix4(av.makeRotationFromEuler(ti)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,b,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===1&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const b=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function lv(n,e,t,r){let i={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const _=x.program;r.uniformBlockBinding(b,_)}function c(b,x){let _=i[b.id];_===void 0&&(g(b),_=u(b),i[b.id]=_,b.addEventListener("dispose",m));const S=x.program;r.updateUBOMapping(b,S);const w=e.render.frame;s[b.id]!==w&&(d(b),s[b.id]=w)}function u(b){const x=h();b.__bindingPointIndex=x;const _=n.createBuffer(),S=b.__size,w=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,S,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,_),_}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const x=i[b.id],_=b.uniforms,S=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let w=0,T=_.length;w<T;w++){const E=Array.isArray(_[w])?_[w]:[_[w]];for(let M=0,y=E.length;M<y;M++){const R=E[M];if(p(R,w,M,S)===!0){const I=R.__offset,U=Array.isArray(R.value)?R.value:[R.value];let D=0;for(let z=0;z<U.length;z++){const k=U[z],X=v(k);typeof k=="number"||typeof k=="boolean"?(R.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,I+D,R.__data)):k.isMatrix3?(R.__data[0]=k.elements[0],R.__data[1]=k.elements[1],R.__data[2]=k.elements[2],R.__data[3]=0,R.__data[4]=k.elements[3],R.__data[5]=k.elements[4],R.__data[6]=k.elements[5],R.__data[7]=0,R.__data[8]=k.elements[6],R.__data[9]=k.elements[7],R.__data[10]=k.elements[8],R.__data[11]=0):(k.toArray(R.__data,D),D+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,x,_,S){const w=b.value,T=x+"_"+_;if(S[T]===void 0)return typeof w=="number"||typeof w=="boolean"?S[T]=w:S[T]=w.clone(),!0;{const E=S[T];if(typeof w=="number"||typeof w=="boolean"){if(E!==w)return S[T]=w,!0}else if(E.equals(w)===!1)return E.copy(w),!0}return!1}function g(b){const x=b.uniforms;let _=0;const S=16;for(let T=0,E=x.length;T<E;T++){const M=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,R=M.length;y<R;y++){const I=M[y],U=Array.isArray(I.value)?I.value:[I.value];for(let D=0,z=U.length;D<z;D++){const k=U[D],X=v(k),G=_%S,J=G%X.boundary,se=G+J;_+=J,se!==0&&S-se<X.storage&&(_+=S-se),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=X.storage}}}const w=_%S;return w>0&&(_+=S-w),b.__size=_,b.__cache={},this}function v(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),n.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function f(){for(const b in i)n.deleteBuffer(i[b]);a=[],i={},s={}}return{bind:l,update:c,dispose:f}}class cv{constructor(e={}){const{canvas:t=_h(),context:r=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=r.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const b=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Wt,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let S=!1,w=0,T=0,E=null,M=-1,y=null;const R=new dt,I=new dt;let U=null;const D=new ue(0);let z=0,k=t.width,X=t.height,G=1,J=null,se=null;const pe=new dt(0,0,k,X),ve=new dt(0,0,k,X);let Le=!1;const $=new zs;let K=!1,de=!1;this.transmissionResolutionScale=1;const re=new je,Me=new je,Ee=new P,Re=new dt,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function st(){return E===null?G:1}let N=r;function Jt(C,B){return t.getContext(C,B)}try{const C={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r174"),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",ie,!1),N===null){const B="webgl2";if(N=Jt(B,C),N===null)throw Jt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ke,He,Se,at,ye,L,A,H,Y,ee,q,xe,oe,ge,Xe,te,fe,we,Ae,me,Ge,Ue,tt,O;function ae(){ke=new xm(N),ke.init(),Ue=new tv(N,ke),He=new dm(N,ke,e,Ue),Se=new Qg(N,ke),He.reverseDepthBuffer&&d&&Se.buffers.depth.setReversed(!0),at=new Mm(N),ye=new kg,L=new ev(N,ke,Se,ye,He,Ue,at),A=new fm(_),H=new _m(_),Y=new Ad(N),tt=new um(N,Y),ee=new ym(N,Y,at,tt),q=new Tm(N,ee,Y,at),Ae=new Sm(N,He,L),te=new pm(ye),xe=new zg(_,A,H,ke,He,tt,te),oe=new ov(_,ye),ge=new Gg,Xe=new qg(ke),we=new cm(_,A,H,Se,q,p,l),fe=new Zg(_,q,He),O=new lv(N,at,He,Se),me=new hm(N,ke,at),Ge=new bm(N,ke,at),at.programs=xe.programs,_.capabilities=He,_.extensions=ke,_.properties=ye,_.renderLists=ge,_.shadowMap=fe,_.state=Se,_.info=at}ae();const j=new sv(_,N);this.xr=j,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const C=ke.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ke.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(C){C!==void 0&&(G=C,this.setSize(k,X,!1))},this.getSize=function(C){return C.set(k,X)},this.setSize=function(C,B,V=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,X=B,t.width=Math.floor(C*G),t.height=Math.floor(B*G),V===!0&&(t.style.width=C+"px",t.style.height=B+"px"),this.setViewport(0,0,C,B)},this.getDrawingBufferSize=function(C){return C.set(k*G,X*G).floor()},this.setDrawingBufferSize=function(C,B,V){k=C,X=B,G=V,t.width=Math.floor(C*V),t.height=Math.floor(B*V),this.setViewport(0,0,C,B)},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(pe)},this.setViewport=function(C,B,V,W){C.isVector4?pe.set(C.x,C.y,C.z,C.w):pe.set(C,B,V,W),Se.viewport(R.copy(pe).multiplyScalar(G).round())},this.getScissor=function(C){return C.copy(ve)},this.setScissor=function(C,B,V,W){C.isVector4?ve.set(C.x,C.y,C.z,C.w):ve.set(C,B,V,W),Se.scissor(I.copy(ve).multiplyScalar(G).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(C){Se.setScissorTest(Le=C)},this.setOpaqueSort=function(C){J=C},this.setTransparentSort=function(C){se=C},this.getClearColor=function(C){return C.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(C=!0,B=!0,V=!0){let W=0;if(C){let F=!1;if(E!==null){const Q=E.texture.format;F=Q===1033||Q===1031||Q===1029}if(F){const Q=E.texture.type,ce=Q===1009||Q===1014||Q===1012||Q===1020||Q===1017||Q===1018,he=we.getClearColor(),_e=we.getClearAlpha(),Pe=he.r,Ce=he.g,Ie=he.b;ce?(g[0]=Pe,g[1]=Ce,g[2]=Ie,g[3]=_e,N.clearBufferuiv(N.COLOR,0,g)):(v[0]=Pe,v[1]=Ce,v[2]=Ie,v[3]=_e,N.clearBufferiv(N.COLOR,0,v))}else W|=N.COLOR_BUFFER_BIT}B&&(W|=N.DEPTH_BUFFER_BIT),V&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),we.dispose(),ge.dispose(),Xe.dispose(),ye.dispose(),A.dispose(),H.dispose(),q.dispose(),tt.dispose(),O.dispose(),xe.dispose(),j.dispose(),j.removeEventListener("sessionstart",No),j.removeEventListener("sessionend",Oo),Xr.stop()};function Z(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const C=at.autoReset,B=fe.enabled,V=fe.autoUpdate,W=fe.needsUpdate,F=fe.type;ae(),at.autoReset=C,fe.enabled=B,fe.autoUpdate=V,fe.needsUpdate=W,fe.type=F}function ie(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ve(C){const B=C.target;B.removeEventListener("dispose",Ve),ut(B)}function ut(C){Rt(C),ye.remove(C)}function Rt(C){const B=ye.get(C).programs;B!==void 0&&(B.forEach(function(V){xe.releaseProgram(V)}),C.isShaderMaterial&&xe.releaseShaderCache(C))}this.renderBufferDirect=function(C,B,V,W,F,Q){B===null&&(B=et);const ce=F.isMesh&&F.matrixWorld.determinant()<0,he=Ru(C,B,V,W,F);Se.setMaterial(W,ce);let _e=V.index,Pe=1;if(W.wireframe===!0){if(_e=ee.getWireframeAttribute(V),_e===void 0)return;Pe=2}const Ce=V.drawRange,Ie=V.attributes.position;let $e=Ce.start*Pe,Je=(Ce.start+Ce.count)*Pe;Q!==null&&($e=Math.max($e,Q.start*Pe),Je=Math.min(Je,(Q.start+Q.count)*Pe)),_e!==null?($e=Math.max($e,0),Je=Math.min(Je,_e.count)):Ie!=null&&($e=Math.max($e,0),Je=Math.min(Je,Ie.count));const _t=Je-$e;if(_t<0||_t===1/0)return;tt.setup(F,W,he,V,_e);let Qe,rt=me;if(_e!==null&&(Qe=Y.get(_e),rt=Ge,rt.setIndex(Qe)),F.isMesh)W.wireframe===!0?(Se.setLineWidth(W.wireframeLinewidth*st()),rt.setMode(N.LINES)):rt.setMode(N.TRIANGLES);else if(F.isLine){let Te=W.linewidth;Te===void 0&&(Te=1),Se.setLineWidth(Te*st()),F.isLineSegments?rt.setMode(N.LINES):F.isLineLoop?rt.setMode(N.LINE_LOOP):rt.setMode(N.LINE_STRIP)}else F.isPoints?rt.setMode(N.POINTS):F.isSprite&&rt.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)si("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),rt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))rt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Te=F._multiDrawStarts,zt=F._multiDrawCounts,jr=F._multiDrawCount,or=_e?Y.get(_e).bytesPerElement:1,di=ye.get(W).currentProgram.getUniforms();for(let jt=0;jt<jr;jt++)di.setValue(N,"_gl_DrawID",jt),rt.render(Te[jt]/or,zt[jt])}else if(F.isInstancedMesh)rt.renderInstances($e,_t,F.count);else if(V.isInstancedBufferGeometry){const Te=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,zt=Math.min(V.instanceCount,Te);rt.renderInstances($e,_t,zt)}else rt.render($e,_t)};function Ke(C,B,V){C.transparent===!0&&C.side===2&&C.forceSinglePass===!1?(C.side=1,C.needsUpdate=!0,In(C,B,V),C.side=0,C.needsUpdate=!0,In(C,B,V),C.side=2):In(C,B,V)}this.compile=function(C,B,V=null){V===null&&(V=C),f=Xe.get(V),f.init(B),x.push(f),V.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),C!==V&&C.traverseVisible(function(F){F.isLight&&F.layers.test(B.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const W=new Set;return C.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const Q=F.material;if(Q)if(Array.isArray(Q))for(let ce=0;ce<Q.length;ce++){const he=Q[ce];Ke(he,V,F),W.add(he)}else Ke(Q,V,F),W.add(Q)}),f=x.pop(),W},this.compileAsync=function(C,B,V=null){const W=this.compile(C,B,V);return new Promise(F=>{function Q(){if(W.forEach(function(ce){ye.get(ce).currentProgram.isReady()&&W.delete(ce)}),W.size===0){F(C);return}setTimeout(Q,10)}ke.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let ar=null;function yr(C){ar&&ar(C)}function No(){Xr.stop()}function Oo(){Xr.start()}const Xr=new su;Xr.setAnimationLoop(yr),typeof self<"u"&&Xr.setContext(self),this.setAnimationLoop=function(C){ar=C,j.setAnimationLoop(C),C===null?Xr.stop():Xr.start()},j.addEventListener("sessionstart",No),j.addEventListener("sessionend",Oo),this.render=function(C,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(B),B=j.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,B,E),f=Xe.get(C,x.length),f.init(B),x.push(f),Me.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),$.setFromProjectionMatrix(Me),de=this.localClippingEnabled,K=te.init(this.clippingPlanes,de),m=ge.get(C,b.length),m.init(),b.push(m),j.enabled===!0&&j.isPresenting===!0){const Q=_.xr.getDepthSensingMesh();Q!==null&&Ws(Q,B,-1/0,_.sortObjects)}Ws(C,B,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(J,se),Be=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Be&&we.addToRenderList(m,C),this.info.render.frame++,K===!0&&te.beginShadows();const V=f.state.shadowsArray;fe.render(V,C,B),K===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(f.setupLights(),B.isArrayCamera){const Q=B.cameras;if(F.length>0)for(let ce=0,he=Q.length;ce<he;ce++){const _e=Q[ce];Bo(W,F,C,_e)}Be&&we.render(C);for(let ce=0,he=Q.length;ce<he;ce++){const _e=Q[ce];Fo(m,C,_e,_e.viewport)}}else F.length>0&&Bo(W,F,C,B),Be&&we.render(C),Fo(m,C,B);E!==null&&T===0&&(L.updateMultisampleRenderTarget(E),L.updateRenderTargetMipmap(E)),C.isScene===!0&&C.onAfterRender(_,C,B),tt.resetDefaultState(),M=-1,y=null,x.pop(),x.length>0?(f=x[x.length-1],K===!0&&te.setGlobalState(_.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Ws(C,B,V,W){if(C.visible===!1)return;if(C.layers.test(B.layers)){if(C.isGroup)V=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(B);else if(C.isLight)f.pushLight(C),C.castShadow&&f.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||$.intersectsSprite(C)){W&&Re.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Me);const Q=q.update(C),ce=C.material;ce.visible&&m.push(C,Q,ce,V,Re.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||$.intersectsObject(C))){const Q=q.update(C),ce=C.material;if(W&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Re.copy(C.boundingSphere.center)):(Q.boundingSphere===null&&Q.computeBoundingSphere(),Re.copy(Q.boundingSphere.center)),Re.applyMatrix4(C.matrixWorld).applyMatrix4(Me)),Array.isArray(ce)){const he=Q.groups;for(let _e=0,Pe=he.length;_e<Pe;_e++){const Ce=he[_e],Ie=ce[Ce.materialIndex];Ie&&Ie.visible&&m.push(C,Q,Ie,V,Re.z,Ce)}}else ce.visible&&m.push(C,Q,ce,V,Re.z,null)}}const F=C.children;for(let Q=0,ce=F.length;Q<ce;Q++)Ws(F[Q],B,V,W)}function Fo(C,B,V,W){const F=C.opaque,Q=C.transmissive,ce=C.transparent;f.setupLightsView(V),K===!0&&te.setGlobalState(_.clippingPlanes,V),W&&Se.viewport(R.copy(W)),F.length>0&&Pn(F,B,V),Q.length>0&&Pn(Q,B,V),ce.length>0&&Pn(ce,B,V),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Bo(C,B,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new mr(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ze.workingColorSpace}));const F=f.state.transmissionRenderTarget[W.id],Q=W.viewport||R;F.setSize(Q.z*_.transmissionResolutionScale,Q.w*_.transmissionResolutionScale);const ce=_.getRenderTarget();_.setRenderTarget(F),_.getClearColor(D),z=_.getClearAlpha(),z<1&&_.setClearColor(16777215,.5),_.clear(),Be&&we.render(V);const he=_.toneMapping;_.toneMapping=0;const _e=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),K===!0&&te.setGlobalState(_.clippingPlanes,W),Pn(C,V,W),L.updateMultisampleRenderTarget(F),L.updateRenderTargetMipmap(F),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let Ce=0,Ie=B.length;Ce<Ie;Ce++){const $e=B[Ce],Je=$e.object,_t=$e.geometry,Qe=$e.material,rt=$e.group;if(Qe.side===2&&Je.layers.test(W.layers)){const Te=Qe.side;Qe.side=1,Qe.needsUpdate=!0,zo(Je,V,W,_t,Qe,rt),Qe.side=Te,Qe.needsUpdate=!0,Pe=!0}}Pe===!0&&(L.updateMultisampleRenderTarget(F),L.updateRenderTargetMipmap(F))}_.setRenderTarget(ce),_.setClearColor(D,z),_e!==void 0&&(W.viewport=_e),_.toneMapping=he}function Pn(C,B,V){const W=B.isScene===!0?B.overrideMaterial:null;for(let F=0,Q=C.length;F<Q;F++){const ce=C[F],he=ce.object,_e=ce.geometry,Pe=W===null?ce.material:W,Ce=ce.group;he.layers.test(V.layers)&&zo(he,B,V,_e,Pe,Ce)}}function zo(C,B,V,W,F,Q){C.onBeforeRender(_,B,V,W,F,Q),C.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),F.onBeforeRender(_,B,V,W,C,Q),F.transparent===!0&&F.side===2&&F.forceSinglePass===!1?(F.side=1,F.needsUpdate=!0,_.renderBufferDirect(V,B,W,F,C,Q),F.side=0,F.needsUpdate=!0,_.renderBufferDirect(V,B,W,F,C,Q),F.side=2):_.renderBufferDirect(V,B,W,F,C,Q),C.onAfterRender(_,B,V,W,F,Q)}function In(C,B,V){B.isScene!==!0&&(B=et);const W=ye.get(C),F=f.state.lights,Q=f.state.shadowsArray,ce=F.state.version,he=xe.getParameters(C,F.state,Q,B,V),_e=xe.getProgramCacheKey(he);let Pe=W.programs;W.environment=C.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(C.isMeshStandardMaterial?H:A).get(C.envMap||W.environment),W.envMapRotation=W.environment!==null&&C.envMap===null?B.environmentRotation:C.envMapRotation,Pe===void 0&&(C.addEventListener("dispose",Ve),Pe=new Map,W.programs=Pe);let Ce=Pe.get(_e);if(Ce!==void 0){if(W.currentProgram===Ce&&W.lightsStateVersion===ce)return Ho(C,he),Ce}else he.uniforms=xe.getUniforms(C),C.onBeforeCompile(he,_),Ce=xe.acquireProgram(he,_e),Pe.set(_e,Ce),W.uniforms=he.uniforms;const Ie=W.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ie.clippingPlanes=te.uniform),Ho(C,he),W.needsLights=Iu(C),W.lightsStateVersion=ce,W.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Ce,W.uniformsList=null,Ce}function ko(C){if(C.uniformsList===null){const B=C.currentProgram.getUniforms();C.uniformsList=As.seqWithValue(B.seq,C.uniforms)}return C.uniformsList}function Ho(C,B){const V=ye.get(C);V.outputColorSpace=B.outputColorSpace,V.batching=B.batching,V.batchingColor=B.batchingColor,V.instancing=B.instancing,V.instancingColor=B.instancingColor,V.instancingMorph=B.instancingMorph,V.skinning=B.skinning,V.morphTargets=B.morphTargets,V.morphNormals=B.morphNormals,V.morphColors=B.morphColors,V.morphTargetsCount=B.morphTargetsCount,V.numClippingPlanes=B.numClippingPlanes,V.numIntersection=B.numClipIntersection,V.vertexAlphas=B.vertexAlphas,V.vertexTangents=B.vertexTangents,V.toneMapping=B.toneMapping}function Ru(C,B,V,W,F){B.isScene!==!0&&(B=et),L.resetTextureUnits();const Q=B.fog,ce=W.isMeshStandardMaterial?B.environment:null,he=E===null?_.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Gi,_e=(W.isMeshStandardMaterial?H:A).get(W.envMap||ce),Pe=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ce=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!V.morphAttributes.position,$e=!!V.morphAttributes.normal,Je=!!V.morphAttributes.color;let _t=0;W.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(_t=_.toneMapping);const Qe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,rt=Qe!==void 0?Qe.length:0,Te=ye.get(W),zt=f.state.lights;if(K===!0&&(de===!0||C!==y)){const Et=C===y&&W.id===M;te.setState(W,C,Et)}let jr=!1;W.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==zt.state.version||Te.outputColorSpace!==he||F.isBatchedMesh&&Te.batching===!1||!F.isBatchedMesh&&Te.batching===!0||F.isBatchedMesh&&Te.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Te.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Te.instancing===!1||!F.isInstancedMesh&&Te.instancing===!0||F.isSkinnedMesh&&Te.skinning===!1||!F.isSkinnedMesh&&Te.skinning===!0||F.isInstancedMesh&&Te.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Te.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Te.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Te.instancingMorph===!1&&F.morphTexture!==null||Te.envMap!==_e||W.fog===!0&&Te.fog!==Q||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==te.numPlanes||Te.numIntersection!==te.numIntersection)||Te.vertexAlphas!==Pe||Te.vertexTangents!==Ce||Te.morphTargets!==Ie||Te.morphNormals!==$e||Te.morphColors!==Je||Te.toneMapping!==_t||Te.morphTargetsCount!==rt)&&(jr=!0):(jr=!0,Te.__version=W.version);let or=Te.currentProgram;jr===!0&&(or=In(W,B,F));let di=!1,jt=!1,Ji=!1;const ct=or.getUniforms(),Qt=Te.uniforms;if(Se.useProgram(or.program)&&(di=!0,jt=!0,Ji=!0),W.id!==M&&(M=W.id,jt=!0),di||y!==C){Se.buffers.depth.getReversed()?(re.copy(C.projectionMatrix),yh(re),bh(re),ct.setValue(N,"projectionMatrix",re)):ct.setValue(N,"projectionMatrix",C.projectionMatrix),ct.setValue(N,"viewMatrix",C.matrixWorldInverse);const Et=ct.map.cameraPosition;Et!==void 0&&Et.setValue(N,Ee.setFromMatrixPosition(C.matrixWorld)),He.logarithmicDepthBuffer&&ct.setValue(N,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ct.setValue(N,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,jt=!0,Ji=!0)}if(F.isSkinnedMesh){ct.setOptional(N,F,"bindMatrix"),ct.setOptional(N,F,"bindMatrixInverse");const Et=F.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),ct.setValue(N,"boneTexture",Et.boneTexture,L))}F.isBatchedMesh&&(ct.setOptional(N,F,"batchingTexture"),ct.setValue(N,"batchingTexture",F._matricesTexture,L),ct.setOptional(N,F,"batchingIdTexture"),ct.setValue(N,"batchingIdTexture",F._indirectTexture,L),ct.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&ct.setValue(N,"batchingColorTexture",F._colorsTexture,L));const er=V.morphAttributes;if((er.position!==void 0||er.normal!==void 0||er.color!==void 0)&&Ae.update(F,V,or),(jt||Te.receiveShadow!==F.receiveShadow)&&(Te.receiveShadow=F.receiveShadow,ct.setValue(N,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Qt.envMap.value=_e,Qt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&B.environment!==null&&(Qt.envMapIntensity.value=B.environmentIntensity),jt&&(ct.setValue(N,"toneMappingExposure",_.toneMappingExposure),Te.needsLights&&Pu(Qt,Ji),Q&&W.fog===!0&&oe.refreshFogUniforms(Qt,Q),oe.refreshMaterialUniforms(Qt,W,G,X,f.state.transmissionRenderTarget[C.id]),As.upload(N,ko(Te),Qt,L)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(As.upload(N,ko(Te),Qt,L),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ct.setValue(N,"center",F.center),ct.setValue(N,"modelViewMatrix",F.modelViewMatrix),ct.setValue(N,"normalMatrix",F.normalMatrix),ct.setValue(N,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Et=W.uniformsGroups;for(let lr=0,Xs=Et.length;lr<Xs;lr++){const $r=Et[lr];O.update($r,or),O.bind($r,or)}}return or}function Pu(C,B){C.ambientLightColor.needsUpdate=B,C.lightProbe.needsUpdate=B,C.directionalLights.needsUpdate=B,C.directionalLightShadows.needsUpdate=B,C.pointLights.needsUpdate=B,C.pointLightShadows.needsUpdate=B,C.spotLights.needsUpdate=B,C.spotLightShadows.needsUpdate=B,C.rectAreaLights.needsUpdate=B,C.hemisphereLights.needsUpdate=B}function Iu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(C,B,V){ye.get(C.texture).__webglTexture=B,ye.get(C.depthTexture).__webglTexture=V;const W=ye.get(C);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,B){const V=ye.get(C);V.__webglFramebuffer=B,V.__useDefaultFramebuffer=B===void 0};const Lu=N.createFramebuffer();this.setRenderTarget=function(C,B=0,V=0){E=C,w=B,T=V;let W=!0,F=null,Q=!1,ce=!1;if(C){const he=ye.get(C);if(he.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(he.__webglFramebuffer===void 0)L.setupRenderTarget(C);else if(he.__hasExternalTextures)L.rebindTextures(C,ye.get(C.texture).__webglTexture,ye.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ce=C.depthTexture;if(he.__boundDepthTexture!==Ce){if(Ce!==null&&ye.has(Ce)&&(C.width!==Ce.image.width||C.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(C)}}const _e=C.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(ce=!0);const Pe=ye.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Pe[B])?F=Pe[B][V]:F=Pe[B],Q=!0):C.samples>0&&L.useMultisampledRTT(C)===!1?F=ye.get(C).__webglMultisampledFramebuffer:Array.isArray(Pe)?F=Pe[V]:F=Pe,R.copy(C.viewport),I.copy(C.scissor),U=C.scissorTest}else R.copy(pe).multiplyScalar(G).floor(),I.copy(ve).multiplyScalar(G).floor(),U=Le;if(V!==0&&(F=Lu),Se.bindFramebuffer(N.FRAMEBUFFER,F)&&W&&Se.drawBuffers(C,F),Se.viewport(R),Se.scissor(I),Se.setScissorTest(U),Q){const he=ye.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+B,he.__webglTexture,V)}else if(ce){const he=ye.get(C.texture),_e=B;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,he.__webglTexture,V,_e)}else if(C!==null&&V!==0){const he=ye.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,he.__webglTexture,V)}M=-1},this.readRenderTargetPixels=function(C,B,V,W,F,Q,ce){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let he=ye.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he){Se.bindFramebuffer(N.FRAMEBUFFER,he);try{const _e=C.texture,Pe=_e.format,Ce=_e.type;if(!He.textureFormatReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Ce)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=C.width-W&&V>=0&&V<=C.height-F&&N.readPixels(B,V,W,F,Ue.convert(Pe),Ue.convert(Ce),Q)}finally{const _e=E!==null?ye.get(E).__webglFramebuffer:null;Se.bindFramebuffer(N.FRAMEBUFFER,_e)}}},this.readRenderTargetPixelsAsync=async function(C,B,V,W,F,Q,ce){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let he=ye.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ce!==void 0&&(he=he[ce]),he){const _e=C.texture,Pe=_e.format,Ce=_e.type;if(!He.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=C.width-W&&V>=0&&V<=C.height-F){Se.bindFramebuffer(N.FRAMEBUFFER,he);const Ie=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ie),N.bufferData(N.PIXEL_PACK_BUFFER,Q.byteLength,N.STREAM_READ),N.readPixels(B,V,W,F,Ue.convert(Pe),Ue.convert(Ce),0);const $e=E!==null?ye.get(E).__webglFramebuffer:null;Se.bindFramebuffer(N.FRAMEBUFFER,$e);const Je=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await xh(N,Je,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ie),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Q),N.deleteBuffer(Ie),N.deleteSync(Je),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,B=null,V=0){C.isTexture!==!0&&(si("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,C=arguments[1]);const W=Math.pow(2,-V),F=Math.floor(C.image.width*W),Q=Math.floor(C.image.height*W),ce=B!==null?B.x:0,he=B!==null?B.y:0;L.setTexture2D(C,0),N.copyTexSubImage2D(N.TEXTURE_2D,V,0,0,ce,he,F,Q),Se.unbindTexture()};const Uu=N.createFramebuffer(),Du=N.createFramebuffer();this.copyTextureToTexture=function(C,B,V=null,W=null,F=0,Q=null){C.isTexture!==!0&&(si("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1],B=arguments[2],Q=arguments[3]||0,V=null),Q===null&&(F!==0?(si("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Q=F,F=0):Q=0);let ce,he,_e,Pe,Ce,Ie,$e,Je,_t;const Qe=C.isCompressedTexture?C.mipmaps[Q]:C.image;if(V!==null)ce=V.max.x-V.min.x,he=V.max.y-V.min.y,_e=V.isBox3?V.max.z-V.min.z:1,Pe=V.min.x,Ce=V.min.y,Ie=V.isBox3?V.min.z:0;else{const er=Math.pow(2,-F);ce=Math.floor(Qe.width*er),he=Math.floor(Qe.height*er),C.isDataArrayTexture?_e=Qe.depth:C.isData3DTexture?_e=Math.floor(Qe.depth*er):_e=1,Pe=0,Ce=0,Ie=0}W!==null?($e=W.x,Je=W.y,_t=W.z):($e=0,Je=0,_t=0);const rt=Ue.convert(B.format),Te=Ue.convert(B.type);let zt;B.isData3DTexture?(L.setTexture3D(B,0),zt=N.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(L.setTexture2DArray(B,0),zt=N.TEXTURE_2D_ARRAY):(L.setTexture2D(B,0),zt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment);const jr=N.getParameter(N.UNPACK_ROW_LENGTH),or=N.getParameter(N.UNPACK_IMAGE_HEIGHT),di=N.getParameter(N.UNPACK_SKIP_PIXELS),jt=N.getParameter(N.UNPACK_SKIP_ROWS),Ji=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Qe.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Qe.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Pe),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ce),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie);const ct=C.isDataArrayTexture||C.isData3DTexture,Qt=B.isDataArrayTexture||B.isData3DTexture;if(C.isDepthTexture){const er=ye.get(C),Et=ye.get(B),lr=ye.get(er.__renderTarget),Xs=ye.get(Et.__renderTarget);Se.bindFramebuffer(N.READ_FRAMEBUFFER,lr.__webglFramebuffer),Se.bindFramebuffer(N.DRAW_FRAMEBUFFER,Xs.__webglFramebuffer);for(let $r=0;$r<_e;$r++)ct&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ye.get(C).__webglTexture,F,Ie+$r),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ye.get(B).__webglTexture,Q,_t+$r)),N.blitFramebuffer(Pe,Ce,ce,he,$e,Je,ce,he,N.DEPTH_BUFFER_BIT,N.NEAREST);Se.bindFramebuffer(N.READ_FRAMEBUFFER,null),Se.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(F!==0||C.isRenderTargetTexture||ye.has(C)){const er=ye.get(C),Et=ye.get(B);Se.bindFramebuffer(N.READ_FRAMEBUFFER,Uu),Se.bindFramebuffer(N.DRAW_FRAMEBUFFER,Du);for(let lr=0;lr<_e;lr++)ct?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,er.__webglTexture,F,Ie+lr):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,er.__webglTexture,F),Qt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Et.__webglTexture,Q,_t+lr):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Et.__webglTexture,Q),F!==0?N.blitFramebuffer(Pe,Ce,ce,he,$e,Je,ce,he,N.COLOR_BUFFER_BIT,N.NEAREST):Qt?N.copyTexSubImage3D(zt,Q,$e,Je,_t+lr,Pe,Ce,ce,he):N.copyTexSubImage2D(zt,Q,$e,Je,Pe,Ce,ce,he);Se.bindFramebuffer(N.READ_FRAMEBUFFER,null),Se.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Qt?C.isDataTexture||C.isData3DTexture?N.texSubImage3D(zt,Q,$e,Je,_t,ce,he,_e,rt,Te,Qe.data):B.isCompressedArrayTexture?N.compressedTexSubImage3D(zt,Q,$e,Je,_t,ce,he,_e,rt,Qe.data):N.texSubImage3D(zt,Q,$e,Je,_t,ce,he,_e,rt,Te,Qe):C.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Q,$e,Je,ce,he,rt,Te,Qe.data):C.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Q,$e,Je,Qe.width,Qe.height,rt,Qe.data):N.texSubImage2D(N.TEXTURE_2D,Q,$e,Je,ce,he,rt,Te,Qe);N.pixelStorei(N.UNPACK_ROW_LENGTH,jr),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,or),N.pixelStorei(N.UNPACK_SKIP_PIXELS,di),N.pixelStorei(N.UNPACK_SKIP_ROWS,jt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ji),Q===0&&B.generateMipmaps&&N.generateMipmap(zt),Se.unbindTexture()},this.copyTextureToTexture3D=function(C,B,V=null,W=null,F=0){return C.isTexture!==!0&&(si("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,C=arguments[2],B=arguments[3],F=arguments[4]||0),si('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,B,V,W,F)},this.initRenderTarget=function(C){ye.get(C).__webglFramebuffer===void 0&&L.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?L.setTextureCube(C,0):C.isData3DTexture?L.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?L.setTexture2DArray(C,0):L.setTexture2D(C,0),Se.unbindTexture()},this.resetState=function(){w=0,T=0,E=null,Se.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=ze._getUnpackColorSpace()}}const uu=0,uv=1,hv=2,Kl=2,Ca=1.25,Zl=1,Nt=32,xt=Nt/4,hu=65535,Cs=Math.pow(2,-24),Eo=Symbol("SKIP_GENERATION"),du={strategy:uu,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Eo]:!1};function ht(n,e,t){return t.min.x=e[n],t.min.y=e[n+1],t.min.z=e[n+2],t.max.x=e[n+3],t.max.y=e[n+4],t.max.z=e[n+5],t}function Ka(n){let e=-1,t=-1/0;for(let r=0;r<3;r++){const i=n[r+3]-n[r];i>t&&(t=i,e=r)}return e}function Jl(n,e){e.set(n)}function Ql(n,e,t){let r,i;for(let s=0;s<3;s++){const a=s+3;r=n[s],i=e[s],t[s]=r<i?r:i,r=n[a],i=e[a],t[a]=r>i?r:i}}function os(n,e,t){for(let r=0;r<3;r++){const i=e[n+2*r],s=e[n+2*r+1],a=i-s,o=i+s;a<t[r]&&(t[r]=a),o>t[r+3]&&(t[r+3]=o)}}function an(n){const e=n[3]-n[0],t=n[4]-n[1],r=n[5]-n[2];return 2*(e*t+t*r+r*e)}function pt(n,e){return e[n+15]===hu}function wt(n,e){return e[n+6]}function Ot(n,e){return e[n+14]}function yt(n){return n+xt}function bt(n,e){const t=e[n+6];return n+t*xt}function Ao(n,e){return e[n+7]}function Ra(n,e,t,r,i){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0,h=1/0,d=1/0,p=1/0,g=-1/0,v=-1/0,m=-1/0;const f=n.offset||0;for(let b=(e-f)*6,x=(e+t-f)*6;b<x;b+=6){const _=n[b+0],S=n[b+1],w=_-S,T=_+S;w<s&&(s=w),T>l&&(l=T),_<h&&(h=_),_>g&&(g=_);const E=n[b+2],M=n[b+3],y=E-M,R=E+M;y<a&&(a=y),R>c&&(c=R),E<d&&(d=E),E>v&&(v=E);const I=n[b+4],U=n[b+5],D=I-U,z=I+U;D<o&&(o=D),z>u&&(u=z),I<p&&(p=I),I>m&&(m=I)}r[0]=s,r[1]=a,r[2]=o,r[3]=l,r[4]=c,r[5]=u,i[0]=h,i[1]=d,i[2]=p,i[3]=g,i[4]=v,i[5]=m}const Ar=32,dv=(n,e)=>n.candidate-e.candidate,Fr=new Array(Ar).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ls=new Float32Array(6);function pv(n,e,t,r,i,s){let a=-1,o=0;if(s===uu)a=Ka(e),a!==-1&&(o=(e[a]+e[a+3])/2);else if(s===uv)a=Ka(n),a!==-1&&(o=fv(t,r,i,a));else if(s===hv){const l=an(n);let c=Ca*i;const u=t.offset||0,h=(r-u)*6,d=(r+i-u)*6;for(let p=0;p<3;p++){const g=e[p],v=(e[p+3]-g)/Ar;if(i<Ar/4){const m=[...Fr];m.length=i;let f=0;for(let x=h;x<d;x+=6,f++){const _=m[f];_.candidate=t[x+2*p],_.count=0;const{bounds:S,leftCacheBounds:w,rightCacheBounds:T}=_;for(let E=0;E<3;E++)T[E]=1/0,T[E+3]=-1/0,w[E]=1/0,w[E+3]=-1/0,S[E]=1/0,S[E+3]=-1/0;os(x,t,S)}m.sort(dv);let b=i;for(let x=0;x<b;x++){const _=m[x];for(;x+1<b&&m[x+1].candidate===_.candidate;)m.splice(x+1,1),b--}for(let x=h;x<d;x+=6){const _=t[x+2*p];for(let S=0;S<b;S++){const w=m[S];_>=w.candidate?os(x,t,w.rightCacheBounds):(os(x,t,w.leftCacheBounds),w.count++)}}for(let x=0;x<b;x++){const _=m[x],S=_.count,w=i-_.count,T=_.leftCacheBounds,E=_.rightCacheBounds;let M=0;S!==0&&(M=an(T)/l);let y=0;w!==0&&(y=an(E)/l);const R=Zl+Ca*(M*S+y*w);R<c&&(a=p,c=R,o=_.candidate)}}else{for(let b=0;b<Ar;b++){const x=Fr[b];x.count=0,x.candidate=g+v+b*v;const _=x.bounds;for(let S=0;S<3;S++)_[S]=1/0,_[S+3]=-1/0}for(let b=h;b<d;b+=6){let x=~~((t[b+2*p]-g)/v);x>=Ar&&(x=Ar-1);const _=Fr[x];_.count++,os(b,t,_.bounds)}const m=Fr[Ar-1];Jl(m.bounds,m.rightCacheBounds);for(let b=Ar-2;b>=0;b--){const x=Fr[b],_=Fr[b+1];Ql(x.bounds,_.rightCacheBounds,x.rightCacheBounds)}let f=0;for(let b=0;b<Ar-1;b++){const x=Fr[b],_=x.count,S=x.bounds,w=Fr[b+1].rightCacheBounds;_!==0&&(f===0?Jl(S,ls):Ql(S,ls,ls)),f+=_;let T=0,E=0;f!==0&&(T=an(ls)/l);const M=i-f;M!==0&&(E=an(w)/l);const y=Zl+Ca*(T*f+E*M);y<c&&(a=p,c=y,o=x.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${s} used.`);return{axis:a,pos:o}}function fv(n,e,t,r){let i=0;const s=n.offset;for(let a=e,o=e+t;a<o;a++)i+=n[(a-s)*6+r*2];return i/t}let Pa=class{constructor(){this.boundingData=new Float32Array(6)}};function mv(n,e,t,r,i,s){let a=r,o=r+i-1;const l=s.pos,c=s.axis*2,u=t.offset||0;for(;;){for(;a<=o&&t[(a-u)*6+c]<l;)a++;for(;a<=o&&t[(o-u)*6+c]>=l;)o--;if(a<o){for(let h=0;h<e;h++){let d=n[a*e+h];n[a*e+h]=n[o*e+h],n[o*e+h]=d}for(let h=0;h<6;h++){const d=a-u,p=o-u,g=t[d*6+h];t[d*6+h]=t[p*6+h],t[p*6+h]=g}a++,o--}else return a}}let pu,Rs,Za,fu;const gv=Math.pow(2,32);function Ja(n){return"count"in n?1:1+Ja(n.left)+Ja(n.right)}function vv(n,e,t){return pu=new Float32Array(t),Rs=new Uint32Array(t),Za=new Uint16Array(t),fu=new Uint8Array(t),Qa(n,e)}function Qa(n,e){const t=n/4,r=n/2,i="count"in e,s=e.boundingData;for(let a=0;a<6;a++)pu[t+a]=s[a];if(i)return e.buffer?(fu.set(new Uint8Array(e.buffer),n),n+e.buffer.byteLength):(Rs[t+6]=e.offset,Za[r+14]=e.count,Za[r+15]=hu,n+Nt);{const{left:a,right:o,splitAxis:l}=e,c=n+Nt;let u=Qa(c,a);const h=n/Nt,d=u/Nt-h;if(d>gv)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Rs[t+6]=d,Rs[t+7]=l,Qa(u,o)}}function _v(n,e,t,r,i,s){const{maxDepth:a,verbose:o,targetLeafSize:l,_strictLeafSize:c=1/0,strategy:u,onProgress:h}=i,d=n.primitiveBuffer,p=n.primitiveBufferStride,g=new Float32Array(6);let v=!1;const m=new Pa;return Ra(e,t,r,m.boundingData,g),b(m,t,r,g),m;function f(x){h&&h((x-s.offset)/s.count)}function b(x,_,S,w=null,T=0){!v&&T>=a&&(v=!0,o&&console.warn(`BVH: Max depth of ${a} reached when generating BVH. Consider increasing maxDepth.`));const E=S>c;if(S<=l&&!E||T>=a)return f(_+S),x.offset=_,x.count=S,x;const M=pv(x.boundingData,w,e,_,S,u);let y=M.axis===-1?-1:mv(d,p,e,_,S,M);if(M.axis===-1||y===_||y===_+S){if(!E)return f(_+S),x.offset=_,x.count=S,x;M.axis=Math.max(0,Ka(x.boundingData)),y=_+Math.max(1,Math.floor(S/2))}x.splitAxis=M.axis;const R=new Pa,I=_,U=y-_;x.left=R,Ra(e,I,U,R.boundingData,g),b(R,I,U,g,T+1);const D=new Pa,z=y,k=S-U;return x.right=D,Ra(e,z,k,D.boundingData,g),b(D,z,k,g,T+1),x}}function xv(n,e){const t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=n.getRootRanges(e.range),i=r[0],s=r[r.length-1],a={offset:i.offset,count:s.offset+s.count-i.offset},o=new Float32Array(6*a.count);o.offset=a.offset,n.computePrimitiveBounds(a.offset,a.count,o),n._roots=r.map(l=>{const c=_v(n,o,l.offset,l.count,e,a),u=Ja(c),h=new t(Nt*u);return vv(0,c,h),h})}let Co=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},yv=class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=r=>{t&&e.push(t),t=r,this.float32Array=new Float32Array(r),this.uint16Array=new Uint16Array(r),this.uint32Array=new Uint32Array(r)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}};const lt=new yv;let kr,zi;const Ei=[],cs=new Co(()=>new ft);function bv(n,e,t,r,i,s){kr=cs.getPrimitive(),zi=cs.getPrimitive(),Ei.push(kr,zi),lt.setBuffer(n._roots[e]);const a=eo(0,n.geometry,t,r,i,s);lt.clearBuffer(),cs.releasePrimitive(kr),cs.releasePrimitive(zi),Ei.pop(),Ei.pop();const o=Ei.length;return o>0&&(zi=Ei[o-1],kr=Ei[o-2]),a}function eo(n,e,t,r,i=null,s=0,a=0){const{float32Array:o,uint16Array:l,uint32Array:c}=lt;let u=n*2;if(pt(u,l)){const h=wt(n,c),d=Ot(u,l);return ht(n,o,kr),r(h,d,!1,a,s+n/xt,kr)}else{let h=function(R){const{uint16Array:I,uint32Array:U}=lt;let D=R*2;for(;!pt(D,I);)R=yt(R),D=R*2;return wt(R,U)},d=function(R){const{uint16Array:I,uint32Array:U}=lt;let D=R*2;for(;!pt(D,I);)R=bt(R,U),D=R*2;return wt(R,U)+Ot(D,I)};const p=yt(n),g=bt(n,c);let v=p,m=g,f,b,x,_;if(i&&(x=kr,_=zi,ht(v,o,x),ht(m,o,_),f=i(x),b=i(_),b<f)){v=g,m=p;const R=f;f=b,b=R,x=_}x||(x=kr,ht(v,o,x));const S=pt(v*2,l),w=t(x,S,f,a+1,s+v/xt);let T;if(w===Kl){const R=h(v),I=d(v)-R;T=r(R,I,!0,a+1,s+v/xt,x)}else T=w&&eo(v,e,t,r,i,s,a+1);if(T)return!0;_=zi,ht(m,o,_);const E=pt(m*2,l),M=t(_,E,b,a+1,s+m/xt);let y;if(M===Kl){const R=h(m),I=d(m)-R;y=r(R,I,!0,a+1,s+m/xt,_)}else y=M&&eo(m,e,t,r,i,s,a+1);return!!y}}const yn=new lt.constructor,Us=new lt.constructor,zr=new Co(()=>new ft),Ai=new ft,Ci=new ft,Ia=new ft,La=new ft;let Ua=!1;function Mv(n,e,t,r){if(Ua)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Ua=!0;const i=n._roots,s=e._roots;let a,o=0,l=0;const c=new je().copy(t).invert();for(let u=0,h=i.length;u<h;u++){yn.setBuffer(i[u]),l=0;const d=zr.getPrimitive();ht(0,yn.float32Array,d),d.applyMatrix4(c);for(let p=0,g=s.length;p<g&&(Us.setBuffer(s[p]),a=dr(0,0,t,c,r,o,l,0,0,d),Us.clearBuffer(),l+=s[p].byteLength/Nt,!a);p++);if(zr.releasePrimitive(d),yn.clearBuffer(),o+=i[u].byteLength/Nt,a)break}return Ua=!1,a}function dr(n,e,t,r,i,s=0,a=0,o=0,l=0,c=null,u=!1){let h,d;u?(h=Us,d=yn):(h=yn,d=Us);const p=h.float32Array,g=h.uint32Array,v=h.uint16Array,m=d.float32Array,f=d.uint32Array,b=d.uint16Array,x=n*2,_=e*2,S=pt(x,v),w=pt(_,b);let T=!1;if(w&&S)u?T=i(wt(e,f),Ot(e*2,b),wt(n,g),Ot(n*2,v),l,a+e/xt,o,s+n/xt):T=i(wt(n,g),Ot(n*2,v),wt(e,f),Ot(e*2,b),o,s+n/xt,l,a+e/xt);else if(w){const E=zr.getPrimitive();ht(e,m,E),E.applyMatrix4(t);const M=yt(n),y=bt(n,g);ht(M,p,Ai),ht(y,p,Ci);const R=E.intersectsBox(Ai),I=E.intersectsBox(Ci);T=R&&dr(e,M,r,t,i,a,s,l,o+1,E,!u)||I&&dr(e,y,r,t,i,a,s,l,o+1,E,!u),zr.releasePrimitive(E)}else{const E=yt(e),M=bt(e,f);ht(E,m,Ia),ht(M,m,La);const y=c.intersectsBox(Ia),R=c.intersectsBox(La);if(y&&R)T=dr(n,E,t,r,i,s,a,o,l+1,c,u)||dr(n,M,t,r,i,s,a,o,l+1,c,u);else if(y)if(S)T=dr(n,E,t,r,i,s,a,o,l+1,c,u);else{const I=zr.getPrimitive();I.copy(Ia).applyMatrix4(t);const U=yt(n),D=bt(n,g);ht(U,p,Ai),ht(D,p,Ci);const z=I.intersectsBox(Ai),k=I.intersectsBox(Ci);T=z&&dr(E,U,r,t,i,a,s,l,o+1,I,!u)||k&&dr(E,D,r,t,i,a,s,l,o+1,I,!u),zr.releasePrimitive(I)}else if(R)if(S)T=dr(n,M,t,r,i,s,a,o,l+1,c,u);else{const I=zr.getPrimitive();I.copy(La).applyMatrix4(t);const U=yt(n),D=bt(n,g);ht(U,p,Ai),ht(D,p,Ci);const z=I.intersectsBox(Ai),k=I.intersectsBox(Ci);T=z&&dr(M,U,r,t,i,a,s,l,o+1,I,!u)||k&&dr(M,D,r,t,i,a,s,l,o+1,I,!u),zr.releasePrimitive(I)}}return T}const Da=new class{constructor(){let n=null,e=null,t=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(s,a)=>{if(r)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=a,this.buffer=n=s._roots[a],this.uint16Array=t=new Uint16Array(n),this.uint32Array=e=new Uint32Array(n)},this.reset=()=>{this.root=null,this.buffer=n=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=s=>{let a=s*2;for(;!pt(a,t);)s=yt(s),a=s*2;return wt(s,e)},this.getRangeEnd=s=>{let a=s*2;for(;!pt(a,t);)s=bt(s,e),a=s*2;return wt(s,e)+Ot(a,t)};const i=(s,a,o)=>{const l=a*2,c=pt(l,t);if(!s(o,c,a)&&!c){const u=yt(a),h=bt(a,e);i(s,u,o+1),i(s,h,o+1)}};this.traverseBuffer=s=>{if(r)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");r=!0;try{i(s,0,0)}finally{r=!1}},this.traverse=s=>{this.traverseBuffer((a,o,l)=>{if(o){const c=l*2,u=e[l+6],h=t[c+14];return s(a,o,new Float32Array(n,l*4,6),u,h)}else{const c=Ao(l,e);return s(a,o,new Float32Array(n,l*4,6),c)}})}}},ec=new ft,Ri=new Float32Array(6);class Sv{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...du,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),xv(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,r,i){let s=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,u=-1/0;for(let h=e,d=e+t;h<d;h++){this.writePrimitiveBounds(h,Ri,0);const[p,g,v,m,f,b]=Ri;p<s&&(s=p),m>l&&(l=m),g<a&&(a=g),f>c&&(c=f),v<o&&(o=v),b>u&&(u=b)}return r[i+0]=s,r[i+1]=a,r[i+2]=o,r[i+3]=l,r[i+4]=c,r[i+5]=u,r}computePrimitiveBounds(e,t,r){const i=r.offset||0;for(let s=e,a=e+t;s<a;s++){this.writePrimitiveBounds(s,Ri,0);const[o,l,c,u,h,d]=Ri,p=(o+u)/2,g=(l+h)/2,v=(c+d)/2,m=(u-o)/2,f=(h-l)/2,b=(d-c)/2,x=(s-i)*6;r[x+0]=p,r[x+1]=m+(Math.abs(p)+m)*Cs,r[x+2]=g,r[x+3]=f+(Math.abs(g)+f)*Cs,r[x+4]=v,r[x+5]=b+(Math.abs(v)+b)*Cs}return r}shiftPrimitiveOffsets(e){const t=this._indirectBuffer;if(t)for(let r=0,i=t.length;r<i;r++)t[r]+=e;else{const r=this._roots;for(let i=0;i<r.length;i++){const s=r[i],a=new Uint32Array(s),o=new Uint16Array(s),l=s.byteLength/Nt;for(let c=0;c<l;c++){const u=xt*c,h=2*u;pt(h,o)&&(a[u+6]+=e)}}}}traverse(e,t=0){Da.setBVH(this,t),Da.traverse(e),Da.reset()}refit(){const e=this._roots;for(let t=0,r=e.length;t<r;t++){const i=e[t],s=new Uint32Array(i),a=new Uint16Array(i),o=new Float32Array(i),l=i.byteLength/Nt;for(let c=l-1;c>=0;c--){const u=c*xt,h=u*2;if(pt(h,a)){const d=wt(u,s),p=Ot(h,a);this.writePrimitiveRangeBounds(d,p,Ri,0),o.set(Ri,u)}else{const d=yt(u),p=bt(u,s);for(let g=0;g<3;g++){const v=o[d+g],m=o[d+g+3],f=o[p+g],b=o[p+g+3];o[u+g]=v<f?v:f,o[u+g+3]=m>b?m:b}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{ht(0,new Float32Array(t),ec),e.union(ec)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:r,intersectsRange:i,intersectsPrimitive:s,scratchPrimitive:a,iterate:o}=e;if(i&&s){const h=i;i=(d,p,g,v,m)=>h(d,p,g,v,m)?!0:o(d,p,this,s,g,v,a)}else i||(s?i=(h,d,p,g)=>o(h,d,this,s,p,g,a):i=(h,d,p)=>p);let l=!1,c=0;const u=this._roots;for(let h=0,d=u.length;h<d;h++){const p=u[h];if(l=bv(this,h,r,i,t,c),l)break;c+=p.byteLength/Nt}return l}bvhcast(e,t,r){let{intersectsRanges:i}=r;return Mv(this,e,t,i)}}function Tv(){return typeof SharedArrayBuffer<"u"}function Ro(n){return n.index?n.index.count:n.attributes.position.count}function Hs(n){return Ro(n)/3}function wv(n,e=ArrayBuffer){return n>65535?new Uint32Array(new e(4*n)):new Uint16Array(new e(2*n))}function Ev(n,e){if(!n.index){const t=n.attributes.position.count,r=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=wv(t,r);n.setIndex(new We(i,1));for(let s=0;s<t;s++)i[s]=s}}function Av(n,e,t){const r=Ro(n)/t,i=e||n.drawRange,s=i.start/t,a=(i.start+i.count)/t,o=Math.max(0,s),l=Math.min(r,a)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function Cv(n,e){return n.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function tc(n,e,t){const r=Av(n,e,t),i=Cv(n,t);if(!i.length)return[r];const s=[],a=r.offset,o=r.offset+r.count,l=Ro(n)/t,c=[];for(const d of i){const{offset:p,count:g}=d,v=p,m=isFinite(g)?g:l-p,f=p+m;v<o&&f>a&&(c.push({pos:Math.max(a,v),isStart:!0}),c.push({pos:Math.min(o,f),isStart:!1}))}c.sort((d,p)=>d.pos!==p.pos?d.pos-p.pos:d.type==="end"?-1:1);let u=0,h=null;for(const d of c){const p=d.pos;u!==0&&p!==h&&s.push({offset:h,count:p-h}),u+=d.isStart?1:-1,h=p}return s}function Rv(n,e){const t=n[n.length-1],r=t.offset+t.count>2**16,i=n.reduce((c,u)=>c+u.count,0),s=r?4:2,a=e?new SharedArrayBuffer(i*s):new ArrayBuffer(i*s),o=r?new Uint32Array(a):new Uint16Array(a);let l=0;for(let c=0;c<n.length;c++){const{offset:u,count:h}=n[c];for(let d=0;d<h;d++)o[l+d]=u+d;l+=h}return o}let Pv=class extends Sv{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!Tv())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?r=>this._indirectBuffer[r]:r=>r,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...du,...t},t[Eo]||this.init(t)}init(e){const{geometry:t,primitiveStride:r}=this;if(e.indirect){const i=tc(t,e.range,r),s=Rv(i,e.useSharedArrayBuffer);this._indirectBuffer=s}else Ev(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new ft))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:tc(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}},Pr=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let r=1/0,i=-1/0;for(let s=0,a=e.length;s<a;s++){const o=e[s][t];r=o<r?o:r,i=o>i?o:i}this.min=r,this.max=i}setFromPoints(e,t){let r=1/0,i=-1/0;for(let s=0,a=t.length;s<a;s++){const o=t[s],l=e.dot(o);r=l<r?l:r,i=l>i?l:i}this.min=r,this.max=i}isSeparated(e){return this.min>e.max||e.min>this.max}};Pr.prototype.setFromBox=(function(){const n=new P;return function(e,t){const r=t.min,i=t.max;let s=1/0,a=-1/0;for(let o=0;o<=1;o++)for(let l=0;l<=1;l++)for(let c=0;c<=1;c++){n.x=r.x*o+i.x*(1-o),n.y=r.y*l+i.y*(1-l),n.z=r.z*c+i.z*(1-c);const u=e.dot(n);s=Math.min(u,s),a=Math.max(u,a)}this.min=s,this.max=a}})();const Iv=(function(){const n=new P,e=new P,t=new P;return function(r,i,s){const a=r.start,o=n,l=i.start,c=e;t.subVectors(a,l),n.subVectors(r.end,r.start),e.subVectors(i.end,i.start);const u=t.dot(c),h=c.dot(o),d=c.dot(c),p=t.dot(o),g=o.dot(o)*d-h*h;let v,m;g!==0?v=(u*h-p*d)/g:v=0,m=(u+v*h)/d,s.x=v,s.y=m}})(),Po=(function(){const n=new be,e=new P,t=new P;return function(r,i,s,a){Iv(r,i,n);let o=n.x,l=n.y;if(o>=0&&o<=1&&l>=0&&l<=1){r.at(o,s),i.at(l,a);return}else if(o>=0&&o<=1){l<0?i.at(0,a):i.at(1,a),r.closestPointToPoint(a,!0,s);return}else if(l>=0&&l<=1){o<0?r.at(0,s):r.at(1,s),i.closestPointToPoint(s,!0,a);return}else{let c;o<0?c=r.start:c=r.end;let u;l<0?u=i.start:u=i.end;const h=e,d=t;if(r.closestPointToPoint(u,!0,e),i.closestPointToPoint(c,!0,t),h.distanceToSquared(u)<=d.distanceToSquared(c)){s.copy(h),a.copy(u);return}else{s.copy(c),a.copy(d);return}}}})(),Lv=(function(){const n=new P,e=new P,t=new pr,r=new gr;return function(i,s){const{radius:a,center:o}=i,{a:l,b:c,c:u}=s;if(r.start=l,r.end=c,r.closestPointToPoint(o,!0,n).distanceTo(o)<=a||(r.start=l,r.end=u,r.closestPointToPoint(o,!0,n).distanceTo(o)<=a)||(r.start=c,r.end=u,r.closestPointToPoint(o,!0,n).distanceTo(o)<=a))return!0;const h=s.getPlane(t);if(Math.abs(h.distanceToPoint(o))<=a){const d=h.projectPoint(o,e);if(s.containsPoint(d))return!0}return!1}})(),Uv=["x","y","z"],Cr=1e-15,rc=Cr*Cr;function rr(n){return Math.abs(n)<Cr}let vr=class extends fr{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new P),this.satBounds=new Array(4).fill().map(()=>new Pr),this.points=[this.a,this.b,this.c],this.plane=new pr,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new gr,this.needsUpdate=!0}intersectsSphere(e){return Lv(e,this)}update(){const e=this.a,t=this.b,r=this.c,i=this.points,s=this.satAxes,a=this.satBounds,o=s[0],l=a[0];this.getNormal(o),l.setFromPoints(o,i);const c=s[1],u=a[1];c.subVectors(e,t),u.setFromPoints(c,i);const h=s[2],d=a[2];h.subVectors(t,r),d.setFromPoints(h,i);const p=s[3],g=a[3];p.subVectors(r,e),g.setFromPoints(p,i);const v=c.length(),m=h.length(),f=p.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,v<Cr?m<Cr||f<Cr?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(r)):m<Cr?f<Cr?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):f<Cr&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(r),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};vr.prototype.closestPointToSegment=(function(){const n=new P,e=new P,t=new gr;return function(r,i=null,s=null){const{start:a,end:o}=r,l=this.points;let c,u=1/0;for(let h=0;h<3;h++){const d=(h+1)%3;t.start.copy(l[h]),t.end.copy(l[d]),Po(t,r,n,e),c=n.distanceToSquared(e),c<u&&(u=c,i&&i.copy(n),s&&s.copy(e))}return this.closestPointToPoint(a,n),c=a.distanceToSquared(n),c<u&&(u=c,i&&i.copy(n),s&&s.copy(a)),this.closestPointToPoint(o,n),c=o.distanceToSquared(n),c<u&&(u=c,i&&i.copy(n),s&&s.copy(o)),Math.sqrt(u)}})();vr.prototype.intersectsTriangle=(function(){const n=new vr,e=new Pr,t=new Pr,r=new P,i=new P,s=new P,a=new P,o=new gr,l=new gr,c=new P,u=new be,h=new be;function d(x,_,S,w){const T=r;!x.isDegenerateIntoPoint&&!x.isDegenerateIntoSegment?T.copy(x.plane.normal):T.copy(_.plane.normal);const E=x.satBounds,M=x.satAxes;for(let I=1;I<4;I++){const U=E[I],D=M[I];if(e.setFromPoints(D,_.points),U.isSeparated(e)||(a.copy(T).cross(D),e.setFromPoints(a,x.points),t.setFromPoints(a,_.points),e.isSeparated(t)))return!1}const y=_.satBounds,R=_.satAxes;for(let I=1;I<4;I++){const U=y[I],D=R[I];if(e.setFromPoints(D,x.points),U.isSeparated(e)||(a.crossVectors(T,D),e.setFromPoints(a,x.points),t.setFromPoints(a,_.points),e.isSeparated(t)))return!1}return S&&(w||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),S.start.set(0,0,0),S.end.set(0,0,0)),!0}function p(x,_,S,w,T,E,M,y,R,I,U){let D=M/(M-y);I.x=w+(T-w)*D,U.start.subVectors(_,x).multiplyScalar(D).add(x),D=M/(M-R),I.y=w+(E-w)*D,U.end.subVectors(S,x).multiplyScalar(D).add(x)}function g(x,_,S,w,T,E,M,y,R,I,U){if(T>0)p(x.c,x.a,x.b,w,_,S,R,M,y,I,U);else if(E>0)p(x.b,x.a,x.c,S,_,w,y,M,R,I,U);else if(y*R>0||M!=0)p(x.a,x.b,x.c,_,S,w,M,y,R,I,U);else if(y!=0)p(x.b,x.a,x.c,S,_,w,y,M,R,I,U);else if(R!=0)p(x.c,x.a,x.b,w,_,S,R,M,y,I,U);else return!0;return!1}function v(x,_,S,w){const T=_.degenerateSegment,E=x.plane.distanceToPoint(T.start),M=x.plane.distanceToPoint(T.end);return rr(E)?rr(M)?d(x,_,S,w):(S&&(S.start.copy(T.start),S.end.copy(T.start)),x.containsPoint(T.start)):rr(M)?(S&&(S.start.copy(T.end),S.end.copy(T.end)),x.containsPoint(T.end)):x.plane.intersectLine(T,r)!=null?(S&&(S.start.copy(r),S.end.copy(r)),x.containsPoint(r)):!1}function m(x,_,S){const w=_.a;return rr(x.plane.distanceToPoint(w))&&x.containsPoint(w)?(S&&(S.start.copy(w),S.end.copy(w)),!0):!1}function f(x,_,S){const w=x.degenerateSegment,T=_.a;return w.closestPointToPoint(T,!0,r),T.distanceToSquared(r)<rc?(S&&(S.start.copy(T),S.end.copy(T)),!0):!1}function b(x,_,S,w){if(x.isDegenerateIntoSegment)if(_.isDegenerateIntoSegment){const T=x.degenerateSegment,E=_.degenerateSegment,M=i,y=s;T.delta(M),E.delta(y);const R=r.subVectors(E.start,T.start),I=M.x*y.y-M.y*y.x;if(rr(I))return!1;const U=(R.x*y.y-R.y*y.x)/I,D=-(M.x*R.y-M.y*R.x)/I;if(U<0||U>1||D<0||D>1)return!1;const z=T.start.z+M.z*U,k=E.start.z+y.z*D;return rr(z-k)?(S&&(S.start.copy(T.start).addScaledVector(M,U),S.end.copy(T.start).addScaledVector(M,U)),!0):!1}else return _.isDegenerateIntoPoint?f(x,_,S):v(_,x,S,w);else{if(x.isDegenerateIntoPoint)return _.isDegenerateIntoPoint?_.a.distanceToSquared(x.a)<rc?(S&&(S.start.copy(x.a),S.end.copy(x.a)),!0):!1:_.isDegenerateIntoSegment?f(_,x,S):m(_,x,S);if(_.isDegenerateIntoPoint)return m(x,_,S);if(_.isDegenerateIntoSegment)return v(x,_,S,w)}}return function(x,_=null,S=!1){this.needsUpdate&&this.update(),x.isExtendedTriangle?x.needsUpdate&&x.update():(n.copy(x),n.update(),x=n);const w=b(this,x,_,S);if(w!==void 0)return w;const T=this.plane,E=x.plane;let M=E.distanceToPoint(this.a),y=E.distanceToPoint(this.b),R=E.distanceToPoint(this.c);rr(M)&&(M=0),rr(y)&&(y=0),rr(R)&&(R=0);const I=M*y,U=M*R;if(I>0&&U>0)return!1;let D=T.distanceToPoint(x.a),z=T.distanceToPoint(x.b),k=T.distanceToPoint(x.c);rr(D)&&(D=0),rr(z)&&(z=0),rr(k)&&(k=0);const X=D*z,G=D*k;if(X>0&&G>0)return!1;i.copy(T.normal),s.copy(E.normal);const J=i.cross(s);let se=0,pe=Math.abs(J.x);const ve=Math.abs(J.y);ve>pe&&(pe=ve,se=1),Math.abs(J.z)>pe&&(se=2);const Le=Uv[se],$=this.a[Le],K=this.b[Le],de=this.c[Le],re=x.a[Le],Me=x.b[Le],Ee=x.c[Le];if(g(this,$,K,de,I,U,M,y,R,u,o))return d(this,x,_,S);if(g(x,re,Me,Ee,X,G,D,z,k,h,l))return d(this,x,_,S);if(u.y<u.x){const Re=u.y;u.y=u.x,u.x=Re,c.copy(o.start),o.start.copy(o.end),o.end.copy(c)}if(h.y<h.x){const Re=h.y;h.y=h.x,h.x=Re,c.copy(l.start),l.start.copy(l.end),l.end.copy(c)}return u.y<h.x||h.y<u.x?!1:(_&&(h.x>u.x?_.start.copy(l.start):_.start.copy(o.start),h.y<u.y?_.end.copy(l.end):_.end.copy(o.end)),!0)}})();vr.prototype.distanceToPoint=(function(){const n=new P;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();vr.prototype.distanceToTriangle=(function(){const n=new P,e=new P,t=["a","b","c"],r=new gr,i=new gr;return function(s,a=null,o=null){const l=a||o?r:null;if(this.intersectsTriangle(s,l,!0))return(a||o)&&(a&&l.getCenter(a),o&&l.getCenter(o)),0;let c=1/0;for(let u=0;u<3;u++){let h;const d=t[u],p=s[d];this.closestPointToPoint(p,n),h=p.distanceToSquared(n),h<c&&(c=h,a&&a.copy(n),o&&o.copy(p));const g=this[d];s.closestPointToPoint(g,n),h=g.distanceToSquared(n),h<c&&(c=h,a&&a.copy(g),o&&o.copy(n))}for(let u=0;u<3;u++){const h=t[u],d=t[(u+1)%3];r.set(this[h],this[d]);for(let p=0;p<3;p++){const g=t[p],v=t[(p+1)%3];i.set(s[g],s[v]),Po(r,i,n,e);const m=n.distanceToSquared(e);m<c&&(c=m,a&&a.copy(n),o&&o.copy(e))}}return Math.sqrt(c)}})();let Gt=class{constructor(e,t,r){this.isOrientedBox=!0,this.min=new P,this.max=new P,this.matrix=new je,this.invMatrix=new je,this.points=new Array(8).fill().map(()=>new P),this.satAxes=new Array(3).fill().map(()=>new P),this.satBounds=new Array(3).fill().map(()=>new Pr),this.alignedSatBounds=new Array(3).fill().map(()=>new Pr),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),r&&this.matrix.copy(r)}set(e,t,r){this.min.copy(e),this.max.copy(t),this.matrix.copy(r),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};Gt.prototype.update=(function(){return function(){const n=this.matrix,e=this.min,t=this.max,r=this.points;for(let l=0;l<=1;l++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){const h=1*l|2*c|4*u,d=r[h];d.x=l?t.x:e.x,d.y=c?t.y:e.y,d.z=u?t.z:e.z,d.applyMatrix4(n)}const i=this.satBounds,s=this.satAxes,a=r[0];for(let l=0;l<3;l++){const c=s[l],u=i[l],h=1<<l,d=r[h];c.subVectors(a,d),u.setFromPoints(c,r)}const o=this.alignedSatBounds;o[0].setFromPointsField(r,"x"),o[1].setFromPointsField(r,"y"),o[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Gt.prototype.intersectsBox=(function(){const n=new Pr;return function(e){this.needsUpdate&&this.update();const t=e.min,r=e.max,i=this.satBounds,s=this.satAxes,a=this.alignedSatBounds;if(n.min=t.x,n.max=r.x,a[0].isSeparated(n)||(n.min=t.y,n.max=r.y,a[1].isSeparated(n))||(n.min=t.z,n.max=r.z,a[2].isSeparated(n)))return!1;for(let o=0;o<3;o++){const l=s[o],c=i[o];if(n.setFromBox(l,e),c.isSeparated(n))return!1}return!0}})();Gt.prototype.intersectsTriangle=(function(){const n=new vr,e=new Array(3),t=new Pr,r=new Pr,i=new P;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(n.copy(s),n.update(),s=n);const a=this.satBounds,o=this.satAxes;e[0]=s.a,e[1]=s.b,e[2]=s.c;for(let h=0;h<3;h++){const d=a[h],p=o[h];if(t.setFromPoints(p,e),d.isSeparated(t))return!1}const l=s.satBounds,c=s.satAxes,u=this.points;for(let h=0;h<3;h++){const d=l[h],p=c[h];if(t.setFromPoints(p,u),d.isSeparated(t))return!1}for(let h=0;h<3;h++){const d=o[h];for(let p=0;p<4;p++){const g=c[p];if(i.crossVectors(d,g),t.setFromPoints(i,e),r.setFromPoints(i,u),t.isSeparated(r))return!1}}return!0}})();Gt.prototype.closestPointToPoint=(function(){return function(n,e){return this.needsUpdate&&this.update(),e.copy(n).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();Gt.prototype.distanceToPoint=(function(){const n=new P;return function(e){return this.closestPointToPoint(e,n),e.distanceTo(n)}})();Gt.prototype.distanceToBox=(function(){const n=["x","y","z"],e=new Array(12).fill().map(()=>new gr),t=new Array(12).fill().map(()=>new gr),r=new P,i=new P;return function(s,a=0,o=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(o||l)&&(s.getCenter(i),this.closestPointToPoint(i,r),s.closestPointToPoint(r,i),o&&o.copy(r),l&&l.copy(i)),0;const c=a*a,u=s.min,h=s.max,d=this.points;let p=1/0;for(let v=0;v<8;v++){const m=d[v];i.copy(m).clamp(u,h);const f=m.distanceToSquared(i);if(f<p&&(p=f,o&&o.copy(m),l&&l.copy(i),f<c))return Math.sqrt(f)}let g=0;for(let v=0;v<3;v++)for(let m=0;m<=1;m++)for(let f=0;f<=1;f++){const b=(v+1)%3,x=(v+2)%3,_=m<<b|f<<x,S=1<<v|m<<b|f<<x,w=d[_],T=d[S];e[g].set(w,T);const E=n[v],M=n[b],y=n[x],R=t[g],I=R.start,U=R.end;I[E]=u[E],I[M]=m?u[M]:h[M],I[y]=f?u[y]:h[M],U[E]=h[E],U[M]=m?u[M]:h[M],U[y]=f?u[y]:h[M],g++}for(let v=0;v<=1;v++)for(let m=0;m<=1;m++)for(let f=0;f<=1;f++){i.x=v?h.x:u.x,i.y=m?h.y:u.y,i.z=f?h.z:u.z,this.closestPointToPoint(i,r);const b=i.distanceToSquared(r);if(b<p&&(p=b,o&&o.copy(r),l&&l.copy(i),b<c))return Math.sqrt(b)}for(let v=0;v<12;v++){const m=e[v];for(let f=0;f<12;f++){const b=t[f];Po(m,b,r,i);const x=r.distanceToSquared(i);if(x<p&&(p=x,o&&o.copy(r),l&&l.copy(i),x<c))return Math.sqrt(x)}}return Math.sqrt(p)}})();class Dv extends Co{constructor(){super(()=>new vr)}}const nr=new Dv,on=new P,Na=new P;function Nv(n,e,t={},r=0,i=1/0){const s=r*r,a=i*i;let o=1/0,l=null;if(n.shapecast({boundsTraverseOrder:u=>(on.copy(e).clamp(u.min,u.max),on.distanceToSquared(e)),intersectsBounds:(u,h,d)=>d<o&&d<a,intersectsTriangle:(u,h)=>{u.closestPointToPoint(e,on);const d=e.distanceToSquared(on);return d<o&&(Na.copy(on),o=d,l=h),d<s}}),o===1/0)return null;const c=Math.sqrt(o);return t.point?t.point.copy(Na):t.point=Na.clone(),t.distance=c,t.faceIndex=l,t}const us=parseInt(fo)>=169,Ov=parseInt(fo)<=161,ri=new P,ii=new P,ni=new P,hs=new be,ds=new be,ps=new be,ic=new P,nc=new P,sc=new P,ln=new P;function Fv(n,e,t,r,i,s,a,o){let l;if(s===Nu?l=n.intersectTriangle(r,t,e,!0,i):l=n.intersectTriangle(e,t,r,s!==Kt,i),l===null)return null;const c=n.origin.distanceTo(i);return c<a||c>o?null:{distance:c,point:i.clone()}}function ac(n,e,t,r,i,s,a,o,l,c,u){ri.fromBufferAttribute(e,s),ii.fromBufferAttribute(e,a),ni.fromBufferAttribute(e,o);const h=Fv(n,ri,ii,ni,ln,l,c,u);if(h){if(r){hs.fromBufferAttribute(r,s),ds.fromBufferAttribute(r,a),ps.fromBufferAttribute(r,o),h.uv=new be;const p=fr.getInterpolation(ln,ri,ii,ni,hs,ds,ps,h.uv);us||(h.uv=p)}if(i){hs.fromBufferAttribute(i,s),ds.fromBufferAttribute(i,a),ps.fromBufferAttribute(i,o),h.uv1=new be;const p=fr.getInterpolation(ln,ri,ii,ni,hs,ds,ps,h.uv1);us||(h.uv1=p),Ov&&(h.uv2=h.uv1)}if(t){ic.fromBufferAttribute(t,s),nc.fromBufferAttribute(t,a),sc.fromBufferAttribute(t,o),h.normal=new P;const p=fr.getInterpolation(ln,ri,ii,ni,ic,nc,sc,h.normal);h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1),us||(h.normal=p)}const d={a:s,b:a,c:o,normal:new P,materialIndex:0};if(fr.getNormal(ri,ii,ni,d.normal),h.face=d,h.faceIndex=s,us){const p=new P;fr.getBarycoord(ln,ri,ii,ni,p),h.barycoord=p}}return h}function oc(n){return n&&n.isMaterial?n.side:n}function Gs(n,e,t,r,i,s,a){const o=r*3;let l=o+0,c=o+1,u=o+2;const{index:h,groups:d}=n;n.index&&(l=h.getX(l),c=h.getX(c),u=h.getX(u));const{position:p,normal:g,uv:v,uv1:m}=n.attributes;if(Array.isArray(e)){const f=r*3;for(let b=0,x=d.length;b<x;b++){const{start:_,count:S,materialIndex:w}=d[b];if(f>=_&&f<_+S){const T=oc(e[w]),E=ac(t,p,g,v,m,l,c,u,T,s,a);if(E)if(E.faceIndex=r,E.face.materialIndex=w,i)i.push(E);else return E}}}else{const f=oc(e),b=ac(t,p,g,v,m,l,c,u,f,s,a);if(b)if(b.faceIndex=r,b.face.materialIndex=0,i)i.push(b);else return b}return null}function vt(n,e,t,r){const i=n.a,s=n.b,a=n.c;let o=e,l=e+1,c=e+2;t&&(o=t.getX(o),l=t.getX(l),c=t.getX(c)),i.x=r.getX(o),i.y=r.getY(o),i.z=r.getZ(o),s.x=r.getX(l),s.y=r.getY(l),s.z=r.getZ(l),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c)}function Bv(n,e,t,r,i,s,a,o){const{geometry:l,_indirectBuffer:c}=n;for(let u=r,h=r+i;u<h;u++)Gs(l,e,t,u,s,a,o)}function zv(n,e,t,r,i,s,a){const{geometry:o,_indirectBuffer:l}=n;let c=1/0,u=null;for(let h=r,d=r+i;h<d;h++){let p;p=Gs(o,e,t,h,null,s,a),p&&p.distance<c&&(u=p,c=p.distance)}return u}function kv(n,e,t,r,i,s,a){const{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=n,h=e+n;u<h;u++){let d;if(d=u,vt(a,d*3,l,c),a.needsUpdate=!0,r(a,d,i,s))return!0}return!1}function Hv(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,r=t.index?t.index.array:null,i=t.attributes.position;let s,a,o,l,c=0;const u=n._roots;for(let d=0,p=u.length;d<p;d++)s=u[d],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),h(0,c),c+=s.byteLength;function h(d,p,g=!1){const v=d*2;if(pt(v,o)){const m=wt(d,a),f=Ot(v,o);let b=1/0,x=1/0,_=1/0,S=-1/0,w=-1/0,T=-1/0;for(let E=3*m,M=3*(m+f);E<M;E++){let y=r[E];const R=i.getX(y),I=i.getY(y),U=i.getZ(y);R<b&&(b=R),R>S&&(S=R),I<x&&(x=I),I>w&&(w=I),U<_&&(_=U),U>T&&(T=U)}return l[d+0]!==b||l[d+1]!==x||l[d+2]!==_||l[d+3]!==S||l[d+4]!==w||l[d+5]!==T?(l[d+0]=b,l[d+1]=x,l[d+2]=_,l[d+3]=S,l[d+4]=w,l[d+5]=T,!0):!1}else{const m=yt(d),f=bt(d,a);let b=g,x=!1,_=!1;if(e){if(!b){const y=m/xt+p/Nt,R=f/xt+p/Nt;x=e.has(y),_=e.has(R),b=!x&&!_}}else x=!0,_=!0;const S=b||x,w=b||_;let T=!1;S&&(T=h(m,p,b));let E=!1;w&&(E=h(f,p,b));const M=T||E;if(M)for(let y=0;y<3;y++){const R=m+y,I=f+y,U=l[R],D=l[R+3],z=l[I],k=l[I+3];l[d+y]=U<z?U:z,l[d+y+3]=D>k?D:k}return M}}}function Gr(n,e,t,r,i){let s,a,o,l,c,u;const h=1/t.direction.x,d=1/t.direction.y,p=1/t.direction.z,g=t.origin.x,v=t.origin.y,m=t.origin.z;let f=e[n],b=e[n+3],x=e[n+1],_=e[n+3+1],S=e[n+2],w=e[n+3+2];return h>=0?(s=(f-g)*h,a=(b-g)*h):(s=(b-g)*h,a=(f-g)*h),d>=0?(o=(x-v)*d,l=(_-v)*d):(o=(_-v)*d,l=(x-v)*d),s>l||o>a||((o>s||isNaN(s))&&(s=o),(l<a||isNaN(a))&&(a=l),p>=0?(c=(S-m)*p,u=(w-m)*p):(c=(w-m)*p,u=(S-m)*p),s>u||c>a)?!1:((c>s||s!==s)&&(s=c),(u<a||a!==a)&&(a=u),s<=i&&a>=r)}function Gv(n,e,t,r,i,s,a,o){const{geometry:l,_indirectBuffer:c}=n;for(let u=r,h=r+i;u<h;u++){let d=c?c[u]:u;Gs(l,e,t,d,s,a,o)}}function Vv(n,e,t,r,i,s,a){const{geometry:o,_indirectBuffer:l}=n;let c=1/0,u=null;for(let h=r,d=r+i;h<d;h++){let p;p=Gs(o,e,t,l?l[h]:h,null,s,a),p&&p.distance<c&&(u=p,c=p.distance)}return u}function Wv(n,e,t,r,i,s,a){const{geometry:o}=t,{index:l}=o,c=o.attributes.position;for(let u=n,h=e+n;u<h;u++){let d;if(d=t.resolveTriangleIndex(u),vt(a,d*3,l,c),a.needsUpdate=!0,r(a,d,i,s))return!0}return!1}function Xv(n,e,t,r,i,s,a){lt.setBuffer(n._roots[e]),to(0,n,t,r,i,s,a),lt.clearBuffer()}function to(n,e,t,r,i,s,a){const{float32Array:o,uint16Array:l,uint32Array:c}=lt,u=n*2;if(pt(u,l)){const h=wt(n,c),d=Ot(u,l);Bv(e,t,r,h,d,i,s,a)}else{const h=yt(n);Gr(h,o,r,s,a)&&to(h,e,t,r,i,s,a);const d=bt(n,c);Gr(d,o,r,s,a)&&to(d,e,t,r,i,s,a)}}const jv=["x","y","z"];function $v(n,e,t,r,i,s){lt.setBuffer(n._roots[e]);const a=ro(0,n,t,r,i,s);return lt.clearBuffer(),a}function ro(n,e,t,r,i,s){const{float32Array:a,uint16Array:o,uint32Array:l}=lt;let c=n*2;if(pt(c,o)){const u=wt(n,l),h=Ot(c,o);return zv(e,t,r,u,h,i,s)}else{const u=Ao(n,l),h=jv[u],d=r.direction[h]>=0;let p,g;d?(p=yt(n),g=bt(n,l)):(p=bt(n,l),g=yt(n));const v=Gr(p,a,r,i,s)?ro(p,e,t,r,i,s):null;if(v){const f=v.point[h];if(d?f<=a[g+u]:f>=a[g+u+3])return v}const m=Gr(g,a,r,i,s)?ro(g,e,t,r,i,s):null;return v&&m?v.distance<=m.distance?v:m:v||m||null}}const fs=new ft,Pi=new vr,Ii=new vr,cn=new je,lc=new Gt,ms=new Gt;function qv(n,e,t,r){lt.setBuffer(n._roots[e]);const i=io(0,n,t,r);return lt.clearBuffer(),i}function io(n,e,t,r,i=null){const{float32Array:s,uint16Array:a,uint32Array:o}=lt;let l=n*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),lc.set(t.boundingBox.min,t.boundingBox.max,r),i=lc),pt(l,a)){const c=e.geometry,u=c.index,h=c.attributes.position,d=t.index,p=t.attributes.position,g=wt(n,o),v=Ot(l,a);if(cn.copy(r).invert(),t.boundsTree)return ht(n,s,ms),ms.matrix.copy(cn),ms.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:m=>ms.intersectsBox(m),intersectsTriangle:m=>{m.a.applyMatrix4(r),m.b.applyMatrix4(r),m.c.applyMatrix4(r),m.needsUpdate=!0;for(let f=g*3,b=(v+g)*3;f<b;f+=3)if(vt(Ii,f,u,h),Ii.needsUpdate=!0,m.intersectsTriangle(Ii))return!0;return!1}});{const m=Hs(t);for(let f=g*3,b=(v+g)*3;f<b;f+=3){vt(Pi,f,u,h),Pi.a.applyMatrix4(cn),Pi.b.applyMatrix4(cn),Pi.c.applyMatrix4(cn),Pi.needsUpdate=!0;for(let x=0,_=m*3;x<_;x+=3)if(vt(Ii,x,d,p),Ii.needsUpdate=!0,Pi.intersectsTriangle(Ii))return!0}}}else{const c=yt(n),u=bt(n,o);return ht(c,s,fs),!!(i.intersectsBox(fs)&&io(c,e,t,r,i)||(ht(u,s,fs),i.intersectsBox(fs)&&io(u,e,t,r,i)))}}const gs=new je,Oa=new Gt,un=new Gt,Yv=new P,Kv=new P,Zv=new P,Jv=new P;function Qv(n,e,t,r={},i={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Oa.set(e.boundingBox.min,e.boundingBox.max,t),Oa.needsUpdate=!0;const o=n.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,h=e.index,d=nr.getPrimitive(),p=nr.getPrimitive();let g=Yv,v=Kv,m=null,f=null;i&&(m=Zv,f=Jv);let b=1/0,x=null,_=null;return gs.copy(t).invert(),un.matrix.copy(gs),n.shapecast({boundsTraverseOrder:S=>Oa.distanceToBox(S),intersectsBounds:(S,w,T)=>T<b&&T<a?(w&&(un.min.copy(S.min),un.max.copy(S.max),un.needsUpdate=!0),!0):!1,intersectsRange:(S,w)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:T=>un.distanceToBox(T),intersectsBounds:(T,E,M)=>M<b&&M<a,intersectsRange:(T,E)=>{for(let M=T,y=T+E;M<y;M++){vt(p,3*M,h,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let R=S,I=S+w;R<I;R++){vt(d,3*R,c,l),d.needsUpdate=!0;const U=d.distanceToTriangle(p,g,m);if(U<b&&(v.copy(g),f&&f.copy(m),b=U,x=R,_=M),U<s)return!0}}}});{const T=Hs(e);for(let E=0,M=T;E<M;E++){vt(p,3*E,h,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let y=S,R=S+w;y<R;y++){vt(d,3*y,c,l),d.needsUpdate=!0;const I=d.distanceToTriangle(p,g,m);if(I<b&&(v.copy(g),f&&f.copy(m),b=I,x=y,_=E),I<s)return!0}}}}}),nr.releasePrimitive(d),nr.releasePrimitive(p),b===1/0?null:(r.point?r.point.copy(v):r.point=v.clone(),r.distance=b,r.faceIndex=x,i&&(i.point?i.point.copy(f):i.point=f.clone(),i.point.applyMatrix4(gs),v.applyMatrix4(gs),i.distance=v.sub(i.point).length(),i.faceIndex=_),r)}function e_(n,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=n.geometry,r=t.index?t.index.array:null,i=t.attributes.position;let s,a,o,l,c=0;const u=n._roots;for(let d=0,p=u.length;d<p;d++)s=u[d],a=new Uint32Array(s),o=new Uint16Array(s),l=new Float32Array(s),h(0,c),c+=s.byteLength;function h(d,p,g=!1){const v=d*2;if(pt(v,o)){const m=wt(d,a),f=Ot(v,o);let b=1/0,x=1/0,_=1/0,S=-1/0,w=-1/0,T=-1/0;for(let E=m,M=m+f;E<M;E++){const y=3*n.resolveTriangleIndex(E);for(let R=0;R<3;R++){let I=y+R;I=r?r[I]:I;const U=i.getX(I),D=i.getY(I),z=i.getZ(I);U<b&&(b=U),U>S&&(S=U),D<x&&(x=D),D>w&&(w=D),z<_&&(_=z),z>T&&(T=z)}}return l[d+0]!==b||l[d+1]!==x||l[d+2]!==_||l[d+3]!==S||l[d+4]!==w||l[d+5]!==T?(l[d+0]=b,l[d+1]=x,l[d+2]=_,l[d+3]=S,l[d+4]=w,l[d+5]=T,!0):!1}else{const m=yt(d),f=bt(d,a);let b=g,x=!1,_=!1;if(e){if(!b){const y=m/xt+p/Nt,R=f/xt+p/Nt;x=e.has(y),_=e.has(R),b=!x&&!_}}else x=!0,_=!0;const S=b||x,w=b||_;let T=!1;S&&(T=h(m,p,b));let E=!1;w&&(E=h(f,p,b));const M=T||E;if(M)for(let y=0;y<3;y++){const R=m+y,I=f+y,U=l[R],D=l[R+3],z=l[I],k=l[I+3];l[d+y]=U<z?U:z,l[d+y+3]=D>k?D:k}return M}}}function t_(n,e,t,r,i,s,a){lt.setBuffer(n._roots[e]),no(0,n,t,r,i,s,a),lt.clearBuffer()}function no(n,e,t,r,i,s,a){const{float32Array:o,uint16Array:l,uint32Array:c}=lt,u=n*2;if(pt(u,l)){const h=wt(n,c),d=Ot(u,l);Gv(e,t,r,h,d,i,s,a)}else{const h=yt(n);Gr(h,o,r,s,a)&&no(h,e,t,r,i,s,a);const d=bt(n,c);Gr(d,o,r,s,a)&&no(d,e,t,r,i,s,a)}}const r_=["x","y","z"];function i_(n,e,t,r,i,s){lt.setBuffer(n._roots[e]);const a=so(0,n,t,r,i,s);return lt.clearBuffer(),a}function so(n,e,t,r,i,s){const{float32Array:a,uint16Array:o,uint32Array:l}=lt;let c=n*2;if(pt(c,o)){const u=wt(n,l),h=Ot(c,o);return Vv(e,t,r,u,h,i,s)}else{const u=Ao(n,l),h=r_[u],d=r.direction[h]>=0;let p,g;d?(p=yt(n),g=bt(n,l)):(p=bt(n,l),g=yt(n));const v=Gr(p,a,r,i,s)?so(p,e,t,r,i,s):null;if(v){const f=v.point[h];if(d?f<=a[g+u]:f>=a[g+u+3])return v}const m=Gr(g,a,r,i,s)?so(g,e,t,r,i,s):null;return v&&m?v.distance<=m.distance?v:m:v||m||null}}const vs=new ft,Li=new vr,Ui=new vr,hn=new je,cc=new Gt,_s=new Gt;function n_(n,e,t,r){lt.setBuffer(n._roots[e]);const i=ao(0,n,t,r);return lt.clearBuffer(),i}function ao(n,e,t,r,i=null){const{float32Array:s,uint16Array:a,uint32Array:o}=lt;let l=n*2;if(i===null&&(t.boundingBox||t.computeBoundingBox(),cc.set(t.boundingBox.min,t.boundingBox.max,r),i=cc),pt(l,a)){const c=e.geometry,u=c.index,h=c.attributes.position,d=t.index,p=t.attributes.position,g=wt(n,o),v=Ot(l,a);if(hn.copy(r).invert(),t.boundsTree)return ht(n,s,_s),_s.matrix.copy(hn),_s.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:m=>_s.intersectsBox(m),intersectsTriangle:m=>{m.a.applyMatrix4(r),m.b.applyMatrix4(r),m.c.applyMatrix4(r),m.needsUpdate=!0;for(let f=g,b=v+g;f<b;f++)if(vt(Ui,3*e.resolveTriangleIndex(f),u,h),Ui.needsUpdate=!0,m.intersectsTriangle(Ui))return!0;return!1}});{const m=Hs(t);for(let f=g,b=v+g;f<b;f++){const x=e.resolveTriangleIndex(f);vt(Li,3*x,u,h),Li.a.applyMatrix4(hn),Li.b.applyMatrix4(hn),Li.c.applyMatrix4(hn),Li.needsUpdate=!0;for(let _=0,S=m*3;_<S;_+=3)if(vt(Ui,_,d,p),Ui.needsUpdate=!0,Li.intersectsTriangle(Ui))return!0}}}else{const c=yt(n),u=bt(n,o);return ht(c,s,vs),!!(i.intersectsBox(vs)&&ao(c,e,t,r,i)||(ht(u,s,vs),i.intersectsBox(vs)&&ao(u,e,t,r,i)))}}const xs=new je,Fa=new Gt,dn=new Gt,s_=new P,a_=new P,o_=new P,l_=new P;function c_(n,e,t,r={},i={},s=0,a=1/0){e.boundingBox||e.computeBoundingBox(),Fa.set(e.boundingBox.min,e.boundingBox.max,t),Fa.needsUpdate=!0;const o=n.geometry,l=o.attributes.position,c=o.index,u=e.attributes.position,h=e.index,d=nr.getPrimitive(),p=nr.getPrimitive();let g=s_,v=a_,m=null,f=null;i&&(m=o_,f=l_);let b=1/0,x=null,_=null;return xs.copy(t).invert(),dn.matrix.copy(xs),n.shapecast({boundsTraverseOrder:S=>Fa.distanceToBox(S),intersectsBounds:(S,w,T)=>T<b&&T<a?(w&&(dn.min.copy(S.min),dn.max.copy(S.max),dn.needsUpdate=!0),!0):!1,intersectsRange:(S,w)=>{if(e.boundsTree){const T=e.boundsTree;return T.shapecast({boundsTraverseOrder:E=>dn.distanceToBox(E),intersectsBounds:(E,M,y)=>y<b&&y<a,intersectsRange:(E,M)=>{for(let y=E,R=E+M;y<R;y++){const I=T.resolveTriangleIndex(y);vt(p,3*I,h,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let U=S,D=S+w;U<D;U++){const z=n.resolveTriangleIndex(U);vt(d,3*z,c,l),d.needsUpdate=!0;const k=d.distanceToTriangle(p,g,m);if(k<b&&(v.copy(g),f&&f.copy(m),b=k,x=U,_=y),k<s)return!0}}}})}else{const T=Hs(e);for(let E=0,M=T;E<M;E++){vt(p,3*E,h,u),p.a.applyMatrix4(t),p.b.applyMatrix4(t),p.c.applyMatrix4(t),p.needsUpdate=!0;for(let y=S,R=S+w;y<R;y++){const I=n.resolveTriangleIndex(y);vt(d,3*I,c,l),d.needsUpdate=!0;const U=d.distanceToTriangle(p,g,m);if(U<b&&(v.copy(g),f&&f.copy(m),b=U,x=y,_=E),U<s)return!0}}}}}),nr.releasePrimitive(d),nr.releasePrimitive(p),b===1/0?null:(r.point?r.point.copy(v):r.point=v.clone(),r.distance=b,r.faceIndex=x,i&&(i.point?i.point.copy(f):i.point=f.clone(),i.point.applyMatrix4(xs),v.applyMatrix4(xs),i.distance=v.sub(i.point).length(),i.faceIndex=_),r)}function uc(n,e,t){return n===null?null:(n.point.applyMatrix4(e.matrixWorld),n.distance=n.point.distanceTo(t.ray.origin),n.object=e,n)}const ys=new Gt,bs=new En,hc=new P,dc=new je,pc=new P,Ba=["getX","getY","getZ"];class Ds extends Pv{static serialize(e,t={}){t={cloneBuffers:!0,...t};const r=e.geometry,i=e._roots,s=e._indirectBuffer,a=r.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=i.map(l=>l.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=s?s.slice():null):(o.roots=i,o.index=a?a.array:null,o.indirectBuffer=s),o}static deserialize(e,t,r={}){r={setIndex:!0,indirect:!!e.indirectBuffer,...r};const{index:i,roots:s,indirectBuffer:a}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(s));const o=new Ds(t,{...r,[Eo]:!0});if(o._roots=s,o._indirectBuffer=a||null,r.setIndex){const c=t.getIndex();if(c===null){const u=new We(e.index,1,!1);t.setIndex(u)}else c.array!==i&&(c.array.set(i),c.needsUpdate=!0)}return o;function l(c){for(let u=0;u<c.length;u++){const h=c[u],d=new Uint32Array(h),p=new Uint16Array(h);for(let g=0,v=h.byteLength/Nt;g<v;g++){const m=xt*g,f=2*m;pt(f,p)||(d[m+6]=d[m+6]/xt-g)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,r){const i=this.geometry,s=this._indirectBuffer,a=i.attributes.position,o=i.index?i.index.array:null,l=(s?s[e]:e)*3;let c=l+0,u=l+1,h=l+2;o&&(c=o[c],u=o[u],h=o[h]);for(let d=0;d<3;d++){const p=a[Ba[d]](c),g=a[Ba[d]](u),v=a[Ba[d]](h);let m=p;g<m&&(m=g),v<m&&(m=v);let f=p;g>f&&(f=g),v>f&&(f=v),t[r+d]=m,t[r+d+3]=f}return t}computePrimitiveBounds(e,t,r){const i=this.geometry,s=this._indirectBuffer,a=i.attributes.position,o=i.index?i.index.array:null,l=a.normalized;if(e<0||t+e-r.offset>r.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const c=a.array,u=a.offset||0;let h=3;a.isInterleavedBufferAttribute&&(h=a.data.stride);const d=["getX","getY","getZ"],p=r.offset;for(let g=e,v=e+t;g<v;g++){const m=(s?s[g]:g)*3,f=(g-p)*6;let b=m+0,x=m+1,_=m+2;o&&(b=o[b],x=o[x],_=o[_]),l||(b=b*h+u,x=x*h+u,_=_*h+u);for(let S=0;S<3;S++){let w,T,E;l?(w=a[d[S]](b),T=a[d[S]](x),E=a[d[S]](_)):(w=c[b+S],T=c[x+S],E=c[_+S]);let M=w;T<M&&(M=T),E<M&&(M=E);let y=w;T>y&&(y=T),E>y&&(y=E);const R=(y-M)/2,I=S*2;r[f+I+0]=M+R,r[f+I+1]=R+(Math.abs(M)+R)*Cs}}return r}raycastObject3D(e,t,r=[]){const{material:i}=e;if(i===void 0)return;dc.copy(e.matrixWorld).invert(),bs.copy(t.ray).applyMatrix4(dc),pc.setFromMatrixScale(e.matrixWorld),hc.copy(bs.direction).multiply(pc);const s=hc.length(),a=t.near/s,o=t.far/s;if(t.firstHitOnly===!0){let l=this.raycastFirst(bs,i,a,o);l=uc(l,e,t),l&&r.push(l)}else{const l=this.raycast(bs,i,a,o);for(let c=0,u=l.length;c<u;c++){const h=uc(l[c],e,t);h&&r.push(h)}}return r}refit(e=null){return(this.indirect?e_:Hv)(this,e)}raycast(e,t=Go,r=0,i=1/0){const s=this._roots,a=[],o=this.indirect?t_:Xv;for(let l=0,c=s.length;l<c;l++)o(this,l,t,e,a,r,i);return a}raycastFirst(e,t=Go,r=0,i=1/0){const s=this._roots;let a=null;const o=this.indirect?i_:$v;for(let l=0,c=s.length;l<c;l++){const u=o(this,l,t,e,r,i);u!=null&&(a==null||u.distance<a.distance)&&(a=u)}return a}intersectsGeometry(e,t){let r=!1;const i=this._roots,s=this.indirect?n_:qv;for(let a=0,o=i.length;a<o&&(r=s(this,a,e,t),!r);a++);return r}shapecast(e){const t=nr.getPrimitive(),r=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Wv:kv});return nr.releasePrimitive(t),r}bvhcast(e,t,r){let{intersectsRanges:i,intersectsTriangles:s}=r;const a=nr.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,c=this.indirect?g=>{const v=this.resolveTriangleIndex(g);vt(a,v*3,o,l)}:g=>{vt(a,g*3,o,l)},u=nr.getPrimitive(),h=e.geometry.index,d=e.geometry.attributes.position,p=e.indirect?g=>{const v=e.resolveTriangleIndex(g);vt(u,v*3,h,d)}:g=>{vt(u,g*3,h,d)};if(s){if(!(e instanceof Ds))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const g=(v,m,f,b,x,_,S,w)=>{for(let T=f,E=f+b;T<E;T++){p(T),u.a.applyMatrix4(t),u.b.applyMatrix4(t),u.c.applyMatrix4(t),u.needsUpdate=!0;for(let M=v,y=v+m;M<y;M++)if(c(M),a.needsUpdate=!0,s(a,u,M,T,x,_,S,w))return!0}return!1};if(i){const v=i;i=function(m,f,b,x,_,S,w,T){return v(m,f,b,x,_,S,w,T)?!0:g(m,f,b,x,_,S,w,T)}}else i=g}return super.bvhcast(e,t,{intersectsRanges:i})}intersectsBox(e,t){return ys.set(e.min,e.max,t),ys.needsUpdate=!0,this.shapecast({intersectsBounds:r=>ys.intersectsBox(r),intersectsTriangle:r=>ys.intersectsTriangle(r)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,r={},i={},s=0,a=1/0){return(this.indirect?c_:Qv)(this,e,t,r,i,s,a)}closestPointToPoint(e,t={},r=0,i=1/0){return Nv(this,e,t,r,i)}}const Fi={Mesh:nt.prototype.raycast,Line:Cn.prototype.raycast,LineSegments:Yi.prototype.raycast,LineLoop:Qc.prototype.raycast,Points:eu.prototype.raycast,BatchedMesh:Qh.prototype.raycast},At=new nt,Ms=[];function u_(n,e){if(this.isBatchedMesh)h_.call(this,n,e);else{const{geometry:t}=this;if(t.boundsTree)t.boundsTree.raycastObject3D(this,n,e);else{let r;if(this instanceof nt)r=Fi.Mesh;else if(this instanceof Yi)r=Fi.LineSegments;else if(this instanceof Qc)r=Fi.LineLoop;else if(this instanceof Cn)r=Fi.Line;else if(this instanceof eu)r=Fi.Points;else throw new Error("BVH: Fallback raycast function not found.");r.call(this,n,e)}}}function h_(n,e){if(this.boundsTrees){const t=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,s=this.matrixWorld;At.material=this.material,At.geometry=this.geometry;const a=At.geometry.boundsTree,o=At.geometry.drawRange;At.geometry.boundingSphere===null&&(At.geometry.boundingSphere=new xr);for(let l=0,c=r.length;l<c;l++){if(!this.getVisibleAt(l))continue;const u=r[l].geometryIndex;if(At.geometry.boundsTree=t[u],this.getMatrixAt(l,At.matrixWorld).premultiply(s),!At.geometry.boundsTree){this.getBoundingBoxAt(u,At.geometry.boundingBox),this.getBoundingSphereAt(u,At.geometry.boundingSphere);const h=i[u];At.geometry.setDrawRange(h.start,h.count)}At.raycast(n,Ms);for(let h=0,d=Ms.length;h<d;h++){const p=Ms[h];p.object=this,p.batchId=l,e.push(p)}Ms.length=0}At.geometry.boundsTree=a,At.geometry.drawRange=o,At.material=null,At.geometry=null}else Fi.BatchedMesh.call(this,n,e)}function d_(n={}){const{type:e=Ds}=n;return this.boundsTree=new e(this,n),this.boundsTree}function p_(){this.boundsTree=null}(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();class f_{container;canvas;renderer;camera;target;radius=5;theta=Math.PI*.25;phi=Math.PI*.35;isDamping=!0;targetTheta;targetPhi;targetRadius;targetLookAt;isRightMouseDown=!1;isMiddleMouseDown=!1;prevMousePos={x:0,y:0};constructor(e){this.container=e,this.canvas=document.createElement("canvas"),this.container.appendChild(this.canvas),this.renderer=new cv({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!0});const t=Math.min(window.devicePixelRatio||1,2);this.renderer.setPixelRatio(t),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.toneMapping=Bc,this.renderer.toneMappingExposure=1,this.camera=new ir(45,window.innerWidth/window.innerHeight,.01,1e3),this.target=new P(0,.5,0),this.targetLookAt=this.target.clone(),this.targetTheta=this.theta,this.targetPhi=this.phi,this.targetRadius=this.radius,this.updateCameraPosition(),this.bindNavigationEvents(),window.addEventListener("resize",this.onResize.bind(this))}bindNavigationEvents(){this.canvas.addEventListener("wheel",e=>{e.preventDefault();const t=e.deltaY>0?.9:1.1;this.zoom(t)},{passive:!1}),this.canvas.addEventListener("mousedown",e=>{e.button===2?(this.isRightMouseDown=!0,this.prevMousePos={x:e.clientX,y:e.clientY}):e.button===1&&(this.isMiddleMouseDown=!0,this.prevMousePos={x:e.clientX,y:e.clientY})}),window.addEventListener("mousemove",e=>{if(this.isRightMouseDown){const t=e.clientX-this.prevMousePos.x,r=e.clientY-this.prevMousePos.y;this.orbit(t,r),this.prevMousePos={x:e.clientX,y:e.clientY}}else if(this.isMiddleMouseDown){const t=e.clientX-this.prevMousePos.x,r=e.clientY-this.prevMousePos.y;this.pan(t,r),this.prevMousePos={x:e.clientX,y:e.clientY}}}),window.addEventListener("mouseup",e=>{e.button===2&&(this.isRightMouseDown=!1),e.button===1&&(this.isMiddleMouseDown=!1)}),this.canvas.addEventListener("contextmenu",e=>e.preventDefault())}updateCameraPosition(){const e=this.target.x+this.radius*Math.sin(this.phi)*Math.sin(this.theta),t=this.target.y+this.radius*Math.cos(this.phi),r=this.target.z+this.radius*Math.sin(this.phi)*Math.cos(this.theta);this.camera.position.set(e,t,r),this.camera.lookAt(this.target)}update(e=.016){this.isDamping&&(this.theta+=(this.targetTheta-this.theta)*.2,this.phi+=(this.targetPhi-this.phi)*.2,this.radius+=(this.targetRadius-this.radius)*.2,this.target.lerp(this.targetLookAt,.2),this.updateCameraPosition())}orbit(e,t){this.targetTheta-=e*.008,this.targetPhi-=t*.008,this.targetPhi=Dt.clamp(this.targetPhi,.01,Math.PI-.01),this.isDamping||(this.theta=this.targetTheta,this.phi=this.targetPhi,this.updateCameraPosition())}pan(e,t){const r=new P().subVectors(this.target,this.camera.position).normalize(),i=new P().crossVectors(r,this.camera.up).normalize(),s=new P().crossVectors(i,r).normalize(),a=this.radius*.002,o=i.clone().multiplyScalar(-e*a).add(s.clone().multiplyScalar(t*a));this.targetLookAt.add(o),this.isDamping||(this.target.copy(this.targetLookAt),this.updateCameraPosition())}zoom(e){this.targetRadius=Dt.clamp(this.targetRadius/e,.2,50),this.isDamping||(this.radius=this.targetRadius,this.updateCameraPosition())}setViewPreset(e){switch(e){case"front":this.targetTheta=0,this.targetPhi=Math.PI*.5;break;case"back":this.targetTheta=Math.PI,this.targetPhi=Math.PI*.5;break;case"left":this.targetTheta=-Math.PI*.5,this.targetPhi=Math.PI*.5;break;case"right":this.targetTheta=Math.PI*.5,this.targetPhi=Math.PI*.5;break;case"top":this.targetTheta=0,this.targetPhi=.01;break;case"bottom":this.targetTheta=0,this.targetPhi=Math.PI-.01;break;case"iso":default:this.targetTheta=Math.PI*.25,this.targetPhi=Math.PI*.35;break}}unprojectScreenPointToPlane(e,t){const r=new ci;r.setFromCamera(e,this.camera);const i=new P;return r.ray.intersectPlane(t,i)?i:null}onResize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}dispose(){window.removeEventListener("resize",this.onResize),this.renderer.dispose()}}class za{id;name;visible=!0;locked=!1;opacity=1;curves=[];loftedMeshes=[];group;constructor(e="Layer 1",t){this.id=t??`layer_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,this.name=e,this.group=new Xt,this.group.name=this.id}addCurve(e){this.curves.push(e),this.group.add(e.mesh)}removeCurve(e){const t=this.curves.findIndex(r=>r.id===e);if(t!==-1){const r=this.curves[t];return this.curves.splice(t,1),this.group.remove(r.mesh),r}return null}addLoftedMesh(e){this.loftedMeshes.push(e),this.group.add(e)}setVisible(e){this.visible=e,this.group.visible=e}setOpacity(e){this.opacity=e,this.curves.forEach(t=>{t.mesh.material&&t.mesh.material.uniforms?.uOpacity&&(t.mesh.material.uniforms.uOpacity.value=t.alpha*e)})}toJSON(){return{id:this.id,name:this.name,visible:this.visible,locked:this.locked,opacity:this.opacity,curves:this.curves.map(e=>e.toJSON())}}dispose(){this.curves.forEach(e=>e.dispose()),this.loftedMeshes.forEach(e=>{e.geometry.dispose(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose()):e.material.dispose()}),this.curves=[],this.loftedMeshes=[]}}class m_{rootGroup;layers=[];activeLayerIndex=0;selectedCurveId=null;constructor(){this.rootGroup=new Xt,this.rootGroup.name="Stage";const e=new za("Layer 1");this.layers.push(e),this.rootGroup.add(e.group)}get activeLayer(){return this.layers[this.activeLayerIndex]||this.layers[0]}addLayer(e){const t=e||`Layer ${this.layers.length+1}`,r=new za(t);return this.layers.push(r),this.rootGroup.add(r.group),this.activeLayerIndex=this.layers.length-1,r}removeLayer(e){if(this.layers.length<=1)return!1;if(e>=0&&e<this.layers.length){const t=this.layers[e];return this.rootGroup.remove(t.group),t.dispose(),this.layers.splice(e,1),this.activeLayerIndex=Math.min(this.activeLayerIndex,this.layers.length-1),!0}return!1}setActiveLayer(e){e>=0&&e<this.layers.length&&(this.activeLayerIndex=e)}addCurveToActiveLayer(e){this.activeLayer.addCurve(e)}removeCurve(e){for(const t of this.layers){const r=t.removeCurve(e);if(r)return r}return null}findCurveById(e){for(const t of this.layers){const r=t.curves.find(i=>i.id===e);if(r)return r}return null}getAllCurves(){const e=[];return this.layers.forEach(t=>e.push(...t.curves)),e}toJSON(){return this.layers.map(e=>e.toJSON())}clear(){this.layers.forEach(t=>{this.rootGroup.remove(t.group),t.dispose()}),this.layers=[];const e=new za("Layer 1");this.layers.push(e),this.rootGroup.add(e.group),this.activeLayerIndex=0,this.selectedCurveId=null}}class g_{config;groundGrid;axesHelper;ambientLight;dirLight;environmentGroup;constructor(e){this.config={bgColor:"#cdb899",showGroundGrid:!0,showAxes:!1,gridSize:10,gridDivisions:20,gridColorCenter:"#968060",gridColorGrid:"#b8a07a",ambientIntensity:.8,directionalIntensity:1.2,sunPosition:new P(5,10,7),...e},this.environmentGroup=new Xt,this.environmentGroup.name="Environment",this.groundGrid=new qa(this.config.gridSize,this.config.gridDivisions,new ue(this.config.gridColorCenter),new ue(this.config.gridColorGrid)),this.groundGrid.position.y=0,this.groundGrid.visible=this.config.showGroundGrid,this.environmentGroup.add(this.groundGrid),this.axesHelper=new wd(1.5),this.axesHelper.visible=this.config.showAxes,this.environmentGroup.add(this.axesHelper),this.ambientLight=new dd(16777215,this.config.ambientIntensity),this.environmentGroup.add(this.ambientLight),this.dirLight=new hd(16777215,this.config.directionalIntensity),this.dirLight.position.copy(this.config.sunPosition),this.environmentGroup.add(this.dirLight)}setBgColor(e,t){this.config.bgColor=e,t.background=new ue(e)}toggleGroundGrid(e){return this.config.showGroundGrid=e??!this.groundGrid.visible,this.groundGrid.visible=this.config.showGroundGrid,this.config.showGroundGrid}toggleAxes(e){return this.config.showAxes=e??!this.axesHelper.visible,this.axesHelper.visible=this.config.showAxes,this.config.showAxes}setGridSize(e,t){this.config.gridSize=e,this.config.gridDivisions=t,this.environmentGroup.remove(this.groundGrid),this.groundGrid.geometry.dispose(),this.groundGrid=new qa(e,t,new ue(this.config.gridColorCenter),new ue(this.config.gridColorGrid)),this.groundGrid.visible=this.config.showGroundGrid,this.environmentGroup.add(this.groundGrid)}}class v_{referenceImages=[];referenceGroup;constructor(){this.referenceGroup=new Xt,this.referenceGroup.name="References"}addReferenceImage(e,t="Ref Image",r=1){const i=new ld().load(e),s=2,a=s/r,o=new Rn(s,a),l=new Wr({map:i,transparent:!0,opacity:.8,side:Kt}),c=new nt(o,l);c.position.set(0,a*.5,0);const u={id:`ref_img_${Date.now()}`,name:t,mesh:c,opacity:.8,drawOn:!0};return this.referenceImages.push(u),this.referenceGroup.add(c),u}setOpacity(e,t){const r=this.referenceImages.find(i=>i.id===e);r&&r.mesh.material&&(r.opacity=t,r.mesh.material.opacity=t)}removeReferenceImage(e){const t=this.referenceImages.findIndex(r=>r.id===e);if(t!==-1){const r=this.referenceImages[t];this.referenceGroup.remove(r.mesh),r.mesh.geometry.dispose(),r.mesh.material.dispose(),this.referenceImages.splice(t,1)}}}class __{position;normal;size;gridHelper;planeMesh;group;plane;constructor(e=new P(0,0,0),t=new P(0,1,0),r=4){this.position=e.clone(),this.normal=t.clone().normalize(),this.size=r,this.plane=new pr().setFromNormalAndCoplanarPoint(this.normal,this.position),this.group=new Xt,this.group.name="PlaneGuide",this.gridHelper=new qa(r,16,1743168,8022602),this.group.add(this.gridHelper);const i=new Rn(r,r),s=new Wr({color:1743168,transparent:!0,opacity:.08,side:Kt,depthWrite:!1});this.planeMesh=new nt(i,s),this.planeMesh.rotation.x=Math.PI*.5,this.group.add(this.planeMesh),this.updateTransform()}setTransform(e,t){this.position.copy(e),this.normal.copy(t).normalize(),this.plane.setFromNormalAndCoplanarPoint(this.normal,this.position),this.updateTransform()}updateTransform(){this.group.position.copy(this.position);const e=new P(0,1,0),t=new Vr().setFromUnitVectors(e,this.normal);this.group.quaternion.copy(t),this.plane.setFromNormalAndCoplanarPoint(this.normal,this.position)}setVisible(e){this.group.visible=e}}Ye.prototype.computeBoundsTree=d_;Ye.prototype.disposeBoundsTree=p_;nt.prototype.raycast=u_;class Wi{raycaster;static normalOffset=.002;constructor(){this.raycaster=new ci,this.raycaster.firstHitOnly=!0}static buildBVH(e){e.geometry&&(e.geometry.boundsTree||e.geometry.computeBoundsTree({maxLeafTris:10,strategy:0}))}snapScreenToSurface(e,t,r,i){this.raycaster.setFromCamera(new be(e,t),r);const s=this.raycaster.intersectObjects(i,!1);if(s.length>0){const a=s[0],o=a.face?a.face.normal.clone().transformDirection(a.object.matrixWorld):new P(0,1,0);return{point:a.point.clone().addScaledVector(o,Wi.normalOffset),normal:o,distance:a.distance,mesh:a.object}}return null}snapWorldPointToSurface(e,t,r){this.raycaster.set(e,t);const i=this.raycaster.intersectObjects(r,!1);if(i.length>0){const s=i[0],a=s.face?s.face.normal.clone().transformDirection(s.object.matrixWorld):new P(0,1,0);return{point:s.point.clone().addScaledVector(a,Wi.normalOffset),normal:a,distance:s.distance,mesh:s.object}}return null}}class x_{mesh;wireframe;group;type;constructor(e="sphere",t=1.5){this.type=e,this.group=new Xt,this.group.name=`PrimitiveGuide_${e}`;const r=this.createGeometry(e,t);Wi.buildBVH({geometry:r});const i=new Wr({color:1987232,transparent:!0,opacity:.15,side:Kt,depthWrite:!1});this.mesh=new nt(r,i),this.group.add(this.mesh);const s=new ml(r),a=new qi({color:1987232,transparent:!0,opacity:.35});this.wireframe=new Yi(s,a),this.group.add(this.wireframe),this.group.position.set(0,t*.5,0)}createGeometry(e,t){switch(e){case"cube":return new An(t,t,t);case"cylinder":return new vo(t*.5,t*.5,t,24);case"cone":return new _o(t*.5,t,24);case"torus":return new yo(t*.5,t*.15,16,32);case"sphere":default:return new xo(t*.5,24,24)}}setType(e,t=1.5){this.type=e,this.mesh.geometry.dispose(),this.wireframe.geometry.dispose();const r=this.createGeometry(e,t);Wi.buildBVH({geometry:r}),this.mesh.geometry=r,this.wireframe.geometry=new ml(r)}setVisible(e){this.group.visible=e}}class y_{mode="plane";planeGuide;primitiveGuide;meshGuides=[];surfaceSnapper;guideGroup;constructor(){this.guideGroup=new Xt,this.guideGroup.name="Guides",this.surfaceSnapper=new Wi,this.planeGuide=new __(new P(0,0,0),new P(0,1,0),4),this.primitiveGuide=new x_("sphere",1.5),this.primitiveGuide.setVisible(!1),this.guideGroup.add(this.planeGuide.group),this.guideGroup.add(this.primitiveGuide.group)}setMode(e){this.mode=e,this.planeGuide.setVisible(e==="plane"),this.primitiveGuide.setVisible(e==="primitive"),this.meshGuides.forEach(t=>t.setVisible(e==="mesh"))}setPrimitiveType(e){this.primitiveGuide.setType(e)}snap(e,t){if(this.mode==="none"){const r=new pr(new P(0,1,0),0),i=new ci;i.setFromCamera(e,t);const s=new P;return i.ray.intersectPlane(r,s)?{point:s,normal:new P(0,1,0)}:null}if(this.mode==="plane"){const r=new ci;r.setFromCamera(e,t);const i=new P;return r.ray.intersectPlane(this.planeGuide.plane,i)?{point:i,normal:this.planeGuide.normal.clone()}:null}if(this.mode==="primitive"){const r=this.surfaceSnapper.snapScreenToSurface(e.x,e.y,t,[this.primitiveGuide.mesh]);return r?{point:r.point,normal:r.normal}:null}if(this.mode==="mesh"){const r=this.meshGuides.map(s=>s.mesh),i=this.surfaceSnapper.snapScreenToSurface(e.x,e.y,t,r);return i?{point:i.point,normal:i.normal}:null}return null}}const fc={ribbon:{id:"ribbon",name:"Ribbon",profile:"ribbon",materialType:"shadeless",defaultSize:.03,defaultOpacity:1,smoothingAlpha:.35,taperStart:!0,taperEnd:!0,pressureRadius:!0,pressureOpacity:!1},pen:{id:"pen",name:"Fine Pen",profile:"ribbon",materialType:"shadeless",defaultSize:.01,defaultOpacity:1,smoothingAlpha:.45,taperStart:!0,taperEnd:!0,pressureRadius:!0,pressureOpacity:!1},tube:{id:"tube",name:"3D Tube",profile:"tube",materialType:"shaded",defaultSize:.04,defaultOpacity:1,smoothingAlpha:.3,taperStart:!0,taperEnd:!0,pressureRadius:!0,pressureOpacity:!1},glow:{id:"glow",name:"Glow Marker",profile:"ribbon",materialType:"glow",defaultSize:.035,defaultOpacity:1,smoothingAlpha:.35,taperStart:!0,taperEnd:!0,pressureRadius:!0,pressureOpacity:!1},halftone:{id:"halftone",name:"Halftone",profile:"ribbon",materialType:"halftone",defaultSize:.05,defaultOpacity:1,smoothingAlpha:.35,taperStart:!0,taperEnd:!0,pressureRadius:!0,pressureOpacity:!1},cutout:{id:"cutout",name:"Cutout Hole",profile:"ribbon",materialType:"cutout",defaultSize:.06,defaultOpacity:1,smoothingAlpha:.35,taperStart:!1,taperEnd:!1,pressureRadius:!0,pressureOpacity:!1}};class b_{activePreset;size;opacity;color;smoothingAlpha;materialType;profile;taperStart;taperEnd;constructor(){this.activePreset=fc.ribbon,this.size=this.activePreset.defaultSize,this.opacity=this.activePreset.defaultOpacity,this.color=new ue(1710638),this.smoothingAlpha=this.activePreset.smoothingAlpha,this.materialType=this.activePreset.materialType,this.profile=this.activePreset.profile,this.taperStart=this.activePreset.taperStart,this.taperEnd=this.activePreset.taperEnd}setPreset(e){const t=fc[e];t&&(this.activePreset=t,this.size=t.defaultSize,this.opacity=t.defaultOpacity,this.smoothingAlpha=t.smoothingAlpha,this.materialType=t.materialType,this.profile=t.profile,this.taperStart=t.taperStart,this.taperEnd=t.taperEnd)}setSize(e){this.size=Dt.clamp(e,.002,.5)}setOpacity(e){this.opacity=Dt.clamp(e,.05,1)}setColor(e){typeof e=="string"?this.color.set(e):this.color.copy(e)}setMaterialType(e){this.materialType=e}setProfile(e){this.profile=e}}class M_{undoStack=[];redoStack=[];maxHistory;onStateChange;constructor(e=50){this.maxHistory=e}execute(e){e.execute(),this.undoStack.push(e),this.undoStack.length>this.maxHistory&&this.undoStack.shift(),this.redoStack=[],this.notify()}recordExecuted(e){this.undoStack.push(e),this.undoStack.length>this.maxHistory&&this.undoStack.shift(),this.redoStack=[],this.notify()}undo(){if(this.undoStack.length===0)return!1;const e=this.undoStack.pop();return e.undo(),this.redoStack.push(e),this.notify(),!0}redo(){if(this.redoStack.length===0)return!1;const e=this.redoStack.pop();return e.execute(),this.undoStack.push(e),this.notify(),!0}canUndo(){return this.undoStack.length>0}canRedo(){return this.redoStack.length>0}get undoCount(){return this.undoStack.length}get redoCount(){return this.redoStack.length}clear(){this.undoStack=[],this.redoStack=[],this.notify()}notify(){this.onStateChange&&this.onStateChange(this.canUndo(),this.canRedo())}}class S_{axis="none";mirrorPlaneMesh;symmetryGroup;constructor(){this.symmetryGroup=new Xt,this.symmetryGroup.name="Symmetry";const e=new Rn(8,8),t=new Wr({color:1987232,transparent:!0,opacity:.15,side:Kt,depthWrite:!1});this.mirrorPlaneMesh=new nt(e,t),this.mirrorPlaneMesh.visible=!1,this.symmetryGroup.add(this.mirrorPlaneMesh)}setAxis(e){if(this.axis=e,e==="none"){this.mirrorPlaneMesh.visible=!1;return}this.mirrorPlaneMesh.visible=!0,this.mirrorPlaneMesh.rotation.set(0,0,0),e==="x"?this.mirrorPlaneMesh.rotation.y=Math.PI*.5:e==="y"?this.mirrorPlaneMesh.rotation.x=Math.PI*.5:e==="z"&&this.mirrorPlaneMesh.rotation.set(0,0,0)}mirrorPoints(e){return this.axis==="none"?[]:e.map(t=>{const r=t.position.clone();return this.axis==="x"&&(r.x=-r.x),this.axis==="y"&&(r.y=-r.y),this.axis==="z"&&(r.z=-r.z),{position:r,pressure:t.pressure,tilt:t.tilt.clone(),time:t.time}})}}class T_{element;callbacks;activePointerId=null;isStylusActive=!1;allowTouchDrawing=!0;minPressure=.1;constructor(e,t){this.element=e,this.callbacks=t,this.bindEvents()}bindEvents(){this.element.addEventListener("pointerdown",this.onPointerDown.bind(this)),window.addEventListener("pointermove",this.onPointerMove.bind(this)),window.addEventListener("pointerup",this.onPointerUp.bind(this)),window.addEventListener("pointercancel",this.onPointerUp.bind(this)),this.element.style.touchAction="none"}getNDC(e,t){const r=this.element.getBoundingClientRect(),i=(e-r.left)/r.width*2-1,s=-((t-r.top)/r.height*2-1);return new be(i,s)}extractCurvePoint(e){let t=e.pressure;(e.pointerType==="mouse"&&e.buttons>0&&t===0||e.pointerType==="touch"&&t===0)&&(t=.5);const r=e.tiltX||0,i=e.tiltY||0;return{position:new P(e.clientX,e.clientY,0),pressure:Math.max(this.minPressure,t),tilt:new be(r,i),time:performance.now()}}onPointerDown(e){if(e.button!==0&&e.pointerType==="mouse")return;e.pointerType==="pen"&&(this.isStylusActive=!0),this.activePointerId=e.pointerId;try{this.element.setPointerCapture(e.pointerId)}catch{}const t=this.extractCurvePoint(e),r=this.getNDC(e.clientX,e.clientY);this.callbacks.onPointerDrawStart(t,r,e)}onPointerMove(e){if(this.activePointerId!==e.pointerId)return;const t=this.extractCurvePoint(e),r=this.getNDC(e.clientX,e.clientY);this.callbacks.onPointerDrawMove(t,r,e)}onPointerUp(e){if(this.activePointerId===e.pointerId){try{this.element.hasPointerCapture(e.pointerId)&&this.element.releasePointerCapture(e.pointerId)}catch{}this.activePointerId=null,e.pointerType==="pen"&&(this.isStylusActive=!1),this.callbacks.onPointerDrawEnd(e)}}cancelCurrentPointer(){this.activePointerId=null,this.isStylusActive=!1}}class w_{element;callbacks;initialTouchCount=0;touchStartTime=0;touchStartPositions=[];prevPinchDistance=0;prevPinchAngle=0;prevMidpoint={x:0,y:0};prevSingleTouch={x:0,y:0};isPenActive=!1;constructor(e,t={}){this.element=e,this.callbacks=t,this.bindEvents()}setPenActive(e){this.isPenActive=e}bindEvents(){const e={passive:!1};this.element.addEventListener("touchstart",this.onTouchStart.bind(this),e),window.addEventListener("touchmove",this.onTouchMove.bind(this),e),window.addEventListener("touchend",this.onTouchEnd.bind(this),e),window.addEventListener("touchcancel",this.onTouchEnd.bind(this),e)}onTouchStart(e){this.initialTouchCount=e.touches.length,this.touchStartTime=Date.now(),this.touchStartPositions=[];for(let t=0;t<e.touches.length;t++)this.touchStartPositions.push({x:e.touches[t].clientX,y:e.touches[t].clientY});if(e.touches.length>=2){this.callbacks.onGestureCancelDrawing&&this.callbacks.onGestureCancelDrawing();const t=e.touches[0],r=e.touches[1];this.prevPinchDistance=Math.hypot(r.clientX-t.clientX,r.clientY-t.clientY),this.prevPinchAngle=Math.atan2(r.clientY-t.clientY,r.clientX-t.clientX),this.prevMidpoint={x:(t.clientX+r.clientX)*.5,y:(t.clientY+r.clientY)*.5}}else e.touches.length===1&&(this.prevSingleTouch={x:e.touches[0].clientX,y:e.touches[0].clientY})}onTouchMove(e){if(e.touches.length>=2){e.preventDefault();const t=e.touches[0],r=e.touches[1],i=(t.clientX+r.clientX)*.5,s=(t.clientY+r.clientY)*.5,a=i-this.prevMidpoint.x,o=s-this.prevMidpoint.y;this.callbacks.onTwoFingerPan&&(Math.abs(a)>.5||Math.abs(o)>.5)&&this.callbacks.onTwoFingerPan(a,o),this.prevMidpoint={x:i,y:s};const l=Math.hypot(r.clientX-t.clientX,r.clientY-t.clientY);if(this.prevPinchDistance>0&&this.callbacks.onTwoFingerZoom){const h=l/this.prevPinchDistance;Math.abs(h-1)>.005&&this.callbacks.onTwoFingerZoom(h)}this.prevPinchDistance=l;const c=Math.atan2(r.clientY-t.clientY,r.clientX-t.clientX);let u=c-this.prevPinchAngle;u>Math.PI&&(u-=Math.PI*2),u<-Math.PI&&(u+=Math.PI*2),this.callbacks.onTwoFingerRotate&&Math.abs(u)>.01&&this.callbacks.onTwoFingerRotate(u),this.prevPinchAngle=c}else if(e.touches.length===1&&!this.isPenActive){const t=e.touches[0],r=t.clientX-this.prevSingleTouch.x,i=t.clientY-this.prevSingleTouch.y;this.callbacks.onOneFingerOrbit&&(Math.abs(r)>.5||Math.abs(i)>.5)&&this.callbacks.onOneFingerOrbit(r,i),this.prevSingleTouch={x:t.clientX,y:t.clientY}}}onTouchEnd(e){const t=Date.now()-this.touchStartTime;if(this.initialTouchCount===3&&t<350){const r=e.changedTouches;if(r.length>0&&this.touchStartPositions.length===3){const i=(this.touchStartPositions[0].x+this.touchStartPositions[1].x+this.touchStartPositions[2].x)/3,s=r[0].clientX-i;Math.abs(s)>60?this.callbacks.onThreeFingerSwipe&&this.callbacks.onThreeFingerSwipe(s>0?"right":"left"):this.callbacks.onThreeFingerTap&&this.callbacks.onThreeFingerTap()}}e.touches.length===0&&(this.initialTouchCount=0,this.touchStartPositions=[])}}const mu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Zi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const E_=new Mo(-1,1,1,-1,0,1);class A_ extends Ye{constructor(){super(),this.setAttribute("position",new qe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qe([0,2,0,0,2,0],2))}}const C_=new A_;class Io{constructor(e){this._mesh=new nt(C_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,E_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class R_ extends Zi{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof gt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=wn.clone(e.uniforms),this.material=new gt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new Io(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class mc extends Zi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class P_ extends Zi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class I_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new be);this._width=r.width,this._height=r.height,t=new mr(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ts}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new R_(mu),this.copyPass.material.blending=Ou,this.clock=new fd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),a.needsSwap){if(r){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}mc!==void 0&&(a instanceof mc?r=!0:a instanceof P_&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new be);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class L_ extends Zi{constructor(e,t,r=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ue}render(e,t,r){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const U_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ue(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Xi extends Zi{constructor(e,t,r,i){super(),this.strength=t!==void 0?t:1,this.radius=r,this.threshold=i,this.resolution=e!==void 0?new be(e.x,e.y):new be(256,256),this.clearColor=new ue(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new mr(s,a,{type:Ts}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new mr(s,a,{type:Ts});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new mr(s,a,{type:Ts});p.texture.name="UnrealBloomPass.v"+h,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),a=Math.round(a/2)}const o=U_;this.highPassUniforms=wn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new gt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this.getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new be(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=mu;this.copyUniforms=wn.clone(u.uniforms),this.blendMaterial=new gt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Fu,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ue,this.oldClearAlpha=1,this.basic=new Wr,this.fsQuad=new Io(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(r,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(r,i),this.renderTargetsVertical[s].setSize(r,i),this.separableBlurMaterials[s].uniforms.invSize.value=new be(1/r,1/i),r=Math.round(r/2),i=Math.round(i/2)}render(e,t,r,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Xi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Xi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeparableBlurMaterial(e){const t=[];for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new gt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new be(.5,.5)},direction:{value:new be(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new gt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Xi.BlurDirectionX=new be(1,0);Xi.BlurDirectionY=new be(0,1);const D_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class N_ extends Zi{constructor(){super();const e=D_;this.uniforms=wn.clone(e.uniforms),this.material=new td({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new Io(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ze.getTransfer(this._outputColorSpace)===Ze&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===zu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ku?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Bc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Gu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Vu?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Hu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class O_{composer;renderPass;bloomPass;outputPass;isBloomEnabled=!0;constructor(e,t,r,i={}){const s=window.innerWidth,a=window.innerHeight;this.composer=new I_(e),this.renderPass=new L_(t,r),this.composer.addPass(this.renderPass);const o=i.bloomStrength??.8,l=i.bloomRadius??.4,c=i.bloomThreshold??.85;this.bloomPass=new Xi(new be(s,a),o,l,c),this.bloomPass.enabled=i.enableBloom??!0,this.composer.addPass(this.bloomPass),this.outputPass=new N_,this.composer.addPass(this.outputPass)}setSize(e,t){this.composer.setSize(e,t),this.bloomPass.resolution.set(e,t)}setBloomEnabled(e){this.isBloomEnabled=e,this.bloomPass.enabled=e}setBloomParams(e,t,r){this.bloomPass.strength=e,this.bloomPass.radius=t,this.bloomPass.threshold=r}render(e){this.composer.render(e)}}class ka{static applyScreenTranslation(e,t,r,i,s=.005){const a=new P(1,0,0).applyQuaternion(i.quaternion),o=new P(0,1,0).applyQuaternion(i.quaternion),l=a.clone().multiplyScalar(t*s).add(o.clone().multiplyScalar(-r*s));e.position.add(l)}static applyScreenRotation(e,t,r){const i=new P(0,0,-1).applyQuaternion(r.quaternion),s=new Vr().setFromAxisAngle(i,t);e.quaternion.premultiply(s)}static applyScale(e,t){e.scale.multiplyScalar(t)}}class gc{static applyTranslation(e,t,r,i="world"){const s=new P;t==="x"?s.set(1,0,0):t==="y"?s.set(0,1,0):t==="z"&&s.set(0,0,1),i==="local"&&s.applyQuaternion(e.quaternion),e.position.addScaledVector(s,r)}static applyRotation(e,t,r,i="world"){const s=new P;t==="x"?s.set(1,0,0):t==="y"?s.set(0,1,0):t==="z"&&s.set(0,0,1),i==="local"?e.rotateOnAxis(s,r):e.rotateOnWorldAxis(s,r)}static applyScale(e,t,r){t==="all"?e.scale.multiplyScalar(r):t==="x"?e.scale.x*=r:t==="y"?e.scale.y*=r:t==="z"&&(e.scale.z*=r)}}class F_{group;axisX;axisY;axisZ;snapAngleDeg=15;snapGridUnits=.1;constructor(){this.group=new Xt,this.group.name="TransformGizmo";const e=new P(0,0,0),t=1;this.axisX=new ba(new P(1,0,0),e,t,11546656,.2,.08),this.group.add(this.axisX),this.axisY=new ba(new P(0,1,0),e,t,1743168,.2,.08),this.group.add(this.axisY),this.axisZ=new ba(new P(0,0,1),e,t,1987232,.2,.08),this.group.add(this.axisZ),this.group.visible=!1}setPosition(e){this.group.position.copy(e)}setVisible(e){this.group.visible=e}snapAngle(e){const t=Dt.degToRad(this.snapAngleDeg);return Math.round(e/t)*t}snapPosition(e){return new P(Math.round(e.x/this.snapGridUnits)*this.snapGridUnits,Math.round(e.y/this.snapGridUnits)*this.snapGridUnits,Math.round(e.z/this.snapGridUnits)*this.snapGridUnits)}}class B_{mode="2d";targetObject=null;gizmo;space="world";isEnabled=!1;constructor(){this.gizmo=new F_}setTarget(e){this.targetObject=e,e&&this.isEnabled?(this.gizmo.setPosition(e.position),this.gizmo.setVisible(!0)):this.gizmo.setVisible(!1)}setEnabled(e){this.isEnabled=e,this.targetObject&&e?(this.gizmo.setPosition(this.targetObject.position),this.gizmo.setVisible(!0)):this.gizmo.setVisible(!1)}handle2DDrag(e,t,r){this.targetObject&&(ka.applyScreenTranslation(this.targetObject,e,t,r),this.gizmo.setPosition(this.targetObject.position))}handle2DRotate(e,t){this.targetObject&&ka.applyScreenRotation(this.targetObject,e,t)}handle3DTranslate(e,t){this.targetObject&&(gc.applyTranslation(this.targetObject,e,t,this.space),this.gizmo.setPosition(this.targetObject.position))}handle3DRotate(e,t){if(!this.targetObject)return;const r=Dt.degToRad(t);gc.applyRotation(this.targetObject,e,r,this.space)}handleScale(e){this.targetObject&&ka.applyScale(this.targetObject,e)}}class z_{stageManager;curve;layerIndex;constructor(e,t,r){this.stageManager=e,this.curve=t,this.layerIndex=r}execute(){this.stageManager.removeCurve(this.curve.id)}undo(){(this.stageManager.layers[this.layerIndex]||this.stageManager.activeLayer).addCurve(this.curve)}}class k_{stageManager;historyManager;raycaster;radius=.05;constructor(e,t){this.stageManager=e,this.historyManager=t,this.raycaster=new ci}eraseAt(e,t){this.raycaster.setFromCamera(e,t);const r=this.stageManager.getAllCurves().map(s=>s.mesh),i=this.raycaster.intersectObjects(r,!1);if(i.length>0){const s=i[0].object.userData.curveId;if(s){const a=this.stageManager.findCurveById(s);if(a&&!a.locked){const o=this.stageManager.activeLayerIndex,l=new z_(this.stageManager,a,o);return this.historyManager.execute(l),!0}}}return!1}}class H_{stageManager;brushEngine;raycaster;constructor(e,t){this.stageManager=e,this.brushEngine=t,this.raycaster=new ci}sampleStrokeAt(e,t){this.raycaster.setFromCamera(e,t);const r=this.stageManager.getAllCurves().map(s=>s.mesh),i=this.raycaster.intersectObjects(r,!1);if(i.length>0){const s=i[0].object.userData.curveId;if(s){const a=this.stageManager.findCurveById(s);if(a)return this.brushEngine.setColor(a.color),this.brushEngine.setSize(a.size),this.brushEngine.setOpacity(a.alpha),this.brushEngine.setMaterialType(a.materialType),this.brushEngine.setProfile(a.profile),a}}return null}}class G_{curve;oldPoints;newPoints;constructor(e,t,r){this.curve=e,this.oldPoints=t.map(i=>({position:i.position.clone(),pressure:i.pressure,tilt:i.tilt.clone(),time:i.time})),this.newPoints=r.map(i=>({position:i.position.clone(),pressure:i.pressure,tilt:i.tilt.clone(),time:i.time}))}execute(){this.curve.points=this.newPoints.map(e=>({position:e.position.clone(),pressure:e.pressure,tilt:e.tilt.clone(),time:e.time})),this.curve.updateGeometry()}undo(){this.curve.points=this.oldPoints.map(e=>({position:e.position.clone(),pressure:e.pressure,tilt:e.tilt.clone(),time:e.time})),this.curve.updateGeometry()}}class V_{stageManager;historyManager;radius=.5;strength=1;activeDeformedCurves=new Map;constructor(e,t){this.stageManager=e,this.historyManager=t}startDeform(){this.activeDeformedCurves.clear()}applyDeform(e,t){this.stageManager.getAllCurves().forEach(r=>{if(r.locked||!r.visible)return;let i=!1;this.activeDeformedCurves.has(r.id)||this.activeDeformedCurves.set(r.id,r.points.map(s=>({position:s.position.clone(),pressure:s.pressure,tilt:s.tilt.clone(),time:s.time})));for(let s=0;s<r.points.length;s++){const a=r.points[s],o=a.position.distanceTo(e);if(o<=this.radius){const l=o/this.radius,c=1-3*Math.pow(l,2)+2*Math.pow(l,3),u=t.clone().multiplyScalar(c*this.strength);a.position.add(u),i=!0}}i&&r.updateGeometry()})}endDeform(){this.activeDeformedCurves.forEach((e,t)=>{const r=this.stageManager.findCurveById(t);if(r){const i=new G_(r,e,r.points);this.historyManager.recordExecuted(i)}}),this.activeDeformedCurves.clear()}}class gu{static computeFrames(e,t){const r=e.length;if(r<2){const c=r===1?e[0].clone():new P,u=new P(0,0,1),h=new P(0,1,0),d=new P(1,0,0);return[{position:c,tangent:u,normal:h,binormal:d}]}const i=new Array(r),s=new Array(r);for(let c=0;c<r-1;c++){const u=new P().subVectors(e[c+1],e[c]);u.lengthSq()<1e-10?s[c]=c>0?s[c-1].clone():new P(0,0,1):s[c]=u.normalize()}s[r-1]=s[r-2].clone();const a=s[0];let o;if(t&&Math.abs(t.dot(a))<.999)o=t.clone().projectOnPlane(a).normalize();else{const c=Math.abs(a.x),u=Math.abs(a.y),h=Math.abs(a.z);let d;c<=u&&c<=h?d=new P(1,0,0):u<=c&&u<=h?d=new P(0,1,0):d=new P(0,0,1),o=new P().crossVectors(a,d).normalize()}let l=new P().crossVectors(a,o).normalize();i[0]={position:e[0].clone(),tangent:a.clone(),normal:o.clone(),binormal:l.clone()};for(let c=0;c<r-1;c++){const u=e[c],h=e[c+1],d=s[c],p=s[c+1],g=i[c].normal,v=new P().subVectors(h,u),m=v.dot(v);let f;if(m<1e-10)f=g.clone();else{const x=d.clone().addScaledVector(v,-(2/m)*v.dot(d)),_=g.clone().addScaledVector(v,-(2/m)*v.dot(g)),S=new P().subVectors(p,x),w=S.dot(S);w<1e-10?f=_.clone():f=_.clone().addScaledVector(S,-(2/w)*S.dot(_))}f.projectOnPlane(p).normalize();const b=new P().crossVectors(p,f).normalize();i[c+1]={position:h.clone(),tangent:p.clone(),normal:f.clone(),binormal:b.clone()}}return i}}class W_{static build(e,t={}){if(e.length<2)return new Ye;const r=t.baseWidth??.02,i=t.minWidth??r*.2,s=t.maxWidth??r*2,a=t.taperStart??!0,o=t.taperEnd??!0,l=t.taperLength??.1,c=t.color??new ue(1710638),u=t.alpha??1,h=e.map(w=>w.position),d=gu.computeFrames(h,t.normal),p=e.length,g=p*2,v=(p-1)*2,m=new Float32Array(g*3),f=new Float32Array(g*3),b=new Float32Array(g*2),x=new Float32Array(g*4),_=new Uint32Array(v*3);for(let w=0;w<p;w++){const T=e[w],E=d[w],M=w/(p-1),y=Dt.clamp(T.pressure>0?T.pressure:.5,.05,1);let R=i+y*(s-i);a&&M<l&&(R*=M/l),o&&M>1-l&&(R*=(1-M)/l);const I=Math.max(R*.5,5e-4),U=E.binormal.clone().multiplyScalar(I),D=T.position.clone().sub(U),z=w*2;m[z*3]=D.x,m[z*3+1]=D.y,m[z*3+2]=D.z,f[z*3]=E.normal.x,f[z*3+1]=E.normal.y,f[z*3+2]=E.normal.z,b[z*2]=0,b[z*2+1]=M,x[z*4]=c.r,x[z*4+1]=c.g,x[z*4+2]=c.b,x[z*4+3]=u*y;const k=T.position.clone().add(U),X=w*2+1;if(m[X*3]=k.x,m[X*3+1]=k.y,m[X*3+2]=k.z,f[X*3]=E.normal.x,f[X*3+1]=E.normal.y,f[X*3+2]=E.normal.z,b[X*2]=1,b[X*2+1]=M,x[X*4]=c.r,x[X*4+1]=c.g,x[X*4+2]=c.b,x[X*4+3]=u*y,w<p-1){const G=w*6,J=z,se=X,pe=z+2,ve=X+2;_[G]=J,_[G+1]=pe,_[G+2]=se,_[G+3]=se,_[G+4]=pe,_[G+5]=ve}}const S=new Ye;return S.setAttribute("position",new We(m,3)),S.setAttribute("normal",new We(f,3)),S.setAttribute("uv",new We(b,2)),S.setAttribute("color",new We(x,4)),S.setIndex(new We(_,1)),S}}class X_{static build(e,t={}){if(e.length<2)return new Ye;const r=t.baseRadius??.01,i=t.minRadius??r*.2,s=t.maxRadius??r*2,a=Math.max(3,t.radialSegments??8),o=t.taperStart??!0,l=t.taperEnd??!0,c=t.taperLength??.1,u=t.color??new ue(1710638),h=t.alpha??1,d=e.map(M=>M.position),p=gu.computeFrames(d,t.normal),g=e.length,v=a+1,m=g*v,f=(g-1)*a*2,b=new Float32Array(m*3),x=new Float32Array(m*3),_=new Float32Array(m*2),S=new Float32Array(m*4),w=new Uint32Array(f*3);for(let M=0;M<g;M++){const y=e[M],R=p[M],I=M/(g-1),U=Dt.clamp(y.pressure>0?y.pressure:.5,.05,1);let D=i+U*(s-i);o&&I<c&&(D*=I/c),l&&I>1-c&&(D*=(1-I)/c),D=Math.max(D,2e-4);for(let z=0;z<=a;z++){const k=z/a*Math.PI*2,X=Math.cos(k),G=Math.sin(k),J=R.binormal.x*X+R.normal.x*G,se=R.binormal.y*X+R.normal.y*G,pe=R.binormal.z*X+R.normal.z*G,ve=M*v+z;b[ve*3]=y.position.x+J*D,b[ve*3+1]=y.position.y+se*D,b[ve*3+2]=y.position.z+pe*D,x[ve*3]=J,x[ve*3+1]=se,x[ve*3+2]=pe,_[ve*2]=z/a,_[ve*2+1]=I,S[ve*4]=u.r,S[ve*4+1]=u.g,S[ve*4+2]=u.b,S[ve*4+3]=h}}let T=0;for(let M=0;M<g-1;M++)for(let y=0;y<a;y++){const R=M*v+y,I=(M+1)*v+y,U=(M+1)*v+y+1,D=M*v+y+1;w[T++]=R,w[T++]=I,w[T++]=D,w[T++]=I,w[T++]=U,w[T++]=D}const E=new Ye;return E.setAttribute("position",new We(b,3)),E.setAttribute("normal",new We(x,3)),E.setAttribute("uv",new We(_,2)),E.setAttribute("color",new We(S,4)),E.setIndex(new We(w,1)),E}}class oo{static buildGeometry(e,t){if(e.length<2)return new Ye;switch(t.profile){case"tube":{const r={baseRadius:t.size*.5,minRadius:t.size*.1,maxRadius:t.size*1.5,radialSegments:8,taperStart:t.taperStart??!0,taperEnd:t.taperEnd??!0,color:t.color,alpha:t.alpha,normal:t.normal};return X_.build(e,r)}case"ribbon":case"flat":default:{const r={baseWidth:t.size,minWidth:t.size*.2,maxWidth:t.size*2,taperStart:t.taperStart??!0,taperEnd:t.taperEnd??!0,color:t.color,alpha:t.alpha,normal:t.normal};return W_.build(e,r)}}}}const vc={vertexShader:`
    attribute vec4 color;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vColor = color;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uOpacity;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vec4 finalColor = vColor;
      finalColor.a *= uOpacity;
      if (finalColor.a < 0.001) discard;
      gl_FragColor = finalColor;
    }
  `};function j_(n=1){return new gt({uniforms:{uOpacity:{value:n}},vertexShader:vc.vertexShader,fragmentShader:vc.fragmentShader,transparent:!0,depthWrite:!0,depthTest:!0,side:Kt})}const _c={uniforms:{uLightDirection:{value:new P(.5,1,.75).normalize()},uLightColor:{value:new ue(1,.98,.95)},uAmbientColor:{value:new ue(.35,.35,.4)}},vertexShader:`
    attribute vec4 color;
    varying vec4 vColor;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vColor = color;
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    uniform vec3 uLightDirection;
    uniform vec3 uLightColor;
    uniform vec3 uAmbientColor;
    uniform float uIsCelShaded;
    uniform float uCelBands;
    uniform float uOpacity;

    varying vec4 vColor;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 L = normalize(uLightDirection);
      float NdotL = max(dot(N, L), 0.0);

      float diffuse = NdotL;
      if (uIsCelShaded > 0.5) {
        // Quantize NdotL into discrete toon cel steps
        diffuse = floor(NdotL * uCelBands) / uCelBands;
        diffuse = smoothstep(0.0, 1.0, diffuse * 1.2);
      }

      vec3 lighting = uAmbientColor + uLightColor * diffuse;
      vec3 finalRgb = vColor.rgb * lighting;
      float alpha = vColor.a * uOpacity;

      if (alpha < 0.001) discard;
      gl_FragColor = vec4(finalRgb, alpha);
    }
  `};function xc(n=!0,e=1){return new gt({uniforms:{uLightDirection:{value:new P(.5,1,.75).normalize()},uLightColor:{value:new ue(1,.98,.95)},uAmbientColor:{value:new ue(.35,.35,.4)},uIsCelShaded:{value:n?1:0},uCelBands:{value:3},uOpacity:{value:e}},vertexShader:_c.vertexShader,fragmentShader:_c.fragmentShader,transparent:!0,depthWrite:!0,depthTest:!0,side:Kt})}const yc={vertexShader:`
    attribute vec4 color;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vColor = color;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uGlowIntensity;
    uniform float uOpacity;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      // Glow core with edge brightening
      float edgeGlow = 1.0 + pow(abs(vUv.x - 0.5) * 2.0, 2.0) * 0.5;
      vec3 emissive = vColor.rgb * uGlowIntensity * edgeGlow;
      float alpha = vColor.a * uOpacity;

      if (alpha < 0.001) discard;
      gl_FragColor = vec4(emissive, alpha);
    }
  `};function $_(n=2.5,e=1){return new gt({uniforms:{uGlowIntensity:{value:n},uOpacity:{value:e}},vertexShader:yc.vertexShader,fragmentShader:yc.fragmentShader,transparent:!0,depthWrite:!0,depthTest:!0,side:Kt})}const bc={uniforms:{uBgColor:{value:new ue(13482137)}},vertexShader:`
    attribute vec4 color;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      vColor = color;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform float uCutoutThreshold;
    uniform vec3 uBgColor;
    uniform float uIsHole;
    varying vec4 vColor;
    varying vec2 vUv;

    void main() {
      if (uIsHole > 0.5) {
        // Paint background color directly with depth write to punch holes through scene
        gl_FragColor = vec4(uBgColor, 1.0);
      } else {
        if (vColor.a < uCutoutThreshold) discard;
        gl_FragColor = vec4(vColor.rgb, 1.0);
      }
    }
  `};function q_(n=new ue(13482137)){return new gt({uniforms:{uCutoutThreshold:{value:.1},uBgColor:{value:n},uIsHole:{value:1}},vertexShader:bc.vertexShader,fragmentShader:bc.fragmentShader,transparent:!1,depthWrite:!0,depthTest:!0,side:Kt})}const Mc={vertexShader:`
    attribute vec4 color;
    varying vec4 vColor;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vColor = color;
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,fragmentShader:`
    uniform int uPatternType;
    uniform float uPatternScale;
    uniform float uPatternAngle;
    uniform float uPatternContrast;
    uniform float uPatternIntensity;
    uniform float uOpacity;

    varying vec4 vColor;
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    // Hash function for stippling and terrazzo
    vec2 hash2(vec2 p) {
      return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
    }

    // Voronoi distance for Terrazzo
    float voronoi(vec2 p) {
      vec2 n = floor(p);
      vec2 f = fract(p);
      float md = 8.0;
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = hash2(n + g);
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < md) md = d;
        }
      }
      return sqrt(md);
    }

    void main() {
      // Rotate UV coordinates by angle
      float cosA = cos(uPatternAngle);
      float sinA = sin(uPatternAngle);
      mat2 rot = mat2(cosA, -sinA, sinA, cosA);
      vec2 uvRot = rot * (vUv * uPatternScale);

      float patternVal = 1.0;

      if (uPatternType == 0) {
        // Halftone dots
        vec2 grid = fract(uvRot) - 0.5;
        float dist = length(grid);
        float radius = 0.35 * uPatternIntensity;
        patternVal = smoothstep(radius, radius - 0.05 * uPatternContrast, dist);
      } else if (uPatternType == 1) {
        // Hatch lines
        float line = sin(uvRot.y * 6.28318);
        patternVal = smoothstep(0.0, 0.1 * uPatternContrast, line * uPatternIntensity);
      } else if (uPatternType == 2) {
        // Cross-hatch
        float line1 = sin(uvRot.y * 6.28318);
        vec2 uvRot2 = mat2(cosA, sinA, -sinA, cosA) * (vUv * uPatternScale);
        float line2 = sin(uvRot2.y * 6.28318);
        patternVal = min(
          smoothstep(0.0, 0.1 * uPatternContrast, line1 * uPatternIntensity),
          smoothstep(0.0, 0.1 * uPatternContrast, line2 * uPatternIntensity)
        );
      } else if (uPatternType == 3) {
        // Stipple dots
        vec2 cell = floor(uvRot);
        vec2 h = hash2(cell);
        vec2 d = fract(uvRot) - h;
        float dist = length(d);
        patternVal = smoothstep(0.15 * uPatternIntensity, 0.05, dist);
      } else if (uPatternType == 4) {
        // Terrazzo Voronoi
        float v = voronoi(uvRot * 0.5);
        patternVal = smoothstep(0.05, 0.15, v);
      }

      vec3 finalColor = mix(vColor.rgb * 0.2, vColor.rgb, patternVal);
      float alpha = vColor.a * uOpacity;

      if (alpha < 0.001) discard;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `};function Y_(n="halftone",e=25,t=1){const r={halftone:0,hatch:1,crosshatch:2,stipple:3,terrazzo:4};return new gt({uniforms:{uPatternType:{value:r[n]??0},uPatternScale:{value:e},uPatternAngle:{value:.785398},uPatternContrast:{value:1.5},uPatternIntensity:{value:1},uOpacity:{value:t}},vertexShader:Mc.vertexShader,fragmentShader:Mc.fragmentShader,transparent:!0,depthWrite:!0,depthTest:!0,side:Kt})}class lo{static createMaterial(e){const t=e.opacity??1;switch(e.type){case"shaded":return xc(!1,t);case"cel_shaded":return xc(!0,t);case"glow":return $_(e.glowIntensity??2.5,t);case"cutout":return q_(e.bgColor??new ue(13482137));case"halftone":case"hatch":case"crosshatch":case"stipple":case"terrazzo":return Y_(e.type,e.patternScale??25,t);case"shadeless":default:return j_(t)}}}class li{id;name;points;profile;size;color;alpha;materialType;taperStart;taperEnd;visible=!0;locked=!1;mesh;constructor(e,t="ribbon",r=.02,i=new ue(1710638),s=1,a="shadeless",o,l){this.id=o??`curve_${Date.now()}_${Math.random().toString(36).substr(2,6)}`,this.name=l??`Stroke ${this.id.substr(-4)}`,this.points=e,this.profile=t,this.size=r,this.color=i.clone(),this.alpha=s,this.materialType=a,this.taperStart=!0,this.taperEnd=!0;const c=this.generateGeometry(),u=lo.createMaterial({type:this.materialType,opacity:this.alpha});this.mesh=new nt(c,u),this.mesh.userData={curveId:this.id}}generateGeometry(){return oo.buildGeometry(this.points,{profile:this.profile,size:this.size,color:this.color,alpha:this.alpha,taperStart:this.taperStart,taperEnd:this.taperEnd})}updateGeometry(){this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.geometry=this.generateGeometry()}setMaterialType(e){this.materialType=e,this.mesh.material&&this.mesh.material.dispose(),this.mesh.material=lo.createMaterial({type:this.materialType,opacity:this.alpha})}setColor(e){this.color.copy(e),this.updateGeometry()}setSize(e){this.size=e,this.updateGeometry()}toJSON(){return{id:this.id,name:this.name,points:this.points.map(e=>({x:e.position.x,y:e.position.y,z:e.position.z,pressure:e.pressure,tiltX:e.tilt.x,tiltY:e.tilt.y,time:e.time})),profile:this.profile,size:this.size,color:`#${this.color.getHexString()}`,alpha:this.alpha,materialType:this.materialType,taperStart:this.taperStart,taperEnd:this.taperEnd,visible:this.visible,locked:this.locked}}static fromJSON(e){const t=e.points.map(s=>({position:new P(s.x,s.y,s.z),pressure:s.pressure,tilt:new be(s.tiltX,s.tiltY),time:s.time})),r=new ue(e.color),i=new li(t,e.profile,e.size,r,e.alpha,e.materialType,e.id,e.name);return i.taperStart=e.taperStart??!0,i.taperEnd=e.taperEnd??!0,i.visible=e.visible??!0,i.locked=e.locked??!1,i.mesh.visible=i.visible,i}dispose(){this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh.material&&this.mesh.material.dispose()}}class K_{stageManager;newCurves;layerIndex;constructor(e,t,r){this.stageManager=e,this.newCurves=t,this.layerIndex=r}execute(){const e=this.stageManager.layers[this.layerIndex]||this.stageManager.activeLayer;this.newCurves.forEach(t=>e.addCurve(t))}undo(){this.newCurves.forEach(e=>this.stageManager.removeCurve(e.id))}}class Z_{selectedCurves=[];selectionBoxHelper;selectionGroup;stageManager;historyManager;constructor(e,t){this.stageManager=e,this.historyManager=t,this.selectionGroup=new Xt,this.selectionGroup.name="SelectionVisuals";const r=new Ft;this.selectionBoxHelper=new Td(r,1987232),this.selectionBoxHelper.visible=!1,this.selectionGroup.add(this.selectionBoxHelper)}select(e,t=!1){t?this.selectedCurves.includes(e)||this.selectedCurves.push(e):this.selectedCurves=[e],this.updateVisuals()}deselect(e){const t=this.selectedCurves.indexOf(e);t!==-1&&this.selectedCurves.splice(t,1),this.updateVisuals()}clearSelection(){this.selectedCurves=[],this.updateVisuals()}selectAll(){this.selectedCurves=[...this.stageManager.activeLayer.curves],this.updateVisuals()}invertSelection(){const e=this.stageManager.activeLayer.curves;this.selectedCurves=e.filter(t=>!this.selectedCurves.includes(t)),this.updateVisuals()}selectByLasso(e,t,r,i){const s=(o,l,c)=>{let u=!1;for(let h=0,d=c.length-1;h<c.length;d=h++){const p=c[h].x,g=c[h].y,v=c[d].x,m=c[d].y;g>l!=m>l&&o<(v-p)*(l-g)/(m-g)+p&&(u=!u)}return u},a=[];this.stageManager.activeLayer.curves.forEach(o=>{if(o.locked||!o.visible||o.points.length===0)return;const l=new P;o.points.forEach(d=>l.add(d.position)),l.multiplyScalar(1/o.points.length);const c=l.clone().project(t),u=(c.x+1)*.5*r,h=(-c.y+1)*.5*i;s(u,h,e)&&a.push(o)}),this.selectedCurves=a,this.updateVisuals()}duplicateSelected(e=new P(.05,.05,0)){if(this.selectedCurves.length===0)return[];const t=[];this.selectedCurves.forEach(i=>{const s=i.points.map(o=>({position:o.position.clone().add(e),pressure:o.pressure,tilt:o.tilt.clone(),time:o.time})),a=new li(s,i.profile,i.size,i.color,i.alpha,i.materialType);t.push(a)});const r=new K_(this.stageManager,t,this.stageManager.activeLayerIndex);return this.historyManager.execute(r),this.selectedCurves=t,this.updateVisuals(),t}updateVisuals(){if(this.selectedCurves.length===0){this.selectionBoxHelper.visible=!1;return}const e=new ft;if(this.selectedCurves.forEach(t=>{t.mesh&&(t.mesh.geometry.computeBoundingBox(),t.mesh.geometry.boundingBox&&e.union(t.mesh.geometry.boundingBox))}),e.isEmpty())this.selectionBoxHelper.visible=!1;else{const t=new P,r=new P;e.getCenter(t),e.getSize(r);const i=new nt(new An(r.x,r.y,r.z));i.position.copy(t),i.updateMatrixWorld(),this.selectionBoxHelper.setFromObject(i),this.selectionBoxHelper.visible=!0}}}class J_{engine;constructor(e){this.engine=e,this.bindEvents()}bindEvents(){window.addEventListener("keydown",e=>{const t=e.target;if(t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"))return;const r=e.metaKey||e.ctrlKey;if(!r){if(e.key==="1"){this.engine.setTool("draw");return}if(e.key==="2"){this.engine.setTool("erase");return}if(e.key==="3"){this.engine.setTool("select");return}if(e.key==="4"){this.engine.setTool("loft");return}if(e.key==="5"){this.engine.setTool("liquify");return}if(e.key==="6"){this.engine.setTool("inject");return}if(e.key==="7"){this.engine.setTool("transform");return}if(e.key==="["){this.engine.brushEngine.setSize(this.engine.brushEngine.size*.85);return}if(e.key==="]"){this.engine.brushEngine.setSize(this.engine.brushEngine.size*1.15);return}if(e.key==="g"||e.key==="G"){this.engine.environment.toggleGroundGrid();return}if(e.key==="s"||e.key==="S"){const i=["none","x","y","z"],s=i.indexOf(this.engine.symmetryManager.axis),a=i[(s+1)%i.length];this.engine.symmetryManager.setAxis(a);return}if(e.code==="Space"){e.preventDefault(),this.engine.setTool(this.engine.activeTool==="navigate"?"draw":"navigate");return}if(e.key==="Delete"||e.key==="Backspace"){e.preventDefault(),this.engine.deleteSelectedCurves();return}if(e.key==="Escape"){this.engine.selectionTool.clearSelection();return}}if(r){if((e.key==="z"||e.key==="Z")&&!e.shiftKey){e.preventDefault(),this.engine.historyManager.undo();return}if(e.key==="y"||e.key==="Y"||(e.key==="z"||e.key==="Z")&&e.shiftKey){e.preventDefault(),this.engine.historyManager.redo();return}if(e.key==="d"||e.key==="D"){e.preventDefault(),this.engine.selectionTool.duplicateSelected();return}if(e.key==="a"||e.key==="A"){e.preventDefault(),this.engine.selectionTool.selectAll();return}if(e.key==="c"||e.key==="C"){e.preventDefault(),this.engine.copySelectedCurves();return}if(e.key==="v"||e.key==="V"){e.preventDefault(),this.engine.pasteCurves();return}}})}}class bn{static smoothEMA(e,t,r){return e.clone().lerp(t,Dt.clamp(r,.01,1))}static catmullRomPoint(e,t,r,i,s,a=.5){const o=(f,b,x)=>{const _=x.distanceTo(b);return f+Math.pow(Math.max(_,1e-5),a)},l=o(0,e,t),c=o(l,t,r),u=o(c,r,i),h=l+s*(c-l),d=e.clone().multiplyScalar((l-h)/(l-0)).add(t.clone().multiplyScalar((h-0)/(l-0))),p=t.clone().multiplyScalar((c-h)/(c-l)).add(r.clone().multiplyScalar((h-l)/(c-l))),g=r.clone().multiplyScalar((u-h)/(u-c)).add(i.clone().multiplyScalar((h-c)/(u-c))),v=d.multiplyScalar((c-h)/(c-0)).add(p.clone().multiplyScalar((h-0)/(c-0))),m=p.multiplyScalar((u-h)/(u-l)).add(g.multiplyScalar((h-l)/(u-l)));return v.multiplyScalar((c-h)/(c-l)).add(m.multiplyScalar((h-l)/(c-l)))}static resampleCurve(e,t=4){if(e.length<2)return[...e];if(e.length===2){const a=e[0],o=e[1],l=[];for(let c=0;c<=t;c++){const u=c/t;l.push({position:a.position.clone().lerp(o.position,u),pressure:Dt.lerp(a.pressure,o.pressure,u),tilt:a.tilt.clone().lerp(o.tilt,u),time:Dt.lerp(a.time,o.time,u)})}return l}const r=[],i=e.length;for(let a=0;a<i-1;a++){const o=a>0?e[a-1]:e[a],l=e[a],c=e[a+1],u=a+2<i?e[a+2]:c,h=Math.max(1,t);for(let d=0;d<h;d++){const p=d/h,g=this.catmullRomPoint(o.position,l.position,c.position,u.position,p,.5),v=Dt.lerp(l.pressure,c.pressure,p),m=l.tilt.clone().lerp(c.tilt,p),f=Dt.lerp(l.time,c.time,p);r.push({position:g,pressure:v,tilt:m,time:f})}}const s=e[e.length-1];return r.push({position:s.position.clone(),pressure:s.pressure,tilt:s.tilt.clone(),time:s.time}),r}static simplifyDouglasPeucker(e,t=.005){if(e.length<=2)return e;let r=0,i=0;const s=e[0].position,a=e[e.length-1].position,o=new gr(s,a);for(let l=1;l<e.length-1;l++){const c=e[l].position,u=new P;o.closestPointToPoint(c,!0,u);const h=c.distanceTo(u);h>r&&(r=h,i=l)}if(r>t){const l=this.simplifyDouglasPeucker(e.slice(0,i+1),t),c=this.simplifyDouglasPeucker(e.slice(i),t);return l.slice(0,l.length-1).concat(c)}else return[e[0],e[e.length-1]]}static computeArcLengths(e){const t=[0];let r=0;for(let i=1;i<e.length;i++)r+=e[i].distanceTo(e[i-1]),t.push(r);return t}}class Q_{static recognizeAndRegularize(e,t=.15){if(e.length<3)return{type:"none",points:e,confidence:0};const r=e[0].position,i=e[e.length-1].position,s=bn.computeArcLengths(e.map(u=>u.position)),a=s[s.length-1];if(a<.01)return{type:"none",points:e,confidence:0};const o=r.distanceTo(i)<a*.25,l=e.reduce((u,h)=>u+h.pressure,0)/e.length,c=e[0].tilt.clone();if(!o){const u=new gr(r,i);let h=0;for(let d=1;d<e.length-1;d++){const p=new P;u.closestPointToPoint(e[d].position,!0,p);const g=e[d].position.distanceTo(p);g>h&&(h=g)}if(h/a<t){const d=[];for(let p=0;p<=16;p++){const g=p/16;d.push({position:r.clone().lerp(i,g),pressure:l,tilt:c.clone(),time:performance.now()})}return{type:"line",points:d,confidence:1-h/a}}}if(o){const u=new P;e.forEach(m=>u.add(m.position)),u.multiplyScalar(1/e.length);const h=e.map(m=>m.position.distanceTo(u)),d=h.reduce((m,f)=>m+f,0)/h.length,p=h.reduce((m,f)=>m+Math.pow(f-d,2),0)/h.length,g=Math.sqrt(p);if(g/d<t*1.2){const m=new P;for(let S=0;S<e.length;S++){const w=e[S].position,T=e[(S+1)%e.length].position;m.x+=(w.y-T.y)*(w.z+T.z),m.y+=(w.z-T.z)*(w.x+T.x),m.z+=(w.x-T.x)*(w.y+T.y)}m.normalize();const f=new P().subVectors(r,u).projectOnPlane(m).normalize(),b=new P().crossVectors(m,f).normalize(),x=48,_=[];for(let S=0;S<=x;S++){const w=S/x*Math.PI*2,T=u.clone().addScaledVector(f,Math.cos(w)*d).addScaledVector(b,Math.sin(w)*d);_.push({position:T,pressure:l,tilt:c.clone(),time:performance.now()})}return{type:"circle",points:_,confidence:1-g/d}}const v=bn.simplifyDouglasPeucker(e,a*.08);if(v.length>=4&&v.length<=6){const m=[],f=v.map(b=>b.position);f[f.length-1]=f[0].clone();for(let b=0;b<f.length-1;b++){const x=f[b],_=f[b+1],S=8;for(let w=0;w<S;w++){const T=w/S;m.push({position:x.clone().lerp(_,T),pressure:l,tilt:c.clone(),time:performance.now()})}}return m.push({position:f[0].clone(),pressure:l,tilt:c.clone(),time:performance.now()}),{type:v.length===5?"rectangle":"polygon",points:m,confidence:.85}}}return{type:"none",points:e,confidence:0}}}class Sc{static async copyCurves(e){if(e.length===0)return!1;const t={format:"feather-clipboard",version:"1.0.0",curves:e.map(r=>r.toJSON())};try{const r=JSON.stringify(t,null,2);return await navigator.clipboard.writeText(r),!0}catch(r){return console.warn("Clipboard write failed:",r),!1}}static async pasteCurves(){try{const e=await navigator.clipboard.readText(),t=JSON.parse(e);return t&&t.format==="feather-clipboard"&&Array.isArray(t.curves)?t.curves:null}catch(e){return console.warn("Clipboard read failed:",e),null}}}class ex{static loftBetweenTwoCurves(e,t,r=32,i=8){if(e.length<2||t.length<2)return new Ye;const s=(d,p)=>{const g=p*(d.length-1),v=Math.floor(g),m=Math.min(d.length-1,v+1),f=g-v;return d[v].position.clone().lerp(d[m].position,f)},a=Math.max(2,r),o=Math.max(2,i),l=[],c=[],u=[];for(let d=0;d<o;d++){const p=d/(o-1);for(let g=0;g<a;g++){const v=g/(a-1),m=s(e,v),f=s(t,v),b=m.lerp(f,p);l.push(b.x,b.y,b.z),c.push(v,p)}}for(let d=0;d<o-1;d++)for(let p=0;p<a-1;p++){const g=d*a,v=(d+1)*a,m=g+p,f=g+p+1,b=v+p,x=v+p+1;u.push(m,b,f),u.push(f,b,x)}const h=new Ye;return h.setAttribute("position",new qe(l,3)),h.setAttribute("uv",new qe(c,2)),h.setIndex(u),h.computeVertexNormals(),h}static loftMultiCurves(e,t=32){if(e.length<2)return new Ye;if(e.length===2)return this.loftBetweenTwoCurves(e[0],e[1],t,8);const r=e.length,i=Math.max(2,t),s=(u,h)=>{const d=h*(u.length-1),p=Math.floor(d),g=Math.min(u.length-1,p+1),v=d-p;return u[p].position.clone().lerp(u[g].position,v)},a=[],o=[],l=[];for(let u=0;u<r;u++){const h=u/(r-1),d=e[u];for(let p=0;p<i;p++){const g=p/(i-1),v=s(d,g);a.push(v.x,v.y,v.z),o.push(g,h)}}for(let u=0;u<r-1;u++)for(let h=0;h<i-1;h++){const d=u*i,p=(u+1)*i,g=d+h,v=d+h+1,m=p+h,f=p+h+1;l.push(g,m,v),l.push(v,m,f)}const c=new Ye;return c.setAttribute("position",new qe(a,3)),c.setAttribute("uv",new qe(o,2)),c.setIndex(l),c.computeVertexNormals(),c}}class tx{stageManager;curve;mirrorCurve;layerIndex;constructor(e,t,r,i){this.stageManager=e,this.curve=t,this.mirrorCurve=r,this.layerIndex=i}execute(){const e=this.stageManager.layers[this.layerIndex]||this.stageManager.activeLayer;e.addCurve(this.curve),this.mirrorCurve&&e.addCurve(this.mirrorCurve)}undo(){this.stageManager.removeCurve(this.curve.id),this.mirrorCurve&&this.stageManager.removeCurve(this.mirrorCurve.id)}}class rx{stageManager;mesh;layerIndex;constructor(e,t,r){this.stageManager=e,this.mesh=t,this.layerIndex=r}execute(){(this.stageManager.layers[this.layerIndex]||this.stageManager.activeLayer).addLoftedMesh(this.mesh)}undo(){(this.stageManager.layers[this.layerIndex]||this.stageManager.activeLayer).group.remove(this.mesh)}}class ix{scene;viewport;stageManager;environment;resourceManager;guideManager;brushEngine;historyManager;symmetryManager;postProcessing;joystickController;eraserTool;injectorTool;liquifyTool;selectionTool;keyboardShortcuts;inputManager;touchGestures;activeTool="draw";isDrawing=!1;shapeAssistEnabled=!1;currentRawPoints=[];liveStrokeMesh=null;liveMirrorMesh=null;loftSelectedCurves=[];lastDragPoint3D=null;lastPointerScreenPos={x:0,y:0};lassoScreenPts=[];onToolChange;onCurveCreated;constructor(e){this.scene=new Xa,this.viewport=new f_(e),this.stageManager=new m_,this.environment=new g_,this.resourceManager=new v_,this.guideManager=new y_,this.brushEngine=new b_,this.historyManager=new M_,this.symmetryManager=new S_,this.joystickController=new B_,this.selectionTool=new Z_(this.stageManager,this.historyManager),this.postProcessing=new O_(this.viewport.renderer,this.scene,this.viewport.camera),this.eraserTool=new k_(this.stageManager,this.historyManager),this.injectorTool=new H_(this.stageManager,this.brushEngine),this.liquifyTool=new V_(this.stageManager,this.historyManager),this.keyboardShortcuts=new J_(this),this.scene.background=new ue(this.environment.config.bgColor),this.scene.add(this.environment.environmentGroup),this.scene.add(this.stageManager.rootGroup),this.scene.add(this.guideManager.guideGroup),this.scene.add(this.resourceManager.referenceGroup),this.scene.add(this.symmetryManager.symmetryGroup),this.scene.add(this.joystickController.gizmo.group),this.scene.add(this.selectionTool.selectionGroup),this.inputManager=new T_(e,{onPointerDrawStart:this.handlePointerStart.bind(this),onPointerDrawMove:this.handlePointerMove.bind(this),onPointerDrawEnd:this.handlePointerEnd.bind(this)}),this.touchGestures=new w_(e,{onOneFingerOrbit:(t,r)=>{(this.activeTool==="navigate"||!this.isDrawing)&&this.viewport.orbit(t,r)},onTwoFingerPan:(t,r)=>this.viewport.pan(t,r),onTwoFingerZoom:t=>this.viewport.zoom(t),onTwoFingerRotate:t=>{},onThreeFingerTap:()=>this.historyManager.undo(),onThreeFingerSwipe:t=>{t==="right"?this.historyManager.redo():this.historyManager.undo()},onGestureCancelDrawing:()=>{this.cancelDrawing()}}),this.startRenderLoop()}setTool(e){this.activeTool=e,this.loftSelectedCurves=[],this.cancelDrawing(),this.joystickController.setEnabled(e==="transform"),e==="transform"&&this.selectionTool.selectedCurves.length>0&&this.joystickController.setTarget(this.selectionTool.selectedCurves[0].mesh),this.onToolChange&&this.onToolChange(e)}cancelDrawing(){this.isDrawing=!1,this.removeLiveStrokeMeshes(),this.currentRawPoints=[],this.inputManager.cancelCurrentPointer()}deleteSelectedCurves(){this.selectionTool.selectedCurves.length!==0&&(this.selectionTool.selectedCurves.forEach(e=>{this.stageManager.removeCurve(e.id)}),this.selectionTool.clearSelection())}async copySelectedCurves(){return Sc.copyCurves(this.selectionTool.selectedCurves)}async pasteCurves(){const e=await Sc.pasteCurves();if(e&&e.length>0){const t=e.map(r=>li.fromJSON(r));t.forEach(r=>{r.points.forEach(i=>i.position.add(new P(.05,.05,0))),r.updateGeometry(),this.stageManager.activeLayer.addCurve(r)}),this.selectionTool.selectedCurves=t,this.selectionTool.updateVisuals()}}handlePointerStart(e,t,r){if(this.lastPointerScreenPos={x:r.clientX,y:r.clientY},this.activeTool!=="navigate"){if(this.activeTool==="select"){this.lassoScreenPts=[{x:r.clientX,y:r.clientY}];return}if(this.activeTool==="erase"){this.eraserTool.eraseAt(t,this.viewport.camera);return}if(this.activeTool==="inject"){this.injectorTool.sampleStrokeAt(t,this.viewport.camera);return}if(this.activeTool==="loft"){this.handleLoftSelection(t);return}if(this.activeTool==="liquify"){const i=this.guideManager.snap(t,this.viewport.camera);i&&(this.lastDragPoint3D=i.point.clone(),this.liquifyTool.startDeform());return}if(this.activeTool==="draw"){const i=this.guideManager.snap(t,this.viewport.camera);if(!i)return;this.isDrawing=!0;const s={position:i.point.clone(),pressure:e.pressure,tilt:e.tilt.clone(),time:e.time};this.currentRawPoints=[s],this.createLiveStrokeMeshes()}}}handlePointerMove(e,t,r){if(this.activeTool==="navigate"){const i=r.clientX-this.lastPointerScreenPos.x,s=r.clientY-this.lastPointerScreenPos.y;this.viewport.orbit(i,s),this.lastPointerScreenPos={x:r.clientX,y:r.clientY};return}if(this.activeTool==="select"){this.lassoScreenPts.push({x:r.clientX,y:r.clientY});return}if(this.activeTool==="erase"&&r.buttons>0){this.eraserTool.eraseAt(t,this.viewport.camera);return}if(this.activeTool==="liquify"&&this.lastDragPoint3D){const i=this.guideManager.snap(t,this.viewport.camera);if(i){const s=i.point.clone(),a=s.clone().sub(this.lastDragPoint3D);this.liquifyTool.applyDeform(s,a),this.lastDragPoint3D.copy(s)}return}if(this.activeTool==="draw"&&this.isDrawing){const i=this.guideManager.snap(t,this.viewport.camera);if(!i)return;const s=this.currentRawPoints[this.currentRawPoints.length-1],a=bn.smoothEMA(s.position,i.point,this.brushEngine.smoothingAlpha);if(a.distanceTo(s.position)>.002){const o={position:a,pressure:e.pressure,tilt:e.tilt.clone(),time:e.time};this.currentRawPoints.push(o),this.updateLiveStrokeMeshes()}}}handlePointerEnd(e){if(this.activeTool==="select"){this.lassoScreenPts.length>5&&this.selectionTool.selectByLasso(this.lassoScreenPts,this.viewport.camera,window.innerWidth,window.innerHeight),this.lassoScreenPts=[];return}if(this.activeTool==="liquify"){this.liquifyTool.endDeform(),this.lastDragPoint3D=null;return}if(this.activeTool==="draw"&&this.isDrawing){if(this.isDrawing=!1,this.currentRawPoints.length>=2){let t=bn.resampleCurve(this.currentRawPoints,4);if(this.shapeAssistEnabled){const a=Q_.recognizeAndRegularize(t);a.type!=="none"&&a.points.length>1&&(t=a.points)}const r=new li(t,this.brushEngine.profile,this.brushEngine.size,this.brushEngine.color,this.brushEngine.opacity,this.brushEngine.materialType);let i=null;if(this.symmetryManager.axis!=="none"){const a=this.symmetryManager.mirrorPoints(t);a.length>1&&(i=new li(a,this.brushEngine.profile,this.brushEngine.size,this.brushEngine.color,this.brushEngine.opacity,this.brushEngine.materialType))}const s=new tx(this.stageManager,r,i,this.stageManager.activeLayerIndex);this.historyManager.execute(s),this.onCurveCreated&&this.onCurveCreated(r)}this.removeLiveStrokeMeshes(),this.currentRawPoints=[]}}createLiveStrokeMeshes(){const e=new Ye,t=lo.createMaterial({type:this.brushEngine.materialType,opacity:this.brushEngine.opacity});this.liveStrokeMesh=new nt(e,t),this.scene.add(this.liveStrokeMesh),this.symmetryManager.axis!=="none"&&(this.liveMirrorMesh=new nt(e.clone(),t.clone()),this.scene.add(this.liveMirrorMesh))}updateLiveStrokeMeshes(){if(!this.liveStrokeMesh||this.currentRawPoints.length<2)return;const e=bn.resampleCurve(this.currentRawPoints,2),t=oo.buildGeometry(e,{profile:this.brushEngine.profile,size:this.brushEngine.size,color:this.brushEngine.color,alpha:this.brushEngine.opacity,taperStart:this.brushEngine.taperStart,taperEnd:!1});if(this.liveStrokeMesh.geometry.dispose(),this.liveStrokeMesh.geometry=t,this.liveMirrorMesh&&this.symmetryManager.axis!=="none"){const r=this.symmetryManager.mirrorPoints(e);if(r.length>1){const i=oo.buildGeometry(r,{profile:this.brushEngine.profile,size:this.brushEngine.size,color:this.brushEngine.color,alpha:this.brushEngine.opacity,taperStart:this.brushEngine.taperStart,taperEnd:!1});this.liveMirrorMesh.geometry.dispose(),this.liveMirrorMesh.geometry=i}}}removeLiveStrokeMeshes(){this.liveStrokeMesh&&(this.scene.remove(this.liveStrokeMesh),this.liveStrokeMesh.geometry.dispose(),this.liveStrokeMesh.material.dispose(),this.liveStrokeMesh=null),this.liveMirrorMesh&&(this.scene.remove(this.liveMirrorMesh),this.liveMirrorMesh.geometry.dispose(),this.liveMirrorMesh.material.dispose(),this.liveMirrorMesh=null)}handleLoftSelection(e){const t=new ci;t.setFromCamera(e,this.viewport.camera);const r=this.stageManager.getAllCurves().map(s=>s.mesh),i=t.intersectObjects(r,!1);if(i.length>0){const s=i[0].object.userData.curveId,a=this.stageManager.findCurveById(s);if(a&&(this.loftSelectedCurves.includes(a)||this.loftSelectedCurves.push(a),this.loftSelectedCurves.length===2)){const o=ex.loftBetweenTwoCurves(this.loftSelectedCurves[0].points,this.loftSelectedCurves[1].points,32,12),l=new rd({color:this.brushEngine.color,roughness:.4,metalness:.1,side:Kt}),c=new nt(o,l),u=new rx(this.stageManager,c,this.stageManager.activeLayerIndex);this.historyManager.execute(u),this.loftSelectedCurves=[]}}}startRenderLoop(){const e=()=>{requestAnimationFrame(e),this.viewport.update(),this.postProcessing.render()};e()}}class nx{element;engine;undoBtn;redoBtn;handBtn;isLeftHanded=!1;onStageToggle;onExportClick;onProjectsClick;constructor(e){this.engine=e,this.element=document.createElement("header"),this.element.id="topbar",this.render(),this.bindEvents()}render(){this.element.innerHTML=`
      <div class="topbar-group">
        <button id="btn-projects" class="btn btn-sm">PROJECTS</button>
        <div class="app-title">FEATHER 3D</div>
        <button id="btn-undo" class="btn btn-sm">UNDO (0)</button>
        <button id="btn-redo" class="btn btn-sm">REDO (0)</button>
      </div>

      <div class="topbar-group">
        <button id="btn-pwa-install" class="btn btn-sm">INSTALL</button>
        <select id="cam-preset-select" class="btn btn-sm" style="appearance: none; -webkit-appearance: none; cursor: pointer;">
          <option value="iso">CAM: ISO</option>
          <option value="front">CAM: FRONT</option>
          <option value="top">CAM: TOP</option>
          <option value="left">CAM: LEFT</option>
          <option value="right">CAM: RIGHT</option>
          <option value="back">CAM: BACK</option>
        </select>
        <button id="btn-hand" class="btn btn-sm">HAND: R</button>
        <button id="btn-stage-toggle" class="btn btn-sm">STAGE</button>
        <button id="btn-export-open" class="btn btn-sm">EXPORT</button>
      </div>
    `,this.undoBtn=this.element.querySelector("#btn-undo"),this.redoBtn=this.element.querySelector("#btn-redo"),this.handBtn=this.element.querySelector("#btn-hand")}bindEvents(){this.undoBtn.addEventListener("click",()=>this.engine.historyManager.undo()),this.redoBtn.addEventListener("click",()=>this.engine.historyManager.redo()),this.engine.historyManager.onStateChange=(e,t)=>{this.undoBtn.textContent=`UNDO (${this.engine.historyManager.undoCount})`,this.redoBtn.textContent=`REDO (${this.engine.historyManager.redoCount})`},this.element.querySelector("#cam-preset-select").addEventListener("change",e=>{const t=e.target.value;this.engine.viewport.setViewPreset(t)}),this.handBtn.addEventListener("click",()=>{this.isLeftHanded=!this.isLeftHanded,document.body.classList.toggle("left-handed",this.isLeftHanded),this.handBtn.textContent=this.isLeftHanded?"HAND: L":"HAND: R"}),this.element.querySelector("#btn-pwa-install")?.addEventListener("click",()=>{window.triggerPwaInstall&&window.triggerPwaInstall()}),this.element.querySelector("#btn-projects")?.addEventListener("click",()=>{this.onProjectsClick&&this.onProjectsClick()}),this.element.querySelector("#btn-stage-toggle").addEventListener("click",()=>{this.onStageToggle&&this.onStageToggle()}),this.element.querySelector("#btn-export-open").addEventListener("click",()=>{this.onExportClick&&this.onExportClick()})}}class sx{element;engine;symBtn;guideBtn;profileBtn;shapeBtn;onAnimationToggle;currentSymIndex=0;symOptions=["none","x","y","z"];currentGuideIndex=0;guideOptions=[{mode:"plane",label:"GUIDE: PLANE"},{mode:"primitive",label:"GUIDE: SPHERE",prim:"sphere"},{mode:"primitive",label:"GUIDE: CUBE",prim:"cube"},{mode:"primitive",label:"GUIDE: CYLINDER",prim:"cylinder"},{mode:"none",label:"GUIDE: OFF"}];constructor(e){this.engine=e,this.element=document.createElement("div"),this.element.id="tool-dock",this.render(),this.bindEvents()}render(){this.element.innerHTML=`
      <button data-tool="draw" class="btn active">DRAW</button>
      <button data-tool="erase" class="btn">ERASE</button>
      <button data-tool="select" class="btn">SELECT</button>
      <button data-tool="loft" class="btn">LOFT</button>
      <button data-tool="liquify" class="btn">LIQUIFY</button>
      <button data-tool="inject" class="btn">INJECT</button>
      <button data-tool="transform" class="btn">MOVE</button>
      <button data-tool="navigate" class="btn">CAM</button>
      <div style="height: 1px; background: var(--bdr); margin: 4px 0;"></div>
      <button id="btn-shape" class="btn btn-sm">SHAPE: OFF</button>
      <button id="btn-profile" class="btn btn-sm">PROFILE: RIBBON</button>
      <button id="btn-sym" class="btn btn-sm">SYM: OFF</button>
      <button id="btn-guide" class="btn btn-sm">GUIDE: PLANE</button>
      <button id="btn-anim-toggle" class="btn btn-sm">TIMELINE</button>
    `,this.profileBtn=this.element.querySelector("#btn-profile"),this.symBtn=this.element.querySelector("#btn-sym"),this.guideBtn=this.element.querySelector("#btn-guide"),this.shapeBtn=this.element.querySelector("#btn-shape")}bindEvents(){const e=this.element.querySelectorAll("[data-tool]");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(i=>i.classList.remove("active")),t.classList.add("active");const r=t.getAttribute("data-tool");this.engine.setTool(r)})}),this.engine.onToolChange=t=>{e.forEach(r=>{r.classList.toggle("active",r.getAttribute("data-tool")===t)})},this.shapeBtn.addEventListener("click",()=>{this.engine.shapeAssistEnabled=!this.engine.shapeAssistEnabled,this.shapeBtn.textContent=this.engine.shapeAssistEnabled?"SHAPE: ON":"SHAPE: OFF",this.shapeBtn.classList.toggle("active",this.engine.shapeAssistEnabled)}),this.profileBtn.addEventListener("click",()=>{const t=this.engine.brushEngine.profile==="ribbon",r=t?"tube":"ribbon";this.engine.brushEngine.setProfile(r),this.profileBtn.textContent=t?"PROFILE: TUBE":"PROFILE: RIBBON"}),this.symBtn.addEventListener("click",()=>{this.currentSymIndex=(this.currentSymIndex+1)%this.symOptions.length;const t=this.symOptions[this.currentSymIndex];this.engine.symmetryManager.setAxis(t),this.symBtn.textContent=t==="none"?"SYM: OFF":`SYM: ${t.toUpperCase()}`}),this.guideBtn.addEventListener("click",()=>{this.currentGuideIndex=(this.currentGuideIndex+1)%this.guideOptions.length;const t=this.guideOptions[this.currentGuideIndex];this.engine.guideManager.setMode(t.mode),t.prim&&this.engine.guideManager.setPrimitiveType(t.prim),this.guideBtn.textContent=t.label}),this.element.querySelector("#btn-anim-toggle")?.addEventListener("click",()=>{this.onAnimationToggle&&this.onAnimationToggle()})}}class ax{element;engine;defaultColors=["#1a1a2e","#b03020","#1a9940","#1e52a0","#d4a373","#fefae0","#606c38","#ffffff"];colorHistory=["#1a1a2e","#b03020","#1a9940","#1e52a0"];currentH=240;currentS=20;currentB=18;constructor(e){this.engine=e,this.element=document.createElement("div"),this.element.style.display="flex",this.element.style.flexDirection="column",this.element.style.gap="6px",this.render()}addColorToHistory(e){const t=e.toLowerCase(),r=this.colorHistory.indexOf(t);r!==-1&&this.colorHistory.splice(r,1),this.colorHistory.unshift(t),this.colorHistory.length>8&&this.colorHistory.pop(),this.renderHistory()}updateFromHSB(){const e=new ue;e.setHSL(this.currentH/360,this.currentS/100,this.currentB/100);const t=`#${e.getHexString()}`;this.engine.brushEngine.setColor(t)}render(){this.element.innerHTML=`
      <div style="display: flex; gap: 8px; align-items: center;">
        <div class="color-swatch-list" id="swatch-list"></div>
        <input id="color-hex-input" type="color" value="#1a1a2e" style="width: 26px; height: 26px; border: none; background: transparent; cursor: pointer;">
        <button id="btn-toggle-hsb" class="btn btn-sm">HSB</button>
      </div>

      <div id="hsb-drawer" style="display: none; flex-direction: column; gap: 4px; padding: 6px 0; border-top: 1px solid var(--bdr);">
        <div class="prop-group" style="justify-content: space-between;">
          <span class="prop-label" style="font-size: 9px;">HUE</span>
          <input id="slider-hue" type="range" min="0" max="360" value="${this.currentH}" style="width: 80px;">
        </div>
        <div class="prop-group" style="justify-content: space-between;">
          <span class="prop-label" style="font-size: 9px;">SAT</span>
          <input id="slider-sat" type="range" min="0" max="100" value="${this.currentS}" style="width: 80px;">
        </div>
        <div class="prop-group" style="justify-content: space-between;">
          <span class="prop-label" style="font-size: 9px;">BRI</span>
          <input id="slider-bri" type="range" min="0" max="100" value="${this.currentB}" style="width: 80px;">
        </div>
      </div>

      <div style="display: flex; gap: 4px; align-items: center;">
        <span style="font-size: 9px; font-weight: 700; color: var(--mut);">RECENT:</span>
        <div id="history-swatch-list" style="display: flex; gap: 4px;"></div>
      </div>
    `;const e=this.element.querySelector("#swatch-list");this.defaultColors.forEach((o,l)=>{const c=document.createElement("div");c.className=`color-swatch ${l===0?"selected":""}`,c.style.backgroundColor=o,c.addEventListener("click",()=>{this.element.querySelectorAll(".color-swatch").forEach(u=>u.classList.remove("selected")),c.classList.add("selected"),this.engine.brushEngine.setColor(o),this.addColorToHistory(o)}),e.appendChild(c)}),this.element.querySelector("#color-hex-input").addEventListener("input",o=>{const l=o.target.value;this.engine.brushEngine.setColor(l),this.addColorToHistory(l)});const t=this.element.querySelector("#btn-toggle-hsb"),r=this.element.querySelector("#hsb-drawer");t.addEventListener("click",()=>{const o=r.style.display==="flex";r.style.display=o?"none":"flex",t.classList.toggle("active",!o)});const i=this.element.querySelector("#slider-hue"),s=this.element.querySelector("#slider-sat"),a=this.element.querySelector("#slider-bri");i.addEventListener("input",o=>{this.currentH=parseInt(o.target.value,10),this.updateFromHSB()}),s.addEventListener("input",o=>{this.currentS=parseInt(o.target.value,10),this.updateFromHSB()}),a.addEventListener("input",o=>{this.currentB=parseInt(o.target.value,10),this.updateFromHSB()}),this.renderHistory()}renderHistory(){const e=this.element.querySelector("#history-swatch-list");e&&(e.innerHTML="",this.colorHistory.forEach(t=>{const r=document.createElement("div");r.style.width="14px",r.style.height="14px",r.style.borderRadius="2px",r.style.backgroundColor=t,r.style.border="1px solid var(--bdr)",r.style.cursor="pointer",r.addEventListener("click",()=>{this.engine.brushEngine.setColor(t)}),e.appendChild(r)}))}}class ox{element;engine;colorPalette;constructor(e){this.engine=e,this.element=document.createElement("footer"),this.element.id="bottom-bar",this.colorPalette=new ax(e),this.render(),this.bindEvents()}render(){this.element.innerHTML=`
      <div class="prop-group">
        <span class="prop-label">SIZE</span>
        <input id="slider-size" type="range" min="2" max="100" value="20">
      </div>

      <div class="prop-group">
        <span class="prop-label">OPACITY</span>
        <input id="slider-opacity" type="range" min="10" max="100" value="100">
      </div>

      <div class="prop-group">
        <span class="prop-label">MATERIAL</span>
        <select id="select-material" class="btn btn-sm" style="appearance: none; -webkit-appearance: none; cursor: pointer;">
          <option value="shadeless">SHADELESS</option>
          <option value="cel_shaded">CEL-SHADED</option>
          <option value="shaded">SMOOTH-SHADED</option>
          <option value="glow">GLOW BLOOM</option>
          <option value="cutout">CUTOUT HOLE</option>
          <option value="halftone">HALFTONE DOT</option>
          <option value="hatch">HATCH LINES</option>
          <option value="crosshatch">CROSS-HATCH</option>
          <option value="stipple">STIPPLE</option>
          <option value="terrazzo">TERRAZZO</option>
        </select>
      </div>

      <div class="prop-group" id="color-palette-slot"></div>
    `,this.element.querySelector("#color-palette-slot").appendChild(this.colorPalette.element)}bindEvents(){this.element.querySelector("#slider-size").addEventListener("input",e=>{const t=parseInt(e.target.value,10)/100*.1;this.engine.brushEngine.setSize(t)}),this.element.querySelector("#slider-opacity").addEventListener("input",e=>{const t=parseInt(e.target.value,10);this.engine.brushEngine.setOpacity(t/100)}),this.element.querySelector("#select-material").addEventListener("change",e=>{const t=e.target.value;this.engine.brushEngine.setMaterialType(t)})}}class lx{element;engine;activeTab="layers";isVisible=!1;constructor(e){this.engine=e,this.element=document.createElement("aside"),this.element.id="stage-panel",this.element.style.display="none",this.render()}toggle(){this.isVisible=!this.isVisible,this.element.style.display=this.isVisible?"flex":"none",this.isVisible&&this.refresh()}refresh(){this.render()}render(){this.element.innerHTML=`
      <div class="stage-tab-header">
        <button id="tab-layers" class="btn btn-sm ${this.activeTab==="layers"?"active":""}">LAYERS</button>
        <button id="tab-resources" class="btn btn-sm ${this.activeTab==="resources"?"active":""}">RESOURCES</button>
        <button id="tab-env" class="btn btn-sm ${this.activeTab==="env"?"active":""}">ENVIRONMENT</button>
      </div>
      <div id="stage-tab-content" style="flex: 1; overflow-y: auto;"></div>
    `;const e=this.element.querySelector("#stage-tab-content");this.activeTab==="layers"?this.renderLayersTab(e):this.activeTab==="resources"?this.renderResourcesTab(e):this.activeTab==="env"&&this.renderEnvTab(e),this.bindTabEvents()}renderLayersTab(e){const t=document.createElement("div");t.innerHTML=`
      <button id="btn-add-layer" class="btn btn-sm" style="width: 100%; margin-bottom: 8px;">+ NEW LAYER</button>
    `,this.engine.stageManager.layers.forEach((r,i)=>{const s=document.createElement("div");s.className=`layer-item ${i===this.engine.stageManager.activeLayerIndex?"active":""}`,s.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <span style="font-weight: 700; font-size: 11px;">${r.name}</span>
          <span style="font-size: 9px; color: var(--mut);">${r.curves.length} strokes</span>
        </div>
        <div style="display: flex; gap: 4px;">
          <button data-idx="${i}" class="btn-vis btn btn-sm">${r.visible?"SHOW":"HIDE"}</button>
          <button data-idx="${i}" class="btn-lock btn btn-sm">${r.locked?"LOCK":"UNLK"}</button>
          ${this.engine.stageManager.layers.length>1?`<button data-idx="${i}" class="btn-del btn btn-sm btn-danger">DEL</button>`:""}
        </div>
      `,s.addEventListener("click",o=>{o.target.tagName!=="BUTTON"&&(this.engine.stageManager.setActiveLayer(i),this.refresh())}),s.querySelector(".btn-vis").addEventListener("click",o=>{o.stopPropagation(),r.setVisible(!r.visible),this.refresh()}),s.querySelector(".btn-lock").addEventListener("click",o=>{o.stopPropagation(),r.locked=!r.locked,this.refresh()});const a=s.querySelector(".btn-del");a&&a.addEventListener("click",o=>{o.stopPropagation(),this.engine.stageManager.removeLayer(i),this.refresh()}),t.appendChild(s)}),t.querySelector("#btn-add-layer").addEventListener("click",()=>{this.engine.stageManager.addLayer(),this.refresh()}),e.appendChild(t)}renderResourcesTab(e){e.innerHTML=`
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label class="btn btn-sm" style="cursor: pointer; text-align: center;">
          + IMPORT REFERENCE IMAGE
          <input id="ref-file-input" type="file" accept="image/*" style="display: none;">
        </label>
        <div id="ref-image-list" style="margin-top: 8px;"></div>
      </div>
    `,e.querySelector("#ref-file-input").addEventListener("change",r=>{const i=r.target.files;if(i&&i.length>0){const s=i[0],a=URL.createObjectURL(s);this.engine.resourceManager.addReferenceImage(a,s.name),this.refresh()}});const t=e.querySelector("#ref-image-list");this.engine.resourceManager.referenceImages.forEach(r=>{const i=document.createElement("div");i.className="layer-item",i.innerHTML=`
        <span style="font-size: 10px; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">${r.name}</span>
        <button class="btn btn-sm btn-danger btn-del-ref">DEL</button>
      `,i.querySelector(".btn-del-ref")?.addEventListener("click",()=>{this.engine.resourceManager.removeReferenceImage(r.id),this.refresh()}),t.appendChild(i)})}renderEnvTab(e){e.innerHTML=`
      <div style="display: flex; flex-direction: column; gap: 10px; font-size: 11px;">
        <button id="btn-toggle-grid" class="btn btn-sm">GRID: ${this.engine.environment.config.showGroundGrid?"ON":"OFF"}</button>
        <button id="btn-toggle-axes" class="btn btn-sm">AXES: ${this.engine.environment.config.showAxes?"ON":"OFF"}</button>
        
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-weight: 700;">BACKGROUND THEME</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
            <button data-bg="#cdb899" class="btn btn-sm bg-opt">FEATHER BEIGE</button>
            <button data-bg="#2a2a2e" class="btn btn-sm bg-opt">DARK GREY</button>
            <button data-bg="#e8e8ec" class="btn btn-sm bg-opt">LIGHT GREY</button>
            <button data-bg="#ffffff" class="btn btn-sm bg-opt">PURE WHITE</button>
          </div>
        </div>
      </div>
    `,e.querySelector("#btn-toggle-grid")?.addEventListener("click",()=>{this.engine.environment.toggleGroundGrid(),this.refresh()}),e.querySelector("#btn-toggle-axes")?.addEventListener("click",()=>{this.engine.environment.toggleAxes(),this.refresh()}),e.querySelectorAll(".bg-opt").forEach(t=>{t.addEventListener("click",()=>{const r=t.getAttribute("data-bg");this.engine.environment.setBgColor(r,this.engine.scene)})})}bindTabEvents(){this.element.querySelector("#tab-layers")?.addEventListener("click",()=>{this.activeTab="layers",this.refresh()}),this.element.querySelector("#tab-resources")?.addEventListener("click",()=>{this.activeTab="resources",this.refresh()}),this.element.querySelector("#tab-env")?.addEventListener("click",()=>{this.activeTab="env",this.refresh()})}}class cx{element;engine;constructor(e){this.engine=e,this.element=document.createElement("div"),this.element.id="joystick-widget",this.element.style.display="none",this.render(),this.bindEvents()}setVisible(e){this.element.style.display=e?"flex":"none"}render(){this.element.innerHTML=`
      <div style="font-size: 9px; font-weight: 700; text-align: center; color: var(--mut);">JOYSTICK 2D/3D</div>
      <div class="joystick-pad">
        <button id="j-rot-ccw" class="btn btn-sm">CCW</button>
        <button id="j-up" class="btn btn-sm">UP</button>
        <button id="j-rot-cw" class="btn btn-sm">CW</button>
        <button id="j-left" class="btn btn-sm">LEFT</button>
        <button id="j-z-in" class="btn btn-sm">Z+</button>
        <button id="j-right" class="btn btn-sm">RIGHT</button>
        <button id="j-scale-down" class="btn btn-sm">-SZ</button>
        <button id="j-down" class="btn btn-sm">DOWN</button>
        <button id="j-scale-up" class="btn btn-sm">+SZ</button>
      </div>
    `}bindEvents(){const e=this.engine.viewport.camera;this.element.querySelector("#j-up")?.addEventListener("click",()=>{this.engine.joystickController.handle2DDrag(0,-10,e)}),this.element.querySelector("#j-down")?.addEventListener("click",()=>{this.engine.joystickController.handle2DDrag(0,10,e)}),this.element.querySelector("#j-left")?.addEventListener("click",()=>{this.engine.joystickController.handle2DDrag(-10,0,e)}),this.element.querySelector("#j-right")?.addEventListener("click",()=>{this.engine.joystickController.handle2DDrag(10,0,e)}),this.element.querySelector("#j-rot-cw")?.addEventListener("click",()=>{this.engine.joystickController.handle2DRotate(.15,e)}),this.element.querySelector("#j-rot-ccw")?.addEventListener("click",()=>{this.engine.joystickController.handle2DRotate(-.15,e)}),this.element.querySelector("#j-z-in")?.addEventListener("click",()=>{this.engine.joystickController.handle3DTranslate("z",.1)}),this.element.querySelector("#j-scale-up")?.addEventListener("click",()=>{this.engine.joystickController.handleScale(1.1)}),this.element.querySelector("#j-scale-down")?.addEventListener("click",()=>{this.engine.joystickController.handleScale(.9)})}}class Hi{static DB_NAME="Feather3D_DB";static STORE_NAME="projects";static serialize(e,t,r,i="Untitled Project"){const s={format:"feather3d",version:"1.0.0",name:i,created:Date.now(),modified:Date.now(),environment:{...t.config},camera:{target:{x:r.target.x,y:r.target.y,z:r.target.z},theta:r.theta,phi:r.phi,radius:r.radius},layers:e.toJSON()};return JSON.stringify(s,null,2)}static deserialize(e,t,r,i){const s=JSON.parse(e);if(s.format!=="feather3d")throw new Error("Invalid Feather 3D project file");t.clear(),s.layers&&s.layers.length>0&&s.layers.forEach((a,o)=>{const l=o===0?t.layers[0]:t.addLayer(a.name);l.name=a.name,l.setVisible(a.visible??!0),l.locked=a.locked??!1,l.setOpacity(a.opacity??1),a.curves&&a.curves.forEach(c=>{const u=li.fromJSON(c);l.addCurve(u)})}),s.camera&&(i.target.set(s.camera.target.x,s.camera.target.y,s.camera.target.z),i.theta=s.camera.theta,i.phi=s.camera.phi,i.radius=s.camera.radius,i.updateCameraPosition())}static downloadFile(e,t="project.feather"){const r=new Blob([e],{type:"application/json"}),i=URL.createObjectURL(r),s=document.createElement("a");s.href=i,s.download=t,s.click(),URL.revokeObjectURL(i)}}const Tc={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]};class Ns{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new xx(e)}),this.register(function(e){return new yx(e)}),this.register(function(e){return new Tx(e)}),this.register(function(e){return new wx(e)}),this.register(function(e){return new Ex(e)}),this.register(function(e){return new Ax(e)}),this.register(function(e){return new bx(e)}),this.register(function(e){return new Mx(e)}),this.register(function(e){return new Sx(e)}),this.register(function(e){return new Cx(e)}),this.register(function(e){return new Rx(e)}),this.register(function(e){return new Px(e)}),this.register(function(e){return new Ix(e)}),this.register(function(e){return new Lx(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,r,i){const s=new _x,a=[];for(let o=0,l=this.pluginCallbacks.length;o<l;o++)a.push(this.pluginCallbacks[o](s));s.setPlugins(a),s.setTextureUtils(this.textureUtils),s.writeAsync(e,t,i).catch(r)}parseAsync(e,t){const r=this;return new Promise(function(i,s){r.parse(e,i,s,t)})}}const Oe={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},Ha="KHR_mesh_quantization",Yt={};Yt[$u]=Oe.NEAREST;Yt[qu]=Oe.NEAREST_MIPMAP_NEAREST;Yt[Yu]=Oe.NEAREST_MIPMAP_LINEAR;Yt[Ku]=Oe.LINEAR;Yt[Zu]=Oe.LINEAR_MIPMAP_NEAREST;Yt[Ju]=Oe.LINEAR_MIPMAP_LINEAR;Yt[Xu]=Oe.CLAMP_TO_EDGE;Yt[Wu]=Oe.REPEAT;Yt[ju]=Oe.MIRRORED_REPEAT;const wc={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},ux=new ue,Ec=12,hx=1179937895,dx=2,Ac=8,px=1313821514,fx=5130562;function vn(n,e){return n.length===e.length&&n.every(function(t,r){return t===e[r]})}function mx(n){return new TextEncoder().encode(n).buffer}function gx(n){return vn(n.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function vx(n,e,t){const r={min:new Array(n.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(n.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let i=e;i<e+t;i++)for(let s=0;s<n.itemSize;s++){let a;n.itemSize>4?a=n.array[i*n.itemSize+s]:(s===0?a=n.getX(i):s===1?a=n.getY(i):s===2?a=n.getZ(i):s===3&&(a=n.getW(i)),n.normalized===!0&&(a=Dt.normalize(a,n.array))),r.min[s]=Math.min(r.min[s],a),r.max[s]=Math.max(r.max[s],a)}return r}function vu(n){return Math.ceil(n/4)*4}function Ga(n,e=0){const t=vu(n.byteLength);if(t!==n.byteLength){const r=new Uint8Array(t);if(r.set(new Uint8Array(n)),e!==0)for(let i=n.byteLength;i<t;i++)r[i]=e;return r.buffer}return n}function Cc(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function Rc(n,e){if(n.toBlob!==void 0)return new Promise(r=>n.toBlob(r,e));let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),n.convertToBlob({type:e,quality:t})}class _x{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r"+fo}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,r={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},r),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);const i=this,s=i.buffers,a=i.json;r=i.options;const o=i.extensionsUsed,l=i.extensionsRequired,c=new Blob(s,{type:"application/octet-stream"}),u=Object.keys(o),h=Object.keys(l);if(u.length>0&&(a.extensionsUsed=u),h.length>0&&(a.extensionsRequired=h),a.buffers&&a.buffers.length>0&&(a.buffers[0].byteLength=c.size),r.binary===!0){const d=new FileReader;d.readAsArrayBuffer(c),d.onloadend=function(){const p=Ga(d.result),g=new DataView(new ArrayBuffer(Ac));g.setUint32(0,p.byteLength,!0),g.setUint32(4,fx,!0);const v=Ga(mx(JSON.stringify(a)),32),m=new DataView(new ArrayBuffer(Ac));m.setUint32(0,v.byteLength,!0),m.setUint32(4,px,!0);const f=new ArrayBuffer(Ec),b=new DataView(f);b.setUint32(0,hx,!0),b.setUint32(4,dx,!0);const x=Ec+m.byteLength+v.byteLength+g.byteLength+p.byteLength;b.setUint32(8,x,!0);const _=new Blob([f,m,v,g,p],{type:"application/octet-stream"}),S=new FileReader;S.readAsArrayBuffer(_),S.onloadend=function(){t(S.result)}}}else if(a.buffers&&a.buffers.length>0){const d=new FileReader;d.readAsDataURL(c),d.onloadend=function(){const p=d.result;a.buffers[0].uri=p,t(a)}}else t(a)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;const r=this.options,i=this.extensionsUsed;try{const s=JSON.parse(JSON.stringify(e.userData));if(r.includeCustomExtensions&&s.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(const a in s.gltfExtensions)t.extensions[a]=s.gltfExtensions[a],i[a]=!0;delete s.gltfExtensions}Object.keys(s).length>0&&(t.extras=s)}catch(s){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+s.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){const r=new Map;r.set(!0,this.uid++),r.set(!1,this.uid++),this.uids.set(e,r)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;const t=new P;for(let r=0,i=e.count;r<i;r++)if(Math.abs(t.fromBufferAttribute(e,r).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){const t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);const r=e.clone(),i=new P;for(let s=0,a=r.count;s<a;s++)i.fromBufferAttribute(r,s),i.x===0&&i.y===0&&i.z===0?i.setX(1):i.normalize(),r.setXYZ(s,i.x,i.y,i.z);return t.attributesNormalized.set(e,r),r}applyTextureTransform(e,t){let r=!1;const i={};(t.offset.x!==0||t.offset.y!==0)&&(i.offset=t.offset.toArray(),r=!0),t.rotation!==0&&(i.rotation=t.rotation,r=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(i.scale=t.repeat.toArray(),r=!0),r&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=i,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function r(d){return d.colorSpace===Wt?function(p){return p<.04045?p*.0773993808:Math.pow(p*.9478672986+.0521327014,2.4)}:function(p){return p}}e instanceof _a&&(e=await this.decompressTextureAsync(e)),t instanceof _a&&(t=await this.decompressTextureAsync(t));const i=e?e.image:null,s=t?t.image:null,a=Math.max(i?i.width:0,s?s.width:0),o=Math.max(i?i.height:0,s?s.height:0),l=Cc();l.width=a,l.height=o;const c=l.getContext("2d",{willReadFrequently:!0});c.fillStyle="#00ffff",c.fillRect(0,0,a,o);const u=c.getImageData(0,0,a,o);if(i){c.drawImage(i,0,0,a,o);const d=r(e),p=c.getImageData(0,0,a,o).data;for(let g=2;g<p.length;g+=4)u.data[g]=d(p[g]/256)*256}if(s){c.drawImage(s,0,0,a,o);const d=r(t),p=c.getImageData(0,0,a,o).data;for(let g=1;g<p.length;g+=4)u.data[g]=d(p[g]/256)*256}c.putImageData(u,0,0);const h=(e||t).clone();return h.source=new Bs(l),h.colorSpace=zc,h.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),h}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){const t=this.json,r=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),r.push(e),0}processBufferView(e,t,r,i,s){const a=this.json;a.bufferViews||(a.bufferViews=[]);let o;switch(t){case Oe.BYTE:case Oe.UNSIGNED_BYTE:o=1;break;case Oe.SHORT:case Oe.UNSIGNED_SHORT:o=2;break;default:o=4}let l=e.itemSize*o;s===Oe.ARRAY_BUFFER&&(l=Math.ceil(l/4)*4);const c=vu(i*l),u=new DataView(new ArrayBuffer(c));let h=0;for(let p=r;p<r+i;p++){for(let g=0;g<e.itemSize;g++){let v;e.itemSize>4?v=e.array[p*e.itemSize+g]:(g===0?v=e.getX(p):g===1?v=e.getY(p):g===2?v=e.getZ(p):g===3&&(v=e.getW(p)),e.normalized===!0&&(v=Dt.normalize(v,e.array))),t===Oe.FLOAT?u.setFloat32(h,v,!0):t===Oe.INT?u.setInt32(h,v,!0):t===Oe.UNSIGNED_INT?u.setUint32(h,v,!0):t===Oe.SHORT?u.setInt16(h,v,!0):t===Oe.UNSIGNED_SHORT?u.setUint16(h,v,!0):t===Oe.BYTE?u.setInt8(h,v):t===Oe.UNSIGNED_BYTE&&u.setUint8(h,v),h+=o}h%l!==0&&(h+=l-h%l)}const d={buffer:this.processBuffer(u.buffer),byteOffset:this.byteOffset,byteLength:c};return s!==void 0&&(d.target=s),s===Oe.ARRAY_BUFFER&&(d.byteStride=l),this.byteOffset+=c,a.bufferViews.push(d),{id:a.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){const t=this,r=t.json;return r.bufferViews||(r.bufferViews=[]),new Promise(function(i){const s=new FileReader;s.readAsArrayBuffer(e),s.onloadend=function(){const a=Ga(s.result),o={buffer:t.processBuffer(a),byteOffset:t.byteOffset,byteLength:a.byteLength};t.byteOffset+=a.byteLength,i(r.bufferViews.push(o)-1)}})}processAccessor(e,t,r,i){const s=this.json,a={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"};let o;if(e.array.constructor===Float32Array)o=Oe.FLOAT;else if(e.array.constructor===Int32Array)o=Oe.INT;else if(e.array.constructor===Uint32Array)o=Oe.UNSIGNED_INT;else if(e.array.constructor===Int16Array)o=Oe.SHORT;else if(e.array.constructor===Uint16Array)o=Oe.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)o=Oe.BYTE;else if(e.array.constructor===Uint8Array)o=Oe.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(r===void 0&&(r=0),(i===void 0||i===1/0)&&(i=e.count),i===0)return null;const l=vx(e,r,i);let c;t!==void 0&&(c=e===t.index?Oe.ELEMENT_ARRAY_BUFFER:Oe.ARRAY_BUFFER);const u=this.processBufferView(e,o,r,i,c),h={bufferView:u.id,byteOffset:u.byteOffset,componentType:o,count:i,max:l.max,min:l.min,type:a[e.itemSize]};return e.normalized===!0&&(h.normalized=!0),s.accessors||(s.accessors=[]),s.accessors.push(h)-1}processImage(e,t,r,i="image/png"){if(e!==null){const s=this,a=s.cache,o=s.json,l=s.options,c=s.pending;a.images.has(e)||a.images.set(e,{});const u=a.images.get(e),h=i+":flipY/"+r.toString();if(u[h]!==void 0)return u[h];o.images||(o.images=[]);const d={mimeType:i},p=Cc();p.width=Math.min(e.width,l.maxTextureSize),p.height=Math.min(e.height,l.maxTextureSize);const g=p.getContext("2d",{willReadFrequently:!0});if(r===!0&&(g.translate(0,p.height),g.scale(1,-1)),e.data!==void 0){t!==Qu&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>l.maxTextureSize||e.height>l.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);const m=new Uint8ClampedArray(e.height*e.width*4);for(let f=0;f<m.length;f+=4)m[f+0]=e.data[f+0],m[f+1]=e.data[f+1],m[f+2]=e.data[f+2],m[f+3]=e.data[f+3];g.putImageData(new ImageData(m,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)g.drawImage(e,0,0,p.width,p.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");l.binary===!0?c.push(Rc(p,i).then(m=>s.processBufferViewImage(m)).then(m=>{d.bufferView=m})):p.toDataURL!==void 0?d.uri=p.toDataURL(i):c.push(Rc(p,i).then(m=>new FileReader().readAsDataURL(m)).then(m=>{d.uri=m}));const v=o.images.push(d)-1;return u[h]=v,v}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){const t=this.json;t.samplers||(t.samplers=[]);const r={magFilter:Yt[e.magFilter],minFilter:Yt[e.minFilter],wrapS:Yt[e.wrapS],wrapT:Yt[e.wrapT]};return t.samplers.push(r)-1}async processTextureAsync(e){const t=this.options,r=this.cache,i=this.json;if(r.textures.has(e))return r.textures.get(e);i.textures||(i.textures=[]),e instanceof _a&&(e=await this.decompressTextureAsync(e,t.maxTextureSize));let s=e.userData.mimeType;s==="image/webp"&&(s="image/png");const a={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,s)};e.name&&(a.name=e.name),await this._invokeAllAsync(async function(l){l.writeTexture&&await l.writeTexture(e,a)});const o=i.textures.push(a)-1;return r.textures.set(e,o),o}async processMaterialAsync(e){const t=this.cache,r=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;r.materials||(r.materials=[]);const i={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const s=e.color.toArray().concat([e.opacity]);if(vn(s,[1,1,1,1])||(i.pbrMetallicRoughness.baseColorFactor=s),e.isMeshStandardMaterial?(i.pbrMetallicRoughness.metallicFactor=e.metalness,i.pbrMetallicRoughness.roughnessFactor=e.roughness):(i.pbrMetallicRoughness.metallicFactor=0,i.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){const o=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),l={index:await this.processTextureAsync(o),texCoord:o.channel};this.applyTextureTransform(l,o),i.pbrMetallicRoughness.metallicRoughnessTexture=l}if(e.map){const o={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(o,e.map),i.pbrMetallicRoughness.baseColorTexture=o}if(e.emissive){const o=e.emissive;if(Math.max(o.r,o.g,o.b)>0&&(i.emissiveFactor=e.emissive.toArray()),e.emissiveMap){const l={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(l,e.emissiveMap),i.emissiveTexture=l}}if(e.normalMap){const o={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(o.scale=e.normalScale.x),this.applyTextureTransform(o,e.normalMap),i.normalTexture=o}if(e.aoMap){const o={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(o.strength=e.aoMapIntensity),this.applyTextureTransform(o,e.aoMap),i.occlusionTexture=o}e.transparent?i.alphaMode="BLEND":e.alphaTest>0&&(i.alphaMode="MASK",i.alphaCutoff=e.alphaTest),e.side===Kt&&(i.doubleSided=!0),e.name!==""&&(i.name=e.name),this.serializeUserData(e,i),await this._invokeAllAsync(async function(o){o.writeMaterialAsync&&await o.writeMaterialAsync(e,i)});const a=r.materials.push(i)-1;return t.materials.set(e,a),a}async processMeshAsync(e){const t=this.cache,r=this.json,i=[e.geometry.uuid];if(Array.isArray(e.material))for(let _=0,S=e.material.length;_<S;_++)i.push(e.material[_].uuid);else i.push(e.material.uuid);const s=i.join(":");if(t.meshes.has(s))return t.meshes.get(s);const a=e.geometry;let o;e.isLineSegments?o=Oe.LINES:e.isLineLoop?o=Oe.LINE_LOOP:e.isLine?o=Oe.LINE_STRIP:e.isPoints?o=Oe.POINTS:o=e.material.wireframe?Oe.LINES:Oe.TRIANGLES;const l={},c={},u=[],h=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},p=a.getAttribute("normal");p!==void 0&&!this.isNormalizedNormalAttribute(p)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),a.setAttribute("normal",this.createNormalizedNormalAttribute(p)));let g=null;for(let _ in a.attributes){if(_.slice(0,5)==="morph")continue;const S=a.attributes[_];if(_=d[_]||_.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)||(_="_"+_),t.attributes.has(this.getUID(S))){c[_]=t.attributes.get(this.getUID(S));continue}g=null;const w=S.array;_==="JOINTS_0"&&!(w instanceof Uint16Array)&&!(w instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),g=new We(new Uint16Array(w),S.itemSize,S.normalized)):(w instanceof Uint32Array||w instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),g=Ns.Utils.toFloat32BufferAttribute(S));const T=this.processAccessor(g||S,a);T!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,S),c[_]=T,t.attributes.set(this.getUID(S),T))}if(p!==void 0&&a.setAttribute("normal",p),Object.keys(c).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){const _=[],S=[],w={};if(e.morphTargetDictionary!==void 0)for(const T in e.morphTargetDictionary)w[e.morphTargetDictionary[T]]=T;for(let T=0;T<e.morphTargetInfluences.length;++T){const E={};let M=!1;for(const y in a.morphAttributes){if(y!=="position"&&y!=="normal"){M||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),M=!0);continue}const R=a.morphAttributes[y][T],I=y.toUpperCase(),U=a.attributes[y];if(t.attributes.has(this.getUID(R,!0))){E[I]=t.attributes.get(this.getUID(R,!0));continue}const D=R.clone();if(!a.morphTargetsRelative)for(let z=0,k=R.count;z<k;z++)for(let X=0;X<R.itemSize;X++)X===0&&D.setX(z,R.getX(z)-U.getX(z)),X===1&&D.setY(z,R.getY(z)-U.getY(z)),X===2&&D.setZ(z,R.getZ(z)-U.getZ(z)),X===3&&D.setW(z,R.getW(z)-U.getW(z));E[I]=this.processAccessor(D,a),t.attributes.set(this.getUID(U,!0),E[I])}h.push(E),_.push(e.morphTargetInfluences[T]),e.morphTargetDictionary!==void 0&&S.push(w[T])}l.weights=_,S.length>0&&(l.extras={},l.extras.targetNames=S)}const v=Array.isArray(e.material);if(v&&a.groups.length===0)return null;let m=!1;if(v&&a.index===null){const _=[];for(let S=0,w=a.attributes.position.count;S<w;S++)_[S]=S;a.setIndex(_),m=!0}const f=v?e.material:[e.material],b=v?a.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,S=b.length;_<S;_++){const w={mode:o,attributes:c};if(this.serializeUserData(a,w),h.length>0&&(w.targets=h),a.index!==null){let E=this.getUID(a.index);(b[_].start!==void 0||b[_].count!==void 0)&&(E+=":"+b[_].start+":"+b[_].count),t.attributes.has(E)?w.indices=t.attributes.get(E):(w.indices=this.processAccessor(a.index,a,b[_].start,b[_].count),t.attributes.set(E,w.indices)),w.indices===null&&delete w.indices}const T=await this.processMaterialAsync(f[b[_].materialIndex]);T!==null&&(w.material=T),u.push(w)}m===!0&&a.setIndex(null),l.primitives=u,r.meshes||(r.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(e,l)});const x=r.meshes.push(l)-1;return t.meshes.set(s,x),x}detectMeshQuantization(e,t){if(this.extensionsUsed[Ha])return;let r;switch(t.array.constructor){case Int8Array:r="byte";break;case Uint8Array:r="unsigned byte";break;case Int16Array:r="short";break;case Uint16Array:r="unsigned short";break;default:return}t.normalized&&(r+=" normalized");const i=e.split("_",1)[0];Tc[i]&&Tc[i].includes(r)&&(this.extensionsUsed[Ha]=!0,this.extensionsRequired[Ha]=!0)}processCamera(e){const t=this.json;t.cameras||(t.cameras=[]);const r=e.isOrthographicCamera,i={type:r?"orthographic":"perspective"};return r?i.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:i.perspective={aspectRatio:e.aspect,yfov:Dt.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(i.name=e.type),t.cameras.push(i)-1}processAnimation(e,t){const r=this.json,i=this.nodeMap;r.animations||(r.animations=[]),e=Ns.Utils.mergeMorphTargetTracks(e.clone(),t);const s=e.tracks,a=[],o=[];for(let l=0;l<s.length;++l){const c=s[l],u=it.parseTrackName(c.name);let h=it.findNode(t,u.nodeName);const d=wc[u.propertyName];if(u.objectName==="bones"&&(h.isSkinnedMesh===!0?h=h.skeleton.getBoneByName(u.objectIndex):h=void 0),!h||!d){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',c.name);continue}const p=1;let g=c.values.length/c.times.length;d===wc.morphTargetInfluences&&(g/=h.morphTargetInfluences.length);let v;c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(v="CUBICSPLINE",g/=3):c.getInterpolation()===eh?v="STEP":v="LINEAR",o.push({input:this.processAccessor(new We(c.times,p)),output:this.processAccessor(new We(c.values,g)),interpolation:v}),a.push({sampler:o.length-1,target:{node:i.get(h),path:d}})}return r.animations.push({name:e.name||"clip_"+r.animations.length,samplers:o,channels:a}),r.animations.length-1}processSkin(e){const t=this.json,r=this.nodeMap,i=t.nodes[r.get(e)],s=e.skeleton;if(s===void 0)return null;const a=e.skeleton.bones[0];if(a===void 0)return null;const o=[],l=new Float32Array(s.bones.length*16),c=new je;for(let u=0;u<s.bones.length;++u)o.push(r.get(s.bones[u])),c.copy(s.boneInverses[u]),c.multiply(e.bindMatrix).toArray(l,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new We(l,16)),joints:o,skeleton:r.get(a)}),i.skin=t.skins.length-1}async processNodeAsync(e){const t=this.json,r=this.options,i=this.nodeMap;t.nodes||(t.nodes=[]);const s={};if(r.trs){const o=e.quaternion.toArray(),l=e.position.toArray(),c=e.scale.toArray();vn(o,[0,0,0,1])||(s.rotation=o),vn(l,[0,0,0])||(s.translation=l),vn(c,[1,1,1])||(s.scale=c)}else e.matrixAutoUpdate&&e.updateMatrix(),gx(e.matrix)===!1&&(s.matrix=e.matrix.elements);if(e.name!==""&&(s.name=String(e.name)),this.serializeUserData(e,s),e.isMesh||e.isLine||e.isPoints){const o=await this.processMeshAsync(e);o!==null&&(s.mesh=o)}else e.isCamera&&(s.camera=this.processCamera(e));if(e.isSkinnedMesh&&this.skins.push(e),e.children.length>0){const o=[];for(let l=0,c=e.children.length;l<c;l++){const u=e.children[l];if(u.visible||r.onlyVisible===!1){const h=await this.processNodeAsync(u);h!==null&&o.push(h)}}o.length>0&&(s.children=o)}await this._invokeAllAsync(function(o){o.writeNode&&o.writeNode(e,s)});const a=t.nodes.push(s)-1;return i.set(e,a),a}async processSceneAsync(e){const t=this.json,r=this.options;t.scenes||(t.scenes=[],t.scene=0);const i={};e.name!==""&&(i.name=e.name),t.scenes.push(i);const s=[];for(let a=0,o=e.children.length;a<o;a++){const l=e.children[a];if(l.visible||r.onlyVisible===!1){const c=await this.processNodeAsync(l);c!==null&&s.push(c)}}s.length>0&&(i.nodes=s),this.serializeUserData(e,i)}async processObjectsAsync(e){const t=new Xa;t.name="AuxScene";for(let r=0;r<e.length;r++)t.children.push(e[r]);await this.processSceneAsync(t)}async processInputAsync(e){const t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(i){i.beforeParse&&i.beforeParse(e)});const r=[];for(let i=0;i<e.length;i++)e[i]instanceof Xa?await this.processSceneAsync(e[i]):r.push(e[i]);r.length>0&&await this.processObjectsAsync(r);for(let i=0;i<this.skins.length;++i)this.processSkin(this.skins[i]);for(let i=0;i<t.animations.length;++i)this.processAnimation(t.animations[i],e[0]);await this._invokeAllAsync(function(i){i.afterParse&&i.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,r=this.plugins.length;t<r;t++)await e(this.plugins[t])}}class xx{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}const r=this.writer,i=r.json,s=r.extensionsUsed,a={};e.name&&(a.name=e.name),a.color=e.color.toArray(),a.intensity=e.intensity,e.isDirectionalLight?a.type="directional":e.isPointLight?(a.type="point",e.distance>0&&(a.range=e.distance)):e.isSpotLight&&(a.type="spot",e.distance>0&&(a.range=e.distance),a.spot={},a.spot.innerConeAngle=(1-e.penumbra)*e.angle,a.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),s[this.name]||(i.extensions=i.extensions||{},i.extensions[this.name]={lights:[]},s[this.name]=!0);const o=i.extensions[this.name].lights;o.push(a),t.extensions=t.extensions||{},t.extensions[this.name]={light:o.length-1}}}class yx{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;const r=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},r[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}}class bx{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;const r=this.writer,i=r.extensionsUsed,s={};if(s.clearcoatFactor=e.clearcoat,e.clearcoatMap){const a={index:await r.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};r.applyTextureTransform(a,e.clearcoatMap),s.clearcoatTexture=a}if(s.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){const a={index:await r.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};r.applyTextureTransform(a,e.clearcoatRoughnessMap),s.clearcoatRoughnessTexture=a}if(e.clearcoatNormalMap){const a={index:await r.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(a.scale=e.clearcoatNormalScale.x),r.applyTextureTransform(a,e.clearcoatNormalMap),s.clearcoatNormalTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Mx{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;const r=this.writer.extensionsUsed,i={};i.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class Sx{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;const r=this.writer,i=r.extensionsUsed,s={};if(s.iridescenceFactor=e.iridescence,e.iridescenceMap){const a={index:await r.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};r.applyTextureTransform(a,e.iridescenceMap),s.iridescenceTexture=a}if(s.iridescenceIor=e.iridescenceIOR,s.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){const a={index:await r.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};r.applyTextureTransform(a,e.iridescenceThicknessMap),s.iridescenceThicknessTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Tx{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const r=this.writer,i=r.extensionsUsed,s={};if(s.transmissionFactor=e.transmission,e.transmissionMap){const a={index:await r.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};r.applyTextureTransform(a,e.transmissionMap),s.transmissionTexture=a}t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class wx{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const r=this.writer,i=r.extensionsUsed,s={};if(s.thicknessFactor=e.thickness,e.thicknessMap){const a={index:await r.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};r.applyTextureTransform(a,e.thicknessMap),s.thicknessTexture=a}e.attenuationDistance!==1/0&&(s.attenuationDistance=e.attenuationDistance),s.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Ex{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;const r=this.writer.extensionsUsed,i={};i.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class Ax{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(ux)&&!e.specularIntensityMap&&!e.specularColorMap)return;const r=this.writer,i=r.extensionsUsed,s={};if(e.specularIntensityMap){const a={index:await r.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};r.applyTextureTransform(a,e.specularIntensityMap),s.specularTexture=a}if(e.specularColorMap){const a={index:await r.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};r.applyTextureTransform(a,e.specularColorMap),s.specularColorTexture=a}s.specularFactor=e.specularIntensity,s.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Cx{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;const r=this.writer,i=r.extensionsUsed,s={};if(e.sheenRoughnessMap){const a={index:await r.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};r.applyTextureTransform(a,e.sheenRoughnessMap),s.sheenRoughnessTexture=a}if(e.sheenColorMap){const a={index:await r.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};r.applyTextureTransform(a,e.sheenColorMap),s.sheenColorTexture=a}s.sheenRoughnessFactor=e.sheenRoughness,s.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Rx{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;const r=this.writer,i=r.extensionsUsed,s={};if(e.anisotropyMap){const a={index:await r.processTextureAsync(e.anisotropyMap)};r.applyTextureTransform(a,e.anisotropyMap),s.anisotropyTexture=a}s.anisotropyStrength=e.anisotropy,s.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Px{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;const r=this.writer.extensionsUsed,i={};i.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=i,r[this.name]=!0}}class Ix{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;const r=this.writer,i=r.extensionsUsed,s={};if(e.bumpMap){const a={index:await r.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};r.applyTextureTransform(a,e.bumpMap),s.bumpTexture=a}s.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=s,i[this.name]=!0}}class Lx{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;const r=this.writer,i=e,s=new Float32Array(i.count*3),a=new Float32Array(i.count*4),o=new Float32Array(i.count*3),l=new je,c=new P,u=new Vr,h=new P;for(let p=0;p<i.count;p++)i.getMatrixAt(p,l),l.decompose(c,u,h),c.toArray(s,p*3),u.toArray(a,p*4),h.toArray(o,p*3);const d={TRANSLATION:r.processAccessor(new We(s,3)),ROTATION:r.processAccessor(new We(a,4)),SCALE:r.processAccessor(new We(o,3))};i.instanceColor&&(d._COLOR_0=r.processAccessor(i.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},r.extensionsUsed[this.name]=!0,r.extensionsRequired[this.name]=!0}}Ns.Utils={insertKeyframe:function(n,e){const t=n.getValueSize(),r=new n.TimeBufferType(n.times.length+1),i=new n.ValueBufferType(n.values.length+t),s=n.createInterpolant(new n.ValueBufferType(t));let a;if(n.times.length===0){r[0]=e;for(let o=0;o<t;o++)i[o]=0;a=0}else if(e<n.times[0]){if(Math.abs(n.times[0]-e)<.001)return 0;r[0]=e,r.set(n.times,1),i.set(s.evaluate(e),0),i.set(n.values,t),a=0}else if(e>n.times[n.times.length-1]){if(Math.abs(n.times[n.times.length-1]-e)<.001)return n.times.length-1;r[r.length-1]=e,r.set(n.times,0),i.set(n.values,0),i.set(s.evaluate(e),n.values.length),a=r.length-1}else for(let o=0;o<n.times.length;o++){if(Math.abs(n.times[o]-e)<.001)return o;if(n.times[o]<e&&n.times[o+1]>e){r.set(n.times.slice(0,o+1),0),r[o+1]=e,r.set(n.times.slice(o+1),o+2),i.set(n.values.slice(0,(o+1)*t),0),i.set(s.evaluate(e),(o+1)*t),i.set(n.values.slice((o+1)*t),(o+2)*t),a=o+1;break}}return n.times=r,n.values=i,a},mergeMorphTargetTracks:function(n,e){const t=[],r={},i=n.tracks;for(let s=0;s<i.length;++s){let a=i[s];const o=it.parseTrackName(a.name),l=it.findNode(e,o.nodeName);if(o.propertyName!=="morphTargetInfluences"||o.propertyIndex===void 0){t.push(a);continue}if(a.createInterpolant!==a.InterpolantFactoryMethodDiscrete&&a.createInterpolant!==a.InterpolantFactoryMethodLinear){if(a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),a=a.clone(),a.setInterpolation(th)}const c=l.morphTargetInfluences.length,u=l.morphTargetDictionary[o.propertyIndex];if(u===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+o.propertyIndex);let h;if(r[l.uuid]===void 0){h=a.clone();const p=new h.ValueBufferType(c*h.times.length);for(let g=0;g<h.times.length;g++)p[g*c+u]=h.values[g];h.name=(o.nodeName||"")+".morphTargetInfluences",h.values=p,r[l.uuid]=h,t.push(h);continue}const d=a.createInterpolant(new a.ValueBufferType(1));h=r[l.uuid];for(let p=0;p<h.times.length;p++)h.values[p*c+u]=d.evaluate(h.times[p]);for(let p=0;p<a.times.length;p++){const g=this.insertKeyframe(h,a.times[p]);h.values[g*c+u]=a.values[p]}}return n.tracks=t,n},toFloat32BufferAttribute:function(n){const e=new We(new Float32Array(n.count*n.itemSize),n.itemSize,!1);if(!n.normalized&&!n.isInterleavedBufferAttribute)return e.array.set(n.array),e;for(let t=0,r=n.count;t<r;t++)for(let i=0;i<n.itemSize;i++)e.setComponent(t,i,n.getComponent(t,i));return e}};class Ux{static exportGLB(e,t="model.glb"){return new Promise((r,i)=>{new Ns().parse(e,s=>{const a=new Blob([s],{type:"model/gltf-binary"}),o=URL.createObjectURL(a),l=document.createElement("a");l.href=o,l.download=t,l.click(),URL.revokeObjectURL(o),r()},s=>i(s),{binary:!0})})}}class Dx{parse(e){let t="",r=0,i=0,s=0;const a=new P,o=new ue,l=new P,c=new be,u=[];function h(g){let v=0,m=0,f=0;const b=g.geometry,x=new Ne,_=b.getAttribute("position"),S=b.getAttribute("normal"),w=b.getAttribute("uv"),T=b.getIndex();if(t+="o "+g.name+`
`,g.material&&g.material.name&&(t+="usemtl "+g.material.name+`
`),_!==void 0)for(let E=0,M=_.count;E<M;E++,v++)a.fromBufferAttribute(_,E),a.applyMatrix4(g.matrixWorld),t+="v "+a.x+" "+a.y+" "+a.z+`
`;if(w!==void 0)for(let E=0,M=w.count;E<M;E++,f++)c.fromBufferAttribute(w,E),t+="vt "+c.x+" "+c.y+`
`;if(S!==void 0){x.getNormalMatrix(g.matrixWorld);for(let E=0,M=S.count;E<M;E++,m++)l.fromBufferAttribute(S,E),l.applyMatrix3(x).normalize(),t+="vn "+l.x+" "+l.y+" "+l.z+`
`}if(T!==null)for(let E=0,M=T.count;E<M;E+=3){for(let y=0;y<3;y++){const R=T.getX(E+y)+1;u[y]=r+R+(S||w?"/"+(w?i+R:"")+(S?"/"+(s+R):""):"")}t+="f "+u.join(" ")+`
`}else for(let E=0,M=_.count;E<M;E+=3){for(let y=0;y<3;y++){const R=E+y+1;u[y]=r+R+(S||w?"/"+(w?i+R:"")+(S?"/"+(s+R):""):"")}t+="f "+u.join(" ")+`
`}r+=v,i+=f,s+=m}function d(g){let v=0;const m=g.geometry,f=g.type,b=m.getAttribute("position");if(t+="o "+g.name+`
`,b!==void 0)for(let x=0,_=b.count;x<_;x++,v++)a.fromBufferAttribute(b,x),a.applyMatrix4(g.matrixWorld),t+="v "+a.x+" "+a.y+" "+a.z+`
`;if(f==="Line"){t+="l ";for(let x=1,_=b.count;x<=_;x++)t+=r+x+" ";t+=`
`}if(f==="LineSegments")for(let x=1,_=x+1,S=b.count;x<S;x+=2,_=x+1)t+="l "+(r+x)+" "+(r+_)+`
`;r+=v}function p(g){let v=0;const m=g.geometry,f=m.getAttribute("position"),b=m.getAttribute("color");if(t+="o "+g.name+`
`,f!==void 0){for(let x=0,_=f.count;x<_;x++,v++)a.fromBufferAttribute(f,x),a.applyMatrix4(g.matrixWorld),t+="v "+a.x+" "+a.y+" "+a.z,b!==void 0&&(o.fromBufferAttribute(b,x),ze.fromWorkingColorSpace(o,Wt),t+=" "+o.r+" "+o.g+" "+o.b),t+=`
`;t+="p ";for(let x=1,_=f.count;x<=_;x++)t+=r+x+" ";t+=`
`}r+=v}return e.traverse(function(g){g.isMesh===!0&&h(g),g.isLine===!0&&d(g),g.isPoints===!0&&p(g)}),t}}class Nx{static exportOBJ(e,t="model.obj"){const r=new Dx().parse(e),i=new Blob([r],{type:"text/plain"}),s=URL.createObjectURL(i),a=document.createElement("a");a.href=s,a.download=t,a.click(),URL.revokeObjectURL(s)}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var Bt=Uint8Array,sr=Uint16Array,Lo=Int32Array,Uo=new Bt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Do=new Bt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Pc=new Bt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),_u=function(n,e){for(var t=new sr(31),r=0;r<31;++r)t[r]=e+=1<<n[r-1];for(var i=new Lo(t[30]),r=1;r<30;++r)for(var s=t[r];s<t[r+1];++s)i[s]=s-t[r]<<5|r;return{b:t,r:i}},xu=_u(Uo,2),Ox=xu.b,co=xu.r;Ox[28]=258,co[258]=28;var Fx=_u(Do,0),Ic=Fx.r,yu=new sr(32768);for(var ot=0;ot<32768;++ot){var Br=(ot&43690)>>1|(ot&21845)<<1;Br=(Br&52428)>>2|(Br&13107)<<2,Br=(Br&61680)>>4|(Br&3855)<<4,yu[ot]=((Br&65280)>>8|(Br&255)<<8)>>1}var Mn=(function(n,e,t){for(var r=n.length,i=0,s=new sr(e);i<r;++i)n[i]&&++s[n[i]-1];var a=new sr(e);for(i=1;i<e;++i)a[i]=a[i-1]+s[i-1]<<1;var o;for(o=new sr(r),i=0;i<r;++i)n[i]&&(o[i]=yu[a[n[i]-1]++]>>15-n[i]);return o}),ui=new Bt(288);for(var ot=0;ot<144;++ot)ui[ot]=8;for(var ot=144;ot<256;++ot)ui[ot]=9;for(var ot=256;ot<280;++ot)ui[ot]=7;for(var ot=280;ot<288;++ot)ui[ot]=8;var Os=new Bt(32);for(var ot=0;ot<32;++ot)Os[ot]=5;var Bx=Mn(ui,9),zx=Mn(Os,5),bu=function(n){return(n+7)/8|0},Mu=function(n,e,t){return(t==null||t>n.length)&&(t=n.length),new Bt(n.subarray(e,t))},kx=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Vs=function(n,e,t){var r=new Error(e||kx[n]);if(r.code=n,Error.captureStackTrace&&Error.captureStackTrace(r,Vs),!t)throw r;return r},Er=function(n,e,t){t<<=e&7;var r=e/8|0;n[r]|=t,n[r+1]|=t>>8},pn=function(n,e,t){t<<=e&7;var r=e/8|0;n[r]|=t,n[r+1]|=t>>8,n[r+2]|=t>>16},Va=function(n,e){for(var t=[],r=0;r<n.length;++r)n[r]&&t.push({s:r,f:n[r]});var i=t.length,s=t.slice();if(!i)return{t:Tu,l:0};if(i==1){var a=new Bt(t[0].s+1);return a[t[0].s]=1,{t:a,l:1}}t.sort(function(S,w){return S.f-w.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,u=1,h=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=i-1;)o=t[t[c].f<t[h].f?c++:h++],l=t[c!=u&&t[c].f<t[h].f?c++:h++],t[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var d=s[0].s,r=1;r<i;++r)s[r].s>d&&(d=s[r].s);var p=new sr(d+1),g=uo(t[u-1],p,0);if(g>e){var r=0,v=0,m=g-e,f=1<<m;for(s.sort(function(w,T){return p[T.s]-p[w.s]||w.f-T.f});r<i;++r){var b=s[r].s;if(p[b]>e)v+=f-(1<<g-p[b]),p[b]=e;else break}for(v>>=m;v>0;){var x=s[r].s;p[x]<e?v-=1<<e-p[x]++-1:++r}for(;r>=0&&v;--r){var _=s[r].s;p[_]==e&&(--p[_],++v)}g=e}return{t:new Bt(p),l:g}},uo=function(n,e,t){return n.s==-1?Math.max(uo(n.l,e,t+1),uo(n.r,e,t+1)):e[n.s]=t},Lc=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new sr(++e),r=0,i=n[0],s=1,a=function(l){t[r++]=l},o=1;o<=e;++o)if(n[o]==i&&o!=e)++s;else{if(!i&&s>2){for(;s>138;s-=138)a(32754);s>2&&(a(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(a(i),--s;s>6;s-=6)a(8304);s>2&&(a(s-3<<5|8208),s=0)}for(;s--;)a(i);s=1,i=n[o]}return{c:t.subarray(0,r),n:e}},fn=function(n,e){for(var t=0,r=0;r<e.length;++r)t+=n[r]*e[r];return t},Su=function(n,e,t){var r=t.length,i=bu(e+2);n[i]=r&255,n[i+1]=r>>8,n[i+2]=n[i]^255,n[i+3]=n[i+1]^255;for(var s=0;s<r;++s)n[i+s+4]=t[s];return(i+4+r)*8},Uc=function(n,e,t,r,i,s,a,o,l,c,u){Er(e,u++,t),++i[256];for(var h=Va(i,15),d=h.t,p=h.l,g=Va(s,15),v=g.t,m=g.l,f=Lc(d),b=f.c,x=f.n,_=Lc(v),S=_.c,w=_.n,T=new sr(19),E=0;E<b.length;++E)++T[b[E]&31];for(var E=0;E<S.length;++E)++T[S[E]&31];for(var M=Va(T,7),y=M.t,R=M.l,I=19;I>4&&!y[Pc[I-1]];--I);var U=c+5<<3,D=fn(i,ui)+fn(s,Os)+a,z=fn(i,d)+fn(s,v)+a+14+3*I+fn(T,y)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&U<=D&&U<=z)return Su(e,u,n.subarray(l,l+c));var k,X,G,J;if(Er(e,u,1+(z<D)),u+=2,z<D){k=Mn(d,p),X=d,G=Mn(v,m),J=v;var se=Mn(y,R);Er(e,u,x-257),Er(e,u+5,w-1),Er(e,u+10,I-4),u+=14;for(var E=0;E<I;++E)Er(e,u+3*E,y[Pc[E]]);u+=3*I;for(var pe=[b,S],ve=0;ve<2;++ve)for(var Le=pe[ve],E=0;E<Le.length;++E){var $=Le[E]&31;Er(e,u,se[$]),u+=y[$],$>15&&(Er(e,u,Le[E]>>5&127),u+=Le[E]>>12)}}else k=Bx,X=ui,G=zx,J=Os;for(var E=0;E<o;++E){var K=r[E];if(K>255){var $=K>>18&31;pn(e,u,k[$+257]),u+=X[$+257],$>7&&(Er(e,u,K>>23&31),u+=Uo[$]);var de=K&31;pn(e,u,G[de]),u+=J[de],de>3&&(pn(e,u,K>>5&8191),u+=Do[de])}else pn(e,u,k[K]),u+=X[K]}return pn(e,u,k[256]),u+X[256]},Hx=new Lo([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Tu=new Bt(0),Gx=function(n,e,t,r,i,s){var a=s.z||n.length,o=new Bt(r+a+5*(1+Math.ceil(a/7e3))+i),l=o.subarray(r,o.length-i),c=s.l,u=(s.r||0)&7;if(e){u&&(l[0]=s.r>>3);for(var h=Hx[e-1],d=h>>13,p=h&8191,g=(1<<t)-1,v=s.p||new sr(32768),m=s.h||new sr(g+1),f=Math.ceil(t/3),b=2*f,x=function(N){return(n[N]^n[N+1]<<f^n[N+2]<<b)&g},_=new Lo(25e3),S=new sr(288),w=new sr(32),T=0,E=0,M=s.i||0,y=0,R=s.w||0,I=0;M+2<a;++M){var U=x(M),D=M&32767,z=m[U];if(v[D]=z,m[U]=D,R<=M){var k=a-M;if((T>7e3||y>24576)&&(k>423||!c)){u=Uc(n,l,0,_,S,w,E,y,I,M-I,u),y=T=E=0,I=M;for(var X=0;X<286;++X)S[X]=0;for(var X=0;X<30;++X)w[X]=0}var G=2,J=0,se=p,pe=D-z&32767;if(k>2&&U==x(M-pe))for(var ve=Math.min(d,k)-1,Le=Math.min(32767,M),$=Math.min(258,k);pe<=Le&&--se&&D!=z;){if(n[M+G]==n[M+G-pe]){for(var K=0;K<$&&n[M+K]==n[M+K-pe];++K);if(K>G){if(G=K,J=pe,K>ve)break;for(var de=Math.min(pe,K-2),re=0,X=0;X<de;++X){var Me=M-pe+X&32767,Ee=v[Me],Re=Me-Ee&32767;Re>re&&(re=Re,z=Me)}}}D=z,z=v[D],pe+=D-z&32767}if(J){_[y++]=268435456|co[G]<<18|Ic[J];var et=co[G]&31,Be=Ic[J]&31;E+=Uo[et]+Do[Be],++S[257+et],++w[Be],R=M+G,++T}else _[y++]=n[M],++S[n[M]]}}for(M=Math.max(M,R);M<a;++M)_[y++]=n[M],++S[n[M]];u=Uc(n,l,c,_,S,w,E,y,I,M-I,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=m,s.p=v,s.i=M,s.w=R)}else{for(var M=s.w||0;M<a+c;M+=65535){var st=M+65535;st>=a&&(l[u/8|0]=c,st=a),u=Su(l,u+1,n.subarray(M,st))}s.i=a}return Mu(o,0,r+bu(u)+i)},Vx=(function(){for(var n=new Int32Array(256),e=0;e<256;++e){for(var t=e,r=9;--r;)t=(t&1&&-306674912)^t>>>1;n[e]=t}return n})(),Wx=function(){var n=-1;return{p:function(e){for(var t=n,r=0;r<e.length;++r)t=Vx[t&255^e[r]]^t>>>8;n=t},d:function(){return~n}}},Xx=function(n,e,t,r,i){if(!i&&(i={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),a=new Bt(s.length+n.length);a.set(s),a.set(n,s.length),n=a,i.w=s.length}return Gx(n,e.level==null?6:e.level,e.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,r,i)},wu=function(n,e){var t={};for(var r in n)t[r]=n[r];for(var r in e)t[r]=e[r];return t},Ct=function(n,e,t){for(;t;++e)n[e]=t,t>>>=8};function jx(n,e){return Xx(n,e||{},0,0)}var Eu=function(n,e,t,r){for(var i in n){var s=n[i],a=e+i,o=r;Array.isArray(s)&&(o=wu(r,s[1]),s=s[0]),s instanceof Bt?t[a]=[s,o]:(t[a+="/"]=[new Bt(0),o],Eu(s,a,t,r))}},Dc=typeof TextEncoder<"u"&&new TextEncoder,$x=typeof TextDecoder<"u"&&new TextDecoder,qx=0;try{$x.decode(Tu,{stream:!0}),qx=1}catch{}function Fs(n,e){var t;if(Dc)return Dc.encode(n);for(var r=n.length,i=new Bt(n.length+(n.length>>1)),s=0,a=function(u){i[s++]=u},t=0;t<r;++t){if(s+5>i.length){var o=new Bt(s+8+(r-t<<1));o.set(i),i=o}var l=n.charCodeAt(t);l<128||e?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return Mu(i,0,s)}var ho=function(n){var e=0;if(n)for(var t in n){var r=n[t].length;r>65535&&Vs(9),e+=r+4}return e},Nc=function(n,e,t,r,i,s,a,o){var l=r.length,c=t.extra,u=o&&o.length,h=ho(c);Ct(n,e,a!=null?33639248:67324752),e+=4,a!=null&&(n[e++]=20,n[e++]=t.os),n[e]=20,e+=2,n[e++]=t.flag<<1|(s<0&&8),n[e++]=i&&8,n[e++]=t.compression&255,n[e++]=t.compression>>8;var d=new Date(t.mtime==null?Date.now():t.mtime),p=d.getFullYear()-1980;if((p<0||p>119)&&Vs(10),Ct(n,e,p<<25|d.getMonth()+1<<21|d.getDate()<<16|d.getHours()<<11|d.getMinutes()<<5|d.getSeconds()>>1),e+=4,s!=-1&&(Ct(n,e,t.crc),Ct(n,e+4,s<0?-s-2:s),Ct(n,e+8,t.size)),Ct(n,e+12,l),Ct(n,e+14,h),e+=16,a!=null&&(Ct(n,e,u),Ct(n,e+6,t.attrs),Ct(n,e+10,a),e+=14),n.set(r,e),e+=l,h)for(var g in c){var v=c[g],m=v.length;Ct(n,e,+g),Ct(n,e+2,m),n.set(v,e+4),e+=4+m}return u&&(n.set(o,e),e+=u),e},Yx=function(n,e,t,r,i){Ct(n,e,101010256),Ct(n,e+8,t),Ct(n,e+10,t),Ct(n,e+12,r),Ct(n,e+16,i)};function Kx(n,e){e||(e={});var t={},r=[];Eu(n,"",t,e);var i=0,s=0;for(var a in t){var o=t[a],l=o[0],c=o[1],u=c.level==0?0:8,h=Fs(a),d=h.length,p=c.comment,g=p&&Fs(p),v=g&&g.length,m=ho(c.extra);d>65535&&Vs(11);var f=u?jx(l,c):l,b=f.length,x=Wx();x.p(l),r.push(wu(c,{size:l.length,crc:x.d(),c:f,f:h,m:g,u:d!=a.length||g&&p.length!=v,o:i,compression:u})),i+=30+d+m+b,s+=76+2*(d+m)+(v||0)+b}for(var _=new Bt(s+22),S=i,w=s-i,T=0;T<r.length;++T){var h=r[T];Nc(_,h.o,h,h.f,h.u,h.c.length);var E=30+h.f.length+ho(h.extra);_.set(h.c,h.o+E),Nc(_,i,h,h.f,h.u,h.c.length,h.o,h.m),i+=16+E+(h.m?h.m.length:0)}return Yx(_,i,r.length,w,S),_}class Zx{constructor(){this.textureUtils=null}setTextureUtils(e){this.textureUtils=e}parse(e,t,r,i){this.parseAsync(e,i).then(t).catch(r)}async parseAsync(e,t={}){t=Object.assign({ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:"horizontal"}},includeAnchoringProperties:!0,quickLookCompatible:!1,maxTextureSize:1024},t);const r={},i="model.usda";r[i]=null;let s=Au();s+=Qx(t);const a={},o={};e.traverseVisible(c=>{if(c.isMesh){const u=c.geometry,h=c.material;if(h.isMeshStandardMaterial){const d="geometries/Geometry_"+u.id+".usda";if(!(d in r)){const p=i0(u);r[d]=t0(p)}h.uuid in a||(a[h.uuid]=h),s+=r0(c,u,h)}else console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",c)}else c.isCamera&&(s+=d0(c))}),s+=e0(),s+=c0(a,o,t.quickLookCompatible),r[i]=Fs(s),s=null;for(const c in o){let u=o[c];if(u.isCompressedTexture===!0){if(this.textureUtils===null)throw new Error("THREE.USDZExporter: setTextureUtils() must be called to process compressed textures.");u=await this.textureUtils.decompress(u)}const h=Jx(u.image,u.flipY,t.maxTextureSize),d=await new Promise(p=>h.toBlob(p,"image/png",1));r[`textures/Texture_${c}.png`]=new Uint8Array(await d.arrayBuffer())}let l=0;for(const c in r){const u=r[c],h=34+c.length;l+=h;const d=l&63;if(d!==4){const p=64-d,g=new Uint8Array(p);r[c]=[u,{extra:{12345:g}}]}l=u.length}return Kx(r,{level:0})}}function Jx(n,e,t){if(typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&n instanceof ImageBitmap){const r=t/Math.max(n.width,n.height),i=document.createElement("canvas");i.width=n.width*Math.min(1,r),i.height=n.height*Math.min(1,r);const s=i.getContext("2d");return e===!0&&(s.translate(0,i.height),s.scale(1,-1)),s.drawImage(n,0,0,i.width,i.height),i}else throw new Error("THREE.USDZExporter: No valid image data found. Unable to process texture.")}const Ut=7;function Au(){return`#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)

`}function Qx(n){return`def Xform "Root"
{
	def Scope "Scenes" (
		kind = "sceneLibrary"
	)
	{
		def Xform "Scene" (
			customData = {
				bool preliminary_collidesWithEnvironment = 0
				string sceneName = "Scene"
			}
			sceneName = "Scene"
		)
		{${n.includeAnchoringProperties===!0?`
		token preliminary:anchoring:type = "${n.ar.anchoring.type}"
		token preliminary:planeAnchoring:alignment = "${n.ar.planeAnchoring.alignment}"
	`:""}
`}function e0(){return`
		}
	}
}

`}function t0(n){let e=Au();return e+=n,Fs(e)}function r0(n,e,t){const r="Object_"+n.id,i=Cu(n.matrixWorld);return n.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",n),`def Xform "${r}" (
	prepend references = @./geometries/Geometry_${e.id}.usda@</Geometry>
	prepend apiSchemas = ["MaterialBindingAPI"]
)
{
	matrix4d xformOp:transform = ${i}
	uniform token[] xformOpOrder = ["xformOp:transform"]

	rel material:binding = </Materials/Material_${t.id}>
}

`}function Cu(n){const e=n.elements;return`( ${Ss(e,0)}, ${Ss(e,4)}, ${Ss(e,8)}, ${Ss(e,12)} )`}function Ss(n,e){return`(${n[e+0]}, ${n[e+1]}, ${n[e+2]}, ${n[e+3]})`}function i0(n){return`
def "Geometry"
{
${n0(n)}
}
`}function n0(n){const e="Geometry",t=n.attributes,r=t.position.count;return`
	def Mesh "${e}"
	{
		int[] faceVertexCounts = [${s0(n)}]
		int[] faceVertexIndices = [${a0(n)}]
		normal3f[] normals = [${po(t.normal,r)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${po(t.position,r)}]
${l0(t)}
		uniform token subdivisionScheme = "none"
	}
`}function s0(n){const e=n.index!==null?n.index.count:n.attributes.position.count;return Array(e/3).fill(3).join(", ")}function a0(n){const e=n.index,t=[];if(e!==null)for(let r=0;r<e.count;r++)t.push(e.getX(r));else{const r=n.attributes.position.count;for(let i=0;i<r;i++)t.push(i)}return t.join(", ")}function po(n,e){if(n===void 0)return console.warn("USDZExporter: Normals missing."),Array(e).fill("(0, 0, 0)").join(", ");const t=[];for(let r=0;r<n.count;r++){const i=n.getX(r),s=n.getY(r),a=n.getZ(r);t.push(`(${i.toPrecision(Ut)}, ${s.toPrecision(Ut)}, ${a.toPrecision(Ut)})`)}return t.join(", ")}function o0(n){const e=[];for(let t=0;t<n.count;t++){const r=n.getX(t),i=n.getY(t);e.push(`(${r.toPrecision(Ut)}, ${1-i.toPrecision(Ut)})`)}return e.join(", ")}function l0(n){let e="";for(let r=0;r<4;r++){const i=r>0?r:"",s=n["uv"+i];s!==void 0&&(e+=`
		texCoord2f[] primvars:st${i} = [${o0(s)}] (
			interpolation = "vertex"
		)`)}const t=n.color;if(t!==void 0){const r=t.count;e+=`
	color3f[] primvars:displayColor = [${po(t,r)}] (
		interpolation = "vertex"
		)`}return e}function c0(n,e,t=!1){const r=[];for(const i in n){const s=n[i];r.push(u0(s,e,t))}return`def "Materials"
{
${r.join("")}
}

`}function u0(n,e,t=!1){const r=[],i=[];function s(a,o,l){const c=a.source.id+"_"+a.flipY;e[c]=a;const u=a.channel>0?"st"+a.channel:"st",h={1e3:"repeat",1001:"clamp",1002:"mirror"},d=a.repeat.clone(),p=a.offset.clone(),g=a.rotation,v=Math.sin(g),m=Math.cos(g);return p.y=1-p.y-d.y,t?(p.x=p.x/d.x,p.y=p.y/d.y,p.x+=v/d.x,p.y+=m-1):(p.x+=v*d.x,p.y+=(1-m)*d.y),`
		def Shader "PrimvarReader_${o}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${u}"
			float2 outputs:result
		}

		def Shader "Transform2d_${o}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${n.id}/PrimvarReader_${o}.outputs:result>
			float inputs:rotation = ${(g*(180/Math.PI)).toFixed(Ut)}
			float2 inputs:scale = ${Fc(d)}
			float2 inputs:translation = ${Fc(p)}
			float2 outputs:result
		}

		def Shader "Texture_${a.id}_${o}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${c}.png@
			float2 inputs:st.connect = </Materials/Material_${n.id}/Transform2d_${o}.outputs:result>
			${l!==void 0?"float4 inputs:scale = "+h0(l):""}
			token inputs:sourceColorSpace = "${a.colorSpace===zc?"raw":"sRGB"}"
			token inputs:wrapS = "${h[a.wrapS]}"
			token inputs:wrapT = "${h[a.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${n.transparent||n.alphaTest>0?"float outputs:a":""}
		}`}return n.side===Kt&&console.warn("THREE.USDZExporter: USDZ does not support double sided materials",n),n.map!==null?(r.push(`			color3f inputs:diffuseColor.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:rgb>`),n.transparent?r.push(`			float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:a>`):n.alphaTest>0&&(r.push(`			float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.map.id}_diffuse.outputs:a>`),r.push(`			float inputs:opacityThreshold = ${n.alphaTest}`)),i.push(s(n.map,"diffuse",n.color))):r.push(`			color3f inputs:diffuseColor = ${Oc(n.color)}`),n.emissiveMap!==null?(r.push(`			color3f inputs:emissiveColor.connect = </Materials/Material_${n.id}/Texture_${n.emissiveMap.id}_emissive.outputs:rgb>`),i.push(s(n.emissiveMap,"emissive",new ue(n.emissive.r*n.emissiveIntensity,n.emissive.g*n.emissiveIntensity,n.emissive.b*n.emissiveIntensity)))):n.emissive.getHex()>0&&r.push(`			color3f inputs:emissiveColor = ${Oc(n.emissive)}`),n.normalMap!==null&&(r.push(`			normal3f inputs:normal.connect = </Materials/Material_${n.id}/Texture_${n.normalMap.id}_normal.outputs:rgb>`),i.push(s(n.normalMap,"normal"))),n.aoMap!==null&&(r.push(`			float inputs:occlusion.connect = </Materials/Material_${n.id}/Texture_${n.aoMap.id}_occlusion.outputs:r>`),i.push(s(n.aoMap,"occlusion",new ue(n.aoMapIntensity,n.aoMapIntensity,n.aoMapIntensity)))),n.roughnessMap!==null?(r.push(`			float inputs:roughness.connect = </Materials/Material_${n.id}/Texture_${n.roughnessMap.id}_roughness.outputs:g>`),i.push(s(n.roughnessMap,"roughness",new ue(n.roughness,n.roughness,n.roughness)))):r.push(`			float inputs:roughness = ${n.roughness}`),n.metalnessMap!==null?(r.push(`			float inputs:metallic.connect = </Materials/Material_${n.id}/Texture_${n.metalnessMap.id}_metallic.outputs:b>`),i.push(s(n.metalnessMap,"metallic",new ue(n.metalness,n.metalness,n.metalness)))):r.push(`			float inputs:metallic = ${n.metalness}`),n.alphaMap!==null?(r.push(`			float inputs:opacity.connect = </Materials/Material_${n.id}/Texture_${n.alphaMap.id}_opacity.outputs:r>`),r.push("			float inputs:opacityThreshold = 0.0001"),i.push(s(n.alphaMap,"opacity"))):r.push(`			float inputs:opacity = ${n.opacity}`),n.isMeshPhysicalMaterial&&(n.clearcoatMap!==null?(r.push(`			float inputs:clearcoat.connect = </Materials/Material_${n.id}/Texture_${n.clearcoatMap.id}_clearcoat.outputs:r>`),i.push(s(n.clearcoatMap,"clearcoat",new ue(n.clearcoat,n.clearcoat,n.clearcoat)))):r.push(`			float inputs:clearcoat = ${n.clearcoat}`),n.clearcoatRoughnessMap!==null?(r.push(`			float inputs:clearcoatRoughness.connect = </Materials/Material_${n.id}/Texture_${n.clearcoatRoughnessMap.id}_clearcoatRoughness.outputs:g>`),i.push(s(n.clearcoatRoughnessMap,"clearcoatRoughness",new ue(n.clearcoatRoughness,n.clearcoatRoughness,n.clearcoatRoughness)))):r.push(`			float inputs:clearcoatRoughness = ${n.clearcoatRoughness}`),r.push(`			float inputs:ior = ${n.ior}`)),`
	def Material "Material_${n.id}"
	{
		def Shader "PreviewSurface"
		{
			uniform token info:id = "UsdPreviewSurface"
${r.join(`
`)}
			int inputs:useSpecularWorkflow = 0
			token outputs:surface
		}

		token outputs:surface.connect = </Materials/Material_${n.id}/PreviewSurface.outputs:surface>

${i.join(`
`)}

	}
`}function Oc(n){return`(${n.r}, ${n.g}, ${n.b})`}function h0(n){return`(${n.r}, ${n.g}, ${n.b}, 1.0)`}function Fc(n){return`(${n.x}, ${n.y})`}function d0(n){const e=n.name?n.name:"Camera_"+n.id,t=Cu(n.matrixWorld);return n.matrixWorld.determinant()<0&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",n),n.isOrthographicCamera?`def Camera "${e}"
		{
			matrix4d xformOp:transform = ${t}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${n.near.toPrecision(Ut)}, ${n.far.toPrecision(Ut)})
			float horizontalAperture = ${((Math.abs(n.left)+Math.abs(n.right))*10).toPrecision(Ut)}
			float verticalAperture = ${((Math.abs(n.top)+Math.abs(n.bottom))*10).toPrecision(Ut)}
			token projection = "orthographic"
		}
	
	`:`def Camera "${e}"
		{
			matrix4d xformOp:transform = ${t}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${n.near.toPrecision(Ut)}, ${n.far.toPrecision(Ut)})
			float focalLength = ${n.getFocalLength().toPrecision(Ut)}
			float focusDistance = ${n.focus.toPrecision(Ut)}
			float horizontalAperture = ${n.getFilmWidth().toPrecision(Ut)}
			token projection = "perspective"
			float verticalAperture = ${n.getFilmHeight().toPrecision(Ut)}
		}
	
	`}class p0{static async exportUSDZ(e,t="model.usdz"){const r=await new Zx().parseAsync(e),i=new Blob([r],{type:"model/vnd.usdz+zip"}),s=URL.createObjectURL(i),a=document.createElement("a");a.href=s,a.download=t,a.click(),URL.revokeObjectURL(s)}}class f0{parse(e,t={}){t=Object.assign({binary:!1},t);const r=t.binary,i=[];let s=0;e.traverse(function(f){if(f.isMesh){const b=f.geometry,x=b.index,_=b.getAttribute("position");s+=x!==null?x.count/3:_.count/3,i.push({object3d:f,geometry:b})}});let a,o=80;if(r===!0){const f=s*2+s*3*4*4+80+4,b=new ArrayBuffer(f);a=new DataView(b),a.setUint32(o,s,!0),o+=4}else a="",a+=`solid exported
`;const l=new P,c=new P,u=new P,h=new P,d=new P,p=new P;for(let f=0,b=i.length;f<b;f++){const x=i[f].object3d,_=i[f].geometry,S=_.index,w=_.getAttribute("position");if(S!==null)for(let T=0;T<S.count;T+=3){const E=S.getX(T+0),M=S.getX(T+1),y=S.getX(T+2);g(E,M,y,w,x)}else for(let T=0;T<w.count;T+=3){const E=T+0,M=T+1,y=T+2;g(E,M,y,w,x)}}return r===!1&&(a+=`endsolid exported
`),a;function g(f,b,x,_,S){l.fromBufferAttribute(_,f),c.fromBufferAttribute(_,b),u.fromBufferAttribute(_,x),S.isSkinnedMesh===!0&&(S.applyBoneTransform(f,l),S.applyBoneTransform(b,c),S.applyBoneTransform(x,u)),l.applyMatrix4(S.matrixWorld),c.applyMatrix4(S.matrixWorld),u.applyMatrix4(S.matrixWorld),v(l,c,u),m(l),m(c),m(u),r===!0?(a.setUint16(o,0,!0),o+=2):(a+=`		endloop
`,a+=`	endfacet
`)}function v(f,b,x){h.subVectors(x,b),d.subVectors(f,b),h.cross(d).normalize(),p.copy(h).normalize(),r===!0?(a.setFloat32(o,p.x,!0),o+=4,a.setFloat32(o,p.y,!0),o+=4,a.setFloat32(o,p.z,!0),o+=4):(a+="	facet normal "+p.x+" "+p.y+" "+p.z+`
`,a+=`		outer loop
`)}function m(f){r===!0?(a.setFloat32(o,f.x,!0),o+=4,a.setFloat32(o,f.y,!0),o+=4,a.setFloat32(o,f.z,!0),o+=4):a+="			vertex "+f.x+" "+f.y+" "+f.z+`
`}}}class m0{static exportSTL(e,t="model.stl"){const r=new f0().parse(e,{binary:!0}),i=new Blob([r],{type:"application/octet-stream"}),s=URL.createObjectURL(i),a=document.createElement("a");a.href=s,a.download=t,a.click(),URL.revokeObjectURL(s)}}class g0{static capturePNG(e,t,r,i=2,s="feather_render.png"){const a=new be;e.getSize(a);const o=e.getPixelRatio(),l=a.x*i,c=a.y*i;e.setPixelRatio(1),e.setSize(l,c,!1),e.render(t,r);const u=e.domElement.toDataURL("image/png");e.setPixelRatio(o),e.setSize(a.x,a.y,!0),e.render(t,r);const h=document.createElement("a");h.href=u,h.download=s,h.click()}}class v0{isRecording=!1;mediaRecorder=null;recordedChunks=[];startRecording(e,t=4e3,r,i){if(this.isRecording)return!1;const s=e.canvas.captureStream(60),a={mimeType:"video/webm;codecs=vp9"};try{this.mediaRecorder=new MediaRecorder(s,a)}catch{try{this.mediaRecorder=new MediaRecorder(s)}catch(u){return console.error("MediaRecorder not supported on this browser",u),!1}}this.recordedChunks=[],this.mediaRecorder.ondataavailable=u=>{u.data.size>0&&this.recordedChunks.push(u.data)},this.mediaRecorder.onstop=()=>{const u=new Blob(this.recordedChunks,{type:"video/webm"}),h=URL.createObjectURL(u),d=document.createElement("a");d.href=h,d.download="turntable.webm",d.click(),URL.revokeObjectURL(h),this.isRecording=!1,i&&i()},this.isRecording=!0,this.mediaRecorder.start();const o=performance.now(),l=e.theta,c=u=>{if(!this.isRecording)return;const h=u-o,d=Math.min(1,h/t);e.theta=l+d*Math.PI*2,e.updateCameraPosition(),r&&r(d),d<1?requestAnimationFrame(c):setTimeout(()=>{this.mediaRecorder&&this.mediaRecorder.state!=="inactive"&&this.mediaRecorder.stop()},200)};return requestAnimationFrame(c),!0}}class _0{element;engine;isVisible=!1;turntable;constructor(e){this.engine=e,this.turntable=new v0,this.element=document.createElement("div"),this.element.className="modal-overlay",this.element.style.display="none",this.render(),this.bindEvents()}show(){this.isVisible=!0,this.element.style.display="flex"}hide(){this.isVisible=!1,this.element.style.display="none"}render(){this.element.innerHTML=`
      <div class="modal-card">
        <div class="modal-header">
          <span class="modal-title">EXPORT / SAVE PROJECT</span>
          <button id="btn-close-export" class="btn btn-sm">CLOSE</button>
        </div>

        <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: var(--mut);">3D FORMATS</div>
        <div class="modal-grid">
          <button id="btn-export-glb" class="btn">GLTF / GLB BINARY</button>
          <button id="btn-export-obj" class="btn">WAVEFRONT OBJ</button>
          <button id="btn-export-usdz" class="btn">USDZ (APPLE AR)</button>
          <button id="btn-export-stl" class="btn">STL (3D PRINT)</button>
        </div>

        <div style="font-size: 11px; font-weight: 700; margin-bottom: 8px; color: var(--mut);">PROJECT & MEDIA</div>
        <div class="modal-grid">
          <button id="btn-export-feather" class="btn">SAVE .FEATHER JSON</button>
          <button id="btn-export-png" class="btn">HIGH-RES PNG (2X)</button>
          <button id="btn-export-video" class="btn">360 TURNTABLE VIDEO</button>
          <label class="btn" style="cursor: pointer; text-align: center;">
            OPEN .FEATHER
            <input id="input-open-feather" type="file" accept=".feather,.json" style="display: none;">
          </label>
        </div>
      </div>
    `}bindEvents(){this.element.querySelector("#btn-close-export")?.addEventListener("click",()=>this.hide()),this.element.addEventListener("click",e=>{e.target===this.element&&this.hide()}),this.element.querySelector("#btn-export-glb")?.addEventListener("click",async()=>{await Ux.exportGLB(this.engine.stageManager.rootGroup),this.hide()}),this.element.querySelector("#btn-export-obj")?.addEventListener("click",()=>{Nx.exportOBJ(this.engine.stageManager.rootGroup),this.hide()}),this.element.querySelector("#btn-export-usdz")?.addEventListener("click",async()=>{await p0.exportUSDZ(this.engine.stageManager.rootGroup),this.hide()}),this.element.querySelector("#btn-export-stl")?.addEventListener("click",()=>{m0.exportSTL(this.engine.stageManager.rootGroup),this.hide()}),this.element.querySelector("#btn-export-feather")?.addEventListener("click",()=>{const e=Hi.serialize(this.engine.stageManager,this.engine.environment,this.engine.viewport);Hi.downloadFile(e,"sketch.feather"),this.hide()}),this.element.querySelector("#btn-export-png")?.addEventListener("click",()=>{g0.capturePNG(this.engine.viewport.renderer,this.engine.scene,this.engine.viewport.camera,2),this.hide()}),this.element.querySelector("#btn-export-video")?.addEventListener("click",()=>{this.turntable.startRecording(this.engine.viewport,4e3,void 0,()=>{}),this.hide()}),this.element.querySelector("#input-open-feather")?.addEventListener("change",e=>{const t=e.target.files;if(t&&t.length>0){const r=new FileReader;r.onload=i=>{const s=i.target?.result;s&&(Hi.deserialize(s,this.engine.stageManager,this.engine.environment,this.engine.viewport),this.hide())},r.readAsText(t[0])}})}}class mn{static DB_NAME="Feather3D_DB";static STORE_NAME="projects";static DB_VERSION=1;static openDB(){return new Promise((e,t)=>{const r=indexedDB.open(this.DB_NAME,this.DB_VERSION);r.onupgradeneeded=i=>{const s=i.target.result;s.objectStoreNames.contains(this.STORE_NAME)||s.createObjectStore(this.STORE_NAME,{keyPath:"id"})},r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}static async listProjects(){try{const e=await this.openDB();return new Promise((t,r)=>{const i=e.transaction(this.STORE_NAME,"readonly").objectStore(this.STORE_NAME).getAll();i.onsuccess=()=>{const s=i.result||[];s.sort((a,o)=>o.modified-a.modified),t(s)},i.onerror=()=>r(i.error)})}catch(e){return console.warn("IndexedDB unavailable, fallback to empty list",e),[]}}static async saveProject(e,t,r,i){const s=await this.openDB();return new Promise((a,o)=>{const l=s.transaction(this.STORE_NAME,"readwrite").objectStore(this.STORE_NAME),c={id:e,name:t,modified:Date.now(),strokeCount:i,data:r},u=l.put(c);u.onsuccess=()=>a(),u.onerror=()=>o(u.error)})}static async loadProject(e){const t=await this.openDB();return new Promise((r,i)=>{const s=t.transaction(this.STORE_NAME,"readonly").objectStore(this.STORE_NAME).get(e);s.onsuccess=()=>{s.result?r(s.result.data):r(null)},s.onerror=()=>i(s.error)})}static async deleteProject(e){const t=await this.openDB();return new Promise((r,i)=>{const s=t.transaction(this.STORE_NAME,"readwrite").objectStore(this.STORE_NAME).delete(e);s.onsuccess=()=>r(),s.onerror=()=>i(s.error)})}}class x0{element;engine;isVisible=!1;constructor(e){this.engine=e,this.element=document.createElement("div"),this.element.className="modal-overlay",this.element.style.display="none",this.render()}async show(){this.isVisible=!0,this.element.style.display="flex",await this.refresh()}hide(){this.isVisible=!1,this.element.style.display="none"}async refresh(){const e=await mn.listProjects();this.renderProjects(e)}render(){this.element.innerHTML=`
      <div class="modal-card" style="max-width: 680px; width: 92%; max-height: 90vh;">
        <div class="modal-header">
          <span class="modal-title">PROJECT GALLERY & NOTES</span>
          <div style="display: flex; gap: 6px;">
            <button id="btn-home-new" class="btn btn-sm">+ NEW SKETCH</button>
            <label class="btn btn-sm" style="cursor: pointer;">
              IMPORT
              <input id="home-file-input" type="file" accept=".feather,.json" style="display: none;">
            </label>
            <button id="btn-home-close" class="btn btn-sm">CLOSE</button>
          </div>
        </div>

        <div id="project-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 12px; max-height: 60vh; overflow-y: auto; padding: 4px;">
        </div>
      </div>
    `,this.element.querySelector("#btn-home-close")?.addEventListener("click",()=>this.hide()),this.element.querySelector("#btn-home-new")?.addEventListener("click",()=>{this.engine.stageManager.clear(),this.hide()}),this.element.querySelector("#home-file-input")?.addEventListener("change",e=>{const t=e.target.files;if(t&&t.length>0){const r=new FileReader;r.onload=async i=>{const s=i.target?.result;if(s){Hi.deserialize(s,this.engine.stageManager,this.engine.environment,this.engine.viewport);const a=`proj_${Date.now()}`;await mn.saveProject(a,t[0].name.replace(".feather",""),s,this.engine.stageManager.getAllCurves().length),this.hide()}},r.readAsText(t[0])}})}renderProjects(e){const t=this.element.querySelector("#project-card-grid");if(t){if(t.innerHTML="",e.length===0){t.innerHTML=`
        <div style="grid-column: 1 / -1; text-align: center; padding: 30px 0; color: var(--mut); font-size: 11px;">
          NO SAVED PROJECTS FOUND. CLICK "+ NEW SKETCH" TO BEGIN.
        </div>
      `;return}e.forEach(r=>{const i=document.createElement("div");i.className="layer-item",i.style.flexDirection="column",i.style.alignItems="stretch",i.style.padding="12px",i.style.gap="8px";const s=new Date(r.modified).toLocaleDateString(void 0,{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});i.innerHTML=`
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <span style="font-weight: 700; font-size: 12px;">${r.name}</span>
          <span style="font-size: 9px; color: var(--mut);">${r.strokeCount} strokes</span>
        </div>
        <span style="font-size: 9px; color: var(--mut);">${s}</span>
        
        <div style="display: flex; gap: 4px; margin-top: 4px;">
          <button class="btn btn-sm btn-open" style="flex: 1;">OPEN</button>
          <button class="btn btn-sm btn-export">EXP</button>
          <button class="btn btn-sm btn-danger btn-del">DEL</button>
        </div>
      `,i.querySelector(".btn-open")?.addEventListener("click",async()=>{const a=await mn.loadProject(r.id);a&&Hi.deserialize(a,this.engine.stageManager,this.engine.environment,this.engine.viewport),this.hide()}),i.querySelector(".btn-export")?.addEventListener("click",async()=>{const a=await mn.loadProject(r.id);a&&Hi.downloadFile(a,`${r.name}.feather`)}),i.querySelector(".btn-del")?.addEventListener("click",async()=>{await mn.deleteProject(r.id),await this.refresh()}),t.appendChild(i)})}}}class y0{stageManager;currentFrame=0;isPlaying=!1;fps=12;isLooping=!0;onionSkinEnabled=!1;timerId=null;onFrameChange;constructor(e){this.stageManager=e}get totalFrames(){return Math.max(1,this.stageManager.layers.length)}goToFrame(e){this.stageManager.layers.length!==0&&(this.currentFrame=Math.max(0,Math.min(e,this.stageManager.layers.length-1)),this.stageManager.setActiveLayer(this.currentFrame),this.updateLayerVisibilities(),this.onFrameChange&&this.onFrameChange(this.currentFrame,this.totalFrames))}nextFrame(){let e=this.currentFrame+1;if(e>=this.stageManager.layers.length)if(this.isLooping)e=0;else{this.pause();return}this.goToFrame(e)}prevFrame(){let e=this.currentFrame-1;e<0&&(this.isLooping?e=this.stageManager.layers.length-1:e=0),this.goToFrame(e)}play(){if(this.isPlaying)return;this.isPlaying=!0;const e=1e3/this.fps;this.timerId=window.setInterval(()=>{this.nextFrame()},e)}pause(){this.isPlaying=!1,this.timerId!==null&&(clearInterval(this.timerId),this.timerId=null)}togglePlay(){return this.isPlaying?this.pause():this.play(),this.isPlaying}setFPS(e){this.fps=Math.max(1,Math.min(24,e)),this.isPlaying&&(this.pause(),this.play())}toggleOnionSkin(){return this.onionSkinEnabled=!this.onionSkinEnabled,this.updateLayerVisibilities(),this.onionSkinEnabled}addFrame(){this.stageManager.addLayer(`Frame ${this.totalFrames+1}`),this.goToFrame(this.stageManager.layers.length-1)}updateLayerVisibilities(){const e=this.stageManager.layers.length;this.stageManager.layers.forEach((t,r)=>{r===this.currentFrame?(t.setVisible(!0),t.setOpacity(1)):this.onionSkinEnabled&&(r===this.currentFrame-1||r===e-1&&this.currentFrame===0&&this.isLooping)||this.onionSkinEnabled&&(r===this.currentFrame+1||r===0&&this.currentFrame===e-1&&this.isLooping)?(t.setVisible(!0),t.setOpacity(.3)):t.setVisible(!1)})}}class b0{element;sequenceManager;playBtn;onionBtn;frameListContainer;isVisible=!1;constructor(e){this.sequenceManager=new y0(e.stageManager),this.element=document.createElement("div"),this.element.id="sequence-timeline",this.element.style.position="fixed",this.element.style.bottom="70px",this.element.style.left="50%",this.element.style.transform="translateX(-50%)",this.element.style.zIndex="95",this.element.style.background="var(--pan)",this.element.style.border="1px solid var(--bdr)",this.element.style.borderRadius="var(--radius)",this.element.style.padding="8px 12px",this.element.style.backdropFilter="blur(10px)",this.element.style.display="none",this.element.style.flexDirection="column",this.element.style.gap="6px",this.element.style.maxWidth="calc(100vw - 32px)",this.render(),this.bindEvents()}toggle(){this.isVisible=!this.isVisible,this.element.style.display=this.isVisible?"flex":"none",this.isVisible?this.refresh():this.sequenceManager.pause()}refresh(){this.renderFrames()}render(){this.element.innerHTML=`
      <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between;">
        <div style="display: flex; gap: 6px; align-items: center;">
          <button id="btn-seq-play" class="btn btn-sm">PLAY</button>
          <button id="btn-seq-prev" class="btn btn-sm">PREV</button>
          <button id="btn-seq-next" class="btn btn-sm">NEXT</button>
          <button id="btn-seq-add" class="btn btn-sm">+ FRAME</button>
          <button id="btn-seq-onion" class="btn btn-sm">ONION: OFF</button>
          <select id="select-fps" class="btn btn-sm" style="appearance: none; -webkit-appearance: none; cursor: pointer;">
            <option value="6">6 FPS</option>
            <option value="12" selected>12 FPS</option>
            <option value="24">24 FPS</option>
          </select>
        </div>
        <button id="btn-seq-close" class="btn btn-sm">CLOSE</button>
      </div>

      <div id="timeline-frames" style="display: flex; gap: 4px; overflow-x: auto; padding: 4px 0;"></div>
    `,this.playBtn=this.element.querySelector("#btn-seq-play"),this.onionBtn=this.element.querySelector("#btn-seq-onion"),this.frameListContainer=this.element.querySelector("#timeline-frames")}renderFrames(){if(!this.frameListContainer)return;this.frameListContainer.innerHTML="";const e=this.sequenceManager.totalFrames;for(let t=0;t<e;t++){const r=document.createElement("button");r.className=`btn btn-sm ${t===this.sequenceManager.currentFrame?"active":""}`,r.style.minWidth="32px",r.style.padding="4px 6px",r.textContent=`${t+1}`,r.addEventListener("click",()=>{this.sequenceManager.goToFrame(t),this.renderFrames()}),this.frameListContainer.appendChild(r)}}bindEvents(){this.playBtn.addEventListener("click",()=>{const e=this.sequenceManager.togglePlay();this.playBtn.textContent=e?"PAUSE":"PLAY"}),this.element.querySelector("#btn-seq-prev")?.addEventListener("click",()=>{this.sequenceManager.prevFrame(),this.renderFrames()}),this.element.querySelector("#btn-seq-next")?.addEventListener("click",()=>{this.sequenceManager.nextFrame(),this.renderFrames()}),this.element.querySelector("#btn-seq-add")?.addEventListener("click",()=>{this.sequenceManager.addFrame(),this.renderFrames()}),this.onionBtn.addEventListener("click",()=>{const e=this.sequenceManager.toggleOnionSkin();this.onionBtn.textContent=e?"ONION: ON":"ONION: OFF",this.onionBtn.classList.toggle("active",e)}),this.element.querySelector("#select-fps").addEventListener("change",e=>{const t=parseInt(e.target.value,10);this.sequenceManager.setFPS(t)}),this.element.querySelector("#btn-seq-close")?.addEventListener("click",()=>{this.toggle()}),this.sequenceManager.onFrameChange=e=>{this.renderFrames()}}}class M0{rootContainer;engine;topNav;toolDock;brushPanel;stagePanel;joystickWidget;exportModal;homeScreen;sequenceTimeline;constructor(e,t){this.rootContainer=e,this.engine=t,this.topNav=new nx(t),this.toolDock=new sx(t),this.brushPanel=new ox(t),this.stagePanel=new lx(t),this.joystickWidget=new cx(t),this.exportModal=new _0(t),this.homeScreen=new x0(t),this.sequenceTimeline=new b0(t),this.mount(),this.bindInteractions()}mount(){this.rootContainer.appendChild(this.topNav.element),this.rootContainer.appendChild(this.toolDock.element),this.rootContainer.appendChild(this.brushPanel.element),this.rootContainer.appendChild(this.stagePanel.element),this.rootContainer.appendChild(this.joystickWidget.element),this.rootContainer.appendChild(this.sequenceTimeline.element),this.rootContainer.appendChild(this.exportModal.element),this.rootContainer.appendChild(this.homeScreen.element)}bindInteractions(){this.topNav.onStageToggle=()=>{this.stagePanel.toggle()},this.topNav.onProjectsClick=()=>{this.homeScreen.show()},this.topNav.onExportClick=()=>{this.exportModal.show()},this.toolDock.onAnimationToggle=()=>{this.sequenceTimeline.toggle()},this.engine.onToolChange=e=>{this.joystickWidget.setVisible(e==="transform")},this.engine.onCurveCreated=()=>{this.stagePanel.refresh(),this.sequenceTimeline.refresh()}}}class S0{engine;uiManager;container;constructor(e){this.container=document.createElement("div"),this.container.id="canvas-container",e.appendChild(this.container),this.engine=new ix(this.container),this.uiManager=new M0(e,this.engine)}}window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),window.deferredPwaPrompt=n;const e=document.getElementById("btn-pwa-install");e&&(e.style.display="inline-flex")});window.triggerPwaInstall=async()=>{if(window.deferredPwaPrompt){window.deferredPwaPrompt.prompt();const{outcome:n}=await window.deferredPwaPrompt.userChoice;if(n==="accepted"){window.deferredPwaPrompt=null;const e=document.getElementById("btn-pwa-install");e&&(e.style.display="none")}}else alert(`To install on iOS Safari: Tap Share -> Add to Home Screen.
To install on Android Chrome: Tap Menu -> Install App.`)};window.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("app")||document.body;new S0(n),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").then(e=>{console.log("Feather3D PWA Service Worker Registered:",e.scope)}).catch(e=>{console.warn("PWA Service Worker registration failed:",e)})})});
