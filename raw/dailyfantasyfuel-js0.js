URL: https://dailyfantasyfuel.com/public/js/radar-component.js?radar20260817\nSTATUS: 200\n\n(function () {
  function getScrollTriggerTrigger(component) {
    return component.closest(".section_hp-hero") || component;
  }

  function initRadarCards(component) {
    component.querySelectorAll(".hero-radar_cards-component").forEach((cardsComponent) => {
      const items = [...cardsComponent.querySelectorAll(".hero-radar_cards-wrap")].sort((a, b) => {
        return Number(a.dataset.cycleOrder || 0) - Number(b.dataset.cycleOrder || 0);
      });
      if (!items.length) return;

      const duration = 0.6;
      const delay = 2.0;
      const step = duration + delay;
      const cardsPerView = 3;
      let activeIndex = -1;
      let zIndex = 99999;

      gsap.set(items, {
        scale: 1,
        yPercent: 0,
        "--background-opacity": 0.5,
        opacity: 0,
        filter: "blur(0rem)",
      });

      gsap.set(items, {
        "--content-opacity": 0,
      });

      const cardSequence = gsap.timeline({
        defaults: {
          duration,
          ease: "power1.inOut",
        },
      });

      for (let i = 0; i < items.length + cardsPerView; i += 1) {
        activeIndex += 1;
        if (activeIndex === items.length) activeIndex = 0;

        const item = items[activeIndex];
        zIndex += 1;

        cardSequence.set(
          items,
          {
            "--content-opacity": 0,
          },
          i * step
        );

        cardSequence.set(
          item,
          {
            scale: 0.94,
            "--background-opacity": 0.5,
            "--content-opacity": 1,
            yPercent: 8,
            opacity: 0,
            filter: "blur(0.15rem)",
            zIndex,
          },
          i * step
        );

        cardSequence.to(
          item,
          {
            scale: 1.04,
            yPercent: -2,
            opacity: 1,
            filter: "blur(0rem)",
            duration: 0.46,
            ease: "sine.out",
          },
          i * step
        );

        cardSequence.to(
          item,
          {
            scale: 1,
            yPercent: 0,
            duration: 0.34,
            ease: "sine.inOut",
          },
          i * step + 0.46
        );

        cardSequence.set(
          item,
          {
            "--content-opacity": 0,
          },
          i * step + step
        );

        cardSequence.to(
          item,
          {
            scale: 0.96,
            yPercent: 8,
            "--background-opacity": 0.35,
            duration,
            ease: "power2.inOut",
          },
          i * step + step
        );

        cardSequence.to(
          item,
          {
            scale: 0.92,
            yPercent: 16,
            "--background-opacity": 0.2,
          },
          "<" + step
        );

        cardSequence.to(
          item,
          {
            scale: 0.88,
            yPercent: 24,
            opacity: 0,
            filter: "blur(0.2rem)",
          },
          "<" + step
        );
      }

      const loop = gsap.timeline({
        repeat: -1,
        paused: true,
        ease: "none",
        onUpdate: () => {
          const offset = step * cardsPerView;
          if (cardSequence.time() < offset - delay || cardSequence.time() > cardSequence.duration() - offset) {
            cardSequence.time(offset - delay);
          }
        },
      });

      loop.to(cardSequence, {
        duration: cardSequence.duration(),
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: getScrollTriggerTrigger(component),
        start: "top 80%",
        end: "bottom top",
        onEnter: () => loop.play(),
        onEnterBack: () => loop.play(),
        onLeave: () => loop.pause(),
        onLeaveBack: () => loop.pause(),
      });
    });
  }

  function setIconAngles(component, radar, items) {
    const radarRect = radar.getBoundingClientRect();
    const radarCenter = {
      x: radarRect.left + radarRect.width / 2,
      y: radarRect.top + radarRect.height / 2,
    };

    items.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = {
        x: itemRect.left + itemRect.width / 2,
        y: itemRect.top + itemRect.height / 2,
      };

      const dx = itemCenter.x - radarCenter.x;
      const dy = radarCenter.y - itemCenter.y;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI);

      angle = -(angle - 90);
      if (angle > 180) angle -= 360;
      if (angle < -180) angle += 360;

      item.dataset.angle = String(Math.round(angle));
    });
  }

  function initRadarSweep(component) {
    const radar = component.querySelector(".hp-circle_radar");
    const items = component.querySelectorAll(".hp-circle-item");
    if (!radar || !items.length) return;

    gsap.set(radar, {
      transformOrigin: "50% 50%",
      willChange: "transform",
    });

    setIconAngles(component, radar, items);
    window.addEventListener("resize", () => setIconAngles(component, radar, items), { passive: true });

    const radarRotation = { angle: 0 };
    const radarTimeline = gsap.to(radarRotation, {
      angle: -360,
      duration: 20,
      ease: "linear",
      repeat: -1,
      paused: true,
      onUpdate: () => {
        const current = ((radarRotation.angle % 360) + 360) % 360;
        const normalized = current > 180 ? current - 360 : current;

        gsap.set(radar, {
          rotate: radarRotation.angle,
        });

        items.forEach((item) => {
          const iconAngle = parseFloat(item.dataset.angle);
          const diff = Math.abs(normalized - iconAngle);

          if (diff < 5 && !item.classList.contains("popped")) {
            item.classList.add("popped");

            gsap.fromTo(
              item,
              { scale: 1 },
              {
                scale: 1.3,
                duration: 0.25,
                ease: "power2.out",
                yoyo: true,
                repeat: 1,
                onComplete: () => item.classList.remove("popped"),
              }
            );
          }
        });
      },
    });

    ScrollTrigger.create({
      trigger: getScrollTriggerTrigger(component),
      start: "top 80%",
      end: "bottom top",
      onEnter: () => radarTimeline.play(),
      onEnterBack: () => radarTimeline.play(),
      onLeave: () => radarTimeline.pause(),
      onLeaveBack: () => radarTimeline.pause(),
    });
  }

  function initHeroRadar() {
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("Hero radar requires GSAP and ScrollTrigger.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".hero-radar_component").forEach((component) => {
      if (component.dataset.heroRadarInitialized === "true") return;
      component.dataset.heroRadarInitialized = "true";
      initRadarSweep(component);
      initRadarCards(component);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  window.initHeroRadar = initHeroRadar;
})();
