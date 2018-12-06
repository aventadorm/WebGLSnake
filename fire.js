//finalPositionArray is the generated positions for all sides of the cube
  var finalPositionArray =[];
//finalColorArray is used to calculate the array for the colors.
  var finalColorArray =[];
function calculatePositionColorArray(input){
  //console.log(input);
  finalColorArray = [];
  finalPositionArray = [];
  //the input is an array of array in the form of [[[x,y],[c]],[[],[]]]
  var calculatePositionArrayInput=[];
  var calculateColorArrayInput=[];
  //console.log(input+"-->input");
var tempI=input[0];
  //console.log(input[0]+"-->1input");
//console.log(tempI[0]+"--input2");
  for(var i=0;i<input.length;i++)
  {
    var tempArray =input[i];
    //console.log(tempArray[0] + "2 array");
    calculatePositionArrayInput.push(tempArray[0]);
  }
  //console.log(calculatePositionArrayInput + "calculatePositionArrayInput");
  for(var i=0;i<input.length;i++)
  {
    var tempArray =input[i];
    //console.log(tempArray[1] + "1 array");
    calculateColorArrayInput.push(tempArray[1]);
  }
  //console.log(calculateColorArrayInput + "calculatePositionArrayInput");
  //console.log(calculatePositionArrayInput +"-->Input");
  var output1 =calculatePositionArray(calculatePositionArrayInput);
  var output2=calculateColorArray(calculateColorArrayInput);
  ////console.log(output1.length);
  ////console.log(output1+"output1");
  ////console.log(output2+"output2");2

//console.log(print);
  return [output1,output2];
}



function calculatePositionArray(inputArrayOfArray) {
  //console.log("hi");
  var arrayLength =inputArrayOfArray.length; //length of the input array of arrays
  var outerLoop=0; //used to iterate through the input array
  while(outerLoop<arrayLength){
   var innerLoop =0;  //used to iterate to generate mapping from 2d square coordiante to 3d cube coordinate
   var tempArray =[] ; //array to iterate throught the inputArrayOfArray
   tempArray=inputArrayOfArray[outerLoop];
   var x =tempArray[0];
   var y =tempArray[1];
   var finalArray=[];
   var one =[x-1,y-1,1] ;
   var two =[x,y-1,1];
   var three =[x,y,1];
   var four =[x-1,y,1];
   var five=[x-1,y-1,-1] ;
   var six=[x,y-1,-1];
   var seven=[x,y,-1];
   var eight=[x-1,y,-1];


   while(innerLoop<6){
   //front
   if(innerLoop==0){
   finalArray.push.apply(finalArray,one);
   finalArray.push.apply(finalArray,two);
   finalArray.push.apply(finalArray,three);
   finalArray.push.apply(finalArray,four);
   }
   //back
   else if(innerLoop==1){
   finalArray.push.apply(finalArray,five);
   finalArray.push.apply(finalArray,eight);
   finalArray.push.apply(finalArray,seven);
   finalArray.push.apply(finalArray,six);
   }
   //top
   else if(innerLoop==2){
   finalArray.push.apply(finalArray,eight);
   finalArray.push.apply(finalArray,four);
   finalArray.push.apply(finalArray,three);
   finalArray.push.apply(finalArray,seven);
   }
   //bottom
   else if (innerLoop==3){
   finalArray.push.apply(finalArray,five);
   finalArray.push.apply(finalArray,six);
   finalArray.push.apply(finalArray,two);
   finalArray.push.apply(finalArray,one);
   }
   //right
   else if(innerLoop==4){
   finalArray.push.apply(finalArray,six);
   finalArray.push.apply(finalArray,seven);
   finalArray.push.apply(finalArray,three);
   finalArray.push.apply(finalArray,two);
   }
   //left
   else if(innerLoop==5){
   finalArray.push.apply(finalArray,five);
   finalArray.push.apply(finalArray,one);
   finalArray.push.apply(finalArray,four);
   finalArray.push.apply(finalArray,eight);
   }
  //console.log("tempFinalArray --> " + finalArray);
   innerLoop++;
   }
  finalPositionArray.push.apply(finalPositionArray,finalArray);
  //console.log("finalArray" +finalArray);
  outerLoop=outerLoop+1;
}
return finalPositionArray;
}
/**
*The function is used to calculate the final Array for the color
*The input is an array of the color indicator
*/
function calculateColorArray(inputArray){
//console.log("2");
var white = [1.0,  1.0,  1.0,  1.0];
var red   = [1.0,  0.0,  0.0,  1.0];
var green = [0.0,  1.0,  0.0,  1.0];
var blue  = [0.0,  0.0,  1.0,  1.0];
var yellow= [1.0,  1.0,  0.0,  1.0];
var purple= [1.0,  0.0,  1.0,  1.0];
var black = [0.0,  0.0,  0.0 , 1.0];          //snake 1 color
var orange= [1.0 ,  0.5,  0.0,  1.0];         //snake 2 colors
var cyan  =[0.0,  1.0,  1.0,  1.0] ;          //food color   olor red 0.91 green 0.76 blue 0.65
var unknown =[0.91,0.76,0.65,1.0];
for(var i =0;i<inputArray.length;i++)
//0 -- >The outerCube
{
  if(inputArray[i]==0){
  finalColorArray =finalColorArray.concat(unknown,unknown,unknown,unknown);
  finalColorArray=finalColorArray.concat(red,red,red,red);
  finalColorArray =finalColorArray.concat(green,green,green,green);
  finalColorArray=finalColorArray.concat(blue,blue,blue,blue);
  finalColorArray =finalColorArray.concat(yellow,yellow,yellow,yellow);
  finalColorArray=finalColorArray.concat(purple,purple,purple,purple);
}
//1-->food
else if(inputArray[i]==1){
  finalColorArray=finalColorArray.concat(purple,purple,purple,purple);
  finalColorArray =finalColorArray.concat(green,green,green,green);
  finalColorArray =finalColorArray.concat(white,white,white,white);
  finalColorArray=finalColorArray.concat(red,red,red,red);

  finalColorArray=finalColorArray.concat(blue,blue,blue,blue);
  finalColorArray =finalColorArray.concat(yellow,yellow,yellow,yellow);

}
//2-->snake
else if(inputArray[i]==2){
  finalColorArray=finalColorArray.concat(blue,blue,blue,blue);
  for(var j=0;j<5;j++){
  finalColorArray=finalColorArray.concat(orange,orange,orange,orange);
}
}
//3-->npSnake
else if (inputArray[i]==3) {
  finalColorArray=finalColorArray.concat(red,red,red,red);
  for(var j=0;j<5;j++){
  finalColorArray=finalColorArray.concat(white,white,white,white);
  }
}

}
//console.log("color: "+finalColorArray);
return finalColorArray;
}
//input array is an array of array,each array has one Cube
//the first array is the array for position.
//the second array is used to define the type of color required.
//0 -- >The outerCube
//1 -->The snake1
//2-->the snake2
//3-->Food
