import { transactions } from "../../constants/Transaction";
import { TdesignAdjustment } from "../icons/AdjustIcon";
import { Transaction } from "./TransactionDetail";

export const TransactionLog = ({ onSelect }: { onSelect: (tx: Transaction) => void }) => {
   
  
    return (
      <div className="mt-6">
        <div className="flex justify-between w-full mb-4">
          <div className="flex flex-col">
            <p className="text-white text-lg font-semibold fontPrimary">Transaction History</p>
            <p className="fontPrimary text-sm text-white/70">28 Oct 2024</p>
          </div>
        
          <button className="my-auto p-1.5 rounded-full bg-[#525254]"><TdesignAdjustment width={20} height={20} className="text-white"/></button>
        </div>
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-380px)] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelect(tx)}
              className="p-3 bg-[#2C2C2E] rounded-lg hover:bg-[#3A3A3C] transition-colors cursor-pointer overflow-y-auto h-auto"
            >
              <div className="flex flex-col w-full fontPrimary">
                <div className="flex justify-between w-full">
                    <p className="text-white font-medium fontPrimary">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.time}</p>
                </div>
                <div className="flex justify-between w-full">              
                  <p className={`text-sm ${tx.status == 'Failed' ? "text-red-500":"text-green-500"}`}>{tx.status}</p>
                  <p className={`text-lg ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                </div>
                <p className="text-white/70 text-xs">{tx.creditedTo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };