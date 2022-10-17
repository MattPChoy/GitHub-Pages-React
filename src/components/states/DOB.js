import { entity } from 'simpler-state'

export const DOB = entity("")

export const setDOB = newDOB => {
    if (newDOB === null || newDOB === undefined) {
        console.log("Failed to set DOB to " + newDOB);
        DOB.set("")
    } else {
        console.log("Set DOB to " + newDOB);
        DOB.set(newDOB)
    }
    // --OR-->  counter.set(counter.get() + by)
}

export const getDOB = () => {
    if (DOB.get() === undefined) {
      return "";
    }
    return DOB.get();
    // --OR-->  counter.set(counter.get() + by)
}

export const resetDOB = () => {
    return DOB.set("");
    // --OR-->  counter.set(counter.get() + by)
}
