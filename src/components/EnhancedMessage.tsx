
import React from 'react';
import MermaidDiagram from './MermaidDiagram';
import CodeBlock from './CodeBlock';

interface EnhancedMessageProps {
  content: string;
}

const EnhancedMessage = ({ content }: EnhancedMessageProps) => {
  const renderContent = () => {
    const parts = [];
    let currentIndex = 0;

    // Regular expressions to match mermaid diagrams and code blocks
    const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g;
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;

    // Find all matches
    const allMatches = [];
    
    let mermaidMatch;
    while ((mermaidMatch = mermaidRegex.exec(content)) !== null) {
      allMatches.push({
        type: 'mermaid',
        start: mermaidMatch.index,
        end: mermaidMatch.index + mermaidMatch[0].length,
        content: mermaidMatch[1],
        language: 'mermaid'
      });
    }

    let codeMatch;
    while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
      // Skip if this is already captured as a mermaid diagram
      const isMermaid = allMatches.some(match => 
        match.type === 'mermaid' && 
        codeMatch.index >= match.start && 
        codeMatch.index < match.end
      );
      
      if (!isMermaid) {
        allMatches.push({
          type: 'code',
          start: codeMatch.index,
          end: codeMatch.index + codeMatch[0].length,
          content: codeMatch[2],
          language: codeMatch[1] || 'text'
        });
      }
    }

    // Sort matches by start position
    allMatches.sort((a, b) => a.start - b.start);

    // Render content with enhanced components
    allMatches.forEach((match, index) => {
      // Add text before this match
      if (currentIndex < match.start) {
        const textContent = content.substring(currentIndex, match.start);
        if (textContent.trim()) {
          parts.push(
            <div key={`text-${index}`} className="whitespace-pre-wrap leading-relaxed">
              {textContent}
            </div>
          );
        }
      }

      // Add the enhanced component
      if (match.type === 'mermaid') {
        parts.push(
          <div key={`mermaid-${index}`} className="my-4">
            <MermaidDiagram code={match.content} />
          </div>
        );
      } else if (match.type === 'code') {
        parts.push(
          <div key={`code-${index}`} className="my-4">
            <CodeBlock code={match.content} language={match.language} />
          </div>
        );
      }

      currentIndex = match.end;
    });

    // Add remaining text
    if (currentIndex < content.length) {
      const remainingText = content.substring(currentIndex);
      if (remainingText.trim()) {
        parts.push(
          <div key="text-final" className="whitespace-pre-wrap leading-relaxed">
            {remainingText}
          </div>
        );
      }
    }

    // If no matches found, return the original content
    if (parts.length === 0) {
      return <div className="whitespace-pre-wrap leading-relaxed">{content}</div>;
    }

    return <div className="space-y-2">{parts}</div>;
  };

  return <div>{renderContent()}</div>;
};

export default EnhancedMessage;
