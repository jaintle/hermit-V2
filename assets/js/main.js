// Throttle
//
const throttle = (callback, limit) => {
  let timeoutHandler = null;
  return () => {
    if (timeoutHandler == null) {
      timeoutHandler = setTimeout(() => {
        callback();
        timeoutHandler = null;
      }, limit);
    }
  };
};

// addEventListener Helper
//
const listen = (ele, e, callback) => {
  if (document.querySelector(ele) !== null) {
    document.querySelector(ele).addEventListener(e, callback);
  }
}

/**
 * Functions
 */

// Auto Hide Header
//
let header = document.getElementById('site-header');
let lastScrollPosition = window.pageYOffset;

const autoHideHeader = () => {
  let currentScrollPosition = Math.max(window.pageYOffset, 0);
  if (currentScrollPosition > lastScrollPosition) {
    header.classList.remove('slideInUp');
    header.classList.add('slideOutDown');
  } else {
    header.classList.remove('slideOutDown');
    header.classList.add('slideInUp');
  }
  lastScrollPosition = currentScrollPosition;
}

// Mobile Menu Toggle
//
let mobileMenuVisible = false;

const toggleMobileMenu = () => {
  let mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuVisible == false) {
    mobileMenu.style.animationName = 'bounceInRight';
    mobileMenu.style.webkitAnimationName = 'bounceInRight';
    mobileMenu.style.display = 'block';
    mobileMenuVisible = true;
  } else {
    mobileMenu.style.animationName = 'bounceOutRight';
    mobileMenu.style.webkitAnimationName = 'bounceOutRight';
    mobileMenu.style.display = 'none';
    mobileMenuVisible = false;
  }
}

// Social Share Toggle
//
let shareMenuVisible = false;
const shareMobileMenu = () => {
  let shareMenu = document.getElementById('share-links');
  if (shareMenuVisible == false) {
    shareMenu.style.animationName = 'bounceInRight';
    shareMenu.style.webkitAnimationName = 'bounceInRight';
    shareMenu.style.display = 'block';
    shareMenuVisible = true;
  } else {
    shareMenu.style.animationName = 'bounceOutRight';
    shareMenu.style.webkitAnimationName = 'bounceOutRight';
    shareMenu.style.display = 'none';
    shareMenuVisible = false;
  }
}

// Featured Image Toggle
//
const showImg = () => {
  document.querySelector('.bg-img').classList.add('show-bg-img');
}

const hideImg = () => {
  document.querySelector('.bg-img').classList.remove('show-bg-img');
}

// ToC Toggle
//
const toggleToc = () => {
  document.getElementById('toc').classList.toggle('show-toc');
}


if (header !== null) {
  listen('#menu-btn', "click", toggleMobileMenu);
  listen('#share-btn', "click", shareMobileMenu);
  listen('#toc-btn', "click", toggleToc);
  listen('#img-btn', "click", showImg);
  listen('.bg-img', "click", hideImg);

  document.querySelectorAll('.post-year').forEach((ele) => {
    ele.addEventListener('click', () => {
      window.location.hash = '#' + ele.id;
    });
  });

  window.addEventListener('scroll', throttle(() => {
    autoHideHeader();

    if (mobileMenuVisible == true) {
      toggleMobileMenu();
    }
    if (shareMenuVisible == true) {
      shareMobileMenu();
    }
  }, 250));
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOMContentLoaded triggered");

  const subdomains = ["www.", "newsletter.", "communities."];
  const prefixSpan = document.getElementById("rotating-prefix");
  const homeLink = document.getElementById("home-link");

  console.log("🔍 prefixSpan:", prefixSpan);
  console.log("🔍 homeLink:", homeLink);

  if (!prefixSpan || !homeLink) {
    console.warn("🚨 DOM elements missing. Skipping rotation.");
    return;
  }

  let index = 0;

  function updateLink() {
    prefixSpan.style.opacity = 0;

    setTimeout(() => {
      const subdomain = subdomains[index];
      prefixSpan.textContent = subdomain;
      homeLink.href = `https://${subdomain}abhinav-ja.in`;
      prefixSpan.style.opacity = 1;
      index = (index + 1) % subdomains.length;
    }, 300);
  }

  updateLink();
  setInterval(updateLink, 3001);
});

