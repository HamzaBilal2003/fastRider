import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Copy } from 'lucide-react';
import { Transaction } from '../../../queries/transaction/transaction';
import { formatAmount, formatCreatedAt } from '../../../constants/help';
import { toast } from 'react-toastify';


interface TransactionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ isOpen, onClose, transaction }) => {
    if (!isOpen) return null;

    // Dynamic Status Styling
    const statusDetails = {
        completed: {
            color: "text-green-600",
            bg: "bg-green-200",
            icon: <CheckCircle size={50} className="text-green-600" />,
            text: "Payment Successful"
        },
        failed: {
            color: "text-red-600",
            bg: "bg-red-200",
            icon: <XCircle size={50} className="text-red-600" />,
            text: "Payment Failed"
        },
        pending: {
            color: "text-yellow-600",
            bg: "bg-yellow-200",
            icon: <AlertTriangle size={50} className="text-yellow-600" />,
            text: "Payment Pending"
        }
    };

    const { color, bg, icon, text } = statusDetails[transaction.status];

    return (
        <div className="fixed inset-0 bg-[#0000004b] bg-opacity-50 flex items-start justify-end p-6 z-[1000]">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Transaction Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                {/* Status Section */}
                <div className="flex flex-col items-center my-4">
                    <div className={`${bg} rounded-full  p-4`}>{icon}</div>
                    <p className={`${color} font-semibold text-lg mt-2`}>{text}</p>
                </div>

                {/* Transaction Info */}
                <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="font-semibold">Txn ID</span>
                        <span className="flex items-center gap-2">
                            {'transaction_'+ transaction.id}
                            <button 
                                onClick={() => {navigator.clipboard.writeText(String(transaction.id));toast.success('Copied to clipboard!')}}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Copy size={16} />
                            </button>
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold">Txn Type</span>
                        <span>{transaction.transaction_type}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-semibold">Amount</span>
                        <span>N{formatAmount(transaction.amount)}</span>
                    </div>

                    {/* <div className="flex justify-between">
                        <span className="font-semibold">Service</span>
                        <span>{transaction. || 'N/A'}</span>
                    </div> */}

                    <div className="flex justify-between">
                        <span className="font-semibold">Txn Date/Time</span>
                        <span>{formatCreatedAt(transaction.created_at)}</span>
                    </div>
                </div>

                {/* Payment Account Details (Only for Failed/Pending) */}
                {(transaction.status === "failed" || transaction.status === "pending") && (
                    <div className="border rounded-lg p-4 space-y-3 mt-4">
                        <h3 className="font-semibold">Payment Account</h3>
                        <div className="flex justify-between">
                            <span className="font-semibold">Bank Name</span>
                            <span>{transaction.bankName || "N/A"}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold">Account Name</span>
                            <span>{transaction.accountName || "N/A"}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="font-semibold">Account Number</span>
                            <span className="flex items-center gap-2">
                                {transaction.accountNumber || "N/A"}
                                {transaction.accountNumber && (
                                    <button 
                                        onClick={() => navigator.clipboard.writeText('aksjdj212d')}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <Copy size={16} />
                                    </button>
                                )}
                            </span>
                        </div>
                    </div>
                )}

                {/* Close Button */}
                {/* <div className="mt-6 flex justify-center">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                    >
                        Close
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default TransactionDetailsModal;
