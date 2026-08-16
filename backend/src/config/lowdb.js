const path = require("path");
const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { nanoid } = require("../id");

const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const legacyDb = path.join(__dirname, "../../../data/db.json");
const dbFile = path.join(dataDir, "db.json");
if (!fs.existsSync(dbFile) && fs.existsSync(legacyDb)) {
  fs.copyFileSync(legacyDb, dbFile);
}

const adapter = new FileSync(dbFile);
const db = low(adapter);

db.defaults({
  solutions: [],
  caseStudies: [],
  team: [],
  offers: [],
  pageContent: {},
  admin: null,
}).write();

if (!db.has("offers").value()) {
  db.set("offers", []).write();
}

function getPageContent(key) {
  const all = db.get("pageContent").value() || {};
  return all[key] || null;
}

function setPageContent(key, value) {
  const all = db.get("pageContent").value() || {};
  all[key] = value;
  db.set("pageContent", all).write();
  return all[key];
}

function getAllPageContent() {
  return db.get("pageContent").value() || {};
}

function collection(name) {
  return {
    find(filter = {}) {
      let rows = db.get(name).value() || [];
      return rows.filter((row) => match(row, filter));
    },
    findOne(filter = {}) {
      return this.find(filter)[0] || null;
    },
    findById(id) {
      return (db.get(name).value() || []).find((row) => row._id === id) || null;
    },
    insert(doc) {
      const row = { _id: nanoid(), ...doc, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      db.get(name).push(row).write();
      return row;
    },
    insertMany(docs) {
      return docs.map((doc) => this.insert(doc));
    },
    update(id, patch) {
      const row = this.findById(id);
      if (!row) return null;
      const next = { ...row, ...patch, _id: row._id, updatedAt: new Date().toISOString() };
      db.get(name)
        .find({ _id: id })
        .assign(next)
        .write();
      return next;
    },
    remove(id) {
      const before = db.get(name).value().length;
      db.get(name).remove({ _id: id }).write();
      return db.get(name).value().length < before;
    },
    clear() {
      db.set(name, []).write();
    },
    all() {
      return db.get(name).value() || [];
    },
  };
}

function match(row, filter) {
  return Object.entries(filter).every(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if (value.$ne !== undefined) return row[key] !== value.$ne;
      if (value.$nin) return !value.$nin.includes(row[key]);
      return true;
    }
    if (Array.isArray(row[key])) return row[key].includes(value);
    return row[key] === value;
  });
}

function getAdmin() {
  return db.get("admin").value();
}

function setAdmin(admin) {
  db.set("admin", admin).write();
  return admin;
}

module.exports = {
  db,
  solutions: collection("solutions"),
  caseStudies: collection("caseStudies"),
  team: collection("team"),
  offers: collection("offers"),
  getAdmin,
  setAdmin,
  getPageContent,
  setPageContent,
  getAllPageContent,
};
