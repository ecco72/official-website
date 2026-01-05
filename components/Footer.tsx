import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Icons
  const MapPinIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
  );

  const FaxIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
  );

  const MailIcon = () => (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
  );

  return (
    <footer id="contact" className="bg-gray-100 dark:bg-[#020203] text-gray-600 dark:text-gray-400 py-24 relative border-t border-gray-200 dark:border-white/5 transition-colors duration-700">

      {/* Massive Watermark */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none overflow-hidden select-none">
        <h1 className="text-[25vw] font-bold leading-none text-black dark:text-white tracking-tighter translate-y-[35%] translate-x-[5%]">
          CTC
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Columns */}
          {[
            {
              title: t('footer.taichung.title'),
              items: [
                { icon: <MapPinIcon />, text: t('footer.taichung.address') },
                { icon: <PhoneIcon />, text: "04-23582340" },
                { icon: <FaxIcon />, text: "04-23596771" }
              ]
            },
            {
              title: t('footer.taipei.title'),
              items: [
                { icon: <MapPinIcon />, text: t('footer.taipei.address1') },
                { icon: <MapPinIcon />, text: t('footer.taipei.address2') },
                { icon: <PhoneIcon />, text: "02-82280881" }
              ]
            },
            {
              title: t('footer.tainan.title'),
              items: [
                { icon: <MapPinIcon />, text: t('footer.tainan.address') },
                { icon: <PhoneIcon />, text: "06-2141737" }
              ]
            }
          ].map((col, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-gray-900 dark:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#014bb8]"></span>
                {col.title}
              </h3>
              <ul className="space-y-4 text-sm font-light">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 hover:text-black dark:hover:text-white transition-colors cursor-default">
                    <span className="mt-0.5 opacity-50 text-[#014bb8]">{item.icon}</span>
                    <span className="leading-relaxed whitespace-pre-wrap">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="text-gray-900 dark:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#014bb8]"></span>
              {t('footer.email')}
            </h3>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-center gap-3 group">
                <span className="opacity-50 group-hover:text-[#014bb8] transition-colors text-[#014bb8]"><MailIcon /></span>
                <a href="mailto:service@ct-cloud.com.tw" className="hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-400 pb-0.5">service@ct-cloud.com.tw</a>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="opacity-50 group-hover:text-[#014bb8] transition-colors text-[#014bb8]"><MailIcon /></span>
                <a href="mailto:sales@ct-cloud.com.tw" className="hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-gray-400 pb-0.5">sales@ct-cloud.com.tw</a>
              </li>
            </ul>

            {/* Button Removed as requested */}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-500">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <a href="http://ct-cloud.com/" target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors">
              {t('footer.companyName')}
            </a>
          </div>
          {/* Right side links removed as requested */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;