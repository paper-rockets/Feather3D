import { createProceduralSky, applySkyPreset } from '../src/shaders/tslSkyShaders';

console.log('Testing createProceduralSky()...');
try {
  const sky = createProceduralSky();
  console.log('Procedural sky created successfully!');
  console.log('Mesh:', sky.mesh ? 'OK' : 'FAIL');
  console.log('Material:', sky.material ? 'OK' : 'FAIL');
  console.log('Uniforms:', Object.keys(sky.uniforms).length);

  console.log('Testing applySkyPreset day...');
  applySkyPreset(sky.uniforms, 'day');
  console.log('Testing applySkyPreset golden_hour...');
  applySkyPreset(sky.uniforms, 'golden_hour');
  console.log('Testing applySkyPreset cherry...');
  applySkyPreset(sky.uniforms, 'cherry');
  console.log('Testing applySkyPreset dusk...');
  applySkyPreset(sky.uniforms, 'dusk');
  console.log('Testing applySkyPreset night...');
  applySkyPreset(sky.uniforms, 'night');
  console.log('Testing applySkyPreset storm...');
  applySkyPreset(sky.uniforms, 'storm');
  console.log('All presets applied successfully in JS!');
} catch (e) {
  console.error('Error in procedural sky:', e);
}
