// Main App - router & scaffold

import React, { useState as useAppState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './data.js';
import {
  AuroraBG,
  Home,
  MbtiPicker,
  PlatformPicker,
  Quiz,
} from './screens.jsx';
import { Report, SampleSheet } from './report.jsx';

function App() {
  // Screens: home | known-picker | platform | quiz | report
  const [screen, setScreen] = useAppState('home');
  const [mode, setMode] = useAppState(null);
  const [mbti, setMbti] = useAppState(null);
  const [platform, setPlatform] = useAppState(null);
  const [sampleOpen, setSampleOpen] = useAppState(false);

  // page transition key for fade
  const goto = (s) => setScreen(s);

  const goHome = () => { setScreen('home'); setMode(null); setMbti(null); setPlatform(null); };

  // From home
  const startKnown = () => { setMode('known'); goto('known-picker'); };
  const startQuiz = () => { setMode('quiz'); goto('quiz'); };

  // From picker
  const onPickerNext = (m) => { setMbti(m); goto('platform'); };
  // From platform
  const onPlatformDone = (p) => { setPlatform(p); goto('report'); };
  // From quiz
  const onQuizDone = ({ mbti, platform }) => { setMbti(mbti); setPlatform(platform); goto('report'); };

  return (
    <div style={{position:'relative', width:'100%', height:'100%', overflow:'hidden'}}>
      <AuroraBG />

      <div style={{position:'relative', height:'100%', overflowY:'auto', overflowX:'hidden'}} className="scrollbar-none">
        <div key={screen} className="scale-in">
          {screen === 'home' && (
            <Home onPath={(p) => p === 'known' ? startKnown() : startQuiz()} onSample={() => setSampleOpen(true)} />
          )}
          {screen === 'known-picker' && (
            <MbtiPicker onBack={goHome} onNext={onPickerNext} />
          )}
          {screen === 'platform' && (
            <PlatformPicker onBack={() => goto('known-picker')} onDone={onPlatformDone} />
          )}
          {screen === 'quiz' && (
            <Quiz onBack={goHome} onDone={onQuizDone} />
          )}
          {screen === 'report' && mbti && platform && (
            <Report mbti={mbti} platform={platform} onRestart={goHome} onBack={goHome} />
          )}
        </div>

        {/* Home indicator */}
        <div style={{
          position:'fixed', bottom:8, left:'50%', transform:'translateX(-50%)',
          width:120, height:4, borderRadius:999, background:'rgba(31,26,29,0.35)', zIndex:100,
          pointerEvents:'none',
        }} />
      </div>

      <SampleSheet open={sampleOpen} onClose={() => setSampleOpen(false)} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
