export interface IExpenseRecord {
    id: number;
    amount: number;
    category: string;
    isFuelExpense: string;
    isMaintenanceExpense: string; 
    litresOfFuelPurchased: number;
    comments: string;
    expenseDate: string; 
    createdAt: string;   
}