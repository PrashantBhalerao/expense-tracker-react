import CurrencyConverter from "./CurrencyConverter";

function SummaryPanel({ expenses }) {

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  return (
    <>
      <div className="summary-panel">

        <div className="summary-card">
          <h2>Total Expenses</h2>
          <p>₹{totalExpense}</p>
        </div>

        <div className="summary-card">
          <h2>Total Entries</h2>
          <p>{expenses.length}</p>
        </div>

        <div className="summary-card categories">
          <h2>Category Breakdown</h2>

          {Object.keys(categoryTotals).length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            Object.entries(categoryTotals).map(([category, amount]) => (
              <div
                key={category}
                className="category-item"
              >
                <span>{category}</span>
                <span>₹{amount}</span>
              </div>
            ))
          )}
        </div>

      </div>

      <CurrencyConverter total={totalExpense} />
    </>
  );
}

export default SummaryPanel;