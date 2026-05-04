// ── NAVBAR ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}


// ── CONTACT FORM ──
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const name  = document.getElementById('contactName')?.value.trim();
        const email = document.getElementById('contactEmail')?.value.trim();
        const msg   = document.getElementById('contactMsg')?.value.trim();
        if (!name || !email || !msg) { alert('Please fill all fields!'); return; }
        const successMsg = document.getElementById('successMsg');
        if (successMsg) successMsg.style.display = 'block';
        sendBtn.textContent = '✅ Sent!';
        setTimeout(() => {
            document.getElementById('contactName').value  = '';
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMsg').value   = '';
            sendBtn.textContent = 'Send Message';
            if (successMsg) successMsg.style.display = 'none';
        }, 3000);
    });
}


// ══════════════════════════════════════════════
//  RESUME GENERATOR
// ══════════════════════════════════════════════

let selectedTemplate = 'ai-dark';

function selectTemplate(template) {
    selectedTemplate = template;
    document.querySelectorAll('.template-card').forEach(card => card.classList.remove('selected'));
    const chosen = document.querySelector(`.template-card.${template}`);
    if (chosen) chosen.classList.add('selected');

    // Show/hide custom color picker
    const customOptions = document.getElementById('r-customOptions');
    if (customOptions) {
        customOptions.style.display = template === 'custom' ? 'block' : 'none';
    }
}

function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

const resumeThemes = {
    classic: {
        bg: '#ffffff', text: '#222222', muted: '#555555',
        accent: '#333333', headerBg: '#f5f5f5', border: '#dddddd',
        tag: '#eeeeee', tagText: '#333333',
        fontHead: 'Georgia, serif', fontBody: 'Arial, sans-serif',
    },
    'ai-dark': {
        bg: '#0a0a14', text: '#e8eaf6', muted: '#7a7f9a',
        accent: '#00ffff', headerBg: '#111122', border: 'rgba(0,255,255,0.2)',
        tag: 'rgba(0,255,255,0.08)', tagText: '#00ffff',
        fontHead: "'Orbitron', sans-serif", fontBody: "'Exo 2', sans-serif",
    },
    'blue-pro': {
        bg: '#0a1628', text: '#e8eaf6', muted: '#8899aa',
        accent: '#4499ff', headerBg: '#0d1f3c', border: 'rgba(0,100,255,0.2)',
        tag: 'rgba(0,100,255,0.1)', tagText: '#4499ff',
        fontHead: "'Trebuchet MS', sans-serif", fontBody: "'Calibri', sans-serif",
    },
    'purple-neo': {
        bg: '#0d0014', text: '#e8eaf6', muted: '#9b8ab8',
        accent: '#bf00ff', headerBg: '#130020', border: 'rgba(191,0,255,0.2)',
        tag: 'rgba(191,0,255,0.08)', tagText: '#bf00ff',
        fontHead: "'Orbitron', sans-serif", fontBody: "'Exo 2', sans-serif",
    },
    'custom': null, // built dynamically from color pickers
};

function getResumeTheme() {
    if (selectedTemplate === 'custom') {
        const bg     = document.getElementById('r-custom-bg')?.value    || '#0a0a14';
        const accent = document.getElementById('r-custom-accent')?.value || '#00ffff';
        const text   = document.getElementById('r-custom-text')?.value   || '#e8eaf6';
        return {
            bg, text,
            muted: text + 'aa',
            accent,
            headerBg: bg,
            border: accent + '44',
            tag: accent + '18',
            tagText: accent,
            fontHead: "'Orbitron', sans-serif",
            fontBody: "'Exo 2', sans-serif",
        };
    }
    return resumeThemes[selectedTemplate] || resumeThemes['ai-dark'];
}

function generateResumeHTML() {
    const name    = val('r-name');
    const title   = val('r-title');
    const email   = val('r-email');
    const phone   = val('r-phone');
    const location= val('r-location');
    const link    = val('r-link');
    const summary = val('r-summary');
    const degree  = val('r-degree');
    const college = val('r-college');
    const year    = val('r-year');
    const cgpa    = val('r-cgpa');
    const tech    = val('r-tech');
    const soft    = val('r-soft');
    const role    = val('r-role');
    const company = val('r-company');
    const expDesc = val('r-exp-desc');
    const p1name  = val('r-p1name');
    const p1desc  = val('r-p1desc');
    const p2name  = val('r-p2name');
    const p2desc  = val('r-p2desc');

    if (!name) { alert('Please enter your Full Name!'); return null; }

    const t = getResumeTheme();

    const needsGFont = ['ai-dark', 'purple-neo', 'custom'].includes(selectedTemplate);
    const gfontLink  = needsGFont
        ? '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">'
        : '';

    const techTags = tech ? tech.split(',').map(s => `<span class="tag">${s.trim()}</span>`).join('') : '';
    const softTags = soft ? soft.split(',').map(s => `<span class="tag">${s.trim()}</span>`).join('') : '';
    const linkHTML = link ? `<a href="${link}" style="color:${t.accent};">${link}</a>` : '';

    const expBlock = (role || company) ? `
    <div class="section">
        <div class="section-title">Experience / Internship</div>
        <div class="job-header"><strong>${role}</strong>${company ? ' — ' + company : ''}</div>
        ${expDesc ? `<p style="color:${t.muted}; margin-top:6px; line-height:1.7;">${expDesc}</p>` : ''}
    </div>` : '';

    const proj2 = p2name ? `
    <div class="project-item">
        <div class="project-name">${p2name}</div>
        <div class="project-desc">${p2desc}</div>
    </div>` : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${name} — Resume</title>
${gfontLink}
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:${t.fontBody}; background:${t.bg}; color:${t.text}; padding:40px 50px; line-height:1.6; }
  .header { border-bottom:2px solid ${t.accent}; padding-bottom:20px; margin-bottom:28px; }
  .name { font-family:${t.fontHead}; font-size:2rem; color:${t.accent}; letter-spacing:2px; }
  .job-title { font-size:1rem; color:${t.muted}; margin-top:4px; }
  .contact-row { display:flex; gap:20px; flex-wrap:wrap; margin-top:10px; font-size:0.85rem; color:${t.muted}; }
  .contact-row a { color:${t.accent}; text-decoration:none; }
  .section { margin-bottom:24px; }
  .section-title { font-family:${t.fontHead}; font-size:0.7rem; letter-spacing:3px; text-transform:uppercase; color:${t.accent}; margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid ${t.border}; }
  .summary-text { color:${t.muted}; font-size:0.95rem; line-height:1.8; }
  .edu-row { display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:6px; }
  .edu-degree { font-weight:600; font-size:0.95rem; }
  .edu-college { color:${t.muted}; font-size:0.9rem; }
  .edu-meta { font-size:0.85rem; color:${t.muted}; text-align:right; }
  .tags { display:flex; flex-wrap:wrap; gap:8px; margin-top:4px; }
  .tag { background:${t.tag}; color:${t.tagText}; border:1px solid ${t.border}; padding:3px 10px; border-radius:20px; font-size:0.8rem; }
  .job-header { font-weight:600; font-size:0.95rem; color:${t.text}; }
  .project-item { margin-bottom:14px; padding-left:12px; border-left:2px solid ${t.accent}; }
  .project-name { font-weight:600; color:${t.text}; font-size:0.95rem; }
  .project-desc { color:${t.muted}; font-size:0.88rem; margin-top:3px; line-height:1.6; }
</style>
</head>
<body>

<div class="header">
  <div class="name">${name}</div>
  ${title ? `<div class="job-title">${title}</div>` : ''}
  <div class="contact-row">
    ${email    ? `<span>${email}</span>` : ''}
    ${phone    ? `<span>${phone}</span>` : ''}
    ${location ? `<span>${location}</span>` : ''}
    ${linkHTML ? `<span>${linkHTML}</span>` : ''}
  </div>
</div>

${summary ? `<div class="section"><div class="section-title">Professional Summary</div><p class="summary-text">${summary}</p></div>` : ''}

${degree || college ? `
<div class="section">
  <div class="section-title">Education</div>
  <div class="edu-row">
    <div>
      <div class="edu-degree">${degree}</div>
      <div class="edu-college">${college}</div>
    </div>
    <div class="edu-meta">${year ? year + '<br>' : ''}${cgpa || ''}</div>
  </div>
</div>` : ''}

${tech || soft ? `
<div class="section">
  <div class="section-title">Skills</div>
  ${tech ? `<div style="margin-bottom:8px;"><span style="font-size:0.78rem;color:${t.muted};letter-spacing:1px;text-transform:uppercase;">Technical</span><div class="tags">${techTags}</div></div>` : ''}
  ${soft ? `<div><span style="font-size:0.78rem;color:${t.muted};letter-spacing:1px;text-transform:uppercase;">Soft Skills</span><div class="tags">${softTags}</div></div>` : ''}
</div>` : ''}

${expBlock}

${p1name ? `
<div class="section">
  <div class="section-title">Projects</div>
  <div class="project-item">
    <div class="project-name">${p1name}</div>
    <div class="project-desc">${p1desc}</div>
  </div>
  ${proj2}
</div>` : ''}

</body>
</html>`;

    return { name, html };
}

const previewBtn = document.getElementById('previewBtn');
if (previewBtn) {
    previewBtn.addEventListener('click', () => {
        const data = generateResumeHTML();
        if (!data) return;
        const tab = window.open();
        tab.document.write(data.html);
        tab.document.close();
    });
}

const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const data = generateResumeHTML();
        if (!data) return;
        const el = document.createElement('div');
        el.innerHTML = data.html;
        html2pdf().set({
            margin: 0.5,
            filename: data.name + '_resume.pdf',
            jsPDF: { format: 'a4' }
        }).from(el).save();
    });
}


// ══════════════════════════════════════════════
//  PORTFOLIO GENERATOR
// ══════════════════════════════════════════════

let selectedPortfolioTemplate = 'ai-dark';

function selectPortfolioTemplate(template, el) {
    selectedPortfolioTemplate = template;
    document.querySelectorAll('.p-template-card').forEach(c => c.classList.remove('selected'));
    if (el) el.classList.add('selected');

    // Show/hide custom color picker
    const customOptions = document.getElementById('p-customOptions');
    if (customOptions) {
        customOptions.style.display = template === 'custom' ? 'block' : 'none';
    }
}

function pval(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

const portfolioThemes = {
    'ai-dark': {
        bg: '#0a0a14', text: '#e8eaf6', muted: '#7a7f9a',
        accent: '#00ffff', headerBg: '#111122', border: 'rgba(0,255,255,0.2)',
        tag: 'rgba(0,255,255,0.08)', tagText: '#00ffff', cardBg: 'rgba(0,255,255,0.04)',
        fontHead: "'Orbitron', sans-serif", fontBody: "'Exo 2', sans-serif",
    },
    classic: {
        bg: '#ffffff', text: '#222222', muted: '#555555',
        accent: '#333333', headerBg: '#f5f5f5', border: '#dddddd',
        tag: '#eeeeee', tagText: '#333333', cardBg: '#f9f9f9',
        fontHead: 'Georgia, serif', fontBody: 'Arial, sans-serif',
    },
    'blue-pro': {
        bg: '#0a1628', text: '#e8eaf6', muted: '#8899aa',
        accent: '#4499ff', headerBg: '#0d1f3c', border: 'rgba(0,100,255,0.2)',
        tag: 'rgba(0,100,255,0.1)', tagText: '#4499ff', cardBg: 'rgba(0,100,255,0.05)',
        fontHead: "'Trebuchet MS', sans-serif", fontBody: "'Calibri', sans-serif",
    },
    'purple-neo': {
        bg: '#0d0014', text: '#e8eaf6', muted: '#9b8ab8',
        accent: '#bf00ff', headerBg: '#130020', border: 'rgba(191,0,255,0.2)',
        tag: 'rgba(191,0,255,0.08)', tagText: '#bf00ff', cardBg: 'rgba(191,0,255,0.04)',
        fontHead: "'Orbitron', sans-serif", fontBody: "'Exo 2', sans-serif",
    },
    'custom': null, // built dynamically
};

function getPortfolioTheme() {
    if (selectedPortfolioTemplate === 'custom') {
        const bg     = document.getElementById('p-custom-bg')?.value    || '#0a0a14';
        const accent = document.getElementById('p-custom-accent')?.value || '#00ffff';
        const text   = document.getElementById('p-custom-text')?.value   || '#e8eaf6';
        return {
            bg, text,
            muted: text + 'aa',
            accent,
            headerBg: bg,
            border: accent + '44',
            tag: accent + '18',
            tagText: accent,
            cardBg: accent + '0a',
            fontHead: "'Orbitron', sans-serif",
            fontBody: "'Exo 2', sans-serif",
        };
    }
    return portfolioThemes[selectedPortfolioTemplate] || portfolioThemes['ai-dark'];
}

function generatePortfolioHTML() {
    const name     = pval('p-name');
    const email    = pval('p-email');
    const phone    = pval('p-phone');
    const location = pval('p-location');
    const degree   = pval('p-degree');
    const college  = pval('p-college');
    const skills   = pval('p-skills');
    const p1name   = pval('p-p1name');
    const p1desc   = pval('p-p1desc');
    const p2name   = pval('p-p2name');
    const p2desc   = pval('p-p2desc');
    const bio      = pval('p-bio');
    const github   = pval('p-github');
    const linkedin = pval('p-linkedin');

    if (!name) { alert('Please enter your Full Name!'); return null; }

    const t = getPortfolioTheme();

    const needsGFont = ['ai-dark', 'purple-neo', 'custom'].includes(selectedPortfolioTemplate);
    const gfontLink  = needsGFont
        ? '<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet">'
        : '';

    const skillTags = skills ? skills.split(',').map(s => `<span class="tag">${s.trim()}</span>`).join('') : '';
    const initials  = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const proj2     = p2name ? `
    <div class="proj-card">
      <div class="proj-name">${p2name}</div>
      <div class="proj-desc">${p2desc}</div>
    </div>` : '';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${name} — Portfolio</title>
${gfontLink}
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:${t.fontBody}; background:${t.bg}; color:${t.text}; line-height:1.6; }
  .hero { background:${t.headerBg}; border-bottom:1px solid ${t.border}; padding:60px 50px 50px; display:flex; align-items:center; gap:30px; }
  .avatar { width:80px; height:80px; border-radius:50%; background:${t.tag}; border:2px solid ${t.accent}; display:flex; align-items:center; justify-content:center; font-family:${t.fontHead}; font-size:1.4rem; color:${t.accent}; flex-shrink:0; }
  .hero-text .name { font-family:${t.fontHead}; font-size:1.8rem; color:${t.accent}; letter-spacing:2px; }
  .hero-text .bio { color:${t.muted}; margin-top:8px; max-width:600px; font-size:0.95rem; }
  .contact-pills { display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; }
  .pill { background:${t.tag}; color:${t.tagText}; border:1px solid ${t.border}; padding:4px 14px; border-radius:20px; font-size:0.82rem; text-decoration:none; }
  .content { padding:40px 50px; max-width:900px; margin:0 auto; }
  .section { margin-bottom:36px; }
  .section-title { font-family:${t.fontHead}; font-size:0.68rem; letter-spacing:3px; text-transform:uppercase; color:${t.accent}; margin-bottom:14px; padding-bottom:8px; border-bottom:1px solid ${t.border}; }
  .edu-row { display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px; }
  .edu-degree { font-weight:600; }
  .edu-college { color:${t.muted}; font-size:0.9rem; }
  .tags { display:flex; flex-wrap:wrap; gap:8px; }
  .tag { background:${t.tag}; color:${t.tagText}; border:1px solid ${t.border}; padding:4px 12px; border-radius:20px; font-size:0.82rem; }
  .proj-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); gap:18px; }
  .proj-card { background:${t.cardBg}; border:1px solid ${t.border}; border-radius:10px; padding:22px; }
  .proj-name { font-family:${t.fontHead}; font-size:0.8rem; color:${t.accent}; letter-spacing:1px; margin-bottom:8px; }
  .proj-desc { color:${t.muted}; font-size:0.88rem; line-height:1.7; }
  footer { text-align:center; padding:24px; border-top:1px solid ${t.border}; color:${t.muted}; font-size:0.85rem; }
  footer span { color:${t.accent}; }
</style>
</head>
<body>

<div class="hero">
  <div class="avatar">${initials}</div>
  <div class="hero-text">
    <div class="name">${name}</div>
    ${bio ? `<div class="bio">${bio}</div>` : ''}
    <div class="contact-pills">
      ${email    ? `<a class="pill" href="mailto:${email}">${email}</a>` : ''}
      ${phone    ? `<span class="pill">${phone}</span>` : ''}
      ${location ? `<span class="pill">${location}</span>` : ''}
      ${github   ? `<a class="pill" href="${github}" target="_blank">GitHub</a>` : ''}
      ${linkedin ? `<a class="pill" href="${linkedin}" target="_blank">LinkedIn</a>` : ''}
    </div>
  </div>
</div>

<div class="content">

  ${degree || college ? `
  <div class="section">
    <div class="section-title">Education</div>
    <div class="edu-row">
      <div>
        <div class="edu-degree">${degree}</div>
        <div class="edu-college">${college}</div>
      </div>
    </div>
  </div>` : ''}

  ${skills ? `
  <div class="section">
    <div class="section-title">Skills</div>
    <div class="tags">${skillTags}</div>
  </div>` : ''}

  ${p1name ? `
  <div class="section">
    <div class="section-title">Projects</div>
    <div class="proj-grid">
      <div class="proj-card">
        <div class="proj-name">${p1name}</div>
        <div class="proj-desc">${p1desc}</div>
      </div>
      ${proj2}
    </div>
  </div>` : ''}

</div>

<footer><span>${name}</span> · Portfolio · ${new Date().getFullYear()}</footer>

</body>
</html>`;

    return { name, html };
}

const pPreviewBtn = document.getElementById('p-previewBtn');
if (pPreviewBtn) {
    pPreviewBtn.addEventListener('click', () => {
        const data = generatePortfolioHTML();
        if (!data) return;
        const tab = window.open();
        tab.document.write(data.html);
        tab.document.close();
    });
}

const pDownloadBtn = document.getElementById('p-downloadBtn');
if (pDownloadBtn) {
    pDownloadBtn.addEventListener('click', () => {
        const data = generatePortfolioHTML();
        if (!data) return;
        const el = document.createElement('div');
        el.innerHTML = data.html;
        html2pdf().set({
            margin: 0.5,
            filename: data.name + '_portfolio.pdf',
            jsPDF: { format: 'a4' }
        }).from(el).save();
    });
}