// Live Agent Workspace JavaScript

// Sample plan tree data
const planSteps = [
    {
        id: 1,
        title: 'Verify User Identity',
        description: 'Validate government-issued ID and cross-reference with database',
        status: 'completed',
        duration: '2m 34s'
    },
    {
        id: 2,
        title: 'Check Eligibility Criteria',
        description: 'Verify age, residency, and academic requirements',
        status: 'completed',
        duration: '1m 12s'
    },
    {
        id: 3,
        title: 'Gather Required Documents',
        description: 'Collect transcripts, recommendation letters, and essays',
        status: 'completed',
        duration: '4m 56s'
    },
    {
        id: 4,
        title: 'Fill Application Form',
        description: 'Complete all sections of the college admission application',
        status: 'processing',
        duration: 'In progress'
    },
    {
        id: 5,
        title: 'Verify Section 12-A Scholarship',
        description: 'Check eligibility for financial aid and scholarships',
        status: 'processing',
        duration: 'In progress'
    },
    {
        id: 6,
        title: 'Upload Supporting Documents',
        description: 'Attach all required files to the application portal',
        status: 'pending',
        duration: 'Pending'
    },
    {
        id: 7,
        title: 'Review and Submit',
        description: 'Final review of all information before submission',
        status: 'pending',
        duration: 'Pending'
    },
    {
        id: 8,
        title: 'Payment Processing',
        description: 'Process application fee payment',
        status: 'pending',
        duration: 'Pending'
    },
    {
        id: 9,
        title: 'Confirmation and Receipt',
        description: 'Generate confirmation number and receipt',
        status: 'pending',
        duration: 'Pending'
    }
];

// Sample documents
const documents = [
    {
        id: 1,
        name: 'High School Transcript.pdf',
        type: 'Academic Record',
        status: 'verified',
        size: '2.4 MB',
        preview: null
    },
    {
        id: 2,
        name: 'Recommendation Letter 1.pdf',
        type: 'Supporting Document',
        status: 'verified',
        size: '856 KB',
        preview: null
    },
    {
        id: 3,
        name: 'Personal Essay.docx',
        type: 'Application Material',
        status: 'processing',
        size: '124 KB',
        preview: null
    },
    {
        id: 4,
        name: 'Government ID.jpg',
        type: 'Identity Verification',
        status: 'verified',
        size: '1.8 MB',
        preview: null
    },
    {
        id: 5,
        name: 'Scholarship Form 12-A.pdf',
        type: 'Financial Aid',
        status: 'processing',
        size: '3.2 MB',
        preview: null
    },
    {
        id: 6,
        name: 'Proof of Residency.pdf',
        type: 'Supporting Document',
        status: 'verified',
        size: '1.1 MB',
        preview: null
    }
];

// Activity log messages
const activityMessages = [
    { type: 'info', message: 'Initializing application process...', details: 'System: AutoDocs v2.1.0' },
    { type: 'success', message: 'Identity verification completed', details: 'Verified: John Doe, DOB: 01/15/2006' },
    { type: 'info', message: 'Checking eligibility criteria...', details: 'Age: 18+, Residency: Confirmed, GPA: 3.8' },
    { type: 'success', message: 'Eligibility check passed', details: 'All requirements met' },
    { type: 'info', message: 'Retrieving academic transcripts...', details: 'Source: High School Database API' },
    { type: 'success', message: 'Transcripts downloaded and verified', details: 'File: High_School_Transcript.pdf' },
    { type: 'info', message: 'Processing recommendation letters...', details: 'Count: 2 letters received' },
    { type: 'info', message: 'Analyzing personal essay for completeness...', details: 'Word count: 650/650' },
    { type: 'success', message: 'Essay meets requirements', details: 'Grammar check: 98% score' },
    { type: 'info', message: 'Starting application form fill...', details: 'Form: Common Application 2026' },
    { type: 'info', message: 'Filling Section 1: Personal Information', details: 'Fields: Name, DOB, Contact' },
    { type: 'success', message: 'Section 1 completed', details: '12/12 fields filled' },
    { type: 'info', message: 'Filling Section 2: Academic History', details: 'Fields: Schools, Courses, GPA' },
    { type: 'info', message: 'Verifying eligibility for Section 12-A scholarship...', details: 'Criteria: Income < $50k, GPA > 3.5' },
    { type: 'success', message: 'Scholarship eligibility confirmed', details: 'Estimated award: $15,000/year' },
    { type: 'info', message: 'Filling scholarship application form...', details: 'Form: Section 12-A Financial Aid' },
    { type: 'info', message: 'Calculating family contribution...', details: 'EFC: $8,500' },
    { type: 'warning', message: 'Additional documentation required', details: 'Need: Tax returns for 2024-2025' },
    { type: 'info', message: 'Requesting tax documents from user...', details: 'Status: Pending user upload' }
];

let activityIndex = 0;
let autoScroll = true;
let activityInterval;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    renderPlanTree();
    renderDocuments();
    startActivityFeed();

    // Feed controls
    const feedControls = document.querySelectorAll('.feed-control');
    feedControls.forEach(control => {
        control.addEventListener('click', () => {
            const isAutoScroll = control.textContent.includes('Auto-scroll');
            const isPause = control.textContent.includes('Pause');

            if (isAutoScroll) {
                autoScroll = !autoScroll;
                control.classList.toggle('active');
            } else if (isPause) {
                if (activityInterval) {
                    clearInterval(activityInterval);
                    activityInterval = null;
                    control.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2L12 8L4 14V2Z"/>
            </svg>
            Resume
          `;
                } else {
                    startActivityFeed();
                    control.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2H14V14H2V2Z"/>
            </svg>
            Pause
          `;
                }
            }
        });
    });

    // Modal controls
    const modal = document.getElementById('preview-modal');
    const closeBtn = document.getElementById('close-preview');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Render plan tree
function renderPlanTree() {
    const planTree = document.getElementById('plan-tree');
    planTree.innerHTML = '';

    planSteps.forEach(step => {
        const item = document.createElement('div');
        item.className = `plan-tree-item plan-item ${step.status}`;

        const icon = getStepIcon(step.status);

        item.innerHTML = `
      <div class="plan-item-header">
        <div class="plan-item-icon">
          ${icon}
        </div>
        <div class="plan-item-content">
          <div class="plan-item-title">${step.title}</div>
          <div class="plan-item-description">${step.description}</div>
          <div class="plan-item-meta">
            <span>${getBadge(step.status)}</span>
            <span>•</span>
            <span>${step.duration}</span>
          </div>
        </div>
      </div>
    `;

        planTree.appendChild(item);
    });
}

// Get step icon based on status
function getStepIcon(status) {
    const icons = {
        completed: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2" fill="none"/>
    </svg>`,
        processing: `<svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2V6M12 18V22M22 12H18M6 12H2M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93"/>
    </svg>`,
        pending: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>`
    };
    return icons[status] || icons.pending;
}

// Get status badge
function getBadge(status) {
    const badges = {
        completed: '<span class="badge badge-success">Completed</span>',
        processing: '<span class="badge badge-info">Processing</span>',
        pending: '<span class="badge badge-pending">Pending</span>'
    };
    return badges[status] || '';
}

// Render documents
function renderDocuments() {
    const tray = document.getElementById('document-tray');
    const countEl = document.getElementById('document-count');

    tray.innerHTML = '';
    countEl.textContent = `${documents.length} docs`;

    documents.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'document-card';
        card.onclick = () => openPreview(doc);

        card.innerHTML = `
      <div class="document-preview">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M12 4H28L36 12V44H12V4Z"/>
          <path d="M28 4V12H36"/>
          <path d="M16 20H32M16 26H32M16 32H28"/>
        </svg>
      </div>
      <div class="document-info">
        <div class="document-name">${doc.name}</div>
        <div class="document-type">${doc.type}</div>
      </div>
      <div class="document-footer">
        <span class="document-size">${doc.size}</span>
        ${getBadge(doc.status)}
      </div>
    `;

        tray.appendChild(card);
    });
}

// Start activity feed
function startActivityFeed() {
    const feed = document.getElementById('activity-feed');

    // Add initial messages
    if (activityIndex === 0) {
        activityMessages.slice(0, 5).forEach(msg => {
            addActivityItem(msg);
            activityIndex++;
        });
    }

    // Continue adding messages
    activityInterval = setInterval(() => {
        if (activityIndex < activityMessages.length) {
            addActivityItem(activityMessages[activityIndex]);
            activityIndex++;
        } else {
            // Loop back with new simulated messages
            activityIndex = 0;
        }
    }, 2500);
}

// Add activity item
function addActivityItem(activity) {
    const feed = document.getElementById('activity-feed');
    const item = document.createElement('div');
    item.className = `activity-item ${activity.type}`;

    const timestamp = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    item.innerHTML = `
    <div class="activity-timestamp">${timestamp}</div>
    <div class="activity-content">
      <div class="activity-type">${activity.type}</div>
      <div class="activity-message">${activity.message}</div>
      ${activity.details ? `<div class="activity-details">${activity.details}</div>` : ''}
    </div>
  `;

    feed.appendChild(item);

    // Auto-scroll to bottom
    if (autoScroll) {
        feed.scrollTop = feed.scrollHeight;
    }

    // Limit feed items to prevent memory issues
    const items = feed.querySelectorAll('.activity-item');
    if (items.length > 50) {
        items[0].remove();
    }
}

// Open document preview
function openPreview(doc) {
    const modal = document.getElementById('preview-modal');
    const title = document.getElementById('preview-title');
    const body = document.getElementById('preview-body');

    title.textContent = doc.name;

    body.innerHTML = `
    <div style="text-align: center; padding: var(--space-3xl);">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="var(--color-text-tertiary)" stroke-width="2">
        <rect x="20" y="10" width="80" height="100" rx="4"/>
        <path d="M60 10V40L80 40"/>
        <path d="M30 50H90M30 60H90M30 70H90M30 80H70"/>
      </svg>
      <h3 style="margin-top: var(--space-xl); color: var(--color-text-primary);">${doc.name}</h3>
      <p style="color: var(--color-text-secondary); margin-top: var(--space-sm);">${doc.type}</p>
      <div style="margin-top: var(--space-xl); padding: var(--space-lg); background: var(--color-bg-tertiary); border-radius: var(--radius-lg);">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-lg); text-align: left;">
          <div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-tertiary); margin-bottom: var(--space-xs);">File Size</div>
            <div style="font-weight: var(--font-weight-semibold);">${doc.size}</div>
          </div>
          <div>
            <div style="font-size: var(--font-size-xs); color: var(--color-text-tertiary); margin-bottom: var(--space-xs);">Status</div>
            <div>${getBadge(doc.status)}</div>
          </div>
        </div>
      </div>
      <div style="margin-top: var(--space-xl);">
        <button class="btn btn-primary" onclick="console.log('Download ${doc.name}')">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2V14M10 14L6 10M10 14L14 10"/>
            <path d="M2 16H18"/>
          </svg>
          Download Document
        </button>
      </div>
    </div>
  `;

    modal.classList.add('active');
}

// Simulate plan tree updates
setInterval(() => {
    const processingSteps = planSteps.filter(s => s.status === 'processing');
    if (processingSteps.length > 0 && Math.random() > 0.7) {
        const step = processingSteps[0];
        step.status = 'completed';
        step.duration = `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`;

        const nextPending = planSteps.find(s => s.status === 'pending');
        if (nextPending) {
            nextPending.status = 'processing';
        }

        renderPlanTree();
    }
}, 8000);
