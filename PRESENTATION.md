
# An Exercise in React: building a reusable component

What do I want:

A component I can put in a workout blog to show a workout I have designed, let
my readers tweak it to suit them, and run them through the workout.


github.com/rcousins <- coworker of someone in the meetup, I think they have jobs
                       going. They do react stuff?
                       It was of the guy who seems to know a bunch about javascript
                       and web stuff.


# Setup

Open the [Get Started page](https://facebook.github.io/react/docs/getting-started.html)

Download the starter kit from **The big button**

*README.md is basically the react homepage*

 - Copy the example to helloworld.html.
 - Open it in browser.
 - Change something and refresh.


Not covering use with ES6 today.

*Aside: A boilerplate repository for using react with es6 and browserify: [react-es6-browserify](https://github.com/tcoopman/react-es6-browserify)*


TODO see if I can put a react component into Ally's blog she made with ruby/rails.

 - I can! She will re-make it soon.

What can I put on the blog? Something with putting items on a list, that can be
edited and removed? A game of some sort? Something that can have some starting
state and use the same component several times...

 - Could do a little workout planner.
   - It could be on a page that has several suggested workouts
     (so it uses the component several times).
   - You can mess with the workouts inline (so it lets you manipulate state).
   - [.] You can run the workouts:
     - [ ] show a big timer and a pause/play button
     - [x] highlight the current item and grey out the finished items
     - [x] big text of the current item

Running the workouts would use the more ephemeral state info and demonstrate that.
The workout plan would use the more permanent state (properties) and demonstrate that.


Features:



Create a set of intervals, specify how many times to repeat them all, and how
long to rest between them. Purposely not a lot of fine-grained control (to keep
the scope small, and to demonstrate using the same data in several places).

 - Editing:
   [x] Add an interval (exercise name + time)

        [x] make a form component that can be expanded/collapsed,
        [x] allows entry of exercise name and time
        [x] validates that name exists and time is an integer
        [x] calls the appropriat callback on submit (and prevents default)

        [x] workout helper passes a callback, and the callback updates the state


   [ ] Duplicate an interval *Should duplicate and original be linked?* **NO!**
   [ ] Change interval time
-->[ ] Delete an interval
   [ ]Move interval up/down
      [ ] drag-drop if there is time
   [ ] Set rest time (same time between each exercise, update all at once)
   [ ] Set number of reps

   [ ] Show the total workout time, always update

While in editing mode, I could either show all the reps, or just show the
multiplier. This could be something to toggle. In playing mode it could work
with either as well, just have the multiplier counting down or saying like
"Round 2 of 3".

 - Playing
   [x] Press a go button -> Starts a (5 second) countdown to workout

   [ ] quick implementation to get it going:
     [x] current exercise style changes: background color, text size/color
     [x] next to clock says "ready", "set", "go"
     [x] clock counts down by seconds to 0
   [ ] make go button a "pause" button when it is going


   [x] Show current exercise (big text)
   [ ] Show next exercise (medium text)
   [x] Count down timer for current exercise
   [ ] Could show a progress bar behind each item as you get through the time
   [x] Show rest timer between items, counting down
      [ ] maybe progress bar

   [ ] Show the total remaining time or elapsed time.

   [ ] When on final item, show the next item as "Finish!"
   [ ] Some sort of congratulatory message at the end.

  - Debugging

    [x] Prevent the 1-second pause between items.
    [ ] Clear finished state when all intervals are done.


I could show current exercise inline, or separate from the list. Inline would be
sort of cool: list item would expand as you approach it, slot in when you finish
the previous one so you can see it while the rest timer is running, then its
timer would start.


A cool mode to have would be to line up all the exercises horizontally and
scroll them across (with an overflow hidden panel or some such). That may be too
advanced for this small demo, but maybe do it later on. Could show a little
runner progressing through the workout, and show them leaning over panting
during the breaks.



This page looks interesting: http://aspiringwebdev.com/react-js-and-rails-real-world-results/
I think it is about tighter integration than I am planning though.