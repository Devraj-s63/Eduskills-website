// SPA Router + Page Rendering with Modern EduSkills institue Design

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
const menu = document.querySelector(".nav-links");

// Modal
const modal = document.getElementById("courseModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// Updated course data with modern design
const courses = [
  { 
    id: 1, 
    title: "Web Development Bootcamp", 
    duration: "3 Months", 
    fees: "$299", 
    category: "IT", 
    description: "Master HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and launch your web development career.",
    instructor: "Sarah Johnson",
    rating: "4.8",
    reviews: "124",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  { 
    id: 2, 
    title: "Digital Marketing Mastery", 
    duration: "2 Months", 
    fees: "$199", 
    category: "Marketing", 
    description: "Learn SEO, Social Media Marketing, Google Ads, Content Strategy, and Analytics to grow any business online.",
    instructor: "Michael Chen",
    rating: "4.9",
    reviews: "89",
    gradient: "linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)"
  },
  { 
    id: 3, 
    title: "Data Science Fundamentals", 
    duration: "4 Months", 
    fees: "$399", 
    category: "Data Science", 
    description: "Python, Machine Learning, Data Analysis, and Visualization. Transform data into actionable insights.",
    instructor: "Dr. Emily Rodriguez",
    rating: "4.7",
    reviews: "156",
    gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
  },
  { 
    id: 4, 
    title: "UI/UX Design Principles", 
    duration: "2.5 Months", 
    fees: "$249", 
    category: "Design", 
    description: "Design thinking, user research, wireframing, prototyping, and creating beautiful, functional interfaces.",
    instructor: "Alex Thompson",
    rating: "4.8",
    reviews: "201",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  { 
    id: 5, 
    title: "Python Programming Basics", 
    duration: "2 Months", 
    fees: "$179", 
    category: "Programming", 
    description: "Learn Python from scratch. Programming fundamentals, data structures, and building practical applications.",
    instructor: "James Wilson",
    rating: "4.6",
    reviews: "178",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  },
  { 
    id: 6, 
    title: "Business Analytics", 
    duration: "3 Months", 
    fees: "$329", 
    category: "Business", 
    description: "Excel, SQL, Tableau, and business intelligence. Make data-driven decisions and optimize business performance.",
    instructor: "Lisa Park",
    rating: "4.7",
    reviews: "92",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  }
];

// Testimonials data
const testimonials = [
  { 
    name: "Sarah Martinez", 
    text: "EduSkills institue completely transformed my career. The Web Development course gave me the skills I needed to land my dream job at a tech startup. The instructors are amazing!",
    role: "Frontend Developer at TechCorp"
  },
  { 
    name: "David Chen", 
    text: "The flexibility to learn at my own pace while working full-time was perfect. The Data Science course content is top-notch and very practical.",
    role: "Data Analyst at DataFlow"
  },
  { 
    name: "Emily Johnson", 
    text: "I went from zero design experience to landing a UX role in just 6 months. The community support and mentorship made all the difference.",
    role: "UX Designer at DesignLab"
  },
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
  
  // Update active nav link
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    }
  });

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

// Render Home with modern design
function renderHome() {
  pages.home.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>Unlock Your Potential, Elevate Your Future</h1>
            <p>Join thousands of learners who are transforming their careers through our cutting-edge online courses and expert-led training programs.</p>
            
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-number">27k</span>
                <span class="stat-label">Students</span>
              </div>
              <div class="stat">
                <span class="stat-number">2hr</span>
                <span class="stat-label">Avg. Duration</span>
              </div>
            </div>

            <div class="hero-actions">
              <a href="#/courses" class="btn-primary">
                Explore Courses →
              </a>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Students learning">
            <div class="floating-avatars">
              <div class="avatar-group">
                <div class="avatar"></div>
                <div class="avatar"></div>
                <div class="avatar"></div>
              </div>
              <span>Join 27k+ Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses Section -->
    <section class="courses-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Courses</h2>
          <p class="section-subtitle">Discover our most popular and highly-rated courses designed to accelerate your career growth.</p>
        </div>
        
        <div class="course-list">
          ${courses.slice(0, 3).map(c => `
            <div class="course-card">
              <div class="course-image" style="background: ${c.gradient};">
                <div class="play-button">▶</div>
              </div>
              <div class="course-content">
                <h3 class="course-title">${c.title}</h3>
                <p class="course-instructor">By ${c.instructor}</p>
                <div class="course-meta">
                  <div class="course-rating">
                    <span>⭐ ${c.rating} (${c.reviews})</span>
                  </div>
                  <div class="course-price">${c.fees}</div>
                </div>
                <button onclick="showCourse(${c.id})" style="width: 100%; margin-top: 16px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">Learn More</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section style="padding: 80px 20px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">What Our Learners Say</h2>
          <p class="section-subtitle">Real stories from students who transformed their careers with EduSkills institue.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 30px;">
          ${testimonials.map(t => `
            <div style="background: white; padding: 32px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
              <div style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4a5568;">
                "${t.text}"
              </div>
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #FFE66D, #FF6B6B);"></div>
                <div>
                  <h4 style="font-weight: 600; color: #1a1a1a; margin-bottom: 4px;">${t.name}</h4>
                  <p style="font-size: 14px; color: #64748b;">${t.role}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// Render Courses
function renderCourses() {
  pages.courses.innerHTML = `
    <div class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Available Courses</h2>
          <p class="section-subtitle">Choose from our comprehensive range of professional courses designed to advance your career.</p>
        </div>
        
        <label style="display: block; margin-bottom: 30px; font-weight: 600;">
          Filter by Category: 
          <select id="courseFilter" style="margin-left: 10px; padding: 12px; border-radius: 8px; border: 2px solid #e2e8f0;">
            <option value="All">All Categories</option>
            <option value="IT">IT & Programming</option>
            <option value="Marketing">Digital Marketing</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
          </select>
        </label>
        
        <div id="courseList" class="course-list"></div>
      </div>
    </div>
  `;

  const filter = document.getElementById("courseFilter");
  const courseList = document.getElementById("courseList");

  function displayCourses(cat) {
    courseList.innerHTML = courses
      .filter((c) => cat === "All" || c.category === cat)
      .map(c => `
        <div class="course-card">
          <div class="course-image" style="background: ${c.gradient};">
            <div class="play-button">▶</div>
          </div>
          <div class="course-content">
            <h3 class="course-title">${c.title}</h3>
            <p class="course-instructor">By ${c.instructor}</p>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 16px;">${c.description}</p>
            <div class="course-meta">
              <div class="course-rating">
                <span>⭐ ${c.rating} (${c.reviews})</span>
              </div>
              <div class="course-price">${c.fees}</div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 16px;">
              <button onclick="showCourse(${c.id})" style="flex: 1; background: #f1f5f9; border: 2px solid #e2e8f0; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">Learn More</button>
              <button onclick="location.href='#/apply'" style="flex: 1; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer;">Apply Now</button>
            </div>
          </div>
        </div>
      `).join("");
  }

  filter.addEventListener("change", () => displayCourses(filter.value));
  displayCourses("All");
}

// Render About
function renderAbout() {
  pages.about.innerHTML = `
    <div class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">About EduSkills institue</h2>
          <p class="section-subtitle">Empowering learners worldwide with cutting-edge education and practical skills for the digital age.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; margin-bottom: 60px;">
          <div>
            <h3 style="color: #FF6B6B; font-size: 24px; margin-bottom: 16px;">Our Mission</h3>
            <p>To provide affordable, high-quality education that empowers learners with practical skills needed to succeed in today's rapidly evolving digital economy.</p>
          </div>
          <div>
            <h3 style="color: #FF6B6B; font-size: 24px; margin-bottom: 16px;">Our Vision</h3>
            <p>To become the leading online learning platform that bridges the gap between traditional education and industry requirements, creating opportunities for everyone.</p>
          </div>
        </div>

        <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          <h3 style="color: #1a1a1a; font-size: 28px; margin-bottom: 30px; text-align: center;">Meet Our Expert Team</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
            <div style="text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; color: white;">RK</div>
              <h4 style="font-weight: 600; margin-bottom: 8px;">Rohit Kumar</h4>
              <p style="color: #64748b; font-size: 14px;">Founder & Director</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; color: white;">AM</div>
              <h4 style="font-weight: 600; margin-bottom: 8px;">Anita Mehra</h4>
              <p style="color: #64748b; font-size: 14px;">Head of Training</p>
            </div>
            <div style="text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4ecdc4, #44a08d); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; color: white;">VG</div>
              <h4 style="font-weight: 600; margin-bottom: 8px;">Vikas Gupta</h4>
              <p style="color: #64748b; font-size: 14px;">Placement Coordinator</p>
            </div>
          </div>
        </div>

        <div style="margin-top: 60px; text-align: center; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 60px 40px; border-radius: 20px;">
          <h3 style="font-size: 32px; margin-bottom: 20px; color: #1a1a1a;">Why Choose EduSkills institue?</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-top: 40px;">
            <div>
              <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
              <h4 style="margin-bottom: 8px;">Industry-Focused</h4>
              <p style="color: #64748b;">Curriculum designed with industry experts</p>
            </div>
            <div>
              <div style="font-size: 48px; margin-bottom: 16px;">👥</div>
              <h4 style="margin-bottom: 8px;">Expert Instructors</h4>
              <p style="color: #64748b;">Learn from professionals with real experience</p>
            </div>
            <div>
              <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
              <h4 style="margin-bottom: 8px;">Flexible Learning</h4>
              <p style="color: #64748b;">Study at your own pace, anywhere, anytime</p>
            </div>
            <div>
              <div style="font-size: 48px; margin-bottom: 16px;">🏆</div>
              <h4 style="margin-bottom: 8px;">Placement Support</h4>
              <p style="color: #64748b;">Career guidance and job placement assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Contact
function renderContact() {
  pages.contact.innerHTML = `
    <div class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-subtitle">Have questions about our courses? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;">
          <div>
            <form id="contactForm">
              <input type="text" name="name" placeholder="Your Full Name" required />
              <input type="email" name="email" placeholder="Your Email Address" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" required />
              <textarea name="message" placeholder="Your Message" required rows="6"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
          
          <div>
            <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); margin-bottom: 30px;">
              <h3 style="margin-bottom: 20px; color: #1a1a1a;">Contact Information</h3>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; display: flex; align-items: center; justify-content: center;">📧</div>
                <div>
                  <p style="font-weight: 600;">Email</p>
                  <p style="color: #64748b;">info@EduSkills institue.com</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; display: flex; align-items: center; justify-content: center;">📞</div>
                <div>
                  <p style="font-weight: 600;">Phone</p>
                  <p style="color: #64748b;">+91 12345 67890</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; display: flex; align-items: center; justify-content: center;">📍</div>
                <div>
                  <p style="font-weight: 600;">Address</p>
                  <p style="color: #64748b;">Lucknow, Uttar Pradesh, India</p>
                </div>
              </div>
            </div>
            
            <div style="border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.005188781763!2d80.93612547436582!3d26.861763362997267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2bb1234567%3A0xabcdef123456789!2sLucknow!5e0!3m2!1sen!2sin!4v1700000000000" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    try {
      const res = await fetch("https://eduskills-website-1.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.msg || "Thank you for your message! We'll get back to you soon.");
      e.target.reset();
    } catch (err) {
      alert("There was an error sending your message. Please try again later.");
      console.error(err);
    }
  });
}

// Render Apply
function renderApply() {
  pages.apply.innerHTML = `
    <div class="content-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Apply Now</h2>
          <p class="section-subtitle">Take the first step towards transforming your career. Fill out the application form below and our team will get in touch with you.</p>
        </div>
        
        <div style="max-width: 800px; margin: 0 auto;">
          <div style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            <form id="applyForm" enctype="multipart/form-data">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <input type="text" name="name" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email Address" required />
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <input type="tel" name="phone" placeholder="Phone Number" required />
                <select name="course" required>
                  <option value="">Select Course</option>
                  ${courses.map((c) => `<option value="${c.title}">${c.title}</option>`).join("")}
                </select>
              </div>
              <textarea name="education" placeholder="Education Details (e.g., Bachelor's in Computer Science, 2020)" required rows="4"></textarea>
              <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600;">Upload Resume (PDF only)</label>
                <input type="file" name="resume" accept=".pdf" required style="padding: 16px; border: 2px dashed #e2e8f0; border-radius: 12px; background: #f8fafc;" />
              </div>
              <button type="submit">Submit Application</button>
            </form>
          </div>
          
          <div style="margin-top: 40px; text-align: center; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px; border-radius: 20px;">
            <h3 style="margin-bottom: 20px; color: #1a1a1a;">What Happens Next?</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px;">
              <div>
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">1</div>
                <h4 style="margin-bottom: 8px;">Application Review</h4>
                <p style="color: #64748b; font-size: 14px;">Our team reviews your application within 24 hours</p>
              </div>
              <div>
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">2</div>
                <h4 style="margin-bottom: 8px;">Counseling Call</h4>
                <p style="color: #64748b; font-size: 14px;">Schedule a call with our education counselor</p>
              </div>
              <div>
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #FFE66D, #FF6B6B); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">3</div>
                <h4 style="margin-bottom: 8px;">Start Learning</h4>
                <p style="color: #64748b; font-size: 14px;">Begin your journey to career transformation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("applyForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://eduskills-website-1.onrender.com/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.msg || "Application submitted successfully! We'll contact you within 24 hours.");
      e.target.reset();
    } catch (err) {
      alert("There was an error submitting your application. Please try again.");
      console.error(err);
    }
  });
}

// Show course modal
window.showCourse = function (id) {
  const course = courses.find((c) => c.id === id);
  if (!course) return;
  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 80px; height: 80px; background: ${course.gradient}; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px;">▶</div>
    </div>
    <h2 style="text-align: center; margin-bottom: 16px; color: #1a1a1a;">${course.title}</h2>
    <p style="text-align: center; color: #64748b; margin-bottom: 20px;">Instructor: ${course.instructor}</p>
    <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;">
      <div style="text-align: center;">
        <div style="font-weight: 700; font-size: 18px; color: #FF6B6B;">${course.duration}</div>
        <div style="font-size: 14px; color: #64748b;">Duration</div>
      </div>
      <div style="text-align: center;">
        <div style="font-weight: 700; font-size: 18px; color: #FF6B6B;">${course.fees}</div>
        <div style="font-size: 14px; color: #64748b;">Course Fee</div>
      </div>
      <div style="text-align: center;">
        <div style="font-weight: 700; font-size: 18px; color: #FF6B6B;">⭐ ${course.rating}</div>
        <div style="font-size: 14px; color: #64748b;">${course.reviews} Reviews</div>
      </div>
    </div>
    <p style="line-height: 1.6; color: #4a5568; margin-bottom: 30px;">${course.description}</p>
    <div style="text-align: center;">
      <button onclick="location.href='#/apply'; modal.classList.add('hidden');" style="background: linear-gradient(135deg, #FFE66D, #FF6B6B); border: none; padding: 16px 32px; border-radius: 12px; color: #1a1a1a; font-weight: 600; font-size: 16px; cursor: pointer; transition: transform 0.3s ease;">
        Apply for This Course
      </button>
    </div>
  `;
  modal.classList.remove("hidden");
};

// Modal close
modalClose.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const hash = this.getAttribute('href');
    window.location.hash = hash;
  });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = '#fff';
    header.style.backdropFilter = 'none';
  }
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const subscribeBtn = document.querySelector('footer button');
    if (subscribeBtn) {
      subscribeBtn.addEventListener('click', function() {
        const email = document.querySelector('footer input[type="email"]').value;
        if (email) {
          alert('Thank you for subscribing! You\'ll receive updates about new courses and offers.');
          document.querySelector('footer input[type="email"]').value = '';
        } else {
          alert('Please enter a valid email address.');
        }
      });
    }
  }, 1000);
});

// Listen for hash changes
window.addEventListener("hashchange", router);
window.addEventListener("load", router);