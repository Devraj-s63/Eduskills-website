// SPA Router + Page Rendering

// DOM references
const pages = {
  home: document.getElementById("page-home"),
  courses: document.getElementById("page-courses"),
  about: document.getElementById("page-about"),
  contact: document.getElementById("page-contact"),
  apply: document.getElementById("page-apply"),
};
const yearSpan = document.getElementById("year");
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

// Modal
const modal = document.getElementById("courseModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// Dummy course data
const courses = [
  { id: 1, title: "Web Development", duration: "3 Months", fees: "$300", category: "IT", description: "Learn HTML, CSS, JavaScript, and basics of Node.js." },
  { id: 2, title: "Digital Marketing", duration: "2 Months", fees: "$200", category: "Management", description: "SEO, Ads, Content Strategy, and Social Media Marketing." },
  { id: 3, title: "Soft Skills Training", duration: "1 Month", fees: "$150", category: "Soft Skills", description: "Improve Communication, Teamwork, and Leadership." },
];

// Testimonials data
const testimonials = [
  { name: "Rahul Sharma", text: "The Web Development course was amazing and helped me land my first job!" },
  { name: "Priya Verma", text: "Loved the Digital Marketing course. The trainers were very helpful." },
  { name: "Amit Singh", text: "Soft skills training really boosted my confidence during interviews." },
];

// Initialize year
yearSpan.textContent = new Date().getFullYear();

// Hamburger toggle
hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Router
function router() {
  const hash = location.hash || "#/";
  Object.values(pages).forEach((page) => page.classList.add("hidden"));

  if (hash === "#/" || hash === "") {
    renderHome();
    pages.home.classList.remove("hidden");
  } else if (hash === "#/courses") {
    renderCourses();
    pages.courses.classList.remove("hidden");
  } else if (hash === "#/about") {
    renderAbout();
    pages.about.classList.remove("hidden");
  } else if (hash === "#/contact") {
    renderContact();
    pages.contact.classList.remove("hidden");
  } else if (hash === "#/apply") {
    renderApply();
    pages.apply.classList.remove("hidden");
  }
}

// Render Home
function renderHome() {
  pages.home.innerHTML = `
    <section class="banner">
      <h1>Welcome to EduSkills Institute</h1>
      <p>Empowering you with skills to succeed in your career.</p>
    </section>
    <section>
      <h2>Featured Courses</h2>
      <div class="course-list">
        ${courses
          .map(
            (c) => `
          <div class="course-card">
            <h3>${c.title}</h3>
            <p><b>Duration:</b> ${c.duration}</p>
            <p><b>Fees:</b> ${c.fees}</p>
            <button onclick="showCourse(${c.id})">Learn More</button>
            <button onclick="location.href='#/apply'">Apply Now</button>
          </div>`
          )
          .join("")}
      </div>
    </section>
    <section class="testimonials">
      <h2>What Our Students Say</h2>
      ${testimonials
        .map(
          (t) => `
        <div class="testimonial">
          <p>"${t.text}"</p>
          <p><b>- ${t.name}</b></p>
        </div>`
        )
        .join("")}
    </section>
  `;
}

// Render Courses
function renderCourses() {
  pages.courses.innerHTML = `
    <h2>Available Courses</h2>
    <label>Filter by Category: 
      <select id="courseFilter">
        <option value="All">All</option>
        <option value="IT">IT</option>
        <option value="Management">Management</option>
        <option value="Soft Skills">Soft Skills</option>
      </select>
    </label>
    <div id="courseList" class="course-list"></div>
  `;

  const filter = document.getElementById("courseFilter");
  const courseList = document.getElementById("courseList");

  function displayCourses(cat) {
    courseList.innerHTML = courses
      .filter((c) => cat === "All" || c.category === cat)
      .map(
        (c) => `
        <div class="course-card">
          <h3>${c.title}</h3>
          <p><b>Duration:</b> ${c.duration}</p>
          <p><b>Fees:</b> ${c.fees}</p>
          <button onclick="showCourse(${c.id})">Learn More</button>
          <button onclick="location.href='#/apply'">Apply Now</button>
        </div>`
      )
      .join("");
  }

  filter.addEventListener("change", () => displayCourses(filter.value));
  displayCourses("All");
}

// Render About
function renderAbout() {
  pages.about.innerHTML = `
    <h2>About Us</h2>
    <p>Our mission is to provide affordable, high-quality education to empower learners with practical skills.</p>
    <p>Our vision is to become a leading training institute that bridges the gap between education and industry.</p>
    <h3>Our Team</h3>
    <ul>
      <li><b>Rohit Kumar</b> - Founder & Director</li>
      <li><b>Anita Mehra</b> - Head of Training</li>
      <li><b>Vikas Gupta</b> - Placement Coordinator</li>
    </ul>
  `;
}

// Render Contact
function renderContact() {
  pages.contact.innerHTML = `
    <h2>Contact Us</h2>
    <form id="contactForm">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <input type="text" name="phone" placeholder="Your Phone" required />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
    <div style="margin-top:20px;">
      <h3>Find Us Here</h3>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.005188781763!2d80.93612547436582!3d26.861763362997267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2bb1234567%3A0xabcdef123456789!2sLucknow!5e0!3m2!1sen!2sin!4v1700000000000" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
  `;

  document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.msg || "Message sent!");
      e.target.reset();
    } catch (err) {
      alert("Error sending message. Check server.");
    }
  });
}

// Render Apply
function renderApply() {
  pages.apply.innerHTML = `
    <h2>Apply Now</h2>
    <form id="applyForm" enctype="multipart/form-data">
      <input type="text" name="name" placeholder="Full Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="phone" placeholder="Phone" required />
      <select name="course" required>
        <option value="">Select Course</option>
        ${courses.map((c) => `<option value="${c.title}">${c.title}</option>`).join("")}
      </select>
      <textarea name="education" placeholder="Education Details" required></textarea>
      <input type="file" name="resume" required />
      <button type="submit">Submit Application</button>
    </form>
  `;

  document.getElementById("applyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.msg || "Application submitted!");
      e.target.reset();
    } catch (err) {
      alert("Error submitting application. Check server.");
    }
  });
}

// Show course modal
window.showCourse = function (id) {
  const course = courses.find((c) => c.id === id);
  if (!course) return;
  modalBody.innerHTML = `
    <h2>${course.title}</h2>
    <p><b>Duration:</b> ${course.duration}</p>
    <p><b>Fees:</b> ${course.fees}</p>
    <p>${course.description}</p>
  `;
  modal.classList.remove("hidden");
};

// Modal close
modalClose.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Listen for hash changes
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
