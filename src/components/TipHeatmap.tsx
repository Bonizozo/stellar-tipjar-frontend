'use client';
import React, { useState, useMemo } from 'react';
import { MOCK_TIPS, TipActivity } from '@/lib/heatmap-data';
import { ChevronLeft, ChevronRight, Palette, Calendar } from 'lucide-react';
import '@/styles/heatmap.css';

export default function TipHeatmap() {
  const [view, setView] = useState<'year' | 'month'>('year');
  const [theme, setTheme] = useState<'green' | 'blue' | 'purple' | 'orange'>('green');
  const [currentDate, setCurrentDate] = useState(new Date());

  const getColorClass = (count: number) => {
    if (count === 0) return 'var(--heat-lvl-0)';
    if (count < 3) return 'var(--heat-lvl-1)';
    if (count < 6) return 'var(--heat-lvl-2)';
    if (count < 10) return 'var(--heat-lvl-3)';
    return 'var(--heat-lvl-4)';
  };

  const filteredData = useMemo(() => {
    if (view === 'year') {
      const yearAgo = new Date(currentDate);
      yearAgo.setFullYear(currentDate.getFullYear() - 1);
      return MOCK_TIPS.filter(d => new Date(d.date) >= yearAgo && new Date(d.date) <= currentDate);
    } else {
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      return MOCK_TIPS.filter(d => new Date(d.date) >= startOfMonth && new Date(d.date) <= endOfMonth);
    }
  }, [view, currentDate]);

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Mon', 'Wed', 'Fri'];

  return (
    <div className={`heatmap-container theme-${theme}`}>
      <div className="heatmap-header">
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Tip Activity</h1>
          <p style={{ color: 'var(--heat-text-muted)' }}>Visualize your support patterns across the network.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${view === 'year' ? 'active' : ''}`}
              onClick={() => setView('year')}
            >
              Yearly
            </button>
            <button 
              className={`toggle-btn ${view === 'month' ? 'active' : ''}`}
              onClick={() => setView('month')}
            >
              Monthly
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['green', 'blue', 'purple', 'orange'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t as any)}
                style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: `var(--heat-lvl-4)`, // Note: this uses the local theme's lvl4
                  border: theme === t ? '2px solid white' : 'none',
                  cursor: 'pointer'
                }}
                className={`theme-${t}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="heatmap-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Calendar size={20} color="var(--heat-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>
              {view === 'year' 
                ? `${currentDate.getFullYear() - 1} - ${currentDate.getFullYear()}`
                : `${monthLabels[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              }
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="control-btn" onClick={() => {
              const d = new Date(currentDate);
              view === 'year' ? d.setFullYear(d.getFullYear() - 1) : d.setMonth(d.getMonth() - 1);
              setCurrentDate(d);
            }}><ChevronLeft size={18} /></button>
            <button className="control-btn" onClick={() => {
              const d = new Date(currentDate);
              view === 'year' ? d.setFullYear(d.getFullYear() + 1) : d.setMonth(d.getMonth() + 1);
              setCurrentDate(d);
            }}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 0 4px', fontSize: '0.7rem', color: 'var(--heat-text-muted)' }}>
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', color: 'var(--heat-text-muted)' }}>
              {view === 'year' ? monthLabels.map(m => <span key={m}>{m}</span>) : <span>Weeks</span>}
            </div>
            
            <div className="heatmap-grid" style={{ gridTemplateColumns: `repeat(${view === 'year' ? 53 : 6}, 1fr)` }}>
              {filteredData.map((day, i) => (
                <div 
                  key={day.date}
                  className="heat-cell"
                  style={{ background: getColorClass(day.count) }}
                >
                  <div className="heat-tooltip">
                    <strong>{new Date(day.date).toLocaleDateString()}</strong><br />
                    {day.count} tips • {day.amount} XLM
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="heatmap-footer">
          <span>{filteredData.reduce((acc, curr) => acc + curr.count, 0)} tips in the last period</span>
          <div className="heat-legend">
            <span>Less</span>
            <div className="legend-box" style={{ background: 'var(--heat-lvl-0)' }} />
            <div className="legend-box" style={{ background: 'var(--heat-lvl-1)' }} />
            <div className="legend-box" style={{ background: 'var(--heat-lvl-2)' }} />
            <div className="legend-box" style={{ background: 'var(--heat-lvl-3)' }} />
            <div className="legend-box" style={{ background: 'var(--heat-lvl-4)' }} />
            <span>More</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <div className="heatmap-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--heat-text-muted)', fontSize: '0.9rem' }}>Peak Activity Day</p>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Saturday</h2>
        </div>
        <div className="heatmap-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--heat-text-muted)', fontSize: '0.9rem' }}>Average Tip Size</p>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>14.2 XLM</h2>
        </div>
        <div className="heatmap-card" style={{ padding: '1.5rem' }}>
          <p style={{ color: 'var(--heat-text-muted)', fontSize: '0.9rem' }}>Total XLM Received</p>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>4,280.50</h2>
        </div>
      </div>
    </div>
  );
}
