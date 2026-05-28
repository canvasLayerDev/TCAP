const fs = require('fs');
const path = require('path');

const dirs = [
    path.join(__dirname, 'main-website', 'assets'),
    path.join(__dirname, 'admin-panel', 'admin', 'assets')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.js')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            let updated = content.replace(/https:\/\/tcapitalwealth\.com/g, '');
            if (updated !== content) {
                fs.writeFileSync(filePath, updated);
                console.log('Fixed ' + filePath);
            }
        }
    });
});
