// vite-global-shim.js
import 'globalthis/auto';

if (typeof global === 'undefined') {
  window.global = window;
}
