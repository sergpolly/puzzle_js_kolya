var gav = "";
var AA = 1;
var BB = 20;
var main_sentence = ""


var reA = /[^АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/g;
// /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/
// var reA = /[^a-zA-Z]/g;
// var reN = /[^0-9]/g;
var alphabet = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];


function sentence_placeholder(){
  // sentence stuuf:
  var newgrid = document.createElement("div");
  newgrid.innerHTML = "";
  newgrid.setAttribute('class', 'grid-container');
  newgrid.setAttribute('id', 'newgrid');
  document.body.appendChild(newgrid)

  // operate on a global variable - whatever
  // how can one pass JS function returns around
  for (symb of main_sentence.split('')) {
    // 
    let inner_div = document.createElement('div');
    if (alphabet.includes(symb)) {
      inner_div.textContent = "100";
    } else {
      inner_div.textContent = symb;
    }
    inner_div.setAttribute('class', 'grid-item');
    newgrid.appendChild(inner_div);    
  }
}


function myFunction(idd) {
  var sentence, s_arr;
  // Get the sentence ...
  sentence = document.getElementById(idd).value;
  // sanitize input a bit -> unfirom, cyrillic, etc:
  sentence = sentence.trim().toUpperCase();
  main_sentence = sentence;
  // let's remove everyhting but А-Я
  sentence = sentence.replace(reA,"");
  // alert(sentence);
  s_arr = sentence.split('');
  su_arr = [...new Set(s_arr)];
  document.getElementById("demo").innerHTML = su_arr;

  // let's try to add stuff dynamically ...
  var mygrid = document.createElement("div");
  mygrid.innerHTML = "";
  mygrid.setAttribute('class', 'grid-container');
  mygrid.setAttribute('id', 'sentgrid');
  document.body.appendChild(mygrid)

  // now we'd need to generate a "task" for each
  // element of su_arr, and make sure that
  // the "result" of those tasks are unique ...
  var codes = new Array(su_arr.length);
  for (var i = 0; i < su_arr.length; i++) {
    // keep going until we find a unique task: 
    var task_found = false;
    var attempt_counter = 0;
    while (!task_found){
      attempt_counter += 1;
      var m1 = arb_random(AA,BB);
      var m2 = arb_random(AA,BB);
      //  is this task unique ? i.e. m1*m2 result:
      if (codes.indexOf(m1*m2) > -1) {
        task_found = false;
        console.log("    failed: "+m1+"*"+m2+" = "+(m1*m2));
      } else {
        task_found = true;
      }
    }
    //  turn rand[0,1] -> rand[a,b] ...
    console.log(attempt_counter+" attempts: "+m1+"*"+m2+" = "+(m1*m2));
    codes[i] = m1*m2;

    var inner_div = document.createElement('div');
    inner_div.textContent = m1+"*"+m2+" = "+(m1*m2);
    inner_div.setAttribute('class', 'grid-item');
    mygrid.appendChild(inner_div);

  }
  console.log(su_arr);
  console.log(codes);

}



function arb_random(a,b) {
  // will generate random var between
  // a,b including boundaries:
  uni_rand_01 = Math.random();
  //  make sure b>a, a and b are integers...
  a -= 1;
  uni_rand_ab = (b-a)*uni_rand_01 + a;
  // integer version
  return Math.ceil(uni_rand_ab);
}

// STR SPLITTING
// STRING.split(/\s/);


//////////////////////////////////////////////////////
// THIS IS HOW TO CHECK IF ELEMENT IS IN THE LIST ...
//////////////////////////////////////////////////////
// let mylist = [1, 2, 3, "foo", "bar"]
// if (mylist.includes(3)) {
//     writeln('yes, includes returns true')
// }
// // indexOf returns the location of item or -1 if not found
// if (mylist.indexOf(3) > -1) {
//     writeln('yes, index is > -1')
// }
//////////////////////////////////////////////////////
// THIS IS HOW TO CHECK IF ELEMENT IS IN THE LIST ...
//////////////////////////////////////////////////////




// function myFunction() {
//   var x, text;
//   // Get the value of the input field with id="numb"
//   x = document.getElementById("numb").value;
//   // If x is Not a Number or less than one or greater than 10
//   if (isNaN(x) || x < 1 || x > 9) {
//     text = x + " - ввод был ну очень плохой";
//   } else {
//     text = x + " - хорошая вводка!!!";
//   }
//   document.getElementById("demo").innerHTML = text;
//   document.getElementById("numb").value = '';
// }


function blah(idd) {
  gav += "А";
  document.getElementById(idd).innerHTML=gav;
}


function clean(idd) {
  gav = "";
  document.getElementById(idd).innerHTML='';
}