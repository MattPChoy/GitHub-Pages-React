import { entity } from 'simpler-state'

export const reports = entity({})

  
  export const setReports = newList => {
    if (newList === null || newList === undefined) {
      reports.set({})
    } else {
      reports.set(newList)
    }
    // --OR-->  counter.set(counter.get() + by)  
  }

  export const getReports = () => {
    if (reports.get() === undefined) {
      return {};
    }
    return reports.get();
    // --OR-->  counter.set(counter.get() + by)  
  }
    
  export const resetReports = () => {
    return reports.set({});
    // --OR-->  counter.set(counter.get() + by)  
  }