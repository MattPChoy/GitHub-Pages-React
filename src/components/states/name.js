import { entity } from 'simpler-state'

export const name = entity("")

export const resetName = () => {
    name.set("")
  }
  
  export const setName = newName => {
    name.set(newName)
    // --OR-->  counter.set(counter.get() + by)  
  }

  export const getName = () => {
    return name.get();
    // --OR-->  counter.set(counter.get() + by)  
  }