a = 0; 						       			//Angle to rotate in degrees.
c = document.querySelectorAll('p,div,li,table,tr,td,span,body,a');	//List of all elements which will be turned into disco lights!
arr = "abcdefghijklmnopqrstuvwxyz1234567890";				//Required for generating random colors for disco light elements!
b = document.getElementsByTagName("div");	       			//List of all <div> tag elements (The dancing elements)!

setInterval(function()				       			//Makes the webpage dance!
{
  for (i = 0; i < b.length; i++)		       			//Iterate through all <div> tag elements.
  {
    b[i].style.transform = "rotate(" + a + "deg)";     			//Setting the css property to rotate each <div> tag element on random angles.
    a = Math.floor(Math.random() * 361);               			//Setting the random angle for next element for dancing effect!
  }
}, 100);					       			//Makes webpage dance endlessly by randomly rotating all <div> tag elements

setInterval(function()				       			//Converts elements into disco light!
{
  for (j = 0; j < c.length; j++)		       			//Iterate through all disco light elements.
  {
    var clr = '#';							//Hex code for random color of disco light!
    for (k = 6; k > 0; k--)						//Generating random disco light color!	 
    { 
      clr += arr[Math.floor(Math.random() * arr.length)]; 
    }
    c[j].style.color = clr;     					//Setting the css property to change color of each disco light element.
  }
}, 10);									//Keeps the disco light active by setting random colors of disco light elements!