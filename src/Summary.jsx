import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import {
    CheckCircle,
    XCircle,
    Award,
    FileText,
    Briefcase,
    User,
    Loader2,
    AlertCircle
} from 'lucide-react';

function Summary() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(`${config.api}/summary/${id}`);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching summary:", err);
                setError("Failed to load summary data. Please try again later.");
                setLoading(false);
            }
        };

        if (id) {
            fetchSummary();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Error Loading Summary</h3>
                    <p className="text-red-200">{error}</p>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
            <h1 className="text-3xl font-bold text-white mb-4">Interview Summary</h1>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/20">
                                {data.name ? data.name.charAt(0) : <User />}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
                                    {data.name}
                                    <span className="text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">Candidate</span>
                                </h1>
                                <div className="flex items-center gap-2 mt-2 text-slate-400 text-lg">
                                    <Briefcase className="w-5 h-5" />
                                    <span>{data.role}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-right">
                                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Match Score</p>
                                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">-%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Executive Summary</h2>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg">
                        {data.summary}
                    </p>
                </div>

                {/* Analysis Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-green-500/30 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Key Strengths</h2>
                        </div>
                        <ul className="space-y-4">
                            {data.strengths && data.strengths.map((strength, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-emerald-400" />
                                    <span className="text-slate-200">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-red-500/30 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Areas for Improvement</h2>
                        </div>
                        <ul className="space-y-4">
                            {data.weaknesses && data.weaknesses.map((weakness, index) => (
                                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-rose-400" />
                                    <span className="text-slate-200">{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                            <Award className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">Final Recommendation</h2>
                            <p className="text-purple-100 text-lg leading-relaxed font-medium">
                                {data.recommendation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;