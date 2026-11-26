(() => {
const form = document.querySelector('#quote-form');
if (!form) return;
const formStatus = form.querySelector('.form-status');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const submit = form.querySelector('button[type="submit"]');
  if (submit.disabled) return;
  const values = Object.fromEntries(new FormData(form));
  if (!['Phone', 'Name', 'Organisation', 'Product'].every(field => values[field].trim())) {
    formStatus.textContent = 'Enter your phone, name, organisation and product requirements.';
    return;
  }
  window.dataLayer?.push({event:'quote_form_submit'});
  submit.disabled = true;
  formStatus.textContent = 'Sending your request…';
  try {
    const response = await fetch('https://formsubmit.co/ajax/gouriandsonsllp@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, _subject: 'Gauri & Sons website quote request', _template: 'table' })
    });
    const result = await response.json();
    if (!response.ok || String(result.success) !== 'true') throw new Error('Submission not confirmed');
    form.reset();
    window.dataLayer?.push({event:'quote_form_success'});
    formStatus.textContent = 'Thank you. Your quote request was sent.';
  } catch {
    formStatus.textContent = 'Your request could not be sent. Please call or contact us on WhatsApp.';
  } finally {
    submit.disabled = false;
  }
});

})();
