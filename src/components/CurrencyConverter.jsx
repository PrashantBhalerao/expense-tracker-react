import { useEffect, useState } from "react";

function CurrencyConverter({ total }) {

  const [currency, setCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchCurrency = async () => {

      try {

        setLoading(true);
        setError("");

        // If INR selected
        if (currency === "INR") {
          setConvertedAmount(total.toFixed(2));
          setLoading(false);
          return;
        }

        // NEW API
        const response = await fetch(
          `https://open.er-api.com/v6/latest/INR`
        );

        const data = await response.json();

        if (data.result !== "success") {
          throw new Error("API Error");
        }

        const rate = data.rates[currency];

        const converted = total * rate;

        setConvertedAmount(
          converted.toFixed(2)
        );

      } catch (err) {

        setError(
          "Failed to fetch exchange rates"
        );

      } finally {

        setLoading(false);

      }
    };

    fetchCurrency();

  }, [currency, total]);

  return (
    <div className="currency-converter">

      <h2>Currency Converter</h2>

      <select
        value={currency}
        onChange={(e) =>
          setCurrency(e.target.value)
        }
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="INR">INR</option>
      </select>

      {loading && (
        <p>Loading exchange rates...</p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <h3>
          Converted Total:
          {" "}
          {currency}
          {" "}
          {convertedAmount}
        </h3>
      )}

    </div>
  );
}

export default CurrencyConverter;