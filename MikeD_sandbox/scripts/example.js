//===================================
// Functions
//===================================

function add(number1, number2) {
    return number1 + number2;
}

var add2 = function(number1, number2) {
    return number1 + number2;
};

var myObject = {
    age: 51,
    add3: function(number1, number2) {
    return number1 + number2;
    },
    height: 172
};

add(3, 4);

add2(3, 4);

myObject.add3(3, 4);

//===================================
// alert() and console.log()
//===================================

alert('Add ' + add(3, 4));

console.log('Add2 ' + add2(3, 4));

var result = myObject.add3(3, 4);

console.log('Add3 ' + result);
