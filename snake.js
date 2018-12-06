var tail;
var head;
var npchead;
var snakeDead = 0;
wallCubes =[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],[0,21],[0,22],[0,23],[0,24],[0,25],[0,26],[0,27],[0,28],[0,29],[0,30],[0,31],[31,0],[31,1],[31,2],[31,3],[31,4],[31,5],[31,6],[31,7],[31,8],[31,9],[31,10],[31,11],[31,12],[31,13],[31,14],[31,15],[31,16],[31,17],[31,18],[31,19],[31,20],[31,21],[31,22],[31,23],[31,24],[31,25],[31,26],[31,27],[31,28],[31,29],[31,30],[31,31],[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0],[11,0],[12,0],[13,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],[21,0],[22,0],[23,0],[24,0],[25,0],[26,0],[27,0],[28,0],[29,0],[30,0],[31,0],[0,31],[1,31],[2,31],[3,31],[4,31],[5,31],[6,31],[7,31],[8,31],[9,31],[10,31],[11,31],[12,31],[13,31],[14,31],[15,31],[16,31],[17,31],[18,31],[19,31],[20,31],[21,31],[22,31],[23,31],[24,31],[25,31],[26,31],[27,31],[28,31],[29,31],[30,31],[31,31]];
completeWall = [[[0,0],[0]],[[0,1],[0]],[[0,2],[0]],[[0,3],[0]],[[0,4],[0]],[[0,5],[0]],[[0,6],[0]],[[0,7],[0]],[[0,8],[0]],[[0,9],[0]],[[0,10],[0]],[[0,11],[0]],[[0,12],[0]],[[0,13],[0]],[[0,14],[0]],[[0,15],[0]],[[0,16],[0]],[[0,17],[0]],[[0,18],[0]],[[0,19],[0]],[[0,20],[0]],[[0,21],[0]],[[0,22],[0]],[[0,23],[0]],[[0,24],[0]],[[0,25],[0]],[[0,26],[0]],[[0,27],[0]],[[0,28],[0]],[[0,29],[0]],[[0,30],[0]],[[0,31],[0]],[[31,0],[0]],[[31,1],[0]],[[31,2],[0]],[[31,3],[0]],[[31,4],[0]],[[31,5],[0]],[[31,6],[0]],[[31,7],[0]],[[31,8],[0]],[[31,9],[0]],[[31,10],[0]],[[31,11],[0]],[[31,12],[0]],[[31,13],[0]],[[31,14],[0]],[[31,15],[0]],[[31,16],[0]],[[31,17],[0]],[[31,18],[0]],[[31,19],[0]],[[31,20],[0]],[[31,21],[0]],[[31,22],[0]],[[31,23],[0]],[[31,24],[0]],[[31,25],[0]],[[31,26],[0]],[[31,27],[0]],[[31,28],[0]],[[31,29],[0]],[[31,30],[0]],[[31,31],[0]],[[0,0],[0]],[[1,0],[0]],[[2,0],[0]],[[3,0],[0]],[[4,0],[0]],[[5,0],[0]],[[6,0],[0]],[[7,0],[0]],[[8,0],[0]],[[9,0],[0]],[[10,0],[0]],[[11,0],[0]],[[12,0],[0]],[[13,0],[0]],[[14,0],[0]],[[15,0],[0]],[[16,0],[0]],[[17,0],[0]],[[18,0],[0]],[[19,0],[0]],[[20,0],[0]],[[21,0],[0]],[[22,0],[0]],[[23,0],[0]],[[24,0],[0]],[[25,0],[0]],[[26,0],[0]],[[27,0],[0]],[[28,0],[0]],[[29,0],[0]],[[30,0],[0]],[[31,0],[0]],[[0,31],[0]],[[1,31],[0]],[[2,31],[0]],[[3,31],[0]],[[4,31],[0]],[[5,31],[0]],[[6,31],[0]],[[7,31],[0]],[[8,31],[0]],[[9,31],[0]],[[10,31],[0]],[[11,31],[0]],[[12,31],[0]],[[13,31],[0]],[[14,31],[0]],[[15,31],[0]],[[16,31],[0]],[[17,31],[0]],[[18,31],[0]],[[19,31],[0]],[[20,31],[0]],[[21,31],[0]],[[22,31],[0]],[[23,31],[0]],[[24,31],[0]],[[25,31],[0]],[[26,31],[0]],[[27,31],[0]],[[28,31],[0]],[[29,31],[0]],[[30,31],[0]],[[31,31],[0]]];

function snake(gl){

  playSound("gameSound");
  //Player Snake
  tail = snakeBody[snakeBody.length - 1];
  snakeBody = snakeBody.slice(0, -1);
  head = [];
  head[0] = snakeBody[0][0] + direction[0];
  head[1] = snakeBody[0][1] + direction[1];
  collides(head, snakeBody, npcsnakeBody, direction);

  //NPC Snake
  tail = npcsnakeBody[npcsnakeBody.length - 1];
  npcsnakeBody = npcsnakeBody.slice(0, -1);
  npchead = [];
  npchead[0] = npcsnakeBody[0][0] + npcdirection[0];
  npchead[1] = npcsnakeBody[0][1] + npcdirection[1];
  collides(npchead, npcsnakeBody, snakeBody, npcdirection);

  completeListOfCubes = [];
  completeListOfCubes.push([snakeFood, [1]]);
  //console.log(snakeFood);
  for(var i = 0; i < snakeBody.length; i++){
    completeListOfCubes.push([snakeBody[i], [2]]);
    //console.log(snakeBody[i]);
  }
  for(var i = 0; i < npcsnakeBody.length; i++){
    completeListOfCubes.push([npcsnakeBody[i], [3]]);
    //console.log(snakeBody[i]);
  }

  completeListOfCubes.push.apply(completeListOfCubes,
    completeWall);

  var colorAndPosition = calculatePositionColorArray(completeListOfCubes);
  var color = colorAndPosition[1];
  var position = colorAndPosition[0];
  var indices = [];
  var first = 0;
  var second = 1;
  var third = 2;
  var sixth = 3;
  for(var i = 0; i < position.length/12; i++){
    indices.push(first);
    indices.push(second);
    indices.push(third);
    indices.push(first);
    indices.push(third);
    indices.push(sixth);
    first += 4;
    second += 4;
    third += 4;
    sixth += 4;
  }


  buffers = initBuffers(gl, position, color, indices);


  if(npcsnakeBody[0][0] - snakeFood[0] > 0){
    //console.log("This is"+npcdirection);
    npcdirection = [-1, 0];
  }
  if(npcsnakeBody[0][0] - snakeFood[0] < 0){
    npcdirection = [1, 0];
    //console.log("X");
  }
  if(npcsnakeBody[0][1] - snakeFood[1] > 0){
    npcdirection = [0, -1];
      //console.log("-Y");
  }
  if(npcsnakeBody[0][1] - snakeFood[1] < 0){
    npcdirection = [0, 1];
      //console.log("Y");
  }

}
function collides(e, whichSnakeBody, otherSnakeBody, directionPassed){
  var invalidFood;
  var snakeCollide;
  var selfCollide;
  var wallCollide;

  //Check if collide with food (eat)
  if(e[0] == snakeFood[0] && e[1] == snakeFood[1]){
    do{
      snakeFood = [Math.floor(Math.random()*31), Math.floor(Math.random()*31)];
      invalidFood = completeListOfCubes.some(function(cube){
        return(cube[0][0] == snakeFood[0] && cube[0][1] == snakeFood[1])
      });
    }
    while(invalidFood);
    //console.log(snakeFood);
    whichSnakeBody.push(tail);
    playSound("bonus");
    //Increase points
    //Play eat sound
  }

  //Check if other snake collide
  snakeCollide = otherSnakeBody.some(function(cube){
    return (cube[0] == e[0] && cube[1] == e[1])
  });
  if(snakeCollide){
    //console.log("Dusre ko thoka");
    whichSnakeBody.splice(0,whichSnakeBody.length);
    whichSnakeBody.push([2,1]);
    whichSnakeBody.push([1,1]);
    snakeDead = 1;
    directionPassed.splice(0,directionPassed.length);
    directionPassed.push(1);
    directionPassed.push(0);
    playSound("collision");
  }

  //Check if collides with own body
  selfCollide = whichSnakeBody.some(function(cube){
    return (cube[0] == e[0] && cube[1] == e[1])
  });
  if(selfCollide){
    //console.log("Khudko thoka");
    whichSnakeBody.splice(0,whichSnakeBody.length);
    whichSnakeBody.push([2,1]);
    whichSnakeBody.push([1,1]);
    snakeDead = 1;
    directionPassed.splice(0,directionPassed.length);
    directionPassed.push(1);
    directionPassed.push(0);
    playSound("collision");
  }
  //Check if wall collision
  wallCollide = wallCubes.some(function(cube){
    return (cube[0] == e[0] && cube[1] == e[1])
  });
  if(wallCollide){
    //console.log("wall Thoka");
    whichSnakeBody.splice(0,whichSnakeBody.length);
    whichSnakeBody.push([2,1]);
    whichSnakeBody.push([1,1]);
    snakeDead = 1;
    directionPassed.splice(0,directionPassed.length);
    directionPassed.push(1);
    directionPassed.push(0);
    playSound("collision");
  }
  if(snakeDead == 1){
    snakeDead = 0;
  }else{
    whichSnakeBody.unshift(e);
  }
}
