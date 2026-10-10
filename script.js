    document.addEventListener("DOMContentLoaded", () => {
      // 1. Footer Year
      const yearEl = document.getElementById("yearPlaceholder");
      if (yearEl) yearEl.textContent = new Date().getFullYear();

      // 2. Custom Minimalist Toast System (No Icons, No Browser Alert)
      function triggerToast(title, message) {
        const container = document.getElementById("toastContainer");
        const toast = document.createElement("div");
        toast.className = "toast-item";
        toast.innerHTML = `
          <div class="toast-title">${title}</div>
          <div class="toast-desc">${message}</div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
          toast.classList.add("hide");
          setTimeout(() => toast.remove(), 300);
        }, 4000);
      }

      // 3. Persistent Theme Toggle (Clean Monospaced Text Indicator)
      const themeToggleBtn = document.getElementById("themeToggle");
      const currentTheme = localStorage.getItem("rb_theme") || "dark";
      document.documentElement.setAttribute("data-theme", currentTheme);
      updateThemeButtonLabel(currentTheme);

      function updateThemeButtonLabel(theme) {
        themeToggleBtn.textContent = theme === "dark" ? "[ LIGHT ]" : "[ DARK ]";
      }

      themeToggleBtn.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("rb_theme", nextTheme);
        updateThemeButtonLabel(nextTheme);
        triggerToast("THEME SWITCHED", `Visual presentation mode changed to ${nextTheme.toUpperCase()}.`);
      });

      // 4. Mobile Navigation Toggle (Zero Icons, Pure Text)
      const mobileToggle = document.getElementById("mobileToggle");
      const navList = document.getElementById("navList");

      if (mobileToggle && navList) {
        mobileToggle.addEventListener("click", () => {
          const isOpen = navList.classList.toggle("open");
          mobileToggle.textContent = isOpen ? "CLOSE" : "MENU";
        });

        document.querySelectorAll(".nav-link").forEach(link => {
          link.addEventListener("click", () => {
            navList.classList.remove("open");
            mobileToggle.textContent = "MENU";
          });
        });
      }

      // 5. ScrollSpy for Navigation State
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link");

      window.addEventListener("scroll", () => {
        let currentId = "";
        sections.forEach(sec => {
          const top = sec.offsetTop - 120;
          const height = sec.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            currentId = sec.getAttribute("id");
          }
        });

        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      });

      // 6. Interactive Canvas Background (Minimalist Geometric Dots)
      const canvas = document.getElementById("grid-canvas");
      const ctx = canvas.getContext("2d");
      let dots = [];

      function sizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      sizeCanvas();
      window.addEventListener("resize", sizeCanvas);

      class GeometricPoint {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = (Math.random() - 0.5) * 0.4;
          this.radius = Math.random() * 1.5 + 0.8;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        }
        draw() {
          ctx.fillStyle = "rgba(99, 102, 241, 0.25)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < 40; i++) {
        dots.push(new GeometricPoint());
      }

      function renderGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(d => {
          d.update();
          d.draw();
        });
        requestAnimationFrame(renderGrid);
      }
      renderGrid();

      // 7. Hero Typewriter Effect (Clean Monospaced Roles)
      const typewriterTarget = document.getElementById("typewriterText");
      const roles = [
        "AI & Full Stack Developer",
        "B.Tech CSE Undergraduate",
        "React & Python Practitioner",
        "Algorithmic Problem Solver"
      ];
      let rIdx = 0;
      let cIdx = 0;
      let deleting = false;
      let pace = 90;

      function typeCycle() {
        const str = roles[rIdx];
        if (deleting) {
          typewriterTarget.textContent = str.substring(0, cIdx - 1);
          cIdx--;
          pace = 45;
        } else {
          typewriterTarget.textContent = str.substring(0, cIdx + 1);
          cIdx++;
          pace = 95;
        }

        if (!deleting && cIdx === str.length) {
          pace = 1900;
          deleting = true;
        } else if (deleting && cIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % roles.length;
          pace = 400;
        }
        setTimeout(typeCycle, pace);
      }
      typeCycle();

      // 8. Resume Request Action (Zero Native Alert)
      const resumeBtn = document.getElementById("resumeBtn");
      if (resumeBtn) {
        resumeBtn.addEventListener("click", () => {
          triggerToast("RESUME REQUEST", "Curriculum vitae preview acknowledged. You can email ramyabandarupalli4@gmail.com for the direct PDF.");
        });
      }

      // 9. Scroll-Triggered Metric Counters
      let countersDone = false;
      const statValues = document.querySelectorAll(".stat-value");

      function evaluateCounters() {
        if (countersDone) return;
        const container = document.querySelector(".stats-container");
        if (!container) return;

        const bounds = container.getBoundingClientRect();
        if (bounds.top <= window.innerHeight * 0.85) {
          countersDone = true;
          statValues.forEach(el => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            let val = 0;
            const inc = Math.ceil(target / 35);
            const timer = setInterval(() => {
              val += inc;
              if (val >= target) {
                el.textContent = target + "+";
                clearInterval(timer);
              } else {
                el.textContent = val;
              }
            }, 30);
          });
        }
      }
      window.addEventListener("scroll", evaluateCounters);
      evaluateCounters();

      // 10. Filterable Skills & Animated Progress Lines
      const filterButtons = document.querySelectorAll(".filter-btn");
      const skillCards = document.querySelectorAll(".skill-card");
      const progressFills = document.querySelectorAll(".progress-fill");

      function runSkillAnimations() {
        progressFills.forEach(bar => {
          const level = bar.getAttribute("data-level");
          bar.style.width = level + "%";
        });
      }

      filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          filterButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const category = btn.getAttribute("data-category");

          skillCards.forEach(card => {
            const domain = card.getAttribute("data-domain");
            if (category === "all" || domain === category) {
              card.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });
      });

      let skillsFilled = false;
      function checkSkillsScroll() {
        if (skillsFilled) return;
        const section = document.getElementById("skills");
        if (!section) return;
        const pos = section.getBoundingClientRect();
        if (pos.top <= window.innerHeight * 0.8) {
          skillsFilled = true;
          runSkillAnimations();
        }
      }
      window.addEventListener("scroll", checkSkillsScroll);
      checkSkillsScroll();

      // 11. Modal Dialog Logic (Detailed Project Specs)
      const projectDetails = {
        flexsched: {
          title: "FlexSched - Faculty Timetable Management",
          description: "FlexSched addresses logistical hurdles in academic institutions by simplifying faculty timetable adjustments, class swaps, and conflict avoidance.",
          points: [
            "Engineered timetable UI preventing concurrent period assignments and double-booking.",
            "Designed a swap request workflow enabling rapid peer substitutions.",
            "Implemented modular React component structure paired with Bootstrap responsive styling.",
            "Built with client-side validation for instantaneous feedback on slot availability."
          ]
        },
        wastedetect: {
          title: "Waste Detection, Classification & Reporting",
          description: "An automated waste identification system engineered using Python and machine intelligence to optimize municipal waste sorting pipelines.",
          points: [
            "Engineered the primary user interface and telemetry dashboard utilizing Streamlit.",
            "Built analytical reporting views detailing categorized trash statistics and counts.",
            "Streamlined input handling for real-time camera captures and batch photo evaluation.",
            "Designed to assist civic bodies with verifiable segregation tracking."
          ]
        }
      };

      const projectModal = document.getElementById("projectModal");
      const modalHeading = document.getElementById("modalHeading");
      const modalBody = document.getElementById("modalBodyContent");
      const closeModalBtn = document.getElementById("closeModalBtn");

      document.querySelectorAll(".open-modal-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
          const key = btn.getAttribute("data-project-key");
          const info = projectDetails[key];
          if (info) {
            modalHeading.textContent = info.title;
            modalBody.innerHTML = `
              <p>${info.description}</p>
              <div class="modal-list-title">Technical Specifications & Contributions:</div>
              <ul class="modal-list">
                ${info.points.map(pt => `<li>${pt}</li>`).join("")}
              </ul>
              <button class="btn btn-primary" id="modalConfirmBtn" type="button" style="width: 100%;">
                Close Specifications
              </button>
            `;
            projectModal.classList.add("active");

            document.getElementById("modalConfirmBtn").addEventListener("click", () => {
              projectModal.classList.remove("active");
            });
          }
        });
      });

      if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
          projectModal.classList.remove("active");
        });
      }

      window.addEventListener("click", (e) => {
        if (e.target === projectModal) {
          projectModal.classList.remove("active");
        }
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("active")) {
          projectModal.classList.remove("active");
        }
      });

      // 12. Contact Form Real-Time Validation
      const contactForm = document.getElementById("contactForm");
      const nameInput = document.getElementById("fullName");
      const emailInput = document.getElementById("emailAddress");
      const phoneInput = document.getElementById("phoneNumber");
      const subjectInput = document.getElementById("inquirySubject");
      const messageInput = document.getElementById("inquiryMessage");
      const charCount = document.getElementById("charCount");

      if (messageInput && charCount) {
        messageInput.addEventListener("input", () => {
          charCount.textContent = messageInput.value.length;
        });
      }

      function isValidEmailPattern(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
      }

      function validateInput(field, hintEl, isValid) {
        if (isValid) {
          field.classList.remove("error");
          hintEl.style.display = "none";
          return true;
        } else {
          field.classList.add("error");
          hintEl.style.display = "block";
          return false;
        }
      }

      nameInput.addEventListener("blur", () => {
        validateInput(nameInput, document.getElementById("fullNameError"), nameInput.value.trim().length >= 2);
      });

      emailInput.addEventListener("blur", () => {
        validateInput(emailInput, document.getElementById("emailAddressError"), isValidEmailPattern(emailInput.value.trim()));
      });

      subjectInput.addEventListener("blur", () => {
        validateInput(subjectInput, document.getElementById("inquirySubjectError"), subjectInput.value.trim().length >= 3);
      });

      messageInput.addEventListener("blur", () => {
        validateInput(messageInput, document.getElementById("inquiryMessageError"), messageInput.value.trim().length >= 15);
      });

      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const vName = validateInput(nameInput, document.getElementById("fullNameError"), nameInput.value.trim().length >= 2);
          const vEmail = validateInput(emailInput, document.getElementById("emailAddressError"), isValidEmailPattern(emailInput.value.trim()));
          const vSubject = validateInput(subjectInput, document.getElementById("inquirySubjectError"), subjectInput.value.trim().length >= 3);
          const vMessage = validateInput(messageInput, document.getElementById("inquiryMessageError"), messageInput.value.trim().length >= 15);

          let vPhone = true;
          if (phoneInput.value.trim() !== "") {
            vPhone = validateInput(
              phoneInput,
              document.getElementById("phoneNumberError"),
              /^[0-9+ -]{7,15}$/.test(phoneInput.value.trim())
            );
          }

          if (vName && vEmail && vSubject && vMessage && vPhone) {
            const sender = nameInput.value.trim();
            triggerToast("TRANSMISSION SUCCESSFUL", `Inquiry from ${sender} logged successfully. A response will follow shortly.`);
            contactForm.reset();
            charCount.textContent = "0";
          } else {
            triggerToast("VALIDATION ERROR", "Please address highlighted fields prior to dispatching your message.");
          }
        });
      }
    });