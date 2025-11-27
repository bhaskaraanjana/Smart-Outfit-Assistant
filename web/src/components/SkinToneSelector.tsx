import React from 'react';
import { SkinTone } from '@/types';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SkinToneSelectorProps {
    selectedTone: SkinTone | null;
    onSelect: (tone: SkinTone) => void;
}

const tones: { id: SkinTone; color: string; label: string }[] = [
    { id: 'fair', color: '#F5E0D8', label: 'Fair' },
    { id: 'medium', color: '#EAC0A6', label: 'Medium' },
    { id: 'olive', color: '#C68642', label: 'Olive' },
    { id: 'dark', color: '#8D5524', label: 'Dark' },
];

export function SkinToneSelector({ selectedTone, onSelect }: SkinToneSelectorProps) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-800">1. Select Your Skin Tone</h3>
            <div className="flex gap-4">
                {tones.map((tone) => (
                    <button
                        key={tone.id}
                        onClick={() => onSelect(tone.id)}
                        className={twMerge(
                            "relative w-16 h-16 rounded-full border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                            selectedTone === tone.id ? "border-indigo-600 scale-105 shadow-lg" : "border-transparent"
                        )}
                        style={{ backgroundColor: tone.color }}
                        aria-label={`Select ${tone.label} skin tone`}
                    >
                        {selectedTone === tone.id && (
                            <div className="absolute inset-0 flex items-center justify-center text-indigo-900">
                                <Check size={24} strokeWidth={3} />
                            </div>
                        )}
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-600">
                            {tone.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
