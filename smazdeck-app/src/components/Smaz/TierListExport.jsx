import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { 
  ArrowDownTrayIcon, 
  PhotoIcon, 
  DocumentTextIcon,
  ShareIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

const TierListExport = ({ tierList, tierListName }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');

  // Export to JSON
  const exportToJSON = () => {
    const exportData = {
      name: tierListName,
      title: tierList.title,
      description: tierList.description,
      exportedAt: new Date().toISOString(),
      tiers: tierList.tiers?.map(tier => ({
        tier: tier.tier,
        tier_name: tier.tier_name,
        entries: tier.entries?.map(entry => ({
          name: entry.name || entry.smaz?.name,
          explanation: entry.explanation
        }))
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tierListName.replace(/\s+/g, '_').toLowerCase()}_tier_list.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export to CSV
  const exportToCSV = () => {
    let csvContent = 'Tier,Tier Name,Smaz Name,Explanation\n';
    
    tierList.tiers?.forEach(tier => {
      tier.entries?.forEach(entry => {
        const smazName = entry.name || entry.smaz?.name || '';
        const explanation = (entry.explanation || '').replace(/"/g, '""');
        csvContent += `"${tier.tier}","${tier.tier_name}","${smazName}","${explanation}"\n`;
      });
    });

    const dataBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tierListName.replace(/\s+/g, '_').toLowerCase()}_tier_list.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export to Markdown
  const exportToMarkdown = () => {
    let markdown = `# ${tierList.title || tierListName}\n\n`;
    
    if (tierList.description) {
      markdown += `${tierList.description}\n\n`;
    }

    markdown += `*Exported on ${new Date().toLocaleDateString()}*\n\n`;

    tierList.tiers?.forEach(tier => {
      markdown += `## ${tier.tier.toUpperCase()}-Tier: ${tier.tier_name}\n\n`;
      
      if (tier.entries?.length > 0) {
        tier.entries.forEach(entry => {
          const smazName = entry.name || entry.smaz?.name || '';
          markdown += `- **${smazName}**`;
          if (entry.explanation) {
            markdown += `: ${entry.explanation}`;
          }
          markdown += '\n';
        });
      } else {
        markdown += '*No entries in this tier*\n';
      }
      markdown += '\n';
    });

    const dataBlob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tierListName.replace(/\s+/g, '_').toLowerCase()}_tier_list.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy tier list as text to clipboard
  const copyToClipboard = async () => {
    let textContent = `${tierList.title || tierListName}\n`;
    textContent += '='.repeat(textContent.length - 1) + '\n\n';
    
    if (tierList.description) {
      textContent += `${tierList.description}\n\n`;
    }

    tierList.tiers?.forEach(tier => {
      textContent += `${tier.tier.toUpperCase()}-Tier: ${tier.tier_name}\n`;
      textContent += '-'.repeat(`${tier.tier.toUpperCase()}-Tier: ${tier.tier_name}`.length) + '\n';
      
      if (tier.entries?.length > 0) {
        tier.entries.forEach(entry => {
          const smazName = entry.name || entry.smaz?.name || '';
          textContent += `• ${smazName}`;
          if (entry.explanation) {
            textContent += ` - ${entry.explanation}`;
          }
          textContent += '\n';
        });
      } else {
        textContent += 'No entries in this tier\n';
      }
      textContent += '\n';
    });

    try {
      await navigator.clipboard.writeText(textContent);
      // You could add a toast notification here
      console.log('Tier list copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Generate shareable URL (placeholder - would need backend implementation)
  const generateShareableURL = () => {
    // This would typically involve sending the tier list data to a backend
    // and getting back a shareable URL. For now, we'll just copy the current URL
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    console.log('Current URL copied to clipboard');
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      switch (exportFormat) {
        case 'json':
          exportToJSON();
          break;
        case 'csv':
          exportToCSV();
          break;
        case 'markdown':
          exportToMarkdown();
          break;
        case 'clipboard':
          await copyToClipboard();
          break;
        case 'share':
          generateShareableURL();
          break;
        default:
          exportToJSON();
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setTimeout(() => setIsExporting(false), 1000);
    }
  };

  const exportOptions = [
    {
      value: 'json',
      label: 'JSON Data',
      icon: DocumentTextIcon,
      description: 'Structured data format'
    },
    {
      value: 'csv',
      label: 'CSV Spreadsheet',
      icon: DocumentTextIcon,
      description: 'Excel-compatible format'
    },
    {
      value: 'markdown',
      label: 'Markdown',
      icon: DocumentTextIcon,
      description: 'Text format with formatting'
    },
    {
      value: 'clipboard',
      label: 'Copy to Clipboard',
      icon: ClipboardDocumentIcon,
      description: 'Copy as formatted text'
    },
    {
      value: 'share',
      label: 'Share URL',
      icon: ShareIcon,
      description: 'Generate shareable link'
    }
  ];

  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-400/25">
          <ArrowDownTrayIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white font-display">
            Export Tier List
          </h3>
          <p className="text-sm text-slate-400">
            Save or share your tier list in various formats
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Export format selection */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Choose export format:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => setExportFormat(option.value)}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left group backdrop-blur-sm",
                    exportFormat === option.value
                      ? "border-amber-400 bg-gradient-to-br from-amber-400/15 to-amber-600/5 text-amber-300 shadow-lg shadow-amber-400/20 scale-105"
                      : "border-slate-600/50 bg-slate-700/30 text-slate-300 hover:border-slate-500 hover:bg-slate-700/50 hover:scale-102"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                    exportFormat === option.value
                      ? "bg-amber-500 text-white shadow-lg"
                      : "bg-slate-600 text-slate-300 group-hover:bg-slate-500"
                  )}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-1">
                      {option.label}
                    </div>
                    <div className="text-xs opacity-75">
                      {option.description}
                    </div>
                  </div>
                  {exportFormat === option.value && (
                    <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced export button */}
        <div className="pt-6 border-t border-slate-700/50">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={cn(
              "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 border-2",
              isExporting
                ? "bg-slate-600/50 text-slate-400 cursor-not-allowed border-slate-600"
                : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-amber-400 hover:shadow-xl hover:shadow-amber-400/30 hover:scale-105 active:scale-95"
            )}
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>Export {exportOptions.find(opt => opt.value === exportFormat)?.label}</span>
              </>
            )}
          </button>
        </div>

        {/* Enhanced export info */}
        <div className="text-xs text-slate-400 bg-slate-900/40 rounded-xl p-4 border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-amber-400 rounded-full" />
            <span className="text-slate-300 font-medium">Export includes:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
              <span>All tier rankings and names</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
              <span>Smaz names and explanations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
              <span>Tier list metadata and description</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
              <span>Export timestamp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TierListExport;