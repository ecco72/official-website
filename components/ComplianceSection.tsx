import React from 'react';
import { useTranslation } from 'react-i18next';
import FadeIn from './IntersectionObserver';

interface TableRow {
    iso: string;
    nist: string;
    winnexus: string;
    evidence: string;
    focus: string;
}

const ComplianceSection: React.FC = () => {
    const { t } = useTranslation();
    const rows = t('compliance.table.rows', { returnObjects: true }) as TableRow[];
    const headers = t('compliance.table.headers', { returnObjects: true }) as Record<string, string>;

    return (
        <section id="compliance" className="py-32 bg-white dark:bg-[#050507] transition-colors duration-700 overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Section Header - Consistent with CompanyIntro Styling */}
                <div className="max-w-5xl mx-auto mb-32">
                    <FadeIn>
                        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
                            <div className="flex items-center justify-center gap-6 mb-8 md:mb-10">
                                <span className="h-[1px] w-12 md:w-20 bg-black dark:bg-white opacity-10"></span>
                                <span className="text-xs font-mono uppercase tracking-[0.4em] text-gray-400">
                                    {t('compliance.sectionLabel')}
                                </span>
                                <span className="h-[1px] w-12 md:w-20 bg-black dark:bg-white opacity-10"></span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
                                {t('compliance.sectionTitle')}
                            </h2>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="relative pl-8 md:pl-16">
                            {/* CompanyIntro Style Timeline Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-white/10"></div>
                            <div className="absolute left-0 top-3 -translate-x-1/2 w-3 h-3 rounded-full bg-[#014bb8] shadow-[0_0_15px_rgba(1,75,184,0.5)]"></div>

                            <p className="text-base md:text-lg lg:text-xl font-light text-gray-800 dark:text-gray-300 text-justify tracking-wide leading-loose md:leading-[2.2]">
                                {t('compliance.highlight')}
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Table Title */}
                <FadeIn delay={0.4}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-gray-200 dark:to-white/10"></div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-wider uppercase">
                            {t('compliance.table.title')}
                        </h3>
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-gray-200 dark:to-white/10"></div>
                    </div>
                </FadeIn>

                {/* Dynamic Compliance Data - Responsive View */}
                <FadeIn delay={0.6}>
                    <div className="relative group">
                        {/* Background Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#014bb8]/20 to-purple-500/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                        {/* DESKTOP TABLE VIEW */}
                        <div className="hidden md:block relative overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                                        <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider whitespace-nowrap">{headers.iso}</th>
                                        <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider whitespace-nowrap">{headers.nist}</th>
                                        <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider whitespace-nowrap">{headers.winnexus}</th>
                                        <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider whitespace-nowrap">{headers.evidence}</th>
                                        <th className="px-6 py-5 text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider whitespace-nowrap">{headers.focus}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {rows.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.03] transition-colors group/row">
                                            <td className="px-6 py-6 align-top">
                                                <div className="text-sm font-bold text-[#014bb8] dark:text-[#4a90e2] whitespace-pre-line group-hover/row:translate-x-1 transition-transform">{row.iso}</div>
                                            </td>
                                            <td className="px-6 py-6 align-top">
                                                <div className="flex flex-wrap gap-1.5 max-w-[120px]">
                                                    {row.nist.split('/').map((tag, i) => (
                                                        <span key={i} className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 shadow-sm">
                                                            {tag.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 align-top">
                                                <div className="text-xs font-medium text-gray-900 dark:text-white/80 max-w-xs">{row.winnexus}</div>
                                            </td>
                                            <td className="px-6 py-6 align-top">
                                                <div className="text-xs font-medium text-gray-900 dark:text-white/80 max-w-xs">{row.evidence}</div>
                                            </td>
                                            <td className="px-6 py-6 align-top">
                                                <div className="text-xs font-medium text-gray-900 dark:text-white/80 max-w-xs">{row.focus}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* MOBILE CARD VIEW */}
                        <div className="md:hidden space-y-4">
                            {rows.map((row, idx) => (
                                <div key={idx} className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 shadow-sm">
                                    {/* ISO Header on mobile */}
                                    <div className="flex items-start justify-between mb-4 pb-3 border-b border-gray-100 dark:border-white/5">
                                        <div className="text-sm font-bold text-[#014bb8] dark:text-[#4a90e2] whitespace-pre-line">
                                            {row.iso}
                                        </div>
                                        <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
                                            {row.nist.split('/').map((tag, i) => (
                                                <span key={i} className="px-1 py-0.5 rounded text-[9px] font-bold bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/10">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Content rows for mobile */}
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-[#014bb8] dark:text-[#4a90e2] uppercase tracking-widest mb-1">{headers.winnexus}</div>
                                            <div className="text-xs text-gray-900 dark:text-white leading-relaxed font-bold">{row.winnexus}</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-[#014bb8] dark:text-[#4a90e2] uppercase tracking-widest mb-1">{headers.evidence}</div>
                                            <div className="text-xs text-gray-900 dark:text-white leading-relaxed font-bold">{row.evidence}</div>
                                        </div>
                                        <div className="pt-3 border-t border-gray-50 dark:border-white/5">
                                            <div className="text-[10px] font-bold text-[#014bb8] dark:text-[#4a90e2] uppercase tracking-widest mb-1">{headers.focus}</div>
                                            <div className="text-xs text-gray-900 dark:text-white leading-relaxed font-bold">{row.focus}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default ComplianceSection;
