function ExpenseCard({ expense, deleteExpense }) {
  return (
    <div className="expense-card">

      <div>
        <h3>{expense.title}</h3>

        <p>{expense.category}</p>

        <small className="expense-date">
          {expense.date}
        </small>
      </div>

      <div className="expense-right">

        <h2>₹{expense.amount}</h2>

        <button
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ExpenseCard;