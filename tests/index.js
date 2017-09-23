const obvy = require("../index");
const { test } = require("ava");

// Obvy call with no arguments returns empty observable
test(t => {
  t.deepEqual(obvy(), {});
});

// Empty observable has a subscribe function
test(t => {
  t.is(typeof obvy().sub, "function");
});

// Obvy call with object returns object with same properties
test(t => {
  let o = obvy({ a: 1 });
  t.deepEqual(o, { a: 1 });
});

// subscribtion is called
test(t => {
  let o = obvy({ a: 1 });
  let b;

  o.sub(s => (b = s.a));

  o.a = 1;

  t.is(b, 1);
});

// Subscription is no longer called after unsubscribe
test(t => {
  let o = obvy({ a: 1 });
  let b;

  let sub = o.sub(s => (b = s.a));

  o.a = 1;

  sub.unsub();

  o.a = 2;

  t.is(b, 1);
});

// Subscription is called for nested objects
test(t => {
  let o = obvy({ a: { b: 1 } });
  let c;

  o.sub(s => (c = s.a.b));

  o.a.b = 1;

  t.is(c, 1);
});

// Handle subscriptions
test(t => {
  let o = obvy({ a: 1 });
  let b;
  let c;

  o.sub(s => (b = s.a));
  o.sub(s => (c = s.a));

  o.a = 1;

  t.is(b, 1);
  t.is(c, 1);
});
