const push = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

export function trackCTA(label, destination = 'whatsapp') {
  push({ event: 'cta_click', cta_label: label, cta_destination: destination });
}

export function trackSection(section) {
  push({ event: 'section_view', section_name: section });
}

export function trackFormSubmit(form_name) {
  push({ event: 'form_submit', form_name });
}
