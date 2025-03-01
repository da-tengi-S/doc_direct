import React from 'react';

const Setting = ({ theme, setTheme }) => {
  const themes = ["light", "dark", "high-contrast"];

  return (
    <div className='p-5'>
      <h2 className='text-xl font-bold'>Settings</h2>
      <div className='mt-4'>
        <label className='font-medium'>Select Theme:</label>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className='ml-2 border px-2 py-1 rounded'
        >
          {themes.map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Setting;
