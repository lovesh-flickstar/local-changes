
export interface Transaction {
  id: string;
  date: string;
  description: string;
  time: string;
  status: "Success" | "Pending" | "Failed";
  amount: number;
  type: "deposit" | "withdrawal";
  transactionId?: string;
  debitedFrom?: string;
  creditedTo?: string;
}

export const TransactionDetail = ({ transaction }: { transaction: Transaction }) => (
  <div className="p-4 flex flex-col 2xl:gap-10 gap-4 text-white">
    <div className="flex flex-col gap-4 items-center">
    <p className="text-xl font-semibold fontSecondary mb-1">Transaction Details</p>
    <span className="text-white/70 text-lg">Total Amount</span>
    <span className={`text-3xl ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
          {transaction.type === 'deposit' ? '+' : '-'} ${transaction.amount.toFixed(2)}
    </span>
    <div className={`${transaction.status == "Success" ? "text-green-500":"text-red-500"} text-lg px-3 rounded-xl bg-[#2C2C2E]`}>● {transaction.status=="Success" ? "Success": "Failed"}</div>
    </div>

    {/* <div className={`${transaction.status == "Success" ? "border border-red-600 bg-red-900/50":"border border-green-600 bg-green-900/50 "} p-4 rounded-lg mb-4`}>
      <div className="mb-4">
        <div className="text-gray-400 text-sm">Debited From</div>
        <div>{transaction.debitedFrom || "N/A"}</div>
        <div className="text-gray-400 text-sm">{transaction.date} {transaction.time}</div>
      </div>
      <div>
        <div className="text-gray-400 text-sm">Credited To</div>
        <div>{transaction.creditedTo || "N/A"}</div>
        <div className="text-gray-400 text-sm">{transaction.date} {transaction.time}</div>
      </div>
    </div> */}
    <div className={`relative pl-10 py-4 pr-2  rounded-lg ${
  transaction.status === "Success" 
    ? "border border-green-500 bg-green-950/50" 
    : "border border-red-500 bg-red-950/50"
}`}>
  {/* Connecting line */}
  <div className={`absolute left-3.5 top-11 w-[1px] h-11 ${
    transaction.status === "Success" 
      ? "bg-green-500" 
      : "bg-red-500"
  }`}></div>

  {/* Debit Section */}
  <div className="relative mb-8 ">
    {/* Status Icon */}
    <div className="absolute left-[-34px] top-0">
      {transaction.status === "Success" ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#10B981"/>
          <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#EF4444"/>
          <path d="M15 9L9 15M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </div>
    <div className="flex flex-col fontPrimary">
        <div className="flex justify-between w-full">
            <div className="text-white text-xs xl:text-md">Debited From</div>
            <div className="text-gray-400 text-xs xl:text-sm mt-1">
                {transaction.date} 
            </div>
        </div>
        <div className="flex justify-between w-full">
            <div className="text-gray-400 text-xs xl:text-lg">{transaction.debitedFrom || "N/A"}</div>
            <div className="text-gray-400 text-xs xl:text-sm mt-1">
                {transaction.time}
            </div>
        </div>
    </div>
   
  </div>

  {/* Credit Section */}
  <div className="relative">
    {/* Status Icon */}
    <div className="absolute left-[-34px] top-0">
      {transaction.status === "Success" ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#10B981"/>
          <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="12" fill="#10B981"/>
          <path d="M7 12L10.5 15.5L17 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </div>
    <div className="flex flex-col fontPrimary">
        <div className="flex justify-between w-full">
            <div className="text-white text-xs xl:text-md">Credited To</div>
            <div className="text-gray-400 text-xs xl:text-sm mt-1">
            {transaction.date}
            </div>
        </div>
        <div className="flex justify-between w-full">
            <div className="text-gray-400 text-xs xl:text-lg">{transaction.creditedTo || "N/A"}</div>
            <div className="text-gray-400 text-xs xl:text-sm mt-1">
                {transaction.time}
            </div>
        </div>
    </div>
  </div>
</div>
<div className="flex flex-col gap-2">
      <p className="fontPrimary">Transfer Details</p>
    <div className="bg-[#2C2C2E] p-4 rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Transaction ID</span>
        <span>{transaction.transactionId}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Date and Time</span>
        <span>{transaction.date} {transaction.time}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Status</span>
        <span className="text-green-500">{transaction.status}</span>
      </div>
    </div>
    </div>
  </div>
);