// Dashboard Page JavaScript

// Sample mission data
const missions = [
    {
        id: 1,
        title: 'College Admission Application',
        type: 'Educational',
        status: 'in-progress',
        progress: 65,
        lastAction: 'Verified eligibility for Section 12-A scholarship',
        lastActionTime: '2:34 PM',
        startedAt: '2 days ago',
        documentsCount: 8,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>`
    },
    {
        id: 2,
        title: 'Passport Renewal',
        type: 'Government',
        status: 'in-progress',
        progress: 45,
        lastAction: 'Filling form DS-82, section 3 of 7',
        lastActionTime: '1:15 PM',
        startedAt: '1 day ago',
        documentsCount: 5,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <circle cx="12" cy="10" r="3"/>
      <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
    </svg>`
    },
    {
        id: 3,
        title: 'Tax Return Filing 2025',
        type: 'Government',
        status: 'in-progress',
        progress: 80,
        lastAction: 'Calculating deductions under Section 80C',
        lastActionTime: '11:42 AM',
        startedAt: '5 hours ago',
        documentsCount: 12,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>`
    },
    {
        id: 4,
        title: 'Driver\'s License Application',
        type: 'Government',
        status: 'pending',
        progress: 30,
        lastAction: 'Waiting for identity verification',
        lastActionTime: '10:20 AM',
        startedAt: '3 days ago',
        documentsCount: 4,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <circle cx="8" cy="10" r="2"/>
      <path d="M14 8h5M14 12h5M14 16h5"/>
    </svg>`
    },
    {
        id: 5,
        title: 'Medical Insurance Claim',
        type: 'Insurance',
        status: 'in-progress',
        progress: 55,
        lastAction: 'Uploading medical bills and receipts',
        lastActionTime: '9:05 AM',
        startedAt: '1 day ago',
        documentsCount: 6,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>`
    },
    {
        id: 6,
        title: 'Scholarship Application',
        type: 'Educational',
        status: 'completed',
        progress: 100,
        lastAction: 'Application submitted successfully',
        lastActionTime: 'Yesterday',
        startedAt: '1 week ago',
        documentsCount: 7,
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>`
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const missionsGrid = document.getElementById('missions-grid');
    const filterTabs = document.querySelectorAll('.filter-tab');

    // Render missions
    function renderMissions(filter = 'all') {
        missionsGrid.innerHTML = '';

        const filteredMissions = missions.filter(mission => {
            if (filter === 'all') return true;
            if (filter === 'in progress') return mission.status === 'in-progress';
            if (filter === 'completed') return mission.status === 'completed';
            if (filter === 'pending') return mission.status === 'pending';
            return true;
        });

        filteredMissions.forEach((mission, index) => {
            const card = createMissionCard(mission);
            card.style.animation = `slideInUp 0.4s ease-out ${index * 0.05}s backwards`;
            missionsGrid.appendChild(card);
        });
    }

    // Create mission card
    function createMissionCard(mission) {
        const card = document.createElement('div');
        card.className = 'mission-card';
        card.onclick = () => window.location.href = `/workspace?mission=${mission.id}`;

        const statusBadge = getStatusBadge(mission.status);

        card.innerHTML = `
      <div class="mission-header">
        <div style="flex: 1;">
          <h3 class="mission-title">${mission.title}</h3>
          <p class="mission-type">${mission.type}</p>
        </div>
        <div class="mission-icon">
          ${mission.icon}
        </div>
      </div>

      <div class="mission-progress">
        <div class="progress-header">
          <span class="progress-label">Progress</span>
          <span class="progress-percentage">${mission.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${mission.progress}%"></div>
        </div>
      </div>

      <div class="mission-last-action">
        <div class="last-action-label">Last Action Taken</div>
        <div class="last-action-text">${mission.lastAction}</div>
        <div class="last-action-time">${mission.lastActionTime}</div>
      </div>

      <div class="mission-footer">
        <div class="mission-meta">
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <circle cx="7" cy="7" r="6"/>
              <path d="M7 3V7L10 9" stroke="var(--color-bg-primary)" stroke-width="1.5" fill="none"/>
            </svg>
            ${mission.startedAt}
          </div>
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M11 2H10V1H8V2H6V1H4V2H3C2.45 2 2 2.45 2 3V12C2 12.55 2.45 13 3 13H11C11.55 13 12 12.55 12 12V3C12 2.45 11.55 2 11 2ZM11 12H3V5H11V12Z"/>
            </svg>
            ${mission.documentsCount} docs
          </div>
        </div>
        ${statusBadge}
      </div>
    `;

        return card;
    }

    // Get status badge
    function getStatusBadge(status) {
        const badges = {
            'in-progress': '<span class="badge badge-info">In Progress</span>',
            'completed': '<span class="badge badge-success">Completed</span>',
            'pending': '<span class="badge badge-warning">Pending</span>'
        };
        return badges[status] || '';
    }

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.textContent.toLowerCase();
            renderMissions(filter);
        });
    });

    // Initial render
    renderMissions();

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.mission-card');

            cards.forEach(card => {
                const title = card.querySelector('.mission-title').textContent.toLowerCase();
                const type = card.querySelector('.mission-type').textContent.toLowerCase();

                if (title.includes(query) || type.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // User menu dropdown (placeholder)
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', () => {
            console.log('User menu clicked - implement dropdown');
        });
    }

    // Notification button (placeholder)
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            console.log('Notifications clicked - implement panel');
        });
    }

    // Start new process button
    const startProcessBtn = document.querySelector('.page-header .btn-primary');
    if (startProcessBtn) {
        startProcessBtn.addEventListener('click', () => {
            console.log('Start new process - implement modal');
            // Could open a modal or redirect to a new process page
        });
    }
});
