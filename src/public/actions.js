const button = document.getElementById('submitButton')

button.addEventListener('click', async () => { 
  const input = document.getElementById('url')
  const shortUrl = await axios.post('https://158.101.15.97/', {
    url: input.value
  })
  const shortUrlDiv = document.getElementById('shortUrl')
  const newUrl = document.createElement('a')
  newUrl.href = shortUrl.data.newUrl
  newUrl.className = 'generated-url'
  newUrl.innerText = shortUrl.data.newUrl;
  shortUrlDiv.appendChild(newUrl)
})