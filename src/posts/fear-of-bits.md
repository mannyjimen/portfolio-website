---
title: "fear of bits"
date: "2026-02-10"
---

### the beginning...
this is my first blog post, i was going to reference other devs' blog posts but... this is my website, I CAN DO WHAT I WANT. i can use incorrect grammar if i want to, but enough of that, lets get into the meat of this blog post -> bits and how scary they can be.  
  
Before I go into the bits and pieces (lol), a little context -> I am writing a Compiler in Go (using [Thorsten Ball's book](https://compilerbook.com/)) for the *Monkey Programming Language*. Very fun so far, and very balanced regarding focusing on compiler theory and Go (as I am still relatively new to Go). The 'compiler' portion is traversing our wonderful AST and spitting out some nice and well-formed *bytecode* (which is completely self-defined). The 'virtual machine' (stack-based) we are building executes this bytecode, and the feature that prompted this whole bit (lol) is compiling and executing *if statements (expressions in Monkey lang)*. 

### jumps 
Now, thanks to my OS class at Hunter, i was obviously exposed to assembly JUMP commands (and since bytecode pretty closely resembles most assembly languages, thats great). It was obvious that ii  would have to emit these JUMP commands in a clever way such that *if* and *if else* expressions could be executed correctly by my virtual machine.  
  
this image somewhat resembles the way our bytecode is abstractly supposed to be formatted for an if expression (containing an alternative expression) -- 

![if expression bytecode layout](/jumpLayout.png)  
  
Makes sense, if the conditional is true, ignore the first jump and continue execution which will reach the jump to skip the alternative, and in the case where the conditional is false, we jump to the alternative and continue execution from there.  
Pretty straightforward right!?  
Now the implementation!  
Starting out with test cases (test-driven development!) for compiling, it became apparent that i wasn't exactly 'confident' in writing the test cases, since it involved calculating precisely which addresses i wanted to jump to, which started prompting me to think "how would i even know where i wanted to jump before compiling my consequence/alternative".  

### back-patching  
Well, we have no idea what addresses belong in these jumps until we are done compiling certain parts of the if expression (which we would then return to the jump operation and change the address then - this is called *back-patching*). this is where things get a little more complicated... like how do i modify an instruction i emitted already? should i use an address relative to where the jump operation is, or an absolute address? whatever, these questions can be solved, but the real 'scariness' comes in when i try to implement them.
  
### bits  
  
Now, the real **FEAR**.  
Since I am working with translating an already formed data structure (my ast) to bytecode (which is a sequence of bits (well, bytes, but whatever)), it is very easy (in my mind) to mess things up. All it takes is one incorrectly compiled bit, and the whole Compiler/VM/programming language fails, all of it, garbage. But thats why we have tests right? Well my pessimistic mind tells me that all it takes is one incorrectly typed test... you see where this is going. 
  
Its crazy, back-patching, and the compilation/execution of if statements is beautiful. Something so simple has a fairly elegant algorithm that takes some code and turns it into perfectly formed bytecode. However, why am i scared of typing it out?  

### what it means to be a software engineer (or a person?)

This kind of took an odd turn. Starting out writing this post, i was sure i was going to lean into the technical side of the implemenation I am referring to, but now writing this, i guess i realize how common a situation like this occurs outside of my vs code window.  
People fear what they do not know. I fear not knowing exactly how to do something correctly, and having it blow up in my face (well maybe not blow up due to my elegant and super clean error handling... next blog post maybe?). Every day, we are presented with new opportunities to grow, and most of the time, we have to hunt for them.  
Every time i implement a new feature for this compiler, it is something i haven't done before, but getting past it and finding out that i made it *work* always feels insanely satisfying. sitting in this cloud of *mystery* and *confusion* is normal (and definitely uncomfortable), but what really makes you a great learner is how you go about these situations. am i scared of letting my compiler emit an incorrect bit? maybe a little. what am i going to do about it? just let it happen and learn from it. that is the only way to grow.  
Does something make you currently uncomfortable? great, lets face it head on and see what comes. the other side is always better than the discomfort you are sitting in right now.
### hmm...  
as i finish this blog, i realize how much i am really just talking to myself. im not sure if this is how i wanted this post to go, since i wanted to be a bit more technical and love discussing topics that are complex (to me), since it shows i have learned something about them.  
  
i think ill leave it off there, thanks for reading !