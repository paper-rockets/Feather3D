import './ui/styles/app.css';
import { App } from './App';

declare global {
  interface Window {
    deferredPwaPrompt?: any;
    triggerPwaInstall?: () => void;
  }
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPwaPrompt = e;
  const installBtn = document.getElementById('btn-pwa-install');
  if (installBtn) {
    installBtn.style.display = 'inline-flex';
  }
});

window.triggerPwaInstall = async () => {
  if (window.deferredPwaPrompt) {
    window.deferredPwaPrompt.prompt();
    const { outcome } = await window.deferredPwaPrompt.userChoice;
    if (outcome === 'accepted') {
      window.deferredPwaPrompt = null;
      const installBtn = document.getElementById('btn-pwa-install');
      if (installBtn) installBtn.style.display = 'none';
    }
  } else {
    alert('To install on iOS Safari: Tap Share -> Add to Home Screen.\nTo install on Android Chrome: Tap Menu -> Install App.');
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app') || document.body;
  new App(root);

  // Register service worker for PWA offline caching
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Feather3D PWA Service Worker Registered:', reg.scope);
      }).catch(err => {
        console.warn('PWA Service Worker registration failed:', err);
      });
    });
  }
});
