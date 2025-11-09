# 🔍 LinkedIn Jobs API

[![npm version](https://badge.fury.io/js/linkedin-jobs-api.svg)](https://badge.fury.io/js/linkedin-jobs-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Advanced Node.js package for getting job listings from LinkedIn with a beautiful web interface

## ✨ Features

- 🎯 **Advanced Job Search** - Search LinkedIn jobs with multiple filters
- 🌐 **Web Interface** - Beautiful, responsive web UI for job searching
- 📱 **Mobile Friendly** - Works perfectly on all devices
- ⚡ **Fast & Reliable** - Built-in caching and error handling
- 🔄 **Real-time Results** - Instant job fetching and display
- 📊 **Rich Data** - Company logos, salary info, job details, and more

## 🚀 Quick Start

### Installation

```bash
npm install linkedin-jobs-api express
```

### Web Interface (Recommended)

1. **Start the web server:**
```bash
npm start
```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Search for jobs** using the beautiful web interface!

![LinkedIn Jobs UI](https://via.placeholder.com/800x400/667eea/white?text=LinkedIn+Jobs+Web+Interface)

### Programmatic Usage

```javascript
const linkedIn = require("linkedin-jobs-api");

const queryOptions = {
  keyword: "software engineer",
  location: "India",
  dateSincePosted: "past Week",
  jobType: "full time",
  remoteFilter: "remote",
  salary: "100000",
  experienceLevel: "entry level",
  limit: "10",
  sortBy: "recent",
};

linkedIn.query(queryOptions).then((response) => {
  console.log(response); // An array of Job objects
});
```

## 📋 API Reference

### Query Options

| Parameter            | Default | Description | Possible Values |
| -------------------- | ------- | ----------- | --------------- |
| `keyword`            | `""`    | Job title or keywords | Any string |
| `location`           | `""`    | Job location | `"India"`, `"New York"`, etc. |
| `dateSincePosted`    | `""`    | How recent the job posting should be | `"past month"` \| `"past week"` \| `"24hr"` |
| `jobType`            | `""`    | Type of employment | `"full time"` \| `"part time"` \| `"contract"` \| `"temporary"` \| `"volunteer"` \| `"internship"` |
| `remoteFilter`       | `""`    | Work arrangement | `"on site"` \| `"remote"` \| `"hybrid"` |
| `salary`             | `""`    | Minimum salary filter | `40000` \| `60000` \| `80000` \| `100000` \| `120000` |
| `experienceLevel`    | `""`    | Required experience level | `"internship"` \| `"entry level"` \| `"associate"` \| `"senior"` \| `"director"` \| `"executive"` |
| `limit`              | `""`    | Maximum number of jobs to return | Any number as string |
| `sortBy`             | `""`    | Sort order | `"recent"` \| `"relevant"` |
| `page`               | `"0"`   | Page number for pagination | Any number as string |
| `has_verification`   | `false` | Show only verified jobs | `true` \| `false` |
| `under_10_applicants`| `false` | Show jobs with <10 applicants | `true` \| `false` |

### Response Format

Each job object contains:

```javascript
{
  position: "Software Engineer",           // Job title
  company: "Tech Company",                // Company name
  location: "San Francisco, CA",          // Job location
  date: "2025-09-21",                     // Posted date (ISO format)
  salary: "$120,000 - $150,000",          // Salary range (if available)
  jobUrl: "https://linkedin.com/jobs/...", // Direct LinkedIn URL
  companyLogo: "https://...",             // Company logo URL
  agoTime: "2 days ago"                   // Human-readable time
}
```

## 🛠️ Development

### Project Structure

```
linkedin-jobs-api/
├── public/                 # Web interface files
│   ├── index.html         # Main UI
│   ├── styles.css         # Styling
│   └── script.js          # Frontend logic
├── server.js              # Express web server
├── index.js               # Core LinkedIn API
├── test.js                # Example usage
└── package.json           # Dependencies
```

### Available Scripts

```bash
npm start          # Start the web server
npm run dev        # Start in development mode
npm test           # Run example search
```

### API Endpoints

When running the web server:

- `GET /` - Web interface
- `POST /api/jobs` - Job search API
- `GET /api/health` - Health check

## 🌟 Web Interface Features

- **🎨 Premium Black & White Design** - Modern, glassmorphism-inspired UI with stunning aesthetics
- **✨ Smooth Animations** - Fluid transitions and micro-interactions
- **🌙 Dark Theme** - Eye-friendly dark mode with elegant contrast
- **💎 Glassmorphism Effects** - Frosted glass aesthetic with backdrop blur
- **📱 Fully Responsive** - Seamless experience on all devices
- **🔍 Advanced Filters** - All LinkedIn search options available
- **⚡ Real-time Search** - Instant results with elegant loading states
- **💼 Premium Job Cards** - Beautiful cards with hover effects and gradient borders
- **🎯 Interactive Elements** - Animated buttons with ripple effects
- **🔗 Direct Links** - Click to view jobs on LinkedIn
- **📤 Share Feature** - Share job listings easily
- **🎪 Animated Grid** - Dynamic background pattern
- **⌨️ Keyboard Support** - Full keyboard navigation
- **♿ Accessible** - WCAG compliant with screen reader support

## 💡 Usage Examples

### Basic Search
```javascript
const jobs = await linkedIn.query({
  keyword: "react developer",
  location: "Remote",
  limit: "5"
});
```

### Advanced Search
```javascript
const jobs = await linkedIn.query({
  keyword: "senior frontend developer",
  location: "San Francisco",
  dateSincePosted: "past week",
  jobType: "full time",
  remoteFilter: "hybrid",
  salary: "120000",
  experienceLevel: "senior",
  limit: "20",
  sortBy: "recent"
});
```

### With Filtering
```javascript
const jobs = await linkedIn.query({
  keyword: "data scientist",
  location: "New York",
  has_verification: true,
  under_10_applicants: true,
  limit: "10"
});
```

## 🔧 Configuration

### Environment Variables

```bash
PORT=3000              # Web server port (default: 3000)
NODE_ENV=development   # Environment mode
```

### Cache Settings

The API includes built-in caching with a TTL of 1 hour to improve performance and reduce LinkedIn request load.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This package scrapes LinkedIn job data and may be subject to LinkedIn's terms of service. Use responsibly and in accordance with:

- LinkedIn's robots.txt
- LinkedIn's Terms of Service
- Rate limiting best practices
- Ethical web scraping guidelines

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🚀 Powered By

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Cheerio** - Server-side HTML parsing
- **Axios** - HTTP client
- **Modern Web Technologies** - HTML5, CSS3, ES6+

---

<div align="center">
  <strong>Made with ❤️ for the developer community</strong>
  <br>
  <sub>Star ⭐ this repo if it helped you!</sub>
</div>
