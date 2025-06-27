import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-24 px-6 md:px-16 bg-gradient-to-br from-white via-gray-100 to-cyan-100">
        <h1 className="text-5xl font-extrabold mb-4 text-cyan-600 animate-fade-in">
          Create Affiliate Links Instantly
        </h1>
        <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto animate-fade-in">
          Promote any product, generate trackable affiliate links, and start
          earning – all in one place.
        </p>
        <Link
          to="/register"
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg inline-flex items-center gap-2 transition"
        >
          Get Started <ArrowRight />
        </Link>

        {/* Image Marquee */}
        <div className="mt-16">
          <Marquee gradient={false} speed={40} className="overflow-hidden">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"
              alt="Amazon"
              className="h-16 mx-8"
            />
            <img
              src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png"
              alt="Flipkart"
              className="h-16 mx-8"
            />
            <img
              src="https://vectorseek.com/wp-content/uploads/2023/09/Meesho-Logo-Vector.svg-.png"
              alt="Meesho"
              className="h-12 mx-8"
            />

            <img
              src="https://1000logos.net/wp-content/uploads/2022/08/Myntra-Logo-2011.png"
              alt="Myntra"
              className="h-12 mx-8"
            />

            <img
              src="https://cdn.worldvectorlogo.com/logos/udemy-2.svg"
              alt="Udemy"
              className="h-10 mx-8"
            />
            <img
              src="https://logospng.org/download/shopify/logo-shopify-1536.png"
              alt="Shopify"
              className="h-12 mx-9"
            />
          </Marquee>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-cyan-700">
          How Affiliate++ Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cyan-600">
              1. Paste Product Link
            </h3>
            <p className="text-gray-600">
              Enter any product URL (like Amazon, Flipkart, etc.) into our link
              box.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cyan-600">
              2. Get Affiliate Link
            </h3>
            <p className="text-gray-600">
              We convert it to a unique, trackable affiliate link tied to your
              account.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cyan-600">
              3. Share & Earn
            </h3>
            <p className="text-gray-600">
              Post it anywhere — every click & purchase earns you a commission.
            </p>
          </div>
        </div>
      </section>

      {/* Link Generation Demo UI (Mockup) */}
      <section className="py-20 px-6 md:px-20 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6 text-cyan-700">
          Try Our Link Generator
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          Paste a product URL and see how it works:
        </p>
        <div className="bg-gray-100 p-6 max-w-xl mx-auto rounded-xl shadow-lg">
          <input
            className="w-full p-3 rounded-lg text-gray-800 mb-4 border border-gray-300"
            type="text"
            placeholder="https://www.amazon.in/..."
            disabled
          />
          <button className="bg-cyan-600 hover:bg-cyan-700 px-5 py-2 rounded text-white font-semibold">
            Generate Link
          </button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-cyan-700">
          Why Choose Affiliate++?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="font-semibold text-lg text-cyan-600">
              Multiple Platforms Supported
            </h4>
            <p className="text-gray-600">
              Amazon, Flipkart, Meesho, and more – all supported.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-cyan-600">
              Real-Time Tracking
            </h4>
            <p className="text-gray-600">
              Track clicks, conversions, and earnings in your dashboard.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-cyan-600">Zero Fees</h4>
            <p className="text-gray-600">
              No cost to join or generate links. 100% free!
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-cyan-700">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <blockquote className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500 shadow">
            “I generated ₹10,000 in my first month thanks to Affiliate++. So
            easy to use!”
            <footer className="mt-2 text-sm text-gray-600">
              — Anjali, Student Influencer
            </footer>
          </blockquote>
          <blockquote className="bg-cyan-50 p-6 rounded-xl border-l-4 border-cyan-500 shadow">
            “I share links in my WhatsApp groups daily and earn passively.
            Highly recommended.”
            <footer className="mt-2 text-sm text-gray-600">
              — Ramesh, Homemaker
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-cyan-100 to-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-700">
          Start Creating Affiliate Links Today
        </h2>
        <Link
          to="/login"
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition"
        >
          Login & Generate
        </Link>
      </section>
    </div>
  );
}
