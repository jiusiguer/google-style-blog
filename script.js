// Google Blog Style - JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = themeBtn.querySelector('.material-icons-round');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
    
    // Mobile Menu
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const menuIcon = menuBtn.querySelector('.material-icons-round');
        menuIcon.textContent = navMenu.classList.contains('active') ? 'close' : 'menu';
    });
    
    // Filter Chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });
    
    // Action Buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = btn.querySelector('.material-icons-round');
            const action = icon.textContent;
            
            if (action === 'bookmark_border') {
                icon.textContent = 'bookmark';
                icon.style.color = 'var(--primary)';
                showToast('已保存文章');
            } else if (action === 'bookmark') {
                icon.textContent = 'bookmark_border';
                icon.style.color = '';
                showToast('已取消保存');
            } else if (action === 'share') {
                showToast('分享链接已复制');
            }
        });
    });
    
    // Load More
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<span class="material-icons-round" style="animation: spin 1s linear infinite;">refresh</span> 加载中...';
        
        setTimeout(() => {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = '<span class="material-icons-round">refresh</span> 加载更多文章';
            showToast('已加载更多文章');
        }, 1500);
    });
    
    // Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.email-input');
        const email = emailInput.value;
        
        if (email && validateEmail(email)) {
            showToast('订阅成功！感谢您的关注');
            emailInput.value = '';
        } else {
            showToast('请输入有效的邮箱地址');
        }
    });
    
    // Header Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.pageYOffset > 100 ? 'var(--shadow-1)' : 'none';
    });
    
    // Subscribe Button
    document.querySelector('.subscribe-btn').addEventListener('click', () => {
        document.querySelector('.newsletter').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Nav Items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--on-surface);
        color: var(--surface);
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
        box-shadow: var(--shadow-2);
    `;
    
    document.body.appendChild(toast);
    
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideUp {
                from { opacity: 0; transform: translateX(-50%) translateY(20px); }
                to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
            @keyframes spin { to { transform: rotate(360deg); } }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

console.log('%c欢迎来到 TechBlog!', 'color: #1a73e8; font-size: 24px; font-weight: bold;');