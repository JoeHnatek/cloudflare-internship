class elementHandler {
  constructor(elementName) {
    this.elementName = elementName
  }

  element(element) {

    //Changes the title of the web page
    if(element.tagName === 'title'){
      element.setInnerContent('Go Bulldogs!')
    }

    //Changes main title of the page
    if(element.tagName === 'h1' && element.getAttribute('id') === 'title'){
      element.setInnerContent('Joseph Hnatek')
    }

    //Changes the description paragraph
    if(element.tagName === 'p' && element.getAttribute('id') === 'description'){
      element.setInnerContent('Double Majoring in Computer Science and Cognitive Science at UMN - Duluth. Check out my Github while you are here!')
    }

    //Changes call to action link and text
    if(element.tagName === 'a' && element.getAttribute('id') === 'url'){
      const item = element.getAttribute('href')
      element.setAttribute('href', item.replace("https://cloudflare.com", "https://github.com/jmh07"));
      element.setInnerContent('Click to visit github.com/jmh07')
    }
  }
}

const rewriter = new HTMLRewriter()
  .on('*', new elementHandler())


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

  /*await fetch(randomURL, {
    method: 'GET',
    headers: { 'content-type': 'text/html; charset=UTF-8' }
  })
  .then(res => res.text())
  .then(data => {
    resultOfRandomURL = data
    console.log(data)
  })*/

  const res = await fetch('https://cfw-takehome.developers.workers.dev/variants/2')

  //let a = rewriter.transform(res);
  /*return new Response(a, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  })*/
  return rewriter.transform(res)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})