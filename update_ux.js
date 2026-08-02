const fs = require('fs');

// Update StagingGrid.tsx
let sg = fs.readFileSync('femcart-web/src/components/admin/bulk-import/StagingGrid.tsx', 'utf8');

sg = sg.replace(
  'if (!confirm(includeInvalid ? "Are you sure you want to FORCE import all rows including invalid ones? Missing data will be replaced with defaults (e.g. \'Untitled Product\')." : "Are you sure you want to commit all valid rows to the live catalog?")) return;',
  'if (!confirm(includeInvalid ? "Are you sure you want to FORCE add all rows including invalid ones to your live catalog? Missing data will be replaced with defaults (e.g. \'Untitled Product\')." : "Are you sure you want to publish all valid rows to your live catalog?")) return;'
);

sg = sg.replace(
  'alert("Commit process started! Check back in a few moments.");',
  'alert("Publishing process started! Check the dashboard in a few moments.");'
);

sg = sg.replace(
  'alert("Commit failed.");',
  'alert("Publish failed.");'
);

sg = sg.replace(
  'if (!confirm("Are you sure you want to completely discard this import and delete all staged rows? This cannot be undone.")) return;',
  'if (!confirm("Are you sure you want to completely cancel this import and discard all staged rows? This cannot be undone.")) return;'
);

sg = sg.replace(
  '<option value="VALID">Valid Only</option>',
  '<option value="VALID">Ready to Publish</option>'
);

sg = sg.replace(
  '<option value="INVALID">Invalid Only</option>',
  '<option value="INVALID">Needs Fix</option>'
);

sg = sg.replace(
  '<option value="IMPORTED">Imported</option>',
  '<option value="IMPORTED">Published</option>'
);

sg = sg.replace(
  'Discard\n          </button>',
  'Cancel & Discard\n          </button>'
);

sg = sg.replace(
  'Commit Valid Rows\n          </button>',
  'Publish Valid Products\n          </button>'
);

sg = sg.replace(
  'Force Commit All\n          </button>',
  'Force Publish All\n          </button>'
);

sg = sg.replace(
  /<CheckCircle2 size=\{12\} \/> VALID\s*<\/span>/g,
  '<CheckCircle2 size={12} /> Ready to Publish\n                          </span>'
);

sg = sg.replace(
  /<AlertCircle size=\{12\} \/> INVALID\s*<\/span>/g,
  '<AlertCircle size={12} /> Needs Fix\n                          </span>'
);

sg = sg.replace(
  /<CheckCircle2 size=\{12\} \/> IMPORTED\s*<\/span>/g,
  '<CheckCircle2 size={12} /> Published\n                          </span>'
);

sg = sg.replace(
  /<Loader2 size=\{12\} className="animate-spin" \/> PENDING\s*<\/span>/g,
  '<Loader2 size={12} className="animate-spin" /> Processing\n                          </span>'
);

fs.writeFileSync('femcart-web/src/components/admin/bulk-import/StagingGrid.tsx', sg);
console.log('StagingGrid.tsx updated!');

// Update ImportLogs.tsx
let il = fs.readFileSync('femcart-web/src/components/admin/bulk-import/ImportLogs.tsx', 'utf8');

il = il.replace(
  /<Loader2 size=\{10\} className="animate-spin" \/> \{log.status === 'committing' \? 'Committing' : 'Processing'\} \{progress\}%/g,
  '<Loader2 size={10} className="animate-spin" /> {log.status === \'committing\' ? \'Publishing\' : \'Parsing CSV\'} {progress}%'
);

il = il.replace(
  /<th className="px-4 py-3 font-semibold text-gray-500">Imported \/ Failed<\/th>/g,
  '<th className="px-4 py-3 font-semibold text-gray-500">Success / Failed</th>'
);

fs.writeFileSync('femcart-web/src/components/admin/bulk-import/ImportLogs.tsx', il);
console.log('ImportLogs.tsx updated!');
