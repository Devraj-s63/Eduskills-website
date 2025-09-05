const contactTableBody = document.querySelector("#contactTable tbody");
const applicationTableBody = document.querySelector("#applicationTable tbody");

// Change these URLs to your Render backend
const BASE_URL = "https://eduskills-website-1.onrender.com";

// Fetch and display contact messages
async function loadContacts() {
  try {
    const res = await fetch(`${BASE_URL}/api/test-contacts`);
    const contacts = await res.json();
    contactTableBody.innerHTML = contacts
      .map(
        (c) => `
      <tr>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.message}</td>
        <td>${c.created_at || "-"}</td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    contactTableBody.innerHTML = "<tr><td colspan='5'>Error loading data</td></tr>";
    console.error(err);
  }
}

// Fetch and display applications
async function loadApplications() {
  try {
    const res = await fetch(`${BASE_URL}/api/test-applications`);
    const applications = await res.json();
    applicationTableBody.innerHTML = applications
      .map(
        (a) => `
      <tr>
        <td>${a.name}</td>
        <td>${a.email}</td>
        <td>${a.phone}</td>
        <td>${a.course}</td>
        <td>${a.education}</td>
        <td>${a.resume || "-"}</td>
        <td>${a.created_at || "-"}</td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    applicationTableBody.innerHTML = "<tr><td colspan='7'>Error loading data</td></tr>";
    console.error(err);
  }
}

// Load both on page load
window.addEventListener("load", () => {
  loadContacts();
  loadApplications();
});
