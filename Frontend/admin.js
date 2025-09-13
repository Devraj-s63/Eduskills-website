const contactTableBody = document.querySelector("#contactTable tbody");
const applicationTableBody = document.querySelector("#applicationTable tbody");

// Backend URL
const BASE_URL = "https://eduskills-website-1.onrender.com";

// Stats elements
const totalContactsEl = document.getElementById('totalContacts');
const totalApplicationsEl = document.getElementById('totalApplications');
const todayMessagesEl = document.getElementById('todayMessages');

// Utility: format date
function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Utility: status badge
function getStatusBadge(isNew = true) {
  return `<span class="status-badge ${isNew ? 'status-new' : 'status-old'}">
    ${isNew ? 'New' : 'Viewed'}
  </span>`;
}

// Utility: truncate text
function truncateText(text, maxLength = 100) {
  if (!text) return '-';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Count today's messages
function countTodayMessages(data) {
  const today = new Date().toDateString();
  return data.filter(item => {
    if (!item.createdAt) return false;
    const itemDate = new Date(item.createdAt).toDateString();
    return itemDate === today;
  }).length;
}

// Fetch and display contacts
async function loadContacts() {
  try {
    contactTableBody.innerHTML = '<tr><td colspan="5" class="loading">Loading contacts...</td></tr>';

    const res = await fetch(`${BASE_URL}/api/contact`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const contacts = await res.json();
    totalContactsEl.textContent = contacts.length;
    todayMessagesEl.textContent = countTodayMessages(contacts);

    if (contacts.length === 0) {
      contactTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-state">
            <div class="empty-state-icon">📇</div>
            <div>No contacts found</div>
          </td>
        </tr>
      `;
      return;
    }

    contactTableBody.innerHTML = contacts
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .map((c, index) => `
        <tr style="animation: fadeIn 0.5s ease ${index * 0.05}s both;">
          <td>${c.name || '-'}</td>
          <td><a href="mailto:${c.email || ''}" style="text-decoration:none;">${c.email || '-'}</a></td>
          <td><a href="tel:${c.phone || ''}" style="text-decoration:none;">${c.phone || '-'}</a></td>
          <td>${formatDate(c.createdAt)}</td>
          <td>${getStatusBadge(!c.viewed)}</td>
        </tr>
      `)
      .join("");

  } catch (err) {
    console.error('Error loading contacts:', err);
    contactTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="error">
          ❌ Error loading contacts: ${err.message}
        </td>
      </tr>
    `;
  }
}

// Fetch and display applications
async function loadApplications() {
  try {
    applicationTableBody.innerHTML = '<tr><td colspan="8" class="loading">Loading applications...</td></tr>';

    const res = await fetch(`${BASE_URL}/api/apply`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const applications = await res.json();
    totalApplicationsEl.textContent = applications.length;

    if (!Array.isArray(applications) || applications.length === 0) {
      applicationTableBody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <div class="empty-state-icon">📄</div>
            <div>No applications found</div>
            <small>Course applications will appear here when students apply</small>
          </td>
        </tr>
      `;
      return;
    }

    applicationTableBody.innerHTML = applications
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .map((a, index) => {
        const statusBadgeId = `status-${index}`;
        return `
          <tr style="animation: fadeIn 0.5s ease ${index * 0.05}s both;">
            <td style="font-weight: 600;">${a.name || '-'}</td>
            <td><a href="mailto:${a.email || ''}" style="color: #FF6B6B; text-decoration: none;">${a.email || '-'}</a></td>
            <td><a href="tel:${a.phone || ''}" style="color: #4a5568; text-decoration: none;">${a.phone || '-'}</a></td>
            <td><span style="background: linear-gradient(135deg, #FFE66D, #FF6B6B); padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #1a1a1a;">${a.course || '-'}</span></td>
            <td title="${a.education || ''}">${truncateText(a.education, 80)}</td>
            <td>
              ${a.resume ? 
                `<a href="${BASE_URL}/uploads/${a.resume}" target="_blank" style="color: #4ecdc4; text-decoration: none; font-weight: 600;">📎 View Resume</a>` : 
                '<span style="color: #a0a0a0;">No file</span>'
              }
            </td>
            <td style="font-size: 13px; color: #64748b;">${formatDate(a.created_at)}</td>
            <td>
              <span id="${statusBadgeId}" class="status-badge ${a.viewed ? 'status-old' : 'status-new'}" style="cursor: pointer;">
                ${a.viewed ? 'Viewed' : 'New'}
              </span>
            </td>
          </tr>
        `;
      })
      .join("");

    // Add click handlers for status badges
    applications.forEach((app, index) => {
      const badge = document.getElementById(`status-${index}`);
      if (badge && !app.viewed) {
        badge.addEventListener('click', async () => {
          try {
            await fetch(`${BASE_URL}/api/apply/${app._id}/view`, { method: 'PATCH' });
            badge.textContent = 'Viewed';
            badge.classList.remove('status-new');
            badge.classList.add('status-old');
          } catch (err) {
            console.error('Failed to update status:', err);
          }
        });
      }
    });

  } catch (err) {
    console.error('Error loading applications:', err);
    applicationTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="error">
          ❌ Error loading applications: ${err.message}
        </td>
      </tr>
    `;
  }
}

// Refresh all data
function refreshData() {
  loadContacts();
  loadApplications();
}

// Auto-refresh every 30 seconds
setInterval(refreshData, 30000);

// Load data on page load
window.addEventListener("load", () => {
  refreshData();

  // Initial stats animation
  setTimeout(() => {
    document.querySelectorAll('.stat-number').forEach((el, index) => {
      el.style.animation = `fadeIn 0.6s ease ${index * 0.2}s both`;
    });
  }, 500);
});

// Network events
window.addEventListener('online', () => {
  console.log('Connection restored, refreshing data...');
  refreshData();
});

window.addEventListener('offline', () => {
  console.log('Connection lost');
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .status-badge.status-new { background-color: #FF6B6B; color: #fff; padding: 2px 6px; border-radius: 4px; }
  .status-badge.status-old { background-color: #ccc; color: #000; padding: 2px 6px; border-radius: 4px; }
  .loading::after {
    content: '';
    display: inline-block;
    width: 20px; height: 20px;
    border: 2px solid #e2e8f0;
    border-radius: 50%;
    border-top-color: #FF6B6B;
    animation: spin 1s ease-in-out infinite;
    margin-left: 10px;
  }
`;
document.head.appendChild(style);
