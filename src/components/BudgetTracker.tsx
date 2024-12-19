import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"

const BudgetTracker = () => {

  const { state, dispatch, remainingBudget, totalExpenses } = useBudget();

  const percentage = +((100 * totalExpenses) / state.budget).toFixed(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar 
          value={percentage}  // Valor a graficar (hasta 100)
          styles={buildStyles({
            pathColor: percentage === 100 ? "#DC2626" : "#3b82f6",  // Color de la barra de la grafica
            trailColor: "#F5F5F5",  // Color de la parte vacia de la grafica
            textSize: 8,  // Tamaño del texto de la grafica
            textColor: percentage === 100 ? "#DC2626" : "#3b82f6"  // Color del texto de la grafica
          })}
          text={`${percentage}% Gastado`}  // Texto de la grafica
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({type: "reset-app"})}
        >
          Resetear App
        </button>

        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay 
          label="Disponible"
          amount={remainingBudget}
        />

        <AmountDisplay 
          label="Gastado"
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}

export default BudgetTracker