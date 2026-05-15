import { useEffect, useState } from "react";
import "./App.css";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryPanel from "./components/SummaryPanel";

function App() {

  const [expenses, setExpenses] = useState(() => {

    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );

  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {

    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);
  };

  const clearAllExpenses = () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete all expenses?"
    );

    if (confirmDelete) {
      setExpenses([]);
    }
  };

  return (
    <div className="container">

      <h1 className="heading">
        Expense Tracker
      </h1>

      <ExpenseForm addExpense={addExpense} />

      <SummaryPanel expenses={expenses} />

      {
        expenses.length > 0 && (
          <button
            className="clear-btn"
            onClick={clearAllExpenses}
          >
            Clear All Expenses
          </button>
        )
      }

      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
      />

    </div>
  );
}

export default App;