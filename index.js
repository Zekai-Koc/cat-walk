const DANCING_CAT_URL =
   "https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif";
const WALKING_CAT_URL =
   "http://www.anniemation.com/clip_art/images/cat-walk.gif";

const STEP_SIZE_PX = 10;
const STEP_TIME_MS = 50;
const DANCE_TIME_MS = 2000;
const img = document.querySelector("img");
let position = 0;
const midPoint = (window.innerWidth - img.offsetWidth) / 2;

function checkPosition(intervalToClear, pos, pointOnScreen, state) {
   // console.log(state);
   return new Promise((resolve, reject) => {
      try {
         if (pos > pointOnScreen) {
            clearInterval(intervalToClear);
            resolve(state);
         }
      } catch (error) {
         reject(error);
      }
   });
}

// why this function call does not work as expected?
/* --------------------------------------------------------- */
checkPosition("0", 0, 100, "STARTING")
   .then((msg) => {
      console.log(msg);
   })
   .catch((err) => {
      console.error(err);
   });
/* --------------------------------------------------------- */

function dance() {
   setTimeout(() => {
      img.src = WALKING_CAT_URL;

      intervalId = setInterval(() => {
         img.style.left = `${position}px`;
         position += STEP_SIZE_PX;

         checkPosition(
            intervalId,
            position,
            window.innerWidth - img.width / 2,
            "WALKING"
         ).then((msg) => {
            console.log(msg);
            catWalk();
         });
      }, STEP_TIME_MS);
   }, DANCE_TIME_MS);
}

function catWalk() {
   position = 0;

   let intervalId = setInterval(() => {
      img.style.left = `${position}px`;
      position += STEP_SIZE_PX;

      checkPosition(intervalId, position, midPoint, "DANCING").then((msg) => {
         console.log(msg);
         img.src = DANCING_CAT_URL;
         dance();
      });
   }, STEP_TIME_MS);
}

window.addEventListener("load", catWalk);
