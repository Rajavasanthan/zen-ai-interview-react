import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

function CreateSession() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
      role: "",
      jobDescription: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const session = await axios.post(`${config.api}/create-session`, values);
        navigate(`/conversation/${session.data.sessionId}`);
      } catch (error) {
        alert("Error creating session: " + error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
            Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Interview</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Setup a new session to screen candidates with our advanced AI interviewer.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-xl overflow-hidden p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-slate-300 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
                  Target Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Senior Frontend Developer"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-300 mb-2">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                rows="4"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Paste the full job description here..."
                value={formik.values.jobDescription}
                onChange={formik.handleChange}
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-indigo-500/30 transform transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Session...
                  </>
                ) : (
                  "Create Session"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSession;
