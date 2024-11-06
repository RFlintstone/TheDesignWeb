console.log('Hello Workshop')


// basic types 

let string_type: string = "hello world"

let some_number: number = 6

let number_5: 5 = 5

let a_boolean_value: boolean = true

let always_false: false = false

// Currying 
const add = (a: number) => (b: number): number => a + b
console.log(add(5)(4))

// identity 

const identity_number = () => 0
const identity_string = () => ""
const identity_bool = () => false


// Recursion
const count_array = <a>(arr: a[]): number => {
    // base case 
    if (arr.length == 0) {
        return identity_number()
    }
    // action
    arr.pop()
    return count_array(arr) + 1
}





// A first datastructure the Option type

type Sum<a, b> = { kind: 'left', v: a } | { kind: 'right', v: b }
type Maybe<a> = Sum<a, false>

const maybe = <a>(v: a): Maybe<a> => ({ kind: 'left', v: v })
const definitely = <a>(): Maybe<a> => ({ kind: 'right', v: false })

type Option<a> = ({
    kind: 'some',
    value: a
} | {
    kind: 'none'
}) & {
    map: <b>(f: (_: a) => b) => Option<b>
}


const Some = <a>(v: a): Option<a> => ({
    kind: 'some',
    value: v,
    map: function <b>(f: (_: a) => b): Option<b> {
        return Some<b>(f(this.value))
    }
})
const None = <a>(): Option<a> => ({
    kind: 'none',
    map: function <b>(f: (_: a) => b): Option<b> {
        return None<b>()
    }
})

let optional: Option<number> = Some(4)

let plus5 = optional.map(add(5))

console.log(optional)
console.log(plus5)


// Adding a .map function to transform Option<a> into Option<b>


// Getting the hang of functional programming? 

// Let's build an immutable linked list from scratch

// Node(1, Node(2, Empty()))


type ListNode<a> = {
    kind: 'node',
    value: a
    tail: LinkedList<a>
}

type Empty<a> = {
    kind: 'empty'
}

type LinkedList<a> = ListNode<a> | Empty<a>


const ListNode = <a>(value: a, tail: LinkedList<a>): LinkedList<a> => ({ kind: 'node', value: value, tail: tail })

const Empty = <a>(): LinkedList<a> => ({ kind: 'empty' })

let list1 = ListNode(1, ListNode(2, ListNode(3, ListNode(4, ListNode(5, Empty())))))



// 1. Build a .map function for the linked list

// 2. Use the map function it to increment each item of the list


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