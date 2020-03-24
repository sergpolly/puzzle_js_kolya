var AA = 10;
var BB = 21;
var main_sentence = "";
var encode_dict;
var task_dict;

var input_id = "input_sentence";
var task_id = "sentence";
var encode_id = "lettercodes";


// which operations are selected:
var op_ids = ["plus", "minus", "multiply"];



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

function encodeSentence() {
  var sentence, s_arr;
  // empty the dicts:
  encode_dict = {};
  task_dict = {};
  // Get the sentence ...
  sentence = document.getElementById(input_id).value;
  if (sentence == "") {
    alert("Ну введите же предложение, наконец!");
    return;
  }
  //  check operations
  var ops_todo = [];
  for (op_id of op_ids){
    if ( document.getElementById(op_id).checked ){
      ops_todo.push(op_id);
    }
  }
  if (ops_todo.length < 1) {
    alert("Ну выберите хоть какую-нибудь операцию!");
    return;
  }
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
    let letter = su_arr[i];
    let operation = choose(ops_todo);
    let [a,b,res] = encode_letter(letter, operation, codes);
    let opstr = op_to_string(operation,html=true);
    // upack and record everything:
    codes[i] = res;
    task_dict[letter] = a+opstr+b+"= \?";
    encode_dict[letter] = res;
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

}


function generateTask(){
  // sentence stuuf:
  // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  var newgrid = document.getElementById(task_id);
  if (newgrid.hasChildNodes()) {
      newgrid.innerHTML = '';
  }

  if (main_sentence == "") {
    alert("Ну введите же предложение, наконец!");
    return;
  }

  // clear the input form ...
  document.getElementById(input_id).value = "";

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


function arithmetic_apply(a,b,op) {
  // apply arithmetic operation
  switch (op) {
    case "plus":
      result = a + b;
      break;
    case "minus":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    default:
      result = null;
  }
  return result;
}


function op_to_string(op,html=false) {
  // print arithemtic operation nicely:
  switch (op) {
    case "plus":
      opstr = "+";
      break;
    case "minus":
      opstr = "-";
      break;
    case "multiply":
      opstr = "*";
      break;
    default:
      opstr = null;
  }
  // add break if html is selected:
  if (html) {
    return "<br />"+opstr;
  } else {
    return opstr;
  }
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


// function to encode a letter with a given operation ...
function encode_letter(letter, operation, used_codes) {
  // keep encoding until good combination found:
  var task_found = false;
  var attempt_counter = 0;
  while (!task_found){
    attempt_counter += 1;
    var a = arb_random(AA,BB);
    var b = arb_random(AA,BB);
    //  is this task/code unique ? positive ?
    potential_code = arithmetic_apply(a,b,operation);
    opstr = op_to_string(operation);
    operation_str = ( a + opstr + b );
    if (used_codes.indexOf(potential_code) > -1) {
      task_found = false;
      console.log("  failed: "+operation_str);
    } else if (potential_code < 0) {
      task_found = false;
      console.log("  failed: "+operation_str);
    } else {
      task_found = true;
    }
  }
  // we've got this - returning:
  console.log(attempt_counter+" attempts: "+operation_str);
  return [a,b,potential_code];
}


// random choice from an array - nothing builtin in JS
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
