const button = document.getElementById('submitButton');
const openUrlButton = document.getElementById('openUrl');

const baseURL = 'https://short.wtf';

button.addEventListener('click', async () => { 
  const input = document.getElementById('shortUrl')
  const shortUrl = await axios.post(baseURL, {
    url: input.value
  })

  const { data: { newUrl } } = shortUrl;

  input.value = newUrl;
  /* Select the text field */
  input.select();
  input.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(input.value);
  button.type = 'hidden'
  input.disabled = true;
  document.getElementById('openUrl').type = 'button';

  document.getElementById('urlmessage').value = `URL ${newUrl} copiada com sucesso`;  
});

openUrlButton.addEventListener('click', () => {
  window.location.href = document.getElementById('shortUrl').value;
});

axios.get(`${baseURL}/cont`);