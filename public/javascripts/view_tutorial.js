
  document.addEventListener("DOMContentLoaded", function(event) {
    document.addEventListener('click',check_btn_click);
  });
    
  
  function check_btn_click(event){

    if (event.target.matches('.html_btn')){
    event.target.classList.add('w3-red');
    Array.from(document.querySelectorAll('.css_btn, .js_btn')).forEach(function(el){
    el.classList.remove('w3-red');
    });
    
    Array.from(document.querySelectorAll('.css, .js')).forEach(function(element){
    element.style.display='none';
    });
    
    Array.from(document.querySelectorAll('.html')).forEach(function(element){
    element.style.display='block';
    });
    }
    
    
    else if (event.target.matches('.js_btn')){
    event.target.classList.add('w3-red');
    Array.from(document.querySelectorAll('.css_btn, .html_btn')).forEach(function(el){
    el.classList.remove('w3-red');
    });
    
    Array.from(document.querySelectorAll('.css, .html')).forEach(function(element){
    element.style.display='none';
    });
    
    Array.from(document.querySelectorAll('.js')).forEach(function(element){
    element.style.display='block';
    });
    }
    
    else if (event.target.matches('.css_btn')){
    event.target.classList.add('w3-red');
    Array.from(document.querySelectorAll('.js_btn, .html_btn')).forEach(function(el){
    el.classList.remove('w3-red');
    });
    
    Array.from(document.querySelectorAll('.js, .html')).forEach(function(element){
    element.style.display='none';
    });
    
    Array.from(document.querySelectorAll('.css')).forEach(function(element){
    element.style.display='block';
    });
    }
    
    
    
    
    
  
  }