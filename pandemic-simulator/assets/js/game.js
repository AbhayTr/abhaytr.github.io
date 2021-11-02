//Pandemic Simulator Game © 2020 Abhay Tripathi.
//Not for redistribution.

fr = 0;
fata = 0;
tc = 0;
infc = 0;
mr = 0;
score = 0;
col = 'Orange';
sas = "I";
side = 'I';
tim = 1;
status = "S";
bh = screen.height / 10;
rh = 3 * (screen.height / 4);
rows = Math.floor(rh / bh);
val = 10 * rows;

function createButton() 
{
  for (i = 1; i < val + 1; i++)
  {
    var f = document.createElement('BUTTON');
    f.setAttribute("class", "button");
    f.setAttribute("id", i);
    f.innerHTML = i;
    f.setAttribute("style", "height:10%;width:10%;")
    f.setAttribute("onclick", "myFunction(this.id)");
    document.body.appendChild(f);
    document.getElementById(i).style.backgroundColor = "green";
  }
}

exist = [];
stat = [];
lent = val;

for (i = 1; i < val + 1; i++)
{
  exist.push(i);
  stat.push("C");
}

function getRndInteger(min, max) 
{
  return Math.floor(Math.random() * (max - min)) + min;
}

function dead(pos)
{
  if (side != "C" && stat[pos - 1] == "I")
  {
    stat[pos - 1] = "D";
    document.getElementById(pos).style.backgroundColor = "Red";
    document.getElementById(pos).disabled = true;
    infc -= 1;
    fata += 1;
    document.getElementById("stat").innerHTML = "Fatilities:<br>" + fata;
    document.getElementById("statx").innerHTML = "Infected:<br>" + infc;
  }
}

function deadx(pos, time)
{
  setTimeout(function()
  {
    dead(pos);
  }
  , time * 1000);
}

var num = 1;

var intervalID = setInterval(function()
{
  status = "R";
  
  if ((stat.includes("C") && stat.includes("I")) || fr == 0)
  {
    fr = 1
    num = getRndInteger(0, lent);
    nx = exist[num];
    exist.splice(num, 1);
    
    if (stat.includes("C"))
    {
      lent -= 1;
    }
    
    if (stat[nx - 1] == "C")
    {
      infc += 1;
      tc += 1;
      document.getElementById("stat").innerHTML = "Fatilities:<br>" + fata;
      document.getElementById("statx").innerHTML = "Infected:<br>" + infc;
    }
    
    stat[nx - 1] = side;
    tie = getRndInteger(8, 12);
    deadx(nx, tie);
  }
  else if (stat.includes("I"))
  {
    num = getRndInteger(0, lent);
    nx = exist[num];
    exist.splice(num, 1);
    
    if (stat.includes("C"))
    {
      lent -= 1;
    }
    
    if (stat[nx - 1] == "C")
    {
      infc += 1;
      tc += 1;
      document.getElementById("stat").innerHTML = "Fatilities:<br>" + fata;
      document.getElementById("statx").innerHTML = "Infected:<br>" + infc;
    }
    
    stat[nx - 1] = side;
    tie = getRndInteger(8, 12);
    deadx(nx, tie);
  }
  else if (stat.includes("C") && fr == 1)
  {
    for (i = 1; i < val + 1; i++)
    {
      document.getElementById(i).disabled = true;
    }
    
    status = "S";
    tim = 0;
    col = 'Green';
    side = 'C';
    sas = "H";
    come = "";
    fata = 0;
    healthy = 0;
    
    for (k = 1; k < val + 1; k++)
    {
      var st = document.getElementById(k).style.backgroundColor;
      
      if (st == "red")
      {
 	    fata += 1;
      }
      else
      {
 	    healthy += 1;
      }
    }
    
    achv = (fata / val) * 100;
    
    if (fata == 0)
    {
      come = "Perfectly contained!";
    }
    else if (achv < 20 && achv > 0)
    {
      come = "Fabulous Work!";
    }
    else if (achv >= 20 && achv < 40)
    {
      come = "Good Job!";
    }
    else if (achv >= 40 && achv < 60)
    {
      come = "Just Saved. lives wasted";
    }
    else if (achv >= 60 && achv < 80)
    {
      come = "Bad Work! Costed many lives";
    }
    else if (achv >= 80 && achv < 100 && fata != val - 1)
    {
      come = "Pathetic! Highly irresponsible work";
    }
    else if (fata == val - 1)
    {
      come = "Only One Left! Useless work";
    }
    document.getElementById("stat").innerHTML = come + "<br><br>Fatalities: " + fata + " out of " + val + "<br>Mortality Rate: " + Math.floor(achv) + "%";
    document.getElementById("statx").innerHTML = "";
    document.getElementById("statx").style.width = "0%";
    document.getElementById("stat").style.borderTopRightRadius = "5px";
    document.getElementById("stat").style.borderBottomRightRadius = "5px";
    document.getElementById("stat").style.width = "100%";
  }
  else if (!stat.includes("C") && !stat.includes("I"))
  {
    for (i = 1; i < val + 1; i++)
    {
      document.getElementById(i).disabled = true;
    }
    
    status = "S";
    tim = 0;
    document.getElementById("stat").innerHTML = "You failed to stop the spread of the infection. Try again by clicking restart";
    document.getElementById("statx").innerHTML = "";
    document.getElementById("statx").style.width = "0%";
    document.getElementById("stat").style.borderTopRightRadius = "5px";
    document.getElementById("stat").style.borderBottomRightRadius = "5px";
    document.getElementById("stat").style.width = "100%";
  }
  document.getElementById(nx).style.backgroundColor = col;
}
, 410);

function re()
{
  document.getElementById("statx").innerHTML = "Infected:<br>0";
  document.getElementById("statx").style.width = "50%";
  document.getElementById("stat").style.width = "50%";
  document.getElementById("stat").style.borderTopRightRadius = "0px";
  document.getElementById("stat").style.borderBottomRightRadius = "0px";
  score = 0;
  fr = 0;
  infc = 0;
  fata = 0;
  tc = 0;
  side = 'I';
  sas = "I";
  col = 'Orange';
  tim = 1;
  document.getElementById("stat").innerHTML = "Fatilities:<br>" + fata;
  document.getElementById("statx").innerHTML = "Infected:<br>" + infc;
  exist = [];
  stat = [];
  lent = val;
  for (i = 1; i < val + 1; i++)
  {
    exist.push(i);
	stat.push("C");
	document.getElementById(i).disabled = false;
    document.getElementById(i).style.backgroundColor = 'Green';
  }
}

function myFunction(id) 
{
  if (stat[id - 1] == "I")
  {
    exist.push(id);
	stat[id - 1] = "C";
    lent += 1;
    infc -= 1;
  }
  document.getElementById(id).style.backgroundColor='Green';
}