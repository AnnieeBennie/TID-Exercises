import Parse from "parse";

const List = Parse.Object.extend("List");

export async function createList(name) {
  const list = new List();
  const user = Parse.User.current();

  list.set("name", name);
  list.set("owner", user);
  list.setACL(new Parse.ACL(user));

  return await list.save();
}
export async function fetchLists() {
  const query = new Parse.Query(List);
  query.equalTo("owner", Parse.User.current());

  return await query.find();
}
