const button = document.getElementById('submitButton')

button.addEventListener('click', async () => { 
  const input = document.getElementById('url')
  const shortUrl = await axios.post('http://localhost:3333', {
    url: input.value
  })
  const shortUrlDiv = document.getElementById('shortUrl')
  const newUrl = document.createElement('a')
  newUrl.href = shortUrl.data.newUrl
  newUrl.className = 'generated-url'
  newUrl.innerText = shortUrl.data.newUrl;
  shortUrlDiv.appendChild(newUrl)
})