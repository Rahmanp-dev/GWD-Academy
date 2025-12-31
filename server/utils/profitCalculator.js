/**
 * GWD Academy - JV Profit Split Calculator
 * 
 * Logic:
 * 1. Gross Revenue = Course Price
 * 2. Deductions = Instructor Fee + Affiliate Comm + Platform Fee (2%)
 * 3. Net Profit = Gross - Deductions
 * 4. GWD Share = 50% of Net
 * 5. Partner Share = 50% of Net
 */

const PLATFORM_FEE_PERCENT = 0.02;

/**
 * Calculates the financial splits for a transaction.
 * 
 * @param {number} amountPaid - The total amount paid by the student (Gross Revenue)
 * @param {number} instructorFixedFee - Fixed fee agreed with instructor
 * @param {number} affiliateCommission - Commission for ambassador (default 0)
 * @returns {object} The calculated splits
 */
const calculateProfitSplits = (amountPaid, instructorFixedFee = 0, affiliateCommission = 0) => {
  const platformFee = amountPaid * PLATFORM_FEE_PERCENT;
  
  const totalDeductions = instructorFixedFee + affiliateCommission + platformFee;
  const netProfit = Math.max(0, amountPaid - totalDeductions); // Prevent negative profit

  const gwdShare = netProfit * 0.5;
  const partnerShare = netProfit * 0.5;

  return {
    grossRevenue: amountPaid,
    deductions: {
      instructorFee: instructorFixedFee,
      affiliateCommission,
      platformFee,
      total: totalDeductions
    },
    netProfit,
    splits: {
      gwdShare,
      partnerShare
    }
  };
};

module.exports = { calculateProfitSplits };
