'use client';

import { Card, Button } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import type Vditor from 'vditor';

export default function Home() {
  const [vd, setVd] = useState<Vditor | null>(null);
  const vditorRef = useRef(null);

  useEffect(() => {
    if (!vditorRef.current) return;

    let vditor: Vditor;
    const initVditor = async () => {
      const VditorModule = await import('vditor');
      vditor = new VditorModule.default('vditor', {
        height: 'calc(80vh - 200px)', // 调整高度以填充可用空间
        mode: 'wysiwyg',
        after: () => {
          setVd(vditor);
        },
      });
    };

    initVditor();

    return () => {
      if (vditor) {
        vditor.destroy();
      }
    };
  }, []);

  const handleSubmit = () => {
    if (vd) {
      const content = vd.getValue();
      console.log("Submitted:", { note: content });
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 flex flex-col h-full">
      <Card className="w-full flex-grow p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-2xl border border-gray-700">
        <h1 className="text-5xl font-bold mb-8 text-white uppercase tracking-wide border-b-4 border-blue-500 pb-2 inline-block">
          Paste to Create
        </h1>
        
        <div className="flex-grow bg-gray-100 rounded-lg overflow-hidden">
          <div id="vditor" ref={vditorRef}></div>
        </div>

        <div className="flex justify-center mt-6">
          <Button color="primary" size="lg" onPress={handleSubmit} className="px-6 py-2 text-base">
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}
