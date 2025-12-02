import { useState } from 'react';
import OathFlow from './components/OathFlow';
import ResonanceVoid from './components/ResonanceVoid';

export default function App() {
  const [oathSigned, setOathSigned] = useState(false);

  if (!oathSigned) {
    return <OathFlow onSign={() => setOathSigned(true)} />;
  }

  return <ResonanceVoid />;
}
