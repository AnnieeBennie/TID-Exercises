import Parse from "parse";
const TodoItem = Parse.Object.extend("TodoItem");
// React is happier with plain JS objects than with Parse objects,
// and this is also where we unify the treatment of `id` with the other fields

function toPlainObject(parseObject) {
  const user = parseObject.get("user");
  const list = parseObject.get("list");
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    done: parseObject.get("done"),
    user: user ? user.id : null,
    list: list ? list.id : null,
  };
}

export async function fetchTodos() {
  const query = new Parse.Query(TodoItem);
  query.ascending("createdAt"); // oldest first
  const results = await query.find();
  return results.map(toPlainObject);
}

export async function createTodo(text, list) {
  const item = new TodoItem();
  const user = Parse.User.current();
  item.set("text", text);
  item.set("done", false);
  item.set("user", user);
  item.set("list", list);
  item.setACL(new Parse.ACL(user)); // only the owner can read/write this todo
  return toPlainObject(await item.save());
}

export async function setTodoDone(id, done) {
  // we have the id, so we don't need to fetch the object before changing it
  const item = TodoItem.createWithoutData(id);
  item.set("done", done);
  return toPlainObject(await item.save());
}

export async function deleteTodo(id) {
  const item = TodoItem.createWithoutData(id);
  await item.destroy();
}
