import React, { useState, useEffect } from 'react';
import './App.css';
import Drill from './components/Drill';
import { DrillProps } from './types';
import { loadDrills } from './utils/drillLoader';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState<DrillProps | null>(null);
  const [drills, setDrills] = useState<DrillProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrills = async () => {
      try {
        const loadedDrills = await loadDrills();
        setDrills(loadedDrills);
      } catch (err) {
        setError('Failed to load drills');
        console.error('Error loading drills:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrills();
  }, []);

  if (loading) {
    return <div className="app">Loading drills...</div>;
  }

  if (error) {
    return <div className="app error">{error}</div>;
  }

  return (
    <div className="app">
      <h1>Daily Lang Practice</h1>
      <div className="drills-container">
        {selectedDrill ? (
          <>
            <button onClick={() => setSelectedDrill(null)}>← Voltar</button>
            <Drill {...selectedDrill} />
          </>
        ) : (
          <div className="drill-list">
            {drills.map(drill => (
              <div 
                key={drill.id} 
                className="drill-card"
                onClick={() => setSelectedDrill(drill)}
              >
                <h2>{drill.title}</h2>
                <p>{drill.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
