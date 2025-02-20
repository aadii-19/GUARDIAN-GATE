import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LegalHelp() {
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  const toggleSubSection = (subSection: string) => {
    setActiveSubSection((prev) => (prev === subSection ? null : subSection));
  };
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-12 text-center text-gray-800">Legal Help & Resources</h1>

      {/* Introductory Text */}
      <p className="text-xl mb-12 text-center text-gray-600">
        Women's legal rights are essential for protection and empowerment. Below are resources and laws to guide and support you.
      </p>

      {/* Buttons to Toggle Sections */}
      <div className="flex justify-center space-x-6 mb-12">
        <Button
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-500 transition-transform hover:scale-105 focus:outline-none"
        >
          Women's Rights & Resources
        </Button>
      </div>

      {/* Women's Rights Section */}
      <section className="mb-16 border-t-4 border-red-500 pt-8 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-6 text-black-600 text-center">Women's Rights and Legal Protections</h2>

        {/* Stack Layout for Cards */}
        <div className="space-y-8">

          {/* Card 1: Domestic Violence and Protection Laws */}
          <Card
            className={`p-6 shadow-lg rounded-lg bg-blue-50 hover:bg-blue-100 transform transition-all hover:scale-105 border-2 border-red-500 ${
              activeSubSection === "domesticViolence" ? "ring-4 ring-red-500" : ""
            }`}
          >
            <div className="mb-3 cursor-pointer" onClick={() => toggleSubSection("domesticViolence")}>
              <h3 className="text-2xl font-medium">Domestic Violence and Protection Laws</h3>
            </div>
            {activeSubSection === "domesticViolence" && (
              <div className="p-6 shadow-md rounded-lg bg-white mt-4 border-2 border-red-500">
                <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                  <li><strong>Protection of Women from Domestic Violence Act, 2005:</strong> Provides legal protection against abuse.</li>
                  <li><strong>Dowry Prohibition Act, 1961:</strong> Criminalizes dowry practices.</li>
                  <li><strong>Section 498A of IPC:</strong> Protects women from cruelty by husbands and in-laws.</li>
                  <li><strong>Women's Protection Cells:</strong> Provides counseling and support.</li>
                </ul>
              </div>
            )}
          </Card>

          {/* Card 2: Legal Procedures & Steps */}
          <Card
            className={`p-6 shadow-lg rounded-lg bg-green-50 hover:bg-green-100 transform transition-all hover:scale-105 border-2 border-red-500 ${
              activeSubSection === "legalSteps" ? "ring-4 ring-red-500" : ""
            }`}
          >
            <div className="mb-3 cursor-pointer" onClick={() => toggleSubSection("legalSteps")}>
              <h3 className="text-2xl font-medium">How to Take Legal Action</h3>
            </div>
            {activeSubSection === "legalSteps" && (
              <div className="p-6 shadow-md rounded-lg bg-white mt-4 border-2 border-red-500">
                <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                  <li><strong>Filing a Police Report:</strong> Steps to report a crime or harassment to the police.</li>
                  <li><strong>Seeking a Protection Order:</strong> A guide on how to approach the court for protection.</li>
                  <li><strong>Filing an FIR:</strong> How to file an FIR in case of an offense.</li>
                </ul>
              </div>
            )}
          </Card>

          {/* Card 3: Key Legal Rights for Women */}
          <Card
            className={`p-6 shadow-lg rounded-lg bg-yellow-50 hover:bg-yellow-100 transform transition-all hover:scale-105 border-2 border-red-500 ${
              activeSubSection === "legalRights" ? "ring-4 ring-red-500" : ""
            }`}
          >
            <div className="mb-3 cursor-pointer" onClick={() => toggleSubSection("legalRights")}>
              <h3 className="text-2xl font-medium">Key Legal Rights for Women in India</h3>
            </div>
            {activeSubSection === "legalRights" && (
              <div className="p-6 shadow-md rounded-lg bg-white mt-4 border-2 border-red-500">
                <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                  <li><strong>Right to Equal Pay:</strong> Women have the right to equal pay for equal work.</li>
                  <li><strong>Right to Live with Dignity:</strong> Protects women from all forms of harassment and violence.</li>
                  <li><strong>Right to Reproductive Rights:</strong> Control over reproductive health decisions.</li>
                  <li><strong>Right to Education:</strong> Free and compulsory education up to age 14.</li>
                </ul>
              </div>
            )}
          </Card>

          {/* Card 4: Additional Legal Resources for Women */}
          <Card
            className={`p-6 shadow-lg rounded-lg bg-red-50 hover:bg-red-100 transform transition-all hover:scale-105 border-2 border-red-500 ${
              activeSubSection === "additionalResources" ? "ring-4 ring-red-500" : ""
            }`}
          >
            <div className="mb-3 cursor-pointer" onClick={() => toggleSubSection("additionalResources")}>
              <h3 className="text-2xl font-medium">Additional Legal Resources for Women</h3>
            </div>
            {activeSubSection === "additionalResources" && (
              <div className="p-6 shadow-md rounded-lg bg-white mt-4 border-2 border-red-500">
                <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                  <li><strong>Women's Helpline:</strong> 181 for emergency assistance.</li>
                  <li><strong>Legal Aid Services:</strong> Free legal consultation from various NGOs.</li>
                  <li><strong>Domestic Violence Help Centers:</strong> Safe spaces for women facing domestic violence.</li>
                </ul>
              </div>
            )}
          </Card>

        </div>
      </section>
    </div>
  );
}
