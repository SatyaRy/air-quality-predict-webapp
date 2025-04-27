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
              Air Quality Prediction for a Healthier Tomorrow
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8">
              Harnessing machine learning to forecast air pollution and empower
              communities to breathe cleaner air.
            </p>
            <button
              onClick={scrollToOverview}
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section ref={overviewRef} className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Project Overview
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
          Air pollution is a global crisis affecting millions of lives. Our
          project leverages advanced machine learning models, such as ARIMA and
          LSTM, to predict air quality levels by analyzing weather patterns,
          emissions data, and historical trends. By providing accurate
          forecasts, we enable communities, policymakers, and industries to take
          proactive steps toward reducing pollution and safeguarding public
          health.
        </p>
      </section>

      {/* Why It Matters Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Why It Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Public Health */}
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
              Public Health
            </h3>
            <p className="text-gray-600">
              Poor air quality contributes to respiratory diseases, heart
              conditions, and millions of premature deaths annually. Accurate
              predictions help communities prepare and reduce health risks.
            </p>
          </div>

          {/* Environmental Impact */}
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
              Environmental Impact
            </h3>
            <p className="text-gray-600">
              By identifying pollution trends, our project supports efforts to
              reduce emissions, protect ecosystems, and combat climate change.
            </p>
          </div>

          {/* Policy and Planning */}
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
              Policy and Planning
            </h3>
            <p className="text-gray-600">
              Governments and industries can use our forecasts to implement
              effective regulations and sustainable practices to improve air
              quality.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Real-Time Air Quality
            </h3>
            <p className="text-gray-600">
              Monitor PM2.5, PM10, NO2, and other pollutants in real-time across
              multiple regions to stay informed about the air you breathe.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Weather & Emissions
            </h3>
            <p className="text-gray-600">
              Understand the impact of weather conditions like temperature,
              humidity, and wind speed, alongside emission levels, on air
              quality.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Air Quality Forecast
            </h3>
            <p className="text-gray-600">
              Get precise predictions of pollution levels for the coming days,
              helping you plan and prepare for potential air quality challenges.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-3">
              Historical Analysis
            </h3>
            <p className="text-gray-600">
              Explore historical data to identify pollution patterns, sources,
              and trends, driving informed decision-making for cleaner air.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16 bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center">
            Our system combines cutting-edge machine learning with robust data
            analysis to deliver accurate air quality predictions, empowering
            users with actionable insights.
          </p>
          <ul className="space-y-6 text-gray-600">
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                1
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Data Collection
                </h4>
                <p>
                  We gather real-time and historical data from trusted sources,
                  including government agencies, environmental sensors, and
                  satellite imagery.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                2
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Data Preprocessing
                </h4>
                <p>
                  Our team cleans and processes the data to remove
                  inconsistencies, ensuring high-quality inputs for our
                  predictive models.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                3
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Model Training
                </h4>
                <p>
                  We train advanced machine learning models like ARIMA and LSTM,
                  which analyze weather, emissions, and historical data to
                  forecast air quality.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold">
                4
              </span>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Performance Evaluation
                </h4>
                <p>
                  We assess model accuracy using metrics like Mean Absolute
                  Error (MAE) and Root Mean Squared Error (RMSE) to ensure
                  reliable predictions.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">10M+</p>
            <p className="text-gray-600">
              People reached with air quality insights through our platform and
              partnerships.
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
            <p className="text-gray-600">
              Regions monitored globally, providing localized air quality
              forecasts.
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">90%</p>
            <p className="text-gray-600">
              Prediction accuracy, enabling confident decision-making for
              cleaner air.
            </p>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="container mx-auto px-6 py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
          Get Involved
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed text-center">
          Join us in our mission to improve air quality worldwide. Whether
          you're a policymaker, researcher, or concerned citizen, there are many
          ways to contribute.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            View Dashboard
          </Link>
          <Link
            to="/about"
            className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
          >
            Learn About Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
