document.addEventListener("DOMContentLoaded", () => {

    // --- DATOS DE LA PASTELERÍA (Fácilmente editables) ---
    const postres = [
        {
            nombre: "Pave de leche en polvo",
            descripcion: "Pave suave y esponjoso hecho con un mezcla cremosa de leche en polvo que aporta un dulzor delicado  un aroma tradicional. Su sabor auntentico y artesanal lo convierte en un postre casero irresistible",
            img: "imagenes/pave de leche.png",
            categoria: "Clásicos"
            
        },
        {
            nombre: "Pave de Limón",
            descripcion: "Refrescante y equilibrado. Su crema de limón tiene el toque justo de acidez que contrasta con el dulzor, logrando un sabor fresco y ligero. Perfecto para quienes prefieren un postre suave pero no empalagoso.",
            img: "imagenes/pave de limon.png",
            categoria: "Frutales"
            
        },
        {
            nombre: "Pave de Oreo",
            descripcion: "Un postre cremoso y delicioso elaborado con suaves capas de crema dulce intercaladas con trozos de galleta Oreo. Su textura suave y crocante se combina para ofrecer un sabor intenso a chocolate y vainilla, perfecto para los amantes de las galletas.",
            img: "imagenes/pave de oreo.png",
            categoria: "Chocolates"
           
        },
        {
            nombre: "Pave de frutilla",
            descripcion: "Hecho con una crema suave mezclada con frutillas frescas, logrando un sabor dulce y ligeramente ácido. Es un pavé colorido, aromático y perfecto para quienes disfrutan de los postres frutales.",
            img: "imagenes/pave frutilla.png",
            categoria: "Frutales"
            
        },
        {
            nombre: "Pave de dulce de leche",
            descripcion: "Capas Cremosas elaboradas con dulce de leche espeso y suave, combinadas con galletas humedecidad para crear un textura perfecta. Es un postre  indulgente, dulce y reconfortante, ideal para quienes aman los sabores intensos",
            img: "imagenes/pave.png",
            categoria: "Clásicos"
           
        },
        
    ];

    // --- ELEMENTOS DEL DOM ---
    const catalogoContainer = document.getElementById("catalogo-postres");
    const filtrosContainer = document.getElementById("filtros-categoria");
    const btnTop = document.getElementById("btnTop");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const modal = document.getElementById("modal-postre");
    const closeModal = document.querySelector(".close-button");

    // --- FUNCIONALIDAD DEL CATÁLOGO Y FILTROS ---
    const mostrarPostres = (postresFiltrados) => {
        catalogoContainer.innerHTML = "";
        postresFiltrados.forEach(postre => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${postre.img}" alt="${postre.nombre}" style="background-color: #ffc1d6; padding: 15px; border-radius: 8px; box-sizing: border-box;">
                <div class="card-info">
                    <h3>${postre.nombre}</h3>
                </div>
            `;
            // Evento para abrir el modal
            card.addEventListener("click", () => abrirModal(postre));
            catalogoContainer.appendChild(card);
        });
    };

    const crearFiltros = () => {
        const categorias = ["Todos", ...new Set(postres.map(p => p.categoria))];
        categorias.forEach(categoria => {
            const boton = document.createElement("button");
            boton.classList.add("filtro-btn");
            boton.textContent = categoria;
            if (categoria === "Todos") boton.classList.add("active");
            
            boton.addEventListener("click", () => {
                // Manejar clase activa
                document.querySelector(".filtro-btn.active").classList.remove("active");
                boton.classList.add("active");
                // Filtrar y mostrar
                const postresAFiltrar = categoria === "Todos" ? postres : postres.filter(p => p.categoria === categoria);
                mostrarPostres(postresAFiltrar);
            });
            filtrosContainer.appendChild(boton);
        });
    };

    // --- FUNCIONALIDAD DEL MODAL ---
    const abrirModal = (postre) => {
        const modalImg = document.getElementById("modal-img");
        modalImg.src = postre.img;
        modalImg.style.backgroundColor = "#ffc1d6"; // Color de fondo rosa pastel
        modalImg.style.padding = "15px"; // Espacio interno para que el fondo se vea
        modalImg.style.borderRadius = "8px"; // Bordes redondeados para la imagen
        document.getElementById("modal-nombre").textContent = postre.nombre;
        document.getElementById("modal-descripcion").textContent = postre.descripcion;
        modal.style.display = "block";
    };

    closeModal.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // --- MENÚ HAMBURGUESA (MÓVIL) ---
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- BOTÓN "VOLVER ARRIBA" ---
    window.addEventListener("scroll", () => {
        btnTop.style.display = (window.scrollY > 300) ? "block" : "none";
    });

    btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- ANIMACIÓN DE ENTRADA EN SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeIn 1s ${entry.target.dataset.delay || '0s'} forwards ease-out`;
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.container > *, .servicio-card, .card').forEach(el => {
        el.style.opacity = 0; // Iniciar invisible para la animación
        observer.observe(el);
    });

    // --- INICIALIZACIÓN ---
    crearFiltros();
    mostrarPostres(postres);

    // --- FUNCIONALIDAD DEL FORMULARIO DE CONTACTO CON EMAILJS ---
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // Configura y muestra el mensaje flotante de "Enviando..."
            formFeedback.textContent = 'Enviando...';
            formFeedback.style.backgroundColor = 'var(--primary-color)';
            formFeedback.classList.add('show');

            // Simula un pequeño retraso de envío
            setTimeout(() => {
                // Cambia el mensaje a "éxito"
                formFeedback.textContent = '¡Mensaje enviado con éxito! ¡Nos comunicaremos contigo para informate mas sobre tu pedido!';
                formFeedback.style.backgroundColor = '#28a745'; // Un verde de éxito
                contactForm.reset();

                // Oculta el mensaje flotante después de 4 segundos
                setTimeout(() => {
                    formFeedback.classList.remove('show');
                }, 4000);
            }, 1000); // 1 segundo de retraso
        });
    } else {
        console.warn('El formulario de contacto con id "contact-form" no fue encontrado.');
    }

});