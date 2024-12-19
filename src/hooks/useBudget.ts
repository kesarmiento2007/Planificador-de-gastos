import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext);

    if(!context) {  // En caso de que no estes implementando bien el context
        throw new Error("useBudget must be used within a BudgetContext");
    }

    return context;
}