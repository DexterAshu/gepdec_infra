// let add = getValue(5)(6)(12)
// // console.log(add);

// function getValue(a) {
//     return function(b) {
//         return function(c) {
//             return function(d) {
//                 return a + b + c + d;
//             }
//         }
//     }
// }

// console.log(getValue(5)(6)(12)); // Output: 33
// function getValue() {
//     var addData = add.splice(1,1)
//     console.log(addData);
//     // create
// }


// const array = [1,2,3];
// const array1 = [4,5,7];
// const mergedArr = [...array, ...array1];
// console.log(mergedArr);

// const numbers = [1,2,3,4,5];
// sum (...numbers);

// function sum(a,b,c,d,e) {
//     console.log(a+b+c+d+e);
    
// }


const arr = [1,2,3,4,5,6,7,8,9];

// let a = arr.indexOf(7);
// console.log(a);

//filter
// let fil = arr.filter((num)=> num % 2 === 0)
// console.log(fil);//output 2,4,6,8
// //find
// let fin = arr.find((num)=> num % 2 === 0)
// console.log(fil); //output 2
//slice
//  let s = arr.slice(1,8);
//  console.log(s);//output[ 2, 3, 4, 5, 6, 7, 8]

//  arr.push(10,11);
// console.log(arr);
//  let conc = arr.concat(10,11);
// console.log(conc);

// let popped = arr.pop();
// console.log(popped);

// arr.splice(1,0, 'x','y','z')
// console.log(arr);

//map
// let mapArr = arr.map((res)=>res *20);
// console.log(mapArr);
// console.log(arr);
// //foreach
// let forEachh = arr.forEach((e)=>{
//     console.log(e*20);
// })

// let abc = [4,2,1,5,6,3,5,6,9,7];
// abc.reverse();
// console.log(abc);

// let sortStr = "chandralok pandey";
// // const reverseData = sortStr.split('').reverse().join('').toString().toUpperCase();
// const reverseData = sortStr.split('').reverse().map(char=>char.toUpperCase())
// console.log(reverseData);

// reverseData.splice(2,1,'d');
// reverseData.reverse();
// console.log(reverseData);
let data = {name:"Chandra",age:21};
console.log(JSON.stringify(data));


