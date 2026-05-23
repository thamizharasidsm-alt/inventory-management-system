import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export default function BarcodeScanner({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const [manualCode, setManualCode] = useState('');
  const [camError, setCamError] = useState(false);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamError(true);
      setScanning(false);
      return;
    }

    let active = true;
    const reader = new BrowserMultiFormatReader();

    /* Try to get camera at 320x240 for speed */
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 320 }, height: { ideal: 240 } },
        });
        if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
        const video = videoRef.current;
        if (!video) { stream.getTracks().forEach(t => t.stop()); return; }
        video.srcObject = stream;

        await video.play();

        /* Single-shot decode loop — exits on first detection */
        async function poll() {
          while (active) {
            try {
              const result = await reader.decodeFromVideoElement(video);
              if (!active) break;
              reader.reset();
              const code = result.getText();
              if (code) {
                active = false;
                stream.getTracks().forEach(t => t.stop());
                setScanning(false);
                onDetected(code);
                return;
              }
            } catch {
              /* frame failed, retry immediately */
            }
          }
        }
        poll();
      } catch {
        if (active) setCamError(true);
        setScanning(false);
      }
    }

    start();

    return () => {
      active = false;
      try { reader.reset(); } catch { /* ignore */ }
    };
  }, []);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const code = manualCode.trim();
    if (code) {
      onDetected(code);
    }
  };

  return (
    <div className="modal-overlay show" onClick={(ev) => ev.target === ev.currentTarget && onClose()}>
      <div className="modal modal-sm">
        <div className="modal-header">
          <h3><i className="fas fa-camera" style={{ color: 'var(--primary)' }} /> Scan Barcode</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <div className="scanner-container" style={{ position: 'relative' }}>
            {!camError && (
              <video ref={videoRef} style={{ width: '100%', borderRadius: 8, background: '#000', minHeight: 180 }} />
            )}
            {scanning && !camError && (
              <div style={{
                position: 'absolute', top: '50%', left: '10%', right: '10%', height: 3,
                background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                animation: 'scanline 1.2s ease-in-out infinite',
                borderRadius: 2, opacity: 0.8,
              }} />
            )}
          </div>
          {camError ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '10px 0' }}>
              <i className="fas fa-info-circle" /> Camera unavailable. Enter barcode manually below.
            </p>
          ) : (
            <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', marginTop: 10 }}>
              {scanning ? 'Scanning...' : 'Barcode detected!'}
            </p>
          )}
          <form onSubmit={handleManualSubmit} style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Type barcode number..."
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', outline: 'none', background: 'var(--bg-card)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
              autoFocus
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '10px 16px' }}>
              <i className="fas fa-check" /> Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
