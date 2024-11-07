class localBD {
  #bd;
  #bdName;

  constructor(bdName) {
    this.#bdName = bdName;
    const bd = localStorage.getItem(bdName);

    if (bd === null) {
      this.#bd = { _lastID: 0 };
      localStorage.setItem(bdName, JSON.stringify(this.#bd));
    } else {
      this.#bd = JSON.parse(localStorage.getItem(bdName));
    }
  }

  updateCollection(collection) {
    Object.assign(this.#bd, collection);
    localStorage.setItem(this.#bdName, JSON.stringify(this.#bd));
  }

  get getLastID() {
    return this.#bd["_lastID"];
  }

  importData(data) {
    this.#bd = data;
    localStorage.setItem(this.#bdName, JSON.stringify(data));
  }

  execute(collection) {
    return {
      insert: (document) => {
        /**
         * AGREGAR VALIDACIONES
         */
        const newID = this.#bd["_lastID"] + 1;
        this.#bd[collection].push({ _ID: newID, ...document });
        this.updateCollection({
          _lastID: newID,
          [collection]: this.#bd[collection],
        });
        return newID;
      },
      delete: (filter) => {
        /**
         * AGREGAR VALIDACIONES
         */

        const newCollection = this.#bd[collection].filter((dataBD, key) => {
          return Object.entries(filter).every((valor, key) => {
            const row = valor[0];
            const findValue = valor[1];

            return dataBD[row] !== findValue;
          });
        });

        this.updateCollection({ [collection]: newCollection });
      },
      find: async (filter = undefined) => {
        /**
         * AGREGAR VALIDACIONES
         */
        if (filter !== undefined) {
          return this.#bd[collection].filter((dataBD, key) => {
            return Object.entries(filter).every((valor, key) => {
              const row = valor[0];
              const findValue = valor[1];

              return dataBD[row] === findValue;
            });
          });
        } else {
          return this.#bd["products"];
        }
      },
      update: (filter, dataUpdate) => {
        /**
         * AGREGAR VALIDACIONES
         */

        const newCollection = this.#bd[collection].filter((dataBD, key) => {
          return Object.entries(filter).every((valor, key) => {
            const row = valor[0];
            const findValue = valor[1];

            return dataBD[row] !== findValue;
          });
        });

        newCollection.push(dataUpdate);
        this.updateCollection({ [collection]: newCollection });
      },
    };
  }
}
export { localBD };
