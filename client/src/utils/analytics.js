const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initGA() {
  //   if (!GA_MEASUREMENT_ID || import.meta.env.DEV) return;
  if (!GA_MEASUREMENT_ID) return;
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      send_page_view: false
    });
  `;
  document.head.appendChild(script2);
}

export function trackPageView(path) {
  //   if (!window.gtag || import.meta.env.DEV) return;
  if (!window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName, params = {}) {
//   if (!window.gtag || import.meta.env.DEV) return;
if (!window.gtag) return;
  window.gtag("event", eventName, params);
}
