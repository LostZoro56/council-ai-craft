
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Download, Code, Eye } from 'lucide-react';

interface MermaidDiagramProps {
  code: string;
}

const MermaidDiagram = ({ code }: MermaidDiagramProps) => {
  const [showCode, setShowCode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [diagramId] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (!showCode && diagramRef.current) {
      diagramRef.current.innerHTML = '';
      mermaid.render(diagramId, code).then((result) => {
        if (diagramRef.current) {
          diagramRef.current.innerHTML = result.svg;
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = '<div class="text-red-500 p-4">Error rendering diagram</div>';
        }
      });
    }
  }, [code, showCode, diagramId]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const downloadDiagram = async (format: 'svg' | 'png') => {
    const svgElement = diagramRef.current?.querySelector('svg');
    if (!svgElement) return;

    if (format === 'svg') {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'diagram.svg';
      link.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'diagram.png';
            link.click();
            URL.revokeObjectURL(pngUrl);
          }
        });
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="flex items-center space-x-1"
          >
            {showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
            <span>{showCode ? 'View Diagram' : 'View Code'}</span>
          </Button>
        </div>
        
        {!showCode && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <div className="relative">
              <Button variant="outline" size="sm" className="peer">
                <Download className="w-4 h-4" />
              </Button>
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible peer-hover:opacity-100 peer-hover:visible hover:opacity-100 hover:visible transition-all duration-200 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadDiagram('svg')}
                  className="w-full justify-start"
                >
                  Download SVG
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadDiagram('png')}
                  className="w-full justify-start"
                >
                  Download PNG
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {showCode && (
          <Button variant="outline" size="sm" onClick={copyCode}>
            Copy Code
          </Button>
        )}
      </div>

      {showCode ? (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre-wrap">{code}</pre>
        </div>
      ) : (
        <div 
          className="overflow-auto max-h-96 flex justify-center"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
        >
          <div ref={diagramRef} className="mermaid-container" />
        </div>
      )}
    </div>
  );
};

export default MermaidDiagram;
