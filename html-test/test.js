var AA = 10;
var BB = 21;
var main_sentence = ""
var encode_dict;
var task_dict;

var input_id = "input_sentence";
var task_id = "sentence";
var encode_id = "lettercodes";

var reA = /[^АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/g;
// /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/
// var reA = /[^a-zA-Z]/g;
// var reN = /[^0-9]/g;
var alphabet = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];


// // that's how you create a new element
// var mygrid = document.createElement("div");
// mygrid.innerHTML = "";
// mygrid.setAttribute('class', 'grid-container');
// mygrid.setAttribute('id', 'sentgrid');
// document.body.appendChild(mygrid);

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


function encodeSentence() {
  var sentence, s_arr;
  // empty the dicts:
  encode_dict = {};
  task_dict = {};
  // Get the sentence ...
  sentence = document.getElementById(input_id).value;
  // sanitize input a bit -> unfirom, cyrillic, etc:
  sentence = sentence.trim().toUpperCase();
  main_sentence = sentence;
  // let's remove everyhting but А-Я
  sentence = sentence.replace(reA,"");
  // alert(sentence);
  s_arr = sentence.split('');
  su_arr = [...new Set(s_arr)];
  // document.getElementById("demo").innerHTML = su_arr;

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
    task_dict[su_arr[i]] = m1+"*\<br \/\>"+m2+"\= \?";
    encode_dict[su_arr[i]] = m1*m2;
  }

  console.log(task_dict);
  console.log(encode_dict);

  // clean the div if needed
  var mygrid = document.getElementById(encode_id);
  if (mygrid.hasChildNodes()) {
      mygrid.innerHTML = '';
  }

  for (var symbol of su_arr.sort()) {
    // iterate over enocding 
    var inner_div = document.createElement('div');
    inner_div.setAttribute('class', 'grid-item');
    // 
    let up = document.createElement('div');
    up.setAttribute('class', 'grid-div');
    let down = document.createElement('div');
    down.setAttribute('class', 'grid-div');

    console.log(symbol);
    console.log(encode_dict[symbol]);
    console.log(task_dict[symbol]);

    up.innerHTML = task_dict[symbol];
    down.textContent = symbol;


    inner_div.appendChild(up);
    inner_div.appendChild(down);
    mygrid.appendChild(inner_div);

  }

  // clear the form on completion
  document.getElementById(input_id).value = "";

}


function generateTask(){
  // sentence stuuf:
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  var newgrid = document.getElementById(task_id);
  if (newgrid.hasChildNodes()) {
      newgrid.innerHTML = '';
  }

  // operate on a global variable - whatever
  // how can one pass JS function returns around
  for (symb of main_sentence.split('')) {
    // 
    let inner_div = document.createElement('div');
    inner_div.setAttribute('class', 'grid-item');

    let up = document.createElement('div');
    up.setAttribute('class', 'grid-div');
    let down = document.createElement('div');
    down.setAttribute('class', 'grid-div');

    if (alphabet.includes(symb)) {
      down.textContent = encode_dict[symb];
      // up.innerHTML = "<input >";
      up.textContent = "?";
    } else {
      up.textContent = symb;
    }

    inner_div.appendChild(up);
    inner_div.appendChild(down);
    newgrid.appendChild(inner_div);

  }
}

// STR SPLITTING
// STRING.split(/\s/);