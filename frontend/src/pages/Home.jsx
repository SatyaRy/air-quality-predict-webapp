import { Link } from "react-router-dom";
import { useRef } from "react";

function Home() {
  const overviewRef = useRef(null);

  const scrollToOverview = () => {
    overviewRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-green-200/30" />
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight mb-6">
              Predicting PM2.5 for Cleaner Air
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8">
              Using machine learning to forecast PM2.5 concentrations and
              support healthier communities worldwide.
            </p>
            <button
              onClick={scrollToOverview}
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Project Overview Section */}
      <section ref={overviewRef} className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Project Overview
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
          Our project aims to predict PM2.5 concentrations in the atmosphere
          using machine learning regression models, eliminating the need for
          direct PM2.5 sensors. By leveraging air quality data from a GitHub
          repository and models like XGBoost, we provide forecasts to inform
          policymakers and raise public awareness about air pollution’s impact
          on health and the environment.
        </p>
      </section>

      {/* Why It Matters Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Why It Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Health Protection
            </h3>
            <p className="text-gray-600">
              Forecasting PM2.5 levels helps mitigate health risks by enabling
              timely public advisories.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Environmental Awareness
            </h3>
            <p className="text-gray-600">
              Predictions highlight pollution trends, encouraging sustainable
              practices to protect ecosystems.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Policy Support
            </h3>
            <p className="text-gray-600">
              Accurate forecasts aid policymakers in implementing effective air
              pollution control measures.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-8 text-center animate-fade-in">
          Our Methodology
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center mb-12 animate-fade-in delay-100">
          We trained regression models using air quality data from a GitHub
          repository, exploring algorithms like Linear Regression, Random
          Forest, and XGBoost to predict PM2.5 concentrations accurately.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-xl p-8 flex items-start transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in delay-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
              <svg
                className="w-16 h-16 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Data Preprocessing
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                The dataset was cleaned by formatting column names, removing
                missing values, and adding time-based and lag features to
                enhance prediction accuracy.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent rounded-2xl pointer-events-none" />
          </div>
          <div className="relative bg-white rounded-2xl shadow-xl p-8 flex items-start transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in delay-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
              <svg
                className="w-16 h-16 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Model Selection
              </h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We tested Linear Regression and Random Forest before selecting
                XGBoost for its superior performance, trained on features like
                temperature, humidity, and emissions.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent rounded-2xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="container mx-auto px-6 py-16 bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Implementation
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center">
            Our system leverages libraries like Scikit-learn, XGBoost, and
            Pandas to preprocess data, train the model, and build an interactive
            web application.
          </p>
          <ul className="space-y-6 text-gray-600">
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                1
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Data Preparation
                </h4>
                <p>
                  We sourced air quality data from a GitHub repository, cleaning
                  and engineering features like Temperature (°C) and Humidity
                  (%).
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                2
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Model Training
                </h4>
                <p>
                  The XGBoost model, configured with 300 trees and a 0.05
                  learning rate, was trained on an 80/20 split of the data.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                3
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Web Integration
                </h4>
                <p>
                  A web application was built for users to interact with the
                  model, documented on our GitHub repository.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Explore Dashboard
          </Link>
          <Link
            to="/about"
            className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            Meet Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
