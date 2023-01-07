let mouse = {
    speedX: 0,
    speedY: 0,
    posX: 0,
    posY: 0,
    movement: 0,
    speed: 0
  }
  
  //on mousemove update the moouse object
  document.onmousemove = function(e) {
    mouse.speedX = e.movementX;
    mouse.speedY = e.movementY
    mouse.posX = e.pageX;
    mouse.posY = e.pageY;
  }
  
  //refresh the mouse movement and speed every 100ms
  setInterval(() => {
    mouse.movement =
      Math.sqrt(Math.pow(mouse.speedX, 2) + Math.pow(mouse.speedY, 2));
    mouse.speed = mouse.movement * 10;
  }, 100);
  
  //add a square div in parent element
  function addSquare(parent) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("square")
    parent.appendChild(newDiv)
    return newDiv;
  }
  
  //add squares in the parent element filling the available size
  //gap is the space between squares, size is the edge of the square
  //if skipbefore is false it will begin to draw the next square also if it won't fit entirely
  function addSquares(parent, gap, size, skipbefore = true) {
  
    const squares = [];
  
    let rect = parent.getBoundingClientRect();
    const availableWidth = rect.width;
    const availableHeight = rect.height;
  
    let top = 100;
    while (top < availableHeight) {
      let left = 0;
      if (skipbefore && top + size > availableHeight)
        break;
      while (left < availableWidth) {
        if (skipbefore && left + size > availableWidth)
          break;
        const square = addSquare(parent);
        square.style.left = `${left}px`;
        square.style.top = `${top}px`;
        squares.push(square);
        left += gap + size;
      }
      top += gap + size;
    }
  
    return squares;
  }
  
  //onmoveover event handler
  const squareOnMouseOver = (event) => {
    const element = event.target;
  
    const y = mouse.speedY;
    const x = mouse.speedX;
  
    const rad = Math.atan2(y, x);
    yAxis = mouse.movement * Math.sin(rad);
    xAxis = mouse.movement * Math.cos(rad);
  
    const rect = element.getBoundingClientRect();
  
    const left = Math.round(rect.x + xAxis * 3);
    const top = Math.round(rect.y + yAxis * 3);
  
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;
    const o = rad * (180 / Math.PI);
    element.style.transform = `rotate(${o}deg)`;
  }
  
  //resets the .target parent and redraw the squares inside it
  function drawSquares() {
  
    const parent = document.querySelector('.target');
    parent.innerHTML = '';
    const squares = addSquares(parent, 25, 75);
  
    const colors = [
      'lightcoral',
      'bisque',
      'aquamarine',
      'cadetblue',
      'greenyellow',
      'yellowgreen'
    ];
  
    squares.forEach(square => {
      const iColor = Math.floor(Math.random() * (colors.length - 1));
      const color = colors[iColor];
      square.style.background = color;
      square.addEventListener('mouseover', squareOnMouseOver);
    });
  }