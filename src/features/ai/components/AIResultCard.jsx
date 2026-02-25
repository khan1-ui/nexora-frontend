const AIResultCard = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-lg border">

      <p><strong>Client:</strong> {data.clientName}</p>
      <p><strong>Invoice #:</strong> {data.invoiceNumber}</p>
      <p><strong>Total:</strong> ${data.totalAmount}</p>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">
          Items
        </h4>

        {data.items.map((item, i) => (
          <div key={i} className="text-sm">
            {item.description} - {item.quantity} x ${item.price}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIResultCard;