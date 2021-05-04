function myfun1()
{	var a=0;
	var b=0;
	var elem1=document.getElementById("bbox");
	var elem2=document.getElementById("cbox");
	var elem3=document.getElementById("lptn");
	var elem4=document.getElementById("rptn");
	var pos1=270;
	var pos2=350;
	var id1 = setInterval(frame1, 100);
	var id2 = setInterval(frame2, 100);
	var id11 = setInterval(frame11, 4000);
	var id12 = setInterval(frame12, 4000);
  	var id13 = setInterval(frame13, 4000);
  	var id14 = setInterval(frame14, 4000);
	function frame1() {
		a++;
    if (pos1 == 230) {
      	pos1=270;
    } else {
      pos1--; 
      elem1.style.top = pos1 + 'px'; 
    }
  	if(a==760)
  		{	a=0;
  			clearInterval(id1);
  		}
  }
  function frame2(){
  	b++;	
  if (pos2 == 310) {
      	pos2=350;	
    	elem3.style.left=203 + 'px';
    	elem4.style.left=280 + 'px';
    } else {
    	elem3.style.left=164 + 'px';
    	elem4.style.left=307 + 'px';
      pos2--; 
      elem2.style.top = pos2 + 'px'; 
    }
    if(b==760)
  	{clearInterval(id2);}}
var i=0;
  function frame11() {
  	len1=[133,176,200,280,350,380,444,876,907,1708,3000,6690,9750,15990,43560,60150,63300,141300,166560];
  	if(i==19){
  		clearInterval(id11);
  	}
  	else{
  	
  	document.getElementById("para").innerHTML=len1[i];}
  	i++;
  	
  }
var j=0;
  function frame12() {
  	len2=[295.4,275.5,253.6,233.6,199.4,182.8,177,121,112.8,117.3,102.9,86.66,80.17,76.68,57.94,73.07,65.65,41.41,49.67];
  	if(j==19){
  		clearInterval(id12);
  	}
  	else{
  	
  	document.getElementById("pstress").innerHTML=len2[j] + 'MPa';}
  	j++;
  	
  }
var k=0;
  function frame13() {
  	len3=[133,176,200,280,350,380,444,876,907,1708,3000,6690,9750,15990,43560,60150,63300,141300,166560];
  	if(k==19){
  		clearInterval(id13);
  	}
  	else{
  	
  	document.getElementById("pturn").innerHTML=len3[k];}
  	k++;
  	
  }
var l=0;
  function frame14() {
  	len4=[140,130,120,110,94.5,86.6,83.9,76.4,67.9,72.4,58.8,46.1,41.6,39.4,28.4,37.1,32.7,19.8,24];
  	if(l==19){
  		clearInterval(id14);
  	}
  	else{
  	
  	document.getElementById("pforce").innerHTML=len4[l]+' N';}
  	l++;
  	
  }
}
function myfun2()
{
	 var x = document.getElementById("chartContainer");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
