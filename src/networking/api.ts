const postApi = async (url: valuePostUrl, request) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    if(!response.ok) {
      return { error: 'Error: ' + url }
    }
    const json = await response.json()
    return { result: json }
  } catch (error) {
    return { error: 'Error: ' + url }
  }
}