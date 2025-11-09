document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('jobSearchForm');
    const loading = document.getElementById('loading');
    const resultsSection = document.getElementById('resultsSection');
    const jobsGrid = document.getElementById('jobsGrid');
    const jobCount = document.getElementById('jobCount');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide previous results and errors
        resultsSection.style.display = 'none';
        errorMessage.style.display = 'none';
        loading.style.display = 'block';

        // Get form data
        const formData = new FormData(form);
        const queryOptions = {
            keyword: formData.get('keyword') || '',
            location: formData.get('location') || '',
            jobType: formData.get('jobType') || '',
            experienceLevel: formData.get('experienceLevel') || '',
            remoteFilter: formData.get('remoteFilter') || '',
            dateSincePosted: formData.get('dateSincePosted') || '',
            limit: formData.get('limit') || '10',
            sortBy: formData.get('sortBy') || 'recent',
            page: '0',
            has_verification: false,
            under_10_applicants: false
        };

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(queryOptions)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jobs = await response.json();
            displayJobs(jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            showError();
        } finally {
            loading.style.display = 'none';
        }
    });

    function displayJobs(jobs) {
        if (!jobs || jobs.length === 0) {
            showError('No jobs found. Try adjusting your search criteria.');
            return;
        }

        jobsGrid.innerHTML = '';
        jobCount.textContent = `${jobs.length} job${jobs.length === 1 ? '' : 's'} found`;

        jobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobsGrid.appendChild(jobCard);
        });

        resultsSection.style.display = 'block';
    }

    function createJobCard(job) {
        const card = document.createElement('div');
        card.className = 'job-card';

        // Add mouse move effect for card glow
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });

        const formattedDate = formatDate(job.date);
        const companyLogo = job.companyLogo || 'https://via.placeholder.com/70x70?text=Logo';
        const salary = job.salary && job.salary !== 'Not specified' ? job.salary : 'Salary not specified';

        card.innerHTML = `
            <div class="job-header">
                <img src="${companyLogo}" alt="${job.company} logo" class="company-logo" 
                     onerror="this.src='https://via.placeholder.com/70x70/ffffff/0a0a0a?text=${job.company.charAt(0)}'">
                <div class="job-info">
                    <h3>${escapeHtml(job.position)}</h3>
                    <div class="company">${escapeHtml(job.company)}</div>
                </div>
            </div>
            
            <div class="job-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${escapeHtml(job.location || 'Location not specified')}</span>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${formattedDate} ${job.agoTime ? `(${job.agoTime})` : ''}</span>
                </div>
                
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span class="salary">${escapeHtml(salary)}</span>
                </div>
            </div>
            
            <div class="job-actions">
                ${job.jobUrl ? `
                    <a href="${job.jobUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Job</span>
                    </a>
                ` : ''}
                <button class="btn btn-secondary" onclick="shareJob('${escapeHtml(job.position)}', '${escapeHtml(job.company)}', '${job.jobUrl || ''}')">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        `;

        return card;
    }

    function formatDate(dateString) {
        if (!dateString) return 'Date not specified';
        
        try {
            const date = new Date(dateString);
            const options = { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            };
            return date.toLocaleDateString('en-US', options);
        } catch (error) {
            return dateString;
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    function showError(message = 'Something went wrong. Please try again.') {
        errorMessage.querySelector('p').textContent = message;
        errorMessage.style.display = 'block';
    }

    // Global function for sharing jobs
    window.shareJob = function(position, company, url) {
        const text = `Check out this job opportunity: ${position} at ${company}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Job Opportunity',
                text: text,
                url: url
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            const shareText = url ? `${text}\n${url}` : text;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Job details copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Job details copied to clipboard!');
            });
        }
    };

    // Auto-focus on keyword input
    document.getElementById('keyword').focus();

    // Add enter key support for form submission
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
});