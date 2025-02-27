import React, { useState, useEffect } from 'react';
import './App.css';
import Drill from './components/Drill';
import ErrorBoundary from './components/ErrorBoundary';
import { DrillProps } from './types';
import { loadDrills } from './utils/drillLoader';
import Footer from './components/Footer';
import packageJson from '../package.json';

const App: React.FC = () => {
  const [selectedDrill, setSelectedDrill] = useState<DrillProps | null>(null);
  const [drills, setDrills] = useState<DrillProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrills = async () => {
      console.log('Starting to fetch drills...');
      try {
        const loadedDrills = await loadDrills();
        console.log('Loaded drills:', loadedDrills);
        if (!Array.isArray(loadedDrills) || loadedDrills.length === 0) {
          throw new Error('No drills loaded');
        }
        setDrills(loadedDrills);
      } catch (err) {
        console.error('Detailed error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load drills');
      } finally {
        setLoading(false);
      }
    };

    fetchDrills();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <h1>Daily Lang Practice</h1>
        <div>Loading drills... Please wait.</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1>Daily Lang Practice</h1>
        <div className="error">
          <h2>Error Loading Drills</h2>
          <p>{error}</p>
          <pre>Check the console for more details.</pre>
        </div>
      </div>
    );
  }

  if (!drills.length) {
    return (
      <div className="app">
        <h1>Daily Lang Practice</h1>
        <div>No drills available. Please check your data files.</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Daily Lang Practice</h1>
      <ErrorBoundary>
        <div className="drills-container">
          {selectedDrill ? (
            <>
              <button onClick={() => setSelectedDrill(null)}>← Voltar</button>
              <Drill 
                id={selectedDrill.id}
                title={selectedDrill.title}
                description={selectedDrill.description}
                exercises={selectedDrill.exercises}
                footer={selectedDrill.footer}
              />
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
      </ErrorBoundary>
      <Footer />
      <footer className="footer">
        Version: {packageJson.version}
      </footer>
    </div>
  );
};

export default App;
