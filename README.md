# Obvy
### A simple observable implementation using ES6 Proxy

## Usage:
```javascript
import create from './obvy'
```
Create an observable
```javascript
let o = create({
    a: 1, 
    b: {c: 'hello'}, 
    d: [1, 2, 3]
})
```

 Subscibe to changes
```javascript
const subscription = obs.sub((state) => console.log(state.a + 25))

obs.a = 20 // >>> 45

subscription.unsub()

obs.a = 50 // *no output*
```
Arrays aren't observable. Replace, don't mutate.
```javascript
const newSubscription = obs.sub((state) => console.log(state.d + " hi"))

obs.d = obs.d.map(n => n * 2) // >>> [2, 4, 6] hi

newSubscription.unsub()
```

Nested objects work just fine
```javascript
const s = obs.sub((state) => console.log(state.b.c + ", world!"))

obs.b.c = "What's up" // >>> What's up, world!

s.unsub()
```