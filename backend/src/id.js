function nanoid(size = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < size; i += 1) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

module.exports = { nanoid };
