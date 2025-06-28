document.addEventListener('DOMContentLoaded', function() {
  // Initialize 3D scene
  init3DScene();
  
  // Decrypt animation for header
  const header = document.querySelector('.header h1');
  header.style.animation = 'decrypt 1.5s ease-out forwards';
  
  // Intersection Observer for sections
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // Hide all sections
      sections.forEach(section => section.classList.remove('visible'));
      
      // Show selected section
      const sectionId = this.getAttribute('data-section');
      document.getElementById(sectionId).classList.add('visible');
      
      // Smooth scroll to section
      document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
  
  // Interactive background elements
  const gradient = document.querySelector('.cyber-gradient');
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    gradient.style.background = 
      `linear-gradient(135deg, rgba(0, 247, 255, 0.05) 0%, transparent 50%),
       linear-gradient(${-135 + x * 45}deg, rgba(255, 0, 247, 0.05) 0%, transparent 50%)`;
  });

  // Typewriter effect for terminal
  const terminalLines = document.querySelectorAll('.terminal-line');
  terminalLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.5 + 0.5}s`;
  });
  
  // Generate skills grid
  const skillsGrid = document.querySelector('.skills-grid');
  const skillsData = [
    { icon: 'fab fa-microsoft', title: 'Azure Security', desc: 'Defender for Endpoint, Sentinel, Identity Protection, and Cloud Posture Management' },
    { icon: 'fas fa-shield-alt', title: 'Threat Protection', desc: 'MITRE ATT&CK framework, SIEM solutions, and behavioral analysis' },
    { icon: 'fas fa-network-wired', title: 'Network Security', desc: 'Zero Trust Architecture, VPN configurations, and advanced firewall management' },
    { icon: 'fas fa-lock', title: 'Compliance', desc: 'ISO 27001, NIST frameworks, GDPR, and industry-specific regulations' },
    { icon: 'fas fa-code', title: 'Secure Coding', desc: 'OWASP Top 10, SAST/DAST tools, and secure development practices' },
    { icon: 'fas fa-cloud', title: 'Cloud Security', desc: 'AWS/GCP/Azure security best practices and configuration' },
    { icon: 'fas fa-bug', title: 'Penetration Testing', desc: 'Ethical hacking, vulnerability assessment, and red teaming' },
    { icon: 'fas fa-user-secret', title: 'Incident Response', desc: 'DFIR methodologies, forensic analysis, and threat containment' }
  ];
  
  skillsData.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML = `
      <h3><i class="${skill.icon}"></i> ${skill.title}</h3>
      <p>${skill.desc}</p>
    `;
    skillsGrid.appendChild(skillCard);
  });
  
  // Generate timeline
  const timeline = document.querySelector('.timeline');
  const timelineData = [
    { date: '2024 - Present', title: 'Freelance Cybersecurity Consultant', desc: 'Performed pentesting, incident response, and security training for SMBs and NGOs. Delivered risk-based reports and improved client defenses via OWASP/NIST-aligned strategies.' },
    { date: '2023 - 2024', title: 'Senior Cloud Security Engineer – Microsoft Project', desc: 'Implemented Defender for Endpoint, EDR, SIEM, and Identity Protection. Reduced threat exposure and educated teams on latest threat intel and mitigation tactics.' },
    { date: '2022 - 2023', title: 'Support Engineer – Intellias', desc: 'Led cloud migration across 5 EU regions. Managed Azure resources, SLAs, policy enforcement, and authored technical documentation and procedures.' },
    { date: '2021', title: 'IT Specialist – Cinema City', desc: 'Rebuilt regional IT infrastructure. Delivered OS deployments (Debian/Win), supported POS systems, and enforced backup/recovery procedures.' },
    { date: '2020 - 2021', title: 'Platform Engineer – Discovery', desc: 'Handled SIEM ops via Splunk and SolarWinds. Authored automation scripts and participated in incident bridges and recovery plans.' },
    { date: '2020', title: 'NOC Engineer – Sperasoft', desc: '24/7 infrastructure monitoring. Produced SOPs, ran escalations, and participated in collaborative network response workflows.' },
    { date: '2019 - 2020', title: 'Enterprise Operation Center Analyst – Grand Parade / William Hill', desc: 'Led vulnerability scans, threat hunting, patch management, and awareness training. Created incident response scenarios.' },
    { date: '2018 - 2019', title: 'Junior Network Specialist – Emitel SA', desc: 'Maintained MPLS and SDH links. Resolved Cisco-related issues, handled Jira tickets, and configured VPN and signal systems.' }
  ];
  
  timelineData.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
      <div class="timeline-date">${item.date}</div>
      <h3 class="timeline-title">${item.title}</h3>
      <p class="timeline-desc">${item.desc}</p>
    `;
    timeline.appendChild(timelineItem);
  });
});

function init3DScene() {
  // Create 3D scene inspired by Total Recall
  const container = document.getElementById('3d-container');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Add futuristic grid floor
  const gridHelper = new THREE.GridHelper(100, 100, 0x00ffaa, 0x00ffaa);
  gridHelper.position.y = -10;
  gridHelper.material.opacity = 0.1;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
  
  // Add floating cyber elements
  const cyberElements = [];
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0x00f7ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  
  // Create multiple floating elements
  for (let i = 0; i < 15; i++) {
    const element = new THREE.Mesh(geometry, material.clone());
    element.position.x = (Math.random() - 0.5) * 50;
    element.position.y = (Math.random() - 0.5) * 20;
    element.position.z = (Math.random() - 0.5) * 50;
    element.scale.setScalar(Math.random() * 2 + 0.5);
    element.userData = {
      speed: Math.random() * 0.02 + 0.01,
      rotation: {
        x: Math.random() * 0.02 - 0.01,
        y: Math.random() * 0.02 - 0.01,
        z: Math.random() * 0.02 - 0.01
      }
    };
    scene.add(element);
    cyberElements.push(element);
  }
  
  // Add pulsing core in the center
  const coreGeometry = new THREE.SphereGeometry(3, 32, 32);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00f7,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);
  
  // Position camera
  camera.position.z = 20;
  camera.position.y = 5;
  
  // Add orbit controls for interactive view
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Animate floating elements
    cyberElements.forEach(element => {
      element.position.y += Math.sin(Date.now() * element.userData.speed) * 0.01;
      element.rotation.x += element.userData.rotation.x;
      element.rotation.y += element.userData.rotation.y;
      element.rotation.z += element.userData.rotation.z;
    });
    
    // Pulse core
    core.scale.x = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    core.scale.y = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    core.scale.z = 1 + Math.sin(Date.now() * 0.001) * 0.1;
    
    controls.update();
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
}
