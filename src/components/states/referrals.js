// State manager for ReferralList
import { entity } from 'simpler-state'

// The parameter passed to the entity
const incomingReferrals = entity([])
const outgoingReferrals = entity([])
const isIncoming = entity(1) // is currently set to incoming referrals
// The current referral being display.
export const activeReferral = entity("")

export const resetReferralList = () => {
    incomingReferrals.set([])
    outgoingReferrals.set([])
}

export const setIncoming = (li) => {
    incomingReferrals.set(li);
}

export const setOutgoing = (li) => {
    outgoingReferrals.set(li);
}

export const setIncomingState = () => {
    isIncoming.set(1);
}

export const setOutgoingState = () => {
    isIncoming.set(0);
}

export const getReferrals = () => {
    if (isIncoming.get()) {
        return incomingReferrals.get();
    } else {
        return outgoingReferrals.get();
    }
}

export const toggleDirection = () => {
    if (isIncoming.get()) {
        setOutgoingState();
    } else {
        setIncomingState();
    }
}

export const getState = () => {
    return isIncoming.get();
}

export const setActiveReferral = (r) => {
    console.log("Set active referral to " + r);
    activeReferral.set(r);
}

export const getActiveReferral = () => {
    activeReferral.get();
}
