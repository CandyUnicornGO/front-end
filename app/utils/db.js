import Dexie from 'dexie'

class DB {
  constructor() {
    this.db = new Dexie('unicorn')
    this.db.version(1).stores({
      accounts: 'id'
    })
  }

  saveAccount(account) {
    return this.db.accounts.add(account)
  }

  findAccount(id) {
    return (this.db.accounts
      .where('id')
      .equals(id)
      .toArray())
  }
}

export default new DB()
