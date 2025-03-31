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
    <div className={`max-w-7xl mx-auto px-6 py-12 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">Legal Help & Resources</h1>

      <p className="text-xl mb-12 text-center text-gray-600">
        Women's and children's legal rights are essential for protection and empowerment. Below are resources and laws to guide and support you.
      </p>

      <div className="flex justify-center space-x-6 mb-12">
        <Button
          className={`px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none ${
            activeSection === "women" ? "bg-red-600" : "bg-red-500"
          } text-white hover:bg-red-400`}
          onClick={() => setActiveSection("women")}
        >
          Women's Rights & Resources
        </Button>
        <Button
          className={`px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none ${
            activeSection === "children" ? "bg-red-600" : "bg-red-500"
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
                          details="The Protection of Children from Sexual Offences (POCSO) Act criminalizes child abuse and exploitation. Offenders face severe penalties, including life imprisonment. Children can report abuse to child helplines (1098) or police. Courts prioritize child-friendly procedures for handling cases."
                        />
                      </>
                    );
                  } else if (topic === "Education Rights & RTE Act") {
                    content = (
                      <>
                        <ExpandableCard
                          title="📚 Education Rights & RTE Act"
                          description="Understanding the Right to Education Act and free education policies."
                          details="The Right to Education (RTE) Act guarantees free and compulsory education for children aged 6-14. Schools must not deny admission based on gender, caste, or disability. Government schemes provide financial aid, mid-day meals, and free textbooks."
                        />
                      </>
                    );
                  } else if (topic === "Juvenile Justice & Legal Aid") {
                    content = (
                      <>
                        <ExpandableCard
                          title="⚖️ Juvenile Justice & Legal Aid"
                          description="How the Juvenile Justice Act protects children's rights."
                          details="The Juvenile Justice (Care and Protection of Children) Act ensures minors in conflict with the law receive rehabilitation instead of punishment. Juvenile Justice Boards handle such cases, prioritizing reformative justice."
                        />
                      </>
                    );
                  } else if (topic === "Cyber Safety for Children") {
                    content = (
                      <>
                        <ExpandableCard
                          title="💻 Cyber Safety for Children"
                          description="Protecting kids from cyber threats and online exploitation."
                          details="Children face cyber risks such as bullying, identity theft, and exploitation. Parents should monitor online activity, enable parental controls, and educate kids about safe internet practices. Cyber complaints can be reported at cybercrime.gov.in."
                        />
                      </>
                    );
                  } else if (topic === "Child Labor & Exploitation Laws") {
                    content = (
                      <>
                        <ExpandableCard
                          title="🚫 Child Labor & Exploitation Laws"
                          description="Understanding laws prohibiting child labor and trafficking."
                          details="The Child Labour (Prohibition and Regulation) Act bans employment of children under 14. Employers violating laws face heavy penalties. Children in forced labor can be rescued through NGOs and government agencies."
                        />
                      </>
                    );
                  } else if (topic === "Adoption & Guardianship Rights") {
                    content = (
                      <>
                        <ExpandableCard
                          title="🏡 Adoption & Guardianship Rights"
                          description="Legal adoption procedures and child welfare laws."
                          details="The Juvenile Justice Act and CARA regulate legal adoptions in India. Adoption agencies ensure child welfare and conduct background checks on prospective parents. The process prioritizes the child’s best interests."
                        />
                      </>
                    );
                  } else if (topic === "Healthcare & Nutrition Rights") {
                    content = (
                      <>
                        <ExpandableCard
                          title="🩺 Healthcare & Nutrition Rights"
                          description="Access to healthcare, immunization, and nutrition programs for children."
                          details="Government schemes like ICDS provide free vaccinations, mid-day meals, and health checkups. Malnourished children receive special care under various welfare programs."
                        />
                      </>
                    );
                  } else if (topic === "Emergency Helplines & Support Services") {
                    content = (
                      <>
                        <ExpandableCard
                          title="📞 Emergency Helplines & Support Services"
                          description="Key contacts for child safety, protection, and legal aid."
                          details="Childline 1098 is a toll-free 24/7 helpline for children in distress. NGOs and government bodies provide shelter, education, and rehabilitation for abandoned or abused children."
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