var sum=0;
var req;
var lsList=[];

let inSum=0;
let v=0;
let list= document.getElementById("list");
let item = document.createElement("div");
	item.textContent = "Item Name: ";
	item.setAttribute('id' , 'itemName');
	item.setAttribute('class' ,'ai');
	let itemU= document.createElement("input");
	itemU.setAttribute('type', "text" );		   
	itemU.setAttribute('id' , "itemU");
	itemU.setAttribute('class' , 'ai');
let fat = document.createElement("div");
	fat.textContent="Fats(in g) :";
	fat.setAttribute('class' ,'ai');
	let fatU= document.createElement("input");
	fatU.setAttribute('type' , "text");
	fatU.setAttribute('id' , "fatU");
	fatU.setAttribute('class' , 'ai');
	fatU.setAttribute('placeholder' , '1fat = 9kcal');
let carbs = document.createElement("div");
	carbs.textContent="Carbohydrates(in g) :";
	carbs.setAttribute('class' ,'ai');
	let carbU= document.createElement("input");
	carbU.setAttribute('type' , "text");
	carbU.setAttribute('id' , "carbU");
	carbU.setAttribute('class' , 'ai');
	carbU.setAttribute('placeholder' , '1carb = 4kcal' );
let pro = document.createElement("div");
	pro.textContent="Proteins(in g) :";
	pro.setAttribute('class' ,'ai');
	let proU= document.createElement("input");
	proU.setAttribute('type' , "text");
	proU.setAttribute('id' , "proU");
	proU.setAttribute('class' , 'ai');
	proU.setAttribute('placeholder' , '1protein = 4kcal');
let reqCalorie = document.createElement("span");
let r=document.getElementById('result');	
r.appendChild(reqCalorie);



let tot =  document.createElement("span");
let tota = document.getElementById("tota");
tota.appendChild(tot);

	
let calc= document.getElementById("iniCalculate");
calc.addEventListener('click' , ini);
calc.addEventListener('click' , Total);

let addBtn = document.createElement("button");
addBtn.textContent="Add";
addBtn.setAttribute('class' , 'ai');

let i=0;
		
		



function Total(){
	tot.innerHTML = "some";
	let a=setInterval( function(){
			if(v <= sum)
			{ tot.innerHTML="Your total intake is<br>" + v + "kcal"; v++; }
		else
        	clearInterval(a);
	}, 2);	
	if (sum > req){
		alert("You have consumed excess calories!!");
	}
}



function displayList(name, ssum){
	let itemList = document.createElement("li");
	itemList.innerHTML =name + "<br>" + ssum+ "kcal";
	itemList.setAttribute('class' , 'itemList');
	let display=document.getElementById("display");
	display.appendChild(itemList);

	
	}



function addLs(name, ssum){
	var obj = {
		nam: name,
		calorie: ssum
		};
	lsList.push(obj);	
	window.localStorage.setItem('ls' , JSON.stringify(lsList));

}

function Add(){
	
	list.appendChild(item);
	list.appendChild(itemU);
	
	list.appendChild(fat);
	list.appendChild(fatU);
	
	list.appendChild(carbs);
	list.appendChild(carbU);	
	
	list.appendChild(pro);
	list.appendChild(proU);
	list.appendChild(addBtn);

}

addBtn.onclick = function(){
	        inSum = (9*parseFloat(fatU.value))+(4*parseFloat(carbU.value))+(4*parseFloat(proU.value));
		v=sum;		
		sum=sum+(inSum);
		displayList(itemU.value , inSum );
		addLs(itemU.value , inSum);
		itemU.value='';
		fatU.value='';
		carbU.value='';
		proU.value='';
		Total();		
		}

let inputAge= document.getElementById("age");	
let inputHeight= document.getElementById("height");
let inputWeight= document.getElementById("weight");
let x=document.getElementById("male");
let y=document.getElementById("female");


function ini(){
	
	let a=parseFloat(inputAge.value);
	
	let h=parseFloat(inputHeight.value);
	
	let w= parseFloat(inputWeight.value);
		let t=x.checked;
	var det = { age: a, height :h , weight: w, check:t };
	window.localStorage.setItem('details' , JSON.stringify(det));
	calculate(a, h ,w, t);
	}

function calculate(a, h , w , t){
	var bmr;
	
	if(t==true){
	//document.body.style.background="red";	
	 bmr = (10*w)+(6.25*h)-(5*a) +5;
	}
	else{
	//document.body.style.background="blue";
		bmr=(10*w) + (6.25*h) - (5*a) -161;
	}
 	req = parseFloat(bmr*1.53);
	
	reqCalorie.innerHTML = "Required Calorie Intake is:<br> " + req.toFixed(2) + "kcal" ;
	
	Add();

	
}


window.addEventListener('load' , extract);
function extract(){
	let j;
	let details = JSON.parse(window.localStorage.getItem('details'));
	calculate(details.age, details.height, details.weight , details.check);	
	lsList = JSON.parse(window.localStorage.getItem('ls'));
	if(lsList)
		for(j=0;j<lsList.length; j++){
			sum=sum+(lsList[j].calorie);
			displayList(lsList[j].nam , lsList[j].calorie);}
			 
		
	else
		lsList =[];
	tota.appendChild(tot);	
	Total();
	inputAge.value = details.age;
	inputHeight.value = details.height;
	inputWeight.value = details.weight;
	if(details.check == true)
		x.checked=true;
	else
		y.checked=true
}		
		




