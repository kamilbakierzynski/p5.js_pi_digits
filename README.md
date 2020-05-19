# Calculate π digits by colliding two blocks.

>Play here:
>https://kamilbakierzynski.github.io/p5.js_pi_digits_from_bounce/

Small simulation made with [p5.js](https://p5js.org/).
There are two blocks - one with a mass of 1kg and the other with `100^n`kg where `n` is the number of `π` digits you want to compute.

>When `n = 9`, the mass of the bigger block is `10^18`kg while the mass of the Moon is `7.34 * 10^22`kg. This is the reason why there is a restriction that you can compute up to 9 digits.

There is no friction or energy loss while colliding with other block or with a wall. Laws that apply in this simulation:
1. Law of conservation of energy
2. Law of conservation of linear momentum

To optimize the process and run smoothly program does `10^6` calculations of the blocks positions between each frame.
   
If you want to check why colliding blocks calculate digits of `π` check this videos:
1. Part 1: https://www.youtube.com/watch?v=HEfHFsfGXjs
2. Part 2: https://www.youtube.com/watch?v=jsYwFizhncE
3. Part 3: https://www.youtube.com/watch?v=brU5yLm9DZM