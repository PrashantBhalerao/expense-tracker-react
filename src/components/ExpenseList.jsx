import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div className="expense-list">
      {expenses.length === 0 ? (
        <p className="empty-message">
          No expenses added yet
        </p>
      ) : (
        expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseList;