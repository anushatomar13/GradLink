import React, { useState } from 'react';
import { Heart, School, Trophy, Users, Check, Download, Share2, X } from 'lucide-react';
import { jsPDF } from 'jspdf';

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];
 
  const colleges = [
    { id: 'iit-bombay', name: 'Indian Institute of Technology (IIT) Bombay' },
    { id: 'iit-delhi', name: 'Indian Institute of Technology (IIT) Delhi' },
    { id: 'iit-kanpur', name: 'Indian Institute of Technology (IIT) Kanpur' },
    { id: 'iit-kharagpur', name: 'Indian Institute of Technology (IIT) Kharagpur' },
    { id: 'rgipt', name: 'Rajiv Gandhi Institute of Petroleum Technology' },
    { id: 'iit-madras', name: 'Indian Institute of Technology (IIT) Madras' },
    { id: 'iit-roorkee', name: 'Indian Institute of Technology (IIT) Roorkee' },
    { id: 'iisc-bangalore', name: 'Indian Institute of Science (IISc) Bangalore' },
    { id: 'jnu-delhi', name: 'Jawaharlal Nehru University (JNU), New Delhi' },
    { id: 'du-delhi', name: 'University of Delhi (DU), New Delhi' },
    { id: 'iim-ahmedabad', name: 'Indian Institute of Management (IIM) Ahmedabad' },
    { id: 'iim-bangalore', name: 'Indian Institute of Management (IIM) Bangalore' },
    { id: 'iim-calcutta', name: 'Indian Institute of Management (IIM) Calcutta' },
    { id: 'bits-pilani', name: 'BITS Pilani (Birla Institute of Technology and Science)' },
    { id: 'vit-vellore', name: 'VIT University, Vellore' },
    { id: 'mahe-manipal', name: 'Manipal Academy of Higher Education (MAHE), Manipal' }
  ];
  
  const funds = [
    {
      id: 'scholarship',
      title: 'Scholarship Fund',
      description: 'Support future students with financial aid',
      icon: <School className="w-6 h-6 text-indigo-400" />,
      raised: 75000,
      goal: 100000
    },
    {
      id: 'research',
      title: 'Research & Innovation',
      description: 'Advance cutting-edge research projects',
      icon: <Trophy className="w-6 h-6 text-purple-400" />,
      raised: 120000,
      goal: 150000
    },
    {
      id: 'infrastructure',
      title: 'Campus Development',
      description: 'Improve facilities and infrastructure',
      icon: <Users className="w-6 h-6 text-pink-400" />,
      raised: 200000,
      goal: 500000
    }
  ];

  const resetForm = () => {
    setAmount('');
    setSelectedFund('');
    setSelectedCollege('');
    setShowPaymentDialog(false);
    setShowSuccess(false);
    setIsProcessing(false);
    setPaymentId('');
    setTransactionDate('');
  };

  const handlePayment = () => {
    if (!amount || !selectedFund || !selectedCollege) {
      alert('Please select an amount, fund, and college before proceeding.');
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }
    setShowPaymentDialog(true);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Donation Receipt', 20, 10);
    doc.text(`Transaction ID: ${paymentId}`, 20, 20);
    doc.text(`Amount: ₹${Number(amount).toLocaleString()}`, 20, 30);
    doc.text(`Date & Time: ${transactionDate}`, 20, 40);
    doc.text(`Institution: ${colleges.find(c => c.id === selectedCollege)?.name}`, 20, 50);
    doc.text(`Fund: ${funds.find(f => f.id === selectedFund)?.title}`, 20, 60);
    doc.save(`donation_receipt_${paymentId}.pdf`);
  };

  const handleShare = () => {
    const shareData = {
      title: 'Donation Confirmation',
      text: `I donated ₹${Number(amount).toLocaleString()} to ${funds.find(f => f.id === selectedFund)?.title} for ${colleges.find(c => c.id === selectedCollege)?.name}. Transaction ID: ${paymentId}`,
      url: window.location.href, // Use the current page URL or a specific link
    };
  
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Donation shared successfully'))
        .catch(error => console.error('Error sharing', error));
    } else {
      alert('Sharing is not supported on this browser/device');
    }
  };

  const processDemoPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedPaymentId = 'DEMO_' + Math.random().toString(36).substr(2, 9);
      const currentDate = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setPaymentId(generatedPaymentId);
      setTransactionDate(currentDate);
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      <div className="text-gray-300 text-center space-y-2">
        <p className="font-semibold">Processing Payment</p>
        <p className="text-sm text-gray-400">Please do not close this window...</p>
      </div>
    </div>
  );
  
  const SuccessReceipt = ({ onClose }) => (
    <div className="flex flex-col items-center justify-center space-y-6 max-w-md w-full mx-auto relative">
      <button
        onClick={onClose}
        className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 hover:bg-slate-600 
                 rounded-full flex items-center justify-center text-gray-200
                 transition-colors duration-200 z-10"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center animate-bounce mb-2">
        <Check className="w-8 h-8 text-white" />
      </div>
      
      <div className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg p-4 space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="text-center space-y-2 pb-4 border-b border-purple-500/20">
          <h3 className="text-xl font-bold text-purple-500">Payment Successful!</h3>
          <p className="text-gray-400">Thank you for your generous donation</p>
        </div>
  
        <div className="overflow-y-auto space-y-4">
          <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
            <p className="text-xs text-gray-400">Transaction ID</p>
            <p className="text-lg text-gray-200 font-mono">{paymentId}</p>
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-xs text-gray-400">Amount</p>
              <p className="text-lg text-gray-200">₹{Number(amount).toLocaleString()}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg">
              <p className="text-xs text-gray-400">Date & Time</p>
              <p className="text-lg text-gray-200">{transactionDate}</p>
            </div>
          </div>
  
          <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
            <p className="text-xs text-gray-400">Institution</p>
            <p className="text-lg text-gray-200">{colleges.find(c => c.id === selectedCollege)?.name}</p>
          </div>
  
          <div className="bg-slate-800/50 p-4 rounded-lg space-y-2">
            <p className="text-xs text-gray-400">Fund</p>
            <p className="text-lg text-gray-200">{funds.find(f => f.id === selectedFund)?.title}</p>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 py-2 px-4 
                     bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-200
                     transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center space-x-2 py-2 px-4
                     bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-200
                     transition-colors duration-200"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
  
        <p className="text-xs text-gray-400 text-center">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
            Empower Future Generations
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your contribution powers the next generation of innovation and excellence.
            Every donation creates ripples of change in our academic ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/90 border border-purple-500/20 shadow-xl rounded-lg p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Make a Donation
              </h2>
              <p className="text-gray-400 mt-1">
                Choose your college, amount and fund to support
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-300">Select College</label>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full p-2 bg-slate-700/50 border border-purple-500/20 
                           focus:border-purple-500/50 rounded-lg text-white 
                           focus:ring-2 focus:ring-purple-500/20"
                >
                  <option value="">Select a college...</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-300">Select Amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {predefinedAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset.toString())}
                      className={`p-2 ${
                        amount === preset.toString()
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'border border-purple-500/20 hover:border-purple-500/50 text-gray-300'
                      } rounded-lg transition-all duration-200 hover:shadow-lg`}
                    >
                      ₹{preset}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Custom Amount (₹)"
                  className="w-full p-2 bg-slate-700/50 border border-purple-500/20 
                           focus:border-purple-500/50 rounded-lg text-white 
                           placeholder-gray-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-300">Select Fund</label>
                <div className="space-y-2">
                  {funds.map((fund) => (
                    <button
                      key={fund.id}
                      onClick={() => setSelectedFund(fund.id)}
                      className={`w-full p-4 rounded-lg flex items-center space-x-4
                                ${
                                  selectedFund === fund.id
                                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500'
                                    : 'border border-purple-500/20 hover:border-purple-500/50'
                                } transition-all duration-200`}
                    >
                      {fund.icon}
                      <div className="flex-1 text-left">
                        <div className="text-gray-200">{fund.title}</div>
                        <div className="text-sm text-gray-400">{fund.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!amount || !selectedFund || !selectedCollege}
                className="w-full py-3 rounded-lg font-semibold
                         bg-gradient-to-r from-purple-500 to-pink-500 text-white
                         hover:from-purple-600 hover:to-pink-600
                         transition-all duration-200 shadow-lg
                         hover:shadow-purple-500/25
                         flex items-center justify-center space-x-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Heart className="w-5 h-5" />
                <span>Complete Donation</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {funds.map((fund) => (
              <div key={fund.id} className="bg-slate-800/90 border border-purple-500/20 shadow-xl rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  {fund.icon}
                  <div className="flex-1">
                    <h3 className="text-gray-200">{fund.title}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{
                            width: `${(fund.raised / fund.goal) * 100}%`
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>₹{fund.raised.toLocaleString()} raised</span>
                        <span>Goal: ₹{fund.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPaymentDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 border border-purple-500/20 rounded-lg p-6 max-w-md w-full relative">
            {!isProcessing && !showSuccess && (
              <button
                onClick={() => setShowPaymentDialog(false)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 hover:bg-slate-600 
                         rounded-full flex items-center justify-center text-gray-200
                         transition-colors duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            
            {isProcessing ? (
              <LoadingSpinner />
            ) : showSuccess ? (
              <SuccessReceipt onClose={resetForm} />
            ) : (
              <>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                  Complete Your Donation
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>Amount: ₹{amount}</p>
                  <p>College: {colleges.find(c => c.id === selectedCollege)?.name}</p>
                  <p>Fund: {funds.find(f => f.id === selectedFund)?.title}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <button
                    onClick={processDemoPayment}
                    className="w-full py-3 rounded-lg font-semibold
                           bg-gradient-to-r from-purple-500 to-pink-500 text-white
                           hover:from-purple-600 hover:to-pink-600
                           transition-all duration-200 shadow-lg
                           hover:shadow-purple-500/25
                           flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Confirm Donation</span>
                  </button>
                  <button
                    onClick={() => setShowPaymentDialog(false)}
                    className="w-full py-3 rounded-lg font-semibold
                           border border-purple-500/20 text-gray-300
                           hover:border-purple-500/50
                           transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
        </div>
    );
};                    
export default DonationPage;