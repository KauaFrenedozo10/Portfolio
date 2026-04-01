
        // ==================== MENU HAMBURGUER ====================
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
        const navLinksItems = document.querySelectorAll(".nav-links a");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                hamburger.classList.toggle("active");
            });
            navLinksItems.forEach(item => {
                item.addEventListener("click", () => {
                    navLinks.classList.remove("active");
                    hamburger.classList.remove("active");
                });
            });
        }

        // ==================== SCROLL SUAVE (com offset) ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function(e) {
                const targetId = this.getAttribute("href");
                if (targetId === "#") return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const offset = 80; // altura do header fixo
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: "smooth"
                    });
                }
            });
        });

        // Scroll down button
        const scrollDown = document.querySelector(".scroll-down");
        if (scrollDown) {
            scrollDown.addEventListener("click", function() {
                const target = document.querySelector(this.getAttribute("data-target"));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            });
        }

        // ==================== DESTAQUE DO MENU ATIVO ====================
        window.addEventListener("scroll", () => {
            const sections = document.querySelectorAll("section");
            const scrollPos = window.scrollY + 100;
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    const id = section.getAttribute("id");
                    navLinksItems.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        });

        // ==================== ANIMAÇÃO DE ENTRADA (cards) ====================
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, observerOptions);

        document.querySelectorAll(".skill-card, .project-card").forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(card);
        });

        // ==================== TRADUÇÃO (PT/EN) ====================
        const languageToggle = document.getElementById("language-toggle");
        const flagIcon = document.getElementById("flag-icon");
        let currentLanguage = "pt";

        const translations = {
            // Menu
            "menu-home": { pt: "home", en: "home" },
            "menu-about": { pt: "sobre", en: "about" },
            "menu-expertise": { pt: "habilidades", en: "expertise" },
            "menu-work": { pt: "projetos", en: "work" },
            "menu-contact": { pt: "contato", en: "contact" },

            // Hero
            "hero-title": { pt: "DESENVOLVEDOR FULL-STACK", en: "FULL-STACK DEVELOPER" },
            "hero-expertise": { pt: "habilidades", en: "expertise" },
            "hero-work": { pt: "projetos", en: "work" },
            "hero-contact": { pt: "contato", en: "contact" },

            // About
            "about-title": { pt: "Sobre <span>Mim</span>", en: "About <span>Me</span>" },
            "about-text-p1": {
                pt: "Olá! Sou Kauã Frenedozo, Sou desenvolvedor full-stack com perfil de liderança e foco em transformar ideias em sistemas funcionais, escaláveis e bem estruturados. Tenho experiência liderando o desenvolvimento de sistemas completos e estou sempre buscando evoluir não só como programador, mas como alguém que resolve problemas e gera impacto.. ",
                en: "Hello! I'm Kauã Frenedozo. I'm a full-stack developer with a leadership mindset, focused on turning ideas into functional, scalable, and well-structured systems. I have experience leading the development of complete systems and I’m always striving to grow not only as a programmer, but as someone who solves problems and creates impact."
            },
            "about-text-p2": {
                pt: "Gosto de construir sistemas que realmente fazem sentido, não só tecnicamente, mas na forma como são usados no dia a dia. Me preocupo com a estrutura, com as decisões por trás do código e com a experiência de quem vai interagir com o que eu desenvolvo.",
                en: "I like building systems that actually make sense, not just technically, but in how they’re used in real scenarios. I care about structure, the decisions behind the code, and the experience of the people interacting with what I build."
            },

            // Skills
            "skills-title": { pt: "Minhas <span>Habilidades</span>", en: "My <span>Skills</span>" },
            "skill-html": { pt: "Criação de interfaces responsivas e acessíveis com as mais recentes tecnologias web.", en: "Creating responsive and accessible interfaces with the latest web technologies." },
            "skill-js": { pt: "Desenvolvimento de aplicações interativas e dinâmicas com ES6+ e padrões modernos.", en: "Development of interactive and dynamic applications with ES6+ and modern patterns." },
            "skill-react": { pt: "Construção de interfaces de usuário escaláveis e de alto desempenho com React.", en: "Building scalable and high-performance user interfaces with React." },
            "skill-java": { pt: "Desenvolvimento de aplicações back-end robustas e escaláveis com Java e Spring Boot.", en: "Developing robust and scalable back-end applications with Java and Spring Boot." },
            "skill-python": { pt: "Programação em Python para automação, análise de dados e desenvolvimento web.", en: "Python programming for automation, data analysis, and web development." },
            "skill-github": { pt: "Versionamento de código e gerenciamento de branches seguindo o fluxo GitFlow.", en: "Code versioning and branch management following GitFlow workflow." },
            "skill-scrum": { pt: "Gestão ágil de projetos com sprints, backlogs e quadros de tarefas.", en: "Agile project management with sprints, backlogs, and task boards." },
            "skill-ui": { pt: "Design de interfaces intuitivas focadas na experiência do usuário e usabilidade.", en: "Designing intuitive interfaces focused on user experience and usability." },
            "skill-responsive": { pt: "Sites que se adaptam perfeitamente a qualquer dispositivo ou tamanho de tela.", en: "Websites that perfectly adapt to any device or screen size." },

            // Projects
            "projects-title": { pt: "Meus <span>Projetos</span>", en: "My <span>Projects</span>" },
            "project-1-title": { pt: "FaceShield", en: "FaceShield" },
            "project-1-desc": { pt: "Sistema de gerenciamento de empréstimos com reconhecimento facial. Backend em Java e Spring Boot, frontend em JavaScript, HTML e CSS e para o Banco Postgree", en: "Loan management system with facial recognition. Backend in Spring Boot, frontend in JavaScript HTML and Css. DataBase Postgree." },
            "project-2-title": { pt: "Landing Page – FaceShield", en: "Landing Page – FaceShield" },
            "project-2-desc": { pt: "Página institucional para a empresa, destacando serviços e identidade visual.", en: "Corporate page highlighting services and brand identity." },
            "project-3-title": { pt: "Varys", en: "Varys" },
            "project-3-desc": { pt: "Aplicação desenvolvida para otimizar o processo comercial, permitindo a criação rápida de orçamentos personalizados. O sistema automatiza a inserção de dados em modelos de papel timbrado, garantindo padronização visual e profissionalismo para a marca.", 
                en: "A productivity tool designed to streamline the sales workflow by generating professional business quotes. The application automates data entry into customized letterhead templates, ensuring brand consistency and high-quality document output." },
            "project-code": { pt: "Ver Código", en: "View Code" },
            "project-code-2": { pt: "Ver Demo", en: "View Demo" },
            "project-code-3": { pt: "Em breve", en: "Coming Soon" },

            // Contact
            "contact-title": { pt: "Entre em <span>Contato</span>", en: "Contact <span>Me</span>" },
            "contact-text": { pt: "Estou disponível para novos projetos e oportunidades. Entre em contato comigo através dos canais abaixo ou envie uma mensagem direta.", en: "I am available for new projects and opportunities. Contact me through the channels below or send a direct message." },

            // Footer
            "footer-text": { pt: "© 2026 Kauã Frenedozo. Todos os direitos reservados.", en: "© 2026 Kauã Frenedozo. All rights reserved." }
        };

        function updateLanguage(lang) {
            flagIcon.src = lang === "pt" ? "https://flagcdn.com/w20/br.png" : "https://flagcdn.com/w20/us.png";
            Object.keys(translations).forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    if (id === "about-title" || id === "skills-title" || id === "projects-title" || id === "contact-title") {
                        element.innerHTML = translations[id][lang];
                    } else {
                        element.textContent = translations[id][lang];
                    }
                }
            });
            currentLanguage = lang;
        }

        if (languageToggle) {
            languageToggle.addEventListener("click", () => {
                const newLang = currentLanguage === "pt" ? "en" : "pt";
                updateLanguage(newLang);
            });
        }

        // Inicializar em português
        updateLanguage("pt");
  