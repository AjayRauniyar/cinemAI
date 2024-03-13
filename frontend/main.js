
function onSubmit(e) {
   
    e.preventDefault();
  
   
    
    document.querySelector('#image').src = '';
    
    
    const prompt = document.querySelector('#prompt').value;
    
    const size = document.querySelector('#size').value;
  
    if (prompt === '') {
      Swal.fire({
        confirmButtonText: 'Close',
        icon: 'error',
        text: 'Missing text!',
        title: 'Error',
        toast: true,
        position: 'center',
      });
      return;
    }
  
    generateImageRequest(prompt, size);
  }
  
  // generate request by POST to page and then pull from it and add it to main page
  async function generateImageRequest(prompt, size) {
    try {
      // generate spinner css on page
      showSpinner();
  
      // send a POST based on the user selection and text
      const response = await fetch('/openai/generateimage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
  
      const responseJson = await response.json();
      const imageUrl = responseJson.data;
  
      // if the response is not ok, throw an error
      if (!response.ok) {
        // console.log(responseJson);
        removeSpinner();
        throw new Error(
          `${responseJson.error} Cannot generate "${prompt}" image because it violates OpenAI policy.`
        );
      }
  
      // this sets the element source to the imageUrl
      document.querySelector('#image').src = imageUrl;
      
  
      // image has arrived, remove the spinner
      removeSpinner();
    } catch (error) {
      // output the error to the user that was provided from OpenAI
      document.querySelector('.msg').textContent = error;
    }
  }
  
  // find spinner class and add it to page
  function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
  }
  
  // find spinner class and remove it from page
  function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
  }
  
  
  // add event listener to the form an fire onSubmit when clicked
  document.querySelector('#image-form').addEventListener('submit', onSubmit);
