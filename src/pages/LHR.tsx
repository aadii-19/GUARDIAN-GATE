import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExpandableCard from "@/components/ExpandableCards";
import { motion } from "framer-motion";
import ModalWindow from "@/components/ModalWindow"; 

export default function LegalHelp() {
  const [activeSection, setActiveSection] = useState<"women" | "children">("women");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("Domestic Violence & Protection Laws");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const openModalWithContent = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className={`max-w-7xl mx-auto px-6 py-12 flex flex-col items-center transition-all duration-700 ease-in-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
  {/* Centered Heading with Border */}
  <div className="inline-block border-0 px-6 py-2 rounded-md bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
  <h1 className="text-5xl font-bold text-gray-800 transition-colors duration-500 hover:text-red-600 text-center">
    Legal Help & Resources
  </h1>
</div>


  {/* Informational Content */}
  <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-5xl">
    <p className="text-lg text-gray-700 text-center leading-relaxed">
      Knowing your legal rights is the first step towards protection and empowerment.  
      This section provides **essential legal resources** to help women and children understand  
      the laws that safeguard them, where to seek help, and how to take action in critical situations.  
    </p>

    {/* Grid Content */}
  </div>

  {/* Buttons Section with Proper Bottom Padding */}
  <div className="flex justify-center space-x-6 mt-8 pb-12">
    <Button
      className={`px-6 py-3 rounded-lg shadow-lg border-2 transition-all duration-300 ease-in-out transform hover:scale-110 hover:border-red-700 focus:outline-none ${
        activeSection === "women" ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600"
      } text-white hover:bg-red-400`}
      onClick={() => setActiveSection("women")}
    >
      Women's Rights & Resources
    </Button>
    <Button
      className={`px-6 py-3 rounded-lg shadow-lg border-2 transition-all duration-300 ease-in-out transform hover:scale-110 hover:border-red-700 focus:outline-none ${
        activeSection === "children" ? "bg-red-600 border-red-700" : "bg-red-500 border-red-600"
      } text-white hover:bg-red-400`}
      onClick={() => setActiveSection("children")}
    >
      Children's Rights & Resources
    </Button>
  </div>


  
  
      {/* Women's Rights Section */}
      {activeSection === "women" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 border-t-4 border-red-500 pt-8 bg-gray-100 shadow-md rounded-lg p-8"
        >
          <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
            Women's Rights and Legal Protections
          </h2>

          {/* Filter Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center mb-6">
            {[
              "Domestic Violence & Protection Laws",
              "How to Take Legal Action",
              "Workplace Harassment & Legal Safeguards",
              "Property & Inheritance Rights",
              "Cyber Harassment & Online Safety",
              "Maternity & Reproductive Rights",
              "Divorce, Alimony & Maintenance Rights",
              "Emergency Helplines & Legal Aid Services",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  let content = null;
                  if (topic === "Domestic Violence & Protection Laws") {
                    content = (
                      <>
                        <ExpandableCard
  title="⚖️ Domestic Violence & Protection Laws"
  description="A comprehensive guide to legal protections available for women facing domestic violence."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Domestic violence is a critical issue affecting women worldwide. The <strong>Protection of Women from Domestic Violence Act, 2005</strong> ensures legal safeguards against physical, emotional, sexual, and economic abuse. This law grants victims access to protection orders, residence rights, financial support, and child custody.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📜 Legal Avenues for Protection:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📝 Filing a Complaint:</strong> Report abuse at the nearest police station, Women’s Cells, or online legal portals. FIRs must be registered immediately.</li>
          <li><strong>🛑 Protection Orders:</strong> Courts can issue restraining orders to prevent abuser contact.</li>
          <li><strong>🏠 Residence Rights:</strong> A woman cannot be evicted from her marital home, regardless of ownership.</li>
          <li><strong>💰 Financial Support:</strong> Victims can claim maintenance from spouses.</li>
          <li><strong>🤝 Legal & Emotional Support:</strong> NGOs, Protection Officers, and legal aid services offer guidance.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Key Laws for Protection:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>The Protection of Women from Domestic Violence Act, 2005:</strong> Provides immediate legal remedies.</li>
          <li><strong>The Dowry Prohibition Act, 1961:</strong> Criminalizes dowry transactions with imprisonment up to five years.</li>
          <li><strong>Section 498A of IPC:</strong> Penalizes cruelty by a husband or relatives with up to three years in prison.</li>
          <li><strong>The Criminal Law (Amendment) Act, 2013:</strong> Strengthens laws against sexual harassment and acid attacks.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 How to Seek Help:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
  <ul className="list-disc pl-5 text-gray-800">
    <li><strong>📲 Women’s Helpline:</strong> Dial <strong>181</strong> for assistance.</li>
    <li><strong>🚔 Police Helpline:</strong> Call <strong>100</strong> or <strong>1091</strong> for immediate action.</li>
    <li><strong>⚖️ NGOs & Legal Aid:</strong> Organizations like the <strong>National Commission for Women (NCW)</strong> provide free legal guidance.</li>
    <li><strong>🌐 Online Reporting:</strong> File complaints via the <a href="https://www.ncw.gov.in/" className="text-red-700 underline">NCW portal</a> or state police websites.</li>
  </ul>
</div>

{/* Ladder-Style Steps for Registering a Complaint */}
<div className="flex flex-col items-center mt-6">
  <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to Register a Complaint on NCW Portal</h2>
  <div className="relative w-full max-w-md">
    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>

    {/* Step 1 */}
    <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
      <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
      <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
        <h4 className="text-lg font-semibold text-red-800 flex items-center">🌐 Visit the NCW Website</h4>
        <p className="text-gray-700">Go to the <a href="https://www.ncw.gov.in/" target="_blank" rel="noopener noreferrer" className="text-red-700 font-semibold underline">NCW Online Complaint Portal</a>. Make sure you have stable internet access.</p>
        <a href="https://www.ncw.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🚨 Report Now</a>
      </div>
    </div>

    {/* Steps 2-8 */}
    {[...Array(7)].map((_, index) => (
      <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
        <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
        <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
          <p className="text-gray-800 font-medium"><strong>{["Click on ‘Register Complaint’:", "Fill in Your Personal Details:", "Describe the Incident Clearly:", "Attach Supporting Documents:", "Submit the Complaint:", "Track Your Complaint Status:", "Seek Additional Help if Needed:"][index]}</strong></p>
          <p className="text-gray-700">{["On the homepage, look for the ‘File a Complaint’ or ‘Register Complaint’ button. Click on it to proceed to the complaint form.", "Enter your name, contact details (email & phone number), and address. Ensure all details are accurate for proper communication.", "Provide a detailed account of what happened, including dates, locations, and names of the accused. Mention any previous actions taken (police reports, complaints filed earlier, etc.).", "If you have evidence (photos, medical reports, police reports, legal notices), upload them. Supporting documents help strengthen your case.", "Double-check all the details before clicking the Submit button. Once submitted, you will receive a Complaint Reference Number – note this down for tracking.", "Use the Track Complaint feature on the website. Enter your complaint reference number to check the progress of your case.", "If you don't receive a response in time, contact the NCW helpline (181) or visit their office for follow-up action."][index]}</p>
        </div>
      </div>
    ))}
  </div>

  <p className="mt-4 text-gray-800 font-medium">📢 <strong>Reminder:</strong> Victims should document evidence, seek support from trusted individuals, and never hesitate to approach legal authorities. The legal system has multiple safeguards to protect women and ensure justice.</p>
</div>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "How to Take Legal Action") {
                    content = (
                      <>
                        <ExpandableCard
  title="📜 How to Take Legal Action"
  description="Step-by-step guide to reporting abuse, seeking legal aid, and obtaining justice."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Understanding your rights and taking legal action can ensure justice is served. Follow these steps to file complaints, seek legal support, and navigate the legal system effectively.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Legal Steps to Take:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>File an FIR:</strong> Visit the nearest police station and report the incident formally.</li>
          <li><strong>Seek Legal Aid:</strong> Contact the National Legal Services Authority (NALSA) for free legal assistance.</li>
          <li><strong>Consult a Lawyer:</strong> A legal professional can guide you through court procedures and case filing.</li>
          <li><strong>Follow Court Proceedings:</strong> Attend hearings and comply with legal directives for case resolution.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Where to Seek Help:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📲 Women’s Helpline:</strong> Dial <strong>181</strong> for assistance.</li>
          <li><strong>🚔 Police Helpline:</strong> Call <strong>100</strong> or <strong>1091</strong> for immediate support.</li>
          <li><strong>⚖️ Legal Aid:</strong> Reach out to <a href="https://nalsa.gov.in/" className="text-red-700 underline" target="_blank" rel="noopener noreferrer">NALSA</a> for free legal guidance.</li>
        </ul>
      </div>
      
      {/* Ladder-Style Steps for Taking Legal Action */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to Take Legal Action</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          {/* Step 1 */}
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800">📞 Contact an Emergency Helpline</h4>
              <p className="text-gray-700">Call 1091 (Women’s Helpline) or 100 (Police) for immediate support and safety.</p>
              <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get Legal Help</a>
            </div>
          </div>
          
          {/* Steps 2-5 */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["File an FIR or Complaint:", "Seek Legal Aid from NALSA:", "Consult a Lawyer:", "Attend Court Hearings & Follow Legal Advice:"][index]}</strong></p>
                <p className="text-gray-700">{["Go to the nearest police station to file an FIR detailing your case.", "Reach out to NALSA for free legal assistance and guidance.", "Consult an advocate to understand your legal options and case strength.", "Follow legal procedures, attend hearings, and comply with court decisions."][index]}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-4 text-gray-800 font-medium">📢 <strong>Reminder:</strong> Victims should document incidents, collect evidence, and report promptly. Legal protections exist to ensure justice and safety.</p>
      </div>
    </div>
  }
/>
                      </>
                    );
                  } else if (topic === "Workplace Harassment & Legal Safeguards") {
                    content = (
                      <>
                        <ExpandableCard
  title="🏢 Workplace Harassment & Legal Safeguards"
  description="Learn about the POSH Act and workplace safety measures."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Prevention of Sexual Harassment (POSH) Act, 2013</strong> mandates that all workplaces with 10 or more employees must have an <strong>Internal Complaints Committee (ICC)</strong> to handle harassment cases. Complaints must be addressed within 90 days, and strict penalties apply for non-compliance. Women can seek protection against retaliation, and employers must conduct awareness training. Organizations must implement policies ensuring a safe working environment. External agencies, such as the <strong>Local Complaints Committee (LCC)</strong>, assist women working in informal sectors.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📜 Legal Protections & Key Laws:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>The POSH Act, 2013:</strong> Defines workplace harassment and mandates ICC formation.</li>
          <li><strong>Indian Penal Code (IPC) Section 354A:</strong> Punishes sexual harassment with imprisonment up to three years.</li>
          <li><strong>Article 14 & 15 of the Constitution:</strong> Guarantees gender equality and prohibits discrimination.</li>
          <li><strong>Equal Remuneration Act, 1976:</strong> Ensures equal pay for men and women in the workplace.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Filing a Workplace Harassment Complaint:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📩 Report to ICC:</strong> File a written complaint with your company's ICC within three months of the incident.</li>
          <li><strong>🔍 Investigation Process:</strong> ICC must conduct a confidential inquiry and resolve cases within 90 days.</li>
          <li><strong>🚀 Escalation:</strong> If unsatisfied, appeal to the local labor department or the Local Complaints Committee.</li>
          <li><strong>📞 External Complaints:</strong> Women can directly report cases via the <strong>SHe-Box</strong> portal.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 How to Seek Help:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📲 Women’s Helpline:</strong> Dial <strong>181</strong> for assistance.</li>
          <li><strong>🚔 Police Helpline:</strong> Call <strong>100</strong> or <strong>1091</strong> for immediate action.</li>
          <li><strong>⚖️ Legal Aid:</strong> Contact the <strong>National Commission for Women (NCW)</strong> for free legal guidance.</li>
          <li><strong>🌐 Online Reporting:</strong> File complaints via the <a href="https://shebox.nic.in/" className="text-red-700 underline">SHe-Box portal</a> or state labor offices.</li>
        </ul>
      </div>
      
      {/* Ladder-Style Steps for Registering a Complaint on SHe-Box */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to Register a Complaint on SHe-Box</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
      
          {/* Step 1 */}
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">🌐 Visit the SHe-Box Website</h4>
              <p className="text-gray-700">Go to the <a href="https://shebox.nic.in/" target="_blank" rel="noopener noreferrer" className="text-red-700 font-semibold underline">SHe-Box Online Complaint Portal</a>. Ensure you have stable internet access.</p>
              <a href="https://shebox.nic.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🚨 Report Now</a>
            </div>
          </div>
      
          {/* Steps 2-7 */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Click on ‘Register Complaint’:", "Fill in Your Personal Details:", "Describe the Incident Clearly:", "Attach Supporting Documents:", "Submit the Complaint:", "Track Your Complaint Status:"][index]}</strong></p>
                <p className="text-gray-700">{["On the homepage, find the ‘File a Complaint’ button and click to proceed.", "Enter your name, contact details, and employment information accurately.", "Provide a clear account of the incident, including dates, witnesses, and locations.", "Upload any supporting evidence (emails, messages, CCTV footage) to strengthen your case.", "Review your complaint and submit it. You will receive a Complaint Reference Number.", "Use the ‘Track Complaint’ feature with your reference number to monitor progress."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      
        <p className="mt-4 text-gray-800 font-medium">📢 <strong>Reminder:</strong> Women facing workplace harassment should document incidents, seek support from colleagues, and report promptly. Legal frameworks exist to ensure justice and workplace safety.</p>
      </div>
    </div>
  }
/>
                      </>
                    );
                  } else if (topic === "Property & Inheritance Rights") {
                     content = (
                      <>
                        <ExpandableCard
  title="🏠 Property & Inheritance Rights"
  description="Women's rights in inheritance, property ownership, and succession laws."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Under the <strong>Hindu Succession Act, 1956</strong>, daughters have equal rights in ancestral property, even if born before 2005. <strong>Muslim women</strong> inherit property under Sharia Law, where shares vary based on family structure. <strong>Christian and Parsi women</strong> inherit equally as per the <strong>Indian Succession Act, 1925</strong>. Married women can claim shared property in divorce proceedings. Women can also file for partition suits if denied rightful inheritance. Government schemes provide financial assistance for property registration under women’s names.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📜 Key Legal Provisions:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Hindu Succession Act, 1956:</strong> Grants daughters equal inheritance rights in ancestral property.</li>
          <li><strong>Muslim Personal Law (Sharia):</strong> Determines inheritance shares for Muslim women based on family structure.</li>
          <li><strong>Indian Succession Act, 1925:</strong> Ensures equal inheritance rights for Christian and Parsi women.</li>
          <li><strong>Married Women’s Property Act, 1874:</strong> Protects women’s right to own and manage property independently.</li>
          <li><strong>Benami Transactions (Prohibition) Act, 1988:</strong> Prevents fraudulent property transfers and protects rightful ownership.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ How Women Can Claim Property Rights:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📝 Legal Documentation:</strong> Ensure proper property documents, including wills, partition deeds, and succession certificates.</li>
          <li><strong>⚖️ File a Partition Suit:</strong> Women can approach civil courts if denied inheritance rights.</li>
          <li><strong>🏠 Property Registration Benefits:</strong> Government schemes offer reduced stamp duty and financial aid for women property owners.</li>
          <li><strong>📞 Legal Assistance:</strong> Seek help from legal aid cells or women’s rights organizations.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Where to Seek Help:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📲 Women’s Helpline:</strong> Dial <strong>1091</strong> for property rights assistance.</li>
          <li><strong>⚖️ Legal Aid Services:</strong> Contact <strong>National Legal Services Authority (NALSA)</strong> for free legal support.</li>
          <li><strong>🏛️ Government Portals:</strong> Visit <a href="https://nalsa.gov.in/" className="text-red-700 underline">NALSA official website</a> for property dispute resolution.</li>
        </ul>
      </div>
      <div className="flex justify-center mt-6">
        <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition">Visit NALSA Website</a>
      </div>
      
      {/* Ladder-Style Steps for Claiming Property Rights */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to Claim Property Rights</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>

          {["Gather Property Documents:", "Verify Legal Heirship:", "Consult a Lawyer:", "File a Partition Suit:", "Attend Court Hearings:", "Obtain Legal Decree:", "Register Property in Your Name:"].map((step, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 1}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{step}</strong></p>
                <p className="text-gray-700">{[
                  "Collect important documents like property title deeds, wills, and legal heir certificates.",
                  "Apply for a legal heir certificate from local authorities to establish your inheritance rights.",
                  "Seek guidance from property law experts or free legal aid services.",
                  "If denied inheritance, file a partition suit in a civil court.",
                  "Attend hearings and present necessary documents to support your claim.",
                  "Once the court rules in your favor, obtain the legal decree confirming ownership.",
                  "Ensure the inherited property is officially transferred and registered under your name."
                ][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <p className="mt-4 text-gray-800 font-medium">📢 <strong>Reminder:</strong> Women should actively secure legal documents, understand their inheritance rights, and seek legal support if denied property claims.</p>
      
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Cyber Harassment & Online Safety") {
                     content = (
                      <>
                        <ExpandableCard
  title="💻 Cyber Harassment & Online Safety"
  description="Know your rights against cyberstalking, online abuse, and digital crimes."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Cyberstalking, identity theft, and online harassment are punishable under the <strong>Information Technology (IT) Act, 2000</strong> and the <strong>Indian Penal Code (IPC)</strong>. Offenders can face imprisonment and fines. Women can report cases via <strong>cybercrime.gov.in</strong>, the <strong>National Cyber Crime Helpline (1930)</strong>, or local cyber police stations. Social media platforms provide safety features like reporting, blocking, and privacy settings to prevent harassment. Courts can issue restraining orders against online abusers. Specialized cyber cells offer support for digital crime victims.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔍 Common Cyber Crimes Against Women:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Cyberstalking:</strong> Repeated online harassment, threats, or surveillance.</li>
          <li><strong>Identity Theft:</strong> Unauthorized use of personal information for fraud or harassment.</li>
          <li><strong>Morphing & Deepfakes:</strong> Altering images/videos without consent to defame or blackmail.</li>
          <li><strong>Revenge Porn:</strong> Sharing intimate content without consent.</li>
          <li><strong>Online Blackmail & Extortion:</strong> Threats demanding money or actions under coercion.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🛡️ Legal Provisions for Protection:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>IT Act, 2000 (Section 66C & 66E):</strong> Penalizes identity theft and privacy violations.</li>
          <li><strong>IPC Section 354D:</strong> Defines and punishes cyberstalking.</li>
          <li><strong>POSCO Act:</strong> Protects minors from online exploitation.</li>
          <li><strong>Indecent Representation of Women Act:</strong> Prevents digital circulation of obscene content.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Where to Report Cyber Crimes:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>📲 National Cyber Crime Helpline:</strong> Call <strong>1930</strong> to report digital crimes.</li>
          <li><strong>🌐 Online Complaint Portal:</strong> File a complaint at <a href="https://cybercrime.gov.in/" className="text-red-700 underline">Cyber Crime Portal</a>.</li>
          <li><strong>🏛️ Local Cyber Police:</strong> Visit your nearest cybercrime police station for assistance.</li>
        </ul>
      </div>
      
      {/* Ladder-Style Steps for Reporting Cyber Crimes */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to File a Cyber Crime Complaint</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          {/* Step 1 */}
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">🌐 Visit the Cyber Crime Portal</h4>
              <p className="text-gray-700">Go to the <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="text-red-700 font-semibold underline">Cyber Crime Online Complaint Portal</a>. Ensure a stable internet connection.</p>
              <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🚨 Report Now</a>
            </div>
          </div>

          {/* Steps 2-6 */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Click on ‘Report Cyber Crime’:", "Select the Crime Type:", "Fill in Personal & Incident Details:", "Upload Supporting Evidence:", "Submit & Track Your Complaint:"][index]}</strong></p>
                <p className="text-gray-700">{["On the homepage, click the ‘Report Cyber Crime’ button to proceed.", "Choose the relevant cybercrime category (stalking, fraud, identity theft, etc.).", "Provide accurate personal details and a clear description of the incident.", "If available, upload screenshots, emails, or chat records as evidence.", "Submit your complaint and use the portal’s tracking feature to check updates."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Maternity & Reproductive Rights") {
                     content = (
                      <>
                        <ExpandableCard
  title="🤰 Maternity & Reproductive Rights"
  description="Maternity leave, abortion rights, and reproductive health policies."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Maternity Benefit Act</strong> provides 26 weeks of paid leave for new mothers, extending to 12 weeks for mothers of adopted children. Pregnant women are entitled to free medical care in government hospitals. The <strong>Medical Termination of Pregnancy (MTP) Act</strong> ensures safe abortion services up to 24 weeks under specific conditions. Women have legal access to contraceptive services, and government schemes like <strong>Janani Suraksha Yojana</strong> support maternal healthcare. Workplace policies must accommodate pregnant employees without discrimination.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔍 Key Maternity & Reproductive Rights:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Paid Maternity Leave:</strong> 26 weeks for biological mothers, 12 weeks for adoptive and surrogate mothers.</li>
          <li><strong>Free Healthcare:</strong> Government hospitals provide free prenatal and postnatal care.</li>
          <li><strong>Abortion Rights:</strong> Safe abortion services up to 24 weeks under the MTP Act.</li>
          <li><strong>Contraceptive Access:</strong> Government programs ensure free or affordable contraceptives.</li>
          <li><strong>Workplace Protection:</strong> Employers must provide a safe and accommodating environment for pregnant women.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📜 Legal Provisions & Support:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Maternity Benefit Act, 1961:</strong> Ensures paid leave and job security for pregnant employees.</li>
          <li><strong>Medical Termination of Pregnancy (MTP) Act:</strong> Provides legal access to abortion under specified conditions.</li>
          <li><strong>Janani Suraksha Yojana (JSY):</strong> Government initiative for maternal healthcare support.</li>
          <li><strong>Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act:</strong> Prohibits gender-based abortion.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Where to Get Assistance:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>🏥 National Health Mission:</strong> Offers maternal healthcare schemes and financial aid.</li>
          <li><strong>💬 Women’s Helpline:</strong> Call <strong>181</strong> for support on maternity rights and workplace discrimination.</li>
          <li><strong>🌐 Online Resources:</strong> Visit <a href="https://nhm.gov.in/" className="text-red-700 underline">National Health Mission</a> for detailed information.</li>
        </ul>
      </div>
      
      {/* Ladder-Style Steps for Maternity & Reproductive Rights */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to Access Maternity & Reproductive Rights</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          {/* Step 1 */}
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">🏥 Register for Maternity Benefits</h4>
              <p className="text-gray-700">Visit your nearest government hospital or healthcare center to register for maternity schemes and prenatal checkups.</p>
              <a href="https://nhm.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Learn More</a>
            </div>
          </div>
          
          {/* Steps 2-6 */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Apply for Maternity Leave:", "Schedule Regular Health Checkups:", "Know Your Abortion Rights:", "Access Free Contraceptive Services:", "Report Workplace Discrimination:"][index]}</strong></p>
                <p className="text-gray-700">{["Inform your employer and submit the required medical documents to claim paid leave.", "Ensure regular prenatal and postnatal checkups for a healthy pregnancy.", "If needed, consult a government-approved doctor for legal abortion services.", "Visit health centers for free contraceptive guidance and services.", "If discriminated against at work due to pregnancy, report to labor authorities."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Divorce, Alimony & Maintenance Rights") {
                     content = (
                      <>
                        <ExpandableCard
  title="💔 Divorce, Alimony & Maintenance Rights"
  description="Understanding legal rights in divorce, financial support, and custody."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Women have the right to seek <strong>alimony, maintenance, and child support</strong> under laws like the <strong>Hindu Marriage Act</strong> and the <strong>Special Marriage Act</strong>. Courts consider factors like financial status, duration of marriage, and child custody in deciding maintenance. <strong>Muslim women</strong> can seek support under the <strong>Muslim Women (Protection of Rights on Divorce) Act</strong>. Fast-track courts expedite divorce proceedings in cases of domestic violence or cruelty.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔍 Key Divorce & Maintenance Rights:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Right to Alimony:</strong> Financial support based on the husband's income and marriage duration.</li>
          <li><strong>Child Custody & Support:</strong> Courts prioritize the child's well-being when deciding custody.</li>
          <li><strong>Protection from Domestic Abuse:</strong> Women can file for a fast-track divorce in cases of cruelty.</li>
          <li><strong>Property Rights:</strong> Women can claim their rightful share in joint assets.</li>
          <li><strong>Legal Aid:</strong> Free legal assistance is available for women unable to afford legal representation.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📜 Legal Provisions & Support:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Hindu Marriage Act, 1955:</strong> Covers divorce, alimony, and child custody.</li>
          <li><strong>Special Marriage Act, 1954:</strong> Governs interfaith marriages and divorce rights.</li>
          <li><strong>Muslim Women (Protection of Rights on Divorce) Act:</strong> Ensures financial security for Muslim women.</li>
          <li><strong>Protection of Women from Domestic Violence Act, 2005:</strong> Grants protection and legal remedies.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Where to Get Assistance:</h3>
      <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>🛡️ National Legal Services Authority (NALSA):</strong> Free legal aid for divorce and maintenance cases.</li>
          <li><strong>💬 Women’s Helpline:</strong> Call <strong>181</strong> for immediate support and legal counseling.</li>
          <li><strong>🌐 Online Resources:</strong> Visit <a href="https://nalsa.gov.in/" className="text-red-700 underline">NALSA</a> for legal assistance.</li>
        </ul>
      </div>
      
      {/* Ladder-Style Steps for Divorce & Maintenance Rights */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📝 Steps to Secure Divorce & Maintenance Rights</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          {/* Step 1 */}
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📜 Consult a Legal Expert</h4>
              <p className="text-gray-700">Seek advice from a lawyer or free legal aid services before proceeding with divorce or maintenance claims.</p>
              <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get Legal Aid</a>
            </div>
          </div>
          
          {/* Steps 2-6 */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["File a Divorce Petition:", "Seek Temporary Maintenance:", "Attend Court Hearings:", "Claim Custody & Child Support:", "Enforce Alimony & Maintenance Orders:"][index]}</strong></p>
                <p className="text-gray-700">{["Prepare necessary documents and file the divorce petition in family court.", "Request interim financial support while the case is ongoing.", "Participate in legal proceedings and mediation sessions.", "File for child custody and secure rightful financial support for children.", "Ensure compliance with court-ordered maintenance payments."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Emergency Helplines & Legal Aid Services") {
                    content = (
                      <>
                        <ExpandableCard
  title="📞 Emergency Helplines & Legal Aid Services"
  description="Important contact numbers and legal aid options for women in distress."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Women in distress can call helplines such as <strong>1091</strong> (Women’s Helpline), <strong>181</strong> (Women’s Emergency Helpline), and <strong>100</strong> (Police). The <strong>National Legal Services Authority (NALSA)</strong> provides free legal aid. NGOs like the <strong>National Commission for Women (NCW)</strong> assist in filing cases. Many states have dedicated one-stop crisis centers for survivors of violence. Online portals provide easy access to legal support and guidance.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Key Emergency Helplines:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1091 - Women's Helpline:</strong> For immediate safety assistance.</li>
          <li><strong>181 - Women’s Emergency Helpline:</strong> Support for domestic abuse and violence cases.</li>
          <li><strong>100 - Police:</strong> For reporting crimes and seeking urgent intervention.</li>
          <li><strong>1930 - Cyber Crime Helpline:</strong> To report digital harassment and cyber threats.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Legal Aid & Support:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>National Legal Services Authority (NALSA):</strong> Free legal aid for women in need.</li>
          <li><strong>National Commission for Women (NCW):</strong> Support for filing complaints and legal guidance.</li>
          <li><strong>One-Stop Crisis Centers:</strong> Available in various states for survivors of violence.</li>
          <li><strong>Legal Aid Clinics:</strong> Free consultation by government-appointed lawyers.</li>
        </ul>
      </div>
      
      {/* Ladder-Style Steps for Seeking Help */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">🚨 Steps to Get Help & Legal Aid</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          {/* Step 1 */}
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Call an Emergency Helpline</h4>
              <p className="text-gray-700">Contact 1091, 181, or 100 for immediate assistance and legal guidance.</p>
              <a href="https://nalsa.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get Legal Help</a>
            </div>
          </div>
          
          {/* Steps 2-5 */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Visit the Nearest Police Station:", "Seek Legal Aid from NALSA:", "File an FIR or Complaint:", "Access Online Support & NGOs:"][index]}</strong></p>
                <p className="text-gray-700">{["Report the issue directly to law enforcement and get protection.", "Contact NALSA for free legal assistance and case support.", "Formally lodge a complaint at a police station or with NCW.", "Use online portals for legal support and guidance."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  }
/>
                      </>
                    );
                  }
                  openModalWithContent(content);
                }}
                className={`px-4 py-2 rounded-lg border-2 text-gray-800 transition ${selectedTopic === topic ? "bg-red-500 text-white" : "bg-gray-200"}`}
              >
                {topic}
              </button>
            ))}
          </div>

        </motion.section>
      )}

      {/* Children's Rights Section */}
      {activeSection === "children" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 border-t-4 border-red-500 pt-8 bg-gray-100 shadow-md rounded-lg p-8"
        >
          <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">
            Children's Rights and Legal Protections
          </h2>

          {/* Filter Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center mb-6">
            {[
              "Child Abuse & Protection Laws",
              "Education Rights & RTE Act",
              "Juvenile Justice & Legal Aid",
              "Cyber Safety for Children",
              "Child Labor & Exploitation Laws",
              "Adoption & Guardianship Rights",
              "Healthcare & Nutrition Rights",
              "Emergency Helplines & Support Services",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  let content = null;
                  if (topic === "Child Abuse & Protection Laws") {
                    content = (
                      <>
                        <ExpandableCard
  title="⚖️ Child Abuse & Protection Laws"
  description="Understanding laws like POCSO Act and Child Protection Measures."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Protection of Children from Sexual Offences (POCSO) Act</strong> criminalizes child abuse and exploitation. Offenders face severe penalties, including life imprisonment. Children can report abuse to child helplines (<strong>1098</strong>) or police. Courts prioritize child-friendly procedures for handling cases.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Key Emergency Helplines:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1098 - Child Helpline:</strong> 24/7 support for children in distress.</li>
          <li><strong>100 - Police:</strong> To report abuse and seek immediate protection.</li>
          <li><strong>1091 - Women's Helpline:</strong> Assistance for child abuse cases involving women.</li>
          <li><strong>112 - Emergency Response:</strong> General emergency assistance.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Legal Aid & Support:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>National Commission for Protection of Child Rights (NCPCR):</strong> Legal aid and rights protection.</li>
          <li><strong>State Child Protection Units:</strong> Regional assistance and case support.</li>
          <li><strong>Juvenile Justice Boards:</strong> Legal oversight for child-related cases.</li>
          <li><strong>NGOs like Childline India:</strong> Free support for affected children.</li>
        </ul>
      </div>
      
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">🚨 Steps to Report Child Abuse</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Call an Emergency Helpline</h4>
              <p className="text-gray-700">Dial 1098 (Child Helpline) or 100 (Police) for immediate intervention.</p>
              <a href="https://ncpcr.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get Legal Help</a>
            </div>
          </div>
          
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Visit the Nearest Police Station:", "Seek Help from Child Welfare Committees:", "File a Complaint with NCPCR:", "Access Online Support & NGOs:"][index]}</strong></p>
                <p className="text-gray-700">{["Report the abuse directly to law enforcement.", "Contact Child Welfare Committees for legal guidance.", "Lodge a formal complaint with child protection agencies.", "Use online portals for legal and psychological support."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Content Below the Flowchart */}
      <h3 className="mt-6 text-xl font-semibold text-red-700">📚 Legal Framework & Child Protection Laws</h3>
      <p className="text-gray-700">Child protection laws, such as the POCSO Act, are designed to safeguard children from various forms of abuse, including sexual offenses, neglect, and exploitation. These laws also provide legal procedures for reporting and prosecuting offenders, ensuring that the rights of children are upheld and that justice is served. It's important for parents, guardians, and community members to understand these laws and how they can support children in distress.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🌍 International Conventions on Child Protection</h3>
      <p className="text-gray-700">In addition to domestic laws, India is also a signatory to international conventions such as the <strong>UN Convention on the Rights of the Child</strong> (CRC), which ensures the protection of children's rights globally. This includes the right to education, health, protection from exploitation, and a safe environment free from abuse.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 Importance of Reporting</h3>
      <p className="text-gray-700">Reporting abuse promptly is essential to ensure the safety and well-being of the child. Timely intervention by law enforcement, social workers, and legal bodies can prevent further harm and ensure that children receive the support they need. It is everyone's responsibility to protect children from harm and ensure they grow up in a safe environment.</p>
    </div>
  }
/>


                      </>
                    );
                  } else if (topic === "Education Rights & RTE Act") {
                    content = (
                      <>
                       <ExpandableCard
  title="📚 Education Rights & RTE Act"
  description="Understanding the Right to Education Act and free education policies."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Right to Education (RTE) Act</strong> guarantees free and compulsory education for children aged 6-14. Schools must not deny admission based on gender, caste, or disability. Government schemes provide financial aid, mid-day meals, and free textbooks to promote inclusive education.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Key Education Helplines:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>14417 - Child Helpline for Education:</strong> Support for school admissions and grievances.</li>
          <li><strong>1098 - Childline:</strong> Assistance for children facing barriers to education.</li>
          <li><strong>1800-11-8002 - NCPCR:</strong> Help for children denied education rights.</li>
          <li><strong>State Education Departments:</strong> Local helplines for education-related concerns.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Educational Rights & Support:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>RTE Act Implementation:</strong> Ensures free and compulsory education for all children aged 6-14.</li>
          <li><strong>Mid-Day Meal Scheme:</strong> Provides nutritious meals to encourage school attendance.</li>
          <li><strong>Scholarships & Financial Aid:</strong> Government schemes help children from low-income families.</li>
          <li><strong>Inclusive Education Initiatives:</strong> Support for children with disabilities and special needs.</li>
        </ul>
      </div>
      
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">🚸 Steps to Access Free Education</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Contact Local Education Authorities</h4>
              <p className="text-gray-700">Parents or guardians can contact the local education department or helpline (14417) for school admissions. They can inquire about available schemes and ensure their child is enrolled in a school.</p>
              <a href="https://ncpcr.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get RTE Support</a>
            </div>
          </div>
          
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Apply for RTE Admission:", "Check for Government Schemes:", "Report Denial of Admission:", "Seek Legal & NGO Support:"][index]}</strong></p>
                <p className="text-gray-700">{["Parents should apply under the RTE quota to ensure free education at nearby schools.", "Look into scholarships, free textbooks, and mid-day meal benefits for eligible students.", "If a school denies admission, file a complaint with the district education officer or NCPCR.", "Reach out to legal aid services and NGOs that help enforce children's education rights."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 shadow-md rounded-md">
        <h3 className="text-xl font-semibold text-red-700">📢 Importance of Education Rights</h3>
        <p className="text-gray-800 mt-2">Education is a fundamental right that empowers children, breaks the cycle of poverty, and builds a brighter future. Ensuring access to free education helps bridge social gaps and provides equal opportunities for all.</p>
        <p className="text-gray-800 mt-2">Government initiatives like the RTE Act, scholarships, and midday meal programs are crucial in promoting literacy and reducing dropout rates. By staying informed about these rights, parents and communities can work together to secure a better future for children.</p>
      </div>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Juvenile Justice & Legal Aid") {
                    content = (
                      <>
                       <ExpandableCard
  title="⚖️ Juvenile Justice & Legal Aid"
  description="How the Juvenile Justice Act protects children's rights."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Juvenile Justice (Care and Protection of Children) Act</strong> ensures that minors in conflict with the law receive rehabilitation and care instead of punishment. This act focuses on the reformation of children rather than penalizing them. Juvenile Justice Boards (JJB) are designated to handle such cases and prioritize reformative justice, giving children a chance to rehabilitate and reintegrate into society.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">📞 Key Helplines for Juvenile Justice:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1098 - Child Helpline:</strong> For immediate intervention and support for children in need of protection.</li>
          <li><strong>100 - Police:</strong> To report cases involving juveniles in conflict with the law.</li>
          <li><strong>1091 - Women's Helpline:</strong> For cases involving girls or women who need protection.</li>
          <li><strong>112 - Emergency Response:</strong> General emergency number for urgent situations involving children.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Legal Support & Rehabilitation:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Juvenile Justice Boards (JJB):</strong> Hear and decide cases involving juveniles in conflict with the law.</li>
          <li><strong>Child Welfare Committees (CWC):</strong> Provide care and rehabilitation for children in need of protection.</li>
          <li><strong>Probation Officers:</strong> Supervise the rehabilitation and reintegration of juveniles.</li>
          <li><strong>NGOs & Legal Aid:</strong> Offer free legal support and advocacy for children in conflict with the law.</li>
        </ul>
      </div>
      
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">⚖️ Steps to Access Juvenile Justice & Legal Aid</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Contact Child Welfare Committee (CWC)</h4>
              <p className="text-gray-700">For children in need of care or protection, parents, guardians, or social workers can contact the nearest Child Welfare Committee.</p>
              <a href="https://ncpcr.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get Legal Aid</a>
            </div>
          </div>
          
          {[...Array(4)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Visit the Juvenile Justice Board:", "Apply for Rehabilitation Services:", "File a Complaint with NCPCR:", "Seek Support from NGOs:"][index]}</strong></p>
                <p className="text-gray-700">{["If the child is in conflict with the law, report the case to the Juvenile Justice Board for fair trial procedures.", "Access various rehabilitation and reintegration services for juvenile offenders.", "For any grievances related to juvenile cases, file a complaint with NCPCR or Juvenile Justice Boards.", "Several NGOs provide legal assistance, counseling, and rehabilitation for juveniles in need of support."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Content Below the Flowchart */}
      <h3 className="mt-6 text-xl font-semibold text-red-700">📚 Juvenile Justice Framework</h3>
      <p className="text-gray-700">The <strong>Juvenile Justice Act</strong> focuses on children in conflict with the law, ensuring their protection and rehabilitation instead of punitive measures. It acknowledges the vulnerabilities of minors and the need for their reformation and reintegration into society. Juvenile Justice Boards, in particular, are tasked with ensuring that minors are treated according to their age and the potential for reform.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🌍 International Principles on Juvenile Justice</h3>
      <p className="text-gray-700">India's Juvenile Justice system is aligned with international standards, including the <strong>United Nations Convention on the Rights of the Child</strong> (UNCRC). These international guidelines emphasize non-punitive treatment for children, aiming to rehabilitate and reintegrate rather than punish. The act ensures that minors are given fair trials and treatment suited to their age and development.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 The Role of Juvenile Justice in Society</h3>
      <p className="text-gray-700">The Juvenile Justice Act plays a crucial role in safeguarding the future of minors who are in conflict with the law. By focusing on rehabilitation and education, it provides a second chance for children to become responsible citizens. Society’s role in this is critical — providing resources and guidance to help these juveniles successfully reintegrate and avoid further conflict with the law.</p>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Cyber Safety for Children") {
                    content = (
                      <>
                       <ExpandableCard
  title="💻 Cyber Safety for Children"
  description="Protecting kids from cyber threats and online exploitation."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Children face various cyber risks, including cyberbullying, identity theft, and online exploitation. It's essential for parents and guardians to monitor their children’s online activities, implement parental controls, and teach them about safe internet practices. Cybercrime complaints can be reported through <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cybercrime.gov.in</a>.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">⚠️ Common Cyber Threats Faced by Children:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Cyberbullying:</strong> Harassment or bullying through social media, messaging platforms, or online games.</li>
          <li><strong>Identity Theft:</strong> Personal information being stolen and misused for fraudulent activities.</li>
          <li><strong>Online Exploitation:</strong> Sexual exploitation, grooming, and other harmful interactions initiated by online predators.</li>
          <li><strong>Inappropriate Content:</strong> Exposure to violent, explicit, or harmful content on the internet.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔒 Steps to Protect Children Online:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Monitor Online Activity:</strong> Regularly check the websites your child visits and the apps they use.</li>
          <li><strong>Enable Parental Controls:</strong> Use built-in or third-party tools to restrict harmful content and apps.</li>
          <li><strong>Educate About Safe Internet Practices:</strong> Teach your child about the dangers of sharing personal information online and how to avoid online predators.</li>
          <li><strong>Set Privacy Settings:</strong> Ensure that your child’s online profiles are set to private, and restrict the visibility of their personal information.</li>
        </ul>
      </div>
      
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">💻 Reporting Cyber Crimes</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Report Cyberbullying & Exploitation</h4>
              <p className="text-gray-700">If your child is experiencing cyberbullying or exploitation, you can report the incident immediately on <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cybercrime.gov.in</a> or to your local police.</p>
              <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Report a Crime</a>
            </div>
          </div>
          
          {[...Array(3)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Block the Offending User:", "Change Password & Enable 2FA:", "Contact Cyber Safety Experts:"][index]}</strong></p>
                <p className="text-gray-700">{["If your child is being harassed or contacted by an online predator, block them immediately.", "Change your child’s online account passwords, and enable two-factor authentication to add a layer of security.", "Consult with cyber safety experts or counselors if the situation involves complex cyber threats like grooming or online exploitation."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Below the Flowchart */}
      <h3 className="mt-6 text-xl font-semibold text-red-700">💡 How to Detect Cyberbullying</h3>
      <p className="text-gray-700">Look out for signs of distress, such as withdrawal from social activities, changes in mood, or reluctance to go to school. If your child exhibits these signs, it may be a sign that they are being bullied online. Early detection is crucial to stop the cycle of cyberbullying.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🌐 Understanding Online Exploitation</h3>
      <p className="text-gray-700">Online exploitation involves predatory behavior such as grooming, blackmailing, or encouraging a child to engage in inappropriate behavior. Teach children to recognize red flags like unsolicited messages or requests for private information and report such incidents immediately.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 Role of Parents in Cyber Safety</h3>
      <p className="text-gray-700">Parents play a key role in ensuring their children's online safety. Regularly discussing internet safety, setting rules for device use, and monitoring online activities can significantly reduce the risks of cyber threats. Parents should foster an open line of communication, encouraging children to come forward if they experience anything unsettling online.</p>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Child Labor & Exploitation Laws") {
                    content = (
                      <>
                       <ExpandableCard
  title="🚫 Child Labor & Exploitation Laws"
  description="Understanding laws prohibiting child labor and trafficking."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Child Labour (Prohibition and Regulation) Act</strong> bans the employment of children under 14 years of age in any hazardous or exploitative work. Employers who violate these laws face significant penalties. Children involved in forced labor or trafficking can be rescued and supported by NGOs and government agencies working to protect their rights.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Key Laws Protecting Children from Labor:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Child Labour (Prohibition and Regulation) Act, 1986:</strong> Prohibits the employment of children in hazardous occupations and regulates conditions for children in non-hazardous work.</li>
          <li><strong>Right to Education Act, 2009:</strong> Ensures that children receive free and compulsory education, preventing them from being exploited in labor.</li>
          <li><strong>Bonded Labour System (Abolition) Act, 1976:</strong> Abolishes the system of bonded labor, ensuring no child is forced to work in conditions of slavery.</li>
          <li><strong>Juvenile Justice (Care and Protection of Children) Act, 2015:</strong> Provides measures for the protection and rehabilitation of children involved in labor or exploitation.</li>
        </ul>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 Steps to Combat Child Labor & Trafficking:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1. Report Suspicious Activity:</strong> If you suspect a child is being exploited or trafficked, report it immediately to local authorities or through dedicated helplines like 1098 (Child Helpline).</li>
          <li><strong>2. Raise Awareness:</strong> Educate communities about the harms of child labor and the importance of education to prevent exploitation.</li>
          <li><strong>3. Engage NGOs:</strong> Organizations like <strong>Childline India</strong>, <strong>Save the Children</strong>, and other child welfare NGOs play a crucial role in rescuing and rehabilitating children in exploitative situations.</li>
          <li><strong>4. Legal Support & Advocacy:</strong> Advocate for stronger enforcement of child labor laws and for the provision of legal support to victims of trafficking and forced labor.</li>
          <li><strong>5. Monitor Workplaces:</strong> Authorities should regularly inspect workplaces where children are employed to ensure that they are not subjected to exploitative conditions.</li>
          <li><strong>6. Prevent Trafficking:</strong> Strengthen border security and surveillance systems to prevent the trafficking of children for labor, and work closely with law enforcement agencies to rescue and protect victims.</li>
          <li><strong>7. Provide Rehabilitation & Education:</strong> Once children are rescued from labor, they should be provided with rehabilitation, counseling, and access to education to ensure they can lead a productive life.</li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">🚨 How to Report Child Labor & Exploitation</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Call the Child Helpline</h4>
              <p className="text-gray-700">If you suspect any child is being forced into labor or trafficking, immediately contact <strong>1098</strong> (Child Helpline) for emergency support and rescue.</p>
              <a href="https://childlineindia.org.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Get Help from NGOs</a>
            </div>
          </div>
          
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Rescue the Child from Exploitative Conditions:", "Provide Immediate Safety and Shelter:", "Report the Employer to Authorities:", "Provide Access to Education:", "Monitor the Child’s Progress:", "Work with Legal Experts for Further Action:"][index]}</strong></p>
                <p className="text-gray-700">{["Take the child to a safe place away from the exploiter. Ensure they are free from harm.", "Provide a safe shelter for the child, offering immediate food, shelter, and medical attention.", "Report the employer to the local authorities and initiate legal proceedings against those responsible.", "Ensure that the child has access to education and is not forced to return to work.", "Follow up regularly with the child to ensure they are recovering physically and emotionally from their ordeal.", "Collaborate with legal experts to ensure the child’s legal rights are protected and that justice is served."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Below the Flowchart */}
      <h3 className="mt-6 text-xl font-semibold text-red-700">💡 The Importance of Education</h3>
      <p className="text-gray-700">Education is a fundamental tool to prevent child labor. Children who are in school are less likely to be exploited in labor markets. Communities should work to ensure all children, particularly those at risk, have access to free and quality education.</p>
      
      <h3 className="mt-4 text-xl font-semibold text-red-700">🛑 Preventing Child Trafficking</h3>
      <p className="text-gray-700">Preventing child trafficking requires both proactive and reactive measures. Proactively, strengthen laws, create awareness, and ensure social protection programs for vulnerable children. Reactively, work with national and international agencies to rescue and rehabilitate trafficked children.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🌍 Role of Communities in Ending Child Labor</h3>
      <p className="text-gray-700">Communities play a significant role in identifying and preventing child labor. Community leaders should actively engage in raising awareness, promoting education, and working with local authorities to report cases of child labor and trafficking.</p>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Adoption & Guardianship Rights") {
                    content = (
                      <>
                        <ExpandableCard
  title="🏡 Adoption & Guardianship Rights"
  description="Legal adoption procedures and child welfare laws."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">The <strong>Juvenile Justice (Care and Protection of Children) Act</strong> and <strong>CARA (Central Adoption Resource Authority)</strong> regulate legal adoptions in India. These laws ensure that the adoption process prioritizes the child’s best interests, while adoption agencies verify prospective parents through background checks and assessments to ensure a safe and loving environment.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">⚖️ Key Laws Governing Adoption:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Juvenile Justice (Care and Protection of Children) Act, 2015:</strong> Regulates adoption procedures, ensuring the child’s welfare is prioritized.</li>
          <li><strong>CARA (Central Adoption Resource Authority):</strong> Governs the adoption process in India, ensuring transparency and ethical practices in adoption procedures.</li>
          <li><strong>Inter-Country Adoption Guidelines:</strong> Provides guidelines for children being adopted by foreign nationals to ensure their rights and well-being are safeguarded.</li>
          <li><strong>Hindu Adoptions and Maintenance Act, 1956:</strong> Specifically governs adoptions in the Hindu community, ensuring that the child’s well-being is prioritized.</li>
        </ul>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 Steps for Legal Adoption Process:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1. Registration with CARA:</strong> Prospective adoptive parents must first register with CARA or authorized adoption agencies.</li>
          <li><strong>2. Document Submission:</strong> Submit required documents including identity proof, background checks, and home studies.</li>
          <li><strong>3. Home Study Assessment:</strong> A social worker conducts a detailed home study to assess the suitability of the prospective parents.</li>
          <li><strong>4. Referral of a Child:</strong> After approval, the agency refers a child to the parents based on compatibility and the child’s needs.</li>
          <li><strong>5. Pre-Adoption Foster Care:</strong> The child is placed in the prospective parents’ care on a foster basis before the final adoption order.</li>
          <li><strong>6. Finalization of Adoption:</strong> After the child’s adjustment to the home, a legal adoption order is issued by the court.</li>
          <li><strong>7. Post-Adoption Follow-Up:</strong> Agencies conduct post-adoption follow-ups to ensure the child’s welfare and emotional well-being in the new home.</li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">🚨 How to Report or Seek Guidance on Adoption</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Contact an Adoption Agency</h4>
              <p className="text-gray-700">To start the adoption process, contact a CARA-authorized adoption agency or visit the CARA website for detailed information and guidance.</p>
              <a href="https://cara.nic.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Learn More About Adoption</a>
            </div>
          </div>
          
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{["Contact an Authorized Adoption Agency:", "Submit Documentation:", "Complete Home Study Assessment:", "Wait for Child Referral:", "Pre-Adoption Foster Care:", "Finalize Adoption Process:"][index]}</strong></p>
                <p className="text-gray-700">{["Reach out to a CARA-authorized agency for initial guidance.", "Submit the necessary documentation and undergo background checks.", "A social worker will visit your home to assess your suitability as parents.", "The agency will match a child with your family based on compatibility.", "The child is placed with you temporarily to ensure a smooth transition.", "After the child settles in, a legal adoption order is issued by the court."][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Below the Flowchart */}
      <h3 className="mt-6 text-xl font-semibold text-red-700">💡 Importance of Adoption</h3>
      <p className="text-gray-700">Adoption is a vital process for children who are without families, offering them a safe, loving, and nurturing environment. Legal adoptions also ensure that children's rights are protected by law, preventing exploitation and ensuring their welfare.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🌍 Role of Agencies in Adoption</h3>
      <p className="text-gray-700">Adoption agencies play a crucial role in ensuring the process is transparent, ethical, and focused on the best interests of the child. These agencies conduct rigorous background checks and home studies to match children with prospective parents who can provide a loving home.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">👨‍👩‍👧‍👦 Adoption as a Lifelong Commitment</h3>
      <p className="text-gray-700">Adoption is a lifelong commitment. It requires parents to provide emotional, financial, and social support to the child. It’s important that prospective parents understand the responsibilities involved in adopting and raising a child.</p>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Healthcare & Nutrition Rights") {
                    content = (
                      <>
                       <ExpandableCard
  title="🩺 Healthcare & Nutrition Rights"
  description="Access to healthcare, immunization, and nutrition programs for children."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">Ensuring children's health is a fundamental right, supported by various government schemes and welfare programs. The <strong>Integrated Child Development Services (ICDS)</strong> and <strong>National Health Mission (NHM)</strong> provide free vaccinations, mid-day meals, and routine health checkups for children. Malnourished children receive special care through targeted interventions.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🏥 Key Healthcare & Nutrition Programs:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>ICDS (Integrated Child Development Services):</strong> Provides supplementary nutrition, preschool education, and health checkups.</li>
          <li><strong>Mid-Day Meal Scheme:</strong> Ensures nutritious meals for children in government schools.</li>
          <li><strong>Rashtriya Bal Swasthya Karyakram (RBSK):</strong> Free health screenings and treatment for children under 18.</li>
          <li><strong>National Immunization Program:</strong> Free vaccinations for diseases like polio, measles, and tuberculosis.</li>
          <li><strong>Poshan Abhiyan:</strong> Focuses on reducing malnutrition among children and pregnant women.</li>
        </ul>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 Steps to Access Healthcare & Nutrition Benefits:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1. Visit the Nearest Anganwadi or PHC:</strong> Parents can register their children for nutrition programs and vaccinations.</li>
          <li><strong>2. Get Vaccination Schedule:</strong> Immunization camps provide free vaccines against life-threatening diseases.</li>
          <li><strong>3. Enroll in Mid-Day Meal Program:</strong> School-going children receive nutritious meals under government schemes.</li>
          <li><strong>4. Regular Health Checkups:</strong> Schools and PHCs conduct free screenings for common illnesses and malnutrition.</li>
          <li><strong>5. Avail Nutritional Support:</strong> Malnourished children receive special care through ICDS and Poshan Abhiyan.</li>
          <li><strong>6. Report Health & Nutrition Issues:</strong> Parents can seek assistance from child welfare organizations or government helplines.</li>
          <li><strong>7. Access Emergency Medical Aid:</strong> Government hospitals provide free treatment for children under health schemes.</li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">🚨 How to Get Help for a Child’s Health & Nutrition</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>
          
          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">🏥 Visit the Nearest Healthcare Center</h4>
              <p className="text-gray-700">Take your child to a government hospital, PHC, or Anganwadi for checkups, vaccinations, and nutritional support.</p>
              <a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition transform hover:scale-105 shadow-md">🔍 Find Nearest Health Center</a>
            </div>
          </div>
          
          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{[
                  "Register at Anganwadi for Nutrition Programs:", 
                  "Check Government Vaccination Schedule:", 
                  "Enroll Child in Mid-Day Meal Scheme:", 
                  "Attend Regular Health Screenings:", 
                  "Seek Special Support for Malnourished Children:", 
                  "Report Health & Nutrition Issues to Authorities:"
                ][index]}</strong></p>
                <p className="text-gray-700">{[
                  "Get access to free food, immunizations, and preschool education.", 
                  "Ensure your child receives essential vaccines as per government schedule.", 
                  "Government and aided schools provide free nutritious meals daily.", 
                  "Periodic checkups help in early detection of malnutrition or diseases.", 
                  "Children with malnutrition receive special care under ICDS & Poshan Abhiyan.", 
                  "Dial child helplines or contact local health centers for urgent assistance."
                ][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Below the Flowchart */}
      <h3 className="mt-6 text-xl font-semibold text-red-700">💡 Importance of Child Healthcare & Nutrition</h3>
      <p className="text-gray-700">Proper healthcare and nutrition in early childhood lay the foundation for a healthy life. Government schemes aim to eliminate malnutrition, reduce infant mortality rates, and ensure that every child receives essential vaccinations.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🌍 Role of Government & NGOs</h3>
      <p className="text-gray-700">The government, in collaboration with NGOs, provides free healthcare, nutritional programs, and immunization to underprivileged children. Ensuring access to these programs can significantly improve child health outcomes.</p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">👨‍👩‍👧‍👦 How Parents Can Help</h3>
      <p className="text-gray-700">Parents and guardians should ensure children get timely vaccinations, maintain a balanced diet, and participate in government health initiatives. Regular medical checkups can prevent diseases and promote overall well-being.</p>
    </div>
  }
/>

                      </>
                    );
                  } else if (topic === "Emergency Helplines & Support Services") {
                    content = (
                      <>
                       <ExpandableCard
  title="📞 Emergency Helplines & Support Services"
  description="Key contacts for child safety, protection, and legal aid."
  details={
    <div className="p-4 bg-white rounded-lg shadow-md border border-red-500">
      <p className="text-lg font-medium text-gray-800">
        If a child is in distress, immediate help is available. The <strong>Childline 1098</strong> is a toll-free 24/7 helpline that provides emergency support, rescue services, and legal assistance. Government agencies and NGOs also offer shelter, education, and rehabilitation for abandoned or abused children.
      </p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🚨 Important Child Safety Helplines:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>Childline 1098:</strong> 24/7 emergency helpline for children in distress.</li>
          <li><strong>Women & Child Helpline 181:</strong> Assists in cases of abuse, trafficking, and harassment.</li>
          <li><strong>National Commission for Protection of Child Rights (NCPCR):</strong> Complaints related to child rights violations.</li>
          <li><strong>Police Emergency 112:</strong> Report crimes against children, including trafficking and abuse.</li>
          <li><strong>Cybercrime Reporting (cybercrime.gov.in):</strong> File complaints related to online harassment or exploitation.</li>
          <li><strong>PENCIL Portal (pencil.gov.in):</strong> Report child labor and trafficking cases.</li>
        </ul>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🔑 Steps to Seek Help in an Emergency:</h3>
      <div className="border-l-4 border-red-500 pl-4 bg-red-100 shadow-sm p-2 rounded-md">
        <ul className="list-disc pl-5 text-gray-800">
          <li><strong>1. Dial 1098 (Childline):</strong> If a child is in danger, immediately call Childline for rescue and legal assistance.</li>
          <li><strong>2. Report to the Nearest Police Station:</strong> In cases of abuse, trafficking, or missing children, file a report with the police.</li>
          <li><strong>3. Contact a Child Welfare Committee (CWC):</strong> CWCs handle cases of child neglect and abandonment.</li>
          <li><strong>4. File a Complaint with NCPCR:</strong> If a child’s rights are violated, report the case to the National Commission for Protection of Child Rights.</li>
          <li><strong>5. Seek NGO Assistance:</strong> Organizations like Save the Children and CRY provide legal aid and shelter to rescued children.</li>
          <li><strong>6. Report Online Exploitation:</strong> Cybercrimes against children can be reported at <a href="https://www.cybercrime.gov.in" target="_blank" className="text-red-600 underline">cybercrime.gov.in</a>.</li>
          <li><strong>7. Use the PENCIL Portal:</strong> Report cases of child labor and trafficking at <a href="https://www.pencil.gov.in" target="_blank" className="text-red-600 underline">pencil.gov.in</a>.</li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">📞 How to Get Emergency Help</h2>
        <div className="relative w-full max-w-md">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-red-500 h-full"></div>

          <div className="relative flex items-center mb-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">1</div>
            <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
              <h4 className="text-lg font-semibold text-red-800 flex items-center">📞 Call Childline 1098</h4>
              <p className="text-gray-700">This toll-free number is available 24/7 to help children in distress.</p>
            </div>
          </div>

          {[...Array(6)].map((_, index) => (
            <div key={index} className="relative flex items-center mb-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold flex justify-center items-center rounded-full shadow-lg text-lg">{index + 2}</div>
              <div className="ml-4 p-5 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md w-full">
                <p className="text-gray-800 font-medium"><strong>{[
                  "Report to Police Emergency 112:",
                  "Contact Local Child Welfare Committee (CWC):",
                  "File Complaint with NCPCR for Child Rights Violation:",
                  "Seek Help from NGOs for Rescue & Rehabilitation:",
                  "Report Cyber Harassment at Cybercrime.gov.in:",
                  "Report Child Labor & Trafficking via PENCIL Portal:"
                ][index]}</strong></p>
                <p className="text-gray-700">{[
                  "Immediately call 112 if a child is in immediate danger.",
                  "Reach out to CWCs to provide legal and rehabilitation support for abandoned or neglected children.",
                  "NCPCR handles complaints related to abuse, denial of education, and violation of child protection laws.",
                  "Organizations like CRY and Save the Children offer shelter and legal aid to vulnerable children.",
                  "Online child exploitation cases should be reported to the cybercrime portal for investigation.",
                  "PENCIL Portal allows users to report child labor cases directly to authorities."
                ][index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="mt-6 text-xl font-semibold text-red-700">💡 Why Emergency Helplines Matter</h3>
      <p className="text-gray-700">
        These helplines provide crucial support to children facing abuse, trafficking, or exploitation. Prompt action can prevent further harm and ensure their safety.
      </p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">🌍 Role of NGOs & Government</h3>
      <p className="text-gray-700">
        NGOs and government agencies work together to rescue, rehabilitate, and provide education for at-risk children. Your support and awareness can make a difference.
      </p>

      <h3 className="mt-4 text-xl font-semibold text-red-700">👨‍👩‍👧‍👦 How You Can Help</h3>
      <p className="text-gray-700">
        Spread awareness about these helplines, report cases of child abuse, and support child welfare initiatives in your community.
      </p>
    </div>
  }
/>
                      </>
                    );
                  }
                  openModalWithContent(content);
                }}
                className={`px-4 py-2 rounded-lg border-2 text-gray-800 transition ${selectedTopic === topic ? "bg-red-500 text-white" : "bg-gray-200"}`}
              >
                {topic}
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {/* Modal Window */}
      {isModalOpen && (
        <ModalWindow onClose={closeModal}>
          {modalContent}
        </ModalWindow>
      )}
     
    </div>
  );
}