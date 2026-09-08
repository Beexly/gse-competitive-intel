URL: https://balldontlie.io/script.js\nSTATUS: 200\n\n// Scroll Reveal Animation using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
  });
}

// Typewriter Effect
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = ['Developers', 'AI', 'Bettors', 'Claude', 'ChatGPT'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Morphing sports particle hero
function initParticleSportsHero() {
  const canvas = document.getElementById("particle-basketball");
  if (!canvas) return;

  const container = canvas.parentElement;

  try {
    setupParticleSportsRenderer(canvas, container);
  } catch (error) {
    showParticleSportsFallback(container, error);
  }
}

function showParticleSportsFallback(container, error) {
  if (error) console.warn(error);
  container.classList.remove("particle-renderer-ready");
  container.classList.add("particle-renderer-unavailable");
}

// Morphing sports particle cloud
function initParticleSports() {
  const canvas = document.getElementById("particle-sports");
  if (!canvas) return;

  const container = canvas.parentElement;
  let initializationStarted = false;
  let initializationScheduled = false;
  let prewarmObserver = null;
  let visibleObserver = null;

  function initializeRenderer() {
    if (initializationStarted) return;
    initializationStarted = true;
    if (prewarmObserver) prewarmObserver.disconnect();
    if (visibleObserver) visibleObserver.disconnect();

    try {
      setupParticleSportsRenderer(canvas, container);
    } catch (error) {
      showParticleSportsFallback(container, error);
    }
  }

  function scheduleInitialization() {
    if (initializationScheduled) return;
    initializationScheduled = true;

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initializeRenderer, { timeout: 450 });
    } else {
      window.requestAnimationFrame(() => {
        window.setTimeout(initializeRenderer, 0);
      });
    }
  }

  if (!("IntersectionObserver" in window)) {
    scheduleInitialization();
    return;
  }

  prewarmObserver = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      prewarmObserver.disconnect();
      scheduleInitialization();
    },
    { rootMargin: "900px 0px" },
  );
  prewarmObserver.observe(container);

  visibleObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) initializeRenderer();
  });
  visibleObserver.observe(container);
}

function setupParticleSportsRenderer(canvas, container) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    depth: false,
    premultipliedAlpha: false,
    powerPreference: "high-performance",
  });

  if (!gl) {
    throw new Error("WebGL is unavailable for the particle sports renderer");
  }

  if (gl.getParameter(gl.MAX_VERTEX_ATTRIBS) < 7) {
    throw new Error("Particle sports renderer needs 7 vertex attributes");
  }

  const vertexShaderSource = `
    precision highp float;

    attribute vec4 aBasketball;
    attribute vec4 aFootball;
    attribute vec4 aBaseball;
    attribute vec4 aRaceCar;
    attribute vec4 aNormalOctX;
    attribute vec4 aNormalOctY;
    attribute float aSeed;

    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uPointerStrength;
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uPointMultiplier;
    uniform float uOpacity;
    uniform vec3 uBrandPrimary;
    uniform vec3 uBrandSecondary;
    uniform vec3 uBrandTertiary;

    varying vec3 vColor;
    varying float vAlpha;

    mat3 rotateX(float angle) {
      float sine = sin(angle);
      float cosine = cos(angle);
      return mat3(
        1.0, 0.0, 0.0,
        0.0, cosine, -sine,
        0.0, sine, cosine
      );
    }

    mat3 rotateY(float angle) {
      float sine = sin(angle);
      float cosine = cos(angle);
      return mat3(
        cosine, 0.0, sine,
        0.0, 1.0, 0.0,
        -sine, 0.0, cosine
      );
    }

    mat3 rotateZ(float angle) {
      float sine = sin(angle);
      float cosine = cos(angle);
      return mat3(
        cosine, -sine, 0.0,
        sine, cosine, 0.0,
        0.0, 0.0, 1.0
      );
    }

    float randomValue(float value) {
      return fract(sin(value * 91.345 + 0.137) * 47453.5453);
    }

    vec4 selectShape(float shapeIndex) {
      if (shapeIndex < 0.5) return aBasketball;
      if (shapeIndex < 1.5) return aFootball;
      if (shapeIndex < 2.5) return aBaseball;
      return aRaceCar;
    }

    float selectComponent(vec4 values, float shapeIndex) {
      if (shapeIndex < 0.5) return values.x;
      if (shapeIndex < 1.5) return values.y;
      if (shapeIndex < 2.5) return values.z;
      return values.w;
    }

    vec3 decodeOctNormal(vec2 encoded) {
      vec3 normal = vec3(
        encoded.x,
        encoded.y,
        1.0 - abs(encoded.x) - abs(encoded.y)
      );
      if (normal.z < 0.0) {
        vec2 signs = step(vec2(0.0), normal.xy) * 2.0 - 1.0;
        normal.xy = (1.0 - abs(normal.yx)) * signs;
      }
      return normalize(normal);
    }

    vec3 selectNormal(float shapeIndex) {
      return decodeOctNormal(vec2(
        selectComponent(aNormalOctX, shapeIndex),
        selectComponent(aNormalOctY, shapeIndex)
      ));
    }

    float selectYaw(float shapeIndex) {
      if (shapeIndex < 0.5) return 0.52;
      if (shapeIndex < 1.5) return 0.12;
      if (shapeIndex < 2.5) return 0.52;
      return -0.34;
    }

    float selectPitch(float shapeIndex) {
      if (shapeIndex < 0.5) return -0.24;
      if (shapeIndex < 1.5) return -0.24;
      if (shapeIndex < 2.5) return -0.1;
      return -0.18;
    }

    float selectRoll(float shapeIndex) {
      if (shapeIndex < 0.5) return -0.13;
      if (shapeIndex < 1.5) return -0.11;
      if (shapeIndex < 2.5) return -0.16;
      return -0.025;
    }

    float selectSpin(float shapeIndex) {
      if (shapeIndex < 0.5) return 0.13;
      if (shapeIndex < 1.5) return 0.0;
      if (shapeIndex < 2.5) return 0.1;
      return 0.0;
    }

    float selectWobble(float shapeIndex) {
      if (shapeIndex < 0.5) return 0.0;
      if (shapeIndex < 1.5) return 0.105;
      if (shapeIndex < 2.5) return 0.0;
      return 0.025;
    }

    float selectDetailGain(float shapeIndex) {
      if (shapeIndex < 0.5) return 1.0;
      if (shapeIndex < 1.5) return 0.68;
      if (shapeIndex < 2.5) return 0.48;
      return 0.9;
    }

    void main() {
      const float shapeDuration = 5.8;
      float sequence = mod(uTime / shapeDuration, 4.0);
      float fromIndex = floor(sequence);
      float toIndex = mod(fromIndex + 1.0, 4.0);
      float localTime = fract(sequence);
      vec4 fromShape = selectShape(fromIndex);
      vec4 toShape = selectShape(toIndex);
      vec3 fromNormal = selectNormal(fromIndex);
      vec3 toNormal = selectNormal(toIndex);

      float particleNoise = randomValue(aSeed + 2.7);
      float secondaryNoise = randomValue(aSeed * 7.31 + 4.9);
      float tertiaryNoise = randomValue(aSeed * 13.73 + 1.7);
      float quaternaryNoise = randomValue(aSeed * 23.17 + 8.3);
      float flowSign = mod(fromIndex, 2.0) < 0.5 ? 1.0 : -1.0;
      float sourceSweep = smoothstep(
        -1.4,
        1.4,
        fromShape.x * flowSign
      );
      float targetSweep = smoothstep(
        -1.4,
        1.4,
        toShape.x * flowSign
      );
      float exitStart =
        0.30 + sourceSweep * 0.12 + particleNoise * 0.025;
      float exitEnd =
        0.48 + sourceSweep * 0.09 + particleNoise * 0.03;
      float enterStart =
        0.68 + targetSweep * 0.15 + secondaryNoise * 0.02;
      float enterEnd =
        0.84 + targetSweep * 0.085 + secondaryNoise * 0.025;
      float exitProgress = smoothstep(exitStart, exitEnd, localTime);
      float enterProgress = smoothstep(enterStart, enterEnd, localTime);
      float transitionField = exitProgress * (1.0 - enterProgress);
      float cloudAmount = smoothstep(0.12, 0.9, transitionField);
      float cloudTime = smoothstep(0.3, 0.7, localTime);
      float fromFootball =
        step(0.5, fromIndex) * (1.0 - step(1.5, fromIndex));
      float toFootball =
        step(0.5, toIndex) * (1.0 - step(1.5, toIndex));
      float footballAmount = mix(
        fromFootball,
        toFootball,
        enterProgress
      );
      float fromFootballLace =
        fromFootball *
        step(1.2, fromShape.w) *
        (1.0 - step(1.35, fromShape.w));
      float toFootballLace =
        toFootball *
        step(1.2, toShape.w) *
        (1.0 - step(1.35, toShape.w));
      float footballLaceAmount = mix(
        fromFootballLace,
        toFootballLace,
        enterProgress
      );
      float fromFootballStripe =
        fromFootball *
        step(1.025, fromShape.w) *
        (1.0 - step(1.2, fromShape.w));
      float toFootballStripe =
        toFootball *
        step(1.025, toShape.w) *
        (1.0 - step(1.2, toShape.w));
      float footballStripeAmount = mix(
        fromFootballStripe,
        toFootballStripe,
        enterProgress
      );
      float baseballAmount = mix(
        step(1.5, fromIndex) * (1.0 - step(2.5, fromIndex)),
        step(1.5, toIndex) * (1.0 - step(2.5, toIndex)),
        enterProgress
      );
      float raceCarAmount = mix(
        step(2.5, fromIndex),
        step(2.5, toIndex),
        enterProgress
      );
      float stream = particleNoise * 2.0 - 1.0;
      float cloudAngle = secondaryNoise * 6.2831853;
      float cloudRadius =
        (0.12 + sqrt(tertiaryNoise) * 0.5) *
        (0.38 + (1.0 - abs(stream)) * 0.62);
      float turbulencePhase =
        aSeed * 118.37 + uTime * (1.5 + tertiaryNoise * 1.7);
      vec3 dispersed = vec3(
        flowSign * (
          stream * 1.58 +
          0.14 * cloudTime +
          (cloudTime - 0.5) * 0.22
        ),
        cos(cloudAngle) * cloudRadius * 0.58,
        sin(cloudAngle) * cloudRadius * 1.12
      );
      dispersed.y +=
        sin(stream * 3.2 + fromIndex * 1.35) * 0.22;
      dispersed += vec3(
        sin(turbulencePhase * 0.73 + stream * 2.4) * 0.17,
        sin(turbulencePhase * 0.47 + stream * 4.1) * 0.1,
        cos(turbulencePhase * 0.61 - stream * 1.9) * 0.18
      ) * (0.55 + quaternaryNoise * 0.45);
      dispersed.y -=
        cloudTime * cloudTime * (0.04 + quaternaryNoise * 0.13);

      vec3 position = mix(fromShape.xyz, dispersed, exitProgress);
      position = mix(position, toShape.xyz, enterProgress);
      float peelFront =
        4.0 * exitProgress * (1.0 - exitProgress) *
        (1.0 - enterProgress);
      float formFront = 4.0 * enterProgress * (1.0 - enterProgress);
      float shockEnergy = max(
        peelFront * peelFront,
        formFront * formFront
      );
      float shockFlash = pow(shockEnergy, 1.8);
      float settlePhase = smoothstep(0.7, 1.0, localTime);
      float settleAmplitude = toIndex > 2.5 ? 0.065 : 0.045;
      float settleOvershoot =
        sin(settlePhase * 3.14159265) *
        settleAmplitude * enterProgress;
      position *= 1.0 + settleOvershoot;
      position *= mix(1.0, 1.12, raceCarAmount);
      float kind = mix(fromShape.w, toShape.w, enterProgress);
      float isSeam = step(0.5, kind) * (1.0 - step(1.5, kind));
      float isDust = step(1.5, kind);
      float raceCarAnchorAmount =
        raceCarAmount * step(1.15, kind) * (1.0 - step(1.35, kind));
      float raceCarHotAmount = raceCarAmount * step(1.35, kind);
      float raceCarFrontInterior =
        raceCarAmount *
        smoothstep(-1.42, -1.16, position.x) *
        (1.0 - smoothstep(-0.38, -0.12, position.x));
      float detailGain = mix(
        selectDetailGain(fromIndex),
        selectDetailGain(toIndex),
        enterProgress
      );
      isSeam *= 1.0 - cloudAmount;

      if (isDust > 0.5) {
        float drift = sin(uTime * 0.62 + aSeed * 47.0) * 0.025;
        position *= 1.0 + drift;
        float orbit = uTime * (0.22 + tertiaryNoise * 0.16) +
          aSeed * 27.0;
        position += vec3(
          cos(orbit) * (0.012 + particleNoise * 0.018),
          sin(orbit * 0.73) * 0.012,
          sin(orbit) * (0.014 + secondaryNoise * 0.02)
        ) * (1.0 - cloudAmount);
      }

      float yawBase = mix(
        selectYaw(fromIndex),
        selectYaw(toIndex),
        enterProgress
      );
      float pitchBase = mix(
        selectPitch(fromIndex),
        selectPitch(toIndex),
        enterProgress
      );
      float roll = mix(
        selectRoll(fromIndex),
        selectRoll(toIndex),
        enterProgress
      );
      float spin = mix(
        selectSpin(fromIndex),
        selectSpin(toIndex),
        enterProgress
      );
      float wobble = mix(
        selectWobble(fromIndex),
        selectWobble(toIndex),
        enterProgress
      );
      float yaw =
        yawBase +
        uTime * spin +
        sin(uTime * 0.29) * wobble +
        uPointer.x * 0.2;
      float pitch =
        pitchBase +
        sin(uTime * 0.34) * (0.035 + wobble * 0.22) -
        uPointer.y * 0.12;
      roll += cos(uTime * 0.23) * wobble * 0.18;
      mat3 rotation = rotateZ(roll) * rotateX(pitch) * rotateY(yaw);
      vec3 rotated = rotation * position;
      vec3 objectNormal = normalize(mix(
        fromNormal,
        toNormal,
        enterProgress
      ) + vec3(0.0001));
      vec3 normal = normalize(rotation * objectNormal);

      float front = smoothstep(-1.05, 0.68, rotated.z);
      front = mix(front, 0.74, cloudAmount);
      float perspective = 1.0 + rotated.z * 0.07;
      vec2 projected = rotated.xy * 0.84 * perspective;
      projected.x += uPointer.x * (0.018 + front * 0.012);
      projected.y -= uPointer.y * (0.012 + front * 0.008);
      projected.y += sin(uTime * 0.58) * 0.022;

      float aspectCorrection = uResolution.y / uResolution.x;
      vec2 pointerPosition = vec2(
        uPointer.x / aspectCorrection,
        -uPointer.y
      );
      vec2 pointerDelta = projected - pointerPosition;
      float pointerDistance = length(pointerDelta);
      float chaosPhase =
        aSeed * 118.37 + uTime * (1.8 + particleNoise * 2.6);
      float irregularRadius =
        0.28 +
        particleNoise * 0.17 +
        sin(chaosPhase * 0.47) * 0.025;
      float pointerField =
        1.0 - smoothstep(0.015, irregularRadius, pointerDistance);
      pointerField *= uPointerStrength;
      vec2 radialDirection = pointerDelta / max(pointerDistance, 0.001);
      vec2 tangentDirection = vec2(-radialDirection.y, radialDirection.x);
      float chaosAngle =
        (particleNoise - 0.5) * 4.2 +
        sin(chaosPhase) * 0.9 +
        sin(chaosPhase * 0.43) * 0.45;
      vec2 pointerScatterDirection =
        vec2(cos(chaosAngle), sin(chaosAngle));
      float burstPulse = 0.55 + sin(chaosPhase * 1.7) * 0.45;
      float participation = smoothstep(
        0.18,
        0.74,
        fract(particleNoise + aSeed * 7.13)
      );
      vec2 explosionDirection = normalize(
        radialDirection * (0.22 + particleNoise * 0.28) +
        tangentDirection * sin(chaosPhase * 0.81) * 0.35 +
        pointerScatterDirection * (0.7 + burstPulse * 0.4)
      );
      float explosionStrength =
        pointerField *
        participation *
        (0.11 + particleNoise * 0.38) *
        (0.65 + burstPulse * 0.55);
      projected +=
        radialDirection * pointerField *
        (0.065 + particleNoise * 0.055);
      projected += explosionDirection * explosionStrength;

      gl_Position = vec4(
        projected.x * aspectCorrection,
        projected.y,
        0.0,
        1.0
      );

      vec3 lightDirection = normalize(vec3(-0.48, 0.72, 1.0));
      float diffuse = max(dot(normal, lightDirection), 0.0);
      float rim = pow(1.0 - abs(normal.z), 2.0);

      float gradientPosition = smoothstep(-0.82, 0.78, rotated.y);
      vec3 surfaceColor = mix(
        uBrandSecondary,
        uBrandPrimary,
        gradientPosition
      );
      float cyanLight = smoothstep(
        0.12,
        1.0,
        dot(normal, normalize(vec3(-0.8, 0.45, 0.9)))
      );
      surfaceColor = mix(
        surfaceColor,
        uBrandTertiary,
        cyanLight * 0.68
      );
      surfaceColor *= 0.38 + diffuse * 0.95 + rim * 0.24;

      float footballPanelParity = step(0.0, position.y * position.z);
      vec3 footballPanelA = mix(surfaceColor, uBrandPrimary, 0.18);
      vec3 footballPanelB = mix(surfaceColor, uBrandSecondary, 0.5);
      vec3 footballShellColor = mix(
        footballPanelA,
        footballPanelB,
        footballPanelParity
      );
      float footballSweepPhase =
        abs(fract(position.x * 0.23 - uTime * 0.08) - 0.5);
      float footballSweep =
        1.0 - smoothstep(0.025, 0.11, footballSweepPhase);
      footballShellColor = mix(
        footballShellColor,
        uBrandTertiary,
        footballSweep * 0.46
      );
      surfaceColor = mix(
        surfaceColor,
        footballShellColor,
        footballAmount
      );
      vec3 raceCarShellColor = mix(
        surfaceColor,
        uBrandPrimary,
        0.1 + rim * 0.12
      );
      raceCarShellColor = mix(
        raceCarShellColor,
        uBrandTertiary,
        0.1 + cyanLight * 0.2
      );
      float raceCarGlassMask =
        raceCarAmount *
        smoothstep(-0.55, -0.28, position.x) *
        (1.0 - smoothstep(0.68, 0.88, position.x)) *
        smoothstep(0.025, 0.15, position.y) *
        (1.0 - smoothstep(0.15, 0.31, abs(position.z)));
      vec3 raceCarGlassColor = mix(
        vec3(0.012, 0.035, 0.14),
        uBrandSecondary,
        0.18 + rim * 0.08
      );
      raceCarShellColor = mix(
        raceCarShellColor,
        raceCarGlassColor,
        raceCarGlassMask * 0.82
      );
      float raceCarWheelShade =
        raceCarAmount *
        (1.0 - smoothstep(0.12, 0.31,
          min(abs(position.x - 0.78), abs(position.x + 0.78)))) *
        (1.0 - smoothstep(-0.2, 0.025, position.y)) *
        smoothstep(0.25, 0.39, abs(position.z));
      raceCarShellColor = mix(
        raceCarShellColor,
        vec3(0.008, 0.045, 0.12),
        raceCarWheelShade * 0.7
      );
      surfaceColor = mix(
        surfaceColor,
        raceCarShellColor,
        raceCarAmount
      );

      vec3 seamColor = mix(
        uBrandTertiary,
        vec3(0.82, 0.9, 1.0),
        0.26 + diffuse * 0.42
      );
      vec3 footballLaceColor = mix(
        uBrandTertiary,
        vec3(0.92, 0.98, 1.0),
        0.36 + diffuse * 0.26
      );
      vec3 footballStripeColor = mix(
        uBrandTertiary,
        vec3(0.84, 0.97, 1.0),
        0.78 + diffuse * 0.18
      );
      seamColor = mix(
        seamColor,
        footballStripeColor,
        footballStripeAmount
      );
      seamColor = mix(
        seamColor,
        footballLaceColor,
        footballLaceAmount
      );
      vec3 raceCarAnchorColor = mix(
        uBrandTertiary,
        vec3(0.78, 0.96, 1.0),
        0.48 + diffuse * 0.36
      );
      vec3 raceCarHotColor = mix(
        uBrandTertiary,
        vec3(0.96, 0.995, 1.0),
        0.82
      );
      seamColor = mix(
        seamColor,
        raceCarAnchorColor,
        raceCarAnchorAmount
      );
      seamColor = mix(
        seamColor,
        raceCarHotColor,
        raceCarHotAmount
      );
      vec3 baseballThreadColor = mix(
        vec3(0.72, 0.025, 0.12),
        vec3(1.0, 0.3, 0.34),
        0.28 + diffuse * 0.52
      );
      seamColor = mix(seamColor, baseballThreadColor, baseballAmount);
      vec3 dustColor = mix(
        uBrandPrimary,
        uBrandSecondary,
        aSeed
      );
      dustColor = mix(dustColor, uBrandTertiary, diffuse * 0.48);
      float raceCarWakeCore =
        raceCarAmount *
        (1.0 - smoothstep(0.04, 0.3, abs(position.z)));
      vec3 raceCarWakeColor = mix(
        uBrandTertiary,
        vec3(0.86, 0.98, 1.0),
        0.32 + raceCarWakeCore * 0.5
      );
      dustColor = mix(dustColor, raceCarWakeColor, raceCarAmount * 0.78);

      vec3 cloudColor = mix(
        uBrandPrimary,
        uBrandSecondary,
        0.24 + particleNoise * 0.58
      );
      cloudColor = mix(
        cloudColor,
        uBrandTertiary,
        0.24 + tertiaryNoise * 0.32
      );

      vColor = mix(surfaceColor, seamColor, isSeam);
      vColor = mix(vColor, dustColor, isDust);
      vColor = mix(vColor, cloudColor, cloudAmount);
      float glintMask = smoothstep(
        0.9975,
        0.9995,
        randomValue(aSeed * 31.7 + 8.1)
      );
      float glintPulse = pow(
        0.5 + 0.5 * sin(uTime * 3.1 + aSeed * 211.0),
        10.0
      );
      float glint =
        glintMask * (0.18 + glintPulse * 0.82) *
        (1.0 - cloudAmount);
      float highlight = clamp(
        shockFlash * 0.72 + glint * 0.78,
        0.0,
        1.0
      );
      vColor = mix(vColor, vec3(0.88, 0.97, 1.0), highlight);

      float shimmer = 0.76 + sin(aSeed * 83.0 + uTime * 1.7) * 0.24;
      float surfaceAlpha = mix(0.16, 0.9, front) * shimmer;
      surfaceAlpha *= mix(
        1.0,
        1.13,
        footballAmount * footballSweep
      );
      surfaceAlpha *= mix(1.0, 1.42, raceCarAmount);
      surfaceAlpha *= mix(1.0, 0.66, raceCarFrontInterior);
      float footballSeamDepth =
        0.035 + 0.965 * smoothstep(-0.12, 0.25, rotated.z);
      float baseballSeamDepth =
        0.055 + 0.945 * smoothstep(-0.2, 0.28, rotated.z);
      float seamDepth = mix(1.0, footballSeamDepth, footballAmount);
      seamDepth = mix(seamDepth, baseballSeamDepth, baseballAmount);
      float footballFeatureGain = mix(1.0, 0.76, footballAmount);
      footballFeatureGain = mix(
        footballFeatureGain,
        1.45,
        footballStripeAmount
      );
      footballFeatureGain = mix(
        footballFeatureGain,
        0.78,
        footballLaceAmount
      );
      float seamAlpha =
        mix(0.34, 1.0, front) *
        shimmer *
        detailGain *
        seamDepth *
        footballFeatureGain;
      seamAlpha *= mix(1.0, 0.84, raceCarAmount);
      seamAlpha *= mix(
        1.0,
        1.2,
        max(raceCarAnchorAmount, raceCarHotAmount)
      );
      seamAlpha *= mix(1.0, 0.72, raceCarFrontInterior);
      float dustAlpha = mix(0.05, 0.22, front) * shimmer;
      dustAlpha *= mix(1.0, 2.15, raceCarAmount);
      vAlpha = mix(surfaceAlpha, seamAlpha, isSeam);
      vAlpha = mix(vAlpha, dustAlpha, isDust);
      float cloudAlpha =
        (0.22 + pow(tertiaryNoise, 0.72) * 0.42) * shimmer;
      vAlpha = mix(vAlpha, cloudAlpha, cloudAmount);
      vAlpha *= 1.0 + shockFlash * 0.24 + glint * 0.5;
      vAlpha *= uOpacity;

      float pointSize = mix(
        1.25,
        1.25 + 0.6 * detailGain,
        isSeam
      );
      pointSize *= mix(1.0, 0.94, footballAmount * isSeam);
      pointSize *= mix(1.0, 0.95, footballLaceAmount);
      pointSize *= mix(1.0, 1.18, footballStripeAmount);
      pointSize *= mix(
        1.0,
        1.1,
        footballAmount * footballSweep * (1.0 - isSeam)
      );
      pointSize *= mix(1.0, 0.9, raceCarAmount * isSeam);
      pointSize *= mix(
        1.0,
        1.15,
        max(raceCarAnchorAmount, raceCarHotAmount)
      );
      pointSize *= mix(
        1.0,
        1.12,
        raceCarAmount * (1.0 - isSeam)
      );
      pointSize = mix(pointSize, 0.9, isDust);
      pointSize *= mix(1.0, 1.22, raceCarAmount * isDust);
      pointSize = mix(
        pointSize,
        0.66 + pow(quaternaryNoise, 2.4) * 1.02,
        cloudAmount
      );
      pointSize += shockFlash * 0.48 + glint * 0.55;
      pointSize *= mix(0.72, 1.28, smoothstep(-1.0, 1.0, rotated.z));
      gl_PointSize = pointSize * uPixelRatio * uPointMultiplier;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;

    uniform float uSoftPass;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      float distanceFromCenter = length(gl_PointCoord - vec2(0.5)) * 2.0;
      if (distanceFromCenter > 1.0) {
        discard;
      }

      float core = smoothstep(1.0, 0.08, distanceFromCenter);
      float glow = exp(-3.25 * distanceFromCenter * distanceFromCenter);
      float particleAlpha = mix(core * core, glow, uSoftPass) * vAlpha;
      gl_FragColor = vec4(vColor, particleAlpha);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const message = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Unable to compile particle shader: ${message}`);
    }

    return shader;
  }

  function createProgram() {
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const message = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(`Unable to link particle shaders: ${message}`);
    }

    return program;
  }

  function createRandom(seed) {
    let value = seed >>> 0;
    return function random() {
      value += 0x6d2b79f5;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function normalizePoint(x, y, z) {
    const length = Math.sqrt(x * x + y * y + z * z);
    return {
      x: x / length,
      y: y / length,
      z: z / length,
    };
  }

  function pushPoint(target, x, y, z) {
    target.push(x, y, z);
  }

  const compact =
    window.innerWidth <= 768 || window.matchMedia("(pointer: coarse)").matches;
  const surfaceCandidateCount = compact ? 26000 : 64000;
  const curvedSeamPointCount = compact ? 1500 : 2900;
  const greatCirclePointCount = compact ? 950 : 1750;
  const dustPointCount = compact ? 1200 : 3200;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  function createBasketballParts() {
    const surface = [];
    const detail = [];
    const dust = [];
    const random = createRandom(0x0bd1ba11);
    const curvedSeam = [];

    const enneperRadius = 1.08;
    for (let index = 0; index < curvedSeamPointCount; index++) {
      const angle = (index / curvedSeamPointCount) * Math.PI * 2;
      const u = enneperRadius * Math.cos(angle);
      const v = enneperRadius * Math.sin(angle);
      const point = normalizePoint(
        u - (u * u * u) / 3 + u * v * v,
        v - (v * v * v) / 3 + v * u * u,
        u * u - v * v,
      );
      curvedSeam.push(point);
    }

    const curveCellSize = 0.07;
    const curveGridWidth = 64;
    const curveBuckets = new Map();

    function curveCell(value) {
      return Math.floor((value + 1.1) / curveCellSize);
    }

    function curveCellKey(x, y, z) {
      return x + y * curveGridWidth + z * curveGridWidth * curveGridWidth;
    }

    curvedSeam.forEach((point) => {
      const key = curveCellKey(
        curveCell(point.x),
        curveCell(point.y),
        curveCell(point.z),
      );
      const bucket = curveBuckets.get(key);
      if (bucket) {
        bucket.push(point);
      } else {
        curveBuckets.set(key, [point]);
      }
    });

    function isNearCurvedSeam(x, y, z) {
      const cellX = curveCell(x);
      const cellY = curveCell(y);
      const cellZ = curveCell(z);
      const thresholdSquared = 0.037 * 0.037;

      for (let offsetX = -1; offsetX <= 1; offsetX++) {
        for (let offsetY = -1; offsetY <= 1; offsetY++) {
          for (let offsetZ = -1; offsetZ <= 1; offsetZ++) {
            const bucket = curveBuckets.get(
              curveCellKey(
                cellX + offsetX,
                cellY + offsetY,
                cellZ + offsetZ,
              ),
            );
            if (!bucket) continue;

            for (const point of bucket) {
              const deltaX = x - point.x;
              const deltaY = y - point.y;
              const deltaZ = z - point.z;
              if (
                deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ <
                thresholdSquared
              ) {
                return true;
              }
            }
          }
        }
      }

      return false;
    }

    for (let index = 0; index < surfaceCandidateCount; index++) {
      const baseY = 1 - (2 * (index + 0.5)) / surfaceCandidateCount;
      const y = Math.max(
        -1,
        Math.min(1, baseY + (random() - 0.5) * 0.004),
      );
      const radial = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = goldenAngle * index + (random() - 0.5) * 0.022;
      const radius = 1 + (random() - 0.5) * 0.011;
      const x = Math.cos(angle) * radial;
      const z = Math.sin(angle) * radial;
      const greatCircleDistance = Math.min(Math.abs(x), Math.abs(y));

      if (
        greatCircleDistance > 0.031 &&
        !isNearCurvedSeam(x, y, z)
      ) {
        pushPoint(surface, x * radius, y * radius, z * radius);
      }
    }

    for (let circle = 0; circle < 2; circle++) {
      for (let index = 0; index < greatCirclePointCount; index++) {
        const angle =
          (index / greatCirclePointCount) * Math.PI * 2 +
          (random() - 0.5) * 0.004;
        const planeOffset = (random() - 0.5) * 0.016;
        let x;
        let y;
        let z;

        if (circle === 0) {
          x = Math.cos(angle);
          y = planeOffset;
          z = Math.sin(angle);
        } else {
          x = planeOffset;
          y = Math.cos(angle);
          z = Math.sin(angle);
        }

        const point = normalizePoint(x, y, z);
        const radius = 1.012 + (random() - 0.5) * 0.009;
        pushPoint(
          detail,
          point.x * radius,
          point.y * radius,
          point.z * radius,
        );
      }
    }

    curvedSeam.forEach((point) => {
      const jitteredPoint = normalizePoint(
        point.x + (random() - 0.5) * 0.009,
        point.y + (random() - 0.5) * 0.009,
        point.z + (random() - 0.5) * 0.009,
      );
      const radius = 1.012 + (random() - 0.5) * 0.009;
      pushPoint(
        detail,
        jitteredPoint.x * radius,
        jitteredPoint.y * radius,
        jitteredPoint.z * radius,
      );
    });

    for (let index = 0; index < dustPointCount; index++) {
      const y = random() * 2 - 1;
      const radial = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = random() * Math.PI * 2;
      const radius = 1.07 + Math.pow(random(), 1.8) * 0.48;
      pushPoint(
        dust,
        Math.cos(angle) * radial * radius,
        y * radius,
        Math.sin(angle) * radial * radius,
      );
    }

    return { surface, detail, dust };
  }

  function jitteredSpherePoint(index, count, random) {
    const baseY = 1 - (2 * (index + 0.5)) / count;
    const y = Math.max(
      -1,
      Math.min(1, baseY + (random() - 0.5) * 0.004),
    );
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = goldenAngle * index + (random() - 0.5) * 0.022;
    return {
      x: Math.cos(angle) * radial,
      y,
      z: Math.sin(angle) * radial,
    };
  }

  const footballHalfLength = 1.31;
  const footballMaxRadius = 0.78;
  const footballProfileExponent = 0.68;
  const footballProfileCdfSteps = 4096;
  const footballPanelKind = 1;
  const footballStripeKind = 1.08;
  const footballLaceKind = 1.25;
  const footballEndStripeAxials = [-0.58, 0.58];
  const footballEyeletAxials = Array.from(
    { length: 6 },
    (_, index) => -0.32 + (index / 5) * 0.64,
  );

  function footballCrossRadius(axial) {
    const clampedAxial = Math.max(-1, Math.min(1, axial));
    return (
      footballMaxRadius *
      Math.pow(
        Math.max(0, 1 - clampedAxial * clampedAxial),
        footballProfileExponent,
      )
    );
  }

  function footballCrossRadiusDerivative(axial) {
    const clampedAxial = Math.max(-0.99999, Math.min(0.99999, axial));
    return (
      -2 *
      footballMaxRadius *
      footballProfileExponent *
      clampedAxial *
      Math.pow(
        Math.max(0.00001, 1 - clampedAxial * clampedAxial),
        footballProfileExponent - 1,
      )
    );
  }

  function footballNormalFromAxialAngle(axial, angle) {
    return normalizePoint(
      -footballCrossRadiusDerivative(axial),
      footballHalfLength * Math.cos(angle),
      footballHalfLength * Math.sin(angle),
    );
  }

  function footballPointFromAxialAngle(axial, angle, lift = 0) {
    const crossRadius = footballCrossRadius(axial);
    const normal = footballNormalFromAxialAngle(axial, angle);
    return {
      x: axial * footballHalfLength + normal.x * lift,
      y: Math.cos(angle) * crossRadius + normal.y * lift,
      z: Math.sin(angle) * crossRadius + normal.z * lift,
      normal,
    };
  }

  function footballFrontPoint(axial, y, lift = 0) {
    const crossRadius = footballCrossRadius(axial);
    const limitedY = Math.max(-crossRadius, Math.min(crossRadius, y));
    const z = Math.sqrt(
      Math.max(0, crossRadius * crossRadius - limitedY * limitedY),
    );
    const angle = Math.atan2(z, limitedY);
    return footballPointFromAxialAngle(axial, angle, lift);
  }

  function transformFootballPoint(point, radius = 1) {
    const axial = Math.max(-1, Math.min(1, point.x));
    const inputRadial = Math.sqrt(point.y * point.y + point.z * point.z);
    const crossRadius = footballCrossRadius(axial);
    return {
      x: axial * footballHalfLength * radius,
      y:
        (point.y / Math.max(inputRadial, 0.0001)) *
        crossRadius *
        radius,
      z:
        (point.z / Math.max(inputRadial, 0.0001)) *
        crossRadius *
        radius,
    };
  }

  function createFootballProfileCdf(extent, surfaceWeighted) {
    const cdf = new Float64Array(footballProfileCdfSteps + 1);
    let previousAxial = -extent;
    let previousRadius = footballCrossRadius(previousAxial);
    let totalWeight = 0;

    for (let index = 1; index <= footballProfileCdfSteps; index++) {
      const axial =
        -extent + (index / footballProfileCdfSteps) * extent * 2;
      const crossRadius = footballCrossRadius(axial);
      const segmentLength = Math.hypot(
        (axial - previousAxial) * footballHalfLength,
        crossRadius - previousRadius,
      );
      const segmentWeight = surfaceWeighted
        ? ((previousRadius + crossRadius) * 0.5) * segmentLength
        : segmentLength;
      totalWeight += segmentWeight;
      cdf[index] = totalWeight;
      previousAxial = axial;
      previousRadius = crossRadius;
    }

    for (let index = 1; index <= footballProfileCdfSteps; index++) {
      cdf[index] /= totalWeight;
    }

    return { cdf, extent };
  }

  function footballAxialAtProgress(profile, progress) {
    const normalizedProgress = Math.max(0, Math.min(1, progress));
    let lower = 1;
    let upper = profile.cdf.length - 1;

    while (lower < upper) {
      const middle = Math.floor((lower + upper) * 0.5);
      if (profile.cdf[middle] < normalizedProgress) {
        lower = middle + 1;
      } else {
        upper = middle;
      }
    }

    const upperIndex = lower;
    const lowerIndex = upperIndex - 1;
    const segmentWeight =
      profile.cdf[upperIndex] - profile.cdf[lowerIndex];
    const segmentProgress =
      segmentWeight > 0
        ? (normalizedProgress - profile.cdf[lowerIndex]) /
          segmentWeight
        : 0;
    return (
      -profile.extent +
      ((lowerIndex + segmentProgress) /
        (profile.cdf.length - 1)) *
        profile.extent *
        2
    );
  }

  const footballSurfaceCdf = createFootballProfileCdf(0.99999, true);
  const footballPanelCdf = createFootballProfileCdf(0.96, false);

  function footballPanelGrooveTaper(axial) {
    const linear = Math.max(
      0,
      Math.min(1, (0.985 - Math.abs(axial)) / 0.105),
    );
    return linear * linear * (3 - 2 * linear);
  }

  function isNearFootballEndStripe(axial) {
    return footballEndStripeAxials.some(
      (stripeAxial) => Math.abs(axial - stripeAxial) < 0.026,
    );
  }

  function footballLaceHalfWidth(axial) {
    const centered = Math.max(
      0,
      1 - Math.abs(axial) / Math.abs(footballEyeletAxials[0]),
    );
    return 0.102 + Math.sin(centered * Math.PI * 0.5) * 0.016;
  }

  function isInFootballPanelGroove(axial, y, z) {
    return (
      Math.min(Math.abs(y), Math.abs(z)) <
      0.014 * footballPanelGrooveTaper(axial)
    );
  }

  function isInFootballEyelet(x, y, z) {
    if (z <= 0) return false;

    for (const axial of footballEyeletAxials) {
      const deltaX = (x - axial * footballHalfLength) / 0.019;
      const laceHalfWidth = footballLaceHalfWidth(axial);
      for (const side of [-1, 1]) {
        const deltaY = (y - side * laceHalfWidth) / 0.014;
        if (deltaX * deltaX + deltaY * deltaY < 1) return true;
      }
    }

    return false;
  }

  function primitiveProgress(index, count, primitiveCount) {
    const primitive = index % primitiveCount;
    const ordinal = Math.floor(index / primitiveCount);
    const primitivePointCount =
      Math.floor((count - 1 - primitive) / primitiveCount) + 1;
    return {
      primitive,
      progress:
        primitivePointCount <= 1
          ? 0.5
          : ordinal / (primitivePointCount - 1),
    };
  }

  function createFootballParts(counts) {
    const surface = [];
    const detail = [];
    const dust = [];
    const surfaceNormals = [];
    const detailNormals = [];
    const dustNormals = [];
    const detailKinds = [];
    const random = createRandom(0x0bd1f007);
    const twoPi = Math.PI * 2;

    function pushFootballDetail(point, kind) {
      pushPointWithNormal(
        detail,
        detailNormals,
        point.x,
        point.y,
        point.z,
        point.normal.x,
        point.normal.y,
        point.normal.z,
      );
      detailKinds.push(kind);
    }

    for (let index = 0; surface.length / 3 < counts.surface; index++) {
      const axialProgress =
        0.5 + index * 0.7548776662466927;
      const axial = footballAxialAtProgress(
        footballSurfaceCdf,
        axialProgress - Math.floor(axialProgress),
      );
      const angle =
        random() * twoPi +
        (random() - 0.5) * 0.004;
      const basePoint = footballPointFromAxialAngle(axial, angle);

      if (
        isInFootballPanelGroove(axial, basePoint.y, basePoint.z) ||
        isInFootballEyelet(basePoint.x, basePoint.y, basePoint.z) ||
        isNearFootballEndStripe(axial)
      ) {
        continue;
      }

      const grainLift = (random() - 0.5) * 0.003;
      pushPointWithNormal(
        surface,
        surfaceNormals,
        basePoint.x + basePoint.normal.x * grainLift,
        basePoint.y + basePoint.normal.y * grainLift,
        basePoint.z + basePoint.normal.z * grainLift,
        basePoint.normal.x,
        basePoint.normal.y,
        basePoint.normal.z,
      );
    }

    const endStripeCount = Math.floor(counts.detail * 0.28);
    for (let index = 0; index < endStripeCount; index++) {
      const sample = primitiveProgress(
        index,
        endStripeCount,
        footballEndStripeAxials.length,
      );
      const axial =
        footballEndStripeAxials[sample.primitive] +
        (random() + random() - 1) * 0.026;
      const stripeAngle = sample.progress * twoPi;
      const point = footballPointFromAxialAngle(
        axial,
        stripeAngle,
        0.012 + (random() - 0.5) * 0.002,
      );
      pushFootballDetail(point, footballStripeKind);
    }

    const panelShoulderCount = Math.floor(counts.detail * 0.2);
    for (let index = 0; index < panelShoulderCount; index++) {
      const sample = primitiveProgress(index, panelShoulderCount, 8);
      const panel = Math.floor(sample.primitive / 2);
      const side = sample.primitive % 2 === 0 ? -1 : 1;
      const axial = footballAxialAtProgress(
        footballPanelCdf,
        sample.progress,
      );
      const crossRadius = footballCrossRadius(axial);
      const angle =
        panel * Math.PI * 0.5 +
        side * (0.018 / Math.max(crossRadius, 0.08));
      const point = footballPointFromAxialAngle(
        axial,
        angle,
        0.0025 + (random() - 0.5) * 0.001,
      );
      pushFootballDetail(point, footballPanelKind);
    }

    const laceBedCount = Math.floor(counts.detail * 0.08);
    for (let index = 0; index < laceBedCount; index++) {
      const sample = primitiveProgress(index, laceBedCount, 2);
      const side = sample.primitive === 0 ? -1 : 1;
      const axial = -0.48 + sample.progress * 0.96;
      const bedProfile = Math.max(
        0,
        1 - (axial / 0.48) * (axial / 0.48),
      );
      const y = side * 0.145 * Math.pow(bedProfile, 0.44);
      const point = footballFrontPoint(
        axial,
        y,
        0.003 + (random() - 0.5) * 0.001,
      );
      pushFootballDetail(point, footballPanelKind);
    }

    const longitudinalLaceCount = Math.floor(counts.detail * 0.16);
    for (let index = 0; index < longitudinalLaceCount; index++) {
      const sample = primitiveProgress(index, longitudinalLaceCount, 6);
      const ribbon = Math.floor(sample.primitive / 3);
      const lane = sample.primitive % 3;
      const side = ribbon === 0 ? -1 : 1;
      const axial = -0.405 + sample.progress * 0.81;
      const endTaper =
        0.35 +
        0.65 *
          Math.pow(Math.max(0, Math.sin(sample.progress * Math.PI)), 0.3);
      const y =
        side * 0.018 +
        (lane - 1) * 0.008 * endTaper +
        (random() - 0.5) * 0.0015;
      const lift =
        0.018 +
        (lane === 1 ? 0.004 : 0) +
        Math.sin(sample.progress * Math.PI) * 0.003;
      pushFootballDetail(
        footballFrontPoint(axial, y, lift),
        footballLaceKind,
      );
    }

    const transverseLaceCount =
      counts.detail -
      endStripeCount -
      panelShoulderCount -
      laceBedCount -
      longitudinalLaceCount;
    for (let index = 0; index < transverseLaceCount; index++) {
      const sample = primitiveProgress(
        index,
        transverseLaceCount,
        footballEyeletAxials.length * 3,
      );
      const laceIndex = Math.floor(sample.primitive / 3);
      const lane = sample.primitive % 3;
      const across = sample.progress * 2 - 1;
      const arch = Math.max(0, 1 - across * across);
      const widthTaper =
        0.28 + 0.72 * Math.pow(arch, 0.35);
      const laceAxial = footballEyeletAxials[laceIndex];
      const laceHalfWidth = footballLaceHalfWidth(laceAxial);
      const x =
        laceAxial * footballHalfLength +
        (lane - 1) * 0.021 * widthTaper +
        arch * 0.014 +
        (random() - 0.5) * 0.0015;
      const axial = x / footballHalfLength;
      const y =
        across * laceHalfWidth + (random() - 0.5) * 0.0015;
      const lift =
        0.008 +
        0.027 * Math.pow(arch, 0.82) +
        (lane === 1 ? 0.003 : 0);
      pushFootballDetail(
        footballFrontPoint(axial, y, lift),
        footballLaceKind,
      );
    }

    if (
      detail.length / 3 !== counts.detail ||
      detailKinds.length !== counts.detail
    ) {
      throw new Error("Football detail particle allocation does not match");
    }

    for (let index = 0; index < counts.dust; index++) {
      const y = random() * 2 - 1;
      const radial = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = random() * Math.PI * 2;
      const base = {
        x: Math.cos(angle) * radial,
        y,
        z: Math.sin(angle) * radial,
      };
      const radius = 1.07 + Math.pow(random(), 1.8) * 0.48;
      const transformed = transformFootballPoint(base, radius);
      const normal = footballNormalFromAxialAngle(
        base.x,
        Math.atan2(base.z, base.y),
      );
      pushPointWithNormal(
        dust,
        dustNormals,
        transformed.x,
        transformed.y,
        transformed.z,
        normal.x,
        normal.y,
        normal.z,
      );
    }

    return {
      surface,
      detail,
      dust,
      surfaceNormals,
      detailNormals,
      dustNormals,
      detailKinds,
    };
  }

  const baseballSeamPeriod = Math.PI * 4;
  const baseballSeamShape = 0.4;

  function baseballSeamPoint(parameter) {
    const polar =
      Math.PI * 0.5 -
      (Math.PI * 0.5 - baseballSeamShape) * Math.cos(parameter);
    const azimuth =
      parameter * 0.5 +
      baseballSeamShape * Math.sin(parameter * 2);
    const polarRadius = Math.sin(polar);
    return {
      x: polarRadius * Math.cos(azimuth),
      y: polarRadius * Math.sin(azimuth),
      z: Math.cos(polar),
    };
  }

  function createBaseballSeamCdf() {
    const steps = 2048;
    const cdf = new Float32Array(steps + 1);
    let previous = baseballSeamPoint(0);
    let totalLength = 0;

    for (let index = 1; index <= steps; index++) {
      const parameter = (index / steps) * baseballSeamPeriod;
      const point = baseballSeamPoint(parameter);
      totalLength += Math.hypot(
        point.x - previous.x,
        point.y - previous.y,
        point.z - previous.z,
      );
      cdf[index] = totalLength;
      previous = point;
    }

    for (let index = 1; index <= steps; index++) {
      cdf[index] /= totalLength;
    }

    return cdf;
  }

  const baseballSeamCdf = createBaseballSeamCdf();

  function baseballSeamParameterAtProgress(progress) {
    const normalizedProgress = ((progress % 1) + 1) % 1;
    let lower = 1;
    let upper = baseballSeamCdf.length - 1;

    while (lower < upper) {
      const middle = Math.floor((lower + upper) * 0.5);
      if (baseballSeamCdf[middle] < normalizedProgress) {
        lower = middle + 1;
      } else {
        upper = middle;
      }
    }

    const upperIndex = lower;
    const lowerIndex = upperIndex - 1;
    const segmentLength =
      baseballSeamCdf[upperIndex] - baseballSeamCdf[lowerIndex];
    const withinSegment =
      segmentLength > 0
        ? (normalizedProgress - baseballSeamCdf[lowerIndex]) /
          segmentLength
        : 0;
    return (
      ((lowerIndex + withinSegment) / (baseballSeamCdf.length - 1)) *
      baseballSeamPeriod
    );
  }

  function baseballSeamFrame(parameter) {
    const point = baseballSeamPoint(parameter);
    const before = baseballSeamPoint(parameter - 0.0005);
    const after = baseballSeamPoint(parameter + 0.0005);
    const tangent = normalizePoint(
      after.x - before.x,
      after.y - before.y,
      after.z - before.z,
    );
    const across = normalizePoint(
      point.y * tangent.z - point.z * tangent.y,
      point.z * tangent.x - point.x * tangent.z,
      point.x * tangent.y - point.y * tangent.x,
    );
    return { point, tangent, across };
  }

  function createBaseballParts(counts) {
    const surface = [];
    const detail = [];
    const dust = [];
    const random = createRandom(0x0bd1ba5e);
    const candidateCount = counts.surface;

    for (let index = 0; index < counts.surface; index++) {
      const base = jitteredSpherePoint(index, candidateCount, random);
      const radius = 1 + (random() - 0.5) * 0.011;
      pushPoint(
        surface,
        base.x * radius,
        base.y * radius,
        base.z * radius,
      );
    }

    const seamLineCount = Math.floor(counts.detail * 0.16);
    for (let index = 0; index < seamLineCount; index++) {
      const seamProgress =
        (index + (random() - 0.5) * 0.32) / seamLineCount;
      const parameter = baseballSeamParameterAtProgress(seamProgress);
      const point = baseballSeamPoint(parameter);
      const radius = 1.007 + (random() - 0.5) * 0.004;
      pushPoint(
        detail,
        point.x * radius,
        point.y * radius,
        point.z * radius,
      );
    }

    const stitchCount = counts.detail - seamLineCount;
    const stitchTotal = 108;
    const stitchArmCount = stitchTotal * 2;
    for (let index = 0; index < stitchCount; index++) {
      const armIndex = index % stitchArmCount;
      const stitchIndex = Math.floor(armIndex / 2);
      const side = armIndex % 2 === 0 ? -1 : 1;
      const pointIndex = Math.floor(index / stitchArmCount);
      const armPointCount =
        Math.floor((stitchCount - 1 - armIndex) / stitchArmCount) + 1;
      const armProgress =
        armPointCount === 1
          ? 0.5
          : pointIndex / (armPointCount - 1);
      const parameter = baseballSeamParameterAtProgress(
        (stitchIndex + 0.5) / stitchTotal,
      );
      const frame = baseballSeamFrame(parameter);
      const acrossOffset = side * (0.006 + armProgress * 0.07);
      const alongOffset =
        armProgress * 0.038 +
        Math.sin(armProgress * Math.PI) * 0.006;
      const jitter = (random() - 0.5) * 0.0025;
      const point = normalizePoint(
        frame.point.x +
          frame.across.x * (acrossOffset + jitter) +
          frame.tangent.x * alongOffset,
        frame.point.y +
          frame.across.y * (acrossOffset + jitter) +
          frame.tangent.y * alongOffset,
        frame.point.z +
          frame.across.z * (acrossOffset + jitter) +
          frame.tangent.z * alongOffset,
      );
      const radius =
        1.016 +
        Math.sin(armProgress * Math.PI) * 0.006 +
        (random() - 0.5) * 0.003;
      pushPoint(
        detail,
        point.x * radius,
        point.y * radius,
        point.z * radius,
      );
    }

    for (let index = 0; index < counts.dust; index++) {
      const y = random() * 2 - 1;
      const radial = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = random() * Math.PI * 2;
      const radius = 1.07 + Math.pow(random(), 1.8) * 0.48;
      pushPoint(
        dust,
        Math.cos(angle) * radial * radius,
        y * radius,
        Math.sin(angle) * radial * radius,
      );
    }

    return { surface, detail, dust };
  }

  function pushPointWithNormal(
    points,
    normals,
    x,
    y,
    z,
    normalX,
    normalY,
    normalZ,
  ) {
    const normal = normalizePoint(normalX, normalY, normalZ);
    pushPoint(points, x, y, z);
    pushPoint(normals, normal.x, normal.y, normal.z);
  }

  const raceCarTwoPi = Math.PI * 2;
  const raceCarWheels = [
    { x: 0.78, y: -0.17, z: -0.41, radius: 0.23, halfWidth: 0.075 },
    { x: 0.78, y: -0.17, z: 0.41, radius: 0.23, halfWidth: 0.075 },
    { x: -0.78, y: -0.16, z: -0.41, radius: 0.255, halfWidth: 0.085 },
    { x: -0.78, y: -0.16, z: 0.41, radius: 0.255, halfWidth: 0.085 },
  ];

  function raceCarSmoothStep(value) {
    const clamped = Math.max(0, Math.min(1, value));
    return clamped * clamped * (3 - 2 * clamped);
  }

  function sampleRaceCarEllipsoid(
    random,
    centerX,
    centerY,
    centerZ,
    radiusX,
    radiusY,
    radiusZ,
    upperOnly = false,
  ) {
    const unitY = upperOnly ? random() : random() * 2 - 1;
    const radial = Math.sqrt(Math.max(0, 1 - unitY * unitY));
    const angle = random() * raceCarTwoPi;
    const unitX = Math.cos(angle) * radial;
    const unitZ = Math.sin(angle) * radial;
    return {
      x: centerX + unitX * radiusX,
      y: centerY + unitY * radiusY,
      z: centerZ + unitZ * radiusZ,
      normal: normalizePoint(
        unitX / radiusX,
        unitY / radiusY,
        unitZ / radiusZ,
      ),
    };
  }

  function sampleRaceCarFender(random, wheel, radiusX, radiusY, radiusZ) {
    const unitY = -0.28 + random() * 1.28;
    const radial = Math.sqrt(Math.max(0, 1 - unitY * unitY));
    const angle = random() * raceCarTwoPi;
    const unitX = Math.cos(angle) * radial;
    const unitZ = Math.sin(angle) * radial;
    return {
      x: wheel.x + unitX * radiusX,
      y: wheel.y + unitY * radiusY,
      z: wheel.z + unitZ * radiusZ,
      normal: normalizePoint(
        unitX / radiusX,
        unitY / radiusY,
        unitZ / radiusZ,
      ),
    };
  }

  function sampleRaceCarTire(random, wheel) {
    const wheelAngle = random() * raceCarTwoPi;
    const sectionAngle = random() * raceCarTwoPi;
    const sectionCosine = Math.cos(sectionAngle);
    const sectionSine = Math.sin(sectionAngle);
    const majorRadius = wheel.radius * 0.7;
    const tubeRadius = wheel.radius * 0.3;
    const radial = majorRadius + sectionCosine * tubeRadius;
    return {
      x: wheel.x + Math.cos(wheelAngle) * radial,
      y: wheel.y + Math.sin(wheelAngle) * radial,
      z: wheel.z + sectionSine * wheel.halfWidth,
      normal: normalizePoint(
        (Math.cos(wheelAngle) * sectionCosine) / tubeRadius,
        (Math.sin(wheelAngle) * sectionCosine) / tubeRadius,
        sectionSine / wheel.halfWidth,
      ),
    };
  }

  function sampleRaceCarBox(
    random,
    centerX,
    centerY,
    centerZ,
    halfX,
    halfY,
    halfZ,
  ) {
    const xFaceArea = halfY * halfZ;
    const yFaceArea = halfX * halfZ;
    const zFaceArea = halfX * halfY;
    const face = random() * (xFaceArea + yFaceArea + zFaceArea);
    const side = random() < 0.5 ? -1 : 1;
    const across = random() * 2 - 1;
    const along = random() * 2 - 1;

    if (face < xFaceArea) {
      return {
        x: centerX + side * halfX,
        y: centerY + across * halfY,
        z: centerZ + along * halfZ,
        normal: { x: side, y: 0, z: 0 },
      };
    }

    if (face < xFaceArea + yFaceArea) {
      return {
        x: centerX + across * halfX,
        y: centerY + side * halfY,
        z: centerZ + along * halfZ,
        normal: { x: 0, y: side, z: 0 },
      };
    }

    return {
      x: centerX + across * halfX,
      y: centerY + along * halfY,
      z: centerZ + side * halfZ,
      normal: { x: 0, y: 0, z: side },
    };
  }

  function raceCarBodyProfile(x) {
    if (x > 0.32) {
      const progress = raceCarSmoothStep((x - 0.32) / 1.08);
      return {
        centerY: -0.055 - progress * 0.055,
        halfHeight: 0.145 - progress * 0.102,
        halfWidth: 0.22 - progress * 0.18,
      };
    }

    const progress = Math.max(0, Math.min(1, (x + 1.12) / 1.44));
    const arch = Math.sin(progress * Math.PI);
    return {
      centerY: -0.08 + arch * 0.025,
      halfHeight: 0.16 + arch * 0.05 - progress * 0.015,
      halfWidth: 0.3 - progress * 0.08 + arch * 0.025,
    };
  }

  function sampleRaceCarBody(random) {
    const x = -1.12 + random() * 2.52;
    const profile = raceCarBodyProfile(x);
    const angle = random() * raceCarTwoPi;
    const angleCosine = Math.cos(angle);
    const angleSine = Math.sin(angle);
    const epsilon = 0.002;
    const before = raceCarBodyProfile(x - epsilon);
    const after = raceCarBodyProfile(x + epsilon);
    const centerDerivative =
      (after.centerY - before.centerY) / (epsilon * 2);
    const heightDerivative =
      (after.halfHeight - before.halfHeight) / (epsilon * 2);
    const widthDerivative =
      (after.halfWidth - before.halfWidth) / (epsilon * 2);
    const normalX =
      -(angleCosine * centerDerivative) / profile.halfHeight -
      (angleCosine * angleCosine * heightDerivative) /
        profile.halfHeight -
      (angleSine * angleSine * widthDerivative) / profile.halfWidth;

    return {
      x,
      y: profile.centerY + angleCosine * profile.halfHeight,
      z: angleSine * profile.halfWidth,
      normal: normalizePoint(
        normalX,
        angleCosine / profile.halfHeight,
        angleSine / profile.halfWidth,
      ),
    };
  }

  function pushRaceCarSample(points, normals, sample) {
    pushPointWithNormal(
      points,
      normals,
      sample.x,
      sample.y,
      sample.z,
      sample.normal.x,
      sample.normal.y,
      sample.normal.z,
    );
  }

  function pushRaceCarLinePoint(
    points,
    normals,
    start,
    end,
    progress,
    normal,
  ) {
    pushPointWithNormal(
      points,
      normals,
      start.x + (end.x - start.x) * progress,
      start.y + (end.y - start.y) * progress,
      start.z + (end.z - start.z) * progress,
      normal.x,
      normal.y,
      normal.z,
    );
  }

  function createRaceCarParts(counts) {
    const surface = [];
    const detail = [];
    const dust = [];
    const surfaceNormals = [];
    const detailNormals = [];
    const dustNormals = [];
    const detailKinds = [];
    const random = createRandom(0x0bd1ca42);
    const raceCarRailKind = 1;
    const raceCarAnchorKind = 1.25;
    const raceCarHotKind = 1.42;
    let tireOrdinal = 0;
    let fenderOrdinal = 0;
    let fenderWheelOrdinal = 0;
    let sidepodOrdinal = 0;
    let noseOrdinal = 0;
    let rearOrdinal = 0;
    let intakeOrdinal = 0;

    for (let index = 0; index < counts.surface; index++) {
      const component = index % 100;
      let sample;

      if (component < 2) {
        sample = sampleRaceCarTire(
          random,
          raceCarWheels[tireOrdinal % raceCarWheels.length],
        );
        tireOrdinal++;
      } else if (component < 23) {
        sample = sampleRaceCarBody(random);
      } else if (component < 56) {
        if (fenderOrdinal % 5 < 3) {
          const wheel =
            raceCarWheels[fenderWheelOrdinal % raceCarWheels.length];
          const rearWheel = wheel.x < 0;
          sample = sampleRaceCarFender(
            random,
            wheel,
            rearWheel ? 0.43 : 0.4,
            rearWheel ? 0.27 : 0.25,
            rearWheel ? 0.19 : 0.18,
          );
          fenderWheelOrdinal++;
        } else {
          const side = sidepodOrdinal % 2 === 0 ? -1 : 1;
          sample = sampleRaceCarEllipsoid(
            random,
            -0.05,
            -0.08,
            side * 0.22,
            0.92,
            0.18,
            0.24,
            true,
          );
          sidepodOrdinal++;
        }
        fenderOrdinal++;
      } else if (component < 74) {
        sample = sampleRaceCarEllipsoid(
          random,
          -0.02,
          -0.12,
          0,
          1.08,
          0.19,
          0.48,
          true,
        );
      } else if (component < 85) {
        sample = sampleRaceCarEllipsoid(
          random,
          -0.2,
          0.055,
          0,
          0.56,
          0.19,
          0.2,
          true,
        );
      } else if (component < 93) {
        sample =
          noseOrdinal % 5 < 3
            ? sampleRaceCarEllipsoid(
                random,
                0.76,
                -0.075,
                0,
                0.78,
                0.105,
                0.29,
              )
            : sampleRaceCarBox(
                random,
                1.15,
                -0.265,
                0,
                0.27,
                0.022,
                0.55,
              );
        noseOrdinal++;
      } else if (component < 99) {
        const rearPart = rearOrdinal % 8;
        if (rearPart < 2) {
          sample = sampleRaceCarBox(
            random,
            -0.88,
            -0.08,
            0,
            0.3,
            0.115,
            0.43,
          );
        } else if (rearPart < 5) {
          sample = sampleRaceCarBox(
            random,
            -1.27,
            0.235,
            0,
            0.09,
            0.035,
            0.62,
          );
        } else if (rearPart < 7) {
          const side = rearPart === 5 ? -1 : 1;
          sample = sampleRaceCarBox(
            random,
            -1.27,
            0.215,
            side * 0.62,
            0.12,
            0.15,
            0.025,
          );
        } else {
          const side = Math.floor(rearOrdinal / 8) % 2 === 0 ? -1 : 1;
          sample = sampleRaceCarBox(
            random,
            -1.12,
            0.105,
            side * 0.25,
            0.025,
            0.15,
            0.025,
          );
        }
        rearOrdinal++;
      } else {
        if (intakeOrdinal % 3 === 0) {
          sample = sampleRaceCarEllipsoid(
            random,
            -0.47,
            0.18,
            0,
            0.2,
            0.17,
            0.14,
            true,
          );
        } else {
          sample = sampleRaceCarBox(
            random,
            -0.62,
            0.16,
            0,
            0.4,
            0.17,
            0.016,
          );
        }
        intakeOrdinal++;
      }

      pushRaceCarSample(surface, surfaceNormals, sample);
    }

    const wheelDetailCount = Math.floor(counts.detail * 0.1);
    for (let index = 0; index < wheelDetailCount; index++) {
      const sample = primitiveProgress(index, wheelDetailCount, 4);
      const wheelIndex = sample.primitive;
      const wheel = raceCarWheels[wheelIndex];
      const wheelSide = wheel.z < 0 ? -1 : 1;
      const faceNormal = wheelSide;
      const ringRadius = wheel.radius * 0.43;
      const angle = sample.progress * raceCarTwoPi;
      pushPointWithNormal(
        detail,
        detailNormals,
        wheel.x + Math.cos(angle) * ringRadius,
        wheel.y + Math.sin(angle) * ringRadius,
        wheel.z + faceNormal * wheel.halfWidth * 1.03,
        0,
        0,
        faceNormal,
      );
      detailKinds.push(raceCarAnchorKind);
    }

    const contourDetailCount = Math.floor(counts.detail * 0.3);
    for (let index = 0; index < contourDetailCount; index++) {
      const sample = primitiveProgress(index, contourDetailCount, 4);
      const side = sample.primitive % 2 === 0 ? -1 : 1;
      const upperRail = sample.primitive >= 2;
      const x = -1.02 + sample.progress * 2.25;
      const body = raceCarBodyProfile(Math.min(1.39, x));
      const sidepodBulge =
        Math.sin(Math.max(0, Math.min(1, sample.progress)) * Math.PI) * 0.19;
      pushPointWithNormal(
        detail,
        detailNormals,
        x,
        body.centerY + body.halfHeight * (upperRail ? 0.82 : 0.22),
        side * (body.halfWidth + sidepodBulge + (upperRail ? 0.018 : 0.035)),
        0,
        upperRail ? 0.72 : 0.2,
        side,
      );
      detailKinds.push(raceCarRailKind);
    }

    const canopyAndLightCount = Math.floor(counts.detail * 0.22);
    const canopyDetailCount = Math.floor(canopyAndLightCount * 0.65);
    for (let index = 0; index < canopyDetailCount; index++) {
      const sample = primitiveProgress(index, canopyDetailCount, 3);
      const progress = sample.progress;
      const arch = Math.sin(progress * Math.PI);
      const side =
        sample.primitive === 0 ? -1 : sample.primitive === 1 ? 1 : 0;
      pushPointWithNormal(
        detail,
        detailNormals,
        -0.58 + progress * 0.86,
        0.06 + arch * (sample.primitive === 2 ? 0.19 : 0.18),
        side * arch * 0.19,
        Math.cos(progress * Math.PI) * 0.35,
        0.8,
        side * 0.55,
      );
      detailKinds.push(raceCarAnchorKind);
    }

    const headlightDetailCount = canopyAndLightCount - canopyDetailCount;
    for (let index = 0; index < headlightDetailCount; index++) {
      const sample = primitiveProgress(index, headlightDetailCount, 4);
      const side = sample.primitive % 2 === 0 ? -1 : 1;
      const upper = sample.primitive >= 2;
      const progress = sample.progress;
      pushPointWithNormal(
        detail,
        detailNormals,
        0.62 + progress * 0.55,
        -0.005 + Math.sin(progress * Math.PI) * 0.075 +
          (upper ? 0.025 : 0),
        side * (0.39 - progress * 0.17),
        0.45,
        0.65,
        side,
      );
      detailKinds.push(raceCarHotKind);
    }

    const wingDetailCount = Math.floor(counts.detail * 0.24);
    const wingLines = [
      [
        { x: 1.42, y: -0.245, z: -0.56 },
        { x: 1.42, y: -0.245, z: 0.56 },
        { x: 1, y: 0, z: 0 },
      ],
      [
        { x: 0.9, y: -0.245, z: -0.54 },
        { x: 0.9, y: -0.245, z: 0.54 },
        { x: 0, y: 1, z: 0 },
      ],
      [
        { x: -1.36, y: 0.3, z: -0.63 },
        { x: -1.36, y: 0.3, z: 0.63 },
        { x: -1, y: 0.3, z: 0 },
      ],
      [
        { x: -1.18, y: 0.24, z: -0.63 },
        { x: -1.18, y: 0.24, z: 0.63 },
        { x: 1, y: 0.3, z: 0 },
      ],
      [
        { x: -1.36, y: 0.33, z: -0.63 },
        { x: -1.18, y: 0.33, z: -0.63 },
        { x: 0, y: 1, z: -0.3 },
      ],
      [
        { x: -1.36, y: 0.33, z: 0.63 },
        { x: -1.18, y: 0.33, z: 0.63 },
        { x: 0, y: 1, z: 0.3 },
      ],
      [
        { x: -1.04, y: 0.055, z: -0.32 },
        { x: -1.24, y: 0.27, z: -0.46 },
        { x: 0.2, y: 0.8, z: -0.45 },
      ],
      [
        { x: -1.04, y: 0.055, z: 0.32 },
        { x: -1.24, y: 0.27, z: 0.46 },
        { x: 0.2, y: 0.8, z: 0.45 },
      ],
    ];
    for (let index = 0; index < wingDetailCount; index++) {
      const sample = primitiveProgress(
        index,
        wingDetailCount,
        wingLines.length,
      );
      const line = wingLines[sample.primitive];
      pushRaceCarLinePoint(
        detail,
        detailNormals,
        line[0],
        line[1],
        sample.progress,
        line[2],
      );
      detailKinds.push(raceCarAnchorKind);
    }

    const diffuserDetailCount =
      counts.detail -
      wheelDetailCount -
      contourDetailCount -
      canopyAndLightCount -
      wingDetailCount;
    const aeroTrailDetailCount = Math.floor(diffuserDetailCount * 0.45);
    for (let index = 0; index < aeroTrailDetailCount; index++) {
      const sample = primitiveProgress(index, aeroTrailDetailCount, 5);
      const lane = sample.primitive - 2;
      pushRaceCarLinePoint(
        detail,
        detailNormals,
        {
          x: -0.86,
          y: -0.045 + lane * 0.026,
          z: lane * 0.105,
        },
        {
          x: -1.54,
          y: -0.035 + lane * 0.032,
          z: lane * 0.125,
        },
        sample.progress,
        { x: -1, y: lane * 0.035, z: lane * 0.05 },
      );
      detailKinds.push(raceCarAnchorKind);
    }

    const underbodyDetailCount = diffuserDetailCount - aeroTrailDetailCount;
    for (let index = 0; index < underbodyDetailCount; index++) {
      const sample = primitiveProgress(index, underbodyDetailCount, 6);
      const lane = sample.primitive - 2.5;
      pushPointWithNormal(
        detail,
        detailNormals,
        -1.42 + sample.progress * 0.66,
        -0.295 + sample.progress * 0.065,
        lane * 0.135,
        -0.35,
        -1,
        lane * 0.08,
      );
      detailKinds.push(raceCarRailKind);
    }

    if (
      detail.length / 3 !== counts.detail ||
      detailKinds.length !== counts.detail
    ) {
      throw new Error("Race car detail particle allocation does not match");
    }

    for (let index = 0; index < counts.dust; index++) {
      const progress = Math.pow(random(), 0.72);
      const vortexAngle =
        progress * Math.PI * 2.8 + random() * Math.PI * 0.24;
      const vortexRadius = 0.014 + progress * 0.052;

      if (index % 3 < 2) {
        const side = index % 3 === 0 ? -1 : 1;
        pushPointWithNormal(
          dust,
          dustNormals,
          -0.94 - progress * 0.58 + (random() - 0.5) * 0.018,
          -0.075 + Math.cos(vortexAngle) * vortexRadius,
          side * (0.27 + progress * 0.1) +
            Math.sin(vortexAngle) * vortexRadius,
          -1,
          Math.cos(vortexAngle) * 0.2,
          side * 0.08,
        );
      } else {
        pushPointWithNormal(
          dust,
          dustNormals,
          -0.9 - progress * 0.64 + (random() - 0.5) * 0.016,
          -0.035 + Math.cos(vortexAngle * 0.8) * vortexRadius * 0.42,
          Math.sin(vortexAngle * 0.8) * vortexRadius * 0.7,
          -1,
          Math.cos(vortexAngle) * 0.16,
          Math.sin(vortexAngle) * 0.12,
        );
      }
    }

    // Match the Remix reference stance: pointed nose left, rear wing and wake right.
    [surface, detail, dust].forEach((points) => {
      for (let index = 0; index < points.length; index += 3) {
        points[index] *= -1;
      }
    });
    [surfaceNormals, detailNormals, dustNormals].forEach((normals) => {
      for (let index = 0; index < normals.length; index += 3) {
        normals[index] *= -1;
      }
    });

    return {
      surface,
      detail,
      dust,
      surfaceNormals,
      detailNormals,
      dustNormals,
      detailKinds,
    };
  }

  function partCounts(parts) {
    return {
      surface: parts.surface.length / 3,
      detail: parts.detail.length / 3,
      dust: parts.dust.length / 3,
    };
  }

  function validateShapeParts(name, parts, counts) {
    ["surface", "detail", "dust"].forEach((partName) => {
      const points = parts[partName];
      const expectedLength = counts[partName] * 3;

      if (points.length !== expectedLength) {
        throw new Error(
          `${name} ${partName} particle count is ${points.length / 3}; expected ${counts[partName]}`,
        );
      }

      for (let index = 0; index < points.length; index++) {
        if (!Number.isFinite(points[index])) {
          throw new Error(`${name} ${partName} contains a non-finite point`);
        }
      }

      const normals = parts[`${partName}Normals`];
      if (!normals) return;

      if (normals.length !== points.length) {
        throw new Error(`${name} ${partName} normal count does not match`);
      }

      for (let index = 0; index < normals.length; index += 3) {
        const normalX = normals[index];
        const normalY = normals[index + 1];
        const normalZ = normals[index + 2];
        const lengthSquared =
          normalX * normalX + normalY * normalY + normalZ * normalZ;
        if (!Number.isFinite(lengthSquared) || lengthSquared < 0.000001) {
          throw new Error(`${name} ${partName} contains an invalid normal`);
        }
      }
    });

    if (parts.detailKinds) {
      if (parts.detailKinds.length !== counts.detail) {
        throw new Error(`${name} detail kind count does not match`);
      }

      for (const kind of parts.detailKinds) {
        if (!Number.isFinite(kind) || kind < 0.5 || kind >= 1.5) {
          throw new Error(`${name} contains an invalid detail kind`);
        }
      }
    }
  }

  function packParts(parts, counts) {
    const totalCount = counts.surface + counts.detail + counts.dust;
    const values = new Float32Array(totalCount * 4);
    let pointIndex = 0;

    function write(points, kind, kinds) {
      for (let index = 0; index < points.length; index += 3) {
        values[pointIndex * 4] = points[index];
        values[pointIndex * 4 + 1] = points[index + 1];
        values[pointIndex * 4 + 2] = points[index + 2];
        values[pointIndex * 4 + 3] = kinds
          ? kinds[index / 3]
          : kind;
        pointIndex++;
      }
    }

    write(parts.surface, 0);
    write(parts.detail, 1, parts.detailKinds);
    write(parts.dust, 2);

    if (pointIndex !== totalCount) {
      throw new Error("Particle shape counts do not match");
    }

    return values;
  }

  function footballSurfaceNormal(x, y, z) {
    const axial = Math.max(
      -0.99999,
      Math.min(0.99999, x / footballHalfLength),
    );
    return footballNormalFromAxialAngle(
      axial,
      Math.atan2(z, y),
    );
  }

  function encodeOctNormal(x, y, z) {
    const normal = normalizePoint(x, y, z);
    const inverse =
      1 / (Math.abs(normal.x) + Math.abs(normal.y) + Math.abs(normal.z));
    let octX = normal.x * inverse;
    let octY = normal.y * inverse;
    const octZ = normal.z * inverse;

    if (octZ < 0) {
      const previousX = octX;
      const previousY = octY;
      octX =
        (1 - Math.abs(previousY)) * (previousX < 0 ? -1 : 1);
      octY =
        (1 - Math.abs(previousX)) * (previousY < 0 ? -1 : 1);
    }

    return { x: octX, y: octY };
  }

  function packNormalOct(parts, counts, normalResolver) {
    const totalCount = counts.surface + counts.detail + counts.dust;
    const values = new Float32Array(totalCount * 2);
    let pointIndex = 0;

    function write(points, explicitNormals, kind) {
      for (let index = 0; index < points.length; index += 3) {
        const normal = explicitNormals
          ? {
              x: explicitNormals[index],
              y: explicitNormals[index + 1],
              z: explicitNormals[index + 2],
            }
          : normalResolver(
              points[index],
              points[index + 1],
              points[index + 2],
              kind,
            );
        const encoded = encodeOctNormal(normal.x, normal.y, normal.z);
        values[pointIndex * 2] = encoded.x;
        values[pointIndex * 2 + 1] = encoded.y;
        pointIndex++;
      }
    }

    write(parts.surface, parts.surfaceNormals, 0);
    write(parts.detail, parts.detailNormals, 1);
    write(parts.dust, parts.dustNormals, 2);

    if (pointIndex !== totalCount) {
      throw new Error("Particle normal counts do not match");
    }

    return values;
  }

  function parseCssColor(property, fallback) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();
    const match = /^#([0-9a-f]{6})$/i.exec(value);
    const hex = match ? match[1] : fallback;
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }

  const program = createProgram();

  const basketballParts = createBasketballParts();
  const counts = partCounts(basketballParts);
  const footballParts = createFootballParts(counts);
  const baseballParts = createBaseballParts(counts);
  const raceCarParts = createRaceCarParts(counts);
  validateShapeParts("basketball", basketballParts, counts);
  validateShapeParts("football", footballParts, counts);
  validateShapeParts("baseball", baseballParts, counts);
  validateShapeParts("race car", raceCarParts, counts);
  const shapeBuffers = [
    packParts(basketballParts, counts),
    packParts(footballParts, counts),
    packParts(baseballParts, counts),
    packParts(raceCarParts, counts),
  ];
  const pointCount = counts.surface + counts.detail + counts.dust;
  const sphereNormal = (x, y, z) => normalizePoint(x, y, z);
  const packedNormalBuffers = [
    packNormalOct(basketballParts, counts, sphereNormal),
    packNormalOct(footballParts, counts, footballSurfaceNormal),
    packNormalOct(baseballParts, counts, sphereNormal),
    packNormalOct(raceCarParts, counts, sphereNormal),
  ];
  const normalOctX = new Float32Array(pointCount * 4);
  const normalOctY = new Float32Array(pointCount * 4);

  for (let pointIndex = 0; pointIndex < pointCount; pointIndex++) {
    for (let shapeIndex = 0; shapeIndex < 4; shapeIndex++) {
      normalOctX[pointIndex * 4 + shapeIndex] =
        packedNormalBuffers[shapeIndex][pointIndex * 2];
      normalOctY[pointIndex * 4 + shapeIndex] =
        packedNormalBuffers[shapeIndex][pointIndex * 2 + 1];
    }
  }

  const seedRandom = createRandom(0x0bd1c10d);
  const seeds = new Float32Array(pointCount);

  for (let index = 0; index < pointCount; index++) {
    seeds[index] = seedRandom();
  }

  gl.useProgram(program);

  function bindAttribute(name, values, size) {
    const location = gl.getAttribLocation(program, name);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  }

  bindAttribute("aBasketball", shapeBuffers[0], 4);
  bindAttribute("aFootball", shapeBuffers[1], 4);
  bindAttribute("aBaseball", shapeBuffers[2], 4);
  bindAttribute("aRaceCar", shapeBuffers[3], 4);
  bindAttribute("aNormalOctX", normalOctX, 4);
  bindAttribute("aNormalOctY", normalOctY, 4);
  bindAttribute("aSeed", seeds, 1);

  const uniforms = {
    resolution: gl.getUniformLocation(program, "uResolution"),
    pointer: gl.getUniformLocation(program, "uPointer"),
    pointerStrength: gl.getUniformLocation(program, "uPointerStrength"),
    time: gl.getUniformLocation(program, "uTime"),
    pixelRatio: gl.getUniformLocation(program, "uPixelRatio"),
    pointMultiplier: gl.getUniformLocation(program, "uPointMultiplier"),
    opacity: gl.getUniformLocation(program, "uOpacity"),
    softPass: gl.getUniformLocation(program, "uSoftPass"),
    brandPrimary: gl.getUniformLocation(program, "uBrandPrimary"),
    brandSecondary: gl.getUniformLocation(program, "uBrandSecondary"),
    brandTertiary: gl.getUniformLocation(program, "uBrandTertiary"),
  };

  gl.uniform3fv(
    uniforms.brandPrimary,
    parseCssColor("--brand-primary", "3b82f6"),
  );
  gl.uniform3fv(
    uniforms.brandSecondary,
    parseCssColor("--brand-secondary", "8b5cf6"),
  );
  gl.uniform3fv(
    uniforms.brandTertiary,
    parseCssColor("--brand-tertiary", "06b6d4"),
  );
  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE);
  gl.disable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  let pixelRatio = 1;
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * pixelRatio));
    const height = Math.max(1, Math.round(rect.height * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }

    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.pixelRatio, pixelRatio);
  }

  const pointer = { x: 0, y: 0, strength: 0 };
  const pointerTarget = { x: 0, y: 0, strength: 0 };

  container.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    const rect = container.getBoundingClientRect();
    pointerTarget.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerTarget.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    pointerTarget.strength = 1;
  });

  container.addEventListener("pointerleave", () => {
    pointerTarget.x = 0;
    pointerTarget.y = 0;
    pointerTarget.strength = 0;
  });

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animationFrame = null;
  let isVisible = false;
  let activeElapsed = 0;
  let lastFrameTimestamp = null;
  let contextLost = false;

  function drawPass(pointMultiplier, opacity, softPass) {
    gl.uniform1f(uniforms.pointMultiplier, pointMultiplier);
    gl.uniform1f(uniforms.opacity, opacity);
    gl.uniform1f(uniforms.softPass, softPass);
    gl.drawArrays(gl.POINTS, 0, pointCount);
  }

  function renderFrame(timestamp) {
    if (contextLost) return;
    animationFrame = null;
    resizeCanvas();

    pointer.x += (pointerTarget.x - pointer.x) * 0.055;
    pointer.y += (pointerTarget.y - pointer.y) * 0.055;
    pointer.strength +=
      (pointerTarget.strength - pointer.strength) * 0.085;

    if (!motionPreference.matches) {
      if (lastFrameTimestamp !== null) {
        const frameDelta = Math.min(
          100,
          Math.max(0, timestamp - lastFrameTimestamp),
        );
        activeElapsed += frameDelta / 1000;
      }
      lastFrameTimestamp = timestamp;
    }
    const elapsed = motionPreference.matches ? 0 : activeElapsed;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.time, elapsed);
    gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
    gl.uniform1f(uniforms.pointerStrength, pointer.strength);
    drawPass(4.4, compact ? 0.07 : 0.095, 1);
    drawPass(1, compact ? 0.8 : 0.92, 0);

    if (!motionPreference.matches && isVisible && !document.hidden) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  }

  function requestRender() {
    if (
      !contextLost &&
      animationFrame === null &&
      isVisible &&
      !document.hidden
    ) {
      animationFrame = window.requestAnimationFrame(renderFrame);
    }
  }

  function stopRendering() {
    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    lastFrameTimestamp = null;
  }

  const resizeObserver = new ResizeObserver(requestRender);
  resizeObserver.observe(container);

  if ("IntersectionObserver" in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        requestRender();
      } else {
        pointer.x = 0;
        pointer.y = 0;
        pointer.strength = 0;
        pointerTarget.x = 0;
        pointerTarget.y = 0;
        pointerTarget.strength = 0;
        stopRendering();
      }
    });
    visibilityObserver.observe(container);
  } else {
    isVisible = true;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopRendering();
    } else {
      requestRender();
    }
  });

  motionPreference.addEventListener("change", () => {
    stopRendering();
    if (!motionPreference.matches) {
      requestRender();
      return;
    }

    pointer.x = 0;
    pointer.y = 0;
    pointer.strength = 0;
    pointerTarget.x = 0;
    pointerTarget.y = 0;
    pointerTarget.strength = 0;
    if (!document.hidden) renderFrame(performance.now());
  });
  canvas.addEventListener("webglcontextlost", () => {
    contextLost = true;
    stopRendering();
    showParticleSportsFallback(
      container,
      new Error("The particle sports WebGL context was lost"),
    );
  });
  container.classList.add("particle-renderer-ready");
  renderFrame(performance.now());
  lastFrameTimestamp = null;
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
  initTypewriter();
  initParticleSportsHero();
  initParticleSports();


  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.pageYOffset > 50) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  });
});
