import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExpandableCard from "@/components/ExpandableCards";
import { motion } from "framer-motion";

export default function LegalHelp() {
  const [activeSection, setActiveSection] = useState<'women' | 'children'>('women');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("Domestic Violence & Protection Laws");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`max-w-7xl mx-auto px-6 py-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">Legal Help & Resources</h1>

      <p className="text-xl mb-12 text-center text-gray-600">
        Women's and children's legal rights are essential for protection and empowerment. Below are resources and laws to guide and support you.
      </p>

      <div className="flex justify-center space-x-6 mb-12">
        <Button
          className={`px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none ${
            activeSection === 'women' ? 'bg-red-600' : 'bg-red-500'
          } text-white hover:bg-red-400`}
          onClick={() => setActiveSection('women')}
        >
          Women's Rights & Resources
        </Button>
        <Button
          className={`px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 focus:outline-none ${
            activeSection === 'children' ? 'bg-red-600' : 'bg-red-500'
          } text-white hover:bg-red-400`}
          onClick={() => setActiveSection('children')}
        >
          Children's Rights & Resources
        </Button>
      </div>

      {/* Women's Rights Section */}
      {activeSection === 'women' && (
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
        "Emergency Helplines & Legal Aid Services"
      ].map((topic) => (
        <button
          key={topic}
          onClick={() => setSelectedTopic(topic)}
          className={`px-4 py-2 rounded-lg border-2 text-gray-800 transition ${selectedTopic === topic ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          {topic}
        </button>
      ))}
    </div>

    <div className="space-y-8">
    {selectedTopic === "Domestic Violence & Protection Laws" && (
  <>
    <ExpandableCard
      title="⚖️ Domestic Violence & Protection Laws"
      description="Understanding laws like the Domestic Violence Act and Dowry Prohibition Act."
      details="Under the Protection of Women from Domestic Violence Act, women can seek protection orders, residence rights, financial support, and custody of children. The law covers physical, emotional, sexual, and economic abuse. Victims can report cases to police stations, NGOs, or online legal portals. Protection Officers assist victims with legal procedures, and courts can issue restraining orders against abusers. The Dowry Prohibition Act makes giving and receiving dowry a punishable offense, with imprisonment up to five years."
    />

    <ExpandableCard
      title="🛡️ Types of Abuse Covered Under the Law"
      description="Recognizing different forms of abuse under the Domestic Violence Act."
      details="Domestic violence isn't limited to physical harm—it includes emotional, sexual, and financial abuse. Emotional abuse involves constant humiliation or verbal threats. Sexual abuse includes forced relations or harassment. Economic abuse refers to controlling financial resources or denying access to basic necessities. Courts recognize all these forms and offer legal protection accordingly."
    />

    <ExpandableCard
      title="📜 How to File a Domestic Violence Complaint"
      description="Step-by-step guide on reporting domestic abuse."
      details="Victims can report abuse by filing a First Information Report (FIR) at the police station, contacting women’s helplines (1091, 181), or approaching Protection Officers appointed under the Domestic Violence Act. Online complaints can also be filed through the National Commission for Women (NCW) portal. Fast-track courts and legal aid services assist survivors in obtaining justice quickly."
    />

    <ExpandableCard
      title="🏠 Shelter Homes & Support Services"
      description="Accessing safe homes, counseling, and legal aid."
      details="Women in distress can seek shelter at government-funded short-stay homes or NGOs providing crisis intervention. Organizations like the One Stop Centre Scheme offer legal, psychological, and medical assistance under one roof. Survivors can also get financial aid and job assistance through welfare schemes designed for rehabilitation."
    />
  </>
)}
{selectedTopic === "How to Take Legal Action" && (
  <>
    <ExpandableCard
      title="📜 How to Take Legal Action"
      description="Step-by-step guide to filing complaints, seeking legal aid, and protection orders."
      details="Women facing violence can file a case at the nearest police station, through helplines, or online via the National Cyber Crime Portal. FIRs must be registered without delay, and zero-FIR provisions allow filing complaints at any police station. Legal aid services by the National Legal Services Authority (NALSA) provide free legal representation. Fast-track courts expedite cases, and women can seek compensation under victim relief schemes. NGOs like the National Commission for Women (NCW) offer additional legal guidance."
    />

    <ExpandableCard
      title="⚖️ Understanding the Zero-FIR Concept"
      description="How Zero-FIR ensures justice even in a different jurisdiction."
      details="A Zero-FIR can be filed at any police station, regardless of where the crime occurred. The case is later transferred to the relevant jurisdiction. This helps women take immediate legal action without delays. Police officers are legally obligated to register such complaints without refusal."
    />

    <ExpandableCard
      title="🆘 Legal Aid & Fast-Track Courts"
      description="Free legal representation and faster case resolution for women."
      details="NALSA and state legal service authorities provide free legal aid to women who cannot afford private lawyers. Fast-track courts handle cases of domestic violence, rape, and harassment to ensure swift justice. Women can also seek help from NGOs specializing in legal assistance."
    />

    <ExpandableCard
      title="📞 Helplines & Online Complaint Portals"
      description="Key helplines and online platforms for filing legal complaints."
      details="Women can report crimes via helplines like 181 (Women’s Helpline) and 1091 (Women’s Police Helpline). Online complaint portals like cybercrime.gov.in allow reporting digital crimes. The National Commission for Women (NCW) also has an online grievance redressal system."
    />
  </>
)}
{selectedTopic === "Workplace Harassment & Legal Safeguards" && (
  <>
    <ExpandableCard
      title="🏢 Workplace Harassment & Legal Safeguards"
      description="Learn about the POSH Act and workplace safety measures."
      details="The Prevention of Sexual Harassment (POSH) Act mandates that all workplaces with 10 or more employees have an Internal Complaints Committee (ICC) to handle harassment cases. Complaints must be addressed within 90 days, and strict penalties apply for non-compliance. Women can seek protection against retaliation, and employers must conduct awareness training. Organizations must implement policies ensuring a safe working environment. External agencies, such as the Local Complaints Committee (LCC), assist women working in informal sectors."
    />

    <ExpandableCard
      title="📋 Filing a Workplace Harassment Complaint"
      description="Step-by-step process for reporting workplace harassment."
      details="Employees facing harassment can file a complaint with their organization’s Internal Complaints Committee (ICC). If no ICC exists, complaints can be submitted to the Local Complaints Committee (LCC). Cases must be resolved within 90 days, and strict actions are taken against perpetrators."
    />

    <ExpandableCard
      title="⚖️ Legal Rights & Employer Responsibilities"
      description="How the POSH Act protects women and mandates employer actions."
      details="Employers must establish an ICC, provide awareness training, and enforce zero-tolerance policies for harassment. Retaliation against complainants is illegal, and failure to comply with the POSH Act can result in penalties for the organization."
    />

    <ExpandableCard
      title="🛑 Protection from Retaliation & Support Systems"
      description="Ensuring job security and mental health support for survivors."
      details="Women filing complaints cannot be demoted, fired, or victimized. Organizations should provide access to counseling and legal support. NGOs and government bodies assist women facing workplace discrimination and retaliation."
    />
  </>
)}
{selectedTopic === "Property & Inheritance Rights" && (
  <>
    <ExpandableCard
      title="🏠 Property & Inheritance Rights"
      description="Women's rights in inheritance, property ownership, and succession laws."
      details="Under the Hindu Succession Act, daughters have equal rights in ancestral property, even if born before 2005. Muslim women inherit property under Sharia Law, where shares vary based on family structure. Christian and Parsi women inherit equally as per the Indian Succession Act. Married women can claim shared property in divorce proceedings. Women can also file for partition suits if denied rightful inheritance. Government schemes provide financial assistance for property registration under women’s names."
    />

    <ExpandableCard
      title="⚖️ Equal Rights for Daughters in Ancestral Property"
      description="How daughters now have the same rights as sons in Hindu succession."
      details="The 2005 amendment to the Hindu Succession Act grants daughters equal rights in ancestral property, regardless of birth year. Women can file legal claims if denied their rightful share and can also pass on the property to their heirs."
    />

    <ExpandableCard
      title="📜 Legal Procedures for Property Disputes"
      description="Steps women can take to claim or challenge property inheritance."
      details="Women can file partition suits if denied inheritance. Succession certificates are required for claiming movable assets like bank deposits. Legal aid services assist in challenging unlawful property transfers or evictions."
    />

    <ExpandableCard
      title="🏡 Government Schemes Supporting Women’s Property Ownership"
      description="Financial aid and incentives for women purchasing property."
      details="Several government schemes promote property ownership for women, offering reduced stamp duty rates and housing subsidies. Schemes like ‘PM Awas Yojana’ prioritize women applicants to enhance financial independence and security."
    />
  </>
)}
{selectedTopic === "Cyber Harassment & Online Safety" && (
  <>
    <ExpandableCard
      title="💻 Cyber Harassment & Online Safety"
      description="Know your rights against cyberstalking, online abuse, and digital crimes."
      details="Cyberstalking, identity theft, and online harassment are punishable under the IT Act and IPC. Offenders can face imprisonment and fines. Women can report cases via cybercrime.gov.in, the National Cyber Crime Helpline (1930), or local cyber police stations. Social media platforms provide safety features like reporting, blocking, and privacy settings to prevent harassment. Courts can issue restraining orders against online abusers. Specialized cyber cells offer support for digital crime victims."
    />

    <ExpandableCard
      title="⚖️ Laws Against Cyberstalking & Identity Theft"
      description="Legal measures to combat cyber threats and protect identity."
      details="Under the IT Act, cyberstalking and identity theft are criminal offenses punishable by up to three years in prison. Women can report cases anonymously via cybercrime portals, and courts can impose restraining orders against stalkers."
    />

    <ExpandableCard
      title="🔐 Online Safety Tips & Privacy Measures"
      description="Best practices for protecting personal data online."
      details="Women should enable two-factor authentication, use strong passwords, and limit personal information shared online. Social media platforms allow blocking/reporting of harassers, and privacy settings can restrict profile access."
    />

    <ExpandableCard
      title="📞 Where to Report Cyber Crimes"
      description="Government platforms and helplines for reporting cyber harassment."
      details="Victims can report cyber crimes via the National Cyber Crime Reporting Portal (cybercrime.gov.in), call the 1930 helpline, or visit local cyber police stations. IT cells specialize in tracking and prosecuting cybercriminals."
    />
  </>
)}
{selectedTopic === "Maternity & Reproductive Rights" && (
  <>
    <ExpandableCard
      title="🤰 Maternity & Reproductive Rights"
      description="Maternity leave, abortion rights, and reproductive health policies."
      details="The Maternity Benefit Act provides 26 weeks of paid leave for new mothers, extending to 12 weeks for mothers of adopted children. Pregnant women are entitled to free medical care in government hospitals. The Medical Termination of Pregnancy (MTP) Act ensures safe abortion services up to 24 weeks under specific conditions. Women have legal access to contraceptive services, and government schemes like Janani Suraksha Yojana support maternal healthcare. Workplace policies must accommodate pregnant employees without discrimination."
    />

    <ExpandableCard
      title="⚖️ Maternity Benefit Act & Workplace Rights"
      description="Legal protections for pregnant employees and new mothers."
      details="The Maternity Benefit Act mandates 26 weeks of paid leave for biological mothers and 12 weeks for adoptive or surrogate mothers. Employers must ensure a non-discriminatory workplace for pregnant employees."
    />

    <ExpandableCard
      title="🩺 Safe Abortion & Contraceptive Rights"
      description="Understanding legal abortion procedures and access to contraceptives."
      details="The MTP Act allows abortions up to 24 weeks in specific cases. Women have access to birth control methods and emergency contraception under government health programs."
    />

    <ExpandableCard
      title="🏥 Government Healthcare & Financial Aid for Mothers"
      description="Support programs for maternal health and childcare."
      details="Schemes like Janani Suraksha Yojana provide free delivery services in government hospitals. Financial incentives support low-income mothers during pregnancy and postpartum care."
    />
  </>
)}
{selectedTopic === "Divorce, Alimony & Maintenance Rights" && (
  <>
    <ExpandableCard
      title="💔 Divorce, Alimony & Maintenance Rights"
      description="Understanding legal rights in divorce, financial support, and custody."
      details="Women have the right to seek alimony, maintenance, and child support under laws like the Hindu Marriage Act and the Special Marriage Act. Courts consider factors like financial status, duration of marriage, and child custody in deciding maintenance. Muslim women can seek support under the Muslim Women (Protection of Rights on Divorce) Act. Fast-track courts expedite divorce proceedings in cases of domestic violence or cruelty."
    />

    <ExpandableCard
      title="⚖️ Legal Grounds for Divorce"
      description="Valid reasons for seeking divorce under different marriage laws."
      details="Adultery, cruelty, desertion, and mutual consent are legal grounds for divorce under Hindu, Muslim, Christian, and Special Marriage Acts. Fast-track courts handle cases involving domestic violence."
    />

    <ExpandableCard
      title="💰 Alimony & Financial Maintenance Rights"
      description="How courts decide financial support for women after divorce."
      details="Courts consider income, marriage duration, and child custody to determine alimony. Under Section 125 CrPC, women can claim maintenance, ensuring financial security after separation."
    />

    <ExpandableCard
      title="👩‍👧 Child Custody & Support Rights"
      description="Legal rights regarding child custody and financial assistance."
      details="Mothers often get primary custody, with the father providing financial support. Courts decide based on the child's welfare, and financial maintenance covers education and healthcare expenses."
    />
  </>
)}
{selectedTopic === "Emergency Helplines & Legal Aid Services" && (
  <>
    <ExpandableCard
      title="📞 Emergency Helplines & Legal Aid Services"
      description="Important contact numbers and legal aid options for women in distress."
      details="Women in distress can call helplines such as 1091 (Women’s Helpline), 181 (Women’s Emergency Helpline), and 100 (Police). The National Legal Services Authority (NALSA) provides free legal aid. NGOs like the National Commission for Women (NCW) assist in filing cases. Many states have dedicated one-stop crisis centers for survivors of violence. Online portals provide easy access to legal support and guidance."
    />

    <ExpandableCard
      title="📲 National & State Helplines for Women"
      description="Key emergency numbers and services for immediate support."
      details="Essential helplines include 1091 (Women’s Helpline), 181 (Domestic Violence Helpline), and 100 (Police). Cyber crimes can be reported via 1930, and state-level helplines offer region-specific assistance."
    />

    <ExpandableCard
      title="⚖️ Free Legal Aid Services by NALSA & NGOs"
      description="Accessing free legal help for domestic violence and family disputes."
      details="The National Legal Services Authority (NALSA) offers free legal representation to women. NGOs like NCW and state legal aid boards provide pro bono legal assistance."
    />

    <ExpandableCard
      title="🏥 One-Stop Crisis Centers for Abuse Victims"
      description="Safe spaces offering medical, legal, and psychological support."
      details="One-stop crisis centers provide immediate help for victims of domestic violence, sexual assault, and harassment. They offer counseling, medical aid, legal support, and shelter services."
    />
  </>
)}


      
    </div>
  </motion.section>
)}



      {/* Children's Rights Section */}
      {activeSection === 'children' && (
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
      {["Child Abuse & Protection Laws", "Education Rights & RTE Act", "Juvenile Justice & Legal Aid", "Cyber Safety for Children", "Child Labor & Exploitation Laws", "Adoption & Guardianship Rights", "Healthcare & Nutrition Rights", "Emergency Helplines & Support Services"].map((topic) => (
        <button
          key={topic}
          onClick={() => setSelectedTopic(topic)}
          className={`px-4 py-2 rounded-lg border-2 text-gray-800 transition ${selectedTopic === topic ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          {topic}
        </button>
      ))}
    </div>

    <div className="space-y-8">
      {selectedTopic === "Child Abuse & Protection Laws" && (
        <>
          <ExpandableCard
            title="⚖️ Child Abuse & Protection Laws"
            description="Understanding laws like POCSO Act and Child Protection Measures."
            details="The Protection of Children from Sexual Offences (POCSO) Act criminalizes child abuse and exploitation. Offenders face severe penalties, including life imprisonment. Children can report abuse to child helplines (1098) or police. Courts prioritize child-friendly procedures for handling cases."
          />

          <ExpandableCard
            title="🛡️ Reporting Child Abuse & Legal Procedures"
            description="Steps to report and take legal action against child abuse."
            details="Anyone can report child abuse anonymously through the Childline helpline (1098) or local police. FIRs can be filed under POCSO, and fast-track courts ensure swift justice. Rehabilitation programs provide psychological support to victims."
          />
        </>
      )}
      {selectedTopic === "Education Rights & RTE Act" && (
        <>
          <ExpandableCard
            title="📚 Education Rights & RTE Act"
            description="Understanding the Right to Education Act and free education policies."
            details="The Right to Education (RTE) Act guarantees free and compulsory education for children aged 6-14. Schools must not deny admission based on gender, caste, or disability. Government schemes provide financial aid, mid-day meals, and free textbooks."
          />
        </>
      )}
      {selectedTopic === "Juvenile Justice & Legal Aid" && (
        <>
          <ExpandableCard
            title="⚖️ Juvenile Justice & Legal Aid"
            description="How the Juvenile Justice Act protects children's rights."
            details="The Juvenile Justice (Care and Protection of Children) Act ensures minors in conflict with the law receive rehabilitation instead of punishment. Juvenile Justice Boards handle such cases, prioritizing reformative justice."
          />
        </>
      )}
      {selectedTopic === "Cyber Safety for Children" && (
        <>
          <ExpandableCard
            title="💻 Cyber Safety for Children"
            description="Protecting kids from cyber threats and online exploitation."
            details="Children face cyber risks such as bullying, identity theft, and exploitation. Parents should monitor online activity, enable parental controls, and educate kids about safe internet practices. Cyber complaints can be reported at cybercrime.gov.in."
          />
        </>
      )}
      {selectedTopic === "Child Labor & Exploitation Laws" && (
        <>
          <ExpandableCard
            title="🚫 Child Labor & Exploitation Laws"
            description="Understanding laws prohibiting child labor and trafficking."
            details="The Child Labour (Prohibition and Regulation) Act bans employment of children under 14. Employers violating laws face heavy penalties. Children in forced labor can be rescued through NGOs and government agencies."
          />
        </>
      )}
      {selectedTopic === "Adoption & Guardianship Rights" && (
        <>
          <ExpandableCard
            title="🏡 Adoption & Guardianship Rights"
            description="Legal adoption procedures and child welfare laws."
            details="The Juvenile Justice Act and CARA regulate legal adoptions in India. Adoption agencies ensure child welfare and conduct background checks on prospective parents. The process prioritizes the child’s best interests."
          />
        </>
      )}
      {selectedTopic === "Healthcare & Nutrition Rights" && (
        <>
          <ExpandableCard
            title="🩺 Healthcare & Nutrition Rights"
            description="Access to healthcare, immunization, and nutrition programs for children."
            details="Government schemes like ICDS provide free vaccinations, mid-day meals, and health checkups. Malnourished children receive special care under various welfare programs."
          />
        </>
      )}
      {selectedTopic === "Emergency Helplines & Support Services" && (
        <>
          <ExpandableCard
            title="📞 Emergency Helplines & Support Services"
            description="Key contacts for child safety, protection, and legal aid."
            details="Childline 1098 is a toll-free 24/7 helpline for children in distress. NGOs and government bodies provide shelter, education, and rehabilitation for abandoned or abused children."
          />
        </>
      )}
    </div>
  </motion.section>
)
}
    </div>
  );
}
