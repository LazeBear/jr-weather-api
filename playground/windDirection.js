function degToDirection(num) {
  var val = Math.floor((num + 22.5) / 45);
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[val % 8];
}

console.log(degToDirection(0));
console.log(degToDirection(44));
console.log(degToDirection(45));
console.log(degToDirection(90));
console.log(degToDirection(359));

console.log(degToDirection(22.5));
