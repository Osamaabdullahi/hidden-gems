import React from "react";
import { Globe, Users, Car, Shield } from "lucide-react";
import { cityData } from "../../data";

function Tips() {
  return (
    <>
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Transportation</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Globe className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Airport</h3>
              <p className="text-gray-600">{cityData.transportation.airport}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Public Transport</h3>
              <ul className="list-disc list-inside text-gray-600">
                {cityData.transportation.publicTransport.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Car className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium mb-2">Rideshare Services</h3>
              <ul className="list-disc list-inside text-gray-600">
                {cityData.transportation.rideshare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Safety Tips</h2>
        <div className="space-y-4">
          {cityData.safetyTips.map((tip) => (
            <div key={tip} className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">{tip}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Tips;
