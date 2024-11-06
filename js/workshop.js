"use strict";

// console.log('Hello Workshop');

// basic types
// let string_type = "hello world";
// let some_number = 6;
// let number_5 = 5;
// let a_boolean_value = true;
// let always_false = false;

// Currying
const add = (a) => (b) => a + b;
// console.log(add(5)(4));

// identity
const identity_number = () => 0;
// const identity_string = () => "";
// const identity_bool = () => false;

// Recursion
const count_array = (arr) => {
    if (arr.length == 0) return identity_number();
    arr.pop();
    return count_array(arr) + 1;
};

// const maybe = (v) => ({kind: 'left', v: v});
// const definitely = () => ({kind: 'right', v: false});
const Some = (v) => ({
    kind: 'some',
    value: v,
    map: function (f) {
        return Some(f(this.value));
    }
});

const None = () => ({
    kind: 'none',
    map: function (f) {
        return None();
    }
});

let optional = Some(4);
let plus5 = optional.map(add(5));
// console.log(optional);
// console.log(plus5);

const ListNode = (value, tail) => ({kind: 'node', value: value, tail: tail});
const Empty = () => ({kind: 'empty'});
let list1 = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, Empty())))));

// 1. Build a .map function for the linked list
const map = (list, fn) => {
    if (list.kind === 'empty') return Empty(); // Return an Empty node if we reach the end
    return ListNode(fn(list.value), map(list.tail, fn)); // Apply fn to the current node's value and recurse for the tail
};
const mappedList = map(list1, (x) => x);
console.log(mappedList);

// 2. Use the map function it to increment each item of the list
const map2 = (list, fn) => {
    if (list.kind === 'empty') return Empty(); // Return an Empty node if we reach the end
    return ListNode(fn(list.value), map2(list.tail, fn)); // Apply fn to the current node's value and recurse for the tail
};
const mappedList2 = map2(list1, (x) => x+1);
console.log(mappedList2);

// 3. Make a transform function using map to create a list of booleans. True for even values and false for odd values. 
//    i.e. list1.map(isEven) should give the following result [false, true, false, true, false] where the array is the linked list
// 4. Make a method list1.reduce<b>(f: (acc: b, x: a) => b, init: b): b where f is a function with 2 parameters 
//    acc which is the accumulator of type b and x of type a for every element in the list the value is merged with 
//    the accumulator. The init parameter is of type b and represents the starting point of the accumulator. Init can
//    be considred the Identity of the return type. 
// 5. Make a .filter() method that takes a predicate function as input. Every element is checked against the predicate and 
//    and if the element matches the condition it is added to a new list. 
//    Hint: Use the reduce() function to implement the filter method.
// 6. Make a .toString() method using the .reduce() function. The function transforms the list insto a single formatted string 
//    Where every value is divided by a comma.
// 7. Go back to the .map function from question 1 and use reduce to implement map().

