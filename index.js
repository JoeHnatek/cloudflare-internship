addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let urlVariants = "https://cfw-takehome.developers.workers.dev/api/variants";
  let resultOfVariants = [];


  await fetch(urlVariants, {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    resultOfVariants = data["variants"];
    console.log(resultOfVariants)
  })

  let randomNumber = [Math.floor(Math.random() * resultOfVariants.length)];

  let randomURL = resultOfVariants[randomNumber];

  let resultOfRandomURL;

  console.log(typeof randomURL)
  await fetch(randomURL, {
    method: 'GET',
    headers: { 'content-type': 'text/html; charset=UTF-8' }
  })
  .then(res => res.text())
  .then(data => {
    resultOfRandomURL = data
    console.log(data)
  })


  return new Response(resultOfRandomURL, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  })
}
