export interface IExpenseRecord {
    id: number;
    amount: number;
    vehicleProfileId: string;
    category: string;
    isFuelExpense: string;
    isMaintenanceExpense: string; 
    litresOfFuelPurchased: number;
    comments: string;
    expenseDateRaw: string; 
    createdAtRaw: string;   
}