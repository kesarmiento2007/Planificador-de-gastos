import { useReducer, useMemo, createContext, Dispatch, ReactNode } from "react";
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer";

type BudgetContextProps = {
    state: BudgetState,  // Estructura de datos de los states del reducer
    dispatch: Dispatch<BudgetActions>,  // Tipo de dato del dispatch del reducer
    totalExpenses: number,
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState);
    
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => total + expense.amount, 0), [state.expenses]);
    const remainingBudget = useMemo(() => state.budget - totalExpenses, [state]);

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}