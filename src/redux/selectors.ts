export const getBillsState = (store: any) => {
    return store.bills
}

export const getAllBills = (store: any) => {
    getBillsState(store) ? getBillsState(store).allBills : [];
}

export const getBillsByMonth = () => {
    
}