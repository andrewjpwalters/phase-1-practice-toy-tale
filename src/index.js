let addToy = false;
let divCollect = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault();
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })



function renderToys(toy) {
  let h2 = document.createElement('h2');
  let p = document.createElement('p');
  let img = document.createElement('img');
  let btn = document.createElement('button')
  let divCard = document.createElement('div')
  h2.innerText = toy.name;
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');
  p.innerText = `${toy.likes} likes`;
  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id);
  btn.innerText = 'like'
  btn.addEventListener('click', (e) => {
    like(e)
  })
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

function like(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch('http://localhost:3000/toys/${e.target.id}', {
    method: "PATCH",
    headers: {
      "Content-Type": "applicaton/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': more
    })
  })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`
    }))
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': toy_data.name.value,
      'image': toy_data.image.value,
      'likes': 0
    })
  })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}