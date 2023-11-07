import { openDB } from "idb";

// Initialize the database
const initdb = async () => {
  // Open the 'jate' database with version 1
  openDB("jate", 1, {
    upgrade(db) {
      // Check if the 'jate' object store already exists
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create the 'jate' object store with a unique 'id' key
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });
};

// Function to add data to the database
export const putDb = async (content) => {
  console.log("PUT to the database");

  // Open the 'jate' database with version 1
  const contactDb = await openDB("jate", 1);

  // Start a read-write transaction
  const tx = contactDb.transaction("jate", "readwrite");

  // Access the 'jate' object store
  const store = tx.objectStore("jate");

  // Put the data into the store with a specified 'id'
  const request = store.put({ id: 1, value: content });

  // Wait for the request to complete and log the result
  const result = await request;
  console.log("🚀 - Data saved to the database", result);
};

// Function to retrieve data from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Open the 'jate' database with version 1
  const contactDb = await openDB("jate", 1);

  // Start a read-only transaction
  const tx = contactDb.transaction("jate", "readonly");

  // Access the 'jate' object store
  const store = tx.objectStore("jate");

  // Retrieve all data from the object store
  const request = store.getAll();

  // Wait for the request to complete and log the result
  const result = await request;
  console.log("Retrieved data:", result);

  // Return the retrieved data (array)
  return result;
};

// Initialize the database when the module is imported
initdb();
