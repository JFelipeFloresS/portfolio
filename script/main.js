(() => {
    const nav = document.getElementById("nav");
    const toggle = document.getElementById("nav-toggle");
    const links = document.querySelectorAll("#nav-links a");

    // Nav: glass background once scrolled
    const onScrollNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
    onScrollNav();

    // Mobile menu
    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open);
    });
    links.forEach(a => a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
    }));

    // Generic reveal-on-scroll
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

    // Timeline: items light up as they enter, the rail fills with scroll progress
    const timeline = document.getElementById("timeline");
    const fill = document.getElementById("timeline-fill");
    const items = [...document.querySelectorAll(".tl-item")];

    const tlObs = new IntersectionObserver(entries => {
        entries.forEach(e => e.target.classList.toggle("is-visible", e.isIntersecting || e.boundingClientRect.top < 0));
    }, { rootMargin: "0px 0px -25% 0px" });
    items.forEach(el => tlObs.observe(el));

    const updateTimeline = () => {
        const rect = timeline.getBoundingClientRect();
        const anchor = window.innerHeight * 0.6;
        const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
        fill.style.setProperty("--progress", progress);

        // highlight the card currently at the anchor line
        let current = null;
        for (const el of items) {
            if (el.getBoundingClientRect().top < anchor) current = el;
        }
        items.forEach(el => el.classList.toggle("is-current", el === current));
    };

    // Active nav link per section
    const sections = [...document.querySelectorAll("main section[id]")];
    const updateActiveLink = () => {
        const y = window.scrollY + window.innerHeight * 0.3;
        let id = null;
        for (const s of sections) if (s.offsetTop <= y) id = s.id;
        links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
    };

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            onScrollNav();
            updateTimeline();
            updateActiveLink();
            ticking = false;
        });
    }, { passive: true });
    window.addEventListener("resize", updateTimeline);
    updateTimeline();
    updateActiveLink();

    // Spotlight hover on cards
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("pointermove", e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        });
    });

    // Project filter tabs
    const tabs = document.querySelectorAll(".tab");
    const projects = document.querySelectorAll("#project-grid .project");
    const applyFilter = filter => {
        tabs.forEach(t => {
            const on = t.dataset.filter === filter;
            t.classList.toggle("is-active", on);
            t.setAttribute("aria-selected", on);
        });
        projects.forEach(p => {
            const show = filter === "all" || p.dataset.cat === filter;
            p.classList.toggle("is-hidden", !show);
            if (show) p.classList.add("is-visible");
        });
    };
    tabs.forEach(t => t.addEventListener("click", () => applyFilter(t.dataset.filter)));
    document.querySelectorAll("[data-jump]").forEach(a =>
        a.addEventListener("click", () => applyFilter(a.dataset.jump)));

    // Lightbox: click any picture on the page to see it bigger
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const lbCap = document.getElementById("lightbox-cap");
    document.querySelectorAll("main img:not(.socials img)").forEach(img => {
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        const open = () => {
            lbImg.src = img.dataset.full || img.currentSrc || img.src; // full screenshot, not the card crop
            lbImg.alt = img.alt;
            const card = img.closest(".project");
            lbCap.textContent = card?.querySelector("h3")?.textContent.replace("↗", "").trim()
                || img.closest("figure")?.querySelector("figcaption")?.textContent || img.alt;
            lightbox.showModal();
        };
        img.addEventListener("click", open);
        img.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
    });
    // close on backdrop click, the × button, or Esc (native)
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox || e.target.closest(".lightbox__close")) lightbox.close();
    });

    document.getElementById("year").textContent = new Date().getFullYear();
})();
