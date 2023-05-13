// signup page

const findDb=()=>{
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;
    fetch('/signin',{
headers:{
    'Content-type': 'application/json'
 },
 method:'post',
 body:JSON.stringify({
    email,
    password
 })
    }).then((res)=>(res.json())).then((data)=>{
if(data.message=='ok'){
  localStorage.setItem('email',email)
  window.location.href='/products.html'
}
if(data.message=='error'){
    document.getElementById('mes').innerHTML='invalid user';
    console.log('invalid user')
}
    })
}

//products page

const container=document.getElementById('container');
const sortButton = document.getElementById('sort');
const select = document.getElementById('sel');

let flag=false;

let producArr=[];
let priceArr=[];

fetch('/products',{
    headers:{
        'Content-type': 'application/json'
     },
     method:'post',
     body:JSON.stringify({})
})
.then((res)=>(res.json()))
.then((data)=>{
  data.forEach((product)=>{
    const productDiv = document.createElement('div');
    const nameDiv=document.createElement('div')
    const pictureDiv= document.createElement('div')
    const pictureElement = document.createElement('img');
    const buttonDiv=document.createElement('button');
    pictureElement.src = `${product.picture}`;
    pictureDiv.appendChild(pictureElement);
    const nameElement = document.createElement('h2');
    const priceElement = document.createElement('h5');
    
    nameElement.innerText = product.name;
    buttonDiv.innerText='Add to the basket'
    priceElement.innerText = `Price: ${product.price}ILS`;
    productDiv.style.width='53%';
    productDiv.style.borderRadius='2px';
    pictureElement.setAttribute('id','pic')
    priceElement.setAttribute('id','price')
    buttonDiv.setAttribute('id','butdiv');
    productDiv.setAttribute('id','butId');
    nameDiv.setAttribute('id','name')
    buttonDiv.addEventListener('click',function(){
      flag=true;
      producArr.push(product.name);
      priceArr.push(product.price)
     console.log(priceArr)
     console.log(producArr)
    })

    nameDiv.appendChild(nameElement);
    nameDiv.appendChild(priceElement);
    productDiv.appendChild(pictureDiv)
    productDiv.appendChild(nameDiv)
    productDiv.appendChild(buttonDiv);
    container.appendChild(productDiv);
  });
  sortButton.addEventListener('click', function() {
    let sortedData;
    const sortOption = select.value;

    if (sortOption === 'price') {
      // Sort products by price
      sortedData = data.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'name') {
      // Sort products by name
      sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Clear existing products
    container.innerHTML = '';

    // Create and append the sorted product buttons to the container
    sortedData.forEach((product) => {
      const productDiv = document.createElement('div');
      const nameDiv=document.createElement('div')
      const pictureDiv= document.createElement('div')
      const pictureElement = document.createElement('img');
      const buttonDiv=document.createElement('button');
      pictureElement.src = `${product.picture}`;
      pictureDiv.appendChild(pictureElement);
      const nameElement = document.createElement('h2');
      const priceElement = document.createElement('h5');
      
      nameElement.innerText = product.name;
      buttonDiv.innerText='Add to the basket'
      priceElement.innerText = `Price: ${product.price}ILS`;
      productDiv.style.width='53%';
      productDiv.style.borderRadius='2px';
      pictureElement.setAttribute('id','pic')
      priceElement.setAttribute('id','price')
      buttonDiv.setAttribute('id','butdiv');
      productDiv.setAttribute('id','butId');
      nameDiv.setAttribute('id','name')
      buttonDiv.addEventListener('click',function(){
        flag=true;
        producArr.push(product.name);
        priceArr.push(product.price);
       console.log(priceArr);
       console.log(producArr);
      })

      nameDiv.appendChild(nameElement);
      nameDiv.appendChild(priceElement);
      productDiv.appendChild(pictureDiv);
      productDiv.appendChild(nameDiv);
      productDiv.appendChild(buttonDiv);
      container.appendChild(productDiv);
    });
  });

})
let sum=0;
let cnt=0;
const check=()=>{
  if(flag==false){
    alert('add some product to your busket!')
  }
  else{
  for(let i=0;i<priceArr.length;i++){
    sum+=priceArr[i]
  }
  for(let y=0;y<producArr.length;y++){
    cnt++;
  }
  localStorage.setItem('producArr',producArr)
  localStorage.setItem('totalProd',cnt);
  localStorage.setItem('priceArr',sum);
  producArr=[];
  priceArr=[];
  window.location.href='/buy'
}
}










