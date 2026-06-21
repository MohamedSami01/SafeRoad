(function () {
  'use strict';

  function parseHSL(hslStr) {
    var match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 40, s: 80, l: 80 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }

  function setGlowVars(el, glowColor, intensity) {
    var _a = parseHSL(glowColor), h = _a.h, s = _a.s, l = _a.l;
    var base = h + 'deg ' + s + '% ' + l + '%';
    var opacities = [100, 60, 50, 40, 30, 20, 10];
    var keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    for (var i = 0; i < opacities.length; i++) {
      var val = Math.min(opacities[i] * intensity, 100);
      el.style.setProperty('--glow-color' + keys[i], 'hsl(' + base + ' / ' + val + '%)');
    }
  }

  var GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  var GRADIENT_KEYS   = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
  var COLOR_MAP       = [0, 1, 2, 0, 1, 2, 1];

  function setGradientVars(el, colors) {
    for (var i = 0; i < 7; i++) {
      var c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      el.style.setProperty(GRADIENT_KEYS[i], 'radial-gradient(at ' + GRADIENT_POSITIONS[i] + ', ' + c + ' 0px, transparent 50%)');
    }
    el.style.setProperty('--gradient-base', 'linear-gradient(' + colors[0] + ' 0 100%)');
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInCubic(x)  { return x * x * x; }

  function animateValue(opts) {
    var start    = opts.start || 0;
    var end      = opts.end || 100;
    var duration = opts.duration || 1000;
    var delay    = opts.delay || 0;
    var ease     = opts.ease || easeOutCubic;
    var onUpdate = opts.onUpdate;
    var onEnd    = opts.onEnd;
    var t0 = performance.now() + delay;
    function tick() {
      var elapsed = performance.now() - t0;
      var t = Math.min(elapsed / duration, 1);
      onUpdate(start + (end - start) * ease(t));
      if (t < 1) { requestAnimationFrame(tick); }
      else if (onEnd) { onEnd(); }
    }
    setTimeout(function () { requestAnimationFrame(tick); }, delay);
  }

  function initBorderGlow(card) {
    if (!card || card.classList.contains('border-glow--initialized')) return;
    card.classList.add('border-glow--initialized');

    var glowColor   = card.getAttribute('data-glow-color') || '40 80 80';
    var bgColor     = card.getAttribute('data-bg-color') || '#120F17';
    var sensitivity = parseFloat(card.getAttribute('data-edge-sensitivity')) || 30;
    var borderRadius = parseFloat(card.getAttribute('data-border-radius')) || 28;
    var glowRadius  = parseFloat(card.getAttribute('data-glow-radius')) || 40;
    var intensity   = parseFloat(card.getAttribute('data-glow-intensity')) || 1.0;
    var cone        = parseFloat(card.getAttribute('data-cone-spread')) || 25;
    var fillOpacity = parseFloat(card.getAttribute('data-fill-opacity')) || 0.5;
    var animated    = card.getAttribute('data-animated') === 'true';
    var colorsAttr  = card.getAttribute('data-colors');
    var colors      = colorsAttr ? colorsAttr.split(',') : ['#c084fc', '#f472b6', '#38bdf8'];

    card.style.setProperty('--card-bg', bgColor);
    card.style.setProperty('--edge-sensitivity', sensitivity);
    card.style.setProperty('--border-radius', borderRadius + 'px');
    card.style.setProperty('--glow-padding', glowRadius + 'px');
    card.style.setProperty('--cone-spread', cone);
    card.style.setProperty('--fill-opacity', fillOpacity);

    setGlowVars(card, glowColor, intensity);
    setGradientVars(card, colors);

    function getCenterOfElement(el) {
      var rect = el.getBoundingClientRect();
      return [rect.width / 2, rect.height / 2];
    }

    function getEdgeProximity(el, x, y) {
      var center = getCenterOfElement(el);
      var cx = center[0], cy = center[1];
      var dx = x - cx;
      var dy = y - cy;
      var kx = Infinity, ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    }

    function getCursorAngle(el, x, y) {
      var center = getCenterOfElement(el);
      var cx = center[0], cy = center[1];
      var dx = x - cx;
      var dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      var radians = Math.atan2(dy, dx);
      var degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    }

    function onPointerMove(e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var edge = getEdgeProximity(card, x, y);
      var angle = getCursorAngle(card, x, y);

      card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
      card.style.setProperty('--cursor-angle', angle.toFixed(3) + 'deg');
    }

    card.addEventListener('pointermove', onPointerMove);

    if (animated) {
      var angleStart = 110;
      var angleEnd   = 465;
      card.classList.add('sweep-active');
      card.style.setProperty('--cursor-angle', angleStart + 'deg');

      animateValue({
        duration: 500,
        onUpdate: function (v) { card.style.setProperty('--edge-proximity', v); }
      });
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: function (v) {
          var a = (angleEnd - angleStart) * (v / 100) + angleStart;
          card.style.setProperty('--cursor-angle', a + 'deg');
        }
      });
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: function (v) {
          var a = (angleEnd - angleStart) * (v / 100) + angleStart;
          card.style.setProperty('--cursor-angle', a + 'deg');
        }
      });
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: function (v) { card.style.setProperty('--edge-proximity', v); },
        onEnd: function () { card.classList.remove('sweep-active'); }
      });
    }
  }

  function initAllBorderGlow() {
    var cards = document.querySelectorAll('.border-glow-card');
    cards.forEach(initBorderGlow);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllBorderGlow);
  } else {
    initAllBorderGlow();
  }
})();
