|  name | description | example
|-------|-------------|---------
| [add](/commands/add) | Adds content to a given target | `add .myClass to me`
| [append](/commands/append) | Appends a value to a string, array or HTML Element | `append "value" to myString`
| [async](/commands/async) | Runs commands asynchronously | `async fetch /example`
| [call/get](/commands/call) | Evaluates an expression (e.g. a Javascript Function) | `call alert('yep, you can call javascript!)` <br/><br/> `get prompt('Enter your name')`
| [decrement](/commands/decrement) | Subtracts a value to a variable, property, or attribute | `decrement counter`
| [fetch](/commands/fetch) | Send a fetch request | `fetch /demo then put it into my.innerHTML`
| [hide](/commands/hide) | Hide an element in the DOM | `hide me`
| [if](/commands/if) | A conditional control flow command | `if me.selected then call alert('I\'m selected!')`
| [increment](/commands/increment) | Adds a value to a variable, property, or attribute | `increment counter`
| [js](/commands/js) | Embeds javascript | `js alert('this is javascript'); end`
| [log](/commands/log) | Logs a given expression to the console, if possible | `log me`
| [put](/commands/put) | Puts a value into a given variable or property| `put "cool!" into me.innerHTML`
| [remove](/commands/remove) | Removes content | `log "bye, bye" then remove me`
| [repeat](/commands/repeat) | Iterates | `repeat for x in [1, 2, 3] log x end`
| [return](/commands/return) | Returns a value | `return 42`
| [send](/commands/send) | Sends an event | `send customEvent to #a-div`
| [set](/commands/set) | Sets a variable or property to a given value | `set x to 0`
| [settle](/commands/setttle) | Waits for a transition to end on an element, if any | `set x to 0`
| [show](/commands/show) | Show an element in the DOM | `show #anotherDiv`
| [take](/commands/take) | Takes a class from a set of elements | `take .active from .tabs`
| [throw](/commands/throw) | Throws an exception | `throw "Bad Value"`
| [toggle](/commands/toggle) | Toggles content on a target | `toggle .clicked on me`
| [transition](/commands/transition) | Transitions properties on an element | `transition opacity to 0`
| [trigger](/commands/trigger) | triggers an event on the current element | `trigger customEvent`
| [wait](/commands/wait) | Waits for an event or a given amount of time before resuming the command list | `wait 2s then remove me`
| [tell](/commands/tell) | Temporarily sets a new implicit target value | `with <p/> add .highlight`
| [go](/commands/go) | Navigate to a new page or within a page | `go to the top of the body smoothly`
