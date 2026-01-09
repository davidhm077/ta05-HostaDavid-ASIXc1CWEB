// MODO CLARO/OSCURET
const btnDark = document.getElementById("btn-darkmode");
if (btnDark) {
  const body = document.body;
  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "claro") {
    body.classList.add("light");
  }
  btnDark.addEventListener("click", () => {
    body.classList.toggle("light");
    const esLight = body.classList.contains("light");
    localStorage.setItem("modo", esLight ? "claro" : "oscuro");
  });
}

// ANY AUTOMÀTIC
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// VALIDACIÓ FORMULARI (a contacte.html)
const form = document.getElementById("form-contacto");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje");

    let valido = true;
    const setError = (id, texto) => {
      const small = document.getElementById(id);
      if (small) small.textContent = texto;
      if (texto) valido = false;
    };

    setError("error-nombre", "");
    setError("error-email", "");
    setError("error-telefono", "");
    setError("error-mensaje", "");
    const ok = document.getElementById("form-ok");
    if (ok) ok.textContent = "";

    if (!nombre.value || nombre.value.trim().length < 3) {
      setError("error-nombre", "El nom ha de tenir almenys 3 caràcters.");
    }

    if (!email.value || !email.checkValidity()) {
      setError("error-email", "Introdueix un correu electrònic vàlid.");
    }

    if (telefono.value && !telefono.checkValidity()) {
      setError("error-telefono", "El telèfon ha de tenir 9 dígits numèrics.");
    }

    if (!mensaje.value || mensaje.value.trim().length < 10) {
      setError(
        "error-mensaje",
        "El missatge ha de tenir almenys 10 caràcters."
      );
    }

    if (valido) {
      if (ok)
        ok.textContent =
          "Missatge enviat (simulat). Gràcies pel teu contacte.";
      form.reset();
    }
  });
}

// BUSCADOR EN VIU ALS PROJECTES
const buscador = document.getElementById("buscador");
const lista = document.getElementById("lista-proyectos");
const noResultados = document.getElementById("no-resultados");

if (buscador && lista) {
  buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase().trim();
    const items = lista.querySelectorAll(".project-item");
    let hayAlguno = false;

    items.forEach((li) => {
      const contenido = li.textContent.toLowerCase();
      const tags = (li.dataset.tags || "").toLowerCase();

      if (!texto || contenido.includes(texto) || tags.includes(texto)) {
        li.style.display = "";
        hayAlguno = true;
      } else {
        li.style.display = "none";
      }
    });

    if (noResultados) {
      noResultados.hidden = hayAlguno;
    }
  });
}

// ACORDEÓ / DESPLEGABLE PER CADA PROJECTE
const projectToggles = document.querySelectorAll(".project-toggle");
if (projectToggles.length > 0) {
  projectToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".project-item");
      const details = item.querySelector(".project-details");
      const arrow = btn.querySelector(".project-arrow");
      const isOpen = item.classList.toggle("open");

      if (details) details.hidden = !isOpen;
      if (arrow) arrow.textContent = isOpen ? "▲" : "▼";
    });
  });
}

// MENÚ MÒBIL
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("show");
    }
  });
}

// ===== PRO PROJECTS ACCORDION + SEARCH =====
(function () {
  const cards = Array.from(document.querySelectorAll(".pro-card"));
  const toggles = Array.from(document.querySelectorAll(".pro-toggle"));
  const search = document.getElementById("search");

  if (!cards.length || !toggles.length) return;

  // Toggle accordion
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".pro-card");
      const details = card.querySelector(".pro-details");
      const isOpen = card.classList.contains("is-open");

      // Close others (accordion)
      cards.forEach((c) => {
        if (c !== card) {
          c.classList.remove("is-open");
          const d = c.querySelector(".pro-details");
          if (d) d.hidden = true;
        }
      });

      // Toggle current
      card.classList.toggle("is-open", !isOpen);
      details.hidden = isOpen;
    });
  });

  // Search filter
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();

      cards.forEach((card) => {
        const title = card.querySelector(".pro-title")?.textContent.toLowerCase() || "";
        const tags = (card.getAttribute("data-tags") || "").toLowerCase();
        const text = (card.querySelector(".pro-details")?.textContent || "").toLowerCase();

        const match = title.includes(q) || tags.includes(q) || text.includes(q);
        card.style.display = match ? "" : "none";
      });
    });
  }
})();
